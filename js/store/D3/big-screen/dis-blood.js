var isLog = true;
//血型颜色map
var bgColorMap = {

    "fill": {
        "a": "#fd4d00",
        "A": "#fd4d00",
        "b": "#00a0f9",
        "B": "#00a0f9",
        "o": "#f51c1c",
        "O": "#f51c1c",
        "ab": "#03ed3a",
        "AB": "#03ed3a",
        "红细胞类": "#ff392e",
        "血浆类": "#ffa109",
        "血小板类": "#a853ff  ",
        "冷沉淀": "#00a3ff",
        "低温沉淀物类": "#00a3ff"
    },
    "stroke": {
        "a": "#fd4d00",
        "A": "#fd4d00",
        "b": "#00a0f9",
        "B": "#00a0f9",
        "o": "#f51c1c",
        "O": "#f51c1c",
        "ab": "#05d56e",
        "AB": "#05d56e",
        "红细胞类": "#fb3d33",
        "血浆类": "#ffa109",
        "血小板类": "#a853ff",
        "冷沉淀": "#a853ff",
        "低温沉淀物类": "#a853ff"
    },
    "links": {
        "红细胞类": "#ff4f38",
        "血浆类": "#ffa109",
        "血小板类": "#934afb",
        "冷沉淀": "#0096ff",
        "低温沉淀物类": "#0096ff"
    }
};
//权重
var bloodTypeWeight = {
    "红细胞类": 1,
    "血浆类": 2,
    "血小板类": 3,
    "冷沉淀": 4
};
var sankeyNodeWeight = {
    "A": 1,
    "B": 2,
    "O": 3,
    "AB": 4,
    "红细胞类": 5,
    "血浆类": 6,
    "血小板类": 7,
    "冷沉淀": 8,
    '低温沉淀物类': 8
};

var svg = d3.select("svg");
var groups_out = svg.append("g")
    .attr('class', 'map');

var zoom, zoomed, transformMap, goes = [];

var w = document.documentElement.offsetWidth || document.body.offsetWidth;
var h = document.documentElement.offsetHeight || document.body.offsetHeight;

//字典
var facility = [];
var facilityMap = {};

var autoFocusLinksNodes;

//定义本省和周边省份
var homecity = '3201';
var homeProvince = '32';
var neighbors = ['31', '33', '34', '37'];

var geoMap = {};
var cityGeoMap = {};

var CHN_ADM0 = ['11', '12', '13', '14', '15', '21', '22', '23',
    '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46',
    '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82'
];


// 第一步 定义地图的投影
var projection = d3.geoMercator()
    .center([118.8062, 31.9208])
    .scale(9100)
    .translate([900, 780]);
// .center([106.234588, 34.298597])
// .scale(1700)
// .translate([780, 530]);

//第二步 定义地理路径生成器
var path = d3.geoPath()
    .projection(projection);

//第三步 处理地理数据
var getJsonCount = 0;
CHN_ADM0.forEach(function (v, k) {
    d3.json("geodata/" + v + ".s.json", function (error, toporoot) {
        goes.push(toporoot);
        getJsonCount++;
        if (getJsonCount == CHN_ADM0.length) {
            console.log('goes--->>>', goes);
            initDone();
        }
    })
});


//初始化sankey图
var formatNumber = d3.format(",.0f"),
    format = function (d) {
        return formatNumber(d) + " TWh";
    },
    color = d3.scaleOrdinal(d3.schemeCategory10);


/**extent    sankey图位置:  x 1600  Y 230   高度 560   宽度 30   */

var sankey = d3.sankey()
    .nodeWidth(30)
    .nodePadding(8)
    .extent([
        [1600, 230],
        [1820, 790]
    ])
    .nodeId(function (d) {
        return d.name;
    });

var link = svg.append("g")
    .attr("class", "links")
    .selectAll("path");

var node = svg.append("g")
    .attr("class", "nodes")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("g");


var planeInterval = []; // 用于飞机动画 清除飞机动画
var planesIdList = []; // 保存飞机ID
var SnapDom = Snap('svg');


/**
 * 添加连线
 * @param start
 * @param end
 * @param id
 * @param interval
 */
function addLine(start, end, id, interval, text, type) {
    // 添加飞机
    // svg.append('g').attr('id', 'plane_'+ id).append('use').attr('xlink:href', '#planeModel').style('fill', bgColorMap['fill'][type]);

    // const plane = SnapDom.select('#plane_' + id),
    // planeBox = plane.getBBox(),
    // flightPath = SnapDom.path(getBezierCurve(start, end, Math.abs(start[1] - end[1]) < 100 ? 0.8 : 0.1)).attr({
    //   'fill': 'none',
    //   'stroke': bgColorMap['fill'][type],
    //   id: 'line_plane_' + id
    // }),
    //flightPathLength = Snap.path.getTotalLength(flightPath);

    // 添加连线描述
    /*  d3.select(`#${MAP.id}`).append('text')
        .attr('class', 'line-plane-text')
        .attr('text-anchor', 'middle')
        // .attr('font-weight', 'bold')
        .append('textPath')
        .attr('xlink:href', `#line_plane_${id}`)
        .attr('startOffset', '50%')
        .attr('font-size', 20)
        .attr('fill', MAP[start.type])
        .text(text);*/

    /*
     const random = Math.floor(Math.random() * 3000 + 2000);
     interval.id = id;
     document.querySelector('#planeModel')['style'].opacity = '0';

     interval.func = setInterval(function () {
       Snap.animate(0, flightPathLength, function (step) {
         const plane = document.querySelector('#plane_' + id);
         document.querySelector('#planeModel')['style'].opacity = '1';
         if (plane) {
           plane['style'].display = 'block';
           const moveToPoint = Snap.path.getPointAtLength(flightPath, step);
           const x = moveToPoint.x - (planeBox.width / 2);
           const y = moveToPoint.y - (planeBox.height / 2);
           SnapDom.select('#plane_' + id).transform('translate(' + x + ',' + y + ') rotate(' + (moveToPoint.alpha - 90) + ', ' + planeBox.cx + ', ' + planeBox.cy + ')');
         }
       }, random, null, function () {
         const plane = document.querySelector('#plane_' + id);
         plane && (plane['style'].display = 'hide');
       });
     }, 500 + random);*/
    // return `<path d='${getBezierCurve(start, end, 0.01)}' stroke='red' stroke-width='3' fill='none'/>`
}

