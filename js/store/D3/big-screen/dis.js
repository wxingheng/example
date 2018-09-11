//全局变量，机构详细详细2
var facilityInfo = {};
var bulidMap3 = null;
var series = null;
//血液库存与调剂数据对象
var bloodStoreData = {rbc: [], plt:[], plm:[], crp:[]};
var dispatchData = {rbc: [], plt:[], plm:[], crp:[]};
var pointData = {rbc: [], plt:[], plm:[], crp:[]};
//获取数据期限
var getDay = 14;
//血型选择字典
var bloodgroups = ['a', 'b', 'o', 'ab'];
//默认血型
var default_bloodgroup = 'amount'; //ABO总计
//品种选择字典
var bloodtypes = ['rbc', 'plt', 'plm', 'crp'];
//品种单位字典
var bloodtypesunit = ['U', '治疗量', 'mL', 'U'];
//分界值数组
var boundList={
    "rbc":{
        "value1":1000,
        "value2":3000,
        "value3":5000,
        "value4":8000
    },
    "plt":{
        "value1":50,
        "value2":100,
        "value3":200,
        "value4":500
    },
    "plm":{
        "value1":5000,
        "value2":10000,
        "value3":15000,
        "value4":20000
    },
    "crp":{
        "value1":1000,
        "value2":2000,
        "value3":3000,
        "value4":5000
    }
};

//当前查询的品种
var curBloodTypeIndex = 0;
//默认品种
var default_bloodtype = bloodtypes[curBloodTypeIndex];
var selectedBloodType; //当前查询品种对象
var selectedBound;

var nextBloodType = function(){
    if(curBloodTypeIndex >= bloodtypes.length-1){
        curBloodTypeIndex = 0;
    }else{
        curBloodTypeIndex++;
    }
    default_bloodtype = bloodtypes[curBloodTypeIndex];
};
var prevBloodType = function(){
    if(curBloodTypeIndex <= 0){
        curBloodTypeIndex = bloodtypes.length-1;
    }else{
        curBloodTypeIndex--;
    }
    default_bloodtype = bloodtypes[curBloodTypeIndex];
};

var screenwidth=window.screen.width;
var symbolsize_store=8;
var symbolsize_city=8;
var symbolsize_line=7;
var fontsize_city=15;
var fontsize_value=13;

if(screenwidth>=1920){
    symbolsize_store=10;
    symbolsize_city=10;
    symbolsize_line=8;
    fontsize_city=16;
    fontsize_value=14;
}

//切换品种
function selectBloodType(selectedindex){
    selectedBloodType=$(".selectItemList ul li:eq("+selectedindex+")");
    selectedBloodType.find(".listName").css("color","#ffffff");
    selectedBloodType.find(".listIcon").show();
    selectedBloodType.siblings().find(".listName").css("color","#5e6e84");
    selectedBloodType.siblings().find(".listIcon").hide();

    //lengend赋值
    selectedBound=boundList[bloodtypes[curBloodTypeIndex]];
    var unit=bloodtypesunit[curBloodTypeIndex];
    var lengendstring="<p>1-"+selectedBound.value1+unit+"</p>" +
      "<p>"+selectedBound.value1.toString()+"-"+selectedBound.value2.toString()+unit+"</p>" +
      "<p>"+selectedBound.value2.toString()+"-"+selectedBound.value3.toString()+unit+"</p>" +
      "<p>"+selectedBound.value3.toString()+"-"+selectedBound.value4.toString()+unit+"</p>" +
      "<p>≥"+selectedBound.value4.toString()+unit+"</p>";
    $(".lengendContent").html(lengendstring);
}

