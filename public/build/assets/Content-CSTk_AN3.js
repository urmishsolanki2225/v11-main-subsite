const v=({contents:l,content:i},a="en")=>{var r,g,u;return(i==null?void 0:i.lang)===a?i.title:((r=l==null?void 0:l.find(d=>d.lang===a))==null?void 0:r.title)||((g=l==null?void 0:l.find(d=>d.lang==="*"))==null?void 0:g.title)||((i==null?void 0:i.lang)==="*"||i!=null&&i.title?i.title:l!=null&&l.length?(u=l.at(0))==null?void 0:u.title:void 0)},T=({contents:l,content:i},a="en")=>((i==null?void 0:i.lang)===a?i:l==null?void 0:l.find(f=>f.lang===a))||(a!=="*"?T({contents:l,content:i},"*"):void 0);export{T as a,v as f};
