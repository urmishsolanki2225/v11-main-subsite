import{r as i,j as t}from"./client-ZKQMN23D.js";import{I as x}from"./index-BmtA0KFl.js";import{f as h}from"./app-Ck7UBcd6.js";import{l as s}from"./index.m-DI45-rQC.js";import{L as j}from"./Listing-DOaYGk-1.js";import"./dayjs.min-BIwLhz4I.js";import{u as S}from"./useDataSource-CV-XnRBP.js";import{A as g}from"./AppBarHeader-ClGrA22v.js";import{C}from"./ContentScroll-D9O6pf62.js";import{m as L}from"./DataGridUtils-DqQ54bwL.js";import{I as B}from"./List-Dh7P2IJ_.js";import{B as D}from"./Button-DZLqdWgp.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./index-DxE8ywAI.js";import"./identifier-CVVhstXo.js";import"./Typography-BWGjmqeb.js";import"./ButtonBase-D5ln7if4.js";import"./useSlotProps-DL7U-EaF.js";import"./extendSxProp-5tSxLnIE.js";import"./Grow-1FiP9biG.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./index-AoxikDaj.js";import"./index-BXImJBSP.js";import"./Close-DeKdm8LF.js";import"./ListItemIcon-BNV_poop.js";import"./ListItemText-BFrp0ozb.js";import"./Tooltip-B-18blil.js";import"./Popper-BKUAU8_E.js";import"./Box-BUYeTdQC.js";import"./GlobalStyles-D_Xt43Ne.js";import"./Confirm-BbQLBhxQ.js";import"./Menu-BCMxz3f0.js";import"./useFormControl-CO6OogGI.js";import"./Stack-B2ZIJkbS.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./MenuItem-Cc58SkCm.js";import"./Autocomplete-CEusBT7t.js";import"./Select-lP02voS4.js";import"./FormLabel-BEbkwqxG.js";import"./usePreviousProps-eB1Ppz6I.js";import"./Checkbox-CIFK-wKz.js";import"./SwitchBase-CcKqqM_7.js";import"./TextField-CljZtUFq.js";import"./CircularProgress-DeCS6LzF.js";import"./TableCell-BHBxOuch.js";import"./FormControlLabel-Byp9hQbH.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./InputAdornment-C_Fu6lZu.js";const Dt=({datasets:n,filter:r,sort:l,can:o})=>{var p;const[d,c]=i.useState(),[m,e]=i.useState(r),f=S({mode:"inertia",paginatedData:n,search:d,filter:m,sort:l});i.useEffect(()=>{e(r)},[r]);const u=[{field:"id"},{field:"label",renderCell:({row:a})=>t.jsxs(t.Fragment,{children:[a.label,t.jsx(D,{sx:{ml:1},LinkComponent:x,href:s("admin.geodata.map.create",{set_id:a.id}),children:"Create Map"})]}),flex:2},L("created_at")];return t.jsxs(t.Fragment,{children:[t.jsx(g,{title:"Geo Data Sets",filter:m,onSearch:c,onChangeFilter:e,children:t.jsx(B,{href:s("admin.geodata.import.create"),disabled:!((p=o==null?void 0:o.users)!=null&&p.create),size:"large",color:"inherit",children:t.jsx(h,{})})}),t.jsx(C,{children:t.jsx(j,{columns:u,dataSource:f})})]})};export{Dt as default};