/**
 * Created by Administrator on 2017-03-31.
 */


$(function(){
    //全局变量，机构详细详细2
    var facilityInfo = {};
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
///////////////////todo 累计运行查看
//     $.get("http://192.168.20.250:3000/service/dashboard/statistics/hv/systemRunSum_query",function(data){
        $("#systemRunTotal").text(20);
    // });
///////////////////todo 预警指数（仪表盘）
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
            },
        });
        chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
        });
    };
    // $.get("http://192.168.20.250:3000/service/dashboard/statistics/hv/earlyWarnIndex_query",
    //     function(data){
    var earlyWarnIndex_query =[{"name":"采供血机构","lastMonthAverage":0,"nearlyMonthAverage":5,"historyAverage":5},{"name":"医院","lastMonthAverage":0,"nearlyMonthAverage":13,"historyAverage":15}]
        earlyWarnIndex_query.map(function(v,i){
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
    // })
////////////////////todo 预警级别（柱状图）
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
/////////////////////todo 预警数量(玫瑰图)
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

////////////////////todo 输血反应（折线图）

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
    };

    // util.ajax({
    //     url: './json/facilityCoordinates.json',
    //     async: false,
    //     success: function (facilityCoordinate) {
    var facilityCoordinate = {
        "90017": {
            "name": "江苏省血液中心",
            "x": 118.920759,
            "y": 32.175096,
            "cityName": "江苏省"
        },
        "90018": {
            "name": "常州市中心血站",
            "x": 119.994716,
            "y": 31.764396,
            "cityName": "常州市"
        },
        "90019": {
            "name": "无锡市红十字中心血站",
            "x": 120.311485,
            "y": 31.569462,
            "cityName": "无锡市"
        },
        "90020": {
            "name": "泰州市中心血站",
            "x": 119.926663,
            "y": 32.472535,
            "cityName": "泰州市"
        },
        "90021": {
            "name": "徐州市红十字中心血站",
            "x": 117.181716,
            "y": 34.258631,
            "cityName": "徐州市"
        },
        "90022": {
            "name": "苏州市中心血站",
            "x": 120.637578,
            "y": 31.30762,
            "cityName": "苏州市"
        },
        "90023": {
            "name": "南京红十字血液中心",
            "x": 118.679941,
            "y": 32.0904,
            "cityName": "南京市",
            "alias": "南京"
        },
        "90024": {
            "name": "镇江市中心血站",
            "x": 119.44957,
            "y": 32.193884,
            "cityName": "镇江市"
        },
        "90025": {
            "name": "连云港市红十字中心血站",
            "x": 119.197382,
            "y": 34.59524,
            "cityName": "连云港市"
        },
        "90026": {
            "name": "扬州市中心血站",
            "x": 119.453082,
            "y": 32.430077,
            "cityName": "扬州市"
        },
        "90027": {
            "name": "淮安市中心血站",
            "x": 119.016042,
            "y": 33.604915,
            "cityName": "淮安市"
        },
        "90028": {
            "name": "南通市中心血站",
            "x": 120.897222,
            "y": 31.999889,
            "cityName": "南通市"
        },
        "90029": {
            "name": "盐城市中心血站",
            "x": 120.131035,
            "y": 33.368145,
            "cityName": "盐城市"
        },
        "90030": {
            "name": "宿迁市中心血站",
            "x": 118.28041,
            "y": 33.959786,
            "cityName": "宿迁市"
        },
        "90018DB": {
            "name": "常州市中心血站金坛分站",
            "x": 119.58983,
            "y": 31.739356,
            "cityName": "常州金坛"
        },
        "90018DC": {
            "name": "常州市中心血站溧阳分站",
            "x": 119.4649,
            "y": 31.430388,
            "cityName": "常州溧阳"
        },
        "90019BB": {
            "name": "无锡市红十字中心血站江阴分站",
            "x": 120.30772,
            "y": 31.920422,
            "cityName": "无锡江阴"
        },
        "90019BC": {
            "name": "无锡市红十字中心血站宜兴分站",
            "x": 119.829102,
            "y": 31.351228,
            "cityName": "无锡宜兴"
        },
        "90020ME": {
            "name": "泰州市中心血站靖江分站",
            "x": 120.285266,
            "y": 32.040202,
            "cityName": "泰州靖江"
        },
        "90022EC": {
            "name": "苏州市中心血站常熟分站",
            "x": 120.758421,
            "y": 31.649972,
            "cityName": "苏州常熟"
        },
        "90022EF": {
            "name": "苏州市中心血站张家港分站",
            "x": 120.550686,
            "y": 31.867699,
            "cityName": "苏州张家港"
        },
        "90022EJ": {
            "name": "苏州市中心血站太仓市分站",
            "x": 121.113836,
            "y": 31.452932,
            "cityName": "苏州太仓"
        },
        "90022EM": {
            "name": "苏州市中心血站昆山市分站",
            "x": 120.967715,
            "y": 31.385029,
            "cityName": "苏州昆山"
        },
        "90022ET": {
            "name": "苏州市中心血站吴江市分站",
            "x": 120.648653,
            "y": 31.167853,
            "cityName": "苏州吴江"
        },
        "90024LD": {
            "name": "镇江市中心血站丹阳分站",
            "x": 119.560576,
            "y": 32.001658,
            "cityName": "镇江丹阳"
        },
        "90028FB": {
            "name": "南通市中心血站如皋分站",
            "x": 120.548067,
            "y": 32.39497,
            "cityName": "南通如皋"
        },
        "90028FC": {
            "name": "南通市中心血站通州分站",
            "x": 121.079465,
            "y": 32.100464,
            "cityName": "南通通州"
        },
        "90020MB": {
            "name": "泰州市中心血站姜堰采血点",
            "x": 120.160725,
            "y": 32.51992,
            "cityName": "泰州姜堰"
        },
        "90020MC": {
            "name": "泰州市中心血站兴化采血点",
            "x": 119.850683,
            "y": 32.94206,
            "cityName": "泰州兴化"
        },
        "90020MD": {
            "name": "泰州市中心血站泰兴采血点",
            "x": 120.021939,
            "y": 32.171285,
            "cityName": "泰州泰兴"
        },
        "90020MF": {
            "name": "泰州市中心血站泰州采血点",
            "x": 119.886172,
            "y": 32.310204,
            "cityName": "泰州泰州"
        },
        "90021CB": {
            "name": "徐州市红十字中心血站丰县分站",
            "x": 116.59756,
            "y": 34.699379,
            "cityName": "徐州丰县"
        },
        "90021CC": {
            "name": "徐州市红十字中心血站沛县分站",
            "x": 116.950028,
            "y": 34.727954,
            "cityName": "徐州沛县"
        },
        "90021CD": {
            "name": "徐州市红十字中心血站新沂分站",
            "x": 118.355836,
            "y": 34.354343,
            "cityName": "徐州新沂"
        },
        "90021CE": {
            "name": "徐州市红十字中心血站邳州分站",
            "x": 118.021304,
            "y": 34.3431,
            "cityName": "徐州邳州"
        },
        "90021CG": {
            "name": "徐州市红十字中心血站贾汪分站",
            "x": 117.456042,
            "y": 34.441714,
            "cityName": "徐州贾汪"
        },
        "90023NB": {
            "name": "南京红十字血液中心六合分站",
            "x": 118.851294,
            "y": 32.34915,
            "cityName": "南京六合",
            "alias": "南京"
        },
        "90023NC": {
            "name": "南京红十字血液中心溧水分站",
            "x": 119.03987,
            "y": 31.63693,
            "cityName": "南京溧水",
            "alias": "南京"
        },
        "90023ND": {
            "name": "南京红十字血液中心高淳分站",
            "x": 118.876105,
            "y": 31.328251,
            "cityName": "南京高淳",
            "alias": "南京"
        },
        "90026KB": {
            "name": "扬州市中心血站宝应采血点",
            "x": 119.324081,
            "y": 33.248911,
            "cityName": "扬州宝应"
        },
        "90026KC": {
            "name": "扬州市中心血站高邮采血点",
            "x": 119.426646,
            "y": 33.010896,
            "cityName": "扬州高邮"
        },
        "90026KD": {
            "name": "扬州市中心血站江都采血点",
            "x": 119.569289,
            "y": 32.435258,
            "cityName": "扬州江都"
        },
        "90026KE": {
            "name": "扬州市中心血站仪征采血点",
            "x": 119.196678,
            "y": 32.293335,
            "cityName": "扬州仪征"
        },
        "90027HB": {
            "name": "淮安市中心血站涟水采血点",
            "x": 119.270778,
            "y": 33.765352,
            "cityName": "淮安涟水"
        },
        "90027HC": {
            "name": "淮安市中心血站金湖采血点",
            "x": 119.001289,
            "y": 33.028545,
            "cityName": "淮安金湖"
        },
        "90027HD": {
            "name": "淮安市中心血站洪泽采血点",
            "x": 118.882348,
            "y": 33.295237,
            "cityName": "淮安洪泽"
        },
        "90027HE": {
            "name": "淮安市中心血站盱眙采血点",
            "x": 118.522429,
            "y": 32.997877,
            "cityName": "淮安盱眙"
        },
        "90027HF": {
            "name": "淮安市中心血站楚州采血点",
            "x": 119.179108,
            "y": 33.538844,
            "cityName": "淮安楚州"
        },
        "90028FD": {
            "name": "南通市中心血站海安采血点",
            "x": 120.452297,
            "y": 32.469588,
            "cityName": "南通海安"
        },
        "90028FE": {
            "name": "南通市中心血站如东采血点",
            "x": 121.180698,
            "y": 32.317703,
            "cityName": "南通如东"
        },
        "90028FF": {
            "name": "南通市中心血站启东采血点",
            "x": 121.667679,
            "y": 31.819587,
            "cityName": "南通启东"
        },
        "90028FG": {
            "name": "南通市中心血站海门采血点",
            "x": 121.176879,
            "y": 31.897441,
            "cityName": "南通海门"
        },
        "90029JB": {
            "name": "盐城市中心血站东台采血点",
            "x": 120.338602,
            "y": 32.847685,
            "cityName": "盐城东台"
        },
        "90029JC": {
            "name": "盐城市中心血站大丰采血点",
            "x": 120.456922,
            "y": 33.204402,
            "cityName": "盐城大丰"
        },
        "90029JD": {
            "name": "盐城市中心血站射阳采血点",
            "x": 120.26524,
            "y": 33.776171,
            "cityName": "盐城射阳"
        },
        "90029JE": {
            "name": "盐城市中心血站建湖采血点",
            "x": 119.7975,
            "y": 33.44288,
            "cityName": "盐城建湖"
        },
        "90029JF": {
            "name": "盐城市中心血站阜宁采血点",
            "x": 119.807521,
            "y": 33.767025,
            "cityName": "盐城阜宁"
        },
        "90029JG": {
            "name": "盐城市中心血站滨海采血点",
            "x": 119.844493,
            "y": 34.002444,
            "cityName": "盐城滨海"
        },
        "90029JH": {
            "name": "盐城市中心血站响水采血点",
            "x": 119.587526,
            "y": 34.20864,
            "cityName": "盐城响水"
        },
        "90030NB": {
            "name": "宿迁市中心血站沐阳采供血点",
            "x": 119.062937,
            "y": 34.286546,
            "cityName": "宿迁沐阳"
        },
        "90030NC": {
            "name": "宿迁市中心血站泗阳采供血点",
            "x": 118.689458,
            "y": 33.712928,
            "cityName": "宿迁泗阳"
        },
        "90030ND": {
            "name": "宿迁市中心血站泗洪采供血点",
            "x": 118.203592,
            "y": 33.462241,
            "cityName": "宿迁泗洪"
        }
    }
            // 获取所有机构
            // util.ajax({
            //     url: util.domain + '/service/dashboard/dicts/facility',
            //     async: false,
            //     success: function (data) {

            var data = [{"facilityCode":"90017","fullName":"江苏省血液中心","name":"省血液中心","type":0},{"facilityCode":"90018","fullName":"常州市中心血站","name":"常州市","type":0},{"facilityCode":"90019","fullName":"无锡市红十字中心血站","name":"无锡市","type":0},{"facilityCode":"90020","fullName":"泰州市中心血站","name":"泰州市","type":0},{"facilityCode":"90021","fullName":"徐州市红十字中心血站","name":"徐州市","type":0},{"facilityCode":"90022","fullName":"苏州市中心血站","name":"苏州市","type":0},{"facilityCode":"90023","fullName":"南京红十字血液中心","name":"南京市","type":0},{"facilityCode":"90024","fullName":"镇江市中心血站","name":"镇江市","type":0},{"facilityCode":"90025","fullName":"连云港市红十字中心血站","name":"连云港市","type":0},{"facilityCode":"90026","fullName":"扬州市中心血站","name":"扬州市","type":0},{"facilityCode":"90027","fullName":"淮安市中心血站","name":"淮安市","type":0},{"facilityCode":"90028","fullName":"南通市中心血站","name":"南通市","type":0},{"facilityCode":"90029","fullName":"盐城市中心血站","name":"盐城市","type":0},{"facilityCode":"90030","fullName":"宿迁市中心血站","name":"宿迁市","type":0},{"facilityCode":"90018DB","fullName":"常州市中心血站金坛分站","name":"常州市金坛分站","type":1},{"facilityCode":"90018DC","fullName":"常州市中心血站溧阳分站","name":"常州市溧阳分站","type":1},{"facilityCode":"90019BB","fullName":"无锡市红十字中心血站江阴分站","name":"无锡市江阴分站","type":1},{"facilityCode":"90019BC","fullName":"无锡市红十字中心血站宜兴分站","name":"无锡市宜兴分站","type":1},{"facilityCode":"90020ME","fullName":"泰州市中心血站靖江分站","name":"泰州市靖江分站","type":1},{"facilityCode":"90022EC","fullName":"苏州市中心血站常熟分站","name":"苏州市常熟分站","type":1},{"facilityCode":"90022EF","fullName":"苏州市中心血站张家港分站","name":"苏州市张家港分站","type":1},{"facilityCode":"90022EJ","fullName":"苏州市中心血站太仓市分站","name":"苏州市太仓市分站","type":1},{"facilityCode":"90022EM","fullName":"苏州市中心血站昆山市分站","name":"苏州市昆山市分站","type":1},{"facilityCode":"90022ET","fullName":"苏州市中心血站吴江市分站","name":"苏州市吴江市分站","type":1},{"facilityCode":"90024LD","fullName":"镇江市中心血站丹阳分站","name":"镇江市丹阳分站","type":1},{"facilityCode":"90028FB","fullName":"南通市中心血站如皋分站","name":"南通市如皋分站","type":1},{"facilityCode":"90028FC","fullName":"南通市中心血站通州分站","name":"南通市通州分站","type":1},{"facilityCode":"90028FD","fullName":"南通市中心血站海安采血点","name":"南通市海安采血点","type":1},{"facilityCode":"90028FE","fullName":"南通市中心血站如东采血点","name":"南通市如东采血点","type":1},{"facilityCode":"90028FF","fullName":"南通市中心血站启东采血点","name":"南通市启东采血点","type":1},{"facilityCode":"90028FG","fullName":"南通市中心血站海门采血点","name":"南通市海门采血点","type":1},{"facilityCode":"90020MB","fullName":"泰州市中心血站姜堰采血点","name":"泰州市姜堰采血点","type":2},{"facilityCode":"90020MC","fullName":"泰州市中心血站兴化采血点","name":"泰州市兴化采血点","type":2},{"facilityCode":"90020MD","fullName":"泰州市中心血站泰兴采血点","name":"泰州市泰兴采血点","type":2},{"facilityCode":"90020MF","fullName":"泰州市中心血站泰州采血点","name":"泰州市泰州采血点","type":2},{"facilityCode":"90021CB","fullName":"徐州市红十字中心血站丰县分站","name":"徐州市丰县分站","type":2},{"facilityCode":"90021CC","fullName":"徐州市红十字中心血站沛县分站","name":"徐州市沛县分站","type":2},{"facilityCode":"90021CD","fullName":"徐州市红十字中心血站新沂分站","name":"徐州市新沂分站","type":2},{"facilityCode":"90021CE","fullName":"徐州市红十字中心血站邳州分站","name":"徐州市邳州分站","type":2},{"facilityCode":"90021CG","fullName":"徐州市红十字中心血站贾汪分站","name":"徐州市贾汪分站","type":2},{"facilityCode":"90023NB","fullName":"南京红十字血液中心六合分站","name":"南京市六合分站","type":2},{"facilityCode":"90023NC","fullName":"南京红十字血液中心溧水分站","name":"南京市溧水分站","type":2},{"facilityCode":"90023ND","fullName":"南京红十字血液中心高淳分站","name":"南京市高淳分站","type":2},{"facilityCode":"90026KB","fullName":"扬州市中心血站宝应采血点","name":"扬州市宝应采血点","type":2},{"facilityCode":"90026KC","fullName":"扬州市中心血站高邮采血点","name":"扬州市高邮采血点","type":2},{"facilityCode":"90026KD","fullName":"扬州市中心血站江都采血点","name":"扬州市江都采血点","type":2},{"facilityCode":"90026KE","fullName":"扬州市中心血站仪征采血点","name":"扬州市仪征采血点","type":2},{"facilityCode":"90027HB","fullName":"淮安市中心血站涟水采血点","name":"淮安市涟水采血点","type":2},{"facilityCode":"90027HC","fullName":"淮安市中心血站金湖采血点","name":"淮安市金湖采血点","type":2},{"facilityCode":"90027HD","fullName":"淮安市中心血站洪泽采血点","name":"淮安市洪泽采血点","type":2},{"facilityCode":"90027HE","fullName":"淮安市中心血站盱眙采血点","name":"淮安市盱眙采血点","type":2},{"facilityCode":"90027HF","fullName":"淮安市中心血站楚州采血点","name":"淮安市楚州采血点","type":2},{"facilityCode":"90029JB","fullName":"盐城市中心血站东台采血点","name":"盐城市东台采血点","type":2},{"facilityCode":"90029JC","fullName":"盐城市中心血站大丰采血点","name":"盐城市大丰采血点","type":2},{"facilityCode":"90029JD","fullName":"盐城市中心血站射阳采血点","name":"盐城市射阳采血点","type":2},{"facilityCode":"90029JE","fullName":"盐城市中心血站建湖采血点","name":"盐城市建湖采血点","type":2},{"facilityCode":"90029JF","fullName":"盐城市中心血站阜宁采血点","name":"盐城市阜宁采血点","type":2},{"facilityCode":"90029JG","fullName":"盐城市中心血站滨海采血点","name":"盐城市滨海采血点","type":2},{"facilityCode":"90029JH","fullName":"盐城市中心血站响水采血点","name":"盐城市响水采血点","type":2},{"facilityCode":"90030NB","fullName":"宿迁市中心血站沐阳采供血点","name":"宿迁市沐阳采供血点","type":2},{"facilityCode":"90030NC","fullName":"宿迁市中心血站泗阳采供血点","name":"宿迁市泗阳采供血点","type":2},{"facilityCode":"90030ND","fullName":"宿迁市中心血站泗洪采供血点","name":"宿迁市泗洪采供血点","type":2},{"facilityCode":"9002200001","fullName":"苏州大学附属第一医院","name":"苏州大学附属第一医院","type":3},{"facilityCode":"9002200002","fullName":"苏州大学附属第一医院广慈分院","name":"苏州大学附属第一医院广慈分院","type":3},{"facilityCode":"9002200003","fullName":"苏州大学附属儿童医院","name":"苏州大学附属儿童医院","type":3},{"facilityCode":"9002200004","fullName":"苏州大学附属第二医院","name":"苏州大学附属第二医院","type":3},{"facilityCode":"9002200005","fullName":"苏州人民解放军100医院","name":"苏州人民解放军100医院","type":3},{"facilityCode":"9002200006","fullName":"苏州市立医院本部","name":"苏州市立医院本部","type":3},{"facilityCode":"9002200007","fullName":"苏州工业园区星海医院","name":"苏州工业园区星海医院","type":3},{"facilityCode":"9002200008","fullName":"苏州九龙医院","name":"苏州九龙医院","type":3},{"facilityCode":"9002200009","fullName":"苏州市立医院东区","name":"苏州市立医院东区","type":3},{"facilityCode":"9002200010","fullName":"苏州市中医医院","name":"苏州市中医医院","type":3},{"facilityCode":"9002200011","fullName":"相城人民医院","name":"相城人民医院","type":3},{"facilityCode":"9002200012","fullName":"苏州市立医院北区","name":"苏州市立医院北区","type":3},{"facilityCode":"9002200013","fullName":"苏州市中西医结合医院","name":"苏州市中西医结合医院","type":3},{"facilityCode":"9002200014","fullName":"苏州市第五人民医院","name":"苏州市第五人民医院","type":3},{"facilityCode":"9002200015","fullName":"苏州沧浪医院","name":"苏州沧浪医院","type":3},{"facilityCode":"9002200016","fullName":"苏州大学附属瑞华医院","name":"苏州大学附属瑞华医院","type":3},{"facilityCode":"9002200017","fullName":"苏州市吴中人民医院","name":"苏州市吴中人民医院","type":3},{"facilityCode":"9002200018","fullName":"苏州明基医院有限公司","name":"苏州明基医院有限公司","type":3},{"facilityCode":"9002200019","fullName":"苏州市第七人民医院","name":"苏州市第七人民医院","type":3},{"facilityCode":"9002200020","fullName":"苏州科技城医院","name":"苏州科技城医院","type":3},{"facilityCode":"900","fullName":"江苏省全省","name":"江苏省","type":9}]

            $.each(data, function (i, n) {
                        if (facilityCoordinate && facilityCoordinate.hasOwnProperty(n.facilityCode)) {
                            //机构信息（整合）
                            facilityInfo[n.facilityCode] = $.extend(n, facilityCoordinate[n.facilityCode]);
                        }
                    });
                    window.sessionStorage.setItem("facilityInfo", JSON.stringify(facilityInfo));
                // }
            // });
        // }
    // });

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

//获取所有机构坐标信息
    var facilityInfoStr = window.sessionStorage.getItem("facilityInfo");
    if(!facilityInfoStr || !JSON.parse(facilityInfoStr)){
        // util.ajax({
        //     url: './json/facilityCoordinates.json',
        //     async: false,
        //     success: function (facilityCoordinate) {
        var facilityCoordinate = {
            "90017": {
                "name": "江苏省血液中心",
                "x": 118.920759,
                "y": 32.175096,
                "cityName": "江苏省"
            },
            "90018": {
                "name": "常州市中心血站",
                "x": 119.994716,
                "y": 31.764396,
                "cityName": "常州市"
            },
            "90019": {
                "name": "无锡市红十字中心血站",
                "x": 120.311485,
                "y": 31.569462,
                "cityName": "无锡市"
            },
            "90020": {
                "name": "泰州市中心血站",
                "x": 119.926663,
                "y": 32.472535,
                "cityName": "泰州市"
            },
            "90021": {
                "name": "徐州市红十字中心血站",
                "x": 117.181716,
                "y": 34.258631,
                "cityName": "徐州市"
            },
            "90022": {
                "name": "苏州市中心血站",
                "x": 120.637578,
                "y": 31.30762,
                "cityName": "苏州市"
            },
            "90023": {
                "name": "南京红十字血液中心",
                "x": 118.679941,
                "y": 32.0904,
                "cityName": "南京市",
                "alias": "南京"
            },
            "90024": {
                "name": "镇江市中心血站",
                "x": 119.44957,
                "y": 32.193884,
                "cityName": "镇江市"
            },
            "90025": {
                "name": "连云港市红十字中心血站",
                "x": 119.197382,
                "y": 34.59524,
                "cityName": "连云港市"
            },
            "90026": {
                "name": "扬州市中心血站",
                "x": 119.453082,
                "y": 32.430077,
                "cityName": "扬州市"
            },
            "90027": {
                "name": "淮安市中心血站",
                "x": 119.016042,
                "y": 33.604915,
                "cityName": "淮安市"
            },
            "90028": {
                "name": "南通市中心血站",
                "x": 120.897222,
                "y": 31.999889,
                "cityName": "南通市"
            },
            "90029": {
                "name": "盐城市中心血站",
                "x": 120.131035,
                "y": 33.368145,
                "cityName": "盐城市"
            },
            "90030": {
                "name": "宿迁市中心血站",
                "x": 118.28041,
                "y": 33.959786,
                "cityName": "宿迁市"
            },
            "90018DB": {
                "name": "常州市中心血站金坛分站",
                "x": 119.58983,
                "y": 31.739356,
                "cityName": "常州金坛"
            },
            "90018DC": {
                "name": "常州市中心血站溧阳分站",
                "x": 119.4649,
                "y": 31.430388,
                "cityName": "常州溧阳"
            },
            "90019BB": {
                "name": "无锡市红十字中心血站江阴分站",
                "x": 120.30772,
                "y": 31.920422,
                "cityName": "无锡江阴"
            },
            "90019BC": {
                "name": "无锡市红十字中心血站宜兴分站",
                "x": 119.829102,
                "y": 31.351228,
                "cityName": "无锡宜兴"
            },
            "90020ME": {
                "name": "泰州市中心血站靖江分站",
                "x": 120.285266,
                "y": 32.040202,
                "cityName": "泰州靖江"
            },
            "90022EC": {
                "name": "苏州市中心血站常熟分站",
                "x": 120.758421,
                "y": 31.649972,
                "cityName": "苏州常熟"
            },
            "90022EF": {
                "name": "苏州市中心血站张家港分站",
                "x": 120.550686,
                "y": 31.867699,
                "cityName": "苏州张家港"
            },
            "90022EJ": {
                "name": "苏州市中心血站太仓市分站",
                "x": 121.113836,
                "y": 31.452932,
                "cityName": "苏州太仓"
            },
            "90022EM": {
                "name": "苏州市中心血站昆山市分站",
                "x": 120.967715,
                "y": 31.385029,
                "cityName": "苏州昆山"
            },
            "90022ET": {
                "name": "苏州市中心血站吴江市分站",
                "x": 120.648653,
                "y": 31.167853,
                "cityName": "苏州吴江"
            },
            "90024LD": {
                "name": "镇江市中心血站丹阳分站",
                "x": 119.560576,
                "y": 32.001658,
                "cityName": "镇江丹阳"
            },
            "90028FB": {
                "name": "南通市中心血站如皋分站",
                "x": 120.548067,
                "y": 32.39497,
                "cityName": "南通如皋"
            },
            "90028FC": {
                "name": "南通市中心血站通州分站",
                "x": 121.079465,
                "y": 32.100464,
                "cityName": "南通通州"
            },
            "90020MB": {
                "name": "泰州市中心血站姜堰采血点",
                "x": 120.160725,
                "y": 32.51992,
                "cityName": "泰州姜堰"
            },
            "90020MC": {
                "name": "泰州市中心血站兴化采血点",
                "x": 119.850683,
                "y": 32.94206,
                "cityName": "泰州兴化"
            },
            "90020MD": {
                "name": "泰州市中心血站泰兴采血点",
                "x": 120.021939,
                "y": 32.171285,
                "cityName": "泰州泰兴"
            },
            "90020MF": {
                "name": "泰州市中心血站泰州采血点",
                "x": 119.886172,
                "y": 32.310204,
                "cityName": "泰州泰州"
            },
            "90021CB": {
                "name": "徐州市红十字中心血站丰县分站",
                "x": 116.59756,
                "y": 34.699379,
                "cityName": "徐州丰县"
            },
            "90021CC": {
                "name": "徐州市红十字中心血站沛县分站",
                "x": 116.950028,
                "y": 34.727954,
                "cityName": "徐州沛县"
            },
            "90021CD": {
                "name": "徐州市红十字中心血站新沂分站",
                "x": 118.355836,
                "y": 34.354343,
                "cityName": "徐州新沂"
            },
            "90021CE": {
                "name": "徐州市红十字中心血站邳州分站",
                "x": 118.021304,
                "y": 34.3431,
                "cityName": "徐州邳州"
            },
            "90021CG": {
                "name": "徐州市红十字中心血站贾汪分站",
                "x": 117.456042,
                "y": 34.441714,
                "cityName": "徐州贾汪"
            },
            "90023NB": {
                "name": "南京红十字血液中心六合分站",
                "x": 118.851294,
                "y": 32.34915,
                "cityName": "南京六合",
                "alias": "南京"
            },
            "90023NC": {
                "name": "南京红十字血液中心溧水分站",
                "x": 119.03987,
                "y": 31.63693,
                "cityName": "南京溧水",
                "alias": "南京"
            },
            "90023ND": {
                "name": "南京红十字血液中心高淳分站",
                "x": 118.876105,
                "y": 31.328251,
                "cityName": "南京高淳",
                "alias": "南京"
            },
            "90026KB": {
                "name": "扬州市中心血站宝应采血点",
                "x": 119.324081,
                "y": 33.248911,
                "cityName": "扬州宝应"
            },
            "90026KC": {
                "name": "扬州市中心血站高邮采血点",
                "x": 119.426646,
                "y": 33.010896,
                "cityName": "扬州高邮"
            },
            "90026KD": {
                "name": "扬州市中心血站江都采血点",
                "x": 119.569289,
                "y": 32.435258,
                "cityName": "扬州江都"
            },
            "90026KE": {
                "name": "扬州市中心血站仪征采血点",
                "x": 119.196678,
                "y": 32.293335,
                "cityName": "扬州仪征"
            },
            "90027HB": {
                "name": "淮安市中心血站涟水采血点",
                "x": 119.270778,
                "y": 33.765352,
                "cityName": "淮安涟水"
            },
            "90027HC": {
                "name": "淮安市中心血站金湖采血点",
                "x": 119.001289,
                "y": 33.028545,
                "cityName": "淮安金湖"
            },
            "90027HD": {
                "name": "淮安市中心血站洪泽采血点",
                "x": 118.882348,
                "y": 33.295237,
                "cityName": "淮安洪泽"
            },
            "90027HE": {
                "name": "淮安市中心血站盱眙采血点",
                "x": 118.522429,
                "y": 32.997877,
                "cityName": "淮安盱眙"
            },
            "90027HF": {
                "name": "淮安市中心血站楚州采血点",
                "x": 119.179108,
                "y": 33.538844,
                "cityName": "淮安楚州"
            },
            "90028FD": {
                "name": "南通市中心血站海安采血点",
                "x": 120.452297,
                "y": 32.469588,
                "cityName": "南通海安"
            },
            "90028FE": {
                "name": "南通市中心血站如东采血点",
                "x": 121.180698,
                "y": 32.317703,
                "cityName": "南通如东"
            },
            "90028FF": {
                "name": "南通市中心血站启东采血点",
                "x": 121.667679,
                "y": 31.819587,
                "cityName": "南通启东"
            },
            "90028FG": {
                "name": "南通市中心血站海门采血点",
                "x": 121.176879,
                "y": 31.897441,
                "cityName": "南通海门"
            },
            "90029JB": {
                "name": "盐城市中心血站东台采血点",
                "x": 120.338602,
                "y": 32.847685,
                "cityName": "盐城东台"
            },
            "90029JC": {
                "name": "盐城市中心血站大丰采血点",
                "x": 120.456922,
                "y": 33.204402,
                "cityName": "盐城大丰"
            },
            "90029JD": {
                "name": "盐城市中心血站射阳采血点",
                "x": 120.26524,
                "y": 33.776171,
                "cityName": "盐城射阳"
            },
            "90029JE": {
                "name": "盐城市中心血站建湖采血点",
                "x": 119.7975,
                "y": 33.44288,
                "cityName": "盐城建湖"
            },
            "90029JF": {
                "name": "盐城市中心血站阜宁采血点",
                "x": 119.807521,
                "y": 33.767025,
                "cityName": "盐城阜宁"
            },
            "90029JG": {
                "name": "盐城市中心血站滨海采血点",
                "x": 119.844493,
                "y": 34.002444,
                "cityName": "盐城滨海"
            },
            "90029JH": {
                "name": "盐城市中心血站响水采血点",
                "x": 119.587526,
                "y": 34.20864,
                "cityName": "盐城响水"
            },
            "90030NB": {
                "name": "宿迁市中心血站沐阳采供血点",
                "x": 119.062937,
                "y": 34.286546,
                "cityName": "宿迁沐阳"
            },
            "90030NC": {
                "name": "宿迁市中心血站泗阳采供血点",
                "x": 118.689458,
                "y": 33.712928,
                "cityName": "宿迁泗阳"
            },
            "90030ND": {
                "name": "宿迁市中心血站泗洪采供血点",
                "x": 118.203592,
                "y": 33.462241,
                "cityName": "宿迁泗洪"
            }
        }

        // 获取所有机构
                // util.ajax({
                //     url: util.domain + '/service/dashboard/dicts/facility',
                //     async: false,
                //     success: function (data) {
                        var data = [{"facilityCode":"90017","fullName":"江苏省血液中心","name":"省血液中心","type":0},{"facilityCode":"90018","fullName":"常州市中心血站","name":"常州市","type":0},{"facilityCode":"90019","fullName":"无锡市红十字中心血站","name":"无锡市","type":0},{"facilityCode":"90020","fullName":"泰州市中心血站","name":"泰州市","type":0},{"facilityCode":"90021","fullName":"徐州市红十字中心血站","name":"徐州市","type":0},{"facilityCode":"90022","fullName":"苏州市中心血站","name":"苏州市","type":0},{"facilityCode":"90023","fullName":"南京红十字血液中心","name":"南京市","type":0},{"facilityCode":"90024","fullName":"镇江市中心血站","name":"镇江市","type":0},{"facilityCode":"90025","fullName":"连云港市红十字中心血站","name":"连云港市","type":0},{"facilityCode":"90026","fullName":"扬州市中心血站","name":"扬州市","type":0},{"facilityCode":"90027","fullName":"淮安市中心血站","name":"淮安市","type":0},{"facilityCode":"90028","fullName":"南通市中心血站","name":"南通市","type":0},{"facilityCode":"90029","fullName":"盐城市中心血站","name":"盐城市","type":0},{"facilityCode":"90030","fullName":"宿迁市中心血站","name":"宿迁市","type":0},{"facilityCode":"90018DB","fullName":"常州市中心血站金坛分站","name":"常州市金坛分站","type":1},{"facilityCode":"90018DC","fullName":"常州市中心血站溧阳分站","name":"常州市溧阳分站","type":1},{"facilityCode":"90019BB","fullName":"无锡市红十字中心血站江阴分站","name":"无锡市江阴分站","type":1},{"facilityCode":"90019BC","fullName":"无锡市红十字中心血站宜兴分站","name":"无锡市宜兴分站","type":1},{"facilityCode":"90020ME","fullName":"泰州市中心血站靖江分站","name":"泰州市靖江分站","type":1},{"facilityCode":"90022EC","fullName":"苏州市中心血站常熟分站","name":"苏州市常熟分站","type":1},{"facilityCode":"90022EF","fullName":"苏州市中心血站张家港分站","name":"苏州市张家港分站","type":1},{"facilityCode":"90022EJ","fullName":"苏州市中心血站太仓市分站","name":"苏州市太仓市分站","type":1},{"facilityCode":"90022EM","fullName":"苏州市中心血站昆山市分站","name":"苏州市昆山市分站","type":1},{"facilityCode":"90022ET","fullName":"苏州市中心血站吴江市分站","name":"苏州市吴江市分站","type":1},{"facilityCode":"90024LD","fullName":"镇江市中心血站丹阳分站","name":"镇江市丹阳分站","type":1},{"facilityCode":"90028FB","fullName":"南通市中心血站如皋分站","name":"南通市如皋分站","type":1},{"facilityCode":"90028FC","fullName":"南通市中心血站通州分站","name":"南通市通州分站","type":1},{"facilityCode":"90028FD","fullName":"南通市中心血站海安采血点","name":"南通市海安采血点","type":1},{"facilityCode":"90028FE","fullName":"南通市中心血站如东采血点","name":"南通市如东采血点","type":1},{"facilityCode":"90028FF","fullName":"南通市中心血站启东采血点","name":"南通市启东采血点","type":1},{"facilityCode":"90028FG","fullName":"南通市中心血站海门采血点","name":"南通市海门采血点","type":1},{"facilityCode":"90020MB","fullName":"泰州市中心血站姜堰采血点","name":"泰州市姜堰采血点","type":2},{"facilityCode":"90020MC","fullName":"泰州市中心血站兴化采血点","name":"泰州市兴化采血点","type":2},{"facilityCode":"90020MD","fullName":"泰州市中心血站泰兴采血点","name":"泰州市泰兴采血点","type":2},{"facilityCode":"90020MF","fullName":"泰州市中心血站泰州采血点","name":"泰州市泰州采血点","type":2},{"facilityCode":"90021CB","fullName":"徐州市红十字中心血站丰县分站","name":"徐州市丰县分站","type":2},{"facilityCode":"90021CC","fullName":"徐州市红十字中心血站沛县分站","name":"徐州市沛县分站","type":2},{"facilityCode":"90021CD","fullName":"徐州市红十字中心血站新沂分站","name":"徐州市新沂分站","type":2},{"facilityCode":"90021CE","fullName":"徐州市红十字中心血站邳州分站","name":"徐州市邳州分站","type":2},{"facilityCode":"90021CG","fullName":"徐州市红十字中心血站贾汪分站","name":"徐州市贾汪分站","type":2},{"facilityCode":"90023NB","fullName":"南京红十字血液中心六合分站","name":"南京市六合分站","type":2},{"facilityCode":"90023NC","fullName":"南京红十字血液中心溧水分站","name":"南京市溧水分站","type":2},{"facilityCode":"90023ND","fullName":"南京红十字血液中心高淳分站","name":"南京市高淳分站","type":2},{"facilityCode":"90026KB","fullName":"扬州市中心血站宝应采血点","name":"扬州市宝应采血点","type":2},{"facilityCode":"90026KC","fullName":"扬州市中心血站高邮采血点","name":"扬州市高邮采血点","type":2},{"facilityCode":"90026KD","fullName":"扬州市中心血站江都采血点","name":"扬州市江都采血点","type":2},{"facilityCode":"90026KE","fullName":"扬州市中心血站仪征采血点","name":"扬州市仪征采血点","type":2},{"facilityCode":"90027HB","fullName":"淮安市中心血站涟水采血点","name":"淮安市涟水采血点","type":2},{"facilityCode":"90027HC","fullName":"淮安市中心血站金湖采血点","name":"淮安市金湖采血点","type":2},{"facilityCode":"90027HD","fullName":"淮安市中心血站洪泽采血点","name":"淮安市洪泽采血点","type":2},{"facilityCode":"90027HE","fullName":"淮安市中心血站盱眙采血点","name":"淮安市盱眙采血点","type":2},{"facilityCode":"90027HF","fullName":"淮安市中心血站楚州采血点","name":"淮安市楚州采血点","type":2},{"facilityCode":"90029JB","fullName":"盐城市中心血站东台采血点","name":"盐城市东台采血点","type":2},{"facilityCode":"90029JC","fullName":"盐城市中心血站大丰采血点","name":"盐城市大丰采血点","type":2},{"facilityCode":"90029JD","fullName":"盐城市中心血站射阳采血点","name":"盐城市射阳采血点","type":2},{"facilityCode":"90029JE","fullName":"盐城市中心血站建湖采血点","name":"盐城市建湖采血点","type":2},{"facilityCode":"90029JF","fullName":"盐城市中心血站阜宁采血点","name":"盐城市阜宁采血点","type":2},{"facilityCode":"90029JG","fullName":"盐城市中心血站滨海采血点","name":"盐城市滨海采血点","type":2},{"facilityCode":"90029JH","fullName":"盐城市中心血站响水采血点","name":"盐城市响水采血点","type":2},{"facilityCode":"90030NB","fullName":"宿迁市中心血站沐阳采供血点","name":"宿迁市沐阳采供血点","type":2},{"facilityCode":"90030NC","fullName":"宿迁市中心血站泗阳采供血点","name":"宿迁市泗阳采供血点","type":2},{"facilityCode":"90030ND","fullName":"宿迁市中心血站泗洪采供血点","name":"宿迁市泗洪采供血点","type":2},{"facilityCode":"9002200001","fullName":"苏州大学附属第一医院","name":"苏州大学附属第一医院","type":3},{"facilityCode":"9002200002","fullName":"苏州大学附属第一医院广慈分院","name":"苏州大学附属第一医院广慈分院","type":3},{"facilityCode":"9002200003","fullName":"苏州大学附属儿童医院","name":"苏州大学附属儿童医院","type":3},{"facilityCode":"9002200004","fullName":"苏州大学附属第二医院","name":"苏州大学附属第二医院","type":3},{"facilityCode":"9002200005","fullName":"苏州人民解放军100医院","name":"苏州人民解放军100医院","type":3},{"facilityCode":"9002200006","fullName":"苏州市立医院本部","name":"苏州市立医院本部","type":3},{"facilityCode":"9002200007","fullName":"苏州工业园区星海医院","name":"苏州工业园区星海医院","type":3},{"facilityCode":"9002200008","fullName":"苏州九龙医院","name":"苏州九龙医院","type":3},{"facilityCode":"9002200009","fullName":"苏州市立医院东区","name":"苏州市立医院东区","type":3},{"facilityCode":"9002200010","fullName":"苏州市中医医院","name":"苏州市中医医院","type":3},{"facilityCode":"9002200011","fullName":"相城人民医院","name":"相城人民医院","type":3},{"facilityCode":"9002200012","fullName":"苏州市立医院北区","name":"苏州市立医院北区","type":3},{"facilityCode":"9002200013","fullName":"苏州市中西医结合医院","name":"苏州市中西医结合医院","type":3},{"facilityCode":"9002200014","fullName":"苏州市第五人民医院","name":"苏州市第五人民医院","type":3},{"facilityCode":"9002200015","fullName":"苏州沧浪医院","name":"苏州沧浪医院","type":3},{"facilityCode":"9002200016","fullName":"苏州大学附属瑞华医院","name":"苏州大学附属瑞华医院","type":3},{"facilityCode":"9002200017","fullName":"苏州市吴中人民医院","name":"苏州市吴中人民医院","type":3},{"facilityCode":"9002200018","fullName":"苏州明基医院有限公司","name":"苏州明基医院有限公司","type":3},{"facilityCode":"9002200019","fullName":"苏州市第七人民医院","name":"苏州市第七人民医院","type":3},{"facilityCode":"9002200020","fullName":"苏州科技城医院","name":"苏州科技城医院","type":3},{"facilityCode":"900","fullName":"江苏省全省","name":"江苏省","type":9}]
                        $.each(data, function (i, n) {
                            if (facilityCoordinate && facilityCoordinate.hasOwnProperty(n.facilityCode)) {
                                //机构信息（整合）
                                facilityInfo[n.facilityCode] = $.extend(n, facilityCoordinate[n.facilityCode]);
                            }
                        });
                        window.sessionStorage.setItem("facilityInfo", JSON.stringify(facilityInfo));
                    // }
                // });
            // }
        // });
    }else{
        facilityInfo = JSON.parse(facilityInfoStr);
    };
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
///////////////////todo 滚动新闻
    //近一个月
    var startTime = util.formatDate(new Date(new Date().getTime()- 1000*60*60*24*30),"yyyy-MM-dd HH:mm:ss");
    var endTime = util.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss");
    // $.get("http://192.168.20.250:3000/service/dashboard/statistics/hv/eventList_query",
        // {
        //     startTime:startTime,
        //     endTime:endTime
        // },
        // function(resp){
        //过滤无效数据
    var eventList_query =[{"level":"LGT","type":"输血反应","facility":"9002200001","time":"2017-06-21T03:10:18.000Z","status":"NOR"},{"level":"LGT","type":"输血反应","facility":"9002200001","time":"2017-06-21T03:10:08.000Z","status":"NOR"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T09:41:05.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9001800001","time":"2017-06-16T09:00:52.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9001800001","time":"2017-06-16T08:47:20.000Z","status":"CPT"},{"level":"SER","type":"血液安全事件","facility":"90022","time":"2017-06-16T08:34:41.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T08:17:08.000Z","status":"CPT"},{"level":"SER","type":"血液安全事件","facility":"90017","time":"2017-06-16T07:17:45.000Z","status":"CPT"},{"level":null,"type":"献血者传染病地理分布","facility":"90017","time":"2017-06-16T07:16:52.000Z","status":"NOR"},{"level":null,"type":"献血者传染病地理分布","facility":"90022","time":"2017-06-16T07:05:56.000Z","status":"NOR"},{"level":"MDT","type":"角膜生物","facility":"9002200001","time":"2017-06-16T06:32:22.000Z","status":"CPT"},{"level":"MDT","type":"职业暴露","facility":"9002200001","time":"2017-06-16T06:22:25.000Z","status":"CPT"},{"level":"MDT","type":"幸免事件","facility":"9002200001","time":"2017-06-16T06:07:46.000Z","status":"CPT"},{"level":"LGT","type":"不良事件","facility":"9002200001","time":"2017-06-16T05:48:37.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T05:35:28.000Z","status":"CPT"},{"level":"MDT","type":"献血反应","facility":"90022","time":"2017-06-16T03:35:45.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T02:55:39.000Z","status":"CPT"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T02:53:35.000Z","status":"REP"},{"level":"MDT","type":"输血反应","facility":"9002200001","time":"2017-06-16T02:36:41.000Z","status":"CPT"},{"level":"LGT","type":"输血反应","facility":"9002200001","time":"2017-06-16T02:18:33.000Z","status":"CPT"}]
        eventList_query = eventList_query.filter(function(item){
                return item.facility != "test" && item.level && item.level!="CNF";
            });
            //map data
            var mapData = [],mapRegion = [],mapRegionObj = {};
            //近一个月监控事件
            $("#systemRunMonthTotal").text(eventList_query.length);
            //近一个月严重事件
            var nearlyMonthSER = 0;
            //事件级别统计数据
            var lgt = 0,mdt = 0,ser=0;
            //事件类型统计
           var eventType = [],eventTypeObj = {},warningQuantityChartData = [];
           //line chart data
            var lineTitle = "";
            $.each(eventList_query,function(i,d){

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
            $.each(eventList_query,function(i,d){
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
                $.each(eventList_query,function(j,v){
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
                console.log("lineChartData-->",JSON.stringify(lineChartData));
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
    // }
    // );
})