/**
 * @desc  获取二次贝塞尔曲线的路径字符串
 * @param {object} begin - 开始点
 * @param {object} end - 结束点
 * @param {number} factor - 0-1 factor越大曲线越接近直线
 * @example getBezierCurve(position[0], position[1], 0.01)
 * @returns {string}
 */
function getBezierCurve(begin, end, factor) {
    var k = 0,
        b = 0,
        x = 0,
        y = 0,
        middle = {
            x: (end[0] + begin[0]) / 2,
            y: (end[1] + begin[1]) / 2
        };

    if (end[1] - begin[1] !== 0) {
        k = (begin[0] - end[0]) / (end[1] - begin[1]);
        b = middle.y - k * middle.x;
    } else {
        k = 0;
        b = begin[1];
    }



    if (k > 0) {
        x = begin[0] + (middle.x - begin[0]) * factor;
    } else {
        x = end[0] + (middle.x - end[0]) * factor;

    }

    y = k * x + b;

    if (x < 0 || y < 0) {
        //调整0.99还是小于0的异常情况，防止死循环,按直线绘制
        if (factor == 0.99) {
            return [begin[0], begin[1]];
        }
        //如果计算控制点x或y小于零，调整为尽可能接近直线绘制
        return getBezierCurve(begin, end, 0.99);
    }

    // return 'M' + begin[0] + ',' + begin[1] + ' Q' + x + ',' + y + ' ' + end[0] + ',' + end[1];
    return [x, y];
}
/**
 * 添加一组线并添加动画
 * @param lines
 */

function drawLines(lines) {
    // let html = '';
    lines.forEach(function (line, i) {
        // const id = Math.random();
        const id = Math.random().toString().substr(2, 10);
        planeInterval.push({});
        var start_coor = projection([facilityMap[line[0]]['x'], facilityMap[line[0]]['y']]);
        var end_coor = projection([facilityMap[line[1]]['x'], facilityMap[line[1]]['y']]);
        addLine(start_coor, end_coor, id, planeInterval[i], line[3], line[2]);
        planesIdList.push(id);
        // html += addLine(line[0], line[1])
    });
    // document.querySelector('#' + MAP.id).innerHTML = document.querySelector('#' + MAP.id).innerHTML + html;
}

/**
 * @desc  删除飞机和飞行路径
 * @param {string} id
 */
function deletePlane(id) {
    var ind = -1;
    var interval = planeInterval.find(function (elem, index) {
        if (elem.id === id) {
            ind = index;
            return true;
        } else {
            return false;
        }
    });

    // 移除动画
    if (interval) {
        clearInterval(interval.func);
        planeInterval.splice(ind, 1);
        d3.select('#plane_' + id).remove();
        d3.select('#line_plane_' + id).remove();
        d3.select('.line-plane-text').remove();
    } else {
        throw new Error('未找到这个飞机!');
    }
};

function drawLinePlane(data) {
    planesIdList.forEach(function (d) {
        deletePlane(d);
    });
    planesIdList = [];
    drawLines(data);
};


var initDone = function () {
    isLog && console.log(goes);

    goes.forEach(function (v, k) {

        geoMap[v.properties.name] = {
            "province": v.properties,
            "cities": {},
            "transform": v.transform
        };
        v.provinceBorders = topojson.merge(v, v.objects.cities.geometries); //合并省份下城市的地理数据

        v.objects.cities.geometries.forEach(function (a, e) {
            geoMap[v.properties.name]['cities'][a.properties.name] = a.properties;
            cityGeoMap[a.properties.id] = a.properties;
        });

        // 绘制城市的边界
        //只有本省市与临近省市才绘制边界
        if (v.properties.id == homeProvince || neighbors.includes(v.properties.id)) {
            var cityBorders = topojson.feature(v, v.objects.cities);
            var groups = groups_out.append("g");
            groups.selectAll("path")
                .data(cityBorders.features)
                .enter()
                .append("path")
                .style("fill", function (d, i) {
                    return v.properties.id == homeProvince ? "#202d5c" : "#152147";
                })
                .attr("stroke", function (d, i) {
                    //return "#0f2a56";
                    return v.properties.id == homeProvince ? "#245079" : "#1c446b";
                })
                .attr("d", path);

            groups.append("path")
                .datum(v.provinceBorders)
                .style("fill", "transparent")
                .attr('id', ('p' + v.properties.id))
                .attr("stroke", "transparent")
                .attr("d", path);

        } else {
            //否则只绘制省份的边界
            groups_out.append("path")
                .datum(v.provinceBorders)
                .style("fill", "#0e163a") //rgb(14,22,58)
                .attr('id', ('p' + v.properties.id))
                .attr("stroke", "#0f2a56")
                .attr("stroke-width", "2")
                .attr("d", path);
        }

    })

    //获取机构字典
    $.ajax({
        //   url: "/service/dashboard/dicts/facility",
        url: "/mock/dicts/facility.json",
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        async: false,
        success: function (data, status) {
            if (status == 'success') {


                facility = data;
                data.map(function (v, k) {

                    //地图血站名称重叠的特殊偏移处理
                    if (v.id == '90017') {
                        //江苏省血液中心
                        v.y -= 0.08;
                    }
                    facilityMap[v.id] = v;
                })
            }
        },
        error: function () {

        }
    });



    /*   视图的切换和平移切换
     var chgProvinceBtn = document.querySelector("#changeProvince");
     var oldValue;

     var chgViewBtn = document.querySelector("#changeView");
     var viewValue;

     //缩放和平移
     chgProvinceBtn.onchange = function(){
     //
     //		if(oldValue){
     //			d3.select("."+oldValue).style("fill",function(d){
     //				d.neighbors.style("fill","#eceef1");
     //				return '#eceef1';
     //		});
     //		}
     // 改变省份聚焦改省份
     var chgProvinceValue = chgProvinceBtn.value;
     oldValue = chgProvinceValue;
     isLog && console.log(chgProvinceValue);


     // 判断视图是否在省份视图
     var currentView = document.querySelector("#changeView").value;
     isLog && console.log('currentView',currentView);
     if(currentView!=='province'||chgProvinceValue=="") return;

     isLog && console.log(d3.select("#p"+chgProvinceValue));
     d3.select("#p"+chgProvinceValue).text(function(d){
     isLog && console.log('ddd',d);
     //聚焦位置缩放
     //省份中心坐标
     var centroid = path.centroid(d);
     isLog && console.log('centroid',centroid);
     //平移改省份到中心
     groups_out.transition().duration(1000).call(zoom.translateTo, centroid[0], centroid[1]);
     setTimeout(function(){
     groups_out.transition().duration(800).call(zoom.scaleTo, 4);
     },1100)

     //填充颜色
     //			isLog && console.log(d.neighbors);
     //			d.neighbors.style("fill","#69bcde");
     //			return '#e6f349';
     });

     // // 缩放和平移
     // // 指定缩放中心
     // 	zoom.center(centroid);
     // // 指定缩放比例
     // 	zoom.scale([2]);
     // // 指定平移量
     // 	zoom.translate([50,50]);
     // svg.call(zoom);

     };

     // 视图切换按钮
     chgViewBtn.onclick = function(){
     viewValue = chgViewBtn.value;
     // isLog &&  console.log(viewArea);
     switch(viewValue){
     case "country": setTimeout(function(){
     groups_out.transition().duration(1000).call(zoom.transform, d3.zoomIdentity);
     }, 500);
     break;

     // case "province":function(){}
     // case "neibourhood":function(){}
     };

     };
     */
    //调剂记录
    $.ajax({
        url: "/mock/records/dispatch.json",
        //url: "demoJsonData/recordDispatch.js",
        dataType: 'json',
        type: 'get',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        data: {
            startTime: moment().subtract(60, 'days').format('YYYY-MM-DD') + ' 23:59:59',
            endTime: moment().format('YYYY-MM-DD') + ' 00:00:00'
        },
        async: false,
        success: function (data, status) {
            if (status == 'success') {
                renderData(data);
            }
        },
        error: function () {

        }
    });


};

