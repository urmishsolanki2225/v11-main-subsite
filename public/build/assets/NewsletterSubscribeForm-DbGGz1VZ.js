import{c as O,j as e,r as o}from"./client-ZKQMN23D.js";import{a as F}from"./mui-tel-input.es-Cms4_H4i.js";import{l as g}from"./index.m-DI45-rQC.js";import{g as b}from"./Autocomplete.renderers-DjUlWLdx.js";import{A as j}from"./AutocompleteSingle-0vSJMg5_.js";import{Themed as L}from"./Themed-BLSBJrUL.js";import{T as p}from"./TextField-CXY6ukfK.js";import{B as E}from"./Button-Bs2LlykX.js";import"./_commonjsHelpers-BosuxZz1.js";import"./useSlotProps-O828vP2f.js";import"./index-BMQyuaGg.js";import"./identifier-DHETMsl0.js";import"./extendSxProp-2i1zAAUV.js";import"./Typography-BOH_kjYl.js";import"./ButtonBase-B4crtf6-.js";import"./Grow--1bk2Oiz.js";import"./useTheme-CLvhDb73.js";import"./useThemeWithoutDefault-BU2aPzft.js";import"./ListItemIcon-CVfiqn-C.js";import"./ListItemText-7JFmWKqR.js";import"./List-BgSNNkKU.js";import"./InputAdornment-C1l6JSIr.js";import"./useFormControl-CO6OogGI.js";import"./MenuItem-BvZfPpYr.js";import"./Menu-BfV33fk6.js";import"./GlobalStyles-BW4QefxH.js";import"./Content-CSTk_AN3.js";import"./Sorter-D4ZFKmCa.js";import"./DragIndicator-CZ3Fox_H.js";import"./lodash-BYTxXjAY.js";import"./Confirm-DlxQ7D7t.js";import"./Stack-DUl2B3cg.js";import"./useThemeProps-DZ1rqyJn.js";import"./getThemeProps-BL5VHue0.js";import"./Box-CVOB97vC.js";import"./index-Cvft0mqj.js";import"./browser-D9eauH0H.js";import"./index-edoyAQHv.js";import"./dayjs.min-BIwLhz4I.js";import"./useDataSource-CV27kxAN.js";import"./axios-DPCeRp2O.js";import"./global-Cavf3q2D.js";import"./index-BDIa4gQt.js";import"./_baseIsEqual-DkReohVf.js";import"./Autocomplete-Byzw-jYA.js";import"./Select-DstqRMzc.js";import"./FormLabel-BgEYUhxt.js";import"./Close-mNv2SlFn.js";import"./Popper-1aVe17Xg.js";import"./usePreviousProps-eB1Ppz6I.js";import"./ThemeProvider-BQTsL86O.js";const P=({newsletters:n,translations:t,lang:m})=>{var x;const[i,f]=o.useState(null),[a,v]=o.useState(null),[l,y]=o.useState(""),[u,S]=o.useState(""),[c,_]=o.useState(""),[d,C]=o.useState(""),[s,T]=o.useState(""),[h,N]=o.useState(!1);return e.jsxs(L,{children:[e.jsx("input",{type:"hidden",name:"lang",value:m.ei_code}),e.jsx("h3",{children:t["Select your subscriptions"]}),n.map(r=>e.jsxs("label",{children:[e.jsx("h4",{children:t[`${r}_header`]}),e.jsx("img",{src:`/images/newsletters/${r}_${m.code}.png`}),e.jsx("p",{children:t[`${r}_intro`]}),e.jsx("input",{type:"checkbox",name:r,value:"on"}),e.jsx("span",{children:t["Stay up-to-date"]})]},r)),e.jsx("h3",{children:t["Your information"]}),e.jsx(p,{name:"emailaddress",value:u,type:"email",required:!0,onChange:r=>S(r.currentTarget.value),label:t.Email}),e.jsx(p,{name:"firstname",label:t["First name"],value:c,onChange:r=>_(r.currentTarget.value),required:!0}),e.jsx(p,{name:"lastname",label:t["Last name"],value:d,onChange:r=>C(r.currentTarget.value),required:!0}),e.jsx(F,{label:t["Phone number"],value:l,onChange:y,langOfCountryName:m.code}),e.jsx(j,{label:t.Country,value:i,onChange:r=>f(r),dataSource:{xhrUrl:g("api.countries.search"),dataNotWrapped:!0},autocompleteProps:{fullWidth:!0},getOptionLabel:b}),e.jsx(j,{value:a,onChange:v,label:t.Union,dataSource:{xhrUrl:g("api.affiliates.search"),dataNotWrapped:!0,filter:{filter:{country_id:i==null?void 0:i.id}}},getOptionLabel:b,autocompleteProps:{fullWidth:!0,disabled:!i||!!s}}),e.jsx(p,{label:t.Organisation,value:s,disabled:!i||!!a,onChange:r=>T(r.currentTarget.value)}),e.jsx("input",{type:"hidden",name:"organisation",value:((x=a==null?void 0:a.content)==null?void 0:x.title)||s||""}),e.jsx("input",{type:"hidden",name:"phone",value:l.replace(/\D/g,"")}),e.jsxs("label",{className:"newsletter_agree",children:[e.jsx("input",{type:"checkbox",checked:h,onChange:r=>N(r.currentTarget.checked)}),e.jsx("span",{children:t.Policy})]}),e.jsx("p",{dangerouslySetInnerHTML:{__html:t.data_protection_policy_available_here}}),e.jsx(E,{variant:"contained",type:"submit",disabled:!u||!c||!d||!h,children:t.Subscribe})]})},k=n=>{const t=document.getElementById("form_root");O(t).render(e.jsx(P,{...n}))};window.setupForm=k;
