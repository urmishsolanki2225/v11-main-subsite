import{j as m}from"./client-ZKQMN23D.js";import{d as r}from"./dayjs.min-BIwLhz4I.js";const l=(a,e)=>({field:a,headerName:e,flex:1,valueFormatter:o=>r(o.value).format("YYYY-MM-DD HH:mm")}),s={field:"lang",sortable:!1,renderCell:a=>m.jsx(m.Fragment,{children:a.row.contents.map(e=>e.lang).join(",")})};export{s as L,l as m};