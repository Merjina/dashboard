import{q as j,r as u,j as t}from"./app-fbbc2228.js";import l from"./BillOptions-77180b40.js";import{F as y}from"./FromDate-a5cb30b4.js";import{N as s}from"./Num-5bc06adf.js";import{I as N}from"./ID-256fb40d.js";import{r as f}from"./index-ee38eedf.js";import"./Dropdown-44bd8aeb.js";import"./BetterLink-4f015a3a.js";import"./transition-f695fed5.js";import"./index.esm-234a94ef.js";import"./iconBase-588e059c.js";import"./index.esm-046b3e83.js";import"./AlertModal-ba12de13.js";import"./TemplateModal-01cb1425.js";import"./SecondaryMaterialBtn-6e2e4dd1.js";import"./PrimaryMaterialBtn-1012f687.js";import"./index-dd334722.js";import"./index-387d7a00.js";function S({bill:e}){var m;const o=j().props.auth,d=o.business.taxPercent,p=o.user.id,c=u.useMemo(()=>e.transactions.reduce((n,a)=>n+(a.product.price??0)*a.quantity,0),[e.transactions]),i=c*(1+d),[x,h]=u.useState(!1);return t.jsxs("tr",{className:"even:bg-blue-gray-50/50",children:[t.jsx(r,{children:t.jsx(f.Tooltip,{content:x?"Copied":"Copy",children:t.jsx("button",{className:"dev-style",onClick:()=>{navigator.clipboard.writeText(e.id).then(()=>h(!0))},children:t.jsx(N,{id:e.id})})})}),t.jsx(r,{children:e.createdBy_id===p?t.jsx("span",{className:"select-none text-gray-600",children:"You"}):((m=e.created_by)==null?void 0:m.name)??"N/A"}),t.jsx(r,{children:t.jsx(y,{date:e.created_at})}),t.jsx(r,{children:t.jsx(s,{className:"text-secondary-700",showCurrency:!0,amount:c})}),t.jsx(r,{children:t.jsx(s,{className:"text-primary-700",showCurrency:!0,amount:i})}),t.jsx(r,{children:t.jsx(s,{className:e.cashReceived===null?"text-primary-700":"",showCurrency:!0,amount:e.cashReceived,noAmount:"Digital Payment"})}),t.jsx(r,{children:t.jsx(s,{className:"text-indigo-700",showCurrency:!0,amount:e.cashReceived?e.cashReceived-i:null,noAmount:""})}),t.jsx(r,{children:t.jsx(s,{amount:e.transactions.reduce((n,a)=>n+a.quantity,0)})}),t.jsx("td",{children:t.jsx(l,{bill:e,user:o.user})})]})}function r({children:e,className:o=""}){return t.jsx("td",{className:"p-3",children:t.jsx("p",{className:"text-sm font-normal text-blue-gray-800",children:e})})}export{S as default};
