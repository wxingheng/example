/**
 * Created by Administrator on 2017-03-31.
 */
//全局变量，机构详细详细2
var facilityInfo = {};

$(function(){

    var getDay = 3; //时间
    //品种选择字典
    var bloodtypes = ['rbc', 'plt', 'plm', 'crp'];
    //默认品种
    var default_bloodtype = bloodtypes[0];
    //默认血型
    var default_bloodgroup = 'amount'; //ABO总计
    var symbolsize_store=12;
    var symbolsize_city=12;
    var symbolsize_line=12;
    var fontsize_value=12;
    var fontsize_city=12;
    //公用样式
    var chartStyle = {
        colorType:{
            "献血反应":"#07d0fb",
            "输血反应":"#298af8",
            "血液安全事件":"#1d51f1",
            "角膜生物":"#32d12d",
            "幸免事件":"#58fbc6",
            "职业暴露":"#9927d4",
            "不良事件":"#07d0fb",
        },
        colorLevel:{
            "LGT":"#2483f7",
            "MDT":"#ffa200",
            "SER":"#eb547c",
        },
        colorsOne:[
            "#07d0fb",
            "#298af8",
            "#1d51f1",
            "#32d12d",
            "#58fbc6",
            "#7d45ff",
            "#9927d4",
            "#C8D6E4"
        ],
        colorTwo:["#2483f7","#ffa200","#eb547c"],
        fontSize:14,
        bigFontSize:16,
        backgroundColor:"#23252f",
        fontColor:"rgba(255,255,255,.7)",
        nameColor:"rgba(255,255,255,1)",
        splitLineColor:"#454851",
        areaBgColor:"rgba(7,208,251,.1)",
        symbolSize:3
    };
    //获取颜色type
    function getColor(eventType){
        if (chartStyle.colorType.hasOwnProperty(eventType)) {
            return chartStyle.colorType[eventType];
        } else {
            return '#C8D6E4';
        }
    }
    //获取颜色level
    function getLevelColor(eventType){
        if (chartStyle.colorLevel.hasOwnProperty(eventType)) {
            return chartStyle.colorLevel[eventType];
        } else {
            return '#C8D6E4';
        }
    }
    //日志集合
    var logs = [];

    //创建仪表图
    function createMeter(id, data, color){
        var chart = echarts.init(document.getElementById(id));
        var option = {
            tooltip : {
                show:true,
                formatter: "{c}%",
                alwaysShowContent:true,//是否一直显示提示内容
            },
            toolbox: {
                "show": false,
                "feature": {
                    "mark": {
                        "show": true
                    },
                    "restore": {
                        "show": true
                    },
                    "saveAsImage": {
                        "show": true
                    }
                }
            },
            series: [
                {
                    name: data.name,
                    type: "gauge",//源码  223
                    startAngle: 180, //总的360，设置180就是半圆
                    endAngle: 0,
                    center: ["50%", "80%"], //整体的位置设置
                    radius: "100%",//半径
                    startAngle:180,//仪表盘起始角度。圆心 正右手侧为0度，正上方为90度
                    clockwise:true,//仪表盘刻度是否是顺时针增长。
                    //min:10,//最小的数据值，映射到 minAngle。
                    //max:180,//最大的数据值，映射到 maxAngle。
                    splitNumber:2,//仪表盘刻度的分割段数。
                    axisLine: {//仪表盘轴线相关配置。
                        show:true,//是否显示轴线
                        lineStyle: {
                            width: 4, //柱子的宽度
                            color: [[0.333, chartStyle.colorTwo[0]], [0.666, chartStyle.colorTwo[1]],[1,chartStyle.colorTwo[2]]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                        }
                    },
                    axisTick: {//刻度样式
                        "show": false,
                        splitNumber:2,
                        length:10,
                        lineStyle:{
                            color:"#0f0",
                            width:3
                        }
                    },
                    axisLabel: {//刻度标签
                        "show": true,
                        distance:-65,
                        formatter:function(value){//刻度标签的内容格式器
                            if(value < 33.33){
                                return "正常"
                            }else if(value < 66.66){
                                return "超常"
                            }else{
                                return "高发"
                            }
                        },
                        textStyle:{
                            // color:"#0f0"
                            fontSize:chartStyle.fontSize
                        }
                    },
                    splitLine: {//分割线
                        "show": false,
                        length:30,
                        lineStyle:{
                            color:"red",
                            width:10
                        }

                    },
                    pointer: {//仪表盘指针
                        "width": 4, //指针的宽度
                        "length": "60%", //指针长度，按照半圆半径的百分比
                        "color": "#2d99e2"
                    },
                    itemStyle:{
                        normal:{
                            color:'auto',
                        }
                    },
                    title: {
                        show: true,
                        offsetCenter: [0, "25%"], //标题位置设置
                        textStyle: { //标题样式设置
                            color: chartStyle.nameColor,
                            fontSize: chartStyle.bigFontSize,
                            fontFamily: "微软雅黑",
                            fontWeight: "bold"
                        }
                    },
                    detail: {//仪表盘详情，用于显示数据
                        show: false
                    },
                    data:data.record
                },
                {
                    name:"test",
                    type: "gauge",
                    startAngle: 180, //总的360，设置180就是半圆
                    endAngle: 0,
                    radius: "45%",//半径
                    center:["50%","80%"],
                    startAngle:180,//仪表盘起始角度。圆心 正右手侧为0度，正上方为90度
                    clockwise:true,//仪表盘刻度是否是顺时针增长。
                    splitNumber:1,//仪表盘刻度的分割段数。
                    axisLine: {//仪表盘轴线相关配置。
                        show:false,//是否显示轴线
                        lineStyle: {
                            width: 1, //柱子的宽度
                            color: [[1,"#3d404f"]] //0.298是百分比的比例值（小数），还有对应两个颜色值
                        }
                    },
                    axisTick: {//刻度样式
                        show: false,
                        splitNumber:2,
                        length:10,
                        lineStyle:{
                            color:"#0f0",
                            width:3
                        }
                    },
                    axisLabel: {//刻度标签
                        show: false,
                        distance:-80,
                        textStyle:{
                            fontSize:14
                        }
                    },
                    splitLine: {//分割线
                        show: false,
                        length:30,
                        lineStyle:{
                            color:"red",
                            width:10
                        }
                    },
                    pointer: {//仪表盘指针
                        show:false,
                        width: 1, //指针的宽度
                        length: "20%", //指针长度，按照半圆半径的百分比
                        color: "#2d99e2"
                    },
                    itemStyle:{
                        normal:{
                            color:'auto',
                        }
                    },
                    title: {
                        show: false,
                    },
                    detail: {//仪表盘详情，用于显示数据
                        show: false
                    },
                }
            ]
        };
        chart.setOption(option);
        chart.dispatchAction({
            type: 'showTip',
            // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
            seriesIndex: 0,
            dataIndex: 0,
            position: function(data){
                // return [data[0]-60,data[1]-100]
            }
        });
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
    }

    function createBar(id, data){
        var xAxisData = [],seriesData=[];
        for(var i in data){
            var n = data[i];
            xAxisData.push(n.name);
            seriesData.push(n.value)
        }
        var chart = echarts.init(document.getElementById(id));
        var option = {
            title: {
            },
            grid:{
                top:20,
                bottom:25,
                left:40,
                right:30
            },
            tooltip: {},
            legend: {
                // data:['销量']
            },
            xAxis: {
                // data: ["轻度","中度","重度"],
                data: xAxisData,
                axisLabel:{
                    textStyle:{
                        color: function (value, index) {

                            var colorList = chartStyle.colorTwo;
                            return colorList[index];
                        },
                        fontSize:chartStyle.fontSize
                    }
                },
                axisLine:{
                    show:false,
                },
                axisTick:{
                    show:false
                },
            },
            yAxis: {
                nameTextStyle:{

                },
                axisLine:{
                    show:false
                },
                axisTick:{
                    show:false
                },
                axisLabel:{
                    textStyle:{
                        color:chartStyle.fontColor,
                    }
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        color:chartStyle.splitLineColor,
                        width:1
                    }
                },
            },
            series: [{
                name: '销量',
                type: 'bar',
                // data: [320, 220, 80],
                data: seriesData,
                label:{
                    normal:{
                        show:true,
                        position: 'top'
                    }
                },
                barWidth:"20%",
                itemStyle:{
                    normal:{
                        color:function(params){
                            var colorList = chartStyle.colorTwo;
                            return colorList[params.dataIndex];
                        }
                    }
                }
            }]
        };
        chart.setOption(option);
    }

    function createPie(id, data){
        var chart = echarts.init(document.getElementById(id));
        var option = {
            title : {
                x:'center'
            },
            grid:{
                top:20,
                bottom:20,
                left:40,
                right:30
            },
            tooltip : {
            },
            legend: {
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                }
            },
            series : [
                {
                    name:'事件类型统计',
                    type:'pie',
                    radius : [20,60],
                    center : ['50%', '50%'],
                    roseType : 'area',
                    data:data,
                    itemStyle:{
                        normal:{
                            color:function(params){
                                return getColor(params.name)
                            }
                        }
                    },
                    label:{
                        normal:{
                            show:true,
                            formatter: function(params){
                                return params.name.length == 9 ? (params.name.substr(0,5) + "\n" + params.name.substr(5)) + "\n" + ("(" + params.value + ")") :
                                    params.name.length == 6 ? params.name + "\n" + ("(" + params.value + ")") :
                                        params.name.length == 5 ? params.name + "\n" + ("(" + params.value + ")") :
                                            params.name + "\n" + ("(" + params.value + ")")
                            },
                            textStyle:{
                                fontSize:chartStyle.fontSize
                            }
                        },

                    }
                }
            ]
        };
        chart.setOption(option)
    };

    //创建折线图
    function createLine(id, data, color ){
        var chart = echarts.init(document.getElementById(id));
        var option = {
            title:{
                text:data.title,
                bottom:0,
                left:"50%",
                textAlign:"center",
                textStyle:{
                    color:color,
                    fontSize:14
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid:{
                top:24,
                bottom:55,
                left:30,
                right:10,
                backgroundColor:chartStyle.backgroundColor,
                show:true,
                borderWidth:0,
            },
            xAxis: {
                type: 'category',
                data: data.xAxis,
                boundaryGap: false,
                axisLabel:{
                    rotate:45,
                    interval:0,
                    textStyle:{
                        color:chartStyle.fontColor
                    }
                },
                nameLocation:"end",
                nameTextStyle:{
                    color:chartStyle.fontColor,
                    fontSize:chartStyle.fontSize
                },
                axisLine:{
                    lineStyle:{
                        color:chartStyle.fontColor,
                        width:1,

                    }
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:true,
                    interval:function(index, value){
                        return value == "时间/日" ? false : true;
                    },
                    lineStyle:{
                        color:chartStyle.splitLineColor,
                        width:1
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLabel:{
                    textStyle:{
                        color:chartStyle.fontColor
                    }
                },
                name:"    事件数量/起",
                nameLocation:"end",
                nameTextStyle:{
                    color:chartStyle.fontColor,
                    fontSize:chartStyle.fontSize
                },
                nameGap:8,
                splitNumber:4,
                axisLine:{
                    lineStyle:{
                        color:"#848589",
                        width:1,
                    }
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:true,
                    interval:function(index, value){
                        return value == "时间/日" ? true : false;
                    },
                    lineStyle:{
                        color:chartStyle.splitLineColor,
                        width:1
                    }
                },
                splitArea:{
                }
            },
            series: [
                {
                    name: data.title,
                    type: 'line',
                    smooth: true,
                    data: data.record,
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: chartStyle.areaBgColor
                            }], false)
                        }
                    },
                    itemStyle : {
                        normal : {
                            color:color,
                            lineStyle:{
                                width:1,
                                color:color
                            },
                            borderWidth:3,
                            borderColor:color
                        },

                    },
                    symbolSize:chartStyle.symbolSize,
                }
            ]
        };
        chart.setOption(option);
    }

