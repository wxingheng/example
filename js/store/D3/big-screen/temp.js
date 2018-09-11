/**
 * Created by kai on 2018/6/24.
 */
function drawDisaConnect(data,bloodTypeHash) {

    var disaPath = svg.append('g')
        .attr('class', 'disPoint');

    //update 更新动画的位置
    var disaPathUpdate = disaPath.selectAll('circle').data(data)
    var disaPathEnter = disaPathUpdate.enter();  //enter
    var disPathExit = disaPathUpdate.exit();    //exit


    var pointLink = disaPathEnter.append('g')
        .attr('class', function (d, i) {

            if (d[2] == bloodTypeHash[0]) {
                d.show = true;
            } else {
                d.show = false;
            }
            return 'pl_' + d[2] + '_' + i;
        });

    //调入
    recvPoints = pointLink.append('circle')
        .attr('class', 'trans')
        .attr("transform", function (d) {
            var coor = projection([facilityMap[d['stationTo']]['x'], facilityMap[d['stationTo']]['y']]);
            return "translate(" + coor[0] + "," + coor[1] + ")"
        })
        .attr('r', function (d) {
            return radiusScale(d[3])
        })
        .style("fill", function (d) {
            return (d['bloodType'] == bloodTypeHash[0] ? bgColorMap['links'][d['bloodType']] : '#fff');
        })
        .style("filter", 'url(#' + gaussian.attr('id') + ')');
    // .transition()
    // .duration(2000)
    recvPoints.transition()
        .duration(1000)
        .style('opacity', function (d) {
            return (d['bloodType'] == bloodTypeHash[0] ? 1 : 0.1);
        });

    // .transition()
    // .duration(1000)
    // .on('start',shining);

    //调出
    transPoints = pointLink.append('circle')
        .attr('class', 'recv')
        .attr("transform", function (d) {
            var coor = projection([facilityMap[d[0]]['x'], facilityMap[d[0]]['y']]);
            return "translate(" + coor[0] + "," + coor[1] + ")"
        })
        .attr('r', function (d) {
            return radiusScale(d[3])
        })
        .style("fill", function (d) {
            return (d['bloodType'] == bloodTypeHash[0] ? bgColorMap['links'][d['bloodType']] : '#fff');
        })
        .style("filter", 'url(#' + gaussian.attr('id') + ')');

    transPoints.transition()
        .duration(2000)
        .attr('opacity', function (d) {
            return (d['bloodType'] == bloodTypeHash[0] ? 1 : 0.3);
        });
    // .transition()
    // .duration(1000)
    // .on('start',shining);

    function shining() {
        d3.active(this)
            .attr('r', function (d) {
                return (radiusScale(d[3]) - 0 + 0.5)
            })
            .transition()
            .duration(1000)
            .attr('r', function (d) {
                return radiusScale(d[3])
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
            var start = projection([facilityMap[d[0]]['x'], facilityMap[d[0]]['y']]);
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
            return (d['bloodType'] == bloodTypeHash[0] ? '#ddd' : 'transparent');
        });

    curveLink = pointLink.append('path')
        .attr('class', 'links')
        .attr('fill', 'none')
        .attr("stroke-width", "2px")
        .attr("stroke", function (d) {
            return (d['bloodType'] == bloodTypeHash[0] ? bgColorMap['links'][d['bloodType']] : 'transparent');
        })
        .attr('d', function (d) {
            var start = projection([facilityMap[d[0]]['x'], facilityMap[d[0]]['y']]);
            var end = projection([facilityMap[d['stationTo']]['x'], facilityMap[d['stationTo']]['y']]);
            var controlPoint = getBezierCurve(start, end, Math.abs(start[1] - end[1]) < 100 ? 0.8 : 0.7)
            var context = d3.path();
            context.moveTo(start[0], start[1])
            context.quadraticCurveTo(controlPoint[0], controlPoint[1], end[0], end[1]);
            return context.toString();
        });
    curveLink.call(transition);

};