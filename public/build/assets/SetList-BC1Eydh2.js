import{r as i,j as t}from"./client-ZKQMN23D.js";import{I as x}from"./index-Cvft0mqj.js";import{g as h}from"./app-FM1-Ikzw.js";import{l as s}from"./index.m-DI45-rQC.js";import{L as j}from"./Listing-KKKL5LQ2.js";import"./dayjs.min-BIwLhz4I.js";import{u as g}from"./useDataSource-BcXzKQdo.js";import{A as S}from"./AppBarHeader-DfUwDWAG.js";import{C}from"./ContentScroll-CQWUddHm.js";import{m as L}from"./DataGridUtils-DqQ54bwL.js";import{I as B}from"./List-g_COJ0Le.js";import{B as D}from"./Button-8kMDeHcM.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./index-DxE8ywAI.js";import"./identifier-COQS9w1e.js";import"./Typography-DYGSvwsR.js";import"./ButtonBase-D7fXzbc-.js";import"./useSlotProps-5g1mADCy.js";import"./index-D4Gjge3h.js";import"./extendSxProp-BsQwgIIR.js";import"./Grow-sQgJtlQN.js";import"./useTheme-BwdP6VHP.js";import"./useThemeWithoutDefault-CDyP3F16.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-BEZwFSXz.js";import"./useThemeProps-BhHsu7W2.js";import"./getThemeProps-wzNSIbEv.js";import"./Close-Cx_ZrGyk.js";import"./ListItemIcon-CrE8LiDf.js";import"./ListItemText-Cm8rKoNI.js";import"./Tooltip-BU7xgxFh.js";import"./Popper-C2x4ipkJ.js";import"./Box-CGz8vZlR.js";import"./GlobalStyles-BztJkOC0.js";import"./Confirm-B07EF7Xb.js";import"./Menu-BdDXEdD9.js";import"./useFormControl-CO6OogGI.js";import"./Stack-D_Bp_Uwa.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./MenuItem-BQV6VCqx.js";import"./Autocomplete-DXgXs46U.js";import"./Select-BviP6ddm.js";import"./FormLabel-BwLMeq7e.js";import"./usePreviousProps-eB1Ppz6I.js";import"./Checkbox-D9kKuNSR.js";import"./SwitchBase-XH_hwTUJ.js";import"./TextField-sycmgB1j.js";import"./CircularProgress-CZ-KBjg-.js";import"./TableCell-ChGbszKc.js";import"./FormControlLabel-Dfpu1yJj.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./InputAdornment-Cwt13x1-.js";const bt=({datasets:n,filter:r,sort:l,can:o})=>{var p;const[d,c]=i.useState(),[m,e]=i.useState(r),f=g({mode:"inertia",paginatedData:n,search:d,filter:m,sort:l});i.useEffect(()=>{e(r)},[r]);const u=[{field:"id"},{field:"label",renderCell:({row:a})=>t.jsxs(t.Fragment,{children:[a.label,t.jsx(D,{sx:{ml:1},LinkComponent:x,href:s("admin.geodata.map.create",{set_id:a.id}),children:"Create Map"})]}),flex:2},L("created_at")];return t.jsxs(t.Fragment,{children:[t.jsx(S,{title:"Geo Data Sets",filter:m,onSearch:c,onChangeFilter:e,children:t.jsx(B,{href:s("admin.geodata.import.create"),disabled:!((p=o==null?void 0:o.users)!=null&&p.create),size:"large",color:"inherit",children:t.jsx(h,{})})}),t.jsx(C,{children:t.jsx(j,{columns:u,dataSource:f})})]})};export{bt as default};