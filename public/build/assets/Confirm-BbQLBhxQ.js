import{r as n,j as r}from"./client-ZKQMN23D.js";import{P as p}from"./Menu-BCMxz3f0.js";import{S as m}from"./Stack-B2ZIJkbS.js";import{T as u}from"./Typography-BWGjmqeb.js";import{B as d}from"./Box-BUYeTdQC.js";import{B as l}from"./Button-DZLqdWgp.js";const g=({confirmText:a,children:e,onConfirm:s})=>{const[t,o]=n.useState(null),i=n.useCallback(c=>{o(c.currentTarget)},[]);return n.isValidElement(e)?r.jsxs(r.Fragment,{children:[n.cloneElement(e,{onClick:i,disabled:e.props.disabled||!!t}),r.jsx(p,{open:!!t,anchorEl:t,onClose:()=>o(null),anchorOrigin:{vertical:"top",horizontal:"center"},transformOrigin:{vertical:"bottom",horizontal:"center"},sx:{maxWidth:350},children:r.jsxs(m,{children:[r.jsx(u,{p:2,variant:"body1",children:a||"Are you sure?"}),r.jsxs(d,{display:"flex",justifyContent:"space-between",gap:2,p:1,children:[r.jsx(l,{variant:"outlined",onClick:()=>o(null),children:"Cancel"}),r.jsx(l,{variant:"contained",color:"error",onClick:()=>{o(null),s()},children:"Confirm"})]})]})})]}):null};export{g as C};
