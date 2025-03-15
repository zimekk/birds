(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();function c({title:o}){return`
    <header id="header">
      <h1>${o}</h1>
    </header>
    `}const u=""+new URL("../typescript.svg",import.meta.url).href;function l(){return'<button id="counter" type="button"></button>'}function a(o){let r=0;const n=i=>{r=i,o.innerText=`count is ${r}`};o.addEventListener("click",()=>n(++r)),n(0)}document.querySelector("#app").innerHTML=`
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${u}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    ${c({title:"Web"})}
    <div class="card">
      ${l()}
    </div>
  </div>
`;a(document.querySelector("#counter"));
