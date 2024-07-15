import{e as M,a as w}from"./escape-highlight--kF8Jl-E.js";import{c as N,i as R,n as W,u as _}from"./useConnector-ByizAAyX.js";function C(t){return btoa(encodeURIComponent(JSON.stringify(t)))}function F(t,e){return q(t)||Q(t,e)||L(t,e)||K()}function K(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function L(t,e){if(t){if(typeof t=="string")return I(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);if(r==="Object"&&t.constructor&&(r=t.constructor.name),r==="Map"||r==="Set")return Array.from(t);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I(t,e)}}function I(t,e){(e==null||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function Q(t,e){var r=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(r!=null){var n,a,m,l,u=[],c=!0,s=!1;try{if(m=(r=r.call(t)).next,e!==0)for(;!(c=(n=m.call(r)).done)&&(u.push(n.value),u.length!==e);c=!0);}catch(f){s=!0,a=f}finally{try{if(!c&&r.return!=null&&(l=r.return(),Object(l)!==l))return}finally{if(s)throw a}}return u}}function q(t){if(Array.isArray(t))return t}function P(t){"@babel/helpers - typeof";return P=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},P(t)}function B(t){for(var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:20,r=[],n=0;n<Math.ceil(t.length/e);n++)r.push(t.slice(n*e,(n+1)*e));return r}function A(t){var e=t.index,r=t.widgetType;t.methodName;var n=t.args,a=t.instantSearchInstance;if(n.length===1&&P(n[0])==="object")return[n[0]];var m=n[0].split(":"),l=F(m,2),u=l[0],c=l[1],s=n[1],f=n[2];if(!s)return[];if((u==="click"||u==="conversion")&&!f)return[];var y=Array.isArray(s)?s:[s];if(y.length===0)return[];var i=y[0].__queryID,o=B(y),v=o.map(function(d){return d.map(function(p){return p.objectID})}),h=o.map(function(d){return d.map(function(p){return p.__position})});return u==="view"?a.status!=="idle"?[]:o.map(function(d,p){return{insightsMethod:"viewedObjectIDs",widgetType:r,eventType:u,payload:{eventName:f||"Hits Viewed",index:e,objectIDs:v[p]},hits:d,eventModifier:c}}):u==="click"?o.map(function(d,p){return{insightsMethod:"clickedObjectIDsAfterSearch",widgetType:r,eventType:u,payload:{eventName:f||"Hit Clicked",index:e,queryID:i,objectIDs:v[p],positions:h[p]},hits:d,eventModifier:c}}):u==="conversion"?o.map(function(d,p){return{insightsMethod:"convertedObjectIDsAfterSearch",widgetType:r,eventType:u,payload:{eventName:f||"Hit Converted",index:e,queryID:i,objectIDs:v[p]},hits:d,eventModifier:c}}):[]}function U(t){var e=t.instantSearchInstance,r=t.index,n=t.widgetType,a={},m=void 0,l=function(){for(var c=arguments.length,s=new Array(c),f=0;f<c;f++)s[f]=arguments[f];var y=A({widgetType:n,index:r,methodName:"sendEvent",args:s,instantSearchInstance:e});y.forEach(function(i){i.eventType==="click"&&i.eventModifier==="internal"&&a[i.eventType]||(a[i.eventType]=!0,e.sendEventToInsights(i))}),clearTimeout(m),m=setTimeout(function(){a={}},0)};return l}function z(t){var e=t.index,r=t.widgetType,n=t.instantSearchInstance,a=function(){for(var l=arguments.length,u=new Array(l),c=0;c<l;c++)u[c]=arguments[c];var s=A({widgetType:r,index:e,methodName:"bindEvent",args:u,instantSearchInstance:n});return s.length?"data-insights-event=".concat(C(s)):""};return a}function g(t){"@babel/helpers - typeof";return g=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},g(t)}function j(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),r.push.apply(r,n)}return r}function E(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?j(Object(r),!0).forEach(function(n){G(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function G(t,e,r){return e=J(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function J(t){var e=V(t,"string");return g(e)==="symbol"?e:String(e)}function V(t,e){if(g(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(g(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function X(t,e,r){return t.map(function(n,a){return E(E({},n),{},{__position:r*e+a+1})})}function S(t){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},S(t)}function D(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),r.push.apply(r,n)}return r}function T(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?D(Object(r),!0).forEach(function(n){Y(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function Y(t,e,r){return e=Z(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function Z(t){var e=k(t,"string");return S(e)==="symbol"?e:String(e)}function k(t,e){if(S(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(S(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function ee(t,e){return e?t.map(function(r){return T(T({},r),{},{__queryID:e})}):t}function O(t){"@babel/helpers - typeof";return O=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},O(t)}function $(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable})),r.push.apply(r,n)}return r}function b(t){for(var e=1;e<arguments.length;e++){var r=arguments[e]!=null?arguments[e]:{};e%2?$(Object(r),!0).forEach(function(n){H(t,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):$(Object(r)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(r,n))})}return t}function H(t,e,r){return e=te(e),e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function te(t){var e=re(t,"string");return O(e)==="symbol"?e:String(e)}function re(t,e){if(O(t)!=="object"||t===null)return t;var r=t[Symbol.toPrimitive];if(r!==void 0){var n=r.call(t,e||"default");if(O(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}var ne=N({name:"hits",connector:!0}),ie=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:W;return R(e,ne()),function(n){var a=n||{},m=a.escapeHTML,l=m===void 0?!0:m,u=a.transformItems,c=u===void 0?function(y){return y}:u,s,f;return{$$type:"ais.hits",init:function(i){e(b(b({},this.getWidgetRenderState(i)),{},{instantSearchInstance:i.instantSearchInstance}),!0)},render:function(i){var o=this.getWidgetRenderState(i);e(b(b({},o),{},{instantSearchInstance:i.instantSearchInstance}),!1),o.sendEvent("view:internal",o.hits)},getRenderState:function(i,o){return b(b({},i),{},{hits:this.getWidgetRenderState(o)})},getWidgetRenderState:function(i){var o=i.results,v=i.helper,h=i.instantSearchInstance;if(s||(s=U({instantSearchInstance:h,index:v.getIndex(),widgetType:this.$$type})),f||(f=z({index:v.getIndex(),widgetType:this.$$type,instantSearchInstance:h})),!o)return{hits:[],results:void 0,sendEvent:s,bindEvent:f,widgetParams:n};l&&o.hits.length>0&&(o.hits=M(o.hits));var d=X(o.hits,o.page,o.hitsPerPage),p=ee(d,o.queryID),x=c(p,{results:o});return{hits:x,results:o,sendEvent:s,bindEvent:f,widgetParams:n}},dispose:function(i){var o=i.state;return r(),l?o.setQueryParameters(Object.keys(w).reduce(function(v,h){return b(b({},v),{},H({},h,void 0))},{})):o},getWidgetSearchParameters:function(i){return l?i.setQueryParameters(w):i}}}};function ue(t,e){return _(ie,t,e)}export{C as s,ue as u};