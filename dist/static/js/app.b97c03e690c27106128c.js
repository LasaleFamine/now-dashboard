webpackJsonp([1,0],[function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}var s=n(21),i=r(s),a=n(11),o=r(a);new i.default({el:"#app",render:function(e){return e(o.default)}})},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=n(14),i=r(s),a=n(12),o=r(a),c=n(13),u=r(c),l=n(15),d=r(l);t.default={name:"app",data:function(){return{API_ENDPOINT:"http://localhost:5000/api/v1/deployments",token:"",deployments:[],showSpinner:!1,showAlert:!1,typeAlert:"",msgAlert:""}},methods:{fetchDeployments:function(e){var t=this;this.showSpinner=!0,fetch(this.API_ENDPOINT+"?token="+e,{headers:{"Content-Type":"application/json"}}).then(function(e){return e.json()}).then(function(e){if(e.error)throw e;t.setDeployments(e.deployments),t.showSpinner=!1}).catch(function(e){t.setAlert(!0,"error",e.error||e.message),t.showSpinner=!1})},setDeployments:function(e){var t=this,n=e.map(function(e){var n=e;return n.created=t.parseDate(n.created),n.url="https://".concat(n.url),n});this.deployments=n},_onSendToken:function(e){return 13!==e.keyCode||(this.setAlert(!1),this.fetchDeployments(this.token),!0)},parseDate:function(e){var t=["January","February","March","April","May","June","July","August","September","October","November","December"],n=new Date(parseInt(e,10)),r=t[n.getMonth()]+"/"+n.getDate()+"/"+n.getFullYear()+" "+n.getHours()+":"+n.getMinutes();return r},setAlert:function(e,t,n){this.showAlert=e,this.typeAlert=t||null,this.msgAlert=n||null}},components:{NavBar:i.default,Alert:o.default,Grid:u.default,Spinner:d.default}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"alert",props:["msg","type","visible"],data:function(){return{}},computed:{alertClass:function(){var e="alert alert-error";return"success"===this.type?e="alert alert-success":"info"===this.type&&(e="alert alert-info"),e},alertWrapperClass:function(){var e=this.visible?"":"hide";return e}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"grid",props:["items"],data:function(){return{currentSelectedUid:""}},methods:{computeUrlText:function(e){return e.replace("https://","").replace(".now.sh","")},showConfirmButton:function(e){document.querySelector("#"+e+" .delete-icon").classList.add("hide"),document.querySelector("#"+e+" .confirm-button").classList.remove("hide")},hideEveryConfirmButton:function(){return""!==this.currentSelectedUid&&(document.querySelector("#"+this.currentSelectedUid+" .confirm-button").classList.add("hide"),document.querySelector("#"+this.currentSelectedUid+" .delete-icon").classList.remove("hide"),!0)},_onClickDelete:function(e){this.hideEveryConfirmButton();var t=e.currentTarget.dataset.id;this.currentSelectedUid=t,this.showConfirmButton(t)},_onClickConfirmDelete:function(){}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"nav-bar",data:function(){return{msg:"Welcome to your Now dashboard"}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"spinner",props:["visible"],data:function(){return{}},computed:{spinnerWrapperClass:function(){var e=this.visible?"":"hide";return e}}}},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,n){var r,s;n(9),r=n(1);var i=n(19);s=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(s=r=r.default),"function"==typeof s&&(s=s.options),s.render=i.render,s.staticRenderFns=i.staticRenderFns,e.exports=r},function(e,t,n){var r,s;n(7),r=n(2);var i=n(17);s=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(s=r=r.default),"function"==typeof s&&(s=s.options),s.render=i.render,s.staticRenderFns=i.staticRenderFns,s._scopeId="data-v-09d58772",e.exports=r},function(e,t,n){var r,s;n(10),r=n(3);var i=n(20);s=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(s=r=r.default),"function"==typeof s&&(s=s.options),s.render=i.render,s.staticRenderFns=i.staticRenderFns,s._scopeId="data-v-ecbaacc0",e.exports=r},function(e,t,n){var r,s;n(8),r=n(4);var i=n(18);s=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(s=r=r.default),"function"==typeof s&&(s=s.options),s.render=i.render,s.staticRenderFns=i.staticRenderFns,s._scopeId="data-v-179fb4ca",e.exports=r},function(e,t,n){var r,s;n(6),r=n(5);var i=n(16);s=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(s=r=r.default),"function"==typeof s&&(s=s.options),s.render=i.render,s.staticRenderFns=i.staticRenderFns,s._scopeId="data-v-0575a22f",e.exports=r},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.spinnerWrapperClass+" grid -center"},[n("div",{staticClass:"loading"})])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:e.alertWrapperClass},[n("div",{class:e.alertClass},[e._v(e._s(e.msg))])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("header",[n("nav",{staticClass:"grid -between"},[n("div",{staticClass:"nav-center"},[e._v("\n      "+e._s(e.msg)+"\n    ")])])])},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("nav-bar"),e._v(" "),n("div",{staticClass:"container"},[n("alert",{attrs:{visible:e.showAlert,type:e.typeAlert,msg:e.msgAlert}}),e._v(" "),n("div",{staticClass:"form-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.token,expression:"token"}],staticClass:"form-control",attrs:{placeholder:"Your token"},domProps:{value:e._s(e.token)},on:{keypress:e._onSendToken,input:function(t){t.target.composing||(e.token=t.target.value)}}})]),e._v(" "),n("spinner",{attrs:{visible:e.showSpinner}}),e._v(" "),n("grid",{attrs:{items:e.deployments}})],1)],1)},staticRenderFns:[]}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{},e._l(e.items,function(t){return n("div",{staticClass:"items-table"},[n("div",{staticClass:"grid -between",attrs:{id:t.uid}},[n("div",[e._v(e._s(t.uid))]),e._v(" "),n("div",[e._v(e._s(t.name))]),e._v(" "),n("div",[n("a",{attrs:{title:t.url,href:t.url,target:"_blank"}},[e._v(e._s(e.computeUrlText(t.url))+" "),n("i",{staticClass:"fa fa-external-link"})])]),e._v(" "),n("div",[e._v(e._s(t.created))]),e._v(" "),n("div",{staticClass:"delete-icon"},[n("a",{attrs:{"data-id":t.uid},on:{click:e._onClickDelete}},[n("i",{staticClass:"fa fa-trash"})])]),e._v(" "),e._m(0,!0)])])}))},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"confirm-button hide"},[n("a",[e._v("Confirm?")])])}]}}]);
//# sourceMappingURL=app.b97c03e690c27106128c.js.map