//血液品种单位换算
function typeUnitConvert(type, value) {
    var transV = value
    switch (type) {
        case "全血类":
            transV = Math.round(value / 200);
            break;
        case "血浆类":
            transV = Math.round(value / 100);
            break;
    }
    return transV;
}

var bloodTypeNodes, sankeyLinks, facilityBloodTypeLinks = [];
var autoSwitch = true,
    switchInterval = 7500;
var radiusScale;

var mapConnetDelay = 300;

var linetPointList = []; //绘制地图点到点连线动画

//增加地图机构点滤镜
var gaussian = svg.append('defs')
    .append('filter')
    .attr('id', "gaussian");

gaussian.append('feGaussianBlur')
    .attr('in', 'SourceGraphic')
    .attr('stdDeviation', '0.7');



var disaFacility = [];

function renderData(data) {
    //循环替换全血类为红细胞类
    $.each(data, function (k, v) {
        if (v.bloodType == '全血类' || v.bloodType == '血浆类') {
            v.bloodType = '血浆类';
            v.amount = typeUnitConvert(v.bloodType, v.amount);
        }
    });

    var senkeyData = {
        nodes: [],
        links: []
    };
    var primary = secondary = [];

    var dataBytype = d3.nest()
        .key(function (d) {
            return d.bloodType;
        })
        .entries(data);
    var dataBygroup = d3.nest()
        .key(function (d) {
            return d.bloodGroup;
        })
        .entries(data);

    for (var i = 0; i < dataBygroup.length; i++) {
        senkeyData.nodes.push({
            "name": dataBygroup[i].key
        });
        primary.push({
            "name": dataBygroup[i].key
        });
    }
    for (var i = 0; i < dataBytype.length; i++) {
        senkeyData.nodes.push({
            "name": dataBytype[i].key
        });
        secondary.push({
            "name": dataBygroup[i].key
        });
    }

    isLog && console.log('energy', senkeyData);
    //-----------------------------------------------------------------------------


    // 机构跟品种 的对应数据格式: [ ["机构", "品种", 数值], [...], ... ]
    var facilityBloodTypeHash = {};
    var facilityBloodTypeData = [];
    var bloodGroupBloodTypeHash = {};
    var bloodGroupBloodTypeData = [];
    // 汇总格式 {"品种名称": {value: 100, count: 13, minValue: 9999999, maxValue:0, sources: []}, ... }
    var bloodTypeSummary = {};
    for (var k in data) {
        var item = data[k];
        // 汇总
        if (!bloodTypeSummary.hasOwnProperty(item.bloodType)) {
            bloodTypeSummary[item.bloodType] = {
                value: 0,
                count: 0,
                minValue: 99999999,
                maxValue: 0,
                sources: []
            };
        }
        bloodTypeSummary[item.bloodType].value += item.amount; // 累计总量
        bloodTypeSummary[item.bloodType].count++; // 计数
        bloodTypeSummary[item.bloodType].sources.push(item.stationTo); // 数据源是哪些

        // 处理 血型跟品种 的对应数据格式
        var btId = item.bloodGroup + '' + item.bloodType;

        if (bloodGroupBloodTypeHash.hasOwnProperty(btId)) {
            var key = bloodGroupBloodTypeHash[btId]; // 得到数组下标
            bloodGroupBloodTypeData[key]['value'] += item.amount;
        } else {
            var len = bloodGroupBloodTypeData.push({
                "target": item.bloodGroup,
                "source": item.bloodType,
                "value": item.amount
            });
            bloodGroupBloodTypeHash[btId] = len - 1; // 记录数组下标
        }

        // 处理 机构跟品种 的对应数据格式
        var fbId = item.stationTo + '' + item.bloodType;
        isLog && console.log(facilityBloodTypeHash.hasOwnProperty(fbId));
        if (facilityBloodTypeHash.hasOwnProperty(fbId)) {
            var key = facilityBloodTypeHash[fbId]; // 得到数组下标
            facilityBloodTypeData[key][3] += item.amount;
        } else {
            var len = facilityBloodTypeData.push([
                item.stationFrom, item.stationTo, item.bloodType, item.amount
            ]);

            facilityBloodTypeHash[fbId] = len - 1; // 记录数组下标
        }
        //汇总有调剂关系的血站机构
        if (disaFacility.indexOf(item['stationFrom']) == -1) {
            disaFacility.push(item['stationFrom']);
        } else if (disaFacility.indexOf(item['stationTo']) == -1) {
            disaFacility.push(item['stationTo']);
        }
    };

    //获取到联网机构后进行平移缩放
    
    // var zoomed = function () {
    //     groups_out.attr('transform', d3.event.transform);
    // }
    // zoom = d3.zoom().on('zoom',zoomed);
    // var mapTrans = zoomToData(disaFacility)
    // isLog && console.log('disaFacility-------------------->',mapTrans);
    // //平移改省份到中心
    // groups_out.transition().duration(1000).call(zoom.translateTo, mapTrans[0], mapTrans[1]);
    // setTimeout(function() {
    //     groups_out.transition().duration(800).call(zoom.scaleTo, mapTrans[2]);
    // },1000);

    isLog && console.log('facilityData', facilityBloodTypeData);
    isLog && console.log('bloodTypeS', bloodTypeSummary);

    senkeyData.nodes.sort(function (a, b) {
        var aNode = sankeyNodeWeight[a.name];
        var bNode = sankeyNodeWeight[b.name];
        return aNode - bNode;
    });
    senkeyData.links = bloodGroupBloodTypeData;
    sankey(senkeyData);


    // 血液总数
    var totalAmount = 0;



    // 计算最大值和最小值， 总数
    var amountArr = [];

    for (var i in facilityBloodTypeData) {
        var d = facilityBloodTypeData[i];
        var type = d[2];
        var value = d[3];

        bloodTypeSummary[type].minValue = value < bloodTypeSummary[type].minValue ?
            value : bloodTypeSummary[type].minValue; // 最小值
        bloodTypeSummary[type].maxValue = value > bloodTypeSummary[type].maxValue ?
            value : bloodTypeSummary[type].maxValue; // 最大值
        // 总数
        totalAmount += value;

        amountArr.push(value);

    };

    // map point R scale
    radiusScale = d3.scaleLinear()
        .domain([d3.min(amountArr), d3.max(amountArr)])
        .range([3, 8]);


    senkeyData.nodes.forEach(function (v, k) {
        if (bloodTypeSummary.hasOwnProperty(v.name)) {
            bloodTypeSummary[v.name].y0 = v.y0;
            bloodTypeSummary[v.name].x0 = v.x0;
            bloodTypeSummary[v.name].x1 = v.x1;
            bloodTypeSummary[v.name].y1 = v.y1;
        }
    });

    // 按纬度 -> 类型 排序
    //    a[1] b[1] 调剂目标血站
    facilityBloodTypeData.sort(function (a, b) {

        var aPos = [facilityMap[a[1]]['x'], facilityMap[a[1]]['y']];
        var bPos = [facilityMap[b[1]]['x'], facilityMap[b[1]]['y']];
        if (bPos[1] === aPos[1]) {
            return bloodTypeWeight[a[1]] - bloodTypeWeight[b[1]];
        }
        return bPos[1] - aPos[1];
    });

    // 高度累加值
    var bloodTypeHeightSum = {
        "红细胞类": 0,
        "血浆类": 0,
        "血小板类": 0,
        "冷沉淀": 0,
        '低温沉淀物类': 0
    };

    function getLinkPath(primary, secondary) {
        // 曲线算法
        function n(t, n, e, r, i, u, o, s) {
            var c = (t + e) / 2,
                d = (i + o) / 2;
            return ["M", t, ",", n, "C", c, ",", n, " ", c, ",", r, ",", e, ",", r, "L", i, ",", u, "C", d, ",", u, " ", d, ",", s, ",", o, ",", s, "z"].join("")
        }
        // 返回 link 的 path
        return n(primary.x + primary.width, primary.y + primary.height, secondary.x - secondary.width, secondary.y + secondary.height, secondary.x - secondary.width, secondary.y - secondary.height, primary.x + primary.width, primary.y - primary.height)
    }

    // 画 edges
    isLog && console.log('facilityBloodTypeData', facilityBloodTypeData);
    isLog && console.log('bloodTypeSummary', bloodTypeSummary);



    //渲染调剂机构与血液品种连线
    var facilityBloodTypeUpdate = svg.append('g')
        .attr('class', 'facilityBloodLinks')
        .selectAll('path')
        .data(facilityBloodTypeData);

    var facilityBloodTypeEnter = facilityBloodTypeUpdate.enter();

    facilityBloodTypeLinks = facilityBloodTypeEnter.append('path')
        .attr('d', function (d) {

            var start_p = d[0],
                end_p = d[1],
                blood_type = d[2],
                trans_amt = d[3];
            var r = radiusScale(trans_amt);

            // 根据 d[0] 获取地理坐标：
            var coor = projection([facilityMap[start_p]['x'], facilityMap[start_p]['y']]);

            // 地理位置
            var primary = {
                x: coor[0],
                y: coor[1],
                width: 0,
                height: r
            };

            bloodTypeSummary[blood_type].height = bloodTypeSummary[blood_type].y1 - bloodTypeSummary[blood_type].y0;
            var secondaryHeight = bloodTypeSummary[blood_type].height * Math.round((trans_amt / bloodTypeSummary[blood_type].value) * 10000) / 10000;
            // 柱状图位置，略
            var secondary = {
                x: 1600,
                y: bloodTypeSummary[blood_type].y0 + bloodTypeHeightSum[blood_type] + secondaryHeight / 2,
                width: 0,
                height: secondaryHeight / 2
            };
            // 累计高度
            bloodTypeHeightSum[blood_type] += secondaryHeight;

            var edges = {
                primary: primary,
                secondary: secondary
            };
            isLog && console.log("edges", edges);

            return getLinkPath(primary, secondary)

        }).style("fill", function (d) {
            return (d[2] == '红细胞类' ? bgColorMap['links'][d[2]] : '#fff');
        }).style("opacity", function (d) {
            return (d[2] == '红细胞类' ? "0.3" : '0.05');
        }).attr("type", function (d) {
            return d[2];
        }).attr("class", "edges");

    drawLinePlane(facilityBloodTypeData);


    //------------------------------------------------------------

    //渲染机构名称
    svg.append('g')
        .attr('class', 'disaFacility')
        .selectAll('text')
        .data(disaFacility)
        .enter()
        .append('text')
        .attr("transform", function (d) {
            var coor = projection([facilityMap[d]['x'], facilityMap[d]['y']]);
            return "translate(" + coor[0] + "," + coor[1] + ")"
        })
        .attr('x', -50)
        .attr('y', 20)
        .attr('fill', '#fff')
        .transition()
        .duration(1000)
        .text(function (d) {
            return facilityMap[d]['name'];
        });




    var linkUpdate = link
        .data(senkeyData.links);

    var linkEnter = linkUpdate.enter()

    sankeyLinks = linkEnter.append("path")
        .attr("fill", "transparent")
        .attr("d", d3.sankeyLinkHorizontal())
        .attr("stroke", function (d) {
            return d.source.name == '红细胞类' ? bgColorMap['fill'][d.target.name] : '#fff';
        })
        .attr("stroke-width", function (d) {
            return Math.max(1, d.width);
        })
        .style("opacity", function (d) {
            return d.source.name == '红细胞类' ? '0.3' : '0.05';
        });

    sankeyLinks.append("title")
        .text(function (d) {
            return d.source.name + " → " + d.target.name + "\n" + format(d.value);
        });


    var nodeUpdate = node
        .data(senkeyData.nodes);


    var nodeEnter = nodeUpdate.enter();


    var sankeyNodes = nodeEnter.append("rect")
        .attr("x", function (d) {
            return d.x0;
        })
        .attr("y", function (d) {
            return d.y0;
        })
        .attr("height", function (d) {
            return d.y1 - d.y0;
        })
        .attr("width", function (d) {
            return d.x1 - d.x0;
        })
        .attr("fill", function (d) {
            return bgColorMap['fill'][d.name];
        })
        .attr("fill-opacity", "0.4")
        .attr("stroke-width", "2px")
        .attr("stroke-opacity", function (d) {
            if (!(/^[a-zA-Z]*$/.test(d.name))) {
                d.showInd = sankeyNodeWeight[d.name];
                if (d.name == '红细胞类') {
                    d.show = true;
                    return '1';
                } else {
                    d.show = false;
                    return '0';
                }
            } else {
                return "1";
            }
        })
        .attr("stroke", function (d) {
            if (!(/^[a-zA-Z]*$/.test(d.name))) {
                return d.name == '红细胞类' ? bgColorMap['stroke'][d.name] : bgColorMap['fill'][d.name];
            } else {
                return bgColorMap['stroke'][d.name];
            }
        });

    nodeEnter.append("text")
        .attr("x", function (d) {
            if (/^[a-zA-Z]*$/.test(d.name)) {
                return d.name.length < 2 ? (d.x0 + 11) : (d.x0 + 8);
            } else {
                return d.name.length < 3 ? (d.x0 + 4) : d.x0;
            }
        })
        .attr("y", function (d) {
            return (d.y1 + d.y0) / 2;
        })
        .attr("dy", "0.35em")
        .attr("text-anchor", "center")
        .text(function (d) {
            return d.name;
        })
        .attr("fill", "#fff")

    nodeEnter.append("text")
        .attr("x", function (d) {
            return d.x1 + 10
        })
        .attr("y", function (d) {
            return (d.y1 + d.y0) / 2;
        })
        .attr("dy", "0.35em")
        .attr("fill", "#fff")
        .text(function (d) {
            if (!(/^[a-zA-Z]*$/.test(d.name))) {
                return d.name == '红细胞类' ? Math.round(d.value) + "  U" : "";

            } else {
                return Math.round(d.value) + "  U";
            }
        });


    //获取sankey图表血液品种Node
    bloodTypeNodes = sankeyNodes.filter(function (d) {
        return !(/^[a-zA-Z]*$/.test(d.name));
    });


    drawDisaConnect(data);

    autoFocusLinksNodes = window.setInterval(function () {
        switchSankey('next');
    }, switchInterval);


};
//根据数据绘制地图上的点线动画
var transPoints, recvPoints = [];
var dashLine, curveLink = [];

