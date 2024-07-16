import{_ as n,b as d,a as N}from"./identifier-DHETMsl0.js";import{r as c,j as C}from"./client-ZKQMN23D.js";import{a as P,g as F,c as x}from"./extendSxProp-2i1zAAUV.js";import{s as G,r as T,u as _,j as w,a as E,c as U}from"./useSlotProps-O828vP2f.js";import{L as $}from"./List-BgSNNkKU.js";import{B as D}from"./ButtonBase-B4crtf6-.js";import{d as I,l as M,b as O}from"./ListItemText-7JFmWKqR.js";function H(e){return F("MuiMenuItem",e)}const r=P("MuiMenuItem",["root","focusVisible","dense","disabled","divider","gutters","selected"]),S=["autoFocus","component","dense","divider","disableGutters","focusVisibleClassName","role","tabIndex","className"],z=(e,a)=>{const{ownerState:s}=e;return[a.root,s.dense&&a.dense,s.divider&&a.divider,!s.disableGutters&&a.gutters]},W=e=>{const{disabled:a,dense:s,divider:t,disableGutters:l,selected:p,classes:o}=e,i=U({root:["root",s&&"dense",a&&"disabled",!l&&"gutters",t&&"divider",p&&"selected"]},H,o);return n({},o,i)},q=G(D,{shouldForwardProp:e=>T(e)||e==="classes",name:"MuiMenuItem",slot:"Root",overridesResolver:z})(({theme:e,ownerState:a})=>n({},e.typography.body1,{display:"flex",justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minHeight:48,paddingTop:6,paddingBottom:6,boxSizing:"border-box",whiteSpace:"nowrap"},!a.disableGutters&&{paddingLeft:16,paddingRight:16},a.divider&&{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"},{"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${r.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${r.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${r.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:d(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:d(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${r.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${r.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},[`& + .${I.root}`]:{marginTop:e.spacing(1),marginBottom:e.spacing(1)},[`& + .${I.inset}`]:{marginLeft:52},[`& .${M.root}`]:{marginTop:0,marginBottom:0},[`& .${M.inset}`]:{paddingLeft:36},[`& .${O.root}`]:{minWidth:36}},!a.dense&&{[e.breakpoints.up("sm")]:{minHeight:"auto"}},a.dense&&n({minHeight:32,paddingTop:4,paddingBottom:4},e.typography.body2,{[`& .${O.root} svg`]:{fontSize:"1.25rem"}}))),h=c.forwardRef(function(a,s){const t=_({props:a,name:"MuiMenuItem"}),{autoFocus:l=!1,component:p="li",dense:o=!1,divider:f=!1,disableGutters:i=!1,focusVisibleClassName:k,role:R="menuitem",tabIndex:g,className:B}=t,j=N(t,S),m=c.useContext($),v=c.useMemo(()=>({dense:o||m.dense||!1,disableGutters:i}),[m.dense,o,i]),u=c.useRef(null);w(()=>{l&&u.current&&u.current.focus()},[l]);const V=n({},t,{dense:v.dense,divider:f,disableGutters:i}),b=W(t),L=E(u,s);let y;return t.disabled||(y=g!==void 0?g:-1),C.jsx($.Provider,{value:v,children:C.jsx(q,n({ref:L,role:R,tabIndex:y,component:p,focusVisibleClassName:x(b.focusVisible,k),className:x(b.root,B)},j,{ownerState:V,classes:b}))})});export{h as M};