//////////////////地图
    var mapChart = echarts.init(document.getElementById('mapChart'));
    var mapOption = {
        title: {
            text: '',
            textStyle: {color: '#fff'}
        },
        backgroundColor: 'rgba(27,27,27,0)',
        geo: {
            map: '江苏',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false, //鼠标缩放
            //left: 15,
            //right: 15,
            top: 15,
            bottom :5,
            itemStyle: {
                normal: {
                    areaColor: 'rgba(50,60,72,0)',
                    borderColor: '#39476a',
                    borderWidth: 2
                },
                emphasis: {
                    areaColor: 'rgba(42,51,61,1)'
                }
            }
        },
        calculable : true
    };

    //初始化地图
    mapChart.setOption(mapOption);

    //通过机构标号获取名称
    function getFacilityName(facility) {
        if (facilityInfo.hasOwnProperty(facility)) {
            return facilityInfo[facility].name;
        } else if (facilityInfo.hasOwnProperty(facility.substring(0, 5))) {
            return facilityInfo[facility.substring(0, 5)].name;
        } else {
            return '';
        }
    }
    //通过机构标号获取地区
    function getFacilityCityName(facility) {
        if (facilityInfo.hasOwnProperty(facility)) {
            return facilityInfo[facility].cityName;
        } else if (facilityInfo.hasOwnProperty(facility.substring(0, 5))) {
            return facilityInfo[facility.substring(0, 5)].cityName;
        } else {
            return '';
        }
    }

    getFacilityInfo(function(data){

        facilityInfo = data;

        $.get(util.domain + "/service/dashboard/statistics/hv/systemRunSum_query",function(data){
            $("#systemRunTotal").text(data.total);
        });

        $.get(util.domain+"/service/dashboard/statistics/hv/earlyWarnIndex_query",
          function(data){
              data.map(function(v,i){
                  if(i==0){
                      createMeter("warningIndexChart2", {
                          name:v.name,
                          record: [{value: v.lastMonthAverage, name: v.name}]
                      });
                  }else if(i==1){
                      createMeter("warningIndexChart1", {
                          name:v.name,
                          record: [{value: v.lastMonthAverage, name: v.name}]
                      });
                  }
              })
          });
///////////////////todo 滚动新闻
        //近一个月
        var startTime = util.formatDate(new Date(new Date().getTime()- 1000*60*60*24*30),"yyyy-MM-dd HH:mm:ss");
        var endTime = util.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss");
        $.get(util.domain+"/service/dashboard/statistics/hv/eventList_query", {
              startTime:startTime,
              endTime:endTime
          },
          function(resp){
              //过滤无效数据
              resp = resp.filter(function(item){
                  return item.facility != "test" && item.level && item.level!="CNF";
              });
              //map data
              var mapData = [],mapRegion = [],mapRegionObj = {};
              //近一个月监控事件
              $("#systemRunMonthTotal").text(resp.length);
              //近一个月严重事件
              var nearlyMonthSER = 0;
              //事件级别统计数据
              var lgt = 0,mdt = 0,ser=0;
              //事件类型统计
              var eventType = [],eventTypeObj = {},warningQuantityChartData = [];
              //line chart data
              var lineTitle = "";
              $.each(resp,function(i,d){

                  //事件地区
                  if(mapRegion.indexOf(d.facility.substr(0,5)) == -1){
                      mapRegion.push(d.facility.substr(0,5))
                  }
                  //事件类型数据
                  if(eventType.indexOf(d.type) == -1){
                      eventType.push(d.type)
                  }
                  //事件级别数据
                  if(d.level == "LGT"){
                      lgt+=1;
                  }else if(d.level == "MDT"){
                      mdt+=1;
                  }else if(d.level == "SER"){
                      ser+=1;
                      nearlyMonthSER+=1;
                  };
                  //事件列表数据
                  logs.push(d);
              });
              $("#systemRunMonthTotalSER").text(nearlyMonthSER);
              $.each(eventType,function(i,d){
                  lineTitle +="<li><span>● "+ (d) +"</span></li>"
                  eventTypeObj[d] =0;
              });
              $.each(mapRegion,function(i,d){
                  mapRegionObj[d] = {level:"",value:0};
              });
              $.each(resp,function(i,d){
                  for(var j in eventTypeObj){
                      if(j == d.type){
                          eventTypeObj[j]+=1;
                      }
                  }

                  for(var k in mapRegionObj){

                      if(k == d.facility.substr(0,5)){

                          mapRegionObj[k].value+=1;
                          mapRegionObj[k].level=d.level;
                      }
                  }
              });
              for(var j in eventTypeObj){
                  warningQuantityChartData.push({name:j,value:eventTypeObj[j]})
              }
              for(var j in mapRegionObj){
                  mapData.push({facility:j,amount:mapRegionObj[j].value,level:mapRegionObj[j].level})
              }
              var newsList = '';
              for(var i in logs){
                  var n = logs[i];

                  newsList +='<li>'+
                    '<p class="log-title">'+
                    '<span class="'+ (n.level == "LGT" ? "ss-title-nromal" : n.level == "MDT" ? "ss-title-moderate" : n.level == "SER" ? "ss-title-warn" : "" ) +'">【'+ (n.level == "LGT" ? "轻度" : n.level == "MDT" ? "中度" : n.level == "SER" ? "重度" : "未知" ) +'】</span>'+
                    '<span class="ss-text">'+ (getFacilityCityName(n.facility)) +'-'+ ((getFacilityName(n.facility))) +'</span>'+
                    '<span class="ss-title-time pull-right">'+ (n.time.substr(0,10)) +'</span>'+
                    '</p>'+
                    '<div class="log-info"> '+ ((getFacilityName(n.facility))) +'发生'+
                    '<span class="'+ (n.level == "LGT" ? "ss-title-nromal" : n.level == "MDT" ? "ss-title-moderate" : n.level == "SER" ? "ss-title-warn" : "" ) +'">【'+ (n.level == "LGT" ? "轻度" : n.level == "MDT" ? "中度" : n.level == "SER" ? "重度" : "未知" ) +'】</span>预警事件，类型为'+
                    // '<span class="'+ (n.level == "LGT" ? "ss-title-nromal" : n.level == "MDT" ? "ss-title-moderate" : n.level == "SER" ? "ss-title-warn" : "" ) +'">'+ (n.type) +'</span>事件'+
                    '<span style="color:'+ (getColor(n.type)) +'">'+ (n.type) +'</span>事件'+
                    '</div>'+
                    '</li>';
              }
              //渲染line
              $("#lineTitle").html(lineTitle);

              $.each(eventType,function(i,d){
                  //填充空数据  近30天
                  var addTime = endTime;
                  var times = [];
                  var recordCompute = [];
                  for(var o=0;o<30;o++){
                      times.unshift(addTime.substr(5,5).replace("-","/"));
                      addTime = util.formatDate(new Date(new Date(addTime).getTime() - 1000*60*60*24),"yyyy-MM-dd HH:mm:ss");
                      recordCompute.push(0);
                  }
                  var lineChartData = {title:d,xAxis:[],record:[]};
                  $.each(resp,function(j,v){
                      if(v.type==d){
                          if(lineChartData.xAxis.indexOf(v.time.substr(5,5).replace("-","/"))==-1){
                              lineChartData.xAxis.push(v.time.substr(5,5).replace("-","/"));
                          }
                          $.each(lineChartData.xAxis,function(k,n){
                              if(n==v.time.substr(5,5).replace("-","/")){
                                  if(lineChartData.record[k]){
                                      lineChartData.record[k]+=1;
                                  }else{
                                      lineChartData.record[k] = 1;
                                  }
                              }
                          })
                      }
                  });
                  lineChartData.xAxis.reverse();
                  lineChartData.record.reverse();
                  lineChartData.xAxis.map(function(k,n){
                      recordCompute[times.indexOf(k)] = lineChartData.record[n];
                  })
                  lineChartData.xAxis = times;
                  lineChartData.record = recordCompute;
                  createLine('transfusionReactionChart'+(i+1),
                    lineChartData,
                    getColor(lineChartData.title)
                    // chartStyle.colorsOne[i]
                  );
              });
              //渲染事件级别柱状图
              createBar('warningLevelChart', [
                  {name:"轻度",value:lgt},
                  {name:"中度",value:mdt},
                  {name:"重度",value:ser}
              ], {});
              //事件类型统计
              createPie('warningQuantityChart', warningQuantityChartData)
              //渲染信息列表
              $("#logWarp").html(newsList);
              $(".ss-log-list").bootstrapNews({
                  newsPerPage:5,
                  autoplay: true,
                  pauseOnHover: true,
                  navigation: false,
                  direction: 'down',
                  newsTickerInterval: 1000
              });

              //渲染地图
              var series = null;

              var setBulidMap3 = function(){
                  series = [];
                  var bloodStoreData = [];
                  var pointData = [];
                  var facilityStore_hash = {}; // 映射库存需要
                  var points_hash = {}; // 排重需要的HASH MAP
                  // 库存数据
                  //半径计算比例尺
                  var maxAmount = 0;
                  function scaleR(val){
                      var min = 8;
                      var max = 15;
                      return parseInt(min+((max-min)*val/maxAmount));
                      // return
                  };
                  $.each(mapData, function (k, o) {
                      if(o.amount>maxAmount){
                          maxAmount = o.amount;
                      }
                      bloodStoreData.push({
                          name: facilityInfo[o.facility].cityName,
                          value: [facilityInfo[o.facility].x, facilityInfo[o.facility].y, o.amount,o.level],
                      });
                  });
                  // 地图库存数据
                  series.push({
                      name: '红细胞类血液库存',
                      type: 'effectScatter',
                      coordinateSystem: 'geo',
                      data: bloodStoreData,
                      symbolSize: function(d){
                          return scaleR(d[2]);
                      },
                      roam: false,  //鼠标缩放
                      label: {
                          normal: {
                              formatter: '{b}',
                              position: 'top',
                              show: true,
                              textStyle: {
                                  color: '#5e6e84',
                                  fontSize: fontsize_city,
                                  fontWeight: 'bold'
                              }
                          }
                      },
                      itemStyle: {
                          normal: {
                              color: function (item) {
                                  return getLevelColor(item.value[3]);
                              },
                              shadowColor: 'rgba(255,255,255,0.3)',
                              shadowOffsetX: 0,
                              shadowOffsetY: 0,
                              shadowBlur: 55
                          }
                      },
                      animation:false

                  });
                  mapChart.setOption({series: series});
              };
              setBulidMap3();
          }
        );
    });
});