function drawDisaConnect(data) {
    var firstD;

    //处理根据品种分类的数据
    for (var i = 0; i < data.length; i++) {
        data[i]['showInd'] = sankeyNodeWeight[data[i]['key']];
        firstD = data[i]['key'] == '红细胞类' ? data[i]['values'] : [];
    };

    var disaPath = svg.append('g')
        .attr('class', 'disPoint');

    //update 更新动画的位置
    var disaPathUpdate = disaPath.selectAll('circle').data(data)
    var disaPathEnter = disaPathUpdate.enter(); //enter
    var disPathExit = disaPathUpdate.exit(); //exit


    var pointLink = disaPathEnter.append('g')
        .attr('class', function (d, i) {
            d.showInd = sankeyNodeWeight[d.boodType];
            if (d.boodType == '红细胞类') {
                d.show = true;
            } else {
                d.show = false;
            }
            return 'pl_' + d['boodType'] + '_' + i;
        });

    //调入
    recvPoints = pointLink.append('circle')
        .attr('class', 'trans')
        .attr("transform", function (d) {
            var coor = projection([facilityMap[d['stationTo']]['x'], facilityMap[d['stationTo']]['y']]);
            return "translate(" + coor[0] + "," + coor[1] + ")"
        })
        .attr('r', function (d) {
            return radiusScale(d['amount'])
        })
        .style("fill", function (d) {
            return (d['bloodType'] == "红细胞类" ? bgColorMap['links'][d['bloodType']] : '#fff');
        })
        .style("filter", 'url(#' + gaussian.attr('id') + ')');
    // .transition()
    // .duration(2000)
    recvPoints.transition()
        .duration(1000)
        .style('opacity', function (d) {
            return (d['bloodType'] == "红细胞类" ? 1 : 0.1);
        });

    // .transition()
    // .duration(1000)
    // .on('start',shining);

    //调出
    transPoints = pointLink.append('circle')
        .attr('class', 'recv')
        .attr("transform", function (d) {
            var coor = projection([facilityMap[d['stationFrom']]['x'], facilityMap[d['stationFrom']]['y']]);
            return "translate(" + coor[0] + "," + coor[1] + ")"
        })
        .attr('r', function (d) {
            return radiusScale(d['amount'])
        })
        .style("fill", function (d) {
            return (d['bloodType'] == "红细胞类" ? bgColorMap['links'][d['bloodType']] : '#fff');
        })
        .style("filter", 'url(#' + gaussian.attr('id') + ')');

    transPoints.transition()
        .duration(2000)
        .attr('opacity', function (d) {
            return (d['bloodType'] == "红细胞类" ? 1 : 0.3);
        });
    // .transition()
    // .duration(1000)
    // .on('start',shining);

    function shining() {
        d3.active(this)
            .attr('r', function (d) {
                return (radiusScale(d['amount']) - 0 + 0.5)
            })
            .transition()
            .duration(1000)
            .attr('r', function (d) {
                return radiusScale(d['amount'])
            })
            .transition()
            .duration(2000)
            .on('start', shining);
    };

    //连线
    dashLine = pointLink.append("path")
        .attr('fill', 'none')
        .style("stroke-dasharray", "4,4")
        .attr('d', function (d) {
            var start = projection([facilityMap[d['stationFrom']]['x'], facilityMap[d['stationFrom']]['y']]);
            var end = projection([facilityMap[d['stationTo']]['x'], facilityMap[d['stationTo']]['y']]);
            var controlPoint = getBezierCurve(start, end, Math.abs(start[1] - end[1]) < 100 ? 0.8 : 0.7)
            var context = d3.path();
            context.moveTo(start[0], start[1])
            context.quadraticCurveTo(controlPoint[0], controlPoint[1], end[0], end[1]);
            return context.toString();
        });
    dashLine.transition()
        .duration(1000)
        .style("stroke", function (d) {
            return (d['bloodType'] == "红细胞类" ? '#ddd' : 'transparent');
        });

    curveLink = pointLink.append('path')
        .attr('class', 'links')
        .attr('fill', 'none')
        .attr("stroke-width", "2px")
        .attr("stroke", function (d) {
            return (d['bloodType'] == "红细胞类" ? bgColorMap['links'][d['bloodType']] : 'transparent');
        })
        .attr('d', function (d) {
            var start = projection([facilityMap[d['stationFrom']]['x'], facilityMap[d['stationFrom']]['y']]);
            var end = projection([facilityMap[d['stationTo']]['x'], facilityMap[d['stationTo']]['y']]);
            var controlPoint = getBezierCurve(start, end, Math.abs(start[1] - end[1]) < 100 ? 0.8 : 0.7)
            var context = d3.path();
            context.moveTo(start[0], start[1])
            context.quadraticCurveTo(controlPoint[0], controlPoint[1], end[0], end[1]);
            return context.toString();
        });
    curveLink.call(transition);

};

