import{r as n,j as e}from"./client-ZKQMN23D.js";import{d as v}from"./index-BmtA0KFl.js";import{d as ie,a as se}from"./RestoreFromTrash-BSEz2N4A.js";import{d as ne}from"./DeleteForever-Dtg3yl_d.js";import{C as ae,a as le,B as k,R as z,b as de,j as N,D as me,M as ce,S as pe,c as he,I as ue,V as fe}from"./MetaInfoManager-CqDpbzWQ.js";import{l as b}from"./index.m-DI45-rQC.js";import{S as xe,A as je}from"./AppBarHeader-ClGrA22v.js";import{f as ge}from"./Content-CSTk_AN3.js";import{d as E}from"./dayjs.min-BIwLhz4I.js";import"./Listing-DOaYGk-1.js";import{C as M}from"./Confirm-BbQLBhxQ.js";import"./useDataSource-CV-XnRBP.js";import{d as ye}from"./Edit-B9bTPveV.js";import{C as ve,a as B,T as be,b as Ce,d as Se}from"./RemoveCircle-CnluI2R2.js";import{T as h}from"./Typography-BWGjmqeb.js";import{S}from"./Section-DFrm5BHt.js";import{u as Me,S as we,a as Ie,A as Ye}from"./app-Ck7UBcd6.js";import{C as Ae}from"./ContentScroll-D9O6pf62.js";import{I as Fe,a as Re}from"./ItemBrowser-iM1k6Xfd.js";import{S as _e}from"./Sorter-RHivQPlc.js";import{B as g}from"./Box-BUYeTdQC.js";import{F as De}from"./FormControlLabel-Byp9hQbH.js";import{B as j}from"./Button-DZLqdWgp.js";import{P as Te}from"./List-Dh7P2IJ_.js";import{G as I}from"./Grid-CEw1b08m.js";import{F as H}from"./FormLabel-BEbkwqxG.js";import{I as $,S as L,O}from"./Select-lP02voS4.js";import{M as V}from"./MenuItem-Cc58SkCm.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./identifier-CVVhstXo.js";import"./TextField-CljZtUFq.js";import"./extendSxProp-5tSxLnIE.js";import"./useSlotProps-DL7U-EaF.js";import"./Grow-1FiP9biG.js";import"./useFormControl-CO6OogGI.js";import"./Menu-BCMxz3f0.js";import"./ButtonBase-D5ln7if4.js";import"./GlobalStyles-D_Xt43Ne.js";import"./index-AoxikDaj.js";import"./Config--wjR88LA.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./_baseFlatten-DKoV2aKy.js";import"./InputFile-D0HUmVGA.js";import"./Add-oTwsifuF.js";import"./DialogTitle-A-veO2Kn.js";import"./ListItemIcon-BNV_poop.js";import"./ListItemText-BFrp0ozb.js";import"./Tooltip-B-18blil.js";import"./Popper-BKUAU8_E.js";import"./Twitter-l9r6Aqk9.js";import"./TableRow-DIaWC5aH.js";import"./TableCell-BHBxOuch.js";import"./DataGridUtils-DqQ54bwL.js";import"./PublishStatusIcon-DtyKOrUb.js";import"./map-Dd2nvkUl.js";import"./index-D3ylJrlI.js";import"./InputAdornment-C_Fu6lZu.js";import"./useMediaQuery-DtNN74dm.js";import"./index-BXImJBSP.js";import"./usePreviousProps-eB1Ppz6I.js";import"./SwitchBase-CcKqqM_7.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-CEusBT7t.js";import"./Close-DeKdm8LF.js";import"./Checkbox-CIFK-wKz.js";import"./CircularProgress-DeCS6LzF.js";import"./Stack-B2ZIJkbS.js";import"./index-DxE8ywAI.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./DragIndicator-B36lBmZE.js";import"./lodash-BYTxXjAY.js";const Pe=o=>o.type==="highlight",ke=({videoItem:o,onRemoved:s,sx:t})=>{var a,d;const[i,c]=n.useState(o.contents.at(0));if(n.useEffect(()=>{c(o.contents.at(0))},[o]),!o)return null;const m=(a=i==null?void 0:i.videos)==null?void 0:a.at(0),p=m?(m==null?void 0:m.provider)==="vimeo"?`https://player.vimeo.com/video/${m.provider_id}`:`https://www.youtube-nocookie.com/embed/${m.provider_id}`:null,l=()=>{v.Inertia.get(b("admin.items.edit",{item:o.id}))};return e.jsxs(ve,{sx:{width:320,...t},children:[e.jsx(B,{sx:{p:0},children:e.jsx(be,{value:i==null?void 0:i.lang,onChange:(f,y)=>{var x;return c((x=o.contents)==null?void 0:x.find(({lang:C})=>C===y))},children:(d=o.contents)==null?void 0:d.map(f=>e.jsx(Ce,{label:f.lang,value:f.lang,sx:{minWidth:40}},f.lang))})}),e.jsx(ae,{component:"iframe",src:p||""}),e.jsx(B,{sx:{p:1},children:e.jsx(h,{variant:"body2",fontWeight:"bold",children:i==null?void 0:i.title})}),e.jsxs(le,{sx:{display:"flex",justifyContent:"space-between"},disableSpacing:!0,children:[e.jsx(k,{label:"Remove",buttonProps:{size:"small"},icon:e.jsx(Se,{}),onConfirm:()=>{s&&s()},children:"Remove this video from this context, note that it will not be deleted so it can still be used in other contexts."}),e.jsx(k,{label:"Edit",buttonProps:{size:"small"},icon:e.jsx(ye,{}),onConfirm:l,children:"Leave this screen to edit the image, unsaved changes will be lost."})]})]})},Ee=({annualreport:o,onChange:s})=>{const t=o.items,[i,c]=n.useState(!0),m=()=>{s(t.toSorted((a,d)=>a.publish_at.localeCompare(d.publish_at)))},p=a=>{t.find(({id:d})=>a.id===d)||s([...t,a])},l=n.useMemo(()=>{const a=E().set("date",15).set("year",o.year).set("month",o.month-1);return{filter:{published_before:i?a.endOf("month").utc().format("YYYY-MM-DDTHH:mm:00.000[Z]"):void 0,published_after:i?a.startOf("month").utc().format("YYYY-MM-DDTHH:mm:00.000[Z]"):void 0}}},[o.month,o.year,i]);return e.jsxs(e.Fragment,{children:[e.jsxs(g,{display:"flex",justifyContent:"space-between",gap:1,mb:1,children:[e.jsx(Fe,{onPick:p,sort:"publish_at",browserProps:{label:"Browse for item",buttonProps:{color:"primary",variant:"contained"}},filter:l,extraFilter:e.jsx(De,{label:e.jsxs(g,{display:"flex",flexDirection:"column",children:[e.jsx(h,{children:"Publish period"}),e.jsx(h,{variant:"caption",children:i?e.jsx(e.Fragment,{children:`Only ${E().set("date",1).set("month",o.month-1).set("year",o.year).format("MMM YYYY")}
                                    `}):"Any date"})]}),control:e.jsx(xe,{checked:i,onChange:(a,d)=>c(d),color:"white"})})}),e.jsx(z,{label:"Create resource item",menu:de,onPick:p,buttonProps:{color:"primary"}}),e.jsx(M,{confirmText:"The existing ordering will be reset.",onConfirm:()=>{m()},children:e.jsx(j,{size:"small",children:"Sort by date"})})]}),e.jsx(g,{sx:{maxHeight:500,overflowY:"auto",overflowX:"hidden"},children:t.length===0?e.jsx(h,{children:"No related items"}):e.jsx(_e,{items:t,onChange:s,variant:"column",Renderer:Re})})]})},Be=(o,s)=>{let t;return s.type==="patch"?t={...o,[s.field]:s.value}:s.type==="annualreport_reset"?t=s.annualreport:(console.warn("invalid reducer action",s),t=o),N.diff(t,o)?t:o},sr=({annualreport:o,can:s})=>{var F,R,_,D,T;const[t,i]=n.useReducer(Be,o),[c,m]=n.useState(),{needSave:p,setNeedSave:l}=Me(),[a,d]=n.useState(t.month),[f,y]=n.useState(t.year);n.useEffect(()=>{y(t.year)},[t.year]);const[x,C]=n.useState(),W=n.useCallback(r=>{i({type:"patch",field:"contents",value:r})},[]),G=n.useCallback((r,u)=>{i({type:"patch",field:"items",value:r}),u&&C({severity:"success",message:u})},[]);n.useEffect(()=>{l(!!c)},[l,c]),n.useEffect(()=>{i({type:"annualreport_reset",annualreport:o})},[o]),n.useEffect(()=>{m(N.diff(o,t))},[o,t]);const Z=!!t.deleted_at,X=()=>{v.Inertia.post(b("admin.annualreport.trash",{id:t.id}))},q=()=>{v.Inertia.post(b("admin.annualreport.restore",{id:t.id}))},J=()=>{v.Inertia.delete(b("admin.annualreport.destroyreport",{id:t.id,code:0}))},K=()=>{v.Inertia.patch(b("admin.annualreport.update",{annualreport:t}),c,{preserveState:!1,replace:!0}),l(!1)},Q=()=>{i({type:"annualreport_reset",annualreport:o}),y(o.year),d(o.month)},U=n.useMemo(()=>Array.from({length:12},(r,u)=>({value:(u+1).toString(),label:new Date(0,u).toLocaleString("en",{month:"long"})})),[]),w=new Date().getFullYear(),ee=n.useMemo(()=>Array.from({length:w-1995+1},(r,u)=>{const P=w-u;return{value:P.toString(),label:P.toString()}}),[w]),te=r=>{if(o.year==r)return l(!1),!1;y(r),l(!0),i({type:"patch",field:"year",value:r})},re=r=>{if(o.month==r)return l(!1),!1;d(r),l(!0),i({type:"patch",field:"month",value:r})},[Y,oe]=n.useState(t.video_item),A=r=>{i({type:"patch",field:"video_item_id",value:r==null?void 0:r.id}),oe(r)};return e.jsxs(me,{dispatch:i,children:[e.jsxs(je,{title:`Edit ${t.type}`,children:[e.jsx(j,{variant:"outlined",onClick:Q,color:"secondary",disabled:!p,children:"Reset"}),e.jsx(j,{variant:p?"contained":"outlined",onClick:K,color:"secondary",disabled:!p,children:"Save"})]}),e.jsxs(Ae,{children:[x&&e.jsx(we,{open:!0,autoHideDuration:6e3,anchorOrigin:{vertical:"bottom",horizontal:"center"},onClose:()=>C(void 0),TransitionComponent:Ie,children:e.jsx(Ye,{severity:x.severity,elevation:6,children:x.message})}),e.jsxs("form",{autoComplete:"off",autoCapitalize:"off",children:[e.jsx(g,{padding:2,children:e.jsx(h,{variant:"h4",children:ge(t)||t.contents[0].title||"-no title-"})}),e.jsx(ce,{item:t}),e.jsx(g,{p:2,children:e.jsx(Te,{sx:{p:2},children:e.jsxs(I,{container:!0,spacing:2,children:[e.jsx(I,{item:!0,xs:6,children:e.jsxs(H,{sx:{m:1},style:{marginLeft:"0px"},fullWidth:!0,children:[e.jsx($,{id:"year-label",children:"Year*"}),e.jsx(L,{labelId:"year-label",id:"year",name:"year",value:f,onChange:r=>te(Number(r.target.value)),input:e.jsx(O,{label:"Year*"}),children:ee.map(r=>e.jsx(V,{value:r.value,children:r.label},r.value))})]})}),t.type!=="summary"&&e.jsx(e.Fragment,{children:e.jsx(I,{item:!0,xs:6,children:e.jsxs(H,{sx:{m:1},fullWidth:!0,children:[e.jsx($,{id:"month-label",children:"Month*"}),e.jsx(L,{labelId:"month-label",id:"month",name:"month",value:a,onChange:r=>re(Number(r.target.value)),input:e.jsx(O,{label:"Month*"}),children:U.map(r=>e.jsx(V,{value:r.value,children:r.label},r.value))})]})})})]})})}),e.jsx(S,{title:"Contents",open:!0,summary:e.jsx(pe,{contents:[{title:"Languages",text:((F=t.contents)==null?void 0:F.map(({lang:r})=>r).join(", "))||"No content"}]}),children:e.jsx(he,{contents:t.contents,fields:["title","blurb","content"],htmlFields:{content:"full",blurb:"limited"},onChange:W})}),t.type==="summary"&&e.jsx(h,{px:4,children:"The first regular image is used for the tile in the Activity Reports overview listing, the support color is used here as well. If a portrait image is added it is used in the summary on the annual report timeline."}),e.jsx(ue,{images:t.all_images,singleImage:t.type==="highlight",support_color:t.support_color}),Pe(t)&&e.jsxs(e.Fragment,{children:[e.jsx(S,{title:"Related items",open:!0,summary:e.jsxs(h,{children:[((R=t.items)==null?void 0:R.length)||0," ","related items"]}),children:e.jsx(Ee,{annualreport:t,onChange:G})}),e.jsx(S,{title:"Actions",children:e.jsx(g,{display:"flex",gap:2,children:Z?e.jsxs(e.Fragment,{children:[((_=s==null?void 0:s.annualreports)==null?void 0:_.restoreMany)&&e.jsx(M,{onConfirm:q,children:e.jsx(j,{variant:"contained",startIcon:e.jsx(ie,{}),children:"Restore from Trash"})}),((D=s==null?void 0:s.annualreports)==null?void 0:D.forceDeleteMany)&&e.jsx(M,{onConfirm:J,children:e.jsx(j,{variant:"contained",color:"error",startIcon:e.jsx(ne,{}),children:"Delete permanently"})})]}):e.jsx(e.Fragment,{children:((T=s==null?void 0:s.annualreports)==null?void 0:T.deleteMany)&&e.jsx(M,{onConfirm:X,children:e.jsx(j,{variant:"contained",color:"primary",startIcon:e.jsx(se,{}),children:"Move to Trash"})})})})})]}),t.type==="summary"&&e.jsxs(S,{title:"Video (optional)",open:!0,children:[e.jsx(h,{children:"If a video is added, it is shown instead of the portrait on the Annual Report page"}),Y&&e.jsx(ke,{videoItem:Y,onRemoved:()=>A(void 0)}),(!t.video_item||!0)&&e.jsx(z,{label:t.video_item?"Choose another video":"Add video",menu:fe,onPick:r=>{A(r)}})]})]}),!1]})]})};export{sr as default};
