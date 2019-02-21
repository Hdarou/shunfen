//获取元素样式
function getStyle(ele,prop){
	if(window.getComputedStyle){
		return window.getComputedStyle(ele,false)[prop];
	}else{
		return ele.currentStyle[prop];
	}
}          
          
//给obj加一个叫cla的类
function addClass(obj,cla){
	if(hasClass(obj,cla)){
		return false;
	}else{
		var a = obj.className+" "+cla;
	    obj.className=a.trim();
	}

}

//从obj的类中删除cla
function delClass(obj,cla){
	var reg = new RegExp(cla+"(\\s|$)")
	obj.className=obj.className.replace(reg,"")  // "c1 c2 fs12"
    return obj
}

//检测obj有没有cla这个class   返回true/false
function hasClass(obj,cla){
	var reg = new RegExp("(\\s|^)"+cla+"(\\s|$)","g")
	return !!obj.className.match(reg)
}

//切换类
function toggleClass(obj,cla){
	if(hasClass(obj,cla)){  //如果obj有cla这个类 就删掉
		delClass(obj,cla);
	}else{                  //obj没有cla类 就给他加上
		addClass(obj,cla);
	}
}

//获取页面的滚动距离
function getScroll(){
	if(window.pageXOffset){
		return{
			"x":window.pageXOffset,
			"y":window.pageYOffset
		}
	}else{
		return{
			"x":document.body.scrollLeft+document.documentElement.scrollLeft,
			"y":document.body.scrollTop+document.documentElement.scrollTop
		}
	}
}

//获取元素距离页面左/上的距离
function getPos(ele){
	var pos={
		"left":ele.offsetLeft,
		"top":ele.offsetTop
	};
	if(ele.offsetParent){
		pos.left = getPos(ele.offsetParent).left+pos.left;
		pos.top = getPos(ele.offsetParent).top+pos.top;
	}
	return pos;
}
//获取页面可视宽高
function getSize(){
	    if(window.innerWidth){
	   	    return {
	   	    	"width":window.innerWidth,
	   	    	"height":window.innerHeight
	   	    }		    	
	    }else if(document.compatMode=='BackCompat'){
	   	    return {
	   	    	"width":document.body.clientWidth,
	   	    	"height":document.body.clientHeight
	   	    }
	   }else if(document.compatMode=='CSS1Compat'){
	   	    return {
	   	    	"width":document.documentElement.clientWidth,
	   	    	"height":document.documentElement.clientHeight
		   	    }		   	
		   }
   
   }



//cookie方法

var Cookie={
	//设置cookie             oexp 过期时间  单位是分钟
	set:function(oname,ovalue,oexp){
		var oname = encodeURIComponent(oname); 
		var ovalue = encodeURIComponent(ovalue); 
		var d = new Date();
		d.setMinutes(d.getMinutes()+oexp);
		document.cookie=oname+"="+ovalue+";expires="+d.toGMTString();
	},
	get:function(oname){   //获取cookie中name对应的值    返回对应的值
		var oname = encodeURIComponent(oname);
		var arr = document.cookie.split("; ");
		for(var i=0;i<arr.length;i++){
			var brr = arr[i].split("=");
			if(brr[0]==oname){
				return decodeURIComponent(brr[1])
			}
		}
	},
	has:function(oname){  //判断是否存在该name   返回true/false
		var oname = encodeURIComponent(oname);
		var arr = document.cookie.split("; ");
		return arr.some(function(a){
				return a.split("=")[0]==oname
		})		
	},
	del:function(oname){  //删除指定name和它的value
		var oname = encodeURIComponent(oname);
		var arr = document.cookie.split("; ");
		for(var i=0;i<arr.length;i++){
			var brr = arr[i].split("=");
			if(brr[0]==oname){
				var d = new Date();
				d.setMinutes(-1);
				document.cookie=oname+"="+brr[1]+";expires="+d.toGMTString();
				return decodeURIComponent(brr[0])+"="+decodeURIComponent(brr[1])
			}
		}
		
	}
}