function transition(path) {
    path.transition()
        .duration(7500)
        .attrTween("stroke-dasharray", tweenDash)
}

function tweenDash() {
    var l = this.getTotalLength(),
        i = d3.interpolateString("0," + l, l + "," + l);
    return function (t) {
        return i(t);
    };
}

function zoomToData(data) {
    // let margin = 0.5;
    //
    // let bbox = [this.homeFacility.x - margin, this.homeFacility.y - margin, this.homeFacility.x + margin, this.homeFacility.y + margin];
    var view = [1920, 1080];

    var bbox = data.reduce(function (a, b) {
        return [Math.min(a[0], facilityMap[b]['x']), Math.min(a[1], facilityMap[b]['y']), Math.max(a[2], facilityMap[b]['x']), Math.max(a[3], facilityMap[b]['y'])];
    }, [99999, 99999, 0, 0]);

    bbox = [bbox[0], bbox[1], bbox[2], bbox[3]];

    var bounds = [projection([bbox[0], bbox[3]]), projection([bbox[2], bbox[1]])];

    var dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2, //bbox的中心点x
        y = (bounds[0][1] + bounds[1][1]) / 2, //bbox的中心点y
        scale = 1 / Math.max(dx / view[0], dy / view[1]), //放大系数，纵坐标系数和横坐标系数取小的那个
        translate = [view[0] / 2 - scale * x, view[1] / 2 - scale * y];


    var ox = bounds[0][0]; //bbox旧原点
    var oy = bounds[0][1];
    var scale = scale;
    var dx = view[0] / 2 - (x - ox) * scale; //bbox新原点
    var dy = view[1] / 2 - (y - oy) * scale;

    translate.push(scale);
    return translate;
}


