import{r as a,j as e}from"./client-ZKQMN23D.js";import{d as y}from"./index-Cvft0mqj.js";import{l as F}from"./index.m-DI45-rQC.js";import{A as I}from"./AppBarHeader-Bu_GnhUD.js";import{C as W}from"./ContentScroll-BWeVEx1a.js";import{B as N}from"./Box-CVOB97vC.js";import{P}from"./List-BgSNNkKU.js";import{G as s}from"./Grid-BYUzo7jW.js";import{T as R}from"./Typography-BOH_kjYl.js";import{T as j,F as k}from"./TextField-CXY6ukfK.js";import{F as b}from"./FormLabel-BgEYUhxt.js";import{I as v,S as C}from"./Select-DstqRMzc.js";import{M as S}from"./MenuItem-BvZfPpYr.js";import{B as w}from"./Button-Bs2LlykX.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./identifier-DHETMsl0.js";import"./Grow--1bk2Oiz.js";import"./useSlotProps-O828vP2f.js";import"./index-BMQyuaGg.js";import"./extendSxProp-2i1zAAUV.js";import"./useTheme-CLvhDb73.js";import"./useThemeWithoutDefault-BU2aPzft.js";import"./app-Bt98msSn.js";import"./index-BqRrtboY.js";import"./dayjs.min-BIwLhz4I.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-BQTsL86O.js";import"./useThemeProps-DZ1rqyJn.js";import"./getThemeProps-BL5VHue0.js";import"./ButtonBase-B4crtf6-.js";import"./Close-mNv2SlFn.js";import"./ListItemIcon-CVfiqn-C.js";import"./ListItemText-7JFmWKqR.js";import"./Tooltip-CvPWsRqB.js";import"./Popper-1aVe17Xg.js";import"./GlobalStyles-BW4QefxH.js";import"./Menu-BfV33fk6.js";import"./useFormControl-CO6OogGI.js";import"./InputAdornment-C1l6JSIr.js";import"./usePreviousProps-eB1Ppz6I.js";import"./SwitchBase-3IV-eDJc.js";const Oe=({roles:o,errors:i,get_subsite:p})=>{const[l,g]=a.useState(""),[n,T]=a.useState(""),[r,x]=a.useState(""),[B,h]=a.useState(!1),[f,d]=a.useState(""),[O,m]=a.useState(!1),E=()=>{h(!1);const t={name:l,email:n,role:r,subsite_id:f};y.Inertia.post(F("admin.users.store").toString(),t)};return a.useEffect(()=>{Object.entries(o).length===1&&x(Object.entries(o)[0][0])},[o]),a.useEffect(()=>{h(!!r&&!!l&&!!n)},[r,l,n]),a.useEffect(()=>{r!="subsiteadmin"?(m(!1),d("")):(m(!0),d(Object.entries(p)[0][0]))},[r,p]),e.jsxs(e.Fragment,{children:[e.jsx(I,{title:"Create User"}),e.jsx(W,{children:e.jsx(N,{p:2,children:e.jsx(P,{sx:{p:2},children:e.jsxs(s,{container:!0,spacing:2,children:[e.jsx(s,{item:!0,xs:12,children:e.jsx(R,{variant:"body1",children:"Provide the required information. The password will be set by the user via a link sent to their email address."})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(j,{value:l,onChange:t=>g(t.target.value),label:"Name",variant:"outlined",fullWidth:!0,helperText:i==null?void 0:i.name})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(j,{value:n,onChange:t=>T(t.target.value),label:"Email address",variant:"outlined",fullWidth:!0,helperText:i==null?void 0:i.email})}),e.jsx(s,{item:!0,xs:6,children:e.jsxs(b,{variant:"outlined",fullWidth:!0,children:[e.jsx(v,{children:"Role"}),e.jsx(C,{value:r,onChange:t=>x(t.target.value),label:"Type",fullWidth:!0,children:Object.entries(o).map(([t,u],c)=>e.jsx(S,{value:t,children:u},c))}),e.jsx(k,{children:i==null?void 0:i.role})]})}),e.jsx(s,{item:!0,xs:6,children:r=="subsiteadmin"&&e.jsxs(b,{variant:"outlined",fullWidth:!0,children:[e.jsx(v,{children:"Subsite name"}),e.jsx(C,{open:O,disabled:r!="subsiteadmin",onClose:()=>m(!1),onOpen:()=>m(!0),label:"Subsite Name",onChange:t=>d(t.target.value),value:f||"",fullWidth:!0,children:Object.entries(p).map(([t,u],c)=>e.jsx(S,{value:t,children:u},c))})]})}),e.jsx(s,{item:!0,xs:12,children:e.jsx(w,{size:"large",variant:"contained",color:"primary",onClick:E,disabled:!B,children:"Create"})})]})})})})]})};export{Oe as default};