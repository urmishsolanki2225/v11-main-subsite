import{r as c,j as e}from"./client-ZKQMN23D.js";import{d as I,u as N}from"./index-BmtA0KFl.js";import{a as G,d as Q}from"./RestoreFromTrash-BSEz2N4A.js";import{d as X}from"./DeleteForever-Dtg3yl_d.js";import{B as w,S as z,d as ee,_ as te,e as ie,u as re,j as U,D as oe,M as ne,c as se,I as ae}from"./MetaInfoManager-CqDpbzWQ.js";import{l as b}from"./index.m-DI45-rQC.js";import{a as le}from"./axios-CMJq23T0.js";import{u as V,C as ce,D as W}from"./app-Ck7UBcd6.js";import{A as Y}from"./AppBarHeader-ClGrA22v.js";import{f as R}from"./Content-CSTk_AN3.js";import{g as E,u as de,_ as me,a as pe,b as fe,i as he}from"./useDataSource-CV-XnRBP.js";import{B as _}from"./Button-DZLqdWgp.js";import{D as ue,b as xe,c as je}from"./DialogTitle-A-veO2Kn.js";import{I as q}from"./List-Dh7P2IJ_.js";import{T as l}from"./Typography-BWGjmqeb.js";import{A as ge}from"./Autocomplete-CEusBT7t.js";import{T as Z}from"./TextField-CljZtUFq.js";import{B as y}from"./Box-BUYeTdQC.js";import{g as _e}from"./_commonjsHelpers-BosuxZz1.js";import{_ as be,a as ve,b as Ce}from"./_baseFlatten-DKoV2aKy.js";import{_ as ye,i as Ie,l as Se}from"./Config--wjR88LA.js";import"./dayjs.min-BIwLhz4I.js";import"./Listing-DOaYGk-1.js";import{S as D}from"./Section-DFrm5BHt.js";import{S as J}from"./Sorter-RHivQPlc.js";import{I as we,a as De}from"./ItemBrowser-iM1k6Xfd.js";import"./InputFile-D0HUmVGA.js";import{G as j}from"./Grid-CEw1b08m.js";import{C as Ee,a as ke,b as H}from"./CollectionsManager-Cht6rkiI.js";import{C as k}from"./Confirm-BbQLBhxQ.js";import{C as Oe}from"./ContentScroll-D9O6pf62.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./identifier-CVVhstXo.js";import"./Menu-BCMxz3f0.js";import"./useSlotProps-DL7U-EaF.js";import"./extendSxProp-5tSxLnIE.js";import"./useFormControl-CO6OogGI.js";import"./ButtonBase-D5ln7if4.js";import"./Grow-1FiP9biG.js";import"./GlobalStyles-D_Xt43Ne.js";import"./index-AoxikDaj.js";import"./MenuItem-Cc58SkCm.js";import"./ListItemText-BFrp0ozb.js";import"./RemoveCircle-CnluI2R2.js";import"./Add-oTwsifuF.js";import"./ListItemIcon-BNV_poop.js";import"./FormLabel-BEbkwqxG.js";import"./Select-lP02voS4.js";import"./Tooltip-B-18blil.js";import"./Popper-BKUAU8_E.js";import"./Twitter-l9r6Aqk9.js";import"./FormControlLabel-Byp9hQbH.js";import"./Stack-B2ZIJkbS.js";import"./Edit-B9bTPveV.js";import"./TableRow-DIaWC5aH.js";import"./TableCell-BHBxOuch.js";import"./DataGridUtils-DqQ54bwL.js";import"./PublishStatusIcon-DtyKOrUb.js";import"./map-Dd2nvkUl.js";import"./index-D3ylJrlI.js";import"./InputAdornment-C_Fu6lZu.js";import"./useMediaQuery-DtNN74dm.js";import"./index-BDIa4gQt.js";import"./index-DxE8ywAI.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./index-BXImJBSP.js";import"./Close-DeKdm8LF.js";import"./usePreviousProps-eB1Ppz6I.js";import"./SwitchBase-CcKqqM_7.js";import"./toPropertyKey-PLuKRk1e.js";import"./Checkbox-CIFK-wKz.js";import"./CircularProgress-DeCS6LzF.js";import"./DragIndicator-B36lBmZE.js";import"./lodash-BYTxXjAY.js";import"./DataCellCollectionTree-AKS66MIS.js";const Re=({collection:r})=>{var p,f,d,h;const{needSave:i}=V(),[t]=c.useState(r.ordering),o=[{title:"Items",text:e.jsxs(e.Fragment,{children:["This collection contains"," ",e.jsx("strong",{children:r.items_count||0})," items"]}),component:r.items_count?e.jsx(w,{label:"Show items",needConfirmation:i,onConfirm:()=>{E("admin.items.index",{filter:{"collection.id":r.id}})},color:"primary",variant:"text"}):void 0},{title:"Ordering",text:e.jsxs(e.Fragment,{children:["Item ordering:"," ",ce[r.ordering]]}),component:t==="manual"&&r.items_count?e.jsx(w,{label:"Load items for ordering",needConfirmation:i,onConfirm:()=>{I.Inertia.reload({only:["items"]})},color:"primary",variant:"text"}):void 0},{title:"Context",text:e.jsxs(e.Fragment,{children:[e.jsxs("strong",{children:[((p=r.parent_collections)==null?void 0:p.length)||"no"," "]}),((f=r.parent_collections)==null?void 0:f.length)===1?"parent":"parents"," ","and"," ",e.jsxs("strong",{children:[((d=r.sub_collections)==null?void 0:d.length)||"no"," "]}),((h=r.sub_collections)==null?void 0:h.length)===1?"sub collection":"sub collections"]})}];return e.jsx(z,{contents:o})},Te=()=>{const{collection:r}=N().props,[i,t]=c.useState(!1),[o,p]=c.useState(0),[f,d]=c.useState(),[h,g]=c.useState([]),[m,a]=c.useState([]),{paginatedData:u}=de({mode:"xhr",search:f,sort:"title",pageSize:42,xhrUrl:b("admin.collections.index")});c.useEffect(()=>{g((u==null?void 0:u.data)||[])},[u]),c.useEffect(()=>{if(!m.length){p(0);return}le.get(b("admin.collections.items.count",{ids:m.map(({id:n})=>`${n}`).join(",")}),{params:{existing_collection_id:r.id}}).then(({data:n})=>{n.withoutExisting!==void 0?p(n.withoutExisting):p(n.count)})},[m,r.id]);const S=()=>{I.Inertia.post(b("admin.collection.items.import",{id:r.id}),{collection_id:m.map(({id:n})=>n)})};return e.jsxs(e.Fragment,{children:[e.jsx(_,{color:"primary",variant:"outlined",onClick:()=>t(!0),children:"Import items"}),i&&e.jsxs(ue,{open:i,onClose:()=>t(!1),children:[e.jsx(Y,{title:"Import items from other collections",isDialog:!0,children:e.jsx(q,{edge:"end",color:"inherit",onClick:()=>t(!1),"aria-label":"close",size:"large",children:e.jsx(ee,{})})}),e.jsxs(xe,{children:[e.jsxs(l,{variant:"body1",children:["Search for 1 or more collections. The items that are in ",e.jsx("strong",{children:"all of those"})," collections can be imported into the current collection."]}),e.jsx(ge,{multiple:!0,value:m,options:h,filterOptions:n=>n,onChange:(n,x)=>a(x),getOptionLabel:n=>`${R(n)||"-untitled-"} (${n.items_count||0})`,onInputChange:(n,x)=>{d(x)},renderInput:n=>e.jsx(Z,{...n,label:"Collections",placeholder:"Search for 1 or more collections",fullWidth:!0,InputLabelProps:{shrink:!0}}),renderOption:(n,x)=>c.createElement("li",{...n,key:x.id},e.jsxs(y,{sx:{display:"flex",width:"100%",whiteSpace:"pre",alignItems:"baseline",borderRadius:1,borderStyle:"solid",borderWidth:0,borderColor:"divider",paddingLeft:0},children:[e.jsx(l,{variant:"body1",component:"span",sx:{flexGrow:0},children:R(x)||"-untitled-"}),e.jsx(l,{variant:"caption",component:"span",sx:{flexShrink:0,marginLeft:.5},children:x.type}),e.jsxs(l,{variant:"body1",component:"span",sx:{flexGrow:1,textAlign:"end",flexShrink:0,alignSelf:"flex-end"},children:["#",x.items_count]})]})),isOptionEqualToValue:({id:n},{id:x})=>n===x}),e.jsxs(l,{variant:"body1",children:["There are ",e.jsx("strong",{children:o})," items in the intersection of the selected collections, which are not yet in the collection."]})]}),e.jsxs(je,{children:[o>0&&e.jsx(l,{variant:"caption",color:"orange",children:"Note that importing is irreversible."}),e.jsxs(_,{disabled:!o,color:"primary",onClick:()=>S(),variant:"contained",sx:{marginLeft:2},children:["Import ",o," items"]})]})]})]})};var Fe=me,Ae=te,Le=ie,Be=be,Me=pe,Pe=fe,$e=200;function Ge(r,i,t,o){var p=-1,f=Ae,d=!0,h=r.length,g=[],m=i.length;if(!h)return g;t&&(i=Be(i,Me(t))),o?(f=Le,d=!1):i.length>=$e&&(f=Pe,d=!1,i=new Fe(i));e:for(;++p<h;){var a=r[p],u=t==null?a:t(a);if(a=o||a!==0?a:0,d&&u===u){for(var S=m;S--;)if(i[S]===u)continue e;g.push(a)}else f(i,u,o)||g.push(a)}return g}var We=Ge,He=We,Ne=ve,ze=Ce,Ue=ye,O=Ie,Ve=Se,Ye=Ue(function(r,i){var t=Ve(i);return O(t)&&(t=void 0),O(r)?He(r,Ne(i,1,O,!0),ze(t)):[]}),qe=Ye;const Ze=_e(qe),Je=()=>{const{collection:r,items:i}=N().props,[t,o]=c.useState(),{post:p,result:f,errorMessage:d}=re(),h=()=>{if(!t||!i)return;const m=new FormData;m.set("item_ids",t.map(({id:a})=>a).join(",")),m.set("unordered_item_ids",Ze(i,t,"id").map(({id:a})=>a).join(",")),p(b("admin.collection.items.ordering",{id:r.id}),m)},g=m=>{o(a=>a?a.find(({id:u})=>u===m.id)?a:[...a,m]:[m])};return c.useEffect(()=>{f!=null&&f.success&&o(void 0)},[f]),c.useEffect(()=>{o(i)},[i]),c.useEffect(()=>{!i||!t||(i.length,t.length)},[i,t]),e.jsxs(j,{item:!0,xs:12,container:!0,spacing:1,children:[e.jsx(j,{item:!0,xs:12,children:e.jsx(l,{variant:"h6",children:"Ordering"})}),r.ordering!=="manual"&&r.ordering!=="partial_date"?e.jsx(j,{item:!0,xs:12,children:"The collection ordering was changed to manual, first save the collection to reorder the items"}):t?e.jsxs(e.Fragment,{children:[r.ordering==="partial_date"&&e.jsxs(j,{item:!0,xs:12,children:[e.jsx(we,{browserProps:{label:"Add pinned item",buttonProps:{variant:"outlined"}},onPick:g,filter:{filter:{"collection.id":r.id}}})," ",e.jsx(l,{variant:"caption",children:'Only the "pinned" items can be ordered. They will appear on top, the remainder will be ordered by date.'})]}),e.jsx(j,{item:!0,xs:12,children:e.jsx(J,{items:t,Renderer:De,onChange:o})}),e.jsxs(j,{item:!0,xs:12,children:[e.jsx(_,{variant:"contained",disabled:he(t,i),onClick:()=>h(),children:"Save ordering"}),e.jsx(l,{variant:"body1",color:"error",children:d})]})]}):e.jsx(j,{item:!0,xs:12,children:e.jsx(_,{onClick:()=>I.Inertia.reload({only:["items"]}),children:"Load items"})})]})},Ke=(r,i)=>{let t;return i.type==="patch"?t={...r,[i.field]:i.value}:i.type==="patch_meta"?t={...r,meta:{...r.meta,[i.meta_field]:i.value}}:i.type==="collection_reset"?t=i.collection:(console.warn("invalid reducer action",i),t=r),U.diff(t,r)?t:r},vi=({collection:r,can:i})=>{var T,F,A,L,B,M;const[t,o]=c.useReducer(Ke,r),[p,f]=c.useState(),{needSave:d,setNeedSave:h}=V(),g=()=>{const s={...p};s!=null&&s.meta&&(s.meta=t.meta),I.Inertia.patch(b("admin.collections.update",{collection:t}).toString(),s,{preserveState:!1,replace:!0}),h(!1)},m=()=>{o({type:"collection_reset",collection:r})},a=c.useCallback(s=>{o({type:"patch",field:"contents",value:s})},[]);c.useEffect(()=>{h(!!p)},[h,p]),c.useEffect(()=>{o({type:"collection_reset",collection:r})},[r]),c.useEffect(()=>{f(U.diff(r,t))},[r,t]);const u=!!t.deleted_at,S=()=>{I.Inertia.post(b("admin.collections.trash",{id:t.id}))},n=()=>{I.Inertia.post(b("admin.collections.restore",{id:t.id}))},x=()=>{I.Inertia.delete(b("admin.collections.destroy",{id:t.id}))},K=c.useCallback(s=>{o({type:"patch",field:"sub_collections",value:s})},[]);return e.jsxs(oe,{dispatch:o,children:[e.jsxs(Y,{title:"Edit Collection",children:[e.jsx(_,{variant:"outlined",onClick:m,color:"secondary",disabled:!d,children:"Reset"}),e.jsx(_,{variant:d?"contained":"outlined",onClick:g,color:"secondary",disabled:!d,children:"Save"})]}),e.jsx(Oe,{children:e.jsxs("form",{autoComplete:"off",autoCapitalize:"off",children:[e.jsx(y,{padding:2,children:e.jsx(l,{variant:"h4",children:R(t)})}),e.jsx(ne,{item:t}),e.jsx(D,{title:"Contents",open:!0,summary:e.jsx(z,{contents:[{title:"Languages",text:((T=t.contents)==null?void 0:T.map(({lang:s})=>s).join(", "))||"No content"}]}),children:e.jsx(se,{contents:t.contents,fields:["title","subtitle","blurb"],htmlFields:{blurb:"limited"},onChange:a})}),e.jsx(ae,{images:t.all_images,support_color:t.support_color}),t.layout==="dossier_map"&&e.jsxs(D,{title:"World map parameters",children:[e.jsx(l,{variant:"h6",children:"Item count cutoffs"}),e.jsxs(l,{variant:"body1",children:["The ",e.jsx("em",{children:"support color"})," (above) is used as the base fill color. If no cutoffs are defined, all countries that have at least one item have that same color. Define one or more cutoffs to give a proportianally lighter shade to countries below the cutoff."]}),e.jsx(_,{variant:"contained",onClick:()=>{var C;const s=((C=t.meta)==null?void 0:C.item_count_map_cutoffs)||[],v=s.at(-1)||2;o({type:"patch_meta",meta_field:"item_count_map_cutoffs",value:[...s,v+1]})},children:"Add a cutoff"}),e.jsx(y,{display:"flex",gap:1,children:(((F=t.meta)==null?void 0:F.item_count_map_cutoffs)||[]).map((s,v)=>e.jsx(Z,{value:s||"",onChange:C=>{const P=parseInt(C.target.value),$=[...t.meta.item_count_map_cutoffs];$[v]=P||0,o({type:"patch_meta",meta_field:"item_count_map_cutoffs",value:$})},fullWidth:!1,sx:{width:90},InputProps:{endAdornment:e.jsx(q,{color:"warning",onClick:()=>{const C=[...t.meta.item_count_map_cutoffs];C.splice(v,1),o({type:"patch_meta",meta_field:"item_count_map_cutoffs",value:C})},children:e.jsx(G,{})})}},v))})]}),e.jsxs(D,{title:"Context",summary:e.jsx(Re,{collection:t}),children:[e.jsx(l,{variant:"h6",children:"Items"}),e.jsxs(l,{variant:"body1",children:["This collection contains"," ",e.jsxs("strong",{children:[t.items_count||0," items"]})]}),e.jsxs(j,{container:!0,spacing:2,children:[e.jsxs(j,{item:!0,xs:4,children:[e.jsx(w,{label:"Create item",color:"primary",needConfirmation:d,onConfirm:()=>{E("admin.items.create",{collection_id:t.id})},variant:"outlined"}),e.jsx("br",{}),e.jsx(l,{variant:"caption",children:"in this collection"})]}),e.jsxs(j,{item:!0,xs:4,children:[e.jsx(Te,{})," ",e.jsx("br",{}),e.jsx(l,{variant:"caption",children:"from other collections"})]}),e.jsx(j,{item:!0,xs:4,children:t.items_count?e.jsx(w,{label:"Show items",color:"primary",needConfirmation:d,onConfirm:()=>{E("admin.items.index",{filter:{"collection.id":t.id}})},variant:"outlined"}):e.jsx(e.Fragment,{})}),(t.ordering==="manual"||t.ordering==="partial_date")&&t.items_count?e.jsx(Je,{}):e.jsx(e.Fragment,{})]}),e.jsx(y,{marginY:2,children:e.jsx(W,{variant:"middle"})}),e.jsx(l,{variant:"h6",children:"Parent collections"}),e.jsx(l,{variant:"body1",children:"Choose a parent collection to place this collection in a context tree."}),e.jsx(Ee,{collections:t.parent_collections??[],groupings:ke,onChange:s=>o({type:"patch",field:"parent_collections",value:s})}),e.jsx(y,{marginY:2,children:e.jsx(W,{variant:"middle"})}),e.jsx(l,{variant:"h6",children:"Sub collections"}),e.jsxs(l,{variant:"body1",children:["The sub collections of this collection."," ",t.ordering!=="manual"&&`Ordered automatically by ${t.ordering}.`]}),t.ordering==="manual"&&t.sub_collections?e.jsx(J,{items:t.sub_collections,Renderer:H,onChange:K,variant:"row"}):e.jsx(y,{display:"flex",flexDirection:"row",flexWrap:"wrap",children:(A=t.sub_collections)==null?void 0:A.map((s,v)=>e.jsx(H,{item:s,dragHandle:e.jsx(e.Fragment,{}),removeHandle:e.jsx(e.Fragment,{})},v))}),e.jsx(w,{label:"Create sub collection",color:"primary",needConfirmation:d,onConfirm:()=>{E("admin.collections.create",{parent_collection_id:t.id})},variant:"outlined"})]}),e.jsx(D,{title:"Actions",children:e.jsx(y,{display:"flex",gap:2,children:u?e.jsxs(e.Fragment,{children:[((L=i==null?void 0:i.collections)==null?void 0:L.restoreMany)&&e.jsx(k,{onConfirm:n,children:e.jsx(_,{variant:"contained",startIcon:e.jsx(Q,{}),children:"Restore from Trash"})}),((B=i==null?void 0:i.collections)==null?void 0:B.forceDeleteMany)&&e.jsx(k,{onConfirm:x,children:e.jsx(_,{variant:"contained",color:"error",startIcon:e.jsx(X,{}),children:"Delete permanently"})})]}):e.jsx(e.Fragment,{children:((M=i==null?void 0:i.collections)==null?void 0:M.deleteMany)&&e.jsx(k,{onConfirm:S,children:e.jsx(_,{variant:"contained",color:"primary",startIcon:e.jsx(G,{}),children:"Move to Trash"})})})})}),!1]})})]})};export{vi as default};
