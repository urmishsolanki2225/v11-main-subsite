import{r as F,j as t}from"./client-ZKQMN23D.js";import{a as E}from"./index-Cvft0mqj.js";import{l as L}from"./index.m-DI45-rQC.js";import{M as T,P as m}from"./PlateFormControl-Do-uDCEC.js";import{f as g}from"./Content-CSTk_AN3.js";import{Themed as S}from"./Themed-C1Um3MUd.js";import{B as c}from"./Box-CGz8vZlR.js";import{T as l,F as f}from"./TextField-sycmgB1j.js";import{M as b}from"./MenuItem-BQV6VCqx.js";import{F as j}from"./FormLabel-BwLMeq7e.js";import{I as _,S as D,F as w}from"./Select-BviP6ddm.js";import{C as M}from"./Autocomplete-DXgXs46U.js";import{C as A}from"./Checkbox-D9kKuNSR.js";import{L as O}from"./ListItemText-Cm8rKoNI.js";import"./_commonjsHelpers-BosuxZz1.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./Sorter-D-iJhMGf.js";import"./DragIndicator-DGdFoTWd.js";import"./identifier-COQS9w1e.js";import"./Typography-DYGSvwsR.js";import"./ButtonBase-D7fXzbc-.js";import"./useSlotProps-5g1mADCy.js";import"./index-D4Gjge3h.js";import"./extendSxProp-BsQwgIIR.js";import"./Grow-sQgJtlQN.js";import"./useTheme-BwdP6VHP.js";import"./useThemeWithoutDefault-CDyP3F16.js";import"./List-g_COJ0Le.js";import"./lodash-BYTxXjAY.js";import"./Confirm-B07EF7Xb.js";import"./Menu-BdDXEdD9.js";import"./useFormControl-CO6OogGI.js";import"./GlobalStyles-BztJkOC0.js";import"./Stack-D_Bp_Uwa.js";import"./useThemeProps-BhHsu7W2.js";import"./getThemeProps-wzNSIbEv.js";import"./Button-8kMDeHcM.js";import"./Autocomplete.renderers-r1kulAc7.js";import"./dayjs.min-BIwLhz4I.js";import"./AutocompleteSingle-CdSmmfNH.js";import"./useDataSource-BcXzKQdo.js";import"./axios-CMJq23T0.js";import"./index-BDIa4gQt.js";import"./Grid-DLryTqtI.js";import"./TableRow-B3upNWdu.js";import"./TableCell-ChGbszKc.js";import"./TableHead-CbBxbIBo.js";import"./Tooltip-BU7xgxFh.js";import"./Popper-C2x4ipkJ.js";import"./DialogTitle-BNfmKa8y.js";import"./Config-CbgY5lav.js";import"./_baseFlatten-BuQtLD_p.js";import"./ThemeProvider-BEZwFSXz.js";import"./Close-Cx_ZrGyk.js";import"./usePreviousProps-eB1Ppz6I.js";import"./SwitchBase-XH_hwTUJ.js";const Ue=({taxonomy:s})=>{var C;const[x,B]=F.useState(()=>{var e;return((e=s==null?void 0:s.sub_collections)==null?void 0:e.reduce((n,p)=>({...n,[p.id]:[]}),{}))||{}}),{data:i,setData:a,errors:r,setError:v,clearErrors:y,post:I}=E({language:window.language||"en",title:"",partners_benefitting:[],partners_dev_coop:[],year_start:new Date().getFullYear(),year_end:new Date().getFullYear(),taxonomy_collection_ids:[],description:"",objectives:"",activities:"",outcomes:"",url:"",public_email:"",contact_email:"",contact_name:"",funding:"",budget_currency:"€",budget_amount:0,remark_internal:"",image:null,files:null}),P=()=>{I(L("coop_projects.store"))},u=e=>{i[e]?y(e):v(e,"This field is required")},W=(e,n)=>{const p=typeof n=="string"?n.split(",").map(d=>parseInt(d)):n,o={...x,[e]:[...p]};B(o),a("taxonomy_collection_ids",Object.values(o).flat())},k=()=>{i.url&&!i.url.match(/^https?:\/\//)?v("url","The URL should start with http:// or https://"):y("url")},h=(e,n)=>{a(e,JSON.stringify(n))};return t.jsx(S,{children:t.jsxs(c,{p:4,children:[t.jsxs(c,{display:"flex",flexDirection:"column",maxWidth:800,alignItems:"flex-start",children:[t.jsx("h2",{children:"Data entry form Development Cooperation projects"}),t.jsxs("p",{children:["This form is for use by EI member organisations carrying out cooperation projects with other EI affiliates. Submitted projects will be added to the EI cooperation database, which can be found"," ",t.jsx("a",{href:"https://www.ei-ie.org/en/coop_projects",children:"here"}),". If you are collaborating on a project with other cooperation partners, please ensure that the project has not been submitted yet. Please contact us at"," ",t.jsx("a",{href:"mailto:Solidarity@ei-ie.org",children:"Solidarity@ei-ie.org"})," ","if you have any questions"]}),t.jsx(l,{select:!0,value:i.language,onChange:e=>a("language",e.target.value),label:"Language",fullWidth:!1,error:!!r.language,helperText:r.language||"The language used in this data sheet",children:["en","es","fr"].map(e=>t.jsx(b,{value:e,children:e},e))}),t.jsx(l,{value:i.title,onChange:e=>a("title",e.target.value),label:"Project title",fullWidth:!0,error:!!r.title,helperText:r.title||"required",onBlur:()=>u("title")}),t.jsx("h3",{children:"Partners"}),t.jsx("p",{children:"Add each partner on a separate line, indicating their role in the project and optionally their country. Please use the search box to find a partner in the member database, that way we can automatically link the project to them and their country. If the partner is not a member you can still add them, in that case please provide the country, if applicable."}),t.jsx("p",{children:"Note that the order in which partners are listed here is not taken into account; on the published project pages they will be shown grouped by role and then alphabetically by country."}),t.jsx("h4",{children:"Implementing Organizations"}),t.jsx(T,{role:"benefitting",onChange:e=>a("partners_benefitting",e)}),t.jsx("h4",{children:"Cooperation Partners"}),t.jsx(T,{role:"dev_coop",onChange:e=>a("partners_dev_coop",e)}),t.jsx("h3",{children:"Project details"}),t.jsxs(c,{display:"flex",gap:2,children:[t.jsx(l,{value:i.year_start||"",onChange:e=>a("year_start",parseInt(e.target.value)||0),label:"Year started",error:!!r.year_start,helperText:r.year_start||"required",onBlur:()=>u("year_start")}),t.jsx(l,{value:i.year_end||"",onChange:e=>a("year_end",parseInt(e.target.value)||0),label:"Year ended",error:!!r.year_end,helperText:r.year_end||"required",onBlur:()=>u("year_end")})]}),(C=s==null?void 0:s.sub_collections)==null?void 0:C.map(e=>{var n,p;return t.jsxs(j,{variant:"filled",fullWidth:!0,children:[t.jsx(_,{shrink:!0,children:g(e)}),t.jsx(D,{multiple:!0,value:x[e.id]||[],onChange:o=>W(e.id,o.target.value),renderValue:o=>t.jsx(c,{display:"flex",flexWrap:"wrap",gap:.5,children:o.map(d=>t.jsx(M,{label:g(e.sub_collections.find(({id:q})=>d===q))},d))}),children:(n=e.sub_collections)==null?void 0:n.map(o=>t.jsxs(b,{value:o.id,children:[t.jsx(A,{checked:x[e.id].includes(o.id)}),t.jsx(O,{primary:g(o)})]},o.id))}),t.jsx(f,{children:((p=e.content)==null?void 0:p.subtitle)||"several choices possible"})]},e.id)}),t.jsx(m,{label:"Description",onChange:e=>h("description",e),helperText:r.description||"required, max 1000 characters",textLimit:1e3,error:!!r.description}),t.jsx(m,{label:"Objectives",onChange:e=>h("objectives",e),helperText:r.objectives||"required, max 1000 characters",textLimit:1e3,error:!!r.objectives}),t.jsx(m,{label:"Activities",onChange:e=>h("activities",e),helperText:r.activities||"required, max 1000 characters",textLimit:1e3,error:!!r.activities}),t.jsx(m,{label:"outcomes",onChange:e=>h("outcomes",e),helperText:r.outcomes||"max 1000 characters",textLimit:1e3,error:!!r.outcomes}),t.jsx(l,{value:i.url,onChange:e=>a("url",e.target.value),onBlur:k,label:"Website url",fullWidth:!0,error:!!r.url,helperText:r.url||" "}),t.jsx(l,{value:i.public_email,onChange:e=>a("public_email",e.target.value),label:"Published Email Address",fullWidth:!0,error:!!r.public_email,helperText:r.public_email||" "}),t.jsxs(j,{variant:"filled",fullWidth:!0,margin:"dense",children:[t.jsx(_,{shrink:!0,children:"Lead Image"}),t.jsx(w,{type:"file",inputProps:{multiple:!0},onChange:e=>a("image",e.target.files&&e.target.files.length?e.target.files[0]:null),sx:{pb:.5}}),t.jsx(f,{children:"optional"})]}),t.jsxs(j,{variant:"filled",fullWidth:!0,children:[t.jsx(_,{shrink:!0,children:"Additional files"}),t.jsx(w,{type:"file",inputProps:{multiple:!0},onChange:e=>a("files",e.target.files),sx:{pb:.5}}),t.jsx(f,{children:"optional, max 3"})]})]}),t.jsx("h2",{children:"Additional information"}),t.jsx("p",{children:"The fields below will not be published. Please do provide a contact in case we require clarifications or additional details."}),t.jsxs(c,{display:"flex",flexDirection:"column",maxWidth:800,alignItems:"flex-start",children:[t.jsx(l,{value:i.contact_name,onChange:e=>a("contact_name",e.target.value),label:"Contact Person",fullWidth:!0,error:!!r.contact_name,helperText:r.contact_name||"required",onBlur:()=>u("contact_name")}),t.jsx(l,{value:i.contact_email,onChange:e=>a("contact_email",e.target.value),label:"Contact Email",fullWidth:!0,error:!!r.contact_email,helperText:r.contact_email||"required",onBlur:()=>u("contact_email")}),t.jsx(l,{value:i.funding,onChange:e=>a("funding",e.target.value),label:"Funding",fullWidth:!0,error:!!r.funding,helperText:r.funding||"required",onBlur:()=>u("funding")}),t.jsxs(c,{display:"flex",gap:2,children:[t.jsx(l,{select:!0,hiddenLabel:!0,fullWidth:!0,value:i.budget_currency,onChange:e=>a("budget_currency",e.target.value),error:!!r.budget_currency,helperText:r.budget_currency||" ",sx:{width:60},children:["€","$"].map(e=>t.jsx(b,{value:e,children:e},e))}),t.jsx(l,{value:i.budget_amount||"",onChange:e=>a("budget_amount",parseInt(e.target.value)||0),label:"Budget",error:!!r.budget_amount,helperText:r.budget_amount||" "})]}),t.jsx(l,{value:i.remark_internal,onChange:e=>a("remark_internal",e.target.value),label:"Remarks",multiline:!0,rows:3,fullWidth:!0,error:!!r.remark_internal,helperText:r.remark_internal||" "}),t.jsx("p",{children:"Please review the information you entered, you can not change it after submitting. The project will be published after review by EiiE."}),t.jsx("button",{onClick:()=>P(),children:"Submit"})]})]})})};export{Ue as default};
