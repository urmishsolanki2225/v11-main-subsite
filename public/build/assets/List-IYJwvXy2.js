import{r as m,R as u,j as e}from"./client-ZKQMN23D.js";import{d as n,I as O}from"./index-Cvft0mqj.js";import{d as q}from"./Add-CSI57y4_.js";import{d as G}from"./Edit-BQczuObD.js";import{e as J,f as I}from"./app-Bt98msSn.js";import{l as a}from"./index.m-DI45-rQC.js";import{P as K}from"./PublishStatusIcon-CFRSoGcQ.js";import{L as N}from"./Listing-BOo8Gk8o.js";import{f as w}from"./Content-CSTk_AN3.js";import{S as Q}from"./ShareRecord-CVq8AChO.js";import{u as U}from"./useDataSource-CV27kxAN.js";import{A as V}from"./AppBarHeader-Bu_GnhUD.js";import{C as W}from"./ContentScroll-BWeVEx1a.js";import{L as X,m as f}from"./DataGridUtils-DqQ54bwL.js";import{T as Y}from"./Tooltip-CvPWsRqB.js";import{I as p}from"./List-BgSNNkKU.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./identifier-DHETMsl0.js";import"./Typography-BOH_kjYl.js";import"./ButtonBase-B4crtf6-.js";import"./useSlotProps-O828vP2f.js";import"./index-BMQyuaGg.js";import"./extendSxProp-2i1zAAUV.js";import"./Grow--1bk2Oiz.js";import"./useTheme-CLvhDb73.js";import"./useThemeWithoutDefault-BU2aPzft.js";import"./index-BqRrtboY.js";import"./dayjs.min-BIwLhz4I.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-BQTsL86O.js";import"./useThemeProps-DZ1rqyJn.js";import"./getThemeProps-BL5VHue0.js";import"./Close-mNv2SlFn.js";import"./ListItemIcon-CVfiqn-C.js";import"./ListItemText-7JFmWKqR.js";import"./Button-Bs2LlykX.js";import"./Box-CVOB97vC.js";import"./GlobalStyles-BW4QefxH.js";import"./Popper-1aVe17Xg.js";import"./Confirm-DlxQ7D7t.js";import"./Menu-BfV33fk6.js";import"./useFormControl-CO6OogGI.js";import"./Stack-DUl2B3cg.js";import"./CircularProgress-CKHSwoEO.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./MenuItem-BvZfPpYr.js";import"./Autocomplete-Byzw-jYA.js";import"./Select-DstqRMzc.js";import"./FormLabel-BgEYUhxt.js";import"./usePreviousProps-eB1Ppz6I.js";import"./Checkbox-jThM1nDo.js";import"./SwitchBase-3IV-eDJc.js";import"./TextField-CXY6ukfK.js";import"./TableCell-gutrWIi-.js";import"./FormControlLabel-Do0ozMLQ.js";import"./Twitter-DyTnTSc8.js";import"./Dialog-CPjb0mTO.js";import"./DialogTitle-DqHD2Xkp.js";import"./Grid-BYUzo7jW.js";import"./RadioGroup-DVoAhqow.js";import"./FormGroup-BWakBykC.js";import"./axios-DPCeRp2O.js";import"./global-Cavf3q2D.js";import"./index-BDIa4gQt.js";import"./_baseIsEqual-DkReohVf.js";import"./InputAdornment-C1l6JSIr.js";const he=({items:A,collection:o,filter:l,sort:L,can:r})=>{var j,y,b,S,C;const[k,M]=m.useState(),[i,h]=m.useState(l),v=U({mode:"inertia",paginatedData:A,search:k,filter:i,sort:L}),[R,g]=u.useState(!1),T=[{field:"id",renderCell:t=>e.jsxs(e.Fragment,{children:[t.row.id," ",e.jsx(K,{item:t.row})]})},{field:"Share Post",sortable:!1,hide:R,renderCell:t=>e.jsx("div",{children:t.row.status=="published"&&(t.row.type=="article"||t.row.type=="static")?e.jsx(p,{onClick:s=>{s.stopPropagation(),P(t.row.id,t.row.contents.map(d=>d.lang).join(","))},children:e.jsx(I,{})}):e.jsx(p,{disabled:!0,children:e.jsx(I,{})})})},{field:"title",renderCell:t=>{var s;return e.jsx(O,{href:a("admin.items.edit",{id:t.row.id}).toString(),children:w(t.row)||((s=t.row.contents[0])==null?void 0:s.title)||"- no title -"})},flex:2},X,f("created_at"),f("updated_at"),f("publish_at"),{field:"type"},{field:"subtype"}],[x,_]=m.useState([]),[c,D]=u.useState(""),[E,F]=u.useState(""),P=(t,s)=>{const d=s.split(",");F(d),D(t),_({...x,type:"items",id:t})},$=t=>{n.Inertia.post(a("admin.items.multiple.trash"),{ids:t})},z=t=>{n.Inertia.post(a("admin.items.multiple.restore"),{ids:t})},B=t=>{n.Inertia.delete(a("admin.items.multiple.destroy"),{data:{ids:t}})},H=()=>{n.Inertia.get(a("admin.items.create"))};return m.useEffect(()=>{var t;((t=i==null?void 0:i.filter)==null?void 0:t.trashed)==="only"?g(!0):g(!1)},[i]),m.useEffect(()=>{h(l)},[l]),e.jsxs(e.Fragment,{children:[e.jsx(V,{title:o?`Items in '${w(o)}'`:"Items",afterTitle:o!=null&&o.id?e.jsx(Y,{title:"Edit collection",children:e.jsx(p,{size:"small",onClick:()=>n.Inertia.get(a("admin.collections.edit",{id:o.id})),color:"inherit",children:e.jsx(G,{})})}):void 0,filterOptions:[{label:"Missing translations",name:"missing_translations"},{label:"Missing workarea",name:"missing_workarea"},{label:"Hide unpublished",name:"status",value:"published"},{label:"Trashed items",name:"trashed",value:"only"}],filter:i,onSearch:M,onChangeFilter:h,children:e.jsx(p,{onClick:H,disabled:r?!((j=r==null?void 0:r.items)!=null&&j.create):!0,size:"large",children:e.jsx(q,{})})}),e.jsx(W,{children:e.jsx(N,{columns:T,dataSource:v,multiSelectActions:{actions:((y=i==null?void 0:i.filter)==null?void 0:y.trashed)==="only"?[...(b=r==null?void 0:r.items)!=null&&b.restoreMany?[{identifier:"restore",label:"Restore",onAction:z}]:[],...(S=r==null?void 0:r.items)!=null&&S.forceDeleteMany?[{identifier:"destroy",label:"Delete permanently",onAction:B}]:[]]:(C=r==null?void 0:r.items)!=null&&C.deleteMany?[{identifier:"trash",label:"Move to Trash",onAction:$}]:[]}})}),c?e.jsx(Q,{RecordLang:E,Id:c,setArray:x,AvailableLang:J}):e.jsx(e.Fragment,{})]})};export{he as default};