var focusInd = 0;
var focusBloodType = '',
    pre_focusBloodType = '';


function switchSankey(direc) {
    //移除当前聚焦的node
    bloodTypeNodes.filter(function (d) {
            return d.show == true;
        })
        .transition()
        .duration(1000)
        .attr('stroke-opacity', function (d) {
            if (direc === 'next') {
                focusInd = d.showInd > 7 ? 5 : Number(d.showInd) + 1;
            } else {
                focusInd = d.showInd < 6 ? 8 : Number(d.showInd) - 1;
            }
            pre_focusBloodType = d.name;
            d.show = false;
            return 0;
        });
    //聚焦下个node
    bloodTypeNodes.filter(function (d) {
            return d.showInd == focusInd;
        })
        .transition()
        .duration(1000)
        .attr('stroke-opacity', function (d) {
            d.show = true;
            focusBloodType = d.name;
            return 1;
        });
    //移除血液品种和血型links
    sankeyLinks.filter(function (d) {
            return d.source.name == pre_focusBloodType;
        }).transition()
        .duration(1000)
        .attr("stroke", '#fff')
        .style("opacity", '0.05');

    //聚焦血液品种和血型links
    sankeyLinks.filter(function (d) {
            return d.source.name == focusBloodType;
        }).transition()
        .duration(1000)
        .attr("stroke", function (d) {
            return bgColorMap['fill'][d.target.name];
        })
        .style("opacity", '0.3');

    //移除血液品种和调剂机构links
    facilityBloodTypeLinks.filter(function (d) {
            return d[2] == pre_focusBloodType;
        }).transition()
        .duration(1000)
        .style("fill", '#fff')
        .style("opacity", '0.05');

    //聚焦血液品种和调剂机构links
    facilityBloodTypeLinks.filter(function (d) {
            return d[2] == focusBloodType;
        }).transition()
        .duration(1000)
        .style("fill", function (d) {
            return bgColorMap['links'][d[2]];
        })
        .style("opacity", '0.3');

    //调出机构点与调入机构点blur
    transPoints.filter(function (d) {
            return d['bloodType'] == pre_focusBloodType;
        }).style('z-index', 0)
        .transition()
        .duration(1000)
        .style('fill', '#fff')
        .style("opacity", '0.4');

    recvPoints.filter(function (d) {
            return d['bloodType'] == pre_focusBloodType;
        }).style('z-index', 0)
        .transition()
        .duration(1000)
        .style('fill', '#fff')
        .style("opacity", '0.4');

    //调出机构点与调入机构点focus
    transPoints.filter(function (d) {
            return d['bloodType'] == focusBloodType;
        }).style('z-index', 999)
        .transition()
        .duration(1000)
        .style("fill", function (d) {
            return bgColorMap['links'][d['bloodType']];
        })
        .style("opacity", '1');

    recvPoints.filter(function (d) {
            return d['bloodType'] == focusBloodType;
        }).style('z-index', 999)
        .transition()
        .duration(1000)
        .style("fill", function (d) {
            return bgColorMap['links'][d['bloodType']];
        })
        .style("opacity", '1');

    //机构连线动画消失
    dashLine.filter(function (d) {
            return d['bloodType'] == pre_focusBloodType;
        }).style('z-index', 0)
        .transition()
        .duration(1000)
        .style("stroke", 'transparent');

    curveLink.filter(function (d) {
            return d['bloodType'] == pre_focusBloodType;
        }).style('z-index', 0)
        .transition()
        .duration(1000)
        .attr("stroke", 'transparent');

    //机构连线动画出现
    dashLine.filter(function (d) {
            return d['bloodType'] == focusBloodType;
        }).style('z-index', 999)
        .transition()
        .duration(1000)
        .style("stroke", '#ddd');;

    curveLink.filter(function (d) {
            return d['bloodType'] == focusBloodType;
        }).style('z-index', 999)
        .attr("stroke", function (d) {
            return bgColorMap['links'][d['bloodType']];
        })
        .call(transition);

}

