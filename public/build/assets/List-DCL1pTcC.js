import{r as m,R as u,j as e}from"./client-ZKQMN23D.js";import{d as n,I as O}from"./index-BmtA0KFl.js";import{d as q}from"./Add-oTwsifuF.js";import{d as G}from"./Edit-B9bTPveV.js";import{c as J,e as I}from"./app-Ck7UBcd6.js";import{l as a}from"./index.m-DI45-rQC.js";import{P as K}from"./PublishStatusIcon-DtyKOrUb.js";import{L as N}from"./Listing-DOaYGk-1.js";import{f as w}from"./Content-CSTk_AN3.js";import{S as Q}from"./ShareRecord-XCdTZY0y.js";import{u as U}from"./useDataSource-CV-XnRBP.js";import{A as V}from"./AppBarHeader-ClGrA22v.js";import{C as W}from"./ContentScroll-D9O6pf62.js";import{L as X,m as h}from"./DataGridUtils-DqQ54bwL.js";import{T as Y}from"./Tooltip-B-18blil.js";import{I as p}from"./List-Dh7P2IJ_.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./identifier-CVVhstXo.js";import"./Typography-BWGjmqeb.js";import"./ButtonBase-D5ln7if4.js";import"./useSlotProps-DL7U-EaF.js";import"./extendSxProp-5tSxLnIE.js";import"./Grow-1FiP9biG.js";import"./index-DxE8ywAI.js";import"./dayjs.min-BIwLhz4I.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./index-AoxikDaj.js";import"./index-BXImJBSP.js";import"./Close-DeKdm8LF.js";import"./ListItemIcon-BNV_poop.js";import"./ListItemText-BFrp0ozb.js";import"./Button-DZLqdWgp.js";import"./Box-BUYeTdQC.js";import"./GlobalStyles-D_Xt43Ne.js";import"./Popper-BKUAU8_E.js";import"./Confirm-BbQLBhxQ.js";import"./Menu-BCMxz3f0.js";import"./useFormControl-CO6OogGI.js";import"./Stack-B2ZIJkbS.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./MenuItem-Cc58SkCm.js";import"./Autocomplete-CEusBT7t.js";import"./Select-lP02voS4.js";import"./FormLabel-BEbkwqxG.js";import"./usePreviousProps-eB1Ppz6I.js";import"./Checkbox-CIFK-wKz.js";import"./SwitchBase-CcKqqM_7.js";import"./TextField-CljZtUFq.js";import"./CircularProgress-DeCS6LzF.js";import"./TableCell-BHBxOuch.js";import"./FormControlLabel-Byp9hQbH.js";import"./Twitter-l9r6Aqk9.js";import"./DialogTitle-A-veO2Kn.js";import"./Grid-CEw1b08m.js";import"./RadioGroup-BUEZ9yuW.js";import"./FormGroup-DxqXoOxv.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./InputAdornment-C_Fu6lZu.js";const ne=({items:A,collection:o,filter:l,sort:L,can:r})=>{var j,y,b,S,C;const[k,M]=m.useState(),[i,f]=m.useState(l),v=U({mode:"inertia",paginatedData:A,search:k,filter:i,sort:L}),[R,c]=u.useState(!1),T=[{field:"id",renderCell:t=>e.jsxs(e.Fragment,{children:[t.row.id," ",e.jsx(K,{item:t.row})]})},{field:"Share Post",sortable:!1,hide:R,renderCell:t=>e.jsx("div",{children:t.row.status=="published"&&(t.row.type=="article"||t.row.type=="static")?e.jsx(p,{onClick:s=>{s.stopPropagation(),P(t.row.id,t.row.contents.map(d=>d.lang).join(","))},children:e.jsx(I,{})}):e.jsx(p,{disabled:!0,children:e.jsx(I,{})})})},{field:"title",renderCell:t=>{var s;return e.jsx(O,{href:a("admin.items.edit",{id:t.row.id}).toString(),children:w(t.row)||((s=t.row.contents[0])==null?void 0:s.title)||"- no title -"})},flex:2},X,h("created_at"),h("updated_at"),h("publish_at"),{field:"type"},{field:"subtype"}],[g,_]=m.useState([]),[x,D]=u.useState(""),[E,F]=u.useState(""),P=(t,s)=>{const d=s.split(",");F(d),D(t),_({...g,type:"items",id:t})},$=t=>{n.Inertia.post(a("admin.items.multiple.trash"),{ids:t})},z=t=>{n.Inertia.post(a("admin.items.multiple.restore"),{ids:t})},B=t=>{n.Inertia.delete(a("admin.items.multiple.destroy"),{data:{ids:t}})},H=()=>{n.Inertia.get(a("admin.items.create"))};return m.useEffect(()=>{var t;((t=i==null?void 0:i.filter)==null?void 0:t.trashed)==="only"?c(!0):c(!1)},[i]),m.useEffect(()=>{f(l)},[l]),e.jsxs(e.Fragment,{children:[e.jsx(V,{title:o?`Items in '${w(o)}'`:"Items",afterTitle:o!=null&&o.id?e.jsx(Y,{title:"Edit collection",children:e.jsx(p,{size:"small",onClick:()=>n.Inertia.get(a("admin.collections.edit",{id:o.id})),color:"inherit",children:e.jsx(G,{})})}):void 0,filterOptions:[{label:"Missing translations",name:"missing_translations"},{label:"Missing workarea",name:"missing_workarea"},{label:"Hide unpublished",name:"status",value:"published"},{label:"Trashed items",name:"trashed",value:"only"}],filter:i,onSearch:M,onChangeFilter:f,children:e.jsx(p,{onClick:H,disabled:r?!((j=r==null?void 0:r.items)!=null&&j.create):!0,size:"large",children:e.jsx(q,{})})}),e.jsx(W,{children:e.jsx(N,{columns:T,dataSource:v,multiSelectActions:{actions:((y=i==null?void 0:i.filter)==null?void 0:y.trashed)==="only"?[...(b=r==null?void 0:r.items)!=null&&b.restoreMany?[{identifier:"restore",label:"Restore",onAction:z}]:[],...(S=r==null?void 0:r.items)!=null&&S.forceDeleteMany?[{identifier:"destroy",label:"Delete permanently",onAction:B}]:[]]:(C=r==null?void 0:r.items)!=null&&C.deleteMany?[{identifier:"trash",label:"Move to Trash",onAction:$}]:[]}})}),x?e.jsx(Q,{RecordLang:E,Id:x,setArray:g,AvailableLang:J}):e.jsx(e.Fragment,{})]})};export{ne as default};