$(function () {
    var loadedPercent = 50;

    var addloadedPercent = function(toadd){
        if(parseInt(toadd) > 0){
            loadedPercent += parseInt(toadd);
        }
        if(document.getElementById('loader-wrapper')!=null){
            loadedEffect.load(loadedPercent);
            if(loadedPercent >= 100){
                loadedEffect.remove();
            }
        }

    };

    addloadedPercent(10);

    //各个城市储血量
    var bloodstore = [];
    //日志集合
    var logs = [];
    //统计数据
    var statistics = [];

    var arrowPath = 'path://M313.237,436.818c-1.59-0.001-29.504-0.013-30.602-0.014  c-1.423,0-2.471-1.543-1.628-3.066c0.675-1.222,14.292-25.627,15.456-27.709c0.765-1.368,2.567-1.344,3.315,0.001  c0.834,1.5,14.191,26.01,15.119,27.785C315.577,435.114,314.805,436.818,313.237,436.818z';

    // 地图对象
    bulidMap3 = echarts.init(document.getElementById("map3"));
    bulidMap3.hideLoading();

    var option3 = {
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
            top: 25,
            bottom :35,
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

    bulidMap3.setOption(option3);

    function getRealFacilityCode(facility){
        if (facilityInfo.hasOwnProperty(facility)) {
            return facility;
        } else if (facilityInfo.hasOwnProperty(facility.substring(0, 5))) {
            return facility.substring(0, 5);
        } else {
            return facility;
        }
    }

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

    // 通过value计算color
    function converColor(value){

        if (value >= selectedBound.value4) {
            return 'rgba(101,28,238,1)';
        } else if (value >= selectedBound.value3) {
            return 'rgba(116,68,206,1)';
        } else if (value >= selectedBound.value2) {
            return 'rgba(1,149,255,1)';
        } else if (value >= selectedBound.value1) {
            return 'rgba(0,216,255,1)';
        } else if(value>=0){
            return 'rgba(8,233,201,1)';
        }
        else if(value==0){
            return '#5e6e84';
        }
    }

    var setBulidMap3 = function(getDay, default_bloodtype, default_bloodgroup){

        var bloodStoreAjax = util.ajax({
            url: util.domain + '/service/dashboard/statistics/bloodstore/typesumbycity?type=all',
            async: true
        });

        var dispatchAjax = util.ajax({
            url: util.domain + '/service/dashboard/records/dispatch?' + util.prox(getDay),
            async: true
        });

        $.when( bloodStoreAjax, dispatchAjax ).done(function ( data1, data2 ) {
            var stores = data1[0];
            var dispatchs = data2[0];

            var facilityStore_hash = {rbc: {}, plt:{}, plm:{}, crp:{}}; // 映射库存需要
            var points_hash = {rbc: {}, plt:{}, plm:{}, crp:{}}; // 排重需要的HASH MAP
            var dispatch_map = {rbc: {}, plt:{}, plm:{}, crp:{}}; // 同个调拨路径的 MAP

            // 库存数据
            $.each(stores, function (i, n) {
                if(n.type){
                    facilityStore_hash[n.type][n.facility] = n[default_bloodgroup];
                }
            });

            // 调剂数据
            $.each(dispatchs, function (j, m) {
                var bloodType = '';
                if(m.subType.lastIndexOf('红') >= 0){
                    bloodType = 'rbc';
                }else if(m.subType.lastIndexOf('血小板') >= 0){
                    bloodType = 'plt';
                }else if(m.subType.lastIndexOf('浆') >= 0){
                    bloodType = 'plm';
                }else if(m.subType.lastIndexOf('沉淀') >= 0){
                    bloodType = 'crp';
                }
                if(bloodType){
                    var t = [];
                    var stationFrom = m.stationFrom;
                    //if(!facilityInfo.hasOwnProperty(stationFrom) && facilityInfo.hasOwnProperty(stationFrom.substring(0, 5))){
                    stationFrom = stationFrom.substring(0, 5);
                    //}
                    var stationTo = m.stationTo;
                    //if(!facilityInfo.hasOwnProperty(stationTo) && facilityInfo.hasOwnProperty(stationTo.substring(0, 5))){
                    stationTo = stationTo.substring(0, 5);
                    //}
                    // 已经有相同路径的调剂数据
                    if(dispatch_map[bloodType].hasOwnProperty(stationFrom+''+stationTo)){
                        var _index = dispatch_map[bloodType][stationFrom+''+stationTo];
                        dispatchData[bloodType][_index][0].value += m.amount;
                        dispatchData[bloodType][_index][1].value += m.amount;
                    }else{
                        if (facilityInfo.hasOwnProperty(stationFrom)) {
                            t.push({name: facilityInfo[stationFrom].cityName, coord: [facilityInfo[stationFrom].x, facilityInfo[stationFrom].y], value: m.amount});
                            if (!points_hash[bloodType].hasOwnProperty(stationFrom)) {
                                pointData[bloodType].push({name: facilityInfo[stationFrom].cityName, value: [facilityInfo[stationFrom].x, facilityInfo[stationFrom].y,facilityStore_hash[bloodType][stationFrom]]});
                                points_hash[bloodType][stationFrom] = true;
                            }
                        }
                        if (facilityInfo.hasOwnProperty(stationTo)) {
                            t.push({name: facilityInfo[stationTo].cityName, coord: [facilityInfo[stationTo].x, facilityInfo[stationTo].y], value: m.amount});
                            if (!points_hash[bloodType].hasOwnProperty(stationTo)) {
                                pointData[bloodType].push({name: facilityInfo[stationTo].cityName, value: [facilityInfo[stationTo].x, facilityInfo[stationTo].y, facilityStore_hash[bloodType][stationTo]]});
                                points_hash[bloodType][stationTo] = true;
                            }
                        }
                        dispatchData[bloodType].push(t);
                        dispatch_map[bloodType][stationFrom+''+stationTo] = dispatchData[bloodType].length-1;
                    }
                }
            });

            for(var i in dispatchData){
                var n = dispatchData[i];
                if (n.length > 0) {
                    var temp = n;
                    dispatchData[i] = [];
                    $.each(temp, function (j, d) {
                        var m = {
                            coords: [
                                d[0].coord, d[1].coord
                            ],
                            name: d[0].name,
                            value: d[0].value
                        };
                        dispatchData[i].push(m);
                    });
                }
            }

            // 库存数据
            $.each(stores, function (k, o) {
                if(!points_hash[o.type].hasOwnProperty(o.facility)){ // 排除与调剂节点重复的点

                    bloodStoreData[o.type].push({
                        name: facilityInfo[o.facility].cityName,
                        value: [facilityInfo[o.facility].x, facilityInfo[o.facility].y, o[default_bloodgroup]]
                    });
                }
            });

            setBulidMap3Series(bloodStoreData[default_bloodtype], pointData[default_bloodtype], dispatchData[default_bloodtype]);

            addloadedPercent(10);
        });

        selectBloodType(curBloodTypeIndex);
    };

    var  setBulidMap3Series = function(bloodStore, points, dispatch){
        series = [];
        // 地图库存数据
        series.push({
            name: '红细胞类血液库存',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: bloodStore,
            symbolSize: symbolsize_store,
            roam: false,  //鼠标缩放
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: true,
                    textStyle: {
                        color: '#5e6e84',
                        //fontFamily: 'SimHei',
                        fontSize: fontsize_city,
                        fontWeight: 'bold'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function (item) {
                        return converColor(item.value[2]);
                    },
                    shadowColor: 'rgba(255,255,255,0.3)',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 15
                }
            }
        });

        // 地图调剂的节点数据
        series.push({
            name: '红细胞类血液调剂城市',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: points,
            symbolSize: symbolsize_city,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke'
            },
            roam: false,  //鼠标缩放
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'top',
                    show: true,
                    textStyle: {
                        //fontFamily: 'SimHei',
                        fontSize: fontsize_city,
                        fontWeight: 'bold'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: function (item) {
                        return converColor(item.value[2]);
                    }
                }
            }
        });
        // 地图调剂的路径数据
        series.push({
            name: '红细胞类血液调剂路线',
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 5,
                symbol: 'arrow', //arrow circle arrowPath
                symbolSize: symbolsize_line,
                color: 'rgba(8,233,201,1)', //
                trailLength: 0 // 0.1
            },
            lineStyle: {
                normal: {
                    color : 'rgba(6,235,200,1)',
                    //type: 'dotted', //dotted dashed
                    width: 1.5,
                    opacity: 0.5,
                    curveness: 0.5
                }
            },
            label: {
                normal:{
                    show: true,
                    formatter: '{c}'+bloodtypesunit[curBloodTypeIndex],
                    textStyle: {
                        //fontFamily: 'SimHei',
                        //fontWeight: 'bold',
                        fontSize: fontsize_value
                    },
                    position: 'middle'
                }
            },
            animation: false,
            data: dispatch
        });

        bulidMap3.setOption({series: series});
    };

    var updateBulidMap3 = function(default_bloodtype){
        selectBloodType(curBloodTypeIndex);
        setBulidMap3Series(bloodStoreData[default_bloodtype], pointData[default_bloodtype], dispatchData[default_bloodtype]);
    };

    bulidMap3.nextView = function(){
        nextBloodType();
        updateBulidMap3(default_bloodtype);
    };
    bulidMap3.prevView = function(){
        prevBloodType();
        updateBulidMap3(default_bloodtype);
    };
    bulidMap3.loadView = function(index){
        curBloodTypeIndex = index;
        default_bloodtype = bloodtypes[curBloodTypeIndex];
        updateBulidMap3(default_bloodtype);
    };

    window.addEventListener('btnUp', bulidMap3.prevView, false);
    window.addEventListener('btnDown', bulidMap3.nextView, false);

    $(".selectItemList ul li").click(function(){
        bulidMap3.loadView($(this).index());
    });

    function initstatistics() {

        //初始化统计数据
        util.ajax({
            url: util.domain + '/service/dashboard/statistics/dispatch/bybloodsubtype?' + util.prox(getDay),
            async: true,
            success: function (statistics) {
                var temp = [];
                if (statistics.length > 0) {
                    for (var i = 0; i < statistics.length; i++) {
                        if (temp.length > 0) {
                            var flag = false;
                            for (var j = 0; j < temp.length; j++) {
                                if (temp[j].subType === statistics[i].subType) {
                                    temp[j].amount = temp[j].amount + statistics[i].amount;
                                    temp[j].amount1 = temp[j].amount1 + statistics[i].amount1;
                                    temp[j].amount2 = temp[j].amount2 + statistics[i].amount2;
                                    temp[j].amount3 = temp[j].amount3 + statistics[i].amount3;
                                    temp[j].amount4 = temp[j].amount4 + statistics[i].amount4;
                                    flag = true;
                                }
                            }
                            if (!flag) {
                                temp.push(statistics[i]);
                            }
                        } else {
                            temp.push(statistics[i]);
                        }

                        //if(statistics[i].bloodGroup.toLowerCase()==type){
                        //	temp.push(statistics[i]);
                        //}
                    }
                }

                var endTime = util.formatDate(new Date(), "hh:mm:ss");
                $("#statisticsTemplateDiv").html(_.template($('#statisticsTemplate').html(), {
                    "datas": temp,
                    "endTime": endTime,
                    "getDay": getDay
                }));
                createMarquee({
                    duration: 50000,
                    //padding:20,
                    marquee_class: '.marquee',
                    container_class: '.scroll-inner',
                    hover: false
                });

                addloadedPercent(10);
            }

        });

    }

    var dispatchEvents = [];
    //初始化日志数据
    function initEvents(){
        util.ajax({
            url: util.domain + '/service/dashboard/events/dispatch?' + util.prox(getDay),
            async: false,
            success: function (resp) {
                $.each(resp, function (i, d) {

                    if (facilityInfo.hasOwnProperty(d.facility)) {
                        d.cityName = facilityInfo[d.facility].cityName;
                        d.name = facilityInfo[d.facility].name;
                    } else if (facilityInfo.hasOwnProperty(d.facility.substring(0, 5))) {
                        d.cityName = facilityInfo[d.facility.substring(0, 5)].cityName;
                        d.name = facilityInfo[d.facility.substring(0, 5)].name;
                    }
                    logs.push(d);
                });

                //返回数据需要自己写
                for (var i in logs) {
                    var n = logs[i];
                    if (n.dispatchType == 3) { // 临床紧急用血
                        n.label = 'danger'; //这里暂时定义为紧急
                    } else if (n.eventType == '调剂申请') {
                        n.label = 'warning'; //这里暂时定义为警告
                    } else {
                        n.label = 'success';
                    }

                    switch (n.eventType) {
                        case '调剂申请':
                            n.desc = getFacilityName(n.facility) + '向' + getFacilityName(n.otherFacility) + '提交了的' + n.bloodType + ' 血型' + n.bloodGroup + ' ' + n.amount + '的调剂申请，等待对方机构审核。';
                            break;
                        case '血站审核':
                            n.desc = getFacilityName(n.facility) + '审核通过了' + getFacilityName(n.otherFacility) + '提交了的' + n.bloodType + ' 血型' + n.bloodGroup + ' ' + n.amount + '的调剂申请。';
                            break;
                        case '审批':
                            n.desc = getFacilityName(n.facility) + '审批了' + getFacilityName(n.otherFacility) + '提交了的' + n.bloodType + ' 血型' + n.bloodGroup + ' ' + n.amount + '的调剂申请。';
                            break;
                        case '出库确认':
                            n.desc = getFacilityName(n.facility) + '进行了出库确认，' + n.amount + ' 血型' + n.bloodGroup + '的' + n.bloodType + '已经出库，正准备发往' + getFacilityName(n.otherFacility) + '。';
                            break;
                        case '入库确认':
                            n.desc = getFacilityName(n.facility) + '已经接收了从' + getFacilityName(n.otherFacility) + '调剂的' + n.bloodType + ' 血型' + n.bloodGroup + ' ' + n.amount + '的血液。';
                            break;
                        default:
                            n.desc = '';
                    }
                    n.cutTime = util.formatDate(new Date(n.time), "yyyy-MM-dd hh:mm");
                    dispatchEvents.push(n);
                }

                $("#logWarp").html(_.template($('#logTemplate').html(), {"datas": dispatchEvents}));
                $("#recordCount").html(dispatchEvents.length);
                $(".log_list").bootstrapNews({
                    newsPerPage: 20,
                    autoplay: true,
                    pauseOnHover: true,
                    navigation: false,
                    direction: 'down',
                    newsTickerInterval: 10000
                });

                addloadedPercent(10);
            }
        });
    }

    // 定时刷新
    var smsCtx = null;
    var smsSend = function () {
        if (smsCtx) {
            clearInterval(smsCtx);
        }
        smsCtx = setInterval(function () {
            window.location.reload();
        }, 60 * 20 * 1000);
    };

    getFacilityInfo(function(data) {
        facilityInfo = data;
        addloadedPercent(10);
        setBulidMap3(getDay, default_bloodtype, default_bloodgroup);
        initstatistics();
        initEvents();
        smsSend();
    });

});
