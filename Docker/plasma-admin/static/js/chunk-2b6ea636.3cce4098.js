(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2b6ea636"],{1405:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{staticStyle:{"margin-bottom":"24"},attrs:{gutter:8}},[a("el-col",{attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:24},xl:{span:24}}},[a("el-card",{staticClass:"no_pd_b",staticStyle:{"padding-bottom":"0","margin-bottom":"12px"}},[a("query")],1)],1)],1),t._v(" "),a("el-row",{attrs:{gutter:8}},[a("el-col",{staticStyle:{"padding-right":"8px","margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[a("el-card",{staticStyle:{"min-height":"650px"}},[a("m-table",{attrs:{title:"统计结果",tableData:t.tableData,tableCol:t.tableCol}})],1)],1),t._v(" "),a("el-col",{staticStyle:{"margin-bottom":"30px"},attrs:{xs:{span:24},sm:{span:24},md:{span:24},lg:{span:12},xl:{span:12}}},[a("el-card",{staticStyle:{"min-height":"650px"}},[a("pie-chart",{attrs:{option:t.option}})],1)],1)],1)],1)},l=[],r=a("1d0f"),i=a("44d9"),o=a("a52a"),s={name:"ComplexTable",components:{PieChart:r["a"],MTable:i["a"],Query:o["a"]},data:function(){return{tableData:[{name:"德宝光明单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"上林县单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"全州莱市单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"荔浦县丹霞采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"融安蜀阳单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"宜州双林单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"巴马莱士单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"},{name:"钟山光明单采血浆站",man:"11",manPre:"12%",woman:"13",womanPre:"12%",total:"24"}],tableCol:[{prop:"name",label:"机构",width:200},{prop:"manCol",label:"男性",children:[{prop:"man",label:"人数"},{prop:"manPre",label:"比例"}]},{prop:"womanCol",label:"女性",children:[{prop:"woman",label:"人数"},{prop:"womanPre",label:"比例"}]},{prop:"total",label:"合计"}]}},computed:{option:function(){return{title:"统计图表",color:["rgb(112,176,235)","rgb(173,152,218)"],data:[{name:"男",value:166},{name:"女",value:66}],lengendRight:1}}},created:function(){},methods:{}},c=s,m=a("2877"),u=Object(m["a"])(c,n,l,!1,null,null,null);e["default"]=u.exports},"1d0f":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{class:t.className,style:{height:t.height,width:t.width}})},l=[],r=(a("7f7f"),a("313e")),i=a.n(r),o=a("ed08");a("817d");var s={props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"580px"},option:{type:Object,default:{title:"标题",color:["#2fc7ca","#b6a2df","#5bb0f0","#ffb880","#d97a80"],data:[{value:320,name:"18-25"},{value:240,name:"25-35"},{value:149,name:"35-45"},{value:100,name:"45-55"},{value:59,name:"55以上"}]}}},data:function(){return{chart:null}},mounted:function(){var t=this;this.initChart(),this.__resizeHandler=Object(o["b"])(function(){t.chart&&t.chart.resize()},100),window.addEventListener("resize",this.__resizeHandler)},beforeDestroy:function(){this.chart&&(window.removeEventListener("resize",this.__resizeHandler),this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=i.a.init(this.$el,"macarons");var t=this.option,e=t.title,a=t.color,n=t.data,l=t.lengendTop,r=t.lengendRight,o=t.lengendLeft,s=t.radius;this.chart.setOption({title:{text:e,shoe:!1,textAlign:"left",left:-4,top:0,textStyle:{fontSize:16,color:"#333"}},grid:{top:50,left:"2%",right:"2%",bottom:"3%",containLabel:!0},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{top:l||"auto",left:o||"auto",right:r||"auto",data:n.map(function(t){return t.name})},color:a,calculable:!0,series:[{name:"",type:"pie",radius:s||[160,220],center:["50%","60%"],data:n,animationEasing:"cubicInOut",animationDuration:2600,label:{formatter:function(t){return"".concat(t.percent,"%")},fontSize:20}}]})}}},c=s,m=a("2877"),u=Object(m["a"])(c,n,l,!1,null,null,null);e["a"]=u.exports},"44d9":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{"margin-bottom":"12px"}},[t._v(t._s(t.title))]),t._v(" "),a("el-table",{staticStyle:{width:"100%","text-alain":"center"},attrs:{data:t.tableData,border:"",height:"570"}},t._l(t.tableCol,function(e){return a("el-table-column",{key:e.label,attrs:{prop:e.prop,label:e.label,width:e.width}},t._l(e.children,function(n){return e.children?a("el-table-column",{key:n.label,attrs:{prop:n.prop,label:n.label,width:n.width}}):t._e()}),1)}),1)],1)},l=[],r={props:{title:{type:String,default:"标题"},tableData:{type:Array,default:function(){return[{name:"111",value:"101"},{name:"222",value:"202"}]}},tableCol:{type:Array,default:function(){return[{prop:"name",label:"姓名"},{prop:"value",label:"数量"}]}}},data:function(){return{}},mounted:function(){}},i=r,o=a("2877"),s=Object(o["a"])(i,n,l,!1,null,null,null);e["a"]=s.exports},a52a:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0}},[a("el-form-item",{attrs:{label:"时间"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.listQuery.time,callback:function(e){t.$set(t.listQuery,"time",e)},expression:"listQuery.time"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"浆站"}},[a("el-select",{staticClass:"filter-item",attrs:{clearable:""},model:{value:t.listQuery.importance,callback:function(e){t.$set(t.listQuery,"importance",e)},expression:"listQuery.importance"}},t._l(t.plasmaStation,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.value}})}),1)],1),t._v(" "),a("el-form-item",[a("el-button",{staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:t.search}},[t._v("查询")])],1)],1)},l=[],r=a("cebc"),i=a("c1df"),o=a.n(i),s={data:function(){return{listQuery:{time:[this.$store.state.share.endDate,this.$store.state.share.endDate],importance:"1"}}},computed:{plasmaStation:function(){return this.$store.state.share.dictArray.plasmaStation},cListQuery:function(){return Object(r["a"])({},this.listQuery,{time:this.listQuery.time.map(function(t){return o()(t).format("YYYY-MM-DD")})})}},methods:{search:function(){console.log("search--\x3e",this.cListQuery)}}},c=s,m=a("2877"),u=Object(m["a"])(c,n,l,!1,null,null,null);e["a"]=u.exports}}]);