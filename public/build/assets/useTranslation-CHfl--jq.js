import{t as R}from"./toPropertyKey-PLuKRk1e.js";import{r as p}from"./client-ZKQMN23D.js";function U(n,e,t){return(e=R(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}function K(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function A(n,e){for(var t=0;t<e.length;t++){var r=e[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,R(r.key),r)}}function M(n,e,t){return e&&A(n.prototype,e),t&&A(n,t),Object.defineProperty(n,"prototype",{writable:!1}),n}var W=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,$={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},q=function(e){return $[e]},J=function(e){return e.replace(W,q)};function L(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable})),t.push.apply(t,r)}return t}function k(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?L(Object(t),!0).forEach(function(r){U(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):L(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}var S={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:J},z,V=p.createContext();function Y(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};S=k(k({},S),n)}function G(){return S}var Q=function(){function n(){K(this,n),this.usedNamespaces={}}return M(n,[{key:"addUsedNamespaces",value:function(t){var r=this;t.forEach(function(i){r.usedNamespaces[i]||(r.usedNamespaces[i]=!0)})}},{key:"getUsedNamespaces",value:function(){return Object.keys(this.usedNamespaces)}}]),n}();function X(n){z=n}function Z(){return z}var le={type:"3rdParty",init:function(e){Y(e.options.react),X(e)}};function ee(){if(console&&console.warn){for(var n,e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];typeof t[0]=="string"&&(t[0]="react-i18next:: ".concat(t[0])),(n=console).warn.apply(n,t)}}var D={};function j(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];typeof e[0]=="string"&&D[e[0]]||(typeof e[0]=="string"&&(D[e[0]]=new Date),ee.apply(void 0,e))}function _(n,e,t){n.loadNamespaces(e,function(){if(n.isInitialized)t();else{var r=function i(){setTimeout(function(){n.off("initialized",i)},0),t()};n.on("initialized",r)}})}function ne(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},r=e.languages[0],i=e.options?e.options.fallbackLng:!1,u=e.languages[e.languages.length-1];if(r.toLowerCase()==="cimode")return!0;var a=function(c,o){var g=e.services.backendConnector.state["".concat(c,"|").concat(o)];return g===-1||g===2};return t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&e.services.backendConnector.backend&&e.isLanguageChangingTo&&!a(e.isLanguageChangingTo,n)?!1:!!(e.hasResourceBundle(r,n)||!e.services.backendConnector.backend||e.options.resources&&!e.options.partialBundledLanguages||a(r,n)&&(!i||a(u,n)))}function te(n,e){var t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(!e.languages||!e.languages.length)return j("i18n.languages were undefined or empty",e.languages),!0;var r=e.options.ignoreJSONStructure!==void 0;return r?e.hasLoadedNamespace(n,{precheck:function(u,a){if(t.bindI18n&&t.bindI18n.indexOf("languageChanging")>-1&&u.services.backendConnector.backend&&u.isLanguageChangingTo&&!a(u.isLanguageChangingTo,n))return!1}}):ne(n,e,t)}function re(n){if(Array.isArray(n))return n}function ae(n,e){var t=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(t!=null){var r,i,u,a,d=[],c=!0,o=!1;try{if(u=(t=t.call(n)).next,e!==0)for(;!(c=(r=u.call(t)).done)&&(d.push(r.value),d.length!==e);c=!0);}catch(g){o=!0,i=g}finally{try{if(!c&&t.return!=null&&(a=t.return(),Object(a)!==a))return}finally{if(o)throw i}}return d}}function F(n,e){(e==null||e>n.length)&&(e=n.length);for(var t=0,r=Array(e);t<e;t++)r[t]=n[t];return r}function ie(n,e){if(n){if(typeof n=="string")return F(n,e);var t={}.toString.call(n).slice(8,-1);return t==="Object"&&n.constructor&&(t=n.constructor.name),t==="Map"||t==="Set"?Array.from(n):t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?F(n,e):void 0}}function oe(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function se(n,e){return re(n)||ae(n,e)||ie(n,e)||oe()}function H(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);e&&(r=r.filter(function(i){return Object.getOwnPropertyDescriptor(n,i).enumerable})),t.push.apply(t,r)}return t}function P(n){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?H(Object(t),!0).forEach(function(r){U(n,r,t[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):H(Object(t)).forEach(function(r){Object.defineProperty(n,r,Object.getOwnPropertyDescriptor(t,r))})}return n}var ue=function(e,t){var r=p.useRef();return p.useEffect(function(){r.current=e},[e,t]),r.current};function pe(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t=e.i18n,r=p.useContext(V)||{},i=r.i18n,u=r.defaultNS,a=t||i||Z();if(a&&!a.reportNamespaces&&(a.reportNamespaces=new Q),!a){j("You will need to pass in an i18next instance by using initReactI18next");var d=function(l){return Array.isArray(l)?l[l.length-1]:l},c=[d,{},!1];return c.t=d,c.i18n={},c.ready=!1,c}a.options.react&&a.options.react.wait!==void 0&&j("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");var o=P(P(P({},G()),a.options.react),e),g=o.useSuspense,I=o.keyPrefix,s=u||a.options&&a.options.defaultNS;s=typeof s=="string"?[s]:s||["translation"],a.reportNamespaces.addUsedNamespaces&&a.reportNamespaces.addUsedNamespaces(s);var m=(a.isInitialized||a.initializedStoreOnce)&&s.every(function(f){return te(f,a,o)});function y(){return a.getFixedT(null,o.nsMode==="fallback"?s:s[0],I)}var B=p.useState(y),x=se(B,2),C=x[0],h=x[1],w=s.join(),E=ue(w),v=p.useRef(!0);p.useEffect(function(){var f=o.bindI18n,l=o.bindI18nStore;v.current=!0,!m&&!g&&_(a,s,function(){v.current&&h(y)}),m&&E&&E!==w&&v.current&&h(y);function O(){v.current&&h(y)}return f&&a&&a.on(f,O),l&&a&&a.store.on(l,O),function(){v.current=!1,f&&a&&f.split(" ").forEach(function(N){return a.off(N,O)}),l&&a&&l.split(" ").forEach(function(N){return a.store.off(N,O)})}},[a,w]);var T=p.useRef(!0);p.useEffect(function(){v.current&&!T.current&&h(y),T.current=!1},[a,I]);var b=[C,a,m];if(b.t=C,b.i18n=a,b.ready=m,m||!m&&!g)return b;throw new Promise(function(f){_(a,s,function(){f()})})}export{re as _,ie as a,oe as b,M as c,U as d,K as e,le as i,pe as u};