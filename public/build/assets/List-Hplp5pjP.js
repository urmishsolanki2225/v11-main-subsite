import{r as a,j as e,R as X}from"./client-ZKQMN23D.js";import{I as ee,d as x}from"./index-BmtA0KFl.js";import{d as et}from"./Add-oTwsifuF.js";import{A as tt,B as rt,d as nt,S as fe}from"./AppBarHeader-ClGrA22v.js";import{d as z}from"./dayjs.min-BIwLhz4I.js";import{l as u}from"./index.m-DI45-rQC.js";import{d as st,b as at,L as ot}from"./app-Ck7UBcd6.js";import{d as it}from"./DeleteForever-Dtg3yl_d.js";import{a as Ie,_ as te,i as Te}from"./identifier-CVVhstXo.js";import{r as Pe,T as S}from"./Typography-BWGjmqeb.js";import{d as lt}from"./DragIndicator-B36lBmZE.js";import{d as dt,P as ge}from"./PublishStatusIcon-DtyKOrUb.js";import{T as ct,C as ut,a as ht,d as mt,b as Z}from"./RemoveCircle-CnluI2R2.js";import{a as xt}from"./axios-CMJq23T0.js";import{C as q}from"./Confirm-BbQLBhxQ.js";import{u as pt}from"./Grow-1FiP9biG.js";import{P as re,a as ft,I as je}from"./List-Dh7P2IJ_.js";import{B as H}from"./Box-BUYeTdQC.js";import{G as E}from"./Grid-CEw1b08m.js";import{L as we}from"./ListItemText-BFrp0ozb.js";import{T as U}from"./Tooltip-B-18blil.js";import{B as D}from"./Button-DZLqdWgp.js";import{L as ve}from"./Listing-DOaYGk-1.js";import{f as be}from"./Content-CSTk_AN3.js";import{u as ye}from"./useDataSource-CV-XnRBP.js";import{L as Ce,m as J}from"./DataGridUtils-DqQ54bwL.js";import{S as Q,I as gt}from"./Select-lP02voS4.js";import{M as N}from"./MenuItem-Cc58SkCm.js";import{D as jt,a as vt,b as bt,c as yt}from"./DialogTitle-A-veO2Kn.js";import{T as Ct,a as Se,b as St}from"./TableRow-DIaWC5aH.js";import{T as It}from"./TableHead-D8dFZ9CG.js";import{T as L}from"./TableCell-BHBxOuch.js";import{M as Tt}from"./Menu-BCMxz3f0.js";import{g as Pt,a as wt,c as Dt}from"./extendSxProp-5tSxLnIE.js";import{s as Mt,u as Rt,c as Ft}from"./useSlotProps-DL7U-EaF.js";import{F as Lt}from"./FormLabel-BEbkwqxG.js";import{T as Et}from"./TextField-CljZtUFq.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-Ax6NoBCi.js";import"./InputAdornment-C_Fu6lZu.js";import"./useFormControl-CO6OogGI.js";import"./index-BXImJBSP.js";import"./usePreviousProps-eB1Ppz6I.js";import"./SwitchBase-CcKqqM_7.js";import"./ButtonBase-D5ln7if4.js";import"./index-DxE8ywAI.js";import"./utc-BUuWioZ3.js";import"./ThemeProvider-DYHukqtx.js";import"./index-AoxikDaj.js";import"./Close-DeKdm8LF.js";import"./ListItemIcon-BNV_poop.js";import"./GlobalStyles-D_Xt43Ne.js";import"./Popper-BKUAU8_E.js";import"./index-BDIa4gQt.js";import"./Stack-B2ZIJkbS.js";import"./index-D3ylJrlI.js";import"./toPropertyKey-PLuKRk1e.js";import"./Autocomplete-CEusBT7t.js";import"./Checkbox-CIFK-wKz.js";import"./CircularProgress-DeCS6LzF.js";import"./FormControlLabel-Byp9hQbH.js";const De=a.createContext(null);function Yt(){const[l,d]=a.useState(null);return a.useEffect(()=>{d(`mui-p-${Math.round(Math.random()*1e5)}`)},[]),l}function At(l){const{children:d,value:c}=l,h=Yt(),y=a.useMemo(()=>({idPrefix:h,value:c}),[h,c]);return e.jsx(De.Provider,{value:y,children:d})}function Me(){return a.useContext(De)}function Re(l,d){const{idPrefix:c}=l;return c===null?null:`${l.idPrefix}-P-${d}`}function Fe(l,d){const{idPrefix:c}=l;return c===null?null:`${l.idPrefix}-T-${d}`}const $t=["children"],kt=a.forwardRef(function(d,c){const{children:h}=d,y=Ie(d,$t),p=Me();if(p===null)throw new TypeError("No TabContext provided");const g=a.Children.map(h,f=>a.isValidElement(f)?a.cloneElement(f,{"aria-controls":Re(p,f.props.value),id:Fe(p,f.props.value)}):null);return e.jsx(ct,te({},y,{ref:c,value:p.value,children:g}))});function Ot(l){return Pt("MuiTabPanel",l)}wt("MuiTabPanel",["root"]);const Nt=["children","className","value"],zt=l=>{const{classes:d}=l;return Ft({root:["root"]},Ot,d)},Ht=Mt("div",{name:"MuiTabPanel",slot:"Root",overridesResolver:(l,d)=>d.root})(({theme:l})=>({padding:l.spacing(3)})),V=a.forwardRef(function(d,c){const h=Rt({props:d,name:"MuiTabPanel"}),{children:y,className:p,value:g}=h,f=Ie(h,Nt),w=te({},h),Y=zt(w),o=Me();if(o===null)throw new TypeError("No TabContext provided");const I=Re(o,g),T=Fe(o,g);return e.jsx(Ht,te({"aria-labelledby":T,className:Dt(Y.root,p),hidden:g!==o.value,id:I,ref:c,role:"tabpanel",ownerState:w},f,{children:g===o.value&&y}))});var ne={},Bt=Te;Object.defineProperty(ne,"__esModule",{value:!0});var Le=ne.default=void 0,_t=Bt(Pe()),Ut=e;Le=ne.default=(0,_t.default)((0,Ut.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20m6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9"}),"DoNotDisturb");var se={},Vt=Te;Object.defineProperty(se,"__esModule",{value:!0});var Ee=se.default=void 0,qt=Vt(Pe()),Gt=e;Ee=se.default=(0,qt.default)((0,Gt.jsx)("path",{d:"M12 5V2L8 6l4 4V7c3.31 0 6 2.69 6 6 0 2.97-2.17 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93 0-4.42-3.58-8-8-8m-6 8c0-1.65.67-3.15 1.76-4.24L6.34 7.34C4.9 8.79 4 10.79 4 13c0 4.08 3.05 7.44 7 7.93v-2.02c-2.83-.48-5-2.94-5-5.91"}),"RestartAlt");const Wt=({annualreport:l,year:d,showTrashed:c})=>{const h={cursor:"pointer"},y=pt(),[p,g]=a.useState(l),f=Array.from({length:12},(i,n)=>({value:(n+1).toString(),label:new Date(0,n).toLocaleString("en",{month:"long"})})),w=(i,n)=>{const m={month:n,year:i,type:"highlight"};x.Inertia.get(u("admin.annualreport.create").toString(),m)},Y=i=>{x.Inertia.post(u("admin.annualreport.restore",{id:i}))},o=i=>{x.Inertia.delete(u("admin.annualreport.destroyreport",{id:i,code:1}))},I=i=>{x.Inertia.post(u("admin.annualreport.trash",i))},[T,A]=a.useState(null);a.useEffect(()=>{if(l){const i=[...l].sort((n,r)=>n.order_index-r.order_index);g(i)}},[l]);const G=(i,n)=>{i.dataTransfer.setData("text/plain",n),A(n)},$=(i,n)=>{if(i.preventDefault(),T!==n){const r=[...p],m=r.findIndex(k=>k.id===T),P=r.findIndex(k=>k.id===n),W=r[m];r[m]=r[P],r[P]=W,g(r)}},B=i=>{A(null);const n=p.map((r,m)=>({id:r.id,orderIndex:m,month:i}));console.log("Sending request",{orderUpdates:n}),xt.post(u("admin.updateOrder"),{orderUpdates:n}).then(r=>{console.log("Response:",r)}).catch(r=>{console.error("Error:",r)})};return e.jsx(e.Fragment,{children:e.jsx(re,{sx:{m:0,p:1,backgroundColor:"rgb(0 0 0 / 10%)"},children:e.jsx(H,{sx:{flexGrow:1},children:e.jsx(E,{container:!0,spacing:1.5,children:f.map(i=>e.jsx(X.Fragment,{children:e.jsxs(E,{item:!0,xs:4,children:[e.jsx(S,{gutterBottom:!0,variant:"h6",component:"div",sx:{textAlign:"center"},children:i.label}),e.jsx(ut,{sx:{mb:2,mt:1,boxShadow:1,borderRadius:2},style:{minHeight:"465px",position:"relative"},children:e.jsxs(ht,{children:[p.some(n=>n.month==i.value)?e.jsx(ft,{style:{maxHeight:"400px  ",overflowY:"auto"},children:p.map((n,r)=>{var m;return n.month==i.value?e.jsx(X.Fragment,{children:e.jsxs("div",{draggable:!0,onDragStart:P=>G(P,n.id),onDragOver:P=>$(P,n.id),onDragEnd:()=>B(n.month),style:{border:"1px solid #ccc",marginBottom:"3px",padding:"10px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center"},children:[e.jsx(lt,{style:h}),e.jsx(ee,{href:u("admin.annualreport.edit",{id:n.id}).toString(),children:e.jsx(we,{primary:(m=n.content)!=null&&m.title?n.content.title:"- No title -",onClick:()=>w(d,i.value),style:{fontFamily:"revert-layer",marginLeft:"10px"}})}),n.status=="published"&&(!n.publish_at||z(n.publish_at).isBefore(z()))?"":e.jsx(U,{title:"Unpublished",children:e.jsx("div",{children:e.jsx(dt,{sx:{fontSize:y.typography.fontSize,color:"text.secondary",marginLeft:.5}})})})]}),e.jsx("div",{style:{display:"flex"},children:c===0?e.jsx(U,{title:"Remove",children:e.jsx("div",{children:e.jsx(q,{onConfirm:()=>I(n.id),children:e.jsx("div",{children:e.jsx(mt,{color:"secondary",fontSize:"small",style:h})})})})}):e.jsxs(e.Fragment,{children:[e.jsx(U,{title:"Restore",children:e.jsx("div",{children:e.jsx(q,{onConfirm:()=>Y(n.id),children:e.jsx("div",{children:e.jsx(Ee,{color:"primary",fontSize:"small",style:h})})})})}),e.jsx(U,{title:"Permanently Delete",children:e.jsx("div",{children:e.jsx(q,{onConfirm:()=>o(n.id),children:e.jsx("div",{children:e.jsx(it,{color:"error",fontSize:"small",style:h})})})})})]})})]}),e.jsx("div",{style:{textAlign:"right",marginBottom:"-7px"},children:e.jsxs(S,{style:{fontSize:"10px"},children:["Published at: ",n.publish_at?z(n.publish_at).format("YYYY-MM-DD HH:mm"):z().format("YYYY-MM-DD HH:mm")]})})]},r)},r):null})}):e.jsxs(S,{variant:"body1",style:{display:"flex",justifyContent:"center",marginTop:"200px"},children:[e.jsx(Le,{})," No Data Found."]}),e.jsxs(D,{size:"small",onClick:()=>w(d,i.value),color:"secondary",style:{position:"absolute",bottom:"10px",background:"white",width:"100%",justifyContent:"start",display:"flex",alignItems:"center"},children:[e.jsx(st,{color:"secondary",fontSize:"small"})," ","Add"]})]})})]})},i.value))})})})})},nn=({tabid:l,summary:d,filter:c,sort:h,annualreport:y,status:p,month:g,year:f,items:w,videos:Y,summary_video:o,main_published_date:I,pdf_status:T})=>{var ce,ue,he,me,xe,pe;const[A,G]=a.useState(),[$,B]=a.useState(c),[i,n]=at(ot.ANNUALREPORT_YEAR),r=a.useMemo(()=>f||i||new Date().getFullYear(),[i,f]),[m,P]=a.useState(g!==null?`${g}`:""),W=ye({mode:"inertia",paginatedData:d,search:A,filter:{...$,...r&&{year:r},...m&&{month:m}},sort:h}),k=[{field:"id",headerName:"Id",renderCell:t=>e.jsxs(e.Fragment,{children:[t.row.id," ",e.jsx(ge,{item:t.row})]})},{field:"title",headerName:"Title",renderCell:t=>e.jsx(ee,{href:u("admin.annualreport.edit",{id:t.row.id}).toString(),children:be(t.row)||"- no title -"}),flex:3},Ce,{field:"year",headerName:"Year",sortable:!1},J("created_at","Created at"),J("updated_at","Updated at")];a.useEffect(()=>{B(c)},[c]);const ae=new Date().getFullYear(),Ye=Array.from({length:ae-1995+1},(t,s)=>{const v=ae-s;return{value:v.toString(),label:v.toString()}}),Ae=Array.from({length:12},(t,s)=>({value:(s+1).toString(),label:new Date(0,s).toLocaleString("en",{month:"long"})})),$e=(t,s)=>{n(t),x.Inertia.get(u("admin.annualreports.tabbing",{id:s}),{year:t,trashed:M==1?"only":""})},ke=t=>{x.Inertia.get(u("admin.annualreport.publishedreport"),{year:t})},M=p,Oe=t=>{t.stopPropagation(),x.Inertia.get(u("admin.annualreports.tabbing",{id:1}),{year:r,trashed:M==0?"only":""})},Ne=ye({mode:"inertia",paginatedData:w,search:A,filter:{...$,...r&&{year:r},...m&&{month:m}},sort:h}),ze=(t,s,v)=>{x.Inertia.post(u("admin.annualreport.hideItem",{id:t,year:s,month:v}),{preserveState:!0})},He=[{field:"id",headerName:"Id",renderCell:t=>e.jsxs(e.Fragment,{children:[t.row.id," ",e.jsx(ge,{item:t.row})]})},{field:"title",headerName:"Title",renderCell:t=>{var s;return e.jsx(ee,{href:u("admin.items.edit",{id:t.row.id}).toString(),children:be(t.row)||((s=t.row.contents[0])==null?void 0:s.title)||"- no title -"})},flex:3},Ce,{field:"Hide",headerName:"Change Status",renderCell:t=>e.jsx(fe,{checked:t.row.annual_headline=="1",onChange:()=>ze(t.row.id,r,m),color:"primary"}),sortable:!1,flex:1},{field:"type",headerName:"Type"},J("publish_at")],[oe,ie]=X.useState(null),Be=!!oe,C=l,_e=(t,s)=>{x.Inertia.get(u("admin.annualreports.tabbing",{id:s}),{year:r})},[le,R]=a.useState(""),Ue=/^[a-zA-Z0-9_-]{11}$/,Ve=/^[0-9]+$/,[qe,F]=a.useState(!1),[b,K]=a.useState(""),[j,O]=a.useState(""),Ge=t=>{K(t.target.value),O(""),R("")},We=t=>{O(t.target.value),F(!0),R("")};a.useEffect(()=>{var t;j==((t=o[0])==null?void 0:t.provider_id)&&F(!1)},[j,o]),a.useEffect(()=>{var t,s;b==((t=o[0])==null?void 0:t.provider)&&(O((s=o[0])==null?void 0:s.provider_id),F(!1))},[b,o]);const Ke=(t,s,v)=>{if(t==="youtube"){if(!s||!Ue.test(s))return R(`Please enter a valid ${t} video ID.`),!1}else if(t==="vimeo"&&(!s||!Ve.test(s)||s.length!==9))return R(`Please enter a valid ${t} video ID with 9 digits.`),!1;R(""),F(!1);const _={provider:t,provider_id:s,year:v};x.Inertia.post(u("admin.annualreport.videos").toString(),_)};a.useEffect(()=>{j||R("")},[j]),a.useEffect(()=>{var s,v,_;const t=j==null?void 0:j.trim();F(b!==""&&(b!==((s=o[0])==null?void 0:s.provider)||t!==((_=(v=o[0])==null?void 0:v.provider_id)==null?void 0:_.trim())))},[b,j,o]),a.useEffect(()=>{var t;o[0]&&((t=o[0])==null?void 0:t.year)===r?(F(!1),K(o[0].provider),O(o[0].provider_id)):(K(""),O(""))},[o,r]);const Ze=t=>{if(j){const s={year:t};x.Inertia.post(u("admin.annualreport.removevideos").toString(),s)}},Je=()=>{const s={year:f,type:"summary"};x.Inertia.get(u("admin.annualreport.create").toString(),s)},[Qe,de]=a.useState(!1),Xe=()=>{x.Inertia.post(u("admin.annualreport.generatePDF"),{year:r}),x.Inertia.reload()};return e.jsxs(e.Fragment,{children:[e.jsxs(tt,{title:"Annual Report "+r,filter:C=="2"?$:void 0,onSearch:C=="2"?G:void 0,onChangeFilter:C=="2"?B:void 0,children:[e.jsx(Q,{size:"small",value:r,onChange:t=>$e(Number(t.target.value),C),displayEmpty:!0,inputProps:{"aria-label":"Without label"},style:{borderRadius:"0px",maxHeight:"34px",width:"105px"},sx:{backgroundColor:"rgba(255, 255, 255, 0.2)",transition:"all 0.4s ease-in-out","&.Mui-focused":{backgroundColor:"rgba(255,255,255,0.8)"},"& .MuiOutlinedInput-notchedOutline":{border:"none"},"&:hover .MuiOutlinedInput-notchedOutline":{border:"none"},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{border:"none"}},children:Ye.map(t=>e.jsx(N,{value:t.value,children:t.label},t.value))}),C=="1"&&e.jsxs(e.Fragment,{children:[e.jsx(D,{variant:"contained",size:"small",onClick:()=>ke(r),children:"Save"}),e.jsx(D,{variant:"contained",size:"small",onClick:()=>de(!0),children:"PDF report"}),Qe&&e.jsxs(jt,{open:!0,onClose:()=>de(!1),maxWidth:"sm",children:[e.jsx(vt,{children:"PDF Reports"}),e.jsxs(bt,{children:[e.jsxs(S,{children:["It can take a long time for the PDFs to be generated. The jobs that generate them run in a background queue."," "]}),e.jsx(H,{mx:-3,children:e.jsxs(Ct,{size:"small",children:[e.jsx(It,{children:e.jsxs(Se,{children:[e.jsx(L,{sx:{pl:3},children:"Language"}),e.jsx(L,{children:"Exists"}),e.jsx(L,{children:"Generating now"})]})}),e.jsx(St,{children:["en","fr","es"].map(t=>{var s,v;return e.jsxs(Se,{children:[e.jsx(L,{sx:{pl:3},children:t}),e.jsx(L,{children:(s=T[t])!=null&&s.exists?e.jsx("a",{href:T[t].link,children:"yes"}):"no"}),e.jsx(L,{children:(v=T[t])!=null&&v.busy?"busy":"no"})]},t)})})]})})]}),e.jsxs(yt,{sx:{justifyContent:"space-between"},children:[e.jsx(D,{variant:"text",onClick:()=>{x.Inertia.reload()},sx:{verticalAlign:"baseline"},children:"Refresh status"}),e.jsx(D,{variant:"contained",onClick:()=>Xe(),children:"Generate PDFs"})]})]}),e.jsx(je,{size:"large",onClick:t=>ie(t.currentTarget),children:e.jsx(rt,{"aria-haspopup":"true",badgeContent:M===1?" ":"",color:M===1?"secondary":void 0,children:e.jsx(nt,{})})}),e.jsx(Tt,{id:"basic-menu",keepMounted:!0,anchorEl:oe,onClose:()=>ie(null),open:Be,anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:e.jsxs(N,{children:[e.jsx(we,{children:"Trashed Highlights"}),e.jsx(fe,{checked:M===1,onChange:t=>Oe(t)})]})})]}),C=="3"&&e.jsx(je,{onClick:Je,size:"large",children:e.jsx(et,{})}),C=="2"&&e.jsx(e.Fragment,{children:e.jsxs(Q,{size:"small",value:`${m}`,onChange:t=>P(t.target.value),displayEmpty:!0,style:{borderRadius:"0px",maxHeight:"34px",width:"130px"},sx:{backgroundColor:"rgba(255, 255, 255, 0.2)",transition:"all 0.4s ease-in-out","&.Mui-focused":{backgroundColor:"rgba(255,255,255,0.8)"},"& .MuiOutlinedInput-notchedOutline":{border:"none"},"&:hover .MuiOutlinedInput-notchedOutline":{border:"none"},"&.Mui-focused .MuiOutlinedInput-notchedOutline":{border:"none"}},children:[e.jsx(N,{value:"",disabled:!0,children:"Month"}),Ae.map(t=>e.jsx(N,{value:t.value,children:t.label},t.value))]})})]}),e.jsx(H,{sx:{height:"100vh",pt:8,boxSizing:"border-box",overflow:"hidden",display:"flex",flexDirection:"column"},children:e.jsxs(At,{value:C,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsxs(kt,{onChange:_e,"aria-label":"lab API tabs example",textColor:"inherit",children:[e.jsx(Z,{label:"Highlights",value:"1"}),e.jsx(Z,{label:"Headlines",value:"2"}),e.jsx(Z,{label:"Summary",value:"3"})]}),C=="1"&&e.jsx(S,{style:{fontSize:"12px"},children:(I==null?void 0:I.main_publish_at)&&e.jsxs(e.Fragment,{children:["Last Published at: ",z(I.main_publish_at).format("YYYY-MM-DD HH:mm")]})})]}),e.jsx(V,{value:"1",sx:{p:0,overflowY:"scroll"},children:e.jsx(Wt,{annualreport:y,year:r,status:p,showTrashed:M})}),e.jsx(V,{value:"2",style:{height:"100%"},sx:{p:0},children:e.jsx(ve,{columns:He,dataSource:Ne,selectMode:"none"})}),e.jsx(V,{value:"3",style:{height:"100%"},sx:{p:0},children:e.jsx(ve,{columns:k,dataSource:W,selectMode:"none"})}),e.jsxs(V,{value:"4",style:{height:"100%"},sx:{p:0},children:[e.jsx(H,{p:2,children:e.jsxs(re,{sx:{p:2},children:[e.jsx(S,{variant:"h6",children:"Video resource"}),e.jsx("div",{children:e.jsx(S,{variant:"caption",color:"textSecondary",children:b==="youtube"?e.jsxs("span",{children:[e.jsx("strong",{children:"Note:"})," You must enter a valid YouTube video ID. It should be 11 characters long and consist of letters, numbers, or underscores."]}):b==="vimeo"?e.jsxs("span",{children:[e.jsx("strong",{children:"Note:"})," You must enter a valid Vimeo video ID. It should consist of 9 numeric characters."]}):null})}),e.jsxs(E,{container:!0,spacing:2,children:[e.jsx(E,{item:!0,xs:6,children:e.jsxs(Lt,{variant:"outlined",fullWidth:!0,children:[e.jsx(gt,{children:"Provider"}),e.jsx(Q,{value:b,onChange:Ge,label:"Provider",children:Y.map((t,s)=>e.jsx(N,{value:t,children:t},s))})]})}),e.jsxs(E,{item:!0,xs:6,children:[e.jsx(Et,{value:j,onChange:We,label:"ID",variant:"outlined",fullWidth:!0,disabled:!b}),le&&e.jsx(S,{color:"error",children:le})]})]}),e.jsxs(E,{item:!0,xs:12,children:[e.jsx(D,{variant:"contained",onClick:()=>Ke(b,j,r),disabled:!qe,children:"Save"}),e.jsx(q,{onConfirm:()=>Ze(r),children:e.jsx(D,{variant:"contained",disabled:!((ce=o[0])!=null&&ce.provider)||!((ue=o[0])!=null&&ue.provider_id)||!j,style:{marginLeft:"10px"},children:"Remove"})})]})]})}),((he=o[0])==null?void 0:he.provider)&&e.jsx(H,{p:2,children:e.jsxs(re,{sx:{p:2},children:[e.jsx(S,{variant:"h6",children:"Preview"}),e.jsx("div",{children:((me=o[0])==null?void 0:me.provider)==="youtube"?e.jsx("iframe",{src:`https://www.youtube.com/embed/${(xe=o[0])==null?void 0:xe.provider_id}`,width:"400",height:"200",frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0}):e.jsx("iframe",{src:`https://player.vimeo.com/video/${(pe=o[0])==null?void 0:pe.provider_id}`,width:"400",height:"200",frameBorder:"0",allow:"autoplay; fullscreen; picture-in-picture",allowFullScreen:!0})})]})})]})]})})]})};export{nn as default};
