import{r as ye}from"./client-ZKQMN23D.js";import{a as rt}from"./_commonjsHelpers-BosuxZz1.js";var nt={exports:{}};(function(e){function t(r){return r&&r.__esModule?r:{default:r}}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports})(nt);var At=nt.exports;function T(){return T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},T.apply(null,arguments)}function J(e){if(typeof e!="object"||e===null)return!1;const t=Object.getPrototypeOf(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function at(e){if(!J(e))return e;const t={};return Object.keys(e).forEach(r=>{t[r]=at(e[r])}),t}function L(e,t,r={clone:!0}){const n=r.clone?T({},e):e;return J(e)&&J(t)&&Object.keys(t).forEach(a=>{J(t[a])&&Object.prototype.hasOwnProperty.call(e,a)&&J(e[a])?n[a]=L(e[a],t[a],r):r.clone?n[a]=J(t[a])?at(t[a]):t[a]:n[a]=t[a]}),n}function se(e){let t="https://mui.com/production-error/?code="+e;for(let r=1;r<arguments.length;r+=1)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified MUI error #"+e+"; visit "+t+" for the full message."}const Ct=Object.freeze(Object.defineProperty({__proto__:null,default:se},Symbol.toStringTag,{value:"Module"}));function it(e){if(typeof e!="string")throw new Error(se(7));return e.charAt(0).toUpperCase()+e.slice(1)}function Ot(e,t=Number.MIN_SAFE_INTEGER,r=Number.MAX_SAFE_INTEGER){return Math.max(t,Math.min(e,r))}const St=Object.freeze(Object.defineProperty({__proto__:null,default:Ot},Symbol.toStringTag,{value:"Module"}));function ee(e,t){if(e==null)return{};var r={};for(var n in e)if({}.hasOwnProperty.call(e,n)){if(t.indexOf(n)>=0)continue;r[n]=e[n]}return r}function Tt(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]}function _t(e){var t=document.createElement("style");return t.setAttribute("data-emotion",e.key),e.nonce!==void 0&&t.setAttribute("nonce",e.nonce),t.appendChild(document.createTextNode("")),t.setAttribute("data-s",""),t}var Rt=function(){function e(r){var n=this;this._insertTag=function(a){var i;n.tags.length===0?n.insertionPoint?i=n.insertionPoint.nextSibling:n.prepend?i=n.container.firstChild:i=n.before:i=n.tags[n.tags.length-1].nextSibling,n.container.insertBefore(a,i),n.tags.push(a)},this.isSpeedy=r.speedy===void 0?!0:r.speedy,this.tags=[],this.ctr=0,this.nonce=r.nonce,this.key=r.key,this.container=r.container,this.prepend=r.prepend,this.insertionPoint=r.insertionPoint,this.before=null}var t=e.prototype;return t.hydrate=function(n){n.forEach(this._insertTag)},t.insert=function(n){this.ctr%(this.isSpeedy?65e3:1)===0&&this._insertTag(_t(this));var a=this.tags[this.tags.length-1];if(this.isSpeedy){var i=Tt(a);try{i.insertRule(n,i.cssRules.length)}catch{}}else a.appendChild(document.createTextNode(n));this.ctr++},t.flush=function(){this.tags.forEach(function(n){return n.parentNode&&n.parentNode.removeChild(n)}),this.tags=[],this.ctr=0},e}(),R="-ms-",be="-moz-",g="-webkit-",st="comm",Be="rule",je="decl",Pt="@import",ot="@keyframes",Et="@layer",Bt=Math.abs,ve=String.fromCharCode,jt=Object.assign;function Mt(e,t){return _(e,0)^45?(((t<<2^_(e,0))<<2^_(e,1))<<2^_(e,2))<<2^_(e,3):0}function ct(e){return e.trim()}function It(e,t){return(e=t.exec(e))?e[0]:e}function m(e,t,r){return e.replace(t,r)}function Pe(e,t){return e.indexOf(t)}function _(e,t){return e.charCodeAt(t)|0}function oe(e,t,r){return e.slice(t,r)}function W(e){return e.length}function Me(e){return e.length}function he(e,t){return t.push(e),e}function Kt(e,t){return e.map(t).join("")}var $e=1,V=1,ft=0,E=0,S=0,te="";function ke(e,t,r,n,a,i,s){return{value:e,root:t,parent:r,type:n,props:a,children:i,line:$e,column:V,length:s,return:""}}function ne(e,t){return jt(ke("",null,null,"",null,null,0),e,{length:-e.length},t)}function zt(){return S}function Wt(){return S=E>0?_(te,--E):0,V--,S===10&&(V=1,$e--),S}function j(){return S=E<ft?_(te,E++):0,V++,S===10&&(V=1,$e++),S}function D(){return _(te,E)}function pe(){return E}function ue(e,t){return oe(te,e,t)}function ce(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ut(e){return $e=V=1,ft=W(te=e),E=0,[]}function lt(e){return te="",e}function ge(e){return ct(ue(E-1,Ee(e===91?e+2:e===40?e+1:e)))}function Lt(e){for(;(S=D())&&S<33;)j();return ce(e)>2||ce(S)>3?"":" "}function Dt(e,t){for(;--t&&j()&&!(S<48||S>102||S>57&&S<65||S>70&&S<97););return ue(e,pe()+(t<6&&D()==32&&j()==32))}function Ee(e){for(;j();)switch(S){case e:return E;case 34:case 39:e!==34&&e!==39&&Ee(S);break;case 40:e===41&&Ee(e);break;case 92:j();break}return E}function Ht(e,t){for(;j()&&e+S!==57;)if(e+S===84&&D()===47)break;return"/*"+ue(t,E-1)+"*"+ve(e===47?e:j())}function Gt(e){for(;!ce(D());)j();return ue(e,E)}function Nt(e){return lt(me("",null,null,null,[""],e=ut(e),0,[0],e))}function me(e,t,r,n,a,i,s,o,f){for(var l=0,h=0,d=s,u=0,y=0,p=0,c=1,w=1,b=1,A=0,P="",N=a,H=i,z=n,x=P;w;)switch(p=A,A=j()){case 40:if(p!=108&&_(x,d-1)==58){Pe(x+=m(ge(A),"&","&\f"),"&\f")!=-1&&(b=-1);break}case 34:case 39:case 91:x+=ge(A);break;case 9:case 10:case 13:case 32:x+=Lt(p);break;case 92:x+=Dt(pe()-1,7);continue;case 47:switch(D()){case 42:case 47:he(Ft(Ht(j(),pe()),t,r),f);break;default:x+="/"}break;case 123*c:o[l++]=W(x)*b;case 125*c:case 59:case 0:switch(A){case 0:case 125:w=0;case 59+h:b==-1&&(x=m(x,/\f/g,"")),y>0&&W(x)-d&&he(y>32?Ue(x+";",n,r,d-1):Ue(m(x," ","")+";",n,r,d-2),f);break;case 59:x+=";";default:if(he(z=Fe(x,t,r,l,h,a,o,P,N=[],H=[],d),i),A===123)if(h===0)me(x,t,z,z,N,i,d,o,H);else switch(u===99&&_(x,3)===110?100:u){case 100:case 108:case 109:case 115:me(e,z,z,n&&he(Fe(e,z,z,0,0,a,o,P,a,N=[],d),H),a,H,d,o,n?N:H);break;default:me(x,z,z,z,[""],H,0,o,H)}}l=h=y=0,c=b=1,P=x="",d=s;break;case 58:d=1+W(x),y=p;default:if(c<1){if(A==123)--c;else if(A==125&&c++==0&&Wt()==125)continue}switch(x+=ve(A),A*c){case 38:b=h>0?1:(x+="\f",-1);break;case 44:o[l++]=(W(x)-1)*b,b=1;break;case 64:D()===45&&(x+=ge(j())),u=D(),h=d=W(P=x+=Gt(pe())),A++;break;case 45:p===45&&W(x)==2&&(c=0)}}return i}function Fe(e,t,r,n,a,i,s,o,f,l,h){for(var d=a-1,u=a===0?i:[""],y=Me(u),p=0,c=0,w=0;p<n;++p)for(var b=0,A=oe(e,d+1,d=Bt(c=s[p])),P=e;b<y;++b)(P=ct(c>0?u[b]+" "+A:m(A,/&\f/g,u[b])))&&(f[w++]=P);return ke(e,t,r,a===0?Be:o,f,l,h)}function Ft(e,t,r){return ke(e,t,r,st,ve(zt()),oe(e,2,-2),0)}function Ue(e,t,r,n){return ke(e,t,r,je,oe(e,0,n),oe(e,n+1,-1),n)}function Z(e,t){for(var r="",n=Me(e),a=0;a<n;a++)r+=t(e[a],a,e,t)||"";return r}function Ut(e,t,r,n){switch(e.type){case Et:if(e.children.length)break;case Pt:case je:return e.return=e.return||e.value;case st:return"";case ot:return e.return=e.value+"{"+Z(e.children,n)+"}";case Be:e.value=e.props.join(",")}return W(r=Z(e.children,n))?e.return=e.value+"{"+r+"}":""}function qt(e){var t=Me(e);return function(r,n,a,i){for(var s="",o=0;o<t;o++)s+=e[o](r,n,a,i)||"";return s}}function Yt(e){return function(t){t.root||(t=t.return)&&e(t)}}var Xt=function(t,r,n){for(var a=0,i=0;a=i,i=D(),a===38&&i===12&&(r[n]=1),!ce(i);)j();return ue(t,E)},Jt=function(t,r){var n=-1,a=44;do switch(ce(a)){case 0:a===38&&D()===12&&(r[n]=1),t[n]+=Xt(E-1,r,n);break;case 2:t[n]+=ge(a);break;case 4:if(a===44){t[++n]=D()===58?"&\f":"",r[n]=t[n].length;break}default:t[n]+=ve(a)}while(a=j());return t},Zt=function(t,r){return lt(Jt(ut(t),r))},qe=new WeakMap,Qt=function(t){if(!(t.type!=="rule"||!t.parent||t.length<1)){for(var r=t.value,n=t.parent,a=t.column===n.column&&t.line===n.line;n.type!=="rule";)if(n=n.parent,!n)return;if(!(t.props.length===1&&r.charCodeAt(0)!==58&&!qe.get(n))&&!a){qe.set(t,!0);for(var i=[],s=Zt(r,i),o=n.props,f=0,l=0;f<s.length;f++)for(var h=0;h<o.length;h++,l++)t.props[l]=i[f]?s[f].replace(/&\f/g,o[h]):o[h]+" "+s[f]}}},Vt=function(t){if(t.type==="decl"){var r=t.value;r.charCodeAt(0)===108&&r.charCodeAt(2)===98&&(t.return="",t.value="")}};function dt(e,t){switch(Mt(e,t)){case 5103:return g+"print-"+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return g+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return g+e+be+e+R+e+e;case 6828:case 4268:return g+e+R+e+e;case 6165:return g+e+R+"flex-"+e+e;case 5187:return g+e+m(e,/(\w+).+(:[^]+)/,g+"box-$1$2"+R+"flex-$1$2")+e;case 5443:return g+e+R+"flex-item-"+m(e,/flex-|-self/,"")+e;case 4675:return g+e+R+"flex-line-pack"+m(e,/align-content|flex-|-self/,"")+e;case 5548:return g+e+R+m(e,"shrink","negative")+e;case 5292:return g+e+R+m(e,"basis","preferred-size")+e;case 6060:return g+"box-"+m(e,"-grow","")+g+e+R+m(e,"grow","positive")+e;case 4554:return g+m(e,/([^-])(transform)/g,"$1"+g+"$2")+e;case 6187:return m(m(m(e,/(zoom-|grab)/,g+"$1"),/(image-set)/,g+"$1"),e,"")+e;case 5495:case 3959:return m(e,/(image-set\([^]*)/,g+"$1$`$1");case 4968:return m(m(e,/(.+:)(flex-)?(.*)/,g+"box-pack:$3"+R+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+g+e+e;case 4095:case 3583:case 4068:case 2532:return m(e,/(.+)-inline(.+)/,g+"$1$2")+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(W(e)-1-t>6)switch(_(e,t+1)){case 109:if(_(e,t+4)!==45)break;case 102:return m(e,/(.+:)(.+)-([^]+)/,"$1"+g+"$2-$3$1"+be+(_(e,t+3)==108?"$3":"$2-$3"))+e;case 115:return~Pe(e,"stretch")?dt(m(e,"stretch","fill-available"),t)+e:e}break;case 4949:if(_(e,t+1)!==115)break;case 6444:switch(_(e,W(e)-3-(~Pe(e,"!important")&&10))){case 107:return m(e,":",":"+g)+e;case 101:return m(e,/(.+:)([^;!]+)(;|!.+)?/,"$1"+g+(_(e,14)===45?"inline-":"")+"box$3$1"+g+"$2$3$1"+R+"$2box$3")+e}break;case 5936:switch(_(e,t+11)){case 114:return g+e+R+m(e,/[svh]\w+-[tblr]{2}/,"tb")+e;case 108:return g+e+R+m(e,/[svh]\w+-[tblr]{2}/,"tb-rl")+e;case 45:return g+e+R+m(e,/[svh]\w+-[tblr]{2}/,"lr")+e}return g+e+R+e+e}return e}var er=function(t,r,n,a){if(t.length>-1&&!t.return)switch(t.type){case je:t.return=dt(t.value,t.length);break;case ot:return Z([ne(t,{value:m(t.value,"@","@"+g)})],a);case Be:if(t.length)return Kt(t.props,function(i){switch(It(i,/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":return Z([ne(t,{props:[m(i,/:(read-\w+)/,":"+be+"$1")]})],a);case"::placeholder":return Z([ne(t,{props:[m(i,/:(plac\w+)/,":"+g+"input-$1")]}),ne(t,{props:[m(i,/:(plac\w+)/,":"+be+"$1")]}),ne(t,{props:[m(i,/:(plac\w+)/,R+"input-$1")]})],a)}return""})}},tr=[er],rr=function(t){var r=t.key;if(r==="css"){var n=document.querySelectorAll("style[data-emotion]:not([data-s])");Array.prototype.forEach.call(n,function(c){var w=c.getAttribute("data-emotion");w.indexOf(" ")!==-1&&(document.head.appendChild(c),c.setAttribute("data-s",""))})}var a=t.stylisPlugins||tr,i={},s,o=[];s=t.container||document.head,Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="'+r+' "]'),function(c){for(var w=c.getAttribute("data-emotion").split(" "),b=1;b<w.length;b++)i[w[b]]=!0;o.push(c)});var f,l=[Qt,Vt];{var h,d=[Ut,Yt(function(c){h.insert(c)})],u=qt(l.concat(a,d)),y=function(w){return Z(Nt(w),u)};f=function(w,b,A,P){h=A,y(w?w+"{"+b.styles+"}":b.styles),P&&(p.inserted[b.name]=!0)}}var p={key:r,sheet:new Rt({key:r,container:s,nonce:t.nonce,speedy:t.speedy,prepend:t.prepend,insertionPoint:t.insertionPoint}),nonce:t.nonce,inserted:i,registered:{},insert:f};return p.sheet.hydrate(o),p},ht=ye.createContext(typeof HTMLElement<"u"?rr({key:"css"}):null),Wn=ht.Provider,Ln=function(t){return ye.forwardRef(function(r,n){var a=ye.useContext(ht);return t(r,a,n)})},Dn=ye.createContext({});const nr=["values","unit","step"],ar=e=>{const t=Object.keys(e).map(r=>({key:r,val:e[r]}))||[];return t.sort((r,n)=>r.val-n.val),t.reduce((r,n)=>T({},r,{[n.key]:n.val}),{})};function ir(e){const{values:t={xs:0,sm:600,md:900,lg:1200,xl:1536},unit:r="px",step:n=5}=e,a=ee(e,nr),i=ar(t),s=Object.keys(i);function o(u){return`@media (min-width:${typeof t[u]=="number"?t[u]:u}${r})`}function f(u){return`@media (max-width:${(typeof t[u]=="number"?t[u]:u)-n/100}${r})`}function l(u,y){const p=s.indexOf(y);return`@media (min-width:${typeof t[u]=="number"?t[u]:u}${r}) and (max-width:${(p!==-1&&typeof t[s[p]]=="number"?t[s[p]]:y)-n/100}${r})`}function h(u){return s.indexOf(u)+1<s.length?l(u,s[s.indexOf(u)+1]):o(u)}function d(u){const y=s.indexOf(u);return y===0?o(s[1]):y===s.length-1?f(s[y]):l(u,s[s.indexOf(u)+1]).replace("@media","@media not all and")}return T({keys:s,values:i,up:o,down:f,between:l,only:h,not:d,unit:r},a)}const sr={borderRadius:4};function ie(e,t){return t?L(e,t,{clone:!1}):e}const Ie={xs:0,sm:600,md:900,lg:1200,xl:1536},Ye={keys:["xs","sm","md","lg","xl"],up:e=>`@media (min-width:${Ie[e]}px)`};function G(e,t,r){const n=e.theme||{};if(Array.isArray(t)){const i=n.breakpoints||Ye;return t.reduce((s,o,f)=>(s[i.up(i.keys[f])]=r(t[f]),s),{})}if(typeof t=="object"){const i=n.breakpoints||Ye;return Object.keys(t).reduce((s,o)=>{if(Object.keys(i.values||Ie).indexOf(o)!==-1){const f=i.up(o);s[f]=r(t[o],o)}else{const f=o;s[f]=t[f]}return s},{})}return r(t)}function pt(e={}){var t;return((t=e.keys)==null?void 0:t.reduce((n,a)=>{const i=e.up(a);return n[i]={},n},{}))||{}}function gt(e,t){return e.reduce((r,n)=>{const a=r[n];return(!a||Object.keys(a).length===0)&&delete r[n],r},t)}function Hn(e,...t){const r=pt(e),n=[r,...t].reduce((a,i)=>L(a,i),{});return gt(Object.keys(r),n)}function or(e,t){if(typeof e!="object")return{};const r={},n=Object.keys(t);return Array.isArray(e)?n.forEach((a,i)=>{i<e.length&&(r[a]=!0)}):n.forEach(a=>{e[a]!=null&&(r[a]=!0)}),r}function Gn({values:e,breakpoints:t,base:r}){const n=r||or(e,t),a=Object.keys(n);if(a.length===0)return e;let i;return a.reduce((s,o,f)=>(Array.isArray(e)?(s[o]=e[f]!=null?e[f]:e[i],i=f):typeof e=="object"?(s[o]=e[o]!=null?e[o]:e[i],i=o):s[o]=e,s),{})}function Ae(e,t,r=!0){if(!t||typeof t!="string")return null;if(e&&e.vars&&r){const n=`vars.${t}`.split(".").reduce((a,i)=>a&&a[i]?a[i]:null,e);if(n!=null)return n}return t.split(".").reduce((n,a)=>n&&n[a]!=null?n[a]:null,e)}function xe(e,t,r,n=r){let a;return typeof e=="function"?a=e(r):Array.isArray(e)?a=e[r]||n:a=Ae(e,r)||n,t&&(a=t(a,n,e)),a}function C(e){const{prop:t,cssProperty:r=e.prop,themeKey:n,transform:a}=e,i=s=>{if(s[t]==null)return null;const o=s[t],f=s.theme,l=Ae(f,n)||{};return G(s,o,d=>{let u=xe(l,a,d);return d===u&&typeof d=="string"&&(u=xe(l,a,`${t}${d==="default"?"":it(d)}`,d)),r===!1?u:{[r]:u}})};return i.propTypes={},i.filterProps=[t],i}function cr(e){const t={};return r=>(t[r]===void 0&&(t[r]=e(r)),t[r])}const fr={m:"margin",p:"padding"},ur={t:"Top",r:"Right",b:"Bottom",l:"Left",x:["Left","Right"],y:["Top","Bottom"]},Xe={marginX:"mx",marginY:"my",paddingX:"px",paddingY:"py"},lr=cr(e=>{if(e.length>2)if(Xe[e])e=Xe[e];else return[e];const[t,r]=e.split(""),n=fr[t],a=ur[r]||"";return Array.isArray(a)?a.map(i=>n+i):[n+a]}),Ke=["m","mt","mr","mb","ml","mx","my","margin","marginTop","marginRight","marginBottom","marginLeft","marginX","marginY","marginInline","marginInlineStart","marginInlineEnd","marginBlock","marginBlockStart","marginBlockEnd"],ze=["p","pt","pr","pb","pl","px","py","padding","paddingTop","paddingRight","paddingBottom","paddingLeft","paddingX","paddingY","paddingInline","paddingInlineStart","paddingInlineEnd","paddingBlock","paddingBlockStart","paddingBlockEnd"];[...Ke,...ze];function le(e,t,r,n){var a;const i=(a=Ae(e,t,!1))!=null?a:r;return typeof i=="number"?s=>typeof s=="string"?s:i*s:Array.isArray(i)?s=>typeof s=="string"?s:i[s]:typeof i=="function"?i:()=>{}}function mt(e){return le(e,"spacing",8)}function de(e,t){if(typeof t=="string"||t==null)return t;const r=Math.abs(t),n=e(r);return t>=0?n:typeof n=="number"?-n:`-${n}`}function dr(e,t){return r=>e.reduce((n,a)=>(n[a]=de(t,r),n),{})}function hr(e,t,r,n){if(t.indexOf(r)===-1)return null;const a=lr(r),i=dr(a,n),s=e[r];return G(e,s,i)}function yt(e,t){const r=mt(e.theme);return Object.keys(e).map(n=>hr(e,t,n,r)).reduce(ie,{})}function $(e){return yt(e,Ke)}$.propTypes={};$.filterProps=Ke;function k(e){return yt(e,ze)}k.propTypes={};k.filterProps=ze;function pr(e=8){if(e.mui)return e;const t=mt({spacing:e}),r=(...n)=>(n.length===0?[1]:n).map(i=>{const s=t(i);return typeof s=="number"?`${s}px`:s}).join(" ");return r.mui=!0,r}function Ce(...e){const t=e.reduce((n,a)=>(a.filterProps.forEach(i=>{n[i]=a}),n),{}),r=n=>Object.keys(n).reduce((a,i)=>t[i]?ie(a,t[i](n)):a,{});return r.propTypes={},r.filterProps=e.reduce((n,a)=>n.concat(a.filterProps),[]),r}function M(e){return typeof e!="number"?e:`${e}px solid`}function K(e,t){return C({prop:e,themeKey:"borders",transform:t})}const gr=K("border",M),mr=K("borderTop",M),yr=K("borderRight",M),br=K("borderBottom",M),xr=K("borderLeft",M),wr=K("borderColor"),vr=K("borderTopColor"),$r=K("borderRightColor"),kr=K("borderBottomColor"),Ar=K("borderLeftColor"),Cr=K("outline",M),Or=K("outlineColor"),Oe=e=>{if(e.borderRadius!==void 0&&e.borderRadius!==null){const t=le(e.theme,"shape.borderRadius",4),r=n=>({borderRadius:de(t,n)});return G(e,e.borderRadius,r)}return null};Oe.propTypes={};Oe.filterProps=["borderRadius"];Ce(gr,mr,yr,br,xr,wr,vr,$r,kr,Ar,Oe,Cr,Or);const Se=e=>{if(e.gap!==void 0&&e.gap!==null){const t=le(e.theme,"spacing",8),r=n=>({gap:de(t,n)});return G(e,e.gap,r)}return null};Se.propTypes={};Se.filterProps=["gap"];const Te=e=>{if(e.columnGap!==void 0&&e.columnGap!==null){const t=le(e.theme,"spacing",8),r=n=>({columnGap:de(t,n)});return G(e,e.columnGap,r)}return null};Te.propTypes={};Te.filterProps=["columnGap"];const _e=e=>{if(e.rowGap!==void 0&&e.rowGap!==null){const t=le(e.theme,"spacing",8),r=n=>({rowGap:de(t,n)});return G(e,e.rowGap,r)}return null};_e.propTypes={};_e.filterProps=["rowGap"];const Sr=C({prop:"gridColumn"}),Tr=C({prop:"gridRow"}),_r=C({prop:"gridAutoFlow"}),Rr=C({prop:"gridAutoColumns"}),Pr=C({prop:"gridAutoRows"}),Er=C({prop:"gridTemplateColumns"}),Br=C({prop:"gridTemplateRows"}),jr=C({prop:"gridTemplateAreas"}),Mr=C({prop:"gridArea"});Ce(Se,Te,_e,Sr,Tr,_r,Rr,Pr,Er,Br,jr,Mr);function Q(e,t){return t==="grey"?t:e}const Ir=C({prop:"color",themeKey:"palette",transform:Q}),Kr=C({prop:"bgcolor",cssProperty:"backgroundColor",themeKey:"palette",transform:Q}),zr=C({prop:"backgroundColor",themeKey:"palette",transform:Q});Ce(Ir,Kr,zr);function B(e){return e<=1&&e!==0?`${e*100}%`:e}const Wr=C({prop:"width",transform:B}),We=e=>{if(e.maxWidth!==void 0&&e.maxWidth!==null){const t=r=>{var n,a;const i=((n=e.theme)==null||(n=n.breakpoints)==null||(n=n.values)==null?void 0:n[r])||Ie[r];return i?((a=e.theme)==null||(a=a.breakpoints)==null?void 0:a.unit)!=="px"?{maxWidth:`${i}${e.theme.breakpoints.unit}`}:{maxWidth:i}:{maxWidth:B(r)}};return G(e,e.maxWidth,t)}return null};We.filterProps=["maxWidth"];const Lr=C({prop:"minWidth",transform:B}),Dr=C({prop:"height",transform:B}),Hr=C({prop:"maxHeight",transform:B}),Gr=C({prop:"minHeight",transform:B});C({prop:"size",cssProperty:"width",transform:B});C({prop:"size",cssProperty:"height",transform:B});const Nr=C({prop:"boxSizing"});Ce(Wr,We,Lr,Dr,Hr,Gr,Nr);const Le={border:{themeKey:"borders",transform:M},borderTop:{themeKey:"borders",transform:M},borderRight:{themeKey:"borders",transform:M},borderBottom:{themeKey:"borders",transform:M},borderLeft:{themeKey:"borders",transform:M},borderColor:{themeKey:"palette"},borderTopColor:{themeKey:"palette"},borderRightColor:{themeKey:"palette"},borderBottomColor:{themeKey:"palette"},borderLeftColor:{themeKey:"palette"},outline:{themeKey:"borders",transform:M},outlineColor:{themeKey:"palette"},borderRadius:{themeKey:"shape.borderRadius",style:Oe},color:{themeKey:"palette",transform:Q},bgcolor:{themeKey:"palette",cssProperty:"backgroundColor",transform:Q},backgroundColor:{themeKey:"palette",transform:Q},p:{style:k},pt:{style:k},pr:{style:k},pb:{style:k},pl:{style:k},px:{style:k},py:{style:k},padding:{style:k},paddingTop:{style:k},paddingRight:{style:k},paddingBottom:{style:k},paddingLeft:{style:k},paddingX:{style:k},paddingY:{style:k},paddingInline:{style:k},paddingInlineStart:{style:k},paddingInlineEnd:{style:k},paddingBlock:{style:k},paddingBlockStart:{style:k},paddingBlockEnd:{style:k},m:{style:$},mt:{style:$},mr:{style:$},mb:{style:$},ml:{style:$},mx:{style:$},my:{style:$},margin:{style:$},marginTop:{style:$},marginRight:{style:$},marginBottom:{style:$},marginLeft:{style:$},marginX:{style:$},marginY:{style:$},marginInline:{style:$},marginInlineStart:{style:$},marginInlineEnd:{style:$},marginBlock:{style:$},marginBlockStart:{style:$},marginBlockEnd:{style:$},displayPrint:{cssProperty:!1,transform:e=>({"@media print":{display:e}})},display:{},overflow:{},textOverflow:{},visibility:{},whiteSpace:{},flexBasis:{},flexDirection:{},flexWrap:{},justifyContent:{},alignItems:{},alignContent:{},order:{},flex:{},flexGrow:{},flexShrink:{},alignSelf:{},justifyItems:{},justifySelf:{},gap:{style:Se},rowGap:{style:_e},columnGap:{style:Te},gridColumn:{},gridRow:{},gridAutoFlow:{},gridAutoColumns:{},gridAutoRows:{},gridTemplateColumns:{},gridTemplateRows:{},gridTemplateAreas:{},gridArea:{},position:{},zIndex:{themeKey:"zIndex"},top:{},right:{},bottom:{},left:{},boxShadow:{themeKey:"shadows"},width:{transform:B},maxWidth:{style:We},minWidth:{transform:B},height:{transform:B},maxHeight:{transform:B},minHeight:{transform:B},boxSizing:{},fontFamily:{themeKey:"typography"},fontSize:{themeKey:"typography"},fontStyle:{themeKey:"typography"},fontWeight:{themeKey:"typography"},letterSpacing:{},textTransform:{},lineHeight:{},textAlign:{},typography:{cssProperty:!1,themeKey:"typography"}};function Fr(...e){const t=e.reduce((n,a)=>n.concat(Object.keys(a)),[]),r=new Set(t);return e.every(n=>r.size===Object.keys(n).length)}function Ur(e,t){return typeof e=="function"?e(t):e}function qr(){function e(r,n,a,i){const s={[r]:n,theme:a},o=i[r];if(!o)return{[r]:n};const{cssProperty:f=r,themeKey:l,transform:h,style:d}=o;if(n==null)return null;if(l==="typography"&&n==="inherit")return{[r]:n};const u=Ae(a,l)||{};return d?d(s):G(s,n,p=>{let c=xe(u,h,p);return p===c&&typeof p=="string"&&(c=xe(u,h,`${r}${p==="default"?"":it(p)}`,p)),f===!1?c:{[f]:c}})}function t(r){var n;const{sx:a,theme:i={}}=r||{};if(!a)return null;const s=(n=i.unstable_sxConfig)!=null?n:Le;function o(f){let l=f;if(typeof f=="function")l=f(i);else if(typeof f!="object")return f;if(!l)return null;const h=pt(i.breakpoints),d=Object.keys(h);let u=h;return Object.keys(l).forEach(y=>{const p=Ur(l[y],i);if(p!=null)if(typeof p=="object")if(s[y])u=ie(u,e(y,p,i,s));else{const c=G({theme:i},p,w=>({[y]:w}));Fr(c,p)?u[y]=t({sx:p,theme:i}):u=ie(u,c)}else u=ie(u,e(y,p,i,s))}),gt(d,u)}return Array.isArray(a)?a.map(o):o(a)}return t}const De=qr();De.filterProps=["sx"];function Yr(e,t){const r=this;return r.vars&&typeof r.getColorSchemeSelector=="function"?{[r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/,"*:where($1)")]:t}:r.palette.mode===e?t:{}}const Xr=["breakpoints","palette","spacing","shape"];function Jr(e={},...t){const{breakpoints:r={},palette:n={},spacing:a,shape:i={}}=e,s=ee(e,Xr),o=ir(r),f=pr(a);let l=L({breakpoints:o,direction:"ltr",components:{},palette:T({mode:"light"},n),spacing:f,shape:T({},sr,i)},s);return l.applyStyles=Yr,l=t.reduce((h,d)=>L(h,d),l),l.unstable_sxConfig=T({},Le,s==null?void 0:s.unstable_sxConfig),l.unstable_sx=function(d){return De({sx:d,theme:this})},l}function Zr(e,t){return T({toolbar:{minHeight:56,[e.up("xs")]:{"@media (orientation: landscape)":{minHeight:48}},[e.up("sm")]:{minHeight:64}}},t)}var O={};const Qr=rt(Ct),Vr=rt(St);var bt=At;Object.defineProperty(O,"__esModule",{value:!0});var Nn=O.alpha=$t;O.blend=hn;O.colorChannel=void 0;var en=O.darken=Ge;O.decomposeColor=I;var Fn=O.emphasize=kt,tn=O.getContrastRatio=cn;O.getLuminance=we;O.hexToRgb=xt;O.hslToRgb=vt;var rn=O.lighten=Ne;O.private_safeAlpha=fn;O.private_safeColorChannel=void 0;O.private_safeDarken=un;O.private_safeEmphasize=dn;O.private_safeLighten=ln;O.recomposeColor=re;O.rgbToHex=on;var Je=bt(Qr),nn=bt(Vr);function He(e,t=0,r=1){return(0,nn.default)(e,t,r)}function xt(e){e=e.slice(1);const t=new RegExp(`.{1,${e.length>=6?2:1}}`,"g");let r=e.match(t);return r&&r[0].length===1&&(r=r.map(n=>n+n)),r?`rgb${r.length===4?"a":""}(${r.map((n,a)=>a<3?parseInt(n,16):Math.round(parseInt(n,16)/255*1e3)/1e3).join(", ")})`:""}function an(e){const t=e.toString(16);return t.length===1?`0${t}`:t}function I(e){if(e.type)return e;if(e.charAt(0)==="#")return I(xt(e));const t=e.indexOf("("),r=e.substring(0,t);if(["rgb","rgba","hsl","hsla","color"].indexOf(r)===-1)throw new Error((0,Je.default)(9,e));let n=e.substring(t+1,e.length-1),a;if(r==="color"){if(n=n.split(" "),a=n.shift(),n.length===4&&n[3].charAt(0)==="/"&&(n[3]=n[3].slice(1)),["srgb","display-p3","a98-rgb","prophoto-rgb","rec-2020"].indexOf(a)===-1)throw new Error((0,Je.default)(10,a))}else n=n.split(",");return n=n.map(i=>parseFloat(i)),{type:r,values:n,colorSpace:a}}const wt=e=>{const t=I(e);return t.values.slice(0,3).map((r,n)=>t.type.indexOf("hsl")!==-1&&n!==0?`${r}%`:r).join(" ")};O.colorChannel=wt;const sn=(e,t)=>{try{return wt(e)}catch{return e}};O.private_safeColorChannel=sn;function re(e){const{type:t,colorSpace:r}=e;let{values:n}=e;return t.indexOf("rgb")!==-1?n=n.map((a,i)=>i<3?parseInt(a,10):a):t.indexOf("hsl")!==-1&&(n[1]=`${n[1]}%`,n[2]=`${n[2]}%`),t.indexOf("color")!==-1?n=`${r} ${n.join(" ")}`:n=`${n.join(", ")}`,`${t}(${n})`}function on(e){if(e.indexOf("#")===0)return e;const{values:t}=I(e);return`#${t.map((r,n)=>an(n===3?Math.round(255*r):r)).join("")}`}function vt(e){e=I(e);const{values:t}=e,r=t[0],n=t[1]/100,a=t[2]/100,i=n*Math.min(a,1-a),s=(l,h=(l+r/30)%12)=>a-i*Math.max(Math.min(h-3,9-h,1),-1);let o="rgb";const f=[Math.round(s(0)*255),Math.round(s(8)*255),Math.round(s(4)*255)];return e.type==="hsla"&&(o+="a",f.push(t[3])),re({type:o,values:f})}function we(e){e=I(e);let t=e.type==="hsl"||e.type==="hsla"?I(vt(e)).values:e.values;return t=t.map(r=>(e.type!=="color"&&(r/=255),r<=.03928?r/12.92:((r+.055)/1.055)**2.4)),Number((.2126*t[0]+.7152*t[1]+.0722*t[2]).toFixed(3))}function cn(e,t){const r=we(e),n=we(t);return(Math.max(r,n)+.05)/(Math.min(r,n)+.05)}function $t(e,t){return e=I(e),t=He(t),(e.type==="rgb"||e.type==="hsl")&&(e.type+="a"),e.type==="color"?e.values[3]=`/${t}`:e.values[3]=t,re(e)}function fn(e,t,r){try{return $t(e,t)}catch{return e}}function Ge(e,t){if(e=I(e),t=He(t),e.type.indexOf("hsl")!==-1)e.values[2]*=1-t;else if(e.type.indexOf("rgb")!==-1||e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]*=1-t;return re(e)}function un(e,t,r){try{return Ge(e,t)}catch{return e}}function Ne(e,t){if(e=I(e),t=He(t),e.type.indexOf("hsl")!==-1)e.values[2]+=(100-e.values[2])*t;else if(e.type.indexOf("rgb")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(255-e.values[r])*t;else if(e.type.indexOf("color")!==-1)for(let r=0;r<3;r+=1)e.values[r]+=(1-e.values[r])*t;return re(e)}function ln(e,t,r){try{return Ne(e,t)}catch{return e}}function kt(e,t=.15){return we(e)>.5?Ge(e,t):Ne(e,t)}function dn(e,t,r){try{return kt(e,t)}catch{return e}}function hn(e,t,r,n=1){const a=(f,l)=>Math.round((f**(1/n)*(1-r)+l**(1/n)*r)**n),i=I(e),s=I(t),o=[a(i.values[0],s.values[0]),a(i.values[1],s.values[1]),a(i.values[2],s.values[2])];return re({type:"rgb",values:o})}const fe={black:"#000",white:"#fff"},pn={50:"#fafafa",100:"#f5f5f5",200:"#eeeeee",300:"#e0e0e0",400:"#bdbdbd",500:"#9e9e9e",600:"#757575",700:"#616161",800:"#424242",900:"#212121",A100:"#f5f5f5",A200:"#eeeeee",A400:"#bdbdbd",A700:"#616161"},F={50:"#f3e5f5",100:"#e1bee7",200:"#ce93d8",300:"#ba68c8",400:"#ab47bc",500:"#9c27b0",600:"#8e24aa",700:"#7b1fa2",800:"#6a1b9a",900:"#4a148c",A100:"#ea80fc",A200:"#e040fb",A400:"#d500f9",A700:"#aa00ff"},U={50:"#ffebee",100:"#ffcdd2",200:"#ef9a9a",300:"#e57373",400:"#ef5350",500:"#f44336",600:"#e53935",700:"#d32f2f",800:"#c62828",900:"#b71c1c",A100:"#ff8a80",A200:"#ff5252",A400:"#ff1744",A700:"#d50000"},ae={50:"#fff3e0",100:"#ffe0b2",200:"#ffcc80",300:"#ffb74d",400:"#ffa726",500:"#ff9800",600:"#fb8c00",700:"#f57c00",800:"#ef6c00",900:"#e65100",A100:"#ffd180",A200:"#ffab40",A400:"#ff9100",A700:"#ff6d00"},q={50:"#e3f2fd",100:"#bbdefb",200:"#90caf9",300:"#64b5f6",400:"#42a5f5",500:"#2196f3",600:"#1e88e5",700:"#1976d2",800:"#1565c0",900:"#0d47a1",A100:"#82b1ff",A200:"#448aff",A400:"#2979ff",A700:"#2962ff"},Y={50:"#e1f5fe",100:"#b3e5fc",200:"#81d4fa",300:"#4fc3f7",400:"#29b6f6",500:"#03a9f4",600:"#039be5",700:"#0288d1",800:"#0277bd",900:"#01579b",A100:"#80d8ff",A200:"#40c4ff",A400:"#00b0ff",A700:"#0091ea"},X={50:"#e8f5e9",100:"#c8e6c9",200:"#a5d6a7",300:"#81c784",400:"#66bb6a",500:"#4caf50",600:"#43a047",700:"#388e3c",800:"#2e7d32",900:"#1b5e20",A100:"#b9f6ca",A200:"#69f0ae",A400:"#00e676",A700:"#00c853"},gn=["mode","contrastThreshold","tonalOffset"],Ze={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.6)",disabled:"rgba(0, 0, 0, 0.38)"},divider:"rgba(0, 0, 0, 0.12)",background:{paper:fe.white,default:fe.white},action:{active:"rgba(0, 0, 0, 0.54)",hover:"rgba(0, 0, 0, 0.04)",hoverOpacity:.04,selected:"rgba(0, 0, 0, 0.08)",selectedOpacity:.08,disabled:"rgba(0, 0, 0, 0.26)",disabledBackground:"rgba(0, 0, 0, 0.12)",disabledOpacity:.38,focus:"rgba(0, 0, 0, 0.12)",focusOpacity:.12,activatedOpacity:.12}},Re={text:{primary:fe.white,secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(255, 255, 255, 0.5)",icon:"rgba(255, 255, 255, 0.5)"},divider:"rgba(255, 255, 255, 0.12)",background:{paper:"#121212",default:"#121212"},action:{active:fe.white,hover:"rgba(255, 255, 255, 0.08)",hoverOpacity:.08,selected:"rgba(255, 255, 255, 0.16)",selectedOpacity:.16,disabled:"rgba(255, 255, 255, 0.3)",disabledBackground:"rgba(255, 255, 255, 0.12)",disabledOpacity:.38,focus:"rgba(255, 255, 255, 0.12)",focusOpacity:.12,activatedOpacity:.24}};function Qe(e,t,r,n){const a=n.light||n,i=n.dark||n*1.5;e[t]||(e.hasOwnProperty(r)?e[t]=e[r]:t==="light"?e.light=rn(e.main,a):t==="dark"&&(e.dark=en(e.main,i)))}function mn(e="light"){return e==="dark"?{main:q[200],light:q[50],dark:q[400]}:{main:q[700],light:q[400],dark:q[800]}}function yn(e="light"){return e==="dark"?{main:F[200],light:F[50],dark:F[400]}:{main:F[500],light:F[300],dark:F[700]}}function bn(e="light"){return e==="dark"?{main:U[500],light:U[300],dark:U[700]}:{main:U[700],light:U[400],dark:U[800]}}function xn(e="light"){return e==="dark"?{main:Y[400],light:Y[300],dark:Y[700]}:{main:Y[700],light:Y[500],dark:Y[900]}}function wn(e="light"){return e==="dark"?{main:X[400],light:X[300],dark:X[700]}:{main:X[800],light:X[500],dark:X[900]}}function vn(e="light"){return e==="dark"?{main:ae[400],light:ae[300],dark:ae[700]}:{main:"#ed6c02",light:ae[500],dark:ae[900]}}function $n(e){const{mode:t="light",contrastThreshold:r=3,tonalOffset:n=.2}=e,a=ee(e,gn),i=e.primary||mn(t),s=e.secondary||yn(t),o=e.error||bn(t),f=e.info||xn(t),l=e.success||wn(t),h=e.warning||vn(t);function d(c){return tn(c,Re.text.primary)>=r?Re.text.primary:Ze.text.primary}const u=({color:c,name:w,mainShade:b=500,lightShade:A=300,darkShade:P=700})=>{if(c=T({},c),!c.main&&c[b]&&(c.main=c[b]),!c.hasOwnProperty("main"))throw new Error(se(11,w?` (${w})`:"",b));if(typeof c.main!="string")throw new Error(se(12,w?` (${w})`:"",JSON.stringify(c.main)));return Qe(c,"light",A,n),Qe(c,"dark",P,n),c.contrastText||(c.contrastText=d(c.main)),c},y={dark:Re,light:Ze};return L(T({common:T({},fe),mode:t,primary:u({color:i,name:"primary"}),secondary:u({color:s,name:"secondary",mainShade:"A400",lightShade:"A200",darkShade:"A700"}),error:u({color:o,name:"error"}),warning:u({color:h,name:"warning"}),info:u({color:f,name:"info"}),success:u({color:l,name:"success"}),grey:pn,contrastThreshold:r,getContrastText:d,augmentColor:u,tonalOffset:n},y[t]),a)}const kn=["fontFamily","fontSize","fontWeightLight","fontWeightRegular","fontWeightMedium","fontWeightBold","htmlFontSize","allVariants","pxToRem"];function An(e){return Math.round(e*1e5)/1e5}const Ve={textTransform:"uppercase"},et='"Roboto", "Helvetica", "Arial", sans-serif';function Cn(e,t){const r=typeof t=="function"?t(e):t,{fontFamily:n=et,fontSize:a=14,fontWeightLight:i=300,fontWeightRegular:s=400,fontWeightMedium:o=500,fontWeightBold:f=700,htmlFontSize:l=16,allVariants:h,pxToRem:d}=r,u=ee(r,kn),y=a/14,p=d||(b=>`${b/l*y}rem`),c=(b,A,P,N,H)=>T({fontFamily:n,fontWeight:b,fontSize:p(A),lineHeight:P},n===et?{letterSpacing:`${An(N/A)}em`}:{},H,h),w={h1:c(i,96,1.167,-1.5),h2:c(i,60,1.2,-.5),h3:c(s,48,1.167,0),h4:c(s,34,1.235,.25),h5:c(s,24,1.334,0),h6:c(o,20,1.6,.15),subtitle1:c(s,16,1.75,.15),subtitle2:c(o,14,1.57,.1),body1:c(s,16,1.5,.15),body2:c(s,14,1.43,.15),button:c(o,14,1.75,.4,Ve),caption:c(s,12,1.66,.4),overline:c(s,12,2.66,1,Ve),inherit:{fontFamily:"inherit",fontWeight:"inherit",fontSize:"inherit",lineHeight:"inherit",letterSpacing:"inherit"}};return L(T({htmlFontSize:l,pxToRem:p,fontFamily:n,fontSize:a,fontWeightLight:i,fontWeightRegular:s,fontWeightMedium:o,fontWeightBold:f},w),u,{clone:!1})}const On=.2,Sn=.14,Tn=.12;function v(...e){return[`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${On})`,`${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Sn})`,`${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Tn})`].join(",")}const _n=["none",v(0,2,1,-1,0,1,1,0,0,1,3,0),v(0,3,1,-2,0,2,2,0,0,1,5,0),v(0,3,3,-2,0,3,4,0,0,1,8,0),v(0,2,4,-1,0,4,5,0,0,1,10,0),v(0,3,5,-1,0,5,8,0,0,1,14,0),v(0,3,5,-1,0,6,10,0,0,1,18,0),v(0,4,5,-2,0,7,10,1,0,2,16,1),v(0,5,5,-3,0,8,10,1,0,3,14,2),v(0,5,6,-3,0,9,12,1,0,3,16,2),v(0,6,6,-3,0,10,14,1,0,4,18,3),v(0,6,7,-4,0,11,15,1,0,4,20,3),v(0,7,8,-4,0,12,17,2,0,5,22,4),v(0,7,8,-4,0,13,19,2,0,5,24,4),v(0,7,9,-4,0,14,21,2,0,5,26,4),v(0,8,9,-5,0,15,22,2,0,6,28,5),v(0,8,10,-5,0,16,24,2,0,6,30,5),v(0,8,11,-5,0,17,26,2,0,6,32,5),v(0,9,11,-5,0,18,28,2,0,7,34,6),v(0,9,12,-6,0,19,29,2,0,7,36,6),v(0,10,13,-6,0,20,31,3,0,8,38,7),v(0,10,13,-6,0,21,33,3,0,8,40,7),v(0,10,14,-6,0,22,35,3,0,8,42,7),v(0,11,14,-7,0,23,36,3,0,9,44,8),v(0,11,15,-7,0,24,38,3,0,9,46,8)],Rn=["duration","easing","delay"],Pn={easeInOut:"cubic-bezier(0.4, 0, 0.2, 1)",easeOut:"cubic-bezier(0.0, 0, 0.2, 1)",easeIn:"cubic-bezier(0.4, 0, 1, 1)",sharp:"cubic-bezier(0.4, 0, 0.6, 1)"},En={shortest:150,shorter:200,short:250,standard:300,complex:375,enteringScreen:225,leavingScreen:195};function tt(e){return`${Math.round(e)}ms`}function Bn(e){if(!e)return 0;const t=e/36;return Math.round((4+15*t**.25+t/5)*10)}function jn(e){const t=T({},Pn,e.easing),r=T({},En,e.duration);return T({getAutoHeightDuration:Bn,create:(a=["all"],i={})=>{const{duration:s=r.standard,easing:o=t.easeInOut,delay:f=0}=i;return ee(i,Rn),(Array.isArray(a)?a:[a]).map(l=>`${l} ${typeof s=="string"?s:tt(s)} ${o} ${typeof f=="string"?f:tt(f)}`).join(",")}},e,{easing:t,duration:r})}const Mn={mobileStepper:1e3,fab:1050,speedDial:1050,appBar:1100,drawer:1200,modal:1300,snackbar:1400,tooltip:1500},In=["breakpoints","mixins","spacing","palette","transitions","typography","shape"];function Un(e={},...t){const{mixins:r={},palette:n={},transitions:a={},typography:i={}}=e,s=ee(e,In);if(e.vars)throw new Error(se(18));const o=$n(n),f=Jr(e);let l=L(f,{mixins:Zr(f.breakpoints,r),palette:o,shadows:_n.slice(),typography:Cn(o,i),transitions:jn(a),zIndex:T({},Mn)});return l=L(l,s),l=t.reduce((h,d)=>L(h,d),l),l.unstable_sxConfig=T({},Le,s==null?void 0:s.unstable_sxConfig),l.unstable_sx=function(d){return De({sx:d,theme:this})},l}const qn="$$material";export{Hn as A,de as B,Wn as C,Ot as D,qn as T,T as _,ee as a,Nn as b,it as c,Un as d,en as e,Fn as f,En as g,pn as h,At as i,Dn as j,rr as k,rn as l,Le as m,J as n,L as o,Jr as p,ir as q,Yr as r,De as s,se as t,qr as u,Ae as v,Ln as w,G as x,Gn as y,mt as z};