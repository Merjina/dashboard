import{r as n,j as t}from"./app-fbbc2228.js";import{a as d}from"./index.esm-046b3e83.js";import"./iconBase-588e059c.js";function h({form:e}){var l;const a=n.useRef(null),[c,g]=n.useState((l=e.data.logo)!=null&&l.startsWith("http")?e.data.logo:e.data.logo?"/businesses-logo/"+e.data.logo:"/assets/logo/laptop-pos-logo.svg");return t.jsxs("div",{children:[t.jsxs("button",{type:"button",onClick:()=>{var s,o;return(o=(s=a.current)==null?void 0:s.click)==null?void 0:o.call(s)},className:"div-style group relative "+(e.processing&&"opacity-25"),disabled:e.processing,children:[t.jsx("p",{className:"absolute -top-2 left-3 bg-white px-1 text-xs text-blue-gray-400",children:"Logo"}),t.jsx("div",{className:`pointer-events-none absolute bottom-0 left-0 right-0  top-0 rounded-md
        bg-[radial-gradient(#000,#00000030,#00000010,transparent)] opacity-0 transition duration-200 group-hover:opacity-100`,children:t.jsxs("p",{className:"flex h-full w-full items-center justify-center gap-2 text-center text-lg text-gray-100",children:[t.jsx(d,{}),"Edit Business Logo"]})}),t.jsxs("div",{className:"rounded-md border border-blue-gray-200 shadow-sm ",children:[t.jsx("input",{ref:a,type:"file",hidden:!0,accept:"image/*",onChange:s=>{var r,i;let o=(i=(r=s==null?void 0:s.target)==null?void 0:r.files)==null?void 0:i[0];o&&(e.setData("logoFile",o),g(URL.createObjectURL(o)))}}),t.jsx("img",{className:"mx-auto h-40",src:c,alt:"Business logo"})]})]}),(e.errors.logo||e.errors.logoFile)&&t.jsx("p",{className:"ml-2 mt-2 text-xs text-danger-600 ",children:e.errors.logo||e.errors.logoFile})]})}export{h as default};