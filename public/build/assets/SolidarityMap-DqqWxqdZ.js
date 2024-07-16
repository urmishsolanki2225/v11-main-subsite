import{r as s,j as e,c as C}from"./client-ZKQMN23D.js";import{a as w}from"./axios-DPCeRp2O.js";import{d as p}from"./dayjs.min-BIwLhz4I.js";import{u as N}from"./utc-BUuWioZ3.js";import{Themed as M}from"./Themed-BLSBJrUL.js";import{Map as F}from"./Map-DvOZUeFH.js";import{SidebarItems as D}from"./SidebarItems-DJQK6-cV.js";import{YearRangeSlider as Y}from"./YearRangeSlider-Bo3Hjq7w.js";import"./_commonjsHelpers-BosuxZz1.js";import"./global-Cavf3q2D.js";import"./index-BDIa4gQt.js";import"./identifier-DHETMsl0.js";import"./ThemeProvider-BQTsL86O.js";import"./useThemeWithoutDefault-BU2aPzft.js";import"./index-BMQyuaGg.js";import"./Grow--1bk2Oiz.js";import"./useSlotProps-O828vP2f.js";import"./extendSxProp-2i1zAAUV.js";import"./useTheme-CLvhDb73.js";import"./ua-parser-BZV2fO3c.js";import"./index-D3ylJrlI.js";import"./useMediaQuery--fqye5PE.js";import"./getThemeProps-BL5VHue0.js";import"./Tooltip-CvPWsRqB.js";import"./Popper-1aVe17Xg.js";import"./Slider-BHq7ER0E.js";p.extend(N);const $=({collection_id:d,lang:a,translations:t})=>{const[u,j]=s.useState({}),[h,c]=s.useState(),[m,y]=s.useState(2019),[n,b]=s.useState(new Date().getFullYear()),[f,_]=s.useState(!1),l=s.useMemo(()=>({collection:d,published_after:m?p().set("year",m).startOf("year").utc().format():void 0,published_before:n?p().set("year",n).endOf("year").utc().format():void 0}),[d,m,n]);s.useEffect(()=>{const r=new AbortController;if(l.collection)return w.get("/api/map/items_count",{params:{filter:l,lang:a},signal:r.signal}).then(o=>{if(o.data){const x={};Object.entries(o.data).forEach(([g,i])=>x[g]={...i,className:`activity_${i.items_count?i.items_count<=1?"low":i.items_count<=3?"medium":"high":"none"}`,annotationLabel:i.items_count?`${i.items_count} ${i.items_count===1?t.article:t.articles}`:""}),j(x)}}).catch(o=>{console.warn("load mapdata",o)}),()=>r.abort()},[l,a,t]);const v=s.useCallback(r=>{r||c(void 0),_(!!r)},[]),S=s.useCallback(r=>{r!=null&&r.items_count?c(r):c(void 0)},[]);return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"map_container",children:[e.jsx(F,{mapData:u,onSelectCountry:S}),e.jsxs("div",{className:"map_year_range",children:[e.jsx("h3",{children:t.solidarity_across_borders_time_range}),e.jsx(Y,{min:2019,onChange:(r,o)=>{y(r),b(o||new Date().getFullYear())}}),e.jsxs("span",{children:[m," - ",n]})]}),e.jsx("button",{className:"map_sidebar_opener",onClick:()=>{_(!0),c(void 0)},children:"?"}),e.jsxs("div",{className:`map_sidebar ${f?"active":""}`,children:[e.jsx("button",{className:`map_sidebar_closer ${h?"close_country":"close_intro"}`,onClick:()=>{_(!1),c(void 0)},children:"⨯"}),e.jsx(D,{initialContent:e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:t.solidarity_across_borders_title}),e.jsx("p",{children:t.solidarity_across_borders_intro_text}),e.jsx("h4",{children:t.solidarity_across_borders_activity_title}),e.jsxs("dl",{className:"map_legend",children:[e.jsx("dt",{children:e.jsx("span",{className:"activity_high"})}),e.jsx("dd",{children:t.solidarity_across_borders_activity_high}),e.jsx("dt",{children:e.jsx("span",{className:"activity_medium"})}),e.jsx("dd",{children:t.solidarity_across_borders_activity_medium}),e.jsx("dt",{children:e.jsx("span",{className:"activity_low"})}),e.jsx("dd",{children:t.solidarity_across_borders_activity_low}),e.jsx("dt",{children:e.jsx("span",{className:"activity_none"})}),e.jsx("dd",{children:t.solidarity_across_borders_activity_none})]})]}),selectedCountry:h,filter:l,onChangeItemCount:v,lang:a})]})]})})},k=(d,a)=>{C(d).render(e.jsx(M,{children:e.jsx($,{...a})}))};window.renderSolidarityMap=k;export{$ as SolidarityMap,k as renderSolidarityMap};