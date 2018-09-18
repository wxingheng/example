//logs.js
const util = require('../../utils/util.js')

Page({
    data: {
        logs: [],
        detail: [
            {time: '2018-07', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
            {time: '第一期', month: '4354546.456', corpus: '456354', int: '4556.4165'},
        ]
    },
    onLoad: function () {
        this.setData({
            logs: (wx.getStorageSync('logs') || []).map(log => {
                return util.formatTime(new Date(log))
            }),
            viewData: wx.getStorageSync('countResult') || []
        })
        console.log(this.data.viewData);
    }
})
