/**map2**/
//全局变量，机构详细详细2
var facilityInfo = {};

var bulidMap2 = null;

var screenwidth=window.screen.width;
var symbolsize_city=7;
var symbolsize_reimcity=8;
var symbolsize_line=7;
var fontsize_city=15;
var fontsize_value=13;

if(screenwidth>=1920){
    symbolsize_city=8;
    symbolsize_reimcity=10;
    symbolsize_line=8;
    fontsize_city=16;
    fontsize_value=14;
}

$(function () {

    var loadedPercent = 50;
    var addloadedPercent = function(toadd){
        if(parseInt(toadd) > 0){
            loadedPercent += parseInt(toadd);
        }
        loadedEffect.load(loadedPercent);
        if(loadedPercent >= 100){
            loadedEffect.remove();
        }
    };
    addloadedPercent(10);
    //正在发生异地报销时间事件
    var dispatch=[];
    //历史报销地点集合
    var points = [];
    //正在发生异地报销
    var lines=[];
    //日志事件集合
    var logs = [];

    bulidMap2 = echarts.init(document.getElementById("map2"));
    bulidMap2.hideLoading();
    var option2 = {
        title: {
            show: false
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
        /*legend: {
            show:false,
            orient: 'vertical',
            selectedMode:false,
            x:'right',
            data:[]
        },
        dataRange: {
            show : false,
            x: 'right',
            y: 'center',
            textStyle: {color:'#fff'},
            splitList: [
                {start: 10000,label: '异地报销'},
                {start: 0, end: 10000,label: '本地报销'}
            ],
            color: ['#06ebc8','#0096ff']
        },*/
        calculable : true
    };
    bulidMap2.setOption(option2);

    //通过机构码获取与字典一致的机构码
    function getRealFacilityCode(facility){
        if(facility){
            var code = facility;
            if(code.length === 12){
                code = facility.substring(0, 7)
            }else if (code.length === 10){
                code = facility.substring(0, 5)
            }

            if (facilityInfo.hasOwnProperty(code)) {
                return code;
            } else if (facilityInfo.hasOwnProperty(code.substring(0, 5))) {
                return code.substring(0, 5);
            }
        }

        return facility;
    }

    //通过机构码获取名称
    function getFacilityName(facility) {
        if (facilityInfo.hasOwnProperty(facility)) {
            return facilityInfo[facility].name;
        } else if (facilityInfo.hasOwnProperty(facility.substring(0, 5))) {
            return facilityInfo[facility.substring(0, 5)].name;
        } else {
            return '';
        }
    }

    var series = [];
    var pointData = [];
    // 本地报销
    var localReimData = [];
    // 异地报销
    var remoteReimDate = [];
    // 正在发生异地报销
    var lines=[];
    //日志事件集合
    var logs = [];
    // 滚动新闻
    var smsCtx=null;
    var smsSend=function(){
        if(smsCtx){
            clearInterval(smsCtx.timer);
        }
        smsCtx={count:1*60*10};
        smsCtx.timer = setInterval( function(){
            smsCtx.count--;
            if(smsCtx.count<=0){
                window.location.reload();
            }
        } , 1000);
    };

    getFacilityInfo(function(data){
        facilityInfo = data;
        addloadedPercent(10);

        //全省报销事件
        util.ajax({
            url:util.domain+'/service/dashboard/records/reim?'+util.current(),
            async:true,
            success:function(resp){

                dispatch = [];
                lines = [];

                var localReimHash = {};
                var remoteReimHash = {};
                var lineHash = {};
                var pointHash = {};

                $.each(resp,function(i,d){
                    d.applyFacility = getRealFacilityCode(d.applyFacility); // 兼容中心血站为7位机构码

                    if(facilityInfo.hasOwnProperty(d.applyFacility)){ // 直接排除机构字典中没有的数据，避免出错

                        var applyFacilityName = facilityInfo[d.applyFacility].cityName;
                        pointHash[d.applyFacility] = true;
                        //本地报销
                        if(d.applyFacility === d.reimFacility){

                            //已经有这个机构的报销数据，累加
                            if(localReimHash.hasOwnProperty(d.applyFacility)){
                                var _thisIndex = localReimHash[d.applyFacility];
                                localReimData[_thisIndex].value[2] += d.reimAmount;
                            }
                            else//没有该机构数据，push
                            {
                                localReimHash[d.applyFacility] = localReimData.length; //记录index
                                localReimData.push({
                                    name: applyFacilityName,
                                    value: [facilityInfo[d.applyFacility].x, facilityInfo[d.applyFacility].y, d.reimAmount]
                                });
                            }
                        }
                        else{//异地报销

                            //判断异地报销为多地 or 单地
                            if(d.reimFacility.indexOf(',') > 0){

                                var reimFacilitys = d.reimFacility.split(',');
                                var amounts = d.facilityAmount.split(',');

                                for(var j =0;j<reimFacilitys.length;j++){

                                    reimFacilitys[j] = getRealFacilityCode(reimFacilitys[j]); // 兼容中心血站为7位机构码

                                    var reimFacilityName = facilityInfo.hasOwnProperty(reimFacilitys[j]) ? facilityInfo[reimFacilitys[j]].cityName : reimFacilitys[j];
                                    pointHash[reimFacilitys[j]] = true;

                                    if(d.applyFacility !== reimFacilitys[j]){

                                        //已经有这个机构的异地报销数据，累加
                                        if(remoteReimHash.hasOwnProperty(d.applyFacility)){
                                            var _thisIndex = remoteReimHash[d.applyFacility];
                                            remoteReimDate[_thisIndex].value[2] += d.reimAmount;
                                        }
                                        else//没有这个机构数据，push
                                        {
                                            remoteReimHash[d.applyFacility] = remoteReimDate.length; //记录index
                                            remoteReimDate.push({
                                                name: applyFacilityName,
                                                value: [facilityInfo[d.applyFacility].x, facilityInfo[d.applyFacility].y, d.reimAmount]
                                            });
                                        }

                                        //已经有这个机构的异地报销数据，累加
                                        if(remoteReimHash.hasOwnProperty(reimFacilitys[j])){
                                            var _thisIndex = remoteReimHash[reimFacilitys[j]];
                                            remoteReimDate[_thisIndex].value[2] += d.reimAmount;
                                        }
                                        else//没有这个机构数据，push
                                        {
                                            remoteReimHash[reimFacilitys[j]] = remoteReimDate.length; //记录index
                                            remoteReimDate.push({
                                                name: reimFacilityName,
                                                value: [facilityInfo[reimFacilitys[j]].x, facilityInfo[reimFacilitys[j]].y, d.reimAmount]
                                            });
                                        }

                                        //已经有这两个个机构的异地报销数据，累加
                                        if(lineHash.hasOwnProperty(d.applyFacility+''+reimFacilitys[j])){
                                            var _thisIndex = lineHash[d.applyFacility+''+reimFacilitys[j]];
                                            lines[_thisIndex][0].value += amounts[j];
                                            lines[_thisIndex][1].value += amounts[j];
                                        }
                                        else//没有这两个机构数据，push
                                        {
                                            lineHash[d.applyFacility+''+reimFacilitys[j]] = lines.length; //记录index
                                            lines.push([
                                                {name: applyFacilityName, coord: [facilityInfo[d.applyFacility].x, facilityInfo[d.applyFacility].y], value: amounts[j]},
                                                {name: reimFacilityName, coord: [facilityInfo[reimFacilitys[j]].x, facilityInfo[reimFacilitys[j]].y], value: amounts[j]}
                                            ]);
                                        }

                                    }else{
                                        //异地含本地的是否计算在内？算本地还是算到异地？
                                    }
                                }
                            }
                            else // 异地只有一个机构
                            {
                                d.reimFacility = getRealFacilityCode(d.reimFacility);
                                var reimFacilityName = facilityInfo.hasOwnProperty(d.reimFacility) ? facilityInfo[d.reimFacility].cityName : d.reimFacility;
                                pointHash[d.reimFacility] = true;

                                //已经有这个机构的异地报销数据，累加
                                if(remoteReimHash.hasOwnProperty(d.applyFacility)){
                                    var _thisIndex = remoteReimHash[d.applyFacility];
                                    remoteReimDate[_thisIndex].value[2] += d.reimAmount;
                                }
                                else//没有这个机构数据，push
                                {
                                    remoteReimHash[d.applyFacility] = remoteReimDate.length; //记录index
                                    remoteReimDate.push({
                                        name: applyFacilityName,
                                        value: [facilityInfo[d.applyFacility].x, facilityInfo[d.applyFacility].y, d.reimAmount]
                                    });
                                }

                                //已经有这个机构的异地报销数据，累加
                                if(remoteReimHash.hasOwnProperty(d.reimFacility)){
                                    var _thisIndex = remoteReimHash[d.reimFacility];
                                    remoteReimDate[_thisIndex].value[2] += d.reimAmount;
                                }
                                else//没有这个机构数据，push
                                {
                                    remoteReimHash[d.reimFacility] = remoteReimDate.length; //记录index
                                    remoteReimDate.push({
                                        name: reimFacilityName,
                                        value: [facilityInfo[d.reimFacility].x, facilityInfo[d.reimFacility].y, d.reimAmount]
                                    });
                                }

                                //已经有这两个个机构的异地报销数据，累加
                                if(lineHash.hasOwnProperty(d.applyFacility+''+d.reimFacility)){
                                    var _thisIndex = lineHash[d.applyFacility+''+d.reimFacility];
                                    lines[_thisIndex][0].value += d.reimAmount;
                                    lines[_thisIndex][1].value += d.reimAmount;
                                }
                                else//没有这两个机构数据，push
                                {
                                    lineHash[d.applyFacility+''+d.reimFacility] = lines.length; //记录index
                                    lines.push([
                                        {name: applyFacilityName, coord: [facilityInfo[d.applyFacility].x, facilityInfo[d.applyFacility].y], value: d.reimAmount},
                                        {name: reimFacilityName, coord: [facilityInfo[d.reimFacility].x, facilityInfo[d.reimFacility].y], value: d.reimAmount}
                                    ]);
                                }
                            }
                        }
                    }

                });

                $.each(facilityInfo,function(i,d){
                    //if(!pointHash.hasOwnProperty(i) && i.length == 5){
                    if(!remoteReimHash.hasOwnProperty(i) && i.length == 5){
                        if(localReimHash.hasOwnProperty(i)){
                            pointData.push({
                                name: d.cityName,
                                value: [d.x, d.y, 1]
                            });
                        }else{
                            pointData.push({
                                name: d.cityName,
                                value: [d.x, d.y, 0]
                            });
                        }
                    }
                    //}
                });

                //其他节点数据
                series.push({
                    name: '无报销地图节点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data:pointData,
                    symbol: 'circle',
                    symbolSize: symbolsize_city,
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
                            color: function(item){
                                if(item.value[2] > 0){
                                    return '#0096ff';
                                }else{
                                    return '#5e6e84';
                                }
                            }
                        }
                    }
                });


                //本地报销数据
                //本地报销
                series.push({
                    name: '本地报销节点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data:localReimData,
                    symbol: 'circle',
                    symbolSize: symbolsize_reimcity,
                    roam: false,  //鼠标缩放
                    label: {
                        normal: {
                            //formatter: '{b}',
                            formatter: function(item){
                                //return item.name+'\n\n'+item.value[2];
                                return '¥'+item.value[2];
                            },
                            position:[15,-5],
                            show: true,
                            textStyle: {
                                color: '#0096ff',
                                //fontFamily: 'SimHei',
                                fontSize: fontsize_city,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#0096ff',
                            shadowColor: 'rgba(255,255,255,0.3)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 15
                        }
                    }
                });

                //异地报销数据
                series.push({
                    name: '异地报销节点',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data:remoteReimDate,
                    symbolSize: symbolsize_reimcity,
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
                                color: '#06ebc8',
                                //fontFamily: 'SimHei',
                                fontSize: fontsize_city,
                                fontWeight: 'bold'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#06ebc8'/*,
                        shadowColor: 'rgba(255,255,255,0.3)',
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 15*/
                        }
                    }
                });

                //异地报销连线
                series.push({
                    name: '异地报销连线',
                    type: 'lines',
                    data: lines,
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
                            color : '#06ebc8',
                            width: 1.5,
                            opacity: 0.5
                            /*,curveness: 0.5*/
                        }
                    },
                    label: {
                        normal:{
                            show: true,
                            textStyle: {
                                color: '#06ebc8',
                                //fontFamily: 'SimHei',
                                //fontWeight: 'bold',
                                fontSize: fontsize_value
                            },
                            formatter: '  ¥{c}  ',
                            position: 'end'
                        }
                    },
                    animation: false

                });

                bulidMap2.setOption({series: series});

                addloadedPercent(10);
            }
        });
        //全省报销统计
        util.ajax({
            url:util.domain+'/service/dashboard/statistics/reim/remotetype?'+util.current(),
            async:true,
            success:function(resp){
                if(!resp.localReimAmount)resp.localReimAmount=0;
                if(!resp.remoteReimAmount)resp.remoteReimAmount=0;
                var endTime = util.formatDate(new Date(),"hh:mm:ss");
                $("#statisticsTemplateDiv").html(_.template($('#statisticsTemplate').html(),{"datas":resp,"endTime":endTime}));

                addloadedPercent(10);
            }
        });
        //初始化日志数据
        util.ajax({
            url:util.domain+'/service/dashboard/events/reim?'+util.current(),
            async:true,
            success:function(resp){
                $.each(resp,function(i,d){

                    if (facilityInfo.hasOwnProperty(d.facility)) {
                        d.cityName = facilityInfo[d.facility].cityName;
                        d.name = facilityInfo[d.facility].name;
                    }
                    logs.push(d);
                });

                var dispatchEvents = [];

                //Ajax 返回数据需要自己写
                for(var i in logs){
                    var n = logs[i];
                    n.facility = getRealFacilityCode(n.facility); // 兼容中心血站为7位机构码
                    //本地报销
                    if(n.facility === n.reimFacility){
                        n.label = 'regular';
                        //n.desc = getFacilityName(n.facility)+n.userName+'提交'+'金额为'+n.reimAmount+'元，类型为'+n.reimType+'的本地报销登记。';
                        n.desc = getFacilityName(n.facility)+'提交'+'金额为'+n.reimAmount+'元，类型为'+n.reimType+'的本地报销登记。';
                    }else{
                        n.label = 'success';
                        // 多地报销
                        if(n.reimFacility.indexOf(',')>0){
                            var reimFacilitys=n.reimFacility.split(',');
                            var reimFacilitys_t = "";
                            var reimFacilityWithLocal = false;
                            for(var j =0;j<reimFacilitys.length;j++){
                                // 多地报销含本地
                                if(reimFacilitys[j] === n.facility){
                                    reimFacilityWithLocal = true;
                                }
                                // 多地报销不含本地
                                else{
                                    if(j===0){
                                        reimFacilitys_t = getFacilityName(reimFacilitys[j]);
                                    }else{
                                        reimFacilitys_t = reimFacilitys_t+","+getFacilityName(reimFacilitys[j]);
                                    }
                                }
                            }
                            n.desc = getFacilityName(n.facility)+'为'+reimFacilitys_t+'代办了金额为'+n.reimAmount+'元，类型为'+n.reimType+'的多地报销'+(reimFacilityWithLocal ? '(含本地)' : '')+'。';
                        }
                        // 代办
                        else{

                            n.desc = getFacilityName(n.facility)+'为'+getFacilityName(n.reimFacility)+'代办了金额为'+n.reimAmount+'元，类型为'+n.reimType+'的异地报销。';
                        }
                    }
                    dispatchEvents.push(n);
                }

                $("#logWarp").html(_.template($('#logTemplate').html(),{"datas":dispatchEvents}));
                $("#recordCount").html(dispatchEvents.length);

                $(".log_list").bootstrapNews({
                    newsPerPage: 20,
                    autoplay: true,
                    pauseOnHover: true,
                    navigation: false,
                    direction: 'down',
                    newsTickerInterval: 10000
                });

                smsSend();
                addloadedPercent(10);

            }
        });

    });



});
    

