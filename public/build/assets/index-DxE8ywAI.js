const y="modulepreload",h=function(r){return"/v11-main/public/build/"+r},u={},v=function(l,s,i){let a=Promise.resolve();if(s&&s.length>0){document.getElementsByTagName("link");const e=document.querySelector("meta[property=csp-nonce]"),o=(e==null?void 0:e.nonce)||(e==null?void 0:e.getAttribute("nonce"));a=Promise.all(s.map(n=>{if(n=h(n),n in u)return;u[n]=!0;const c=n.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${f}`))return;const t=document.createElement("link");if(t.rel=c?"stylesheet":y,c||(t.as="script",t.crossOrigin=""),t.href=n,o&&t.setAttribute("nonce",o),document.head.appendChild(t),c)return new Promise((d,m)=>{t.addEventListener("load",d),t.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${n}`)))})}))}return a.then(()=>l()).catch(e=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=e,window.dispatchEvent(o),!o.defaultPrevented)throw e})};async function p(r,l){for(const s of Array.isArray(r)?r:[r]){const i=l[s];if(!(typeof i>"u"))return typeof i=="function"?i():i}throw new Error(`Page not found: ${r}`)}export{v as _,p as r};