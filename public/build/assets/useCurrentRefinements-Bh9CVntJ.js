import{c as $,i as N,n as V,u as T}from"./useConnector-ByizAAyX.js";import{f as E}from"./find-DUpcU4oq.js";function k(e){return typeof e=="string"?e.replace(/^\\-/,"-"):e}function C(e){return typeof e=="number"&&e<0||typeof e=="string"?String(e).replace(/^-/,"\\-"):e}function O(e,t,r,n){var s=arguments.length>4&&arguments[4]!==void 0?arguments[4]:[],l={type:t,attribute:r,name:n,escapedValue:C(n)},i=E(s,function(b){return b.name===r}),p;if(t==="hierarchical"){for(var y=e.getHierarchicalFacetByName(r),f=n.split(y.separator),o=function(g){return function(v){return g[v]}},u=function(g){i=i&&i.data&&E(Object.keys(i.data).map(o(i.data)),function(v){return v.name===f[g]})},a=0;i!==void 0&&a<f.length;++a)u(a);p=i&&i.count}else p=i&&i.data&&i.data[l.name];return p!==void 0&&(l.count=p),i&&i.exhaustive!==void 0&&(l.exhaustive=i.exhaustive),l}function D(e,t){var r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,n=[],s=t.facetsRefinements,l=s===void 0?{}:s,i=t.facetsExcludes,p=i===void 0?{}:i,y=t.disjunctiveFacetsRefinements,f=y===void 0?{}:y,o=t.hierarchicalFacetsRefinements,u=o===void 0?{}:o,a=t.numericRefinements,b=a===void 0?{}:a,g=t.tagRefinements,v=g===void 0?[]:g;return Object.keys(l).forEach(function(c){var d=l[c];d.forEach(function(m){n.push(O(t,"facet",c,m,e.facets))})}),Object.keys(p).forEach(function(c){var d=p[c];d.forEach(function(m){n.push({type:"exclude",attribute:c,name:m,exclude:!0})})}),Object.keys(f).forEach(function(c){var d=f[c];d.forEach(function(m){n.push(O(t,"disjunctive",c,k(m),e.disjunctiveFacets))})}),Object.keys(u).forEach(function(c){var d=u[c];d.forEach(function(m){n.push(O(t,"hierarchical",c,m,e.hierarchicalFacets))})}),Object.keys(b).forEach(function(c){var d=b[c];Object.keys(d).forEach(function(m){var h=m,x=d[h],P=Array.isArray(x)?x:[x];P.forEach(function(j){n.push({type:"numeric",attribute:c,name:"".concat(j),numericValue:j,operator:h})})})}),v.forEach(function(c){n.push({type:"tag",attribute:"_tags",name:c})}),r&&t.query&&t.query.trim()&&n.push({attribute:"query",type:"query",name:t.query,query:t.query}),n}function S(e){"@babel/helpers - typeof";return S=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(e)}function U(e){return Q(e)||H(e)||L(e)||W()}function W(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function L(e,t){if(e){if(typeof e=="string")return A(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);if(r==="Object"&&e.constructor&&(r=e.constructor.name),r==="Map"||r==="Set")return Array.from(e);if(r==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return A(e,t)}}function H(e){if(typeof Symbol<"u"&&e[Symbol.iterator]!=null||e["@@iterator"]!=null)return Array.from(e)}function Q(e){if(Array.isArray(e))return A(e)}function A(e,t){(t==null||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function F(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),r.push.apply(r,n)}return r}function R(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]!=null?arguments[t]:{};t%2?F(Object(r),!0).forEach(function(n){z(e,n,r[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):F(Object(r)).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))})}return e}function z(e,t,r){return t=K(t),t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function K(e){var t=M(e,"string");return S(t)==="symbol"?t:String(t)}function M(e,t){if(S(e)!=="object"||e===null)return e;var r=e[Symbol.toPrimitive];if(r!==void 0){var n=r.call(e,t||"default");if(S(n)!=="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var I=$({name:"current-refinements",connector:!0}),B=function(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:V;return N(t,I()),function(n){if((n||{}).includedAttributes&&(n||{}).excludedAttributes)throw new Error(I("The options `includedAttributes` and `excludedAttributes` cannot be used together."));var s=n||{},l=s.includedAttributes,i=s.excludedAttributes,p=i===void 0?["query"]:i,y=s.transformItems,f=y===void 0?function(o){return o}:y;return{$$type:"ais.currentRefinements",init:function(u){var a=u.instantSearchInstance;t(R(R({},this.getWidgetRenderState(u)),{},{instantSearchInstance:a}),!0)},render:function(u){var a=u.instantSearchInstance;t(R(R({},this.getWidgetRenderState(u)),{},{instantSearchInstance:a}),!1)},dispose:function(){r()},getRenderState:function(u,a){return R(R({},u),{},{currentRefinements:this.getWidgetRenderState(a)})},getWidgetRenderState:function(u){var a=u.results,b=u.scopedResults,g=u.createURL,v=u.helper;function c(){return a?b.reduce(function(m,h){return m.concat(f(_({results:h.results,helper:h.helper,indexId:h.indexId,includedAttributes:l,excludedAttributes:p}),{results:a}))},[]):f(_({results:{},helper:v,indexId:v.state.index,includedAttributes:l,excludedAttributes:p}),{results:a})}var d=c();return{items:d,canRefine:d.length>0,refine:function(h){return q(v,h)},createURL:function(h){return g(w(v.state,h))},widgetParams:n}}}}};function _(e){var t=e.results,r=e.helper,n=e.indexId,s=e.includedAttributes,l=e.excludedAttributes,i=(s||[]).indexOf("query")!==-1||(l||[]).indexOf("query")===-1,p=s?function(f){return s.indexOf(f.attribute)!==-1}:function(f){return l.indexOf(f.attribute)===-1},y=D(t,r.state,i).map(J).filter(p);return y.reduce(function(f,o){return[].concat(U(f.filter(function(u){return u.attribute!==o.attribute})),[{indexName:r.state.index,indexId:n,attribute:o.attribute,label:o.attribute,refinements:y.filter(function(u){return u.attribute===o.attribute}).sort(function(u,a){return u.type==="numeric"?u.value-a.value:0}),refine:function(a){return q(r,a)}}])},[])}function w(e,t){switch(e=e.resetPage(),t.type){case"facet":return e.removeFacetRefinement(t.attribute,String(t.value));case"disjunctive":return e.removeDisjunctiveFacetRefinement(t.attribute,String(t.value));case"hierarchical":return e.removeHierarchicalFacetRefinement(t.attribute);case"exclude":return e.removeExcludeRefinement(t.attribute,String(t.value));case"numeric":return e.removeNumericRefinement(t.attribute,t.operator,String(t.value));case"tag":return e.removeTagRefinement(String(t.value));case"query":return e.setQueryParameter("query","");default:return e}}function q(e,t){e.setState(w(e.state,t)).search()}function G(e){switch(e){case">=":return"≥";case"<=":return"≤";default:return e}}function J(e){var t=X(e),r=e.operator?"".concat(G(e.operator)," ").concat(e.name):e.name,n={attribute:e.attribute,type:e.type,value:t,label:r};return e.operator!==void 0&&(n.operator=e.operator),e.count!==void 0&&(n.count=e.count),e.exhaustive!==void 0&&(n.exhaustive=e.exhaustive),n}function X(e){return e.type==="numeric"?Number(e.name):"escapedValue"in e?e.escapedValue:e.name}function ee(e,t){return T(B,e,t)}export{ee as u};
