import{r as l,j as e,a as C,c as b}from"./client-ZKQMN23D.js";import{U as N,C as g,Z as v,G as y,a as P}from"./ua-parser-BZV2fO3c.js";import{l as f}from"./index.m-DI45-rQC.js";import{B as G}from"./Box-CGz8vZlR.js";import"./_commonjsHelpers-BosuxZz1.js";import"./index-D3ylJrlI.js";import"./identifier-COQS9w1e.js";import"./extendSxProp-BsQwgIIR.js";import"./useTheme-BwdP6VHP.js";import"./useThemeWithoutDefault-CDyP3F16.js";const k="/world-map.json",a=["url(#Gradient3)","url(#Gradient2)","url(#Gradient1)"],S=({mapData:n,translations:t,countryDetailsDom:c})=>{const[o,j]=l.useState(),[p,i]=l.useState(1),[x,h]=l.useState([0,0]),d=2,m=5,u=s=>s?s.id===(o==null?void 0:o.id)?"#29649e":o!=null&&o.partnerCountries.find(({id:r})=>s.id===r)?"#8cb6cf":s.currentProjects?s.currentProjects<=d?a[0]:s.currentProjects<=m?a[1]:a[2]:"#fcfcfc":"#fcfcfc",_=l.useMemo(()=>N().browser.name==="Safari",[]);return e.jsxs(e.Fragment,{children:[e.jsxs(G,{className:"dev_coop_map",children:[e.jsxs("div",{className:"dev_coop_map_legend",children:[e.jsx("legend",{children:t["Current Projects"]}),e.jsxs("span",{className:"dev_coop_map_legend_step1",children:[e.jsx("span",{style:{backgroundColor:a[0]}}),"1 - ",d]}),e.jsxs("span",{className:"dev_coop_map_legend_step2",children:[e.jsx("span",{style:{backgroundColor:a[1]}}),d," - ",m]}),e.jsxs("span",{className:"dev_coop_map_legend_step3",children:[e.jsx("span",{style:{backgroundColor:a[2]}}),m,"+"]}),!!o&&e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"dev_coop_map_legend_selected",children:[e.jsx("span",{style:{backgroundColor:"#29649e"}}),t["Selected country"]]}),e.jsxs("span",{className:"dev_coop_map_legend_partners",children:[e.jsx("span",{style:{backgroundColor:"#8cb6cf"}}),t["Partner countries"]]})]})]}),e.jsxs(g,{width:800,height:480,projectionConfig:{rotate:[-15,0,0]},children:[e.jsxs("defs",{children:[e.jsxs("linearGradient",{id:"Gradient1",x1:"2",x2:"0",y1:"0",y2:"1",children:[e.jsx("stop",{className:"stop1",offset:"20%",stopColor:"#dd4b31"}),e.jsx("stop",{className:"stop2",offset:"40%",stopColor:"#e25f36"}),e.jsx("stop",{className:"stop3",offset:"60%",stopColor:"#e6713c"}),e.jsx("stop",{className:"stop4",offset:"80%",stopColor:"#ea8245"}),e.jsx("stop",{className:"stop5",offset:"100%",stopColor:"#ee924f"})]}),e.jsxs("linearGradient",{id:"Gradient2",x1:"2",x2:"0",y1:"0",y2:"1",children:[e.jsx("stop",{className:"stop1",offset:"20%",stopColor:"#ee924f"}),e.jsx("stop",{className:"stop2",offset:"40%",stopColor:"#f1a154"}),e.jsx("stop",{className:"stop3",offset:"60%",stopColor:"#f3b05b"}),e.jsx("stop",{className:"stop4",offset:"80%",stopColor:"#f5bf64"}),e.jsx("stop",{className:"stop5",offset:"100%",stopColor:"#f6cd6f"})]}),e.jsxs("linearGradient",{id:"Gradient3",x1:"2",x2:"0",y1:"0",y2:"1",children:[e.jsx("stop",{className:"stop1",offset:"20%",stopColor:"#f6cd6f"}),e.jsx("stop",{className:"stop2",offset:"40%",stopColor:"#f7d675"}),e.jsx("stop",{className:"stop3",offset:"60%",stopColor:"#f8df7b"}),e.jsx("stop",{className:"stop4",offset:"80%",stopColor:"#f9e782"}),e.jsx("stop",{className:"stop5",offset:"100%",stopColor:"#f9f08a"})]})]}),e.jsx(v,{center:x,zoom:p,onMoveEnd:({coordinates:s,zoom:r})=>{h(s),i(r)},translateExtent:[[0,0],[800,480]],filterZoomEvent:s=>!(_&&s.type==="wheel"),children:e.jsx(y,{geography:k,children:({geographies:s})=>s.map(r=>e.jsx(P,{geography:r,fill:u(n[r.properties["iso-a3"]||r.id]),stroke:"#bbb",vectorEffect:"non-scaling-stroke",style:{default:{outline:"none"},pressed:{outline:"none"},hover:{outline:"none"}},onClick:()=>{j(n[r.properties["iso-a3"]||r.id])}},r.rsmKey))})})]}),e.jsxs("div",{className:"dev_coop_map_zoomcontrols",children:[e.jsx("button",{disabled:p>=8,onClick:()=>i(s=>Math.min(8,s+1)),children:"+"}),e.jsx("button",{disabled:p<=1,onClick:()=>i(s=>Math.max(1,s-1)),children:"-"})]})]}),C.createPortal(o?e.jsxs(e.Fragment,{children:[e.jsx("h3",{children:o.name}),e.jsxs("section",{className:"country_projects",children:[e.jsxs("div",{className:"country_projects_current",children:[e.jsxs("label",{children:[t["Current Projects"],":"]})," ",e.jsx("span",{children:o.currentProjects})," "]}),e.jsxs("div",{className:"country_projects_total",children:[e.jsxs("label",{children:[t["Total Projects"],":"]})," ",e.jsx("span",{children:o.totalProjects})," "]})]}),o.members.length>0&&e.jsxs("div",{className:"country_members",children:[e.jsxs("label",{children:[t["EI Members from this country involved in Cooperation Projects"],":"]})," ",o.members.map(({affiliate_item_id:s,name:r})=>e.jsx("a",{href:`${f("coop_projects.index")}?filter[partner]=${encodeURIComponent(r)}`,children:r},s))]}),o.partnerCountries.length>0&&e.jsxs("div",{className:"country_partners",children:[e.jsxs("label",{children:[t["Partner Countries"],":"]})," ",o.partnerCountries.map(({id:s,name:r})=>e.jsx("a",{href:`${f("coop_projects.index")}?filter[country]=${s}`,children:r},s))]}),e.jsxs("a",{className:"dev_coop_map_details_country_all_link",href:`${f("coop_projects.index")}?filter[country]=${o.id}`,children:[t["View all Cooperation Projects involving partners from"]," ",o.name]})]}):e.jsx("div",{dangerouslySetInnerHTML:{__html:t.map_intro_text}}),c)]})},M=(n,t,c)=>{b(n).render(e.jsx(S,{...c,countryDetailsDom:t}))};window.renderMap=M;export{S as Map,M as renderMap};
