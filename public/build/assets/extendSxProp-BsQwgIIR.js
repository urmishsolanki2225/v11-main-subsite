import{w as ae,j as D,_ as P,C as Se,k as Ce,a as we,m as ke,n as _e}from"./identifier-COQS9w1e.js";import{r as g,b as K,j as se}from"./client-ZKQMN23D.js";const Z=e=>e,Pe=()=>{let e=Z;return{configure(t){e=t},generate(t){return e(t)},reset(){e=Z}}},Oe=Pe(),Ae={active:"active",checked:"checked",completed:"completed",disabled:"disabled",error:"error",expanded:"expanded",focused:"focused",focusVisible:"focusVisible",open:"open",readOnly:"readOnly",required:"required",selected:"selected"};function Ee(e,t,r="Mui"){const n=Ae[t];return n?`${r}-${n}`:`${Oe.generate(e)}-${t}`}function dt(e,t,r="Mui"){const n={};return t.forEach(o=>{n[o]=Ee(e,o,r)}),n}function ie(e){var t,r,n="";if(typeof e=="string"||typeof e=="number")n+=e;else if(typeof e=="object")if(Array.isArray(e)){var o=e.length;for(t=0;t<o;t++)e[t]&&(r=ie(e[t]))&&(n&&(n+=" "),n+=r)}else for(r in e)e[r]&&(n&&(n+=" "),n+=r);return n}function mt(){for(var e,t,r=0,n="",o=arguments.length;r<o;r++)(e=arguments[r])&&(t=ie(e))&&(n&&(n+=" "),n+=t);return n}var L={exports:{}},J;function Te(){return J||(J=1,function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(r){for(var n=1;n<arguments.length;n++){var o=arguments[n];for(var a in o)({}).hasOwnProperty.call(o,a)&&(r[a]=o[a])}return r},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(null,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports}(L)),L.exports}function le(e){var t=Object.create(null);return function(r){return t[r]===void 0&&(t[r]=e(r)),t[r]}}var Re=/^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/,Me=le(function(e){return Re.test(e)||e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)<91}),ce={exports:{}},i={};/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var c=typeof Symbol=="function"&&Symbol.for,U=c?Symbol.for("react.element"):60103,V=c?Symbol.for("react.portal"):60106,O=c?Symbol.for("react.fragment"):60107,A=c?Symbol.for("react.strict_mode"):60108,E=c?Symbol.for("react.profiler"):60114,T=c?Symbol.for("react.provider"):60109,R=c?Symbol.for("react.context"):60110,W=c?Symbol.for("react.async_mode"):60111,M=c?Symbol.for("react.concurrent_mode"):60111,$=c?Symbol.for("react.forward_ref"):60112,F=c?Symbol.for("react.suspense"):60113,$e=c?Symbol.for("react.suspense_list"):60120,I=c?Symbol.for("react.memo"):60115,j=c?Symbol.for("react.lazy"):60116,Fe=c?Symbol.for("react.block"):60121,Ie=c?Symbol.for("react.fundamental"):60117,je=c?Symbol.for("react.responder"):60118,Ne=c?Symbol.for("react.scope"):60119;function d(e){if(typeof e=="object"&&e!==null){var t=e.$$typeof;switch(t){case U:switch(e=e.type,e){case W:case M:case O:case E:case A:case F:return e;default:switch(e=e&&e.$$typeof,e){case R:case $:case j:case I:case T:return e;default:return t}}case V:return t}}}function fe(e){return d(e)===M}i.AsyncMode=W;i.ConcurrentMode=M;i.ContextConsumer=R;i.ContextProvider=T;i.Element=U;i.ForwardRef=$;i.Fragment=O;i.Lazy=j;i.Memo=I;i.Portal=V;i.Profiler=E;i.StrictMode=A;i.Suspense=F;i.isAsyncMode=function(e){return fe(e)||d(e)===W};i.isConcurrentMode=fe;i.isContextConsumer=function(e){return d(e)===R};i.isContextProvider=function(e){return d(e)===T};i.isElement=function(e){return typeof e=="object"&&e!==null&&e.$$typeof===U};i.isForwardRef=function(e){return d(e)===$};i.isFragment=function(e){return d(e)===O};i.isLazy=function(e){return d(e)===j};i.isMemo=function(e){return d(e)===I};i.isPortal=function(e){return d(e)===V};i.isProfiler=function(e){return d(e)===E};i.isStrictMode=function(e){return d(e)===A};i.isSuspense=function(e){return d(e)===F};i.isValidElementType=function(e){return typeof e=="string"||typeof e=="function"||e===O||e===M||e===E||e===A||e===F||e===$e||typeof e=="object"&&e!==null&&(e.$$typeof===j||e.$$typeof===I||e.$$typeof===T||e.$$typeof===R||e.$$typeof===$||e.$$typeof===Ie||e.$$typeof===je||e.$$typeof===Ne||e.$$typeof===Fe)};i.typeOf=d;ce.exports=i;var Le=ce.exports,ue=Le,ze={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},Ge={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},de={};de[ue.ForwardRef]=ze;de[ue.Memo]=Ge;var qe=!0;function De(e,t,r){var n="";return r.split(" ").forEach(function(o){e[o]!==void 0?t.push(e[o]+";"):n+=o+" "}),n}var me=function(t,r,n){var o=t.key+"-"+r.name;(n===!1||qe===!1)&&t.registered[o]===void 0&&(t.registered[o]=r.styles)},pe=function(t,r,n){me(t,r,n);var o=t.key+"-"+r.name;if(t.inserted[r.name]===void 0){var a=r;do t.insert(r===a?"."+o:"",a,t.sheet,!0),a=a.next;while(a!==void 0)}};function Ue(e){for(var t=0,r,n=0,o=e.length;o>=4;++n,o-=4)r=e.charCodeAt(n)&255|(e.charCodeAt(++n)&255)<<8|(e.charCodeAt(++n)&255)<<16|(e.charCodeAt(++n)&255)<<24,r=(r&65535)*1540483477+((r>>>16)*59797<<16),r^=r>>>24,t=(r&65535)*1540483477+((r>>>16)*59797<<16)^(t&65535)*1540483477+((t>>>16)*59797<<16);switch(o){case 3:t^=(e.charCodeAt(n+2)&255)<<16;case 2:t^=(e.charCodeAt(n+1)&255)<<8;case 1:t^=e.charCodeAt(n)&255,t=(t&65535)*1540483477+((t>>>16)*59797<<16)}return t^=t>>>13,t=(t&65535)*1540483477+((t>>>16)*59797<<16),((t^t>>>15)>>>0).toString(36)}var Ve={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},We=/[A-Z]|^ms/g,He=/_EMO_([^_]+?)_([^]*?)_EMO_/g,ye=function(t){return t.charCodeAt(1)===45},Q=function(t){return t!=null&&typeof t!="boolean"},z=le(function(e){return ye(e)?e:e.replace(We,"-$&").toLowerCase()}),ee=function(t,r){switch(t){case"animation":case"animationName":if(typeof r=="string")return r.replace(He,function(n,o,a){return p={name:o,styles:a,next:p},o})}return Ve[t]!==1&&!ye(t)&&typeof r=="number"&&r!==0?r+"px":r};function S(e,t,r){if(r==null)return"";if(r.__emotion_styles!==void 0)return r;switch(typeof r){case"boolean":return"";case"object":{if(r.anim===1)return p={name:r.name,styles:r.styles,next:p},r.name;if(r.styles!==void 0){var n=r.next;if(n!==void 0)for(;n!==void 0;)p={name:n.name,styles:n.styles,next:p},n=n.next;var o=r.styles+";";return o}return Be(e,t,r)}case"function":{if(e!==void 0){var a=p,s=r(e);return p=a,S(e,t,s)}break}}if(t==null)return r;var l=t[r];return l!==void 0?l:r}function Be(e,t,r){var n="";if(Array.isArray(r))for(var o=0;o<r.length;o++)n+=S(e,t,r[o])+";";else for(var a in r){var s=r[a];if(typeof s!="object")t!=null&&t[s]!==void 0?n+=a+"{"+t[s]+"}":Q(s)&&(n+=z(a)+":"+ee(a,s)+";");else if(Array.isArray(s)&&typeof s[0]=="string"&&(t==null||t[s[0]]===void 0))for(var l=0;l<s.length;l++)Q(s[l])&&(n+=z(a)+":"+ee(a,s[l])+";");else{var f=S(e,t,s);switch(a){case"animation":case"animationName":{n+=z(a)+":"+f+";";break}default:n+=a+"{"+f+"}"}}}return n}var te=/label:\s*([^\s;\n{]+)\s*(;|$)/g,p,H=function(t,r,n){if(t.length===1&&typeof t[0]=="object"&&t[0]!==null&&t[0].styles!==void 0)return t[0];var o=!0,a="";p=void 0;var s=t[0];s==null||s.raw===void 0?(o=!1,a+=S(n,r,s)):a+=s[0];for(var l=1;l<t.length;l++)a+=S(n,r,t[l]),o&&(a+=s[l]);te.lastIndex=0;for(var f="",b;(b=te.exec(a))!==null;)f+="-"+b[1];var y=Ue(a)+f;return{name:y,styles:a,next:p}},Xe=function(t){return t()},he=K.useInsertionEffect?K.useInsertionEffect:!1,Ye=he||Xe,re=he||g.useLayoutEffect;Te();var Ke=ae(function(e,t){var r=e.styles,n=H([r],void 0,g.useContext(D)),o=g.useRef();return re(function(){var a=t.key+"-global",s=new t.sheet.constructor({key:a,nonce:t.sheet.nonce,container:t.sheet.container,speedy:t.sheet.isSpeedy}),l=!1,f=document.querySelector('style[data-emotion="'+a+" "+n.name+'"]');return t.sheet.tags.length&&(s.before=t.sheet.tags[0]),f!==null&&(l=!0,f.setAttribute("data-emotion",a),s.hydrate([f])),o.current=[s,l],function(){s.flush()}},[t]),re(function(){var a=o.current,s=a[0],l=a[1];if(l){a[1]=!1;return}if(n.next!==void 0&&pe(t,n.next,!0),s.tags.length){var f=s.tags[s.tags.length-1].nextElementSibling;s.before=f,s.flush()}t.insert("",n,s,!1)},[t,n.name]),null});function ge(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return H(t)}var Ze=function(){var t=ge.apply(void 0,arguments),r="animation-"+t.name;return{name:r,styles:"@keyframes "+r+"{"+t.styles+"}",anim:1,toString:function(){return"_EMO_"+this.name+"_"+this.styles+"_EMO_"}}},Je=Me,Qe=function(t){return t!=="theme"},ne=function(t){return typeof t=="string"&&t.charCodeAt(0)>96?Je:Qe},oe=function(t,r,n){var o;if(r){var a=r.shouldForwardProp;o=t.__emotion_forwardProp&&a?function(s){return t.__emotion_forwardProp(s)&&a(s)}:a}return typeof o!="function"&&n&&(o=t.__emotion_forwardProp),o},et=function(t){var r=t.cache,n=t.serialized,o=t.isStringTag;return me(r,n,o),Ye(function(){return pe(r,n,o)}),null},tt=function e(t,r){var n=t.__emotion_real===t,o=n&&t.__emotion_base||t,a,s;r!==void 0&&(a=r.label,s=r.target);var l=oe(t,r,n),f=l||ne(o),b=!f("as");return function(){var y=arguments,h=n&&t.__emotion_styles!==void 0?t.__emotion_styles.slice(0):[];if(a!==void 0&&h.push("label:"+a+";"),y[0]==null||y[0].raw===void 0)h.push.apply(h,y);else{h.push(y[0][0]);for(var ve=y.length,C=1;C<ve;C++)h.push(y[C],y[0][C])}var m=ae(function(u,v,be){var N=b&&u.as||o,x="",B=[],w=u;if(u.theme==null){w={};for(var X in u)w[X]=u[X];w.theme=g.useContext(D)}typeof u.className=="string"?x=De(v.registered,B,u.className):u.className!=null&&(x=u.className+" ");var Y=H(h.concat(B),v.registered,w);x+=v.key+"-"+Y.name,s!==void 0&&(x+=" "+s);var xe=b&&l===void 0?ne(N):f,k={};for(var _ in u)b&&_==="as"||xe(_)&&(k[_]=u[_]);return k.className=x,k.ref=be,g.createElement(g.Fragment,null,g.createElement(et,{cache:v,serialized:Y,isStringTag:typeof N=="string"}),g.createElement(N,k))});return m.displayName=a!==void 0?a:"Styled("+(typeof o=="string"?o:o.displayName||o.name||"Component")+")",m.defaultProps=t.defaultProps,m.__emotion_real=m,m.__emotion_base=o,m.__emotion_styles=h,m.__emotion_forwardProp=l,Object.defineProperty(m,"toString",{value:function(){return"."+s}}),m.withComponent=function(u,v){return e(u,P({},r,v,{shouldForwardProp:oe(m,v,!0)})).apply(void 0,h)},m}},rt=["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","marquee","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","u","ul","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"],G=tt.bind();rt.forEach(function(e){G[e]=G(e)});let q;typeof document=="object"&&(q=Ce({key:"css",prepend:!0}));function nt(e){const{injectFirst:t,children:r}=e;return t&&q?se.jsx(Se,{value:q,children:r}):r}function ot(e){return e==null||Object.keys(e).length===0}function at(e){const{styles:t,defaultTheme:r={}}=e,n=typeof t=="function"?o=>t(ot(o)?r:o):t;return se.jsx(Ke,{styles:n})}function st(e,t){return G(e,t)}const it=(e,t)=>{Array.isArray(e.__emotion_styles)&&(e.__emotion_styles=t(e.__emotion_styles))},pt=Object.freeze(Object.defineProperty({__proto__:null,GlobalStyles:at,StyledEngineProvider:nt,ThemeContext:D,css:ge,default:st,internal_processStyles:it,keyframes:Ze},Symbol.toStringTag,{value:"Module"})),lt=["sx"],ct=e=>{var t,r;const n={systemProps:{},otherProps:{}},o=(t=e==null||(r=e.theme)==null?void 0:r.unstable_sxConfig)!=null?t:ke;return Object.keys(e).forEach(a=>{o[a]?n.systemProps[a]=e[a]:n.otherProps[a]=e[a]}),n};function yt(e){const{sx:t}=e,r=we(e,lt),{systemProps:n,otherProps:o}=ct(r);let a;return Array.isArray(t)?a=[n,...t]:typeof t=="function"?a=(...s)=>{const l=t(...s);return _e(l)?P({},n,l):n}:a=P({},n,t),P({},o,{sx:a})}export{Oe as C,at as G,nt as S,dt as a,ge as b,mt as c,pt as d,yt as e,Ae as f,Ee as g,it as i,Ze as k,Te as r,st as s};
