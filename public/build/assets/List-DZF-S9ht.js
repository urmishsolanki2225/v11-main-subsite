import{r as p,j as e}from"./client-ZKQMN23D.js";import{I as x,d as s}from"./index-BmtA0KFl.js";import{d as w}from"./Add-oTwsifuF.js";import{l as i}from"./index.m-DI45-rQC.js";import{L}from"./Listing-DOaYGk-1.js";import"./dayjs.min-BIwLhz4I.js";import{u as M}from"./useDataSource-CV-XnRBP.js";import{A as k}from"./AppBarHeader-ClGrA22v.js";import{C as E}from"./ContentScroll-D9O6pf62.js";import{m as c}from"./DataGridUtils-DqQ54bwL.js";import{I as R}from"./List-Dh7P2IJ_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./identifier-CVVhstXo.js";import"./Typography-BWGjmqeb.js";import"./ButtonBase-D5ln7if4.js";import"./useSlotProps-DL7U-EaF.js";import"./extendSxProp-5tSxLnIE.js";import"./Grow-1FiP9biG.js";import"./Box-BUYeTdQC.js";import"./Button-DZLqdWgp.js";import"./Confirm-BbQLBhxQ.js";import"./Menu-BCMxz3f0.js";import"./useFormControl-CO6OogGI.js";import"./GlobalStyles-D_Xt43Ne.js";import"./index-AoxikDaj.js";import"./Stack-B2ZIJkbS.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./MenuItem-Cc58SkCm.js";import"./ListItemText-BFrp0ozb.js";import"./Autocomplete-CEusBT7t.js";import"./Select-lP02voS4.js";import"./FormLabel-BEbkwqxG.js";import"./Close-DeKdm8LF.js";import"./index-BXImJBSP.js";import"./Popper-BKUAU8_E.js";import"./usePreviousProps-eB1Ppz6I.js";import"./app-Ck7UBcd6.js";import"./index-DxE8ywAI.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./ListItemIcon-BNV_poop.js";import"./Tooltip-B-18blil.js";import"./Checkbox-CIFK-wKz.js";import"./SwitchBase-CcKqqM_7.js";import"./TextField-CljZtUFq.js";import"./CircularProgress-DeCS6LzF.js";import"./TableCell-BHBxOuch.js";import"./FormControlLabel-Byp9hQbH.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./InputAdornment-C_Fu6lZu.js";const Ut=({users:j,filter:m,sort:g,can:t})=>{var a,n,d,u,f,h;const[y,S]=p.useState(),[o,l]=p.useState(m),C=M({mode:"inertia",paginatedData:j,search:y,filter:o,sort:g}),D=[{field:"id"},{field:"name",renderCell:r=>e.jsx(e.Fragment,{children:e.jsx(x,{href:i("admin.users.edit",{id:r.row.id}).toString(),children:r.row.name??"- no name -"})}),flex:2},{field:"email",renderCell:r=>e.jsx(e.Fragment,{children:e.jsx(x,{href:i("admin.users.edit",{id:r.row.id}).toString(),children:r.row.email??"- no email -"})}),flex:2},{field:"role"},c("created_at"),c("updated_at")],I=r=>{s.Inertia.post(i("admin.users.multiple.trash"),{ids:r})},A=r=>{s.Inertia.post(i("admin.users.multiple.restore"),{ids:r})},b=r=>{s.Inertia.delete(i("admin.users.multiple.destroy"),{data:{ids:r}})},F=()=>{s.Inertia.get(i("admin.users.create"))};return p.useEffect(()=>{l(m)},[m]),e.jsxs(e.Fragment,{children:[e.jsx(k,{title:"Users",filter:o,onSearch:S,onChangeFilter:l,filterOptions:(a=t==null?void 0:t.users)!=null&&a.deleteMany?[{label:"Deleted users",name:"trashed",value:"only"}]:[],children:e.jsx(R,{onClick:F,disabled:!((n=t==null?void 0:t.users)!=null&&n.create),size:"large",children:e.jsx(w,{})})}),e.jsx(E,{children:e.jsx(L,{columns:D,dataSource:C,multiSelectActions:{actions:((d=o==null?void 0:o.filter)==null?void 0:d.trashed)==="only"?[...(u=t==null?void 0:t.users)!=null&&u.restoreMany?[{identifier:"restore",label:"Restore",onAction:A}]:[],...(f=t==null?void 0:t.users)!=null&&f.forceDeleteMany?[{identifier:"destroy",label:"Delete permanently",onAction:b}]:[]]:(h=t==null?void 0:t.users)!=null&&h.deleteMany?[{identifier:"trash",label:"Delete User",onAction:I}]:[]}})})]})};export{Ut as default};
