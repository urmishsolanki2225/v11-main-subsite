import{r as a,j as e}from"./client-ZKQMN23D.js";import{d as V}from"./index-BmtA0KFl.js";import{g as $}from"./_commonjsHelpers-BosuxZz1.js";import{a as z}from"./_baseFlatten-DKoV2aKy.js";import{m as D}from"./map-Dd2nvkUl.js";import{l as P}from"./index.m-DI45-rQC.js";import{u as W}from"./useDataSource-CV-XnRBP.js";import{A as k}from"./Autocomplete-CEusBT7t.js";import{T as q}from"./TextField-CljZtUFq.js";import{g as U,a as H}from"./Autocomplete.renderers-BOt6_7lF.js";import{L as N}from"./LanguagePicker-B0V4BiPh.js";import{f as _}from"./Content-CSTk_AN3.js";import{F as I,a as G}from"./FormLabel-BEbkwqxG.js";import{R as J,a as K}from"./RadioGroup-BUEZ9yuW.js";import{F as Q}from"./FormControlLabel-Byp9hQbH.js";import{B as R}from"./Button-DZLqdWgp.js";import"./app-Ck7UBcd6.js";import{A as X}from"./AppBarHeader-ClGrA22v.js";import{C as Y}from"./ContentScroll-D9O6pf62.js";import{B as Z}from"./Box-BUYeTdQC.js";import{P as ee}from"./List-Dh7P2IJ_.js";import{G as c}from"./Grid-CEw1b08m.js";import{T as S}from"./Typography-BWGjmqeb.js";import{I as w,S as B}from"./Select-lP02voS4.js";import{M as T}from"./MenuItem-Cc58SkCm.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./identifier-CVVhstXo.js";import"./extendSxProp-5tSxLnIE.js";import"./useSlotProps-DL7U-EaF.js";import"./Menu-BCMxz3f0.js";import"./useFormControl-CO6OogGI.js";import"./ButtonBase-D5ln7if4.js";import"./Grow-1FiP9biG.js";import"./GlobalStyles-D_Xt43Ne.js";import"./index-AoxikDaj.js";import"./Close-DeKdm8LF.js";import"./index-BXImJBSP.js";import"./Popper-BKUAU8_E.js";import"./usePreviousProps-eB1Ppz6I.js";import"./Sorter-RHivQPlc.js";import"./DragIndicator-B36lBmZE.js";import"./lodash-BYTxXjAY.js";import"./Confirm-BbQLBhxQ.js";import"./Stack-B2ZIJkbS.js";import"./dayjs.min-BIwLhz4I.js";import"./FormGroup-DxqXoOxv.js";import"./Checkbox-CIFK-wKz.js";import"./SwitchBase-CcKqqM_7.js";import"./index-DxE8ywAI.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./ListItemIcon-BNV_poop.js";import"./ListItemText-BFrp0ozb.js";import"./Tooltip-B-18blil.js";import"./InputAdornment-C_Fu6lZu.js";var te=z,re=D;function ie(u,m){return te(re(u,m),1)}var ae=ie;const se=$(ae),oe=({values:u,label:m,dataSource:p,enableOrdering:C=!1,autocompleteProps:i,onChange:v,getOptionLabel:o,renderOption:x,renderTagsSortable:d,groupBy:h,onlyChildTypes:b})=>{const[F,y]=a.useState(),[E,O]=a.useState([]),{paginatedData:s,childTypes:j}=W({pageSize:42,...p,mode:"xhr",search:F});return a.useEffect(()=>{if(!s||!s.data.length){O([]);return}let r=[...s.data];b&&(r=r.filter(({type:n})=>j==null?void 0:j.includes(n))),O(r)},[s,h,b,j]),e.jsx(k,{multiple:!0,value:u||[],options:E,filterOptions:r=>r,onChange:(r,n)=>v(n.filter(f=>typeof f!="string")),getOptionLabel:r=>typeof r=="string"?r:o(r),onInputChange:(r,n)=>{y(n)},renderInput:r=>e.jsx(q,{...r,label:m,fullWidth:!0,InputLabelProps:{shrink:!0}}),renderOption:(r,n,f)=>x?x(r,n,f):a.createElement("li",{...r,key:n.id},o(n)),isOptionEqualToValue:({id:r},{id:n})=>r===n,renderTags:C?(r,n)=>d?d(r,n,f=>console.warn("ToDo reordered",f)):void 0:void 0,groupBy:h,...i})},ne=({label:u,dataSource:m,onChange:p,showReset:C})=>{const[i,v]=a.useState(""),{paginatedData:o}=W({pageSize:42,...m,mode:"xhr"}),x=d=>{v(d);const h=o.data.find(b=>`${b.id}`===d);p(h?[h]:[])};return e.jsxs(I,{variant:"outlined",fullWidth:!0,children:[e.jsx(G,{children:u}),e.jsxs(J,{row:!0,value:i,onChange:d=>x(d.target.value),children:[o==null?void 0:o.data.map(d=>e.jsx(Q,{value:`${(d==null?void 0:d.id)||""}`,label:_(d)||"-untitled-",control:e.jsx(K,{})},d.id)),C&&e.jsx(R,{onClick:()=>x(""),disabled:!i,children:"clear"})]})]})},ut=({types:u,subtypes:m,collection:p,collection_prepick:C})=>{const[i,v]=a.useState(""),[o,x]=a.useState(""),[d,h]=a.useState(!1),[b,F]=a.useState(!1),[y]=a.useState(!0),[E,O]=a.useState([]),[s,j]=a.useState(),[r,n]=a.useState({}),[f,A]=a.useState([]),M=()=>{F(!1);const t={type:i,subtype:o,collection_ids:f.map(({id:l})=>l).filter(l=>!!l),languages:E||[]};y&&p&&(t.collection_id=p==null?void 0:p.id),V.Inertia.post(P("admin.items.store").toString(),t)},L=(t,l)=>{n(g=>({...g,[t]:l||[]}))};return a.useEffect(()=>{n(t=>{const l={};return s==null||s.forEach(({label:g})=>l[g]=t[g]||[]),l})},[s]),a.useEffect(()=>{A(se(r))},[r]),a.useEffect(()=>{Object.entries(u).length===1&&v(Object.entries(u)[0][0])},[u]),a.useEffect(()=>{m[i]&&(h(!0),x(t=>m[i][t]?t:""))},[i,m]),a.useEffect(()=>{F(!!i&&(m[i]?!!o:!0)&&E.length>0&&(!(s!=null&&s.length)||f.length>0))},[i,o,m,E,s,f]),a.useEffect(()=>{const t=[...C[i]||[],...C.default||[]];o!=null&&o.startsWith("image")||i==="person"||i==="dev_coop_project"||i==="contact"?j([]):j(t||[])},[i,o,C]),e.jsxs(e.Fragment,{children:[e.jsx(X,{title:"Create Item"}),e.jsx(Y,{children:e.jsx(Z,{p:2,children:e.jsx(ee,{sx:{p:2},children:e.jsxs(c,{container:!0,spacing:2,children:[e.jsx(c,{item:!0,xs:12,children:e.jsxs(S,{variant:"body1",children:["Create an item of a specific type. Note that the type can ",e.jsx("strong",{children:"not"})," be changed later."]})}),e.jsx(c,{item:!0,xs:4,children:e.jsxs(I,{variant:"outlined",fullWidth:!0,children:[e.jsx(w,{children:"Type"}),e.jsx(B,{value:i,onChange:t=>v(t.target.value),label:"Type",fullWidth:!0,children:Object.entries(u).map(([t,l],g)=>e.jsx(T,{value:t,children:l},g))})]})}),e.jsx(c,{item:!0,xs:4,children:m[i]&&e.jsxs(I,{variant:"outlined",fullWidth:!0,children:[e.jsx(w,{children:"Subtype"}),e.jsx(B,{value:o,open:d,onChange:t=>x(t.target.value),disabled:!m[i],onClose:()=>h(!1),onOpen:()=>h(!0),label:"Subtype",fullWidth:!0,children:m[i]?e.jsx(T,{value:"",children:"required"})&&Object.entries(m[i]).map(([t,l],g)=>e.jsx(T,{value:t,children:l},g)):e.jsx(T,{value:"",children:"not applicable"})})]})}),e.jsxs(c,{item:!0,xs:12,children:[e.jsx(S,{variant:"h6",children:"Content languages"}),e.jsx(S,{variant:"body1",children:"Select the languages for which you will provide content now, others can be added later."})]}),e.jsx(c,{item:!0,xs:12,children:e.jsx(N,{onChange:O})}),p&&e.jsx(c,{item:!0,xs:12,children:e.jsxs(S,{variant:"body1",children:["This item will be created in the collection:"," ",e.jsx("strong",{children:_(p)})]})}),s!=null&&s.length?e.jsxs(e.Fragment,{children:[e.jsxs(c,{item:!0,xs:12,children:[e.jsx(S,{variant:"h6",children:"Collections for this item"}),e.jsx(S,{variant:"body1",children:"These are the most common collections in use, others can be added later."})]}),e.jsx(c,{item:!0,xs:12,container:!0,spacing:2,children:s==null?void 0:s.map(t=>e.jsx(c,{item:!0,xs:12,children:t.mode==="radio"?e.jsx(ne,{label:t.label,showReset:!0,dataSource:{xhrUrl:P("admin.collections.index"),filter:{filter:{...t.filter,status:"published"}},sort:"title"},onChange:l=>L(t.label,l)}):e.jsx(oe,{label:t.label,values:r[t.label],autocompleteProps:{openOnFocus:!0},dataSource:{xhrUrl:P("admin.collections.index"),filter:{filter:{...t.filter,status:"published"}},sort:"title"},getOptionLabel:U,groupBy:t.groupByParent?H:void 0,onlyChildTypes:t.onlyChildTypes,onChange:l=>L(t.label,l)})},t.label))})]}):e.jsx(e.Fragment,{}),e.jsx(c,{item:!0,xs:12,children:e.jsx(R,{size:"large",variant:"contained",color:"primary",onClick:M,disabled:!b,children:"Create"})})]})})})})]})};export{ut as default};
