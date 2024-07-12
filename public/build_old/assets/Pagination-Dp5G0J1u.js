import{j as P}from"./client-ZKQMN23D.js";import{c as W,i as $,n as D,u as I}from"./useConnector-ByizAAyX.js";import{u as E}from"./useHits-2WPfp_Fc.js";import"./_commonjsHelpers-BosuxZz1.js";import"./escape-highlight--kF8Jl-E.js";function T(e){return x(e)||k(e)||M(e)||C()}function C(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function M(e,t){if(e){if(typeof e=="string")return w(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return w(e,t)}}function k(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function x(e){if(Array.isArray(e))return w(e)}function w(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function R(e){var t=e.start,r=t===void 0?0:t,n=e.end,i=e.step,u=i===void 0?1:i,f=u===0?1:u,d=Math.round((n-r)/f);return T(Array(d)).map(function(l,s){return r+s*f})}function m(e){"@babel/helpers - typeof";return m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},m(e)}function N(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function H(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,j(n.key),n)}}function F(e,t,r){return t&&H(e.prototype,t),Object.defineProperty(e,"prototype",{writable:!1}),e}function S(e,t,r){return t=j(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function j(e){var t=K(e,"string");return m(t)==="symbol"?t:String(t)}function K(e,t){if(m(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(m(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Q=function(){function e(t){N(this,e),S(this,"currentPage",void 0),S(this,"total",void 0),S(this,"padding",void 0),this.currentPage=t.currentPage,this.total=t.total,this.padding=t.padding}return F(e,[{key:"pages",value:function(){var r=this.total,n=this.currentPage,i=this.padding;if(r===0)return[0];var u=this.nbPagesDisplayed(i,r);if(u===r)return R({end:r});var f=this.calculatePaddingLeft(n,i,r,u),d=u-f,l=n-f,s=n+d;return R({start:l,end:s})}},{key:"nbPagesDisplayed",value:function(r,n){return Math.min(2*r+1,n)}},{key:"calculatePaddingLeft",value:function(r,n,i,u){return r<=n?r:r>=i-n?u-(i-r):n}},{key:"isLastPage",value:function(){return this.currentPage===this.total-1||this.total===0}},{key:"isFirstPage",value:function(){return this.currentPage===0}}]),e}();function v(e){"@babel/helpers - typeof";return v=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(e)}function _(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(e,i).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?_(Object(r),!0).forEach(function(n){G(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):_(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function G(e,t,r){return t=q(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function q(e){var t=z(e,"string");return v(t)==="symbol"?t:String(t)}function z(e,t){if(v(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(v(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var B=W({name:"pagination",connector:!0}),J=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:D;return $(t,B()),function(n){var i=n||{},u=i.totalPages,f=i.padding,d=f===void 0?3:f,l=new Q({currentPage:0,total:0,padding:d}),s={};function L(g){var a=g.nbPages;return u!==void 0?Math.min(u,a):a}return{$$type:"ais.pagination",init:function(a){var o=a.instantSearchInstance;t(c(c({},this.getWidgetRenderState(a)),{},{instantSearchInstance:o}),!0)},render:function(a){var o=a.instantSearchInstance;t(c(c({},this.getWidgetRenderState(a)),{},{instantSearchInstance:o}),!1)},dispose:function(a){var o=a.state;return r(),o.setQueryParameter("page",void 0)},getWidgetUiState:function(a,o){var p=o.searchParameters,y=p.page||0;return y?c(c({},a),{},{page:y+1}):a},getWidgetSearchParameters:function(a,o){var p=o.uiState,y=p.page?p.page-1:0;return a.setQueryParameter("page",y)},getWidgetRenderState:function(a){var o=a.results,p=a.helper,y=a.state,A=a.createURL;s.refine||(s.refine=function(h){p.setPage(h),p.search()}),s.createURL||(s.createURL=function(h){return A(function(U){return c(c({},U),{},{page:h})})});var O=y.page||0,b=L(o||{nbPages:0});return l.currentPage=O,l.total=b,{createURL:s.createURL,refine:s.refine,canRefine:b>1,currentRefinement:O,nbHits:(o==null?void 0:o.nbHits)||0,nbPages:b,pages:o?l.pages():[],isFirstPage:l.isFirstPage(),isLastPage:l.isLastPage(),widgetParams:n}},getRenderState:function(a,o){return c(c({},a),{},{pagination:this.getWidgetRenderState(o)})}}}};function V(e,t){return I(J,e,t)}const re=()=>{const{pages:e,currentRefinement:t,refine:r}=V(),{hits:n}=E();return P.jsx("nav",{children:n.length>0&&P.jsx("ul",{className:"pagination",children:e.map(i=>P.jsx("li",{className:i===t?"page-item active":"page-item",onClick:()=>r(i),children:P.jsx("span",{className:"page-link",children:i+1})},i))})})};export{re as Pagination};
