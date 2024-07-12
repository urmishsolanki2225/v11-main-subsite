import{_ as n,a as v,b as g}from"./identifier-COQS9w1e.js";import{r as u,j as b}from"./client-ZKQMN23D.js";import{g as m,a as f,c as T}from"./extendSxProp-BsQwgIIR.js";import{a as j,b as k}from"./TableCell-ChGbszKc.js";import{s as C,u as w,c as R}from"./useSlotProps-5g1mADCy.js";function B(o){return m("MuiTable",o)}f("MuiTable",["root","stickyHeader"]);const H=["className","component","padding","size","stickyHeader"],U=o=>{const{classes:e,stickyHeader:t}=o;return R({root:["root",t&&"stickyHeader"]},B,e)},S=C("table",{name:"MuiTable",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.stickyHeader&&e.stickyHeader]}})(({theme:o,ownerState:e})=>n({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":n({},o.typography.body2,{padding:o.spacing(2),color:(o.vars||o).palette.text.secondary,textAlign:"left",captionSide:"bottom"})},e.stickyHeader&&{borderCollapse:"separate"})),x="table",K=u.forwardRef(function(e,t){const a=w({props:e,name:"MuiTable"}),{className:c,component:s=x,padding:r="normal",size:l="medium",stickyHeader:i=!1}=a,d=v(a,H),p=n({},a,{component:s,padding:r,size:l,stickyHeader:i}),y=U(p),N=u.useMemo(()=>({padding:r,size:l,stickyHeader:i}),[r,l,i]);return b.jsx(j.Provider,{value:N,children:b.jsx(S,n({as:s,role:s===x?null:"table",ref:t,className:T(y.root,c),ownerState:p},d))})});function _(o){return m("MuiTableBody",o)}f("MuiTableBody",["root"]);const O=["className","component"],P=o=>{const{classes:e}=o;return R({root:["root"]},_,e)},z=C("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(o,e)=>e.root})({display:"table-row-group"}),A={variant:"body"},h="tbody",Q=u.forwardRef(function(e,t){const a=w({props:e,name:"MuiTableBody"}),{className:c,component:s=h}=a,r=v(a,O),l=n({},a,{component:s}),i=P(l);return b.jsx(k.Provider,{value:A,children:b.jsx(z,n({className:T(i.root,c),as:s,ref:t,role:s===h?null:"rowgroup",ownerState:l},r))})});function E(o){return m("MuiTableRow",o)}const M=f("MuiTableRow",["root","selected","hover","head","footer"]),D=["className","component","hover","selected"],L=o=>{const{classes:e,selected:t,hover:a,head:c,footer:s}=o;return R({root:["root",t&&"selected",a&&"hover",c&&"head",s&&"footer"]},E,e)},W=C("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:t}=o;return[e.root,t.head&&e.head,t.footer&&e.footer]}})(({theme:o})=>({color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${M.hover}:hover`]:{backgroundColor:(o.vars||o).palette.action.hover},[`&.${M.selected}`]:{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.selectedOpacity})`:g(o.palette.primary.main,o.palette.action.selectedOpacity),"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.primary.mainChannel} / calc(${o.vars.palette.action.selectedOpacity} + ${o.vars.palette.action.hoverOpacity}))`:g(o.palette.primary.main,o.palette.action.selectedOpacity+o.palette.action.hoverOpacity)}}})),$="tr",V=u.forwardRef(function(e,t){const a=w({props:e,name:"MuiTableRow"}),{className:c,component:s=$,hover:r=!1,selected:l=!1}=a,i=v(a,D),d=u.useContext(k),p=n({},a,{component:s,hover:r,selected:l,head:d&&d.variant==="head",footer:d&&d.variant==="footer"}),y=L(p);return b.jsx(W,n({as:s,ref:t,className:T(y.root,c),role:s===$?null:"row",ownerState:p},i))});export{K as T,V as a,Q as b};
