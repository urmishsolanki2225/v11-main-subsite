import{r as n,j as e}from"./client-ZKQMN23D.js";import{A as h,C as j}from"./Autocomplete-CEusBT7t.js";import{T as v}from"./TextField-CljZtUFq.js";import{u as I}from"./useRefinementList-CivAU8mv.js";import{u as b}from"./useCurrentRefinements-Bh9CVntJ.js";import"./_commonjsHelpers-BosuxZz1.js";import"./identifier-CVVhstXo.js";import"./extendSxProp-5tSxLnIE.js";import"./Menu-BCMxz3f0.js";import"./useSlotProps-DL7U-EaF.js";import"./useFormControl-CO6OogGI.js";import"./ButtonBase-D5ln7if4.js";import"./Grow-1FiP9biG.js";import"./GlobalStyles-D_Xt43Ne.js";import"./index-AoxikDaj.js";import"./List-Dh7P2IJ_.js";import"./Select-lP02voS4.js";import"./FormLabel-BEbkwqxG.js";import"./Close-DeKdm8LF.js";import"./index-BXImJBSP.js";import"./Popper-BKUAU8_E.js";import"./usePreviousProps-eB1Ppz6I.js";import"./escape-highlight--kF8Jl-E.js";import"./useConnector-ByizAAyX.js";import"./find-DUpcU4oq.js";const Q=({attribute:s,label:l,placeholder:a,refinementListProps:u})=>{const{items:c,refine:d,searchForItems:m}=I({attribute:s,sortBy:["count:desc","name:asc"],limit:25,...u}),{items:f}=b({includedAttributes:[s]}),[i,p]=n.useState("");n.useEffect(()=>{m(i)},[i,m]);const x=t=>{t&&(p(""),d(t.value))};return e.jsxs(e.Fragment,{children:[e.jsx(h,{options:c,value:null,onChange:(t,r)=>x(r),inputValue:i,onInputChange:(t,r)=>p(r),renderInput:t=>e.jsx(v,{variant:"filled",...t,label:l,placeholder:a,InputLabelProps:{shrink:!0}}),getOptionDisabled:({isRefined:t})=>t,renderOption:(t,r)=>e.jsxs("li",{...t,children:[r.label," (",r.count,")"]}),filterOptions:t=>t}),e.jsx("div",{children:f.map(({refinements:t,refine:r})=>e.jsx(e.Fragment,{children:t.map(o=>e.jsx(j,{label:o.label,onDelete:()=>r(o)},o.value))}))})]})};export{Q as MultiFilter};
