var m={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},p=/[&<>"']/g,O=RegExp(p.source);function P(t){return t&&O.test(t)?t.replace(p,function(e){return m[e]}):t}var d={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"},s=/&(amp|quot|lt|gt|#39);/g,_=RegExp(s.source);function R(t){return t&&_.test(t)?t.replace(s,function(e){return d[e]}):t}function u(t){"@babel/helpers - typeof";return u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u(t)}function j(t){return t===null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}function E(t){return u(t)==="object"&&t!==null}function S(t){if(!E(t)||j(t)!=="[object Object]")return!1;if(Object.getPrototypeOf(t)===null)return!0;for(var e=t;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function i(t){"@babel/helpers - typeof";return i=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(t)}function v(t){if(t==null)throw new TypeError("Cannot destructure "+t)}function a(){return a=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},a.apply(this,arguments)}function f(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(b){return Object.getOwnPropertyDescriptor(t,b).enumerable})),r.push.apply(r,n)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?f(Object(r),!0).forEach(function(n){h(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):f(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function h(t,e,r){return e=w(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function w(t){var e=T(t,"string");return i(e)==="symbol"?e:String(e)}function T(t,e){if(i(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(i(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var l={highlightPreTag:"__ais-highlight__",highlightPostTag:"__/ais-highlight__"},g={highlightPreTag:"<mark>",highlightPostTag:"</mark>"};function y(t){return P(t).replace(new RegExp(l.highlightPreTag,"g"),g.highlightPreTag).replace(new RegExp(l.highlightPostTag,"g"),g.highlightPostTag)}function c(t){return S(t)&&typeof t.value!="string"?Object.keys(t).reduce(function(e,r){return o(o({},e),{},h({},r,c(t[r])))},{}):Array.isArray(t)?t.map(c):o(o({},t),{},{value:y(t.value)})}function x(t){return t.__escaped===void 0&&(t=t.map(function(e){var r=a({},(v(e),e));return r._highlightResult&&(r._highlightResult=c(r._highlightResult)),r._snippetResult&&(r._snippetResult=c(r._snippetResult)),r}),t.__escaped=!0),t}function H(t){return t.map(function(e){return o(o({},e),{},{highlighted:y(e.highlighted)})})}export{g as T,l as a,H as b,x as e,S as i,R as u};