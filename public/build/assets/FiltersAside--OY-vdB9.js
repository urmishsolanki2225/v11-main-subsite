import{r as a,j as r}from"./client-ZKQMN23D.js";import{CategoryFilter as n}from"./CategoryFilter-B13U2MDz.js";import{MultiFilter as o}from"./MultiFilter-CnwRYVvH.js";import{u as c}from"./useTranslation-CHfl--jq.js";import{u}from"./useHits-2WPfp_Fc.js";import{u as h}from"./useCurrentRefinements-Bh9CVntJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./identifier-DHETMsl0.js";import"./Typography-BOH_kjYl.js";import"./ButtonBase-B4crtf6-.js";import"./useSlotProps-O828vP2f.js";import"./index-BMQyuaGg.js";import"./extendSxProp-2i1zAAUV.js";import"./Grow--1bk2Oiz.js";import"./useTheme-CLvhDb73.js";import"./useThemeWithoutDefault-BU2aPzft.js";import"./FormControlLabel-Do0ozMLQ.js";import"./useFormControl-CO6OogGI.js";import"./Stack-DUl2B3cg.js";import"./useThemeProps-DZ1rqyJn.js";import"./getThemeProps-BL5VHue0.js";import"./Checkbox-jThM1nDo.js";import"./SwitchBase-3IV-eDJc.js";import"./Tooltip-CvPWsRqB.js";import"./Popper-1aVe17Xg.js";import"./useRefinementList-CivAU8mv.js";import"./escape-highlight--kF8Jl-E.js";import"./useConnector-ByizAAyX.js";import"./Autocomplete-Byzw-jYA.js";import"./Menu-BfV33fk6.js";import"./GlobalStyles-BW4QefxH.js";import"./List-BgSNNkKU.js";import"./Select-DstqRMzc.js";import"./FormLabel-BgEYUhxt.js";import"./Close-mNv2SlFn.js";import"./usePreviousProps-eB1Ppz6I.js";import"./TextField-CXY6ukfK.js";import"./toPropertyKey-PLuKRk1e.js";import"./find-DUpcU4oq.js";const $=()=>{const{t}=c(),[i,e]=a.useState(!1),m=()=>{e(l=>!l)},{hits:s}=u(),{items:p}=h();return r.jsxs("aside",{className:i?"active":!s.length&&!p.length?"inactive":void 0,children:[r.jsx("h3",{onClick:m,children:t`Filters`}),r.jsx(n,{categories:[]}),r.jsx(o,{attribute:"year",label:t`Year`,placeholder:t`Filter by year`,refinementListProps:{sortBy:["name:desc","count:desc"]}}),r.jsx(o,{attribute:"countries.title",label:t`Country`,placeholder:t`Type to filter by country`}),r.jsx(o,{attribute:"authors.title",label:t`Author`,placeholder:t`Type to filter by author`})]})};export{$ as FiltersAside};