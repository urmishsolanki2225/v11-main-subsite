import{r as a,j as r}from"./client-ZKQMN23D.js";import{CategoryFilter as n}from"./CategoryFilter-BFOvF2ba.js";import{MultiFilter as o}from"./MultiFilter-a00CRz9T.js";import{u as c}from"./useTranslation-CHfl--jq.js";import{u}from"./useHits-2WPfp_Fc.js";import{u as h}from"./useCurrentRefinements-Bh9CVntJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./identifier-CVVhstXo.js";import"./Typography-BWGjmqeb.js";import"./ButtonBase-D5ln7if4.js";import"./useSlotProps-DL7U-EaF.js";import"./extendSxProp-5tSxLnIE.js";import"./Grow-1FiP9biG.js";import"./FormControlLabel-Byp9hQbH.js";import"./useFormControl-CO6OogGI.js";import"./Stack-B2ZIJkbS.js";import"./Checkbox-CIFK-wKz.js";import"./SwitchBase-CcKqqM_7.js";import"./Tooltip-B-18blil.js";import"./index-AoxikDaj.js";import"./Popper-BKUAU8_E.js";import"./useRefinementList-CivAU8mv.js";import"./escape-highlight--kF8Jl-E.js";import"./useConnector-ByizAAyX.js";import"./Autocomplete-CEusBT7t.js";import"./Menu-BCMxz3f0.js";import"./GlobalStyles-D_Xt43Ne.js";import"./List-Dh7P2IJ_.js";import"./Select-lP02voS4.js";import"./FormLabel-BEbkwqxG.js";import"./Close-DeKdm8LF.js";import"./index-BXImJBSP.js";import"./usePreviousProps-eB1Ppz6I.js";import"./TextField-CljZtUFq.js";import"./toPropertyKey-PLuKRk1e.js";import"./find-DUpcU4oq.js";const X=()=>{const{t}=c(),[i,e]=a.useState(!1),s=()=>{e(l=>!l)},{hits:m}=u(),{items:p}=h();return r.jsxs("aside",{className:i?"active":!m.length&&!p.length?"inactive":void 0,children:[r.jsx("h3",{onClick:s,children:t`Filters`}),r.jsx(n,{categories:[]}),r.jsx(o,{attribute:"year",label:t`Year`,placeholder:t`Filter by year`,refinementListProps:{sortBy:["name:desc","count:desc"]}}),r.jsx(o,{attribute:"countries.title",label:t`Country`,placeholder:t`Type to filter by country`}),r.jsx(o,{attribute:"authors.title",label:t`Author`,placeholder:t`Type to filter by author`})]})};export{X as FiltersAside};