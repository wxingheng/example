$(function(){
	if (!window.console) {
		window.console = {
			log: function(msg) {
		   }
		}
	}
	/** 日期格式化互相转换
	* 对Date的扩展，将 Date 转化为指定格式的String
	* 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、 可以用 1-2 个占位符
	* 年(y)可以用 1-4 个占位符
	* eg:
	* util.formatDate(new Date(),"yyyy-MM-dd hh:mm:ss") ==> 2006-07-02 08:09:04
	* util.parseDate("2006-07-02 08:09:04","yyyy-MM-dd hh:mm:ss"));
	*/
	var DateTimeFormat=function(pattern){
		this.pattern=pattern;
	}

	DateTimeFormat.prototype={
		parse:function(str){
			this.str=str;
			var date=new Date(0);
			var y=this._getVal("y+",2100);
			date.setFullYear(y?(y<100?(y+1900):y):1970);
			//
			var m=this._getVal("M+",12);
			date.setMonth(m?(m-1):0);
			date.setDate(this._getVal("d+",31)||1);
			//
			date.setHours(this._getVal("H+",23) || this._getVal("h+",23) || 0);
			date.setMinutes(this._getVal("m+",59) || 0);
			date.setSeconds(this._getVal("s+",59) || 0);
			return date;
		},
		format:function(date){
			var fmt=this.pattern;
			if(/(y+)/.test(fmt)){
				fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
			}
			var o={
				"M+" : date.getMonth()+1, //月份
				"d+" : date.getDate(), //日
				"h+" : date.getHours(), //小时
				"H+" : date.getHours(), //小时
				"m+" : date.getMinutes(), //分
				"s+" : date.getSeconds() //秒
			};
			for(var k in o){
				if(new RegExp("("+ k +")").test(fmt)){
					fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
				}
			}
			return fmt;
		},
		_getVal:function(partRegex,maxValue){
			if(new RegExp("("+ partRegex +")").test(this.pattern)){
			    var rightLen=RegExp.rightContext.length||0;
			    var idx=RegExp.leftContext.length||0;
			    var len=this.pattern.length-rightLen;
			    var val=this.str.substring(idx,len);
			    val=new Number(val);
			     if(val=="00")
			   	 {return "00"}
			    if(!isNaN(val) && val>0 && val<=maxValue){
			      	return val;
			    }else{
			    	 throw new Error('Date['+this.str+"] format error,pattern="+this.pattern+",partRegex="+partRegex);
			    }
		    }
		    return false;
		}
	}

	Date.prototype.format=function(pattern) {
		return new DateTimeFormat(pattern).format(this);
	}

	window.util={
		toString:function(obj){
			if(obj){
				return JSON.stringify(obj);
			}else{
				return ""+obj;
			}
		},log:function(obj){
			if(window.console){
				if(obj && typeof(obj)=='object'){
					obj=util.toString(obj);
				}
				console.log(obj);
			}
		},logAble:function(){
			return window.console!=null;
		},error:function(obj){
			if(window.console && window.console.error){
				console.error(obj);
			}else{
				if(window.Error){
					throw new Error(obj);
				}else{
					alert(obj);
				}
			}
		},formatDate:function(date,pattern){
			return new DateTimeFormat(pattern).format(date);
		},parseDate:function(dateStr,pattern){
			return new DateTimeFormat(pattern).parse(dateStr);
		},alert:function(msg){
			alert(msg);
		},trim:function(el){
			_trim(el);
		},prox:function(day){
			var today=new Date();
			var endTime = new DateTimeFormat("yyyy-MM-dd hh:mm:ss").format(today);
			var t=today.getTime()-1000*60*60*24*day;
			var yesterday=new Date(t);
			var startTime  = new DateTimeFormat("yyyy-MM-dd hh:mm:ss").format(yesterday);
			return 'startTime='+startTime+'&endTime='+endTime;
		},current:function(){
			var today=new Date();
			var t=today.getTime()-1000*60*60*24;
			var yesterday=new Date(t);
			yesterday.setHours(23);
			yesterday.setMinutes(59);
			yesterday.setSeconds(59);
			yesterday.setMilliseconds(59);
			var startTime  = new DateTimeFormat("yyyy-MM-dd hh:mm:ss").format(yesterday);
			var endTime = new DateTimeFormat("yyyy-MM-dd hh:mm:ss").format(today);
			return 'startTime='+startTime+'&endTime='+endTime;
		}
	};

	util.ajaxError=function(code,r){
		util.alert('系统错误，请稍后重试。');
	};

	util.ajax=function(obj){
		var temp={"contentType":'application/js',dataType:'json',type:"get"};
		$.extend(temp,obj);
		if(typeof(temp.data)=='object'){
			var td=util.toString(temp.data);
			temp.data=td;
		}
		if(temp.success){
			var tempFun=temp.success;
			temp.success=function(r){
				util.log(util.toString(r));
				if(r.resultCode>300){
					util.ajaxError(r.resultCode,r);
				}else{
					tempFun(r);
				}
			}
		}
		$.ajax(temp);
	}

	// util.domain = "https://daas.bloodcloud.com";
	util.domain = "";
});
