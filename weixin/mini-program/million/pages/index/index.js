const config = require('./config');
const util = require('../../utils/util.js')
const Dialog = require('../../dist/dialog/dialog');
const wxCharts = require('../../utils/wxcharts.js');
const moment = require('../../utils/moment.js');
var lineChart = null;


//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        test001: 100000,
        test002: 4000,
        test003: 5,
        test004: 1000000,
        test005: 0,
    },
    //事件处理函数
    bindViewTap: function () {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    clearInput() {
        const viewData = util.coreComput(parseFloat(this.data.test001), parseFloat(this.data.test002), parseFloat(this.data.test003), parseFloat(this.data.test004), parseFloat(this.data.test005));
        // Dialog({
        //     message: `我与一百万的距离：${viewData.result}`,
        //     selector: '#zan-no-title-dialog'
        // }).then(() => {
        //     console.log('=== dialog ===', 'type: confirm');
        // });

        var series = [{
            name: '我的钱',
            data: viewData.data,
            format: function (val, name) {
                return val.toFixed(2) + '元';
            }
        }];
        lineChart.updateData({
            categories: viewData.categories,
            series: series
        });

        wx.setStorageSync('countResult', viewData)
        wx.navigateTo({
            url: '../result/result'
        })

        // this.setData({
        //     value: ''
        // });
    },
    handleTest001Change(event) {
        this.setData({test001: event.detail.detail.value})

    },
    handleTest002Change(event) {
        this.setData({test002: event.detail.detail.value})

    },
    handleTest003Change(event) {
        this.setData({test003: event.detail.detail.value})
    },
    handleTest004Change(event) {
        this.setData({test004: event.detail.detail.value})
    },
    handleTest005Change(event) {
        this.setData({test005: event.detail.detail.value})
    },
    touchHandler: function (e) {
        lineChart.scrollStart(e);
    },
    moveHandler: function (e) {
        lineChart.scroll(e);
    },
    touchEndHandler: function (e) {
        lineChart.scrollEnd(e);
        lineChart.showToolTip(e, {
            format: function (item, category) {
                return category + ' ' + item.name + ':' + item.data
            }
        });
    },
    createSimulationData: function () {
        var categories = [];
        var data = [];
        for (var i = 0; i < 10; i++) {
            categories.push('201620162-' + (i + 1));
            data.push(Math.random() * (20 - 10) + 10);
        }
        return {
            categories: categories,
            data: data
        }
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }

        var windowWidth = 320;
        try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
        } catch (e) {
            console.error('getSystemInfoSync failed!');
        }

        var simulationData = this.createSimulationData();
        lineChart = new wxCharts({
            canvasId: 'lineCanvas',
            type: 'line',
            categories: simulationData.categories,
            animation: false,
            series: [{
                name: '我的钱',
                data: simulationData.data,
                format: function (val, name) {
                    return val.toFixed(2) + '元';
                    // return val.toFixed(2);
                }
            }],
            xAxis: {
                disableGrid: false
            },
            yAxis: {
                title: '总存款 (元)',
                format: function (val) {
                    return val.toFixed(2);
                },
                min: 0
            },
            width: windowWidth,
            height: 200,
            dataLabel: false,
            dataPointShape: true,
            enableScroll: true,
            extra: {
                lineStyle: 'curve'
            }
        });
    },
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    }
})
