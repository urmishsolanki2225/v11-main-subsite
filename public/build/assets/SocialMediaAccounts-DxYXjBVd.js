import{j as r}from"./client-ZKQMN23D.js";import{d as s}from"./dayjs.min-BIwLhz4I.js";import"./app-Ck7UBcd6.js";import"./index-BmtA0KFl.js";import"./index.m-DI45-rQC.js";import{A as m}from"./AppBarHeader-ClGrA22v.js";import{C as p}from"./ContentScroll-D9O6pf62.js";import{P as a}from"./List-Dh7P2IJ_.js";import{T as n}from"./Typography-BWGjmqeb.js";import{T as l,a as i,b as c}from"./TableRow-DIaWC5aH.js";import{T as h}from"./TableHead-D8dFZ9CG.js";import{T as t}from"./TableCell-BHBxOuch.js";import{B as d}from"./Button-DZLqdWgp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-DxE8ywAI.js";import"./identifier-CVVhstXo.js";import"./utc-BUuWioZ3.js";import"./extendSxProp-5tSxLnIE.js";import"./ThemeProvider-DYHukqtx.js";import"./index-AoxikDaj.js";import"./useSlotProps-DL7U-EaF.js";import"./Grow-1FiP9biG.js";import"./index-BXImJBSP.js";import"./ButtonBase-D5ln7if4.js";import"./Close-DeKdm8LF.js";import"./ListItemIcon-BNV_poop.js";import"./ListItemText-BFrp0ozb.js";import"./Tooltip-B-18blil.js";import"./Popper-BKUAU8_E.js";import"./Box-BUYeTdQC.js";import"./GlobalStyles-D_Xt43Ne.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./Menu-BCMxz3f0.js";import"./useFormControl-CO6OogGI.js";import"./InputAdornment-C_Fu6lZu.js";import"./usePreviousProps-eB1Ppz6I.js";import"./MenuItem-Cc58SkCm.js";import"./SwitchBase-CcKqqM_7.js";const $=({accounts:e=[]})=>r.jsxs(r.Fragment,{children:[r.jsx(m,{title:"Social Sharing Accounts Status"}),r.jsx(p,{children:r.jsxs(a,{sx:{m:2,p:2},children:[r.jsxs(n,{children:["The social media accounts need to be set up correctly for the item sharing to function. Someone who has access to the correct accounts should use the"," ",r.jsx("strong",{children:"Authorize"})," buttons, making sure to login to the correct social media account."]}),r.jsxs(l,{sx:{my:2,mx:-2},children:[r.jsx(h,{children:r.jsxs(i,{children:[r.jsx(t,{children:"Account"}),r.jsx(t,{children:"Status"}),r.jsx(t,{children:"Expires at"}),r.jsx(t,{children:"Authorize"})]})}),r.jsx(c,{children:e.map(o=>r.jsxs(i,{children:[r.jsx(t,{children:o.name}),r.jsx(t,{children:o.status}),r.jsx(t,{children:o.token_expires_at?s(o.token_expires_at).format("YYYY-MM-DD HH:mm:ss"):o.status==="ok"?"never":""}),r.jsx(t,{children:r.jsx(d,{variant:"contained",href:o.authorize_url,children:"Authorize"})})]},o.name))})]})]})})]});export{$ as SocialMediaAccounts,$ as default};
