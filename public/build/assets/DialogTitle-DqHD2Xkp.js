import{_ as n,a as p}from"./identifier-DHETMsl0.js";import{r as d,j as g}from"./client-ZKQMN23D.js";import{g as u,a as f,c as m}from"./extendSxProp-2i1zAAUV.js";import{s as x,u as D,c as v}from"./useSlotProps-O828vP2f.js";import{a as y}from"./Dialog-CPjb0mTO.js";import{T as R}from"./Typography-BOH_kjYl.js";function T(o){return u("MuiDialogActions",o)}f("MuiDialogActions",["root","spacing"]);const M=["className","disableSpacing"],S=o=>{const{classes:t,disableSpacing:s}=o;return v({root:["root",!s&&"spacing"]},T,t)},b=x("div",{name:"MuiDialogActions",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,!s.disableSpacing&&t.spacing]}})(({ownerState:o})=>n({display:"flex",alignItems:"center",padding:8,justifyContent:"flex-end",flex:"0 0 auto"},!o.disableSpacing&&{"& > :not(style) ~ :not(style)":{marginLeft:8}})),O=d.forwardRef(function(t,s){const e=D({props:t,name:"MuiDialogActions"}),{className:r,disableSpacing:a=!1}=e,l=p(e,M),i=n({},e,{disableSpacing:a}),c=S(i);return g.jsx(b,n({className:m(c.root,r),ownerState:i,ref:s},l))});function w(o){return u("MuiDialogContent",o)}f("MuiDialogContent",["root","dividers"]);function N(o){return u("MuiDialogTitle",o)}const A=f("MuiDialogTitle",["root"]),U=["className","dividers"],j=o=>{const{classes:t,dividers:s}=o;return v({root:["root",s&&"dividers"]},w,t)},$=x("div",{name:"MuiDialogContent",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:s}=o;return[t.root,s.dividers&&t.dividers]}})(({theme:o,ownerState:t})=>n({flex:"1 1 auto",WebkitOverflowScrolling:"touch",overflowY:"auto",padding:"20px 24px"},t.dividers?{padding:"16px 24px",borderTop:`1px solid ${(o.vars||o).palette.divider}`,borderBottom:`1px solid ${(o.vars||o).palette.divider}`}:{[`.${A.root} + &`]:{paddingTop:0}})),Y=d.forwardRef(function(t,s){const e=D({props:t,name:"MuiDialogContent"}),{className:r,dividers:a=!1}=e,l=p(e,U),i=n({},e,{dividers:a}),c=j(i);return g.jsx($,n({className:m(c.root,r),ownerState:i,ref:s},l))}),_=["className","id"],h=o=>{const{classes:t}=o;return v({root:["root"]},N,t)},P=x(R,{name:"MuiDialogTitle",slot:"Root",overridesResolver:(o,t)=>t.root})({padding:"16px 24px",flex:"0 0 auto"}),q=d.forwardRef(function(t,s){const e=D({props:t,name:"MuiDialogTitle"}),{className:r,id:a}=e,l=p(e,_),i=e,c=h(i),{titleId:C=a}=d.useContext(y);return g.jsx(P,n({component:"h2",className:m(c.root,r),ownerState:i,ref:s,variant:"h6",id:a??C},l))});export{q as D,Y as a,O as b};
