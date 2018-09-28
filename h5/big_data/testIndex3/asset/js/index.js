var setTime=function(){
    //visitTime
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var day = now.getDate();
        var hour = now.getHours();
        var minute = now.getMinutes();
        var seconds = now.getSeconds();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        if (hour < 10) {
            hour = "0" + hour;
        }
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        var nowdate = year + "年" + month + "月" + day + "日" + hour + "点" + minute + "分" + seconds + "秒";
        $('#runtime').html(nowdate);
    };

var chartsResize = function () {
    
    //bulidMap1.resize();
    //bulidMap2.resize();
    //bulidMap3.resize();
};
    
$(window).resize(function () {
    //chartsResize();
});



