"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[924],{6475:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>r,toc:()=>u});const r=JSON.parse('{"id":"getting-started","title":"Getting Started","description":"Installation","source":"@site/docs/getting-started.md","sourceDirName":".","slug":"/getting-started","permalink":"/tailwind-scrollbar/getting-started","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"docs","previous":{"title":"Migrating to v4","permalink":"/tailwind-scrollbar/migrating"},"next":{"title":"Examples","permalink":"/tailwind-scrollbar/examples"}}');var a=t(4848),l=t(8453),s=t(1470),i=t(9365);const o={sidebar_position:3},c="Getting Started",d={},u=[{value:"Installation",id:"installation",level:2},{value:"Configuration",id:"configuration",level:2},{value:"<code>nocompatible</code>",id:"nocompatible",level:3},{value:"<code>preferredStrategy</code>",id:"preferredstrategy",level:3},{value:"Usage",id:"usage",level:2}];function p(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"getting-started",children:"Getting Started"})}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsx)(n.li,{children:"Add the package to your project"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# npm\nnpm install --save-dev tailwind-scrollbar\n# yarn\nyarn add -D tailwind-scrollbar\n# pnpm\npnpm add -D tailwind-scrollbar\n"})}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsxs)(n.p,{children:["The lastest version of ",(0,a.jsx)(n.code,{children:"tailwind-scrollbar"})," (v4) is only compatible with ",(0,a.jsx)(n.code,{children:"tailwindcss"})," v4. If you're using ",(0,a.jsx)(n.code,{children:"tailwindcss"})," v3, you'll need to use ",(0,a.jsx)(n.code,{children:"tailwind-scrollbar"})," v3."]})}),"\n",(0,a.jsxs)(n.ol,{start:"2",children:["\n",(0,a.jsx)(n.li,{children:"Add it to the plugins array of your Tailwind config"}),"\n"]}),"\n",(0,a.jsxs)(s.A,{groupId:"config",children:[(0,a.jsx)(i.A,{value:"css",label:"New CSS Config",default:!0,children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-css",children:"@import 'tailwindcss';\n\n/* ... */\n\n@plugin 'tailwind-scrollbar';\n"})})}),(0,a.jsx)(i.A,{value:"js",label:"Legacy JavaScript Config",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-javascript",children:"module.exports = {\n    // ...\n    plugins: [\n        // ...\n        require('tailwind-scrollbar'),\n    ],\n};\n"})})})]}),"\n",(0,a.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,a.jsx)(n.h3,{id:"nocompatible",children:(0,a.jsx)(n.code,{children:"nocompatible"})}),"\n",(0,a.jsxs)(n.p,{children:["By default, only utilities that can have expressions across browsers are available. In order to access additional utilities that may not exist in all browsers, like ",(0,a.jsx)(n.a,{href:"/examples#rounded-bars",children:"rounding"})," and ",(0,a.jsx)(n.a,{href:"/examples#custom-sizes",children:"custom sizes"}),", you can add the ",(0,a.jsx)(n.code,{children:"nocompatible"})," flag to the configuration. You may need to also set the ",(0,a.jsx)(n.a,{href:"#preferredstrategy",children:"preferred strategy"})," to ",(0,a.jsx)(n.code,{children:"pseudoelements"})," for ",(0,a.jsx)(n.code,{children:"nocompatible"})," utilities to take effect in newer browsers."]}),"\n",(0,a.jsxs)(s.A,{groupId:"config",children:[(0,a.jsx)(i.A,{value:"css",label:"New CSS Config",default:!0,children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-css",children:"@import 'tailwindcss';\n\n/* ... */\n\n@plugin 'tailwind-scrollbar' {\n    nocompatible: true;\n}\n"})})}),(0,a.jsx)(i.A,{value:"js",label:"Legacy JavaScript Config",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-javascript",children:"module.exports = {\n    // ...\n    plugins: [\n        // ...\n        require('tailwind-scrollbar')({ nocompatible: true }),\n    ],\n};\n"})})})]}),"\n",(0,a.jsx)(n.h3,{id:"preferredstrategy",children:(0,a.jsx)(n.code,{children:"preferredStrategy"})}),"\n",(0,a.jsxs)(n.p,{children:["The default scrollbar strategy used by the plugin is to prefer the standards-track properties (",(0,a.jsx)(n.code,{children:"scrollbar-width"})," and ",(0,a.jsx)(n.code,{children:"scrollbar-color"}),") and fall back to pseudoelements only when standards-track properties are not supported. Although this strategy is encouraged, it does have drawbacks: available features are limited compared to the pseudoelement strategy, and some browser/OS combinations ignore scrollbar properties entirely. If you'd prefer to default to the pseudoelement strategy instead, pass ",(0,a.jsx)(n.code,{children:"preferredStrategy: 'pseudoelements'"})," to the plugin configuration. Note that since Firefox does not support pseudoelements at all, it will continue to use standards-track properties."]}),"\n",(0,a.jsxs)(s.A,{groupId:"config",children:[(0,a.jsx)(i.A,{value:"css",label:"New CSS Config",default:!0,children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-css",children:"@import 'tailwindcss';\n\n/* ... */\n\n@plugin 'tailwind-scrollbar' {\n    preferredStrategy: 'pseudoelements';\n}\n"})})}),(0,a.jsx)(i.A,{value:"js",label:"Legacy JavaScript Config",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-javascript",children:"module.exports = {\n    // ...\n    plugins: [\n        // ...\n        require('tailwind-scrollbar')({ preferredStrategy: 'pseudoelements' }),  // default: 'standard'\n    ],\n};\n"})})})]}),"\n",(0,a.jsxs)(n.admonition,{type:"tip",children:[(0,a.jsx)(n.p,{children:"If you're using multiple configuration options, make sure you get the syntax right. It should look like this:"}),(0,a.jsxs)(s.A,{groupId:"config",children:[(0,a.jsx)(i.A,{value:"css",label:"New CSS Config",default:!0,children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-css",children:"@import 'tailwindcss';\n\n/* ... */\n\n@plugin 'tailwind-scrollbar' {\n    nocompatible: true;\n    preferredStrategy: 'pseudoelements';\n}\n"})})}),(0,a.jsx)(i.A,{value:"js",label:"Legacy JavaScript Config",children:(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-javascript",children:"module.exports = {\n    // ...\n    plugins: [\n        // ...\n        require('tailwind-scrollbar')({\n            nocompatible: true,\n            preferredStrategy: 'pseudoelements',\n        }),\n    ],\n};\n"})})})]})]}),"\n",(0,a.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.a,{href:"/examples",children:"See the examples"})})]})}function h(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(p,{...e})}):p(e)}},9365:(e,n,t)=>{t.d(n,{A:()=>s});t(6540);var r=t(4164);const a={tabItem:"tabItem_Ymn6"};var l=t(4848);function s(e){let{children:n,hidden:t,className:s}=e;return(0,l.jsx)("div",{role:"tabpanel",className:(0,r.A)(a.tabItem,s),hidden:t,children:n})}},1470:(e,n,t)=>{t.d(n,{A:()=>w});var r=t(6540),a=t(4164),l=t(3104),s=t(6347),i=t(205),o=t(7485),c=t(1682),d=t(679);function u(e){return r.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,r.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:t}=e;return(0,r.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:t,attributes:r,default:a}}=e;return{value:n,label:t,attributes:r,default:a}}))}(t);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function h(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function g(e){let{queryString:n=!1,groupId:t}=e;const a=(0,s.W6)(),l=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,o.aZ)(l),(0,r.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(a.location.search);n.set(l,e),a.replace({...a.location,search:n.toString()})}),[l,a])]}function f(e){const{defaultValue:n,queryString:t=!1,groupId:a}=e,l=p(e),[s,o]=(0,r.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const r=t.find((e=>e.default))??t[0];if(!r)throw new Error("Unexpected error: 0 tabValues");return r.value}({defaultValue:n,tabValues:l}))),[c,u]=g({queryString:t,groupId:a}),[f,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,l]=(0,d.Dv)(t);return[a,(0,r.useCallback)((e=>{t&&l.set(e)}),[t,l])]}({groupId:a}),b=(()=>{const e=c??f;return h({value:e,tabValues:l})?e:null})();(0,i.A)((()=>{b&&o(b)}),[b]);return{selectedValue:s,selectValue:(0,r.useCallback)((e=>{if(!h({value:e,tabValues:l}))throw new Error(`Can't select invalid tab value=${e}`);o(e),u(e),m(e)}),[u,m,l]),tabValues:l}}var m=t(2303);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var x=t(4848);function j(e){let{className:n,block:t,selectedValue:r,selectValue:s,tabValues:i}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,l.a_)(),d=e=>{const n=e.currentTarget,t=o.indexOf(n),a=i[t].value;a!==r&&(c(n),s(a))},u=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=o.indexOf(e.currentTarget)+1;n=o[t]??o[0];break}case"ArrowLeft":{const t=o.indexOf(e.currentTarget)-1;n=o[t]??o[o.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":t},n),children:i.map((e=>{let{value:n,label:t,attributes:l}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:r===n?0:-1,"aria-selected":r===n,ref:e=>o.push(e),onKeyDown:u,onClick:d,...l,className:(0,a.A)("tabs__item",b.tabItem,l?.className,{"tabs__item--active":r===n}),children:t??n},n)}))})}function v(e){let{lazy:n,children:t,selectedValue:l}=e;const s=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===l));return e?(0,r.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,r.cloneElement)(e,{key:n,hidden:e.props.value!==l})))})}function y(e){const n=f(e);return(0,x.jsxs)("div",{className:(0,a.A)("tabs-container",b.tabList),children:[(0,x.jsx)(j,{...n,...e}),(0,x.jsx)(v,{...n,...e})]})}function w(e){const n=(0,m.A)();return(0,x.jsx)(y,{...e,children:u(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>i});var r=t(6540);const a={},l=r.createContext(a);function s(e){const n=r.useContext(l);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:s(e.components),r.createElement(l.Provider,{value:n},e.children)}}}]);