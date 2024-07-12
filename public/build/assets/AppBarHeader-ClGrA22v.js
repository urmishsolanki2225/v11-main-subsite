import{r as v,j as n,R as mr}from"./client-ZKQMN23D.js";import{u as br}from"./index-BmtA0KFl.js";import{i as or,c as u,a as ar,_ as O,b as Q,l as xr,e as $r}from"./identifier-CVVhstXo.js";import{r as er,T as Y}from"./Typography-BWGjmqeb.js";import{u as yr}from"./Grow-1FiP9biG.js";import{w as Or,x as wr}from"./app-Ck7UBcd6.js";import{B as rr}from"./Box-BUYeTdQC.js";import{I as Cr,M as Rr}from"./Menu-BCMxz3f0.js";import{I as kr}from"./InputAdornment-C_Fu6lZu.js";import{I as Sr}from"./List-Dh7P2IJ_.js";import{a as ir,g as nr,c as W}from"./extendSxProp-5tSxLnIE.js";import{c as sr}from"./index-BXImJBSP.js";import{s as k,h as tr,c as lr}from"./useSlotProps-DL7U-EaF.js";import{u as cr}from"./usePreviousProps-eB1Ppz6I.js";import{M as Pr}from"./MenuItem-Cc58SkCm.js";import{L as Br}from"./ListItemText-BFrp0ozb.js";import{S as zr}from"./SwitchBase-CcKqqM_7.js";var jr=function(r){v.useEffect(r,[])},Tr=function(r){var o=v.useRef(r);o.current=r,jr(function(){return function(){return o.current()}})},_r=function(r,o,t){var i=v.useState(null),c=i[0],d=i[1],s=v.useRef(),l=v.useRef();return v.useEffect(function(){if(s.current)l.current=t;else{d(r.apply(void 0,t));var g=function(){l.current?(d(r.apply(void 0,l.current)),l.current=void 0,s.current=setTimeout(g,o)):s.current=void 0};s.current=setTimeout(g,o)}},t),Tr(function(){s.current&&clearTimeout(s.current)}),c},H={},Mr=or;Object.defineProperty(H,"__esModule",{value:!0});var dr=H.default=void 0,Ir=Mr(er()),Ar=n;dr=H.default=(0,Ir.default)((0,Ar.jsx)("path",{d:"M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"}),"FilterList");var q={},Er=or;Object.defineProperty(q,"__esModule",{value:!0});var pr=q.default=void 0,Lr=Er(er()),Nr=n;pr=q.default=(0,Lr.default)((0,Nr.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"}),"Search");function Dr(r){const{badgeContent:o,invisible:t=!1,max:i=99,showZero:c=!1}=r,d=cr({badgeContent:o,max:i});let s=t;t===!1&&o===0&&!c&&(s=!0);const{badgeContent:l,max:g=i}=s?d:r,f=l&&Number(l)>g?`${g}+`:l;return{badgeContent:l,invisible:s,max:g,displayValue:f}}function Fr(r){return nr("MuiBadge",r)}const y=ir("MuiBadge",["root","badge","dot","standard","anchorOriginTopRight","anchorOriginBottomRight","anchorOriginTopLeft","anchorOriginBottomLeft","invisible","colorError","colorInfo","colorPrimary","colorSecondary","colorSuccess","colorWarning","overlapRectangular","overlapCircular","anchorOriginTopLeftCircular","anchorOriginTopLeftRectangular","anchorOriginTopRightCircular","anchorOriginTopRightRectangular","anchorOriginBottomLeftCircular","anchorOriginBottomLeftRectangular","anchorOriginBottomRightCircular","anchorOriginBottomRightRectangular"]),Ur=["anchorOrigin","className","classes","component","components","componentsProps","children","overlap","color","invisible","max","badgeContent","slots","slotProps","showZero","variant"],F=10,U=4,Wr=sr(),Hr=r=>{const{color:o,anchorOrigin:t,invisible:i,overlap:c,variant:d,classes:s={}}=r,l={root:["root"],badge:["badge",d,i&&"invisible",`anchorOrigin${u(t.vertical)}${u(t.horizontal)}`,`anchorOrigin${u(t.vertical)}${u(t.horizontal)}${u(c)}`,`overlap${u(c)}`,o!=="default"&&`color${u(o)}`]};return lr(l,Fr,s)},qr=k("span",{name:"MuiBadge",slot:"Root",overridesResolver:(r,o)=>o.root})({position:"relative",display:"inline-flex",verticalAlign:"middle",flexShrink:0}),Kr=k("span",{name:"MuiBadge",slot:"Badge",overridesResolver:(r,o)=>{const{ownerState:t}=r;return[o.badge,o[t.variant],o[`anchorOrigin${u(t.anchorOrigin.vertical)}${u(t.anchorOrigin.horizontal)}${u(t.overlap)}`],t.color!=="default"&&o[`color${u(t.color)}`],t.invisible&&o.invisible]}})(({theme:r})=>{var o;return{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center",alignContent:"center",alignItems:"center",position:"absolute",boxSizing:"border-box",fontFamily:r.typography.fontFamily,fontWeight:r.typography.fontWeightMedium,fontSize:r.typography.pxToRem(12),minWidth:F*2,lineHeight:1,padding:"0 6px",height:F*2,borderRadius:F,zIndex:1,transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.enteringScreen}),variants:[...Object.keys(((o=r.vars)!=null?o:r).palette).filter(t=>{var i,c;return((i=r.vars)!=null?i:r).palette[t].main&&((c=r.vars)!=null?c:r).palette[t].contrastText}).map(t=>({props:{color:t},style:{backgroundColor:(r.vars||r).palette[t].main,color:(r.vars||r).palette[t].contrastText}})),{props:{variant:"dot"},style:{borderRadius:U,height:U*2,minWidth:U*2,padding:0}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular",style:{top:0,right:0,transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="rectangular",style:{bottom:0,right:0,transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular",style:{top:0,left:0,transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="rectangular",style:{bottom:0,left:0,transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular",style:{top:"14%",right:"14%",transform:"scale(1) translate(50%, -50%)",transformOrigin:"100% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="right"&&t.overlap==="circular",style:{bottom:"14%",right:"14%",transform:"scale(1) translate(50%, 50%)",transformOrigin:"100% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(50%, 50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="top"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular",style:{top:"14%",left:"14%",transform:"scale(1) translate(-50%, -50%)",transformOrigin:"0% 0%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, -50%)"}}},{props:({ownerState:t})=>t.anchorOrigin.vertical==="bottom"&&t.anchorOrigin.horizontal==="left"&&t.overlap==="circular",style:{bottom:"14%",left:"14%",transform:"scale(1) translate(-50%, 50%)",transformOrigin:"0% 100%",[`&.${y.invisible}`]:{transform:"scale(0) translate(-50%, 50%)"}}},{props:{invisible:!0},style:{transition:r.transitions.create("transform",{easing:r.transitions.easing.easeInOut,duration:r.transitions.duration.leavingScreen})}}]}}),Vr=v.forwardRef(function(o,t){var i,c,d,s,l,g;const f=Wr({props:o,name:"MuiBadge"}),{anchorOrigin:a={vertical:"top",horizontal:"right"},className:m,component:x,components:S={},componentsProps:j={},children:T,overlap:P="rectangular",color:B="default",invisible:M=!1,max:I=99,badgeContent:w,slots:C,slotProps:$,showZero:z=!1,variant:R="standard"}=f,e=ar(f,Ur),{badgeContent:p,invisible:b,max:_,displayValue:A}=Dr({max:I,invisible:M,badgeContent:w,showZero:z}),E=cr({anchorOrigin:a,color:B,overlap:P,variant:R,badgeContent:w}),K=b||p==null&&R!=="dot",{color:ur=B,overlap:gr=P,anchorOrigin:hr=a,variant:V=R}=K?E:f,Z=V!=="dot"?A:void 0,L=O({},f,{badgeContent:p,invisible:K,max:_,displayValue:Z,showZero:z,anchorOrigin:hr,color:ur,overlap:gr,variant:V}),X=Hr(L),G=(i=(c=C==null?void 0:C.root)!=null?c:S.Root)!=null?i:qr,J=(d=(s=C==null?void 0:C.badge)!=null?s:S.Badge)!=null?d:Kr,N=(l=$==null?void 0:$.root)!=null?l:j.root,D=(g=$==null?void 0:$.badge)!=null?g:j.badge,vr=tr({elementType:G,externalSlotProps:N,externalForwardedProps:e,additionalProps:{ref:t,as:x},ownerState:L,className:W(N==null?void 0:N.className,X.root,m)}),fr=tr({elementType:J,externalSlotProps:D,ownerState:L,className:W(X.badge,D==null?void 0:D.className)});return n.jsxs(G,O({},vr,{children:[T,n.jsx(J,O({},fr,{children:Z}))]}))});function Zr(r){return nr("MuiSwitch",r)}const h=ir("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),Xr=["className","color","edge","size","sx"],Gr=sr(),Jr=r=>{const{classes:o,edge:t,size:i,color:c,checked:d,disabled:s}=r,l={root:["root",t&&`edge${u(t)}`,`size${u(i)}`],switchBase:["switchBase",`color${u(c)}`,d&&"checked",s&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},g=lr(l,Zr,o);return O({},o,g)},Qr=k("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(r,o)=>{const{ownerState:t}=r;return[o.root,t.edge&&o[`edge${u(t.edge)}`],o[`size${u(t.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${h.thumb}`]:{width:16,height:16},[`& .${h.switchBase}`]:{padding:4,[`&.${h.checked}`]:{transform:"translateX(16px)"}}}}]}),Yr=k(zr,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(r,o)=>{const{ownerState:t}=r;return[o.switchBase,{[`& .${h.input}`]:o.input},t.color!=="default"&&o[`color${u(t.color)}`]]}})(({theme:r})=>({position:"absolute",top:0,left:0,zIndex:1,color:r.vars?r.vars.palette.Switch.defaultColor:`${r.palette.mode==="light"?r.palette.common.white:r.palette.grey[300]}`,transition:r.transitions.create(["left","transform"],{duration:r.transitions.duration.shortest}),[`&.${h.checked}`]:{transform:"translateX(20px)"},[`&.${h.disabled}`]:{color:r.vars?r.vars.palette.Switch.defaultDisabledColor:`${r.palette.mode==="light"?r.palette.grey[100]:r.palette.grey[600]}`},[`&.${h.checked} + .${h.track}`]:{opacity:.5},[`&.${h.disabled} + .${h.track}`]:{opacity:r.vars?r.vars.opacity.switchTrackDisabled:`${r.palette.mode==="light"?.12:.2}`},[`& .${h.input}`]:{left:"-100%",width:"300%"}}),({theme:r})=>({"&:hover":{backgroundColor:r.vars?`rgba(${r.vars.palette.action.activeChannel} / ${r.vars.palette.action.hoverOpacity})`:Q(r.palette.action.active,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(r.palette).filter(([,o])=>o.main&&o.light).map(([o])=>({props:{color:o},style:{[`&.${h.checked}`]:{color:(r.vars||r).palette[o].main,"&:hover":{backgroundColor:r.vars?`rgba(${r.vars.palette[o].mainChannel} / ${r.vars.palette.action.hoverOpacity})`:Q(r.palette[o].main,r.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${h.disabled}`]:{color:r.vars?r.vars.palette.Switch[`${o}DisabledColor`]:`${r.palette.mode==="light"?xr(r.palette[o].main,.62):$r(r.palette[o].main,.55)}`}},[`&.${h.checked} + .${h.track}`]:{backgroundColor:(r.vars||r).palette[o].main}}}))]})),rt=k("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(r,o)=>o.track})(({theme:r})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:r.transitions.create(["opacity","background-color"],{duration:r.transitions.duration.shortest}),backgroundColor:r.vars?r.vars.palette.common.onBackground:`${r.palette.mode==="light"?r.palette.common.black:r.palette.common.white}`,opacity:r.vars?r.vars.opacity.switchTrack:`${r.palette.mode==="light"?.38:.3}`})),tt=k("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(r,o)=>o.thumb})(({theme:r})=>({boxShadow:(r.vars||r).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"})),ot=v.forwardRef(function(o,t){const i=Gr({props:o,name:"MuiSwitch"}),{className:c,color:d="primary",edge:s=!1,size:l="medium",sx:g}=i,f=ar(i,Xr),a=O({},i,{color:d,edge:s,size:l}),m=Jr(a),x=n.jsx(tt,{className:m.thumb,ownerState:a});return n.jsxs(Qr,{className:W(m.root,c),sx:g,ownerState:a,children:[n.jsx(Yr,O({type:"checkbox",icon:x,checkedIcon:x,ref:t,ownerState:a},f,{classes:O({},m,{root:m.switchBase})})),n.jsx(rt,{className:m.track,ownerState:a})]})}),$t=({title:r,afterTitle:o,afterSearch:t,onSearch:i,onChangeFilter:c,filter:d,filterOptions:s=[],isDialog:l=!1,children:g})=>{var z,R;const f=yr(),[a,m]=v.useState(d),{filter:x}=br().props,[S,j]=v.useState(((z=a==null?void 0:a.filter)==null?void 0:z.search)||(l?"":((R=x==null?void 0:x.filter)==null?void 0:R.search)||"")),[T,P]=mr.useState(null),B=v.useRef(null),M=(e,p="true")=>{w(a?{filter:{...a.filter,[e]:p}}:{filter:{[e]:p}})},I=(e,p)=>{if(a){const b={...a};p?b.filter[e]=p:delete b.filter[e],w(b)}},w=e=>{m(e),c&&c(e)};v.useEffect(()=>{m(d)},[d]),_r(e=>{i&&(e?e.length>1&&i(e):i(""))},500,[S]);const C=/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform),$=v.useCallback(e=>{var p;e.key==="k"&&(e.metaKey||e.ctrlKey)&&((p=B.current)==null||p.focus())},[]);return v.useEffect(()=>(i&&window.addEventListener("keydown",$),()=>window.removeEventListener("keydown",$)),[i,$]),n.jsx(Or,{position:l?"relative":"absolute",sx:{top:0,zIndex:f.zIndex.drawer+1,color:"white"},children:n.jsxs(wr,{sx:{gap:2},children:[n.jsxs(rr,{flexGrow:2,display:"flex",alignItems:"baseline",children:[n.jsx(Y,{variant:"h6",children:r}),o&&n.jsx(Y,{color:"white",children:o})]}),i&&n.jsx(Cr,{sx:{backgroundColor:"rgba(255, 255, 255, 0.2)",maxWidth:180,width:300,transition:"all 0.4s ease-in-out","&.Mui-focused":{backgroundColor:"rgba(255,255,255,0.8)",maxWidth:1e3}},disableUnderline:!0,placeholder:`Search... [${C?"⌘":"ctrl"}K]`,value:S,onChange:e=>j(e.target.value),inputRef:B,startAdornment:n.jsx(kr,{position:"start",children:n.jsx(pr,{})})}),t&&n.jsx(rr,{color:"white",children:t}),s.length>0&&n.jsxs(n.Fragment,{children:[n.jsx(Sr,{onClick:e=>P(e.currentTarget),size:"large",children:n.jsx(Vr,{badgeContent:s.reduce((e,{name:p,disabledValue:b})=>a!=null&&a.filter&&(a==null?void 0:a.filter)[p]!==b?e+1:e,0),color:"secondary",children:n.jsx(dr,{})})}),n.jsx(Rr,{anchorEl:T,keepMounted:!0,open:!!T,onClose:()=>P(null),anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:s.map(({label:e,name:p,value:b,disabledValue:_},A)=>n.jsxs(Pr,{children:[n.jsx(Br,{children:e}),n.jsx(ot,{edge:"end",color:"primary",checked:!!(a!=null&&a.filter&&(a==null?void 0:a.filter)[p]!==_),onChange:E=>{E.target.checked?M(p,b):I(p,_)}})]},A))})]}),g]})})};export{$t as A,Vr as B,ot as S,pr as a,dr as d,h as s};
