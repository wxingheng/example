require("../../common/manifest.js");
require("../../common/vendor.js");
global.webpackJsonp([1],[,,,,,,,,function(t,n,e){"use strict";var o=a(e(9)),i=a(e(10));function a(t){return t&&t.__esModule?t:{default:t}}Page((0,o.default)(i.default))},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(t){var n;return r(n={data:{$root:{}},onLoad:function(n){var e=new a.default(t);this.$vm=e;var o=e.$root;o.__wxWebviewId__=this.__wxWebviewId__,o.$mp||(o.$mp={});var i=o.$mp;i.mpType="page",i.page=this,i.query=n,i.status="load",e.$mount()},handleProxy:function(t){return s(this).$handleProxyWithVue(t)},onShow:function(){var t=s(this);t.$mp.status="show",u(t,"onShow"),t.$nextTick(function(){t._initDataToMP()})},onReady:function(){var t=s(this);t.$mp.status="ready",u(t,"onReady")},onHide:function(){var t=s(this);t.$mp.status="hide",u(t,"onHide")},onUnload:function(){var t=s(this);u(t,"onUnload"),t.$destroy()},onPullDownRefresh:function(){u(s(this),"onPullDownRefresh")},onReachBottom:function(){u(s(this),"onReachBottom")},onPageScroll:function(t){u(s(this),"onPageScroll",t)},onTabItemTap:function(t){u(s(this),"onTabItemTap",t)}},"onPullDownRefresh",function(){u(s(this),"onPullDownRefresh")}),r(n,"onReachBottom",function(){u(s(this),"onReachBottom")}),r(n,"onShareAppMessage",t.onShareAppMessage?function(t){return u(s(this),"onShareAppMessage",t)}:null),r(n,"onPageScroll",function(t){u(s(this),"onPageScroll",t)}),r(n,"onTabItemTap",function(t){u(s(this),"onTabItemTap",t)}),r(n,"onNavigationBarButtonTap",function(t){u(s(this),"onNavigationBarButtonTap",t)}),r(n,"onBackPress",function(){return u(s(this),"onBackPress")}),r(n,"$getAppWebview",function(t){return plus.webview.getWebviewById(""+this.__wxWebviewId__)}),n};var o,i=e(0),a=(o=i)&&o.__esModule?o:{default:o};function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function u(t,n,e){var o,i=t.$options[n];if("onError"===n&&i&&(i=[i]),i)for(var a=0,r=i.length;a<r;a++)o=i[a].call(t,e);return t._hasHookEvent&&t.$emit("hook:"+n),t.$children.length&&t.$children.forEach(function(t){return u(t,n,e)}),o}function s(t){return t.$vm.$root}},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=e(12),i=e.n(o),a=e(13);var r=function(t){e(11)},u=e(1)(i.a,a.a,r,null,null);n.default=u.exports},function(t,n){},function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default={data:function(){return{title:"Hello"}},onLoad:function(){},methods:{}}},function(t,n,e){"use strict";var o={render:function(){var t=this.$createElement,n=this._self._c||t;return n("view",{staticClass:"content"},[n("image",{staticClass:"logo",attrs:{src:"../../static/logo.png"}}),n("view",[n("text",{staticClass:"title"},[this._v(this._s(this.title)+" xingheng")])])])},staticRenderFns:[]};n.a=o}],[8]);