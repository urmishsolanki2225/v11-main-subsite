import{r as a,j as r}from"./client-ZKQMN23D.js";import{CategoryFilter as n}from"./CategoryFilter-DauI9uWB.js";import{MultiFilter as o}from"./MultiFilter-oOjCWkEJ.js";import{u as c}from"./useTranslation-CHfl--jq.js";import{u}from"./useHits-2WPfp_Fc.js";import{u as h}from"./useCurrentRefinements-Bh9CVntJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./identifier-COQS9w1e.js";import"./Typography-DYGSvwsR.js";import"./ButtonBase-D7fXzbc-.js";import"./useSlotProps-5g1mADCy.js";import"./index-D4Gjge3h.js";import"./extendSxProp-BsQwgIIR.js";import"./Grow-sQgJtlQN.js";import"./useTheme-BwdP6VHP.js";import"./useThemeWithoutDefault-CDyP3F16.js";import"./FormControlLabel-Dfpu1yJj.js";import"./useFormControl-CO6OogGI.js";import"./Stack-D_Bp_Uwa.js";import"./useThemeProps-BhHsu7W2.js";import"./getThemeProps-wzNSIbEv.js";import"./Checkbox-D9kKuNSR.js";import"./SwitchBase-XH_hwTUJ.js";import"./Tooltip-BU7xgxFh.js";import"./Popper-C2x4ipkJ.js";import"./useRefinementList-CivAU8mv.js";import"./escape-highlight--kF8Jl-E.js";import"./useConnector-ByizAAyX.js";import"./Autocomplete-DXgXs46U.js";import"./Menu-BdDXEdD9.js";import"./GlobalStyles-BztJkOC0.js";import"./List-g_COJ0Le.js";import"./Select-BviP6ddm.js";import"./FormLabel-BwLMeq7e.js";import"./Close-Cx_ZrGyk.js";import"./usePreviousProps-eB1Ppz6I.js";import"./TextField-sycmgB1j.js";import"./toPropertyKey-PLuKRk1e.js";import"./find-DUpcU4oq.js";const $=()=>{const{t}=c(),[i,e]=a.useState(!1),m=()=>{e(l=>!l)},{hits:s}=u(),{items:p}=h();return r.jsxs("aside",{className:i?"active":!s.length&&!p.length?"inactive":void 0,children:[r.jsx("h3",{onClick:m,children:t`Filters`}),r.jsx(n,{categories:[]}),r.jsx(o,{attribute:"year",label:t`Year`,placeholder:t`Filter by year`,refinementListProps:{sortBy:["name:desc","count:desc"]}}),r.jsx(o,{attribute:"countries.title",label:t`Country`,placeholder:t`Type to filter by country`}),r.jsx(o,{attribute:"authors.title",label:t`Author`,placeholder:t`Type to filter by author`})]})};export{$ as FiltersAside};
