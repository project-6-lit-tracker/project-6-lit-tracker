(this["webpackJsonpproject-6-lit-tracker"]=this["webpackJsonpproject-6-lit-tracker"]||[]).push([[0],{109:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),o=a(50),l=a.n(o),s=(a(56),a(22)),c=a(6),i=a(7),m=a(9),u=a(8),h=a(10),p=a(31),d=a.n(p);d.a.initializeApp({apiKey:"AIzaSyD_3aQWQ3rO4YJO5R7EHj1v8Q6gfjAJaWk",authDomain:"project-6-lit-tracker.firebaseapp.com",databaseURL:"https://project-6-lit-tracker.firebaseio.com",projectId:"project-6-lit-tracker",storageBucket:"project-6-lit-tracker.appspot.com",messagingSenderId:"739658073151",appId:"1:739658073151:web:e487069fdf5b98da14648a"});var f=d.a,b=(a(72),a(20)),k=a.n(b),g=a(21),y=a.n(g),x=function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).call(this))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("header",null,r.a.createElement("h1",null,"Lit Tracker"))}}]),t}(n.Component),j=a(42),O=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(m.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.setState({searchInput:e.target.value}),console.log(e.target.value)},a.handleFormSubmit=function(e){e.preventDefault(),k()({url:"https://proxy.hackeryou.com",responseType:"",paramsSerializer:function(e){return y.a.stringify(e,{arrayFormat:"brackets"})},params:{reqUrl:"https://www.goodreads.com/search/index.xml",params:{key:"14csXzY0xdicnCrXfQSO1w",method:"search_index",q:a.state.searchInput},proxyHeaders:{"Access-Control-Allow-Origin":"https://proxy.hackeryou.com"}},xmlToJSON:!1}).then((function(e){var t=[],n=j.xml2js(e.data,{compact:!1,spaces:2}).elements[0].elements[1].elements[6].elements,r=Object(s.a)(n);console.log(r),r.map((function(e){return t.push({title:e.elements[8].elements[1].elements[0].text,author:void 0===e.elements[8].elements[2].elements[1].elements[0].text?"":e.elements[8].elements[2].elements[1].elements[0].text,key:e.elements[8].elements[0].elements[0].text,rating:e.elements[7].elements[0].text,imageUrl:void 0===e.elements[8].elements[3].elements[0].text?"/src/assets/noCover.jpg":e.elements[8].elements[3].elements[0].text})})),a.setState({books:t}),console.log(t)})),a.setState({searchInput:" "})},a.state={userBooks:[],searchInput:""},a}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"wrapper"},r.a.createElement("form",{action:"submit",onSubmit:this.handleFormSubmit},r.a.createElement("label",{className:"sr-only",htmlFor:"search"}),r.a.createElement("input",{type:"search",placeholder:"Search by title or author",id:"search",name:"search","aria-label":"Search through site content",title:"Search by title or author",required:!0,onChange:this.handleChange,value:this.searchInput}),r.a.createElement("button",{type:"submit"},"Search")))}}]),t}(n.Component),w=function(e){function t(){return Object(c.a)(this,t),Object(m.a)(this,Object(u.a)(t).call(this))}return Object(h.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return r.a.createElement("main",null,r.a.createElement(O,null))}}]),t}(n.Component),v=function(){return r.a.createElement("footer",null,r.a.createElement("p",{className:"footer-text"},"2020 Juno College",r.a.createElement("a",{href:"http://www.afuadeborahcodes.com/",className:"footer-link",target:"_blank",rel:"noopener noreferrer",tabIndex:"0","aria-hidden":"true",title:"afuadeborahcodes.com",alt:"Go to Afua's page."},"Afua Frimpong "),r.a.createElement("a",{href:"http://claudiaahn.com/",className:"footer-link",target:"_blank",rel:"noopener noreferrer",tabIndex:"0","aria-hidden":"true",title:"claudiaahn.com",alt:"Go to Claudia's page"},"Claudia Ahn "),r.a.createElement("a",{href:"http://fabiodwyer.com/",className:"footer-link",target:"_blank",rel:"noopener noreferrer",tabIndex:"0","aria-hidden":"true",title:"fabiodwyer.com",alt:"Go to Fabio's page"},"Fabio Dwyer "),r.a.createElement("a",{href:"https://www.linkedin.com/in/jacqueline-nosal/",className:"footer-link",target:"_blank",rel:"noopener noreferrer",tabIndex:"0","aria-hidden":"true",title:"Jacqui Nosal on Linked",alt:"Go to Jacqui's page"},"Jacqui Nosal ")))},E=a(42),S=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(m.a)(this,Object(u.a)(t).call(this))).state={books:[],userLibrary:[],booksToRead:[]},e}return Object(h.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;f.database().ref().on("value",(function(e){console.log(e.val())})),k()({url:"https://proxy.hackeryou.com",responseType:"",paramsSerializer:function(e){return y.a.stringify(e,{arrayFormat:"brackets"})},params:{reqUrl:"https://www.goodreads.com/search/index.xml",params:{key:"14csXzY0xdicnCrXfQSO1w",method:"search_index",q:"Lord of the Rings"},proxyHeaders:{"Access-Control-Allow-Origin":"https://proxy.hackeryou.com"}},xmlToJSON:!1}).then((function(t){var a=[],n=E.xml2js(t.data,{compact:!1,spaces:2}).elements[0].elements[1].elements[6].elements;Object(s.a)(n).map((function(e){return a.push({title:e.elements[8].elements[1].elements[0].text,author:e.elements[8].elements[2].elements[1].elements[0].text,key:e.elements[8].elements[0].elements[0].text,rating:e.elements[7].elements[0].text,imageUrl:e.elements[8].elements[3].elements[0].text})})),console.log(a),e.setState({books:a})}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"App"},r.a.createElement(x,null),r.a.createElement(w,null),r.a.createElement(v,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},51:function(e,t,a){e.exports=a(109)},56:function(e,t,a){},72:function(e,t,a){},95:function(e,t){},97:function(e,t){}},[[51,1,2]]]);
//# sourceMappingURL=main.7ff45707.chunk.js.map