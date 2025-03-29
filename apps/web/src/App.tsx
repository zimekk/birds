import { useCallback, useRef, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";

import * as tmImage from "@teachablemachine/image";

export default function App() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState("");
  const [prediction, setPrediction] = useState<
    {
      className: string;
      probability: number;
    }[]
  >([]);

  const refWebcam = useRef<HTMLDivElement | null>(null);

  const onStart = useCallback(() => {
    setStarted(true);

    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const MODEL_URL =
      "https://teachablemachine.withgoogle.com/models/hx-YXtwYk/";

    // let modelwebcam, labelContainer, maxPredictions;
    let model: tmImage.CustomMobileNet | null = null;
    let webcam: tmImage.Webcam | null = null;

    // Load the image model and setup the webcam
    async function init() {
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";

      // load the model and metadata
      // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
      // or files from your local hard drive
      // Note: the pose library adds "tmImage" object to your window (window.tmImage)
      model = await tmImage.load(modelURL, metadataURL);
      const maxPredictions = model.getTotalClasses();
      console.log({ maxPredictions });

      // Convenience function to setup a webcam
      const flip = false; // whether to flip the webcam
      const { innerWidth: width, innerHeight: height } = window;
      webcam = new tmImage.Webcam(width, height, flip); // width, height, flip
      await webcam.setup({
        facingMode: "environment",
      }); // request access to the webcam
      await webcam.play();
      window.requestAnimationFrame(loop);

      // append elements to the DOM
      if (refWebcam.current) {
        refWebcam.current.appendChild(webcam.canvas);
      }
    }

    async function loop() {
      if (!webcam) {
        return;
      }
      webcam.update(); // update the webcam frame
      await predict();
      window.requestAnimationFrame(loop);
    }

    // run the webcam image through the image model
    async function predict() {
      if (!webcam || !model) {
        return;
      }
      // predict can take in an image, video or canvas html element
      const prediction = await model.predict(webcam.canvas);
      setPrediction(prediction);
    }

    init();
  }, []);

  // return null;

  return (
    <>
      <div ref={refWebcam} className="webcam"></div>
      <div className="container">
        {prediction.length > 0 ? (
          <>
            <div className="predictions">
              {prediction.map(({ className, probability }, index) => (
                <button
                  key={index}
                  className={["prediction"]
                    .concat(probability > 0.75 ? ["positive"] : [])
                    .join(" ")}
                  onClick={() => setSelected(className)}
                >{`${className}: ${(100 * probability).toFixed()}%`}</button>
              ))}
            </div>
            {selected !== "" && (
              <div className="description">
                <button className="close" onClick={() => setSelected("")}>
                  [x]
                </button>
                <h2>{selected}</h2>
                {
                  {
                    Kaczka: (
                      <article>
                        <p>
                          Kaczki są wszystkożerne, ale w ich jadłospisie
                          przeważają głównie rośliny.
                        </p>
                        <p>
                          Można dokarmiać je ziarnem, na przykład owsem,
                          kukurydzą czy pszenicą i warzywami, takimi jak
                          marchew, gotowane ziemniaki i kapusta.
                        </p>
                      </article>
                    ),
                    Gołąb: (
                      <article>
                        <p>Gołębie są wszystkożerne.</p>
                        <p>
                          Można dokarmiać je suchych ziarnem (t.j. groch,
                          kukurydzę, słonecznik, proso, pszenicę, jęczmień,
                          siemię itd.), łuskanym słonecznikiem, wszelkimi
                          kaszami i surowymi płatkami owsianymi.
                        </p>
                      </article>
                    ),
                    Wrona: (
                      <article>
                        <p>Wrony są wszystkożerne.</p>
                        <p>
                          Można dokarmiać je niesolonymi orzechami, ziarnami,
                          owocami, a także kawałkami mięsa i sera.
                        </p>
                      </article>
                    ),
                    Łabędź: (
                      <article>
                        <p>Łabędzie są roślinożerne.</p>
                        <p>
                          Można dokarmiać je zbożem oraz surowymi bądź
                          gotowanymi bez soli, drobno pokrojonymi warzywami.
                        </p>
                      </article>
                    ),
                  }[selected]
                }
              </div>
            )}
          </>
        ) : (
          <div className="splash">
            <div>
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </div>
            <h1>Teachable Machine Image Model</h1>
            <button type="button" disabled={started} onClick={onStart}>
              {started ? "Loading..." : "Start"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
