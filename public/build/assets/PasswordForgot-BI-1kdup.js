import{r as m,j as i}from"./client-ZKQMN23D.js";import{d}from"./index-Cvft0mqj.js";import{l as c}from"./index.m-DI45-rQC.js";import{w as f}from"./app-FM1-Ikzw.js";import{B as x}from"./Box-CGz8vZlR.js";import{P as h}from"./List-g_COJ0Le.js";import{T as a}from"./Typography-DYGSvwsR.js";import{T as u}from"./TextField-sycmgB1j.js";import{B as y}from"./Button-8kMDeHcM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./index-DxE8ywAI.js";import"./identifier-COQS9w1e.js";import"./dayjs.min-BIwLhz4I.js";import"./utc-BUuWioZ3.js";import"./extendSxProp-BsQwgIIR.js";import"./ThemeProvider-BEZwFSXz.js";import"./useThemeWithoutDefault-CDyP3F16.js";import"./index-D4Gjge3h.js";import"./useSlotProps-5g1mADCy.js";import"./useThemeProps-BhHsu7W2.js";import"./getThemeProps-wzNSIbEv.js";import"./useTheme-BwdP6VHP.js";import"./Grow-sQgJtlQN.js";import"./ButtonBase-D7fXzbc-.js";import"./Close-Cx_ZrGyk.js";import"./ListItemIcon-CrE8LiDf.js";import"./ListItemText-Cm8rKoNI.js";import"./Tooltip-BU7xgxFh.js";import"./Popper-C2x4ipkJ.js";import"./GlobalStyles-BztJkOC0.js";import"./FormLabel-BwLMeq7e.js";import"./Menu-BdDXEdD9.js";import"./useFormControl-CO6OogGI.js";import"./Select-BviP6ddm.js";const tt=({errors:t})=>{const[s,p]=m.useState(),[o,n]=m.useState("");m.useEffect(()=>{t!=null&&t.error&&p(t.error)},[t]);const r=()=>{d.Inertia.post(c("password.email"),{email:o})},l=e=>{o&&e.key==="Enter"&&r()};return i.jsxs("form",{children:[i.jsx(f,{}),i.jsx(x,{sx:{flexGrow:1,height:"100vh",overflow:"auto",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},children:i.jsxs(h,{sx:{display:"flex",width:"30%",minWidth:300,flexDirection:"column",justifyContent:"center",p:2,"& > *":{mb:2,"&:last-child":{mb:0}}},children:[i.jsx(a,{variant:"h4",children:"Forgot password"}),i.jsx(a,{variant:"body1",children:"Reset your password by providing your email address, a reset link will be sent there."}),i.jsx(a,{variant:"body1",color:"error",children:s}),i.jsx(u,{label:"Email address",value:o,variant:"outlined",type:"email",sx:{my:2},onChange:e=>n(e.target.value),onKeyPress:l,helperText:(t==null?void 0:t.email)||" ",autoComplete:"username",error:!!(t!=null&&t.email)}),i.jsx(y,{variant:"contained",size:"large",sx:{my:2},onClick:r,disabled:o.length===0,children:"Reset password"})]})})]})};export{tt as default};