// ---------------------------------chartjs-----------------------------------------
var start_val = 0;
var counting = {
    facility: [],
    province: [],
    city: [],
    record: [],
    kilo: []
};
var facilityMap = {};


$(function () {

    function regEvent(ele, event_name, fun) {
        if (window.attachEvent)
            ele.attachEvent(event_name, fun); //IE浏览器
        else {
            event_name = event_name.replace(/^on/, ""); //如果on开头，删除on，如onclick->click
            ele.addEventListener(event_name, fun, false); //非IE浏览器
        }
    }
    // 注册监听Up事件
    regEvent(window, 'btnUp', function (event) {
        if (!autoSwitch) {
            switchSankey('prev');
        }
    });

    //注册监听Down事件
    regEvent(window, 'btnDown', function () {
        if (!autoSwitch) {
            switchSankey('next');
        }
    });


    // 注册监听enter,暂停/结束轮播sankey
    regEvent(window, 'btnOk', function () {
        autoSwitch = !autoSwitch;
        if (autoSwitch) {
            alert(autoSwitch);
            autoFocusLinksNodes = window.setInterval(function () {
                switchSankey('next')
            }, switchInterval);
        } else {
            alert(autoSwitch);
            window.clearInterval(autoFocusLinksNodes);
        }
    })


    //分类统计
    //1.
    $.ajax({
        url: "/mock/provincetype.json",
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        contentType: "application/json",
        data: JSON.stringify({
            "start": moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 23:59:59',
            "end": moment().format('YYYY-MM-DD') + ' 00:00:00'
        }),
        async: false,
        success: function (data, status) {
            if (status == 'success') {
                var res = {};
                data.forEach(function (v, k) {
                    res[v['type']] = v['times'];
                });

                var donut1 = new Morris.Donut({
                    data: [{
                            label: "跨省",
                            value: getPercent(res['跨省'], res['跨省'] + res['省内']) * 100
                        },
                        {
                            label: "省内",
                            value: getPercent(res['省内'], res['跨省'] + res['省内']) * 100
                        }
                    ],
                    colors: ['#01f9a5', '#576d9e'],
                    labelColor: "#fff",
                    element: 'pie-chart-1',
                    strokeWidth: '0',
                    formatter: function (x) {
                        return x + "%"
                    }
                });
                donut1.select(0);
            }
        },
        error: function () {

        }
    });
    //2.
    $.ajax({
        url: "/mock/applytype.json",
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        contentType: "application/json",
        data: JSON.stringify({
            "start": moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 23:59:59',
            "end": moment().format('YYYY-MM-DD') + ' 00:00:00'
        }),
        async: false,
        success: function (data, status) {
            if (status == 'success') {

                var res = {};
                data.forEach(function (v, k) {
                    res[v['type']] = v['times'];
                });

                var donut3 = new Morris.Donut({
                    data: [{
                            label: "需求方",
                            value: getPercent(res['需求方'], res['需求方'] + res['供应方']) * 100
                        },
                        {
                            label: "供应方",
                            value: getPercent(res['供应方'], res['需求方'] + res['供应方']) * 100
                        }
                    ],
                    colors: ['#00edff', '#576d9e'],
                    labelColor: "#fff",
                    element: 'pie-chart-3',
                    strokeWidth: '0',
                    formatter: function (x) {
                        return x + "%"
                    }
                });
                donut3.select(0);
            }
        },
        error: function () {

        }
    });
    //3.
    $.ajax({
        url: "/mock/emergency.json",
        type: 'get',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        contentType: "application/json",
        data: JSON.stringify({
            "start": moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 23:59:59',
            "end": moment().format('YYYY-MM-DD') + ' 00:00:00'
        }),
        async: false,
        success: function (data, status) {
            if (status == 'success') {

                var res = {};
                data.forEach(function (v, k) {
                    res[v['type']] = v['times'];
                });

                var donut4 = new Morris.Donut({
                    data: [{
                            label: "紧急",
                            value: getPercent(res['紧急'], res['紧急'] + res['常规']) * 100
                        },
                        {
                            label: "常规",
                            value: getPercent(res['常规'], res['紧急'] + res['常规']) * 100
                        }
                    ],
                    colors: ['#fa6a61', '#576d9e'],
                    labelColor: "#fff",
                    element: 'pie-chart-4',
                    strokeWidth: '0',
                    formatter: function (x) {
                        return x + "%"
                    }
                });
                donut4.select(0);
            }
        },
        error: function () {

        }
    });




    //获取百分比
    function getPercent(num, total) {
        num = parseFloat(num);
        total = parseFloat(total);
        if (isNaN(num) || isNaN(total)) {
            return "0";
        }
        return total <= 0 ? "0" : (Math.round(num / total * 100) / 100);
    }

    function sortArrayByAttr(array, attribute, sort) {
        return d3.nest()
            .key(function (d) {
                return d[attribute];
            }).sortKeys(sort)
            .entries(array);
    };

    //血站字典
    $.ajax({
        url: "/mock/dicts/facility.json",
        //url: "demoJsonData/facility.js",
        dataType: 'json',
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        success: function (data, status) {

            if (status == 'success') {
                counting.facility.push(data.length);
                counting.province.push(sortArrayByAttr(data, 'adm').length);
                counting.city.push(sortArrayByAttr(data, 'region').length);
                counting.record.push(1562);
                counting.kilo.push(120356);

                facilityMap = {};
                $.each(data, function (k, v) {
                    //地图血站名称重叠的特殊偏移处理
                    if (v.id == '90017') {
                        //江苏省血液中心
                        v.y -= 0.08;
                    }
                    facilityMap[v.id] = v;
                })

                d3.select(".ctdFac")
                    .selectAll('.txt')
                    .attr("class", "txt")
                    .data(counting.facility)
                    .enter()
                    .append('text')
                    .text(start_val)
                    .call(textTransition);

                d3.select(".ctdPro")
                    .selectAll('.txt')
                    .attr("class", "txt")
                    .data(counting.province)
                    .enter()
                    .append('text')
                    .text(start_val)
                    .call(textTransition);

                d3.select(".ctdCity")
                    .selectAll('.text')
                    .attr("class", "txt")
                    .data(counting.city)
                    .enter()
                    .append('text')
                    .text(start_val)
                    .call(textTransition);

                d3.select(".ctdRecord")
                    .selectAll('.text')
                    .attr("class", "txt")
                    .data(counting.record)
                    .enter()
                    .append('text')
                    .text(start_val)
                    .call(textTransition);

                d3.select(".ctdKilo")
                    .selectAll('.text')
                    .attr("class", "txt")
                    .data(counting.kilo)
                    .enter()
                    .append('text')
                    .text(start_val)
                    .call(textTransition);

                function textTransition(text) {
                    text.transition()
                        .duration(3000)
                        .tween("text", function (d) {
                            var that = this;
                            var i = d3.interpolate(this.textContent, d),
                                prec = (d + "").split("."),
                                round = (prec.length > 1) ? Math.pow(10, prec[1].length) : 1;

                            return function (t) {
                                that.textContent = Math.round(i(t) * round) / round;
                            };
                        })
                    // .on("end", function() {
                    //     d3.select(this)
                    //        .transition()
                    //        .duration(100)
                    //        .delay(5000)
                    //        .text(start_val)
                    //        .call(textTransition);
                    // });
                };

            }

        },
        error: function (code, data) {}
    });



    //实时动态
    $.ajax({
        url: '/mock/dispatch.json',
        //url: "demoJsonData/eventDispatch.js",
        dataType: 'json',
        data: {
            startTime: moment().subtract(1, 'month').format('YYYY-MM-DD') + ' 23:59:59',
            endTime: moment().format('YYYY-MM-DD') + ' 00:00:00'
        },
        async: false,
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        success: function (data, status) {
            if (status == 'success') {
                moment.locale('cn');

                var resStr = "";
                $.each(data, function (k, v) {

                    switch (v.eventType) {
                        case '调剂申请':
                            v.eventType = '调剂';
                            v.desc = (facilityMap[v.facility] ? facilityMap[v.facility]['name'] : "") + '提交调剂申请。';
                            break;
                        case '血站审核':
                            v.eventType = '审核';
                            v.desc = (facilityMap[v.facility] ? facilityMap[v.facility]['name'] : "") + '审核通过调剂申请。';
                            break;
                        case '审批':
                            v.desc = (facilityMap[v.facility] ? facilityMap[v.facility]['name'] : "") + '审批调剂申请。';
                            break;
                        case '出库确认':
                            v.eventType = '出库';
                            v.desc = (facilityMap[v.facility] ? facilityMap[v.facility]['name'] : "") + '进行出库确认。';
                            break;
                        default:
                            v.desc = '';
                    }

                    resStr += '<li class="newlist"><span class="l"><span class="' + (v.eventType == "调剂" ? "color-active" : "color-direct") + '">[' + v['eventType'] + '] </span>' + v.desc + '</span><span class="r">' + moment(v.time).fromNow() + '</span></li>';
                });
                $('.bottom-left-panel ul')[0].innerHTML = resStr;


                // 初始化定位并且实现动画
                $('#news').css('top', 0);
                var scrollHeight = $('#news').height();
                var step = $('#news>li').height();

                if (data.length > 5) {
                    var newsScrollInterval = setInterval(function () {
                        var top = $('#news').position().top;
                        if ((scrollHeight - Math.abs(top)) < step * 5) {
                            $('#news').animate({
                                'top': 0
                            }, 'slow', 'linear');
                        } else {
                            var move_length = top - step;
                            $('#news').animate({
                                'top': move_length
                            }, 'slow', 'linear');
                        }
                    }, 3000)
                }
            }
        },
        error: function () {

        }
    });


    //调剂趋势
    var renderTypeMap = {
        "红细胞类": "rbc",
        "全血类": "rbc",
        "血浆类": "plm",
        "血小板类": "plt",
        "冷沉淀": "cry",
        "低温沉淀物类": "cry",

    };
    var render_data = [];
    var renderDateMap = {};

    $.ajax({
        url: "/mock/dayType.json",
        //     url: './simulationjson/dayType.json',
        dataType: 'json',
        beforeSend: function (request) {
            request.setRequestHeader("dashboard-device-id", "testdeviceid");
        },
        data: {
            start: moment().subtract(30, 'days').format('YYYY-MM-DD') + ' 23:59:59',
            end: moment().format('YYYY-MM-DD') + ' 00:00:00'
        },
        async: false,
        success: function (data, status) {
            if (status == 'success') {

                for (var i = 0; i < 30; i++) {
                    render_data[i] = {
                        day: moment('2018-08-26').subtract(i, 'days').format('YYYY-MM-DD'),
                        "rbc": 0,
                        "plt": 0,
                        "plm": 0,
                        "cry": 0
                    };
                    renderDateMap[moment('2018-08-26').subtract(i, 'days').format('YYYY-MM-DD')] = i;
                }

                var sorted_data = sortArrayByAttr(data, 'date', d3.ascending);

                $.each(sorted_data, function (k, v) {
                    v['values'].map(function (v, k) {
                        if (v.type == '全血类') {
                            v.volume = Math.round(v.volume / 200);
                        } else if (v.type == '血浆类') {
                            v.volume = Math.round(v.volume / 100);
                        }
                        console.log('111', v.date);
                        console.log('222', renderDateMap);

                        render_data[renderDateMap[v.date]][renderTypeMap[v.type]] += v.volume;
                    })
                });
                console.log(render_data);
                new Morris.Line({
                    data: render_data,
                    xkey: 'day',
                    ykeys: ["rbc", "plm", "plt", "cry"],
                    labels: ["红细胞类", "血浆类", "血小板类", "冷沉淀"],
                    lineColors: [bgColorMap['fill']['红细胞类'], bgColorMap['fill']['血浆类'], bgColorMap['fill']['血小板类'], bgColorMap['fill']['冷沉淀']],
                    xLabelFormat: function (x) {
                        return (new Date(x)).format("MM-dd")
                    },
                    postUnits: '单位',
                    lineWidth: 1,
                    pointSize: 3,
                    pointStrokeColors: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)'],
                    element: 'line-chart-1'
                });
            }
        },
        error: function () {

        }
    });



});