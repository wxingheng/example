/**map1**/
//全局变量，机构详细详细2
var facilityInfo = {};

var bulidMap1 = null;

var screenwidth=window.screen.width;
var symbolsize_city=7;
var symbolsize_person=[11, 26];
var symbolsize_pin=[13, 17];
var symbolsize_point=13;
var fontsize_city=15;
var fontsize_value=13;

if(screenwidth>=1920){
    symbolsize_city=8;
    symbolsize_person=[15, 34];
    symbolsize_pin=[17, 23];
    symbolsize_point=15;
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

    //献血人数
    var donations=[];
    //屏蔽及献血统计
    var data={
        shield: 0,
        report: 0,
        donors: 0
    };
    //日志集合
    var logs=[];
    var peoplePath = 'path://M340.995,302.885c7.896,0,14.295-6.228,14.295-13.912c0-7.681-6.398-13.906-14.295-13.906   c-7.893,0-14.291,6.225-14.291,13.906C326.704,296.657,333.103,302.885,340.995,302.885z M355.068,305.751h-28.149   c-10.629,0-19.255,8.36-19.312,18.689c0,0.019-0.003,0.038-0.003,0.054v36.797c0,3.311,2.761,6,6.164,6   c3.406,0,6.168-2.689,6.168-6v-34.089h2.944v97.121c0,4.449,3.707,8.051,8.275,8.051c4.572,0,8.275-3.602,8.275-8.051v-57.088   h3.131v57.088c0,4.449,3.703,8.051,8.272,8.051c4.575,0,8.278-3.602,8.278-8.051v-97.121h2.944v34.089c0,3.311,2.755,6,6.168,6   c3.399,0,6.161-2.689,6.161-6V324.44C374.33,314.111,365.704,305.751,355.068,305.751z';
    var markerPath = 'path://M336.344,416.006c-5.559,20.342-37.852,61.495-37.852,61.495  s-27.896-32.856-37.736-57.299c-0.805-1.824-1.572-3.703-1.991-5.7c-1.609-6.748-1.268-11.613-1.268-9.992  c0-22.364,18.13-41.995,40.495-41.995c22.364,0,40.495,18.13,40.495,40.495C338.487,407.558,337.727,411.926,336.344,416.006z   M297.983,375.5c-15.186,0-27.497,12.311-27.497,27.497c0,15.186,12.311,27.497,27.497,27.497s27.497-12.311,27.497-27.497  C325.479,387.811,313.169,375.5,297.983,375.5z M297.979,417.504c-8.007,0-14.499-6.491-14.499-14.499  c0-8.007,6.491-14.498,14.499-14.498c8.007,0,14.498,6.491,14.498,14.498C312.477,411.013,305.985,417.504,297.979,417.504z';

    bulidMap1 = echarts.init(document.getElementById("map1"));
    bulidMap1.hideLoading();

    var option1 = {
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
        /*dataRange: {
            show: false,
            x: 'right',
            y: 'center',
            splitList: [
                {start: 400, color: '#651cee', label: '≥400'},
                {start: 300, end: 400, color: '#7444ce', label: '300-400'},
                {start: 200, end: 300, color: '#0096ff', label: '200-300'},
                {start: 100, end: 200, color: '#00d8ff', label: '100-200'},
                {start: 0, end: 100, color: '#06ebc8', label: '0-100'}
            ],
            textStyle: {
                color: '#fff'
            }

        },*/
        calculable : true
    };
    bulidMap1.setOption(option1);

    //通过机构码获取与字典一致的机构码
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
        if (value >= 400) {
            return 'rgba(101,28,238,1)';
        } else if (value >= 300) {
            return 'rgba(116,68,206,1)';
        } else if (value >= 200) {
            return 'rgba(1,149,255,1)';
        } else if (value >= 100) {
            return 'rgba(0,216,255,1)';
        } else {
            return 'rgba(8,233,201,1)';
        }
    }

    var series = [];

    var cityPointData = [];
    var banlistPointData = [];
	
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

        //获取机构献血人数
        var donationAjax = util.ajax({
            url:util.domain+'/service/dashboard/statistics/donation/bystation?'+util.prox(2),
            async:true
        });

        var banlistAjax = util.ajax({
            url:util.domain+'/service/dashboard/statistics/hrd/bystation?'+util.prox(2),
            async:true
        });

        $.when( donationAjax, banlistAjax ).done(function ( data1, data2 ) {
            var donation = data1[0];
            var banlist = data2[0];

            if(donation.length > 0){
                $.each(donation, function(i, d){

                    d.station = getRealFacilityCode(d.station);
                    var cityName = facilityInfo.hasOwnProperty(d.station) ? facilityInfo[d.station].cityName : d.station;
                    donations.push({name:cityName, value: [facilityInfo[d.station].x, facilityInfo[d.station].y, d.people]});
                    //计算献血数量
                    data.donors += d.people;

                });
            }

            if(banlist.length > 0){
                $.each(banlist, function(i, d){

                    var cityName = facilityInfo.hasOwnProperty(d.station) ? facilityInfo[d.station].cityName : d.station;

                    if(d.station !== null && d.station !== ''){
                        banlistPointData.push({name:cityName, value:[facilityInfo[d.station].x, facilityInfo[d.station].y, d.Amount]});
                        //计算屏蔽数量
                        data.shield += d.Amount;
                    }else{
                        data.report += d.Amount;
                    }
                });
            }

            $.each(facilityInfo,function(i,d){
                if(i.length === 5){
                    cityPointData.push({
                        name: d.cityName,
                        value: [d.x, d.y, 1]
                    });
                }
            });

            //城市名称数据
            series.push({
                name: '城市名称',
                type: 'scatter',
                coordinateSystem: 'geo',
                data:cityPointData,
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
                        color: '#5e6e84'
                    }
                }
            });

            //献血人群数据
            series.push({
                name: '献血人群分布',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: donations,
                symbol: peoplePath,
                symbolSize:symbolsize_person,
                roam: false,  //鼠标缩放
                label: {
                    normal: {
                        position: 'bottom',
                        show: false,
                        textStyle: {
                            //color: '#ba00ff',
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

            series.push({
                name: '屏蔽点动画',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data:banlistPointData,
                symbolSize: symbolsize_point,
                symbolOffset: [10, 14],
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                roam: false,  //鼠标缩放
                label: {
                    normal: {
                        position: 'top',
                        show: false,
                        textStyle: {
                            //color: '#ba00ff',
                            //fontFamily: 'SimHei',
                            fontSize: fontsize_city,
                            fontWeight: 'bold'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(255,0,0,0.5)' //原来颜色rgba(186, 0, 186, 0.5)
                    }
                }
            });

            series.push({
                name: '屏蔽地标',
                type: 'scatter',
                coordinateSystem: 'geo',
                data:banlistPointData,
                symbol: markerPath,
                symbolSize: symbolsize_pin,
                symbolOffset: [10, 6],
                roam: false,  //鼠标缩放
                label: {
                    normal: {
                        position: 'bottom',
                        show: true,
                        textStyle: {
                            //color: '#ba00ff',
                            //fontFamily: 'SimHei',
                            fontWeight: 'bold',
                            fontSize: fontsize_city
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'red' //原来颜色ba00ba
                    }
                }
            });

            bulidMap1.setOption({series: series});
            addloadedPercent(10);

            var endTime = util.formatDate(new Date(),"hh:mm:ss");
            $("#statisticsTemplateDiv").html(_.template($('#statisticsTemplate').html(),{"data":data,"endTime":endTime}));
            addloadedPercent(10);
        });

        //初始化日志数据
        util.ajax({
            url:util.domain+'/service/dashboard/events/hrd?'+util.prox(2),
            async:false,
            success:function(resp){
                $.each(resp,function(i,d){
                    d.facility = getRealFacilityCode(d.facility);
                    d.cityName = facilityInfo[d.facility].cityName;
                    d.name = facilityInfo[d.facility].name;
                    logs.push(d);
                });

                var dispatchEvents = [];

                logs = logs.sort(
                  function(a, b)
                  {
                      if(a.time < b.time) return 1;
                      if(a.time > b.time) return -1;
                      return 0;
                  }
                );


                //Ajax 返回数据需要自己写
                for(var i in logs){
                    var n = logs[i];

                    switch(n.eventType)
                    {
                        case '屏蔽数据上报':
                            if(n.dataStatus=='成功'){
                                n.desc = (n.dataAmount > 0) ? getFacilityName(n.facility)+n.dataStatus+'上传了'+n.dataAmount+'条屏蔽数据。' : getFacilityName(n.facility)+'成功进行屏蔽数据上传。';
                                n.label = 'success';
                            }else{
                                n.desc = getFacilityName(n.facility)+'屏蔽数据上传至平台失败，等待重新上传。';
                                n.label = 'warning';
                            }
                            break;
                        case '黑名单阻止':
                            n.desc = getFacilityName(n.facility)+'通过全省屏蔽数据，在献血者筛查中成功阻止一例高危献血者献血';
                            n.label = 'danger';
                            break;
                        case '间隔期查询':
                            n.desc = (n.facility != null ? getFacilityName(n.facility) : '')+'通过全省间隔期查询，成功阻止一例献血者间隔期内献血';
                            n.label = 'warning';
                            break;
                        case '联网状态':
                            if(n.dataStatus=='正常'){
                                n.desc = getFacilityName(n.facility)+'联网状态正常';
                                n.label = 'regular';
                            }else{
                                n.desc = getFacilityName(n.facility)+'联网状态，于'+n.time+ '出现异常';
                                n.label = 'warning';
                            }
                            break;
                        default:
                            n.desc = '';
                    }

                    n.cutTime = util.formatDate(new Date(n.time), "yyyy-MM-dd hh:mm");
                    dispatchEvents.push(n);
                }


                $("#logWarp").html(_.template($('#logTemplate').html(),{"datas":dispatchEvents}));
                $("#recordCount").html(dispatchEvents.length);
                $(".log_list").bootstrapNews({
                    newsPerPage:20,
                    autoplay: true,
                    pauseOnHover: true,
                    navigation: false,
                    direction: 'down',
                    newsTickerInterval: 10000
                });

                addloadedPercent(10);
            }
        });

        smsSend();

    });

});