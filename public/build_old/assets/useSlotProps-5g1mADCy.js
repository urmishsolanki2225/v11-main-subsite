import{r as m}from"./client-ZKQMN23D.js";import{a as _e}from"./index-D4Gjge3h.js";import{o as we,n as Pe,c as ge,p as xe,q as $e,r as Oe,s as Ee,u as Re,m as je,i as Te,d as Fe,T as Me,_ as b,a as Ne}from"./identifier-COQS9w1e.js";import{d as ke,e as Ce,r as Ie,c as se}from"./extendSxProp-BsQwgIIR.js";import{a as w}from"./_commonjsHelpers-BosuxZz1.js";const Le=Object.freeze(Object.defineProperty({__proto__:null,default:we,isPlainObject:Pe},Symbol.toStringTag,{value:"Module"}));var de={exports:{}},u={};/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q=Symbol.for("react.element"),ee=Symbol.for("react.portal"),C=Symbol.for("react.fragment"),I=Symbol.for("react.strict_mode"),L=Symbol.for("react.profiler"),D=Symbol.for("react.provider"),q=Symbol.for("react.context"),De=Symbol.for("react.server_context"),V=Symbol.for("react.forward_ref"),W=Symbol.for("react.suspense"),A=Symbol.for("react.suspense_list"),z=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),qe=Symbol.for("react.offscreen"),pe;pe=Symbol.for("react.module.reference");function y(e){if(typeof e=="object"&&e!==null){var r=e.$$typeof;switch(r){case Q:switch(e=e.type,e){case C:case L:case I:case W:case A:return e;default:switch(e=e&&e.$$typeof,e){case De:case q:case V:case H:case z:case D:return e;default:return r}}case ee:return r}}}u.ContextConsumer=q;u.ContextProvider=D;u.Element=Q;u.ForwardRef=V;u.Fragment=C;u.Lazy=H;u.Memo=z;u.Portal=ee;u.Profiler=L;u.StrictMode=I;u.Suspense=W;u.SuspenseList=A;u.isAsyncMode=function(){return!1};u.isConcurrentMode=function(){return!1};u.isContextConsumer=function(e){return y(e)===q};u.isContextProvider=function(e){return y(e)===D};u.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===Q};u.isForwardRef=function(e){return y(e)===V};u.isFragment=function(e){return y(e)===C};u.isLazy=function(e){return y(e)===H};u.isMemo=function(e){return y(e)===z};u.isPortal=function(e){return y(e)===ee};u.isProfiler=function(e){return y(e)===L};u.isStrictMode=function(e){return y(e)===I};u.isSuspense=function(e){return y(e)===W};u.isSuspenseList=function(e){return y(e)===A};u.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===C||e===L||e===I||e===W||e===A||e===qe||typeof e=="object"&&e!==null&&(e.$$typeof===H||e.$$typeof===z||e.$$typeof===D||e.$$typeof===q||e.$$typeof===V||e.$$typeof===pe||e.getModuleId!==void 0)};u.typeOf=y;de.exports=u;var ue=de.exports;const Ve=/^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;function me(e){const r=`${e}`.match(Ve);return r&&r[1]||""}function ye(e,r=""){return e.displayName||e.name||me(e)||r}function ie(e,r,t){const n=ye(r);return e.displayName||(n!==""?`${t}(${n})`:t)}function We(e){if(e!=null){if(typeof e=="string")return e;if(typeof e=="function")return ye(e,"Component");if(typeof e=="object")switch(e.$$typeof){case ue.ForwardRef:return ie(e,e.render,"ForwardRef");case ue.Memo:return ie(e,e.type,"memo");default:return}}}const Ae=Object.freeze(Object.defineProperty({__proto__:null,default:We,getFunctionName:me},Symbol.toStringTag,{value:"Module"})),ze=Object.freeze(Object.defineProperty({__proto__:null,default:ge},Symbol.toStringTag,{value:"Module"}));function Vt(e){return e&&e.ownerDocument||document}function He(e,r){typeof e=="function"?e(r):e&&(e.current=r)}const Ke=typeof window<"u"?m.useLayoutEffect:m.useEffect;function Wt({controlled:e,default:r,name:t,state:n="value"}){const{current:o}=m.useRef(e!==void 0),[s,i]=m.useState(r),c=o?e:s,a=m.useCallback(l=>{o||i(l)},[]);return[c,a]}function At(e){const r=m.useRef(e);return Ke(()=>{r.current=e}),m.useRef((...t)=>(0,r.current)(...t)).current}function Be(...e){return m.useMemo(()=>e.every(r=>r==null)?null:r=>{e.forEach(t=>{He(t,r)})},e)}const le={};function Ue(e,r){const t=m.useRef(le);return t.current===le&&(t.current=e(r)),t}const Ze=[];function Xe(e){m.useEffect(e,Ze)}class K{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new K}start(r,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},r)}}function zt(){const e=Ue(K.create).current;return Xe(e.disposeEffect),e}let B=!0,G=!1;const Ye=new K,Ge={text:!0,search:!0,url:!0,tel:!0,email:!0,password:!0,number:!0,date:!0,month:!0,week:!0,time:!0,datetime:!0,"datetime-local":!0};function Je(e){const{type:r,tagName:t}=e;return!!(t==="INPUT"&&Ge[r]&&!e.readOnly||t==="TEXTAREA"&&!e.readOnly||e.isContentEditable)}function Qe(e){e.metaKey||e.altKey||e.ctrlKey||(B=!0)}function X(){B=!1}function et(){this.visibilityState==="hidden"&&G&&(B=!0)}function tt(e){e.addEventListener("keydown",Qe,!0),e.addEventListener("mousedown",X,!0),e.addEventListener("pointerdown",X,!0),e.addEventListener("touchstart",X,!0),e.addEventListener("visibilitychange",et,!0)}function rt(e){const{target:r}=e;try{return r.matches(":focus-visible")}catch{}return B||Je(r)}function Ht(){const e=m.useCallback(o=>{o!=null&&tt(o.ownerDocument)},[]),r=m.useRef(!1);function t(){return r.current?(G=!0,Ye.start(100,()=>{G=!1}),r.current=!1,!0):!1}function n(o){return rt(o)?(r.current=!0,!0):!1}return{isFocusVisibleRef:r,onFocus:n,onBlur:t,ref:e}}function Kt(e,r,t=void 0){const n={};return Object.keys(e).forEach(o=>{n[o]=e[o].reduce((s,i)=>{if(i){const c=r(i);c!==""&&s.push(c),t&&t[i]&&s.push(t[i])}return s},[]).join(" ")}),n}function Bt(e){return _e(e)}var E={},Y={exports:{}},ae;function nt(){return ae||(ae=1,function(e){function r(t,n){if(t==null)return{};var o={};for(var s in t)if({}.hasOwnProperty.call(t,s)){if(n.indexOf(s)>=0)continue;o[s]=t[s]}return o}e.exports=r,e.exports.__esModule=!0,e.exports.default=e.exports}(Y)),Y.exports}const ot=w(ke),st=w(Le),ut=w(ze),it=w(Ae),lt=Object.freeze(Object.defineProperty({__proto__:null,default:xe,private_createBreakpoints:$e,unstable_applyStyles:Oe},Symbol.toStringTag,{value:"Module"})),at=w(lt),ct=Object.freeze(Object.defineProperty({__proto__:null,default:Ee,extendSxProp:Ce,unstable_createStyleFunctionSx:Re,unstable_defaultSxConfig:je},Symbol.toStringTag,{value:"Module"})),ft=w(ct);var P=Te;Object.defineProperty(E,"__esModule",{value:!0});var dt=E.default=$t;E.shouldForwardProp=N;E.systemDefaultTheme=void 0;var p=P(Ie()),J=P(nt()),ce=bt(ot),pt=st;P(ut);P(it);var mt=P(at),yt=P(ft);const ht=["ownerState"],vt=["variants"],St=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function he(e){if(typeof WeakMap!="function")return null;var r=new WeakMap,t=new WeakMap;return(he=function(n){return n?t:r})(e)}function bt(e,r){if(e&&e.__esModule)return e;if(e===null||typeof e!="object"&&typeof e!="function")return{default:e};var t=he(r);if(t&&t.has(e))return t.get(e);var n={__proto__:null},o=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var s in e)if(s!=="default"&&Object.prototype.hasOwnProperty.call(e,s)){var i=o?Object.getOwnPropertyDescriptor(e,s):null;i&&(i.get||i.set)?Object.defineProperty(n,s,i):n[s]=e[s]}return n.default=e,t&&t.set(e,n),n}function _t(e){return Object.keys(e).length===0}function wt(e){return typeof e=="string"&&e.charCodeAt(0)>96}function N(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Pt=E.systemDefaultTheme=(0,mt.default)(),gt=e=>e&&e.charAt(0).toLowerCase()+e.slice(1);function M({defaultTheme:e,theme:r,themeId:t}){return _t(r)?e:r[t]||r}function xt(e){return e?(r,t)=>t[e]:null}function k(e,r){let{ownerState:t}=r,n=(0,J.default)(r,ht);const o=typeof e=="function"?e((0,p.default)({ownerState:t},n)):e;if(Array.isArray(o))return o.flatMap(s=>k(s,(0,p.default)({ownerState:t},n)));if(o&&typeof o=="object"&&Array.isArray(o.variants)){const{variants:s=[]}=o;let c=(0,J.default)(o,vt);return s.forEach(a=>{let l=!0;typeof a.props=="function"?l=a.props((0,p.default)({ownerState:t},n,t)):Object.keys(a.props).forEach(d=>{(t==null?void 0:t[d])!==a.props[d]&&n[d]!==a.props[d]&&(l=!1)}),l&&(Array.isArray(c)||(c=[c]),c.push(typeof a.style=="function"?a.style((0,p.default)({ownerState:t},n,t)):a.style))}),c}return o}function $t(e={}){const{themeId:r,defaultTheme:t=Pt,rootShouldForwardProp:n=N,slotShouldForwardProp:o=N}=e,s=i=>(0,yt.default)((0,p.default)({},i,{theme:M((0,p.default)({},i,{defaultTheme:t,themeId:r}))}));return s.__mui_systemSx=!0,(i,c={})=>{(0,ce.internal_processStyles)(i,f=>f.filter(v=>!(v!=null&&v.__mui_systemSx)));const{name:a,slot:l,skipVariantsResolver:d,skipSx:g,overridesResolver:_=xt(gt(l))}=c,R=(0,J.default)(c,St),j=d!==void 0?d:l&&l!=="Root"&&l!=="root"||!1,x=g||!1;let ve,T=N;l==="Root"||l==="root"?T=n:l?T=o:wt(i)&&(T=void 0);const U=(0,ce.default)(i,(0,p.default)({shouldForwardProp:T,label:ve},R)),te=f=>typeof f=="function"&&f.__emotion_real!==f||(0,pt.isPlainObject)(f)?v=>k(f,(0,p.default)({},v,{theme:M({theme:v.theme,defaultTheme:t,themeId:r})})):f,re=(f,...v)=>{let Z=te(f);const $=v?v.map(te):[];a&&_&&$.push(S=>{const h=M((0,p.default)({},S,{defaultTheme:t,themeId:r}));if(!h.components||!h.components[a]||!h.components[a].styleOverrides)return null;const O=h.components[a].styleOverrides,F={};return Object.entries(O).forEach(([Se,be])=>{F[Se]=k(be,(0,p.default)({},S,{theme:h}))}),_(S,F)}),a&&!j&&$.push(S=>{var h;const O=M((0,p.default)({},S,{defaultTheme:t,themeId:r})),F=O==null||(h=O.components)==null||(h=h[a])==null?void 0:h.variants;return k({variants:F},(0,p.default)({},S,{theme:O}))}),x||$.push(s);const ne=$.length-v.length;if(Array.isArray(f)&&ne>0){const S=new Array(ne).fill("");Z=[...f,...S],Z.raw=[...f.raw,...S]}const oe=U(Z,...$);return i.muiName&&(oe.muiName=i.muiName),oe};return U.withConfig&&(re.withConfig=U.withConfig),re}}const Ot=Fe();function Et(e){return e!=="ownerState"&&e!=="theme"&&e!=="sx"&&e!=="as"}const Rt=e=>Et(e)&&e!=="classes",Ut=dt({themeId:Me,defaultTheme:Ot,rootShouldForwardProp:Rt});function jt(e){return typeof e=="string"}function Tt(e,r,t){return e===void 0||jt(e)?r:b({},r,{ownerState:b({},r.ownerState,t)})}function Ft(e,r=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!r.includes(n)).forEach(n=>{t[n]=e[n]}),t}function Mt(e,r,t){return typeof e=="function"?e(r,t):e}function fe(e){if(e===void 0)return{};const r={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{r[t]=e[t]}),r}function Nt(e){const{getSlotProps:r,additionalProps:t,externalSlotProps:n,externalForwardedProps:o,className:s}=e;if(!r){const R=se(t==null?void 0:t.className,s,o==null?void 0:o.className,n==null?void 0:n.className),j=b({},t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),x=b({},t,o,n);return R.length>0&&(x.className=R),Object.keys(j).length>0&&(x.style=j),{props:x,internalRef:void 0}}const i=Ft(b({},o,n)),c=fe(n),a=fe(o),l=r(i),d=se(l==null?void 0:l.className,t==null?void 0:t.className,s,o==null?void 0:o.className,n==null?void 0:n.className),g=b({},l==null?void 0:l.style,t==null?void 0:t.style,o==null?void 0:o.style,n==null?void 0:n.style),_=b({},l,t,a,c);return d.length>0&&(_.className=d),Object.keys(g).length>0&&(_.style=g),{props:_,internalRef:l.ref}}const kt=["elementType","externalSlotProps","ownerState","skipResolvingSlotProps"];function Zt(e){var r;const{elementType:t,externalSlotProps:n,ownerState:o,skipResolvingSlotProps:s=!1}=e,i=Ne(e,kt),c=s?{}:Mt(n,o),{props:a,internalRef:l}=Nt(b({},i,{externalSlotProps:c})),d=Be(l,c==null?void 0:c.ref,(r=e.additionalProps)==null?void 0:r.ref);return Tt(t,b({},a,{ref:d}),o)}export{K as T,Be as a,Mt as b,Kt as c,Ot as d,Tt as e,At as f,zt as g,Ft as h,Zt as i,Ke as j,jt as k,Wt as l,Nt as m,He as n,Vt as o,Ht as p,ot as q,Rt as r,Ut as s,Et as t,Bt as u};
