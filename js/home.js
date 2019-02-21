window.onload=function(){
//	引入js文件
	$.getScript('js/common.js');

//轮播图
	//轮播图
	var list=$('.list');
	var lis=list.children();
	var ind=0,timer=null,flag=true,autoTimer=null;
	//自动播放
	autoTimer=setInterval(moveR,2000);
	//鼠标移入停止播放
	$(".view").on('mouseenter',function(){
		clearInterval(autoTimer);
	})
	//鼠标移出开始播放
	$(".view").on('mouseleave',function(){
		autoTimer=setInterval(moveR,2000);
	})
	//向右移的方法
	function moveR(){
		if(flag){
			flag=false;
			//每点一次，让ind加1
			ind++;
			if(ind==$(".hot>li").length){
				$(".hot>li").eq(0).addClass('active').siblings().removeClass('active');
			}else{
				$(".hot>li").eq(ind).addClass('active').siblings().removeClass('active');
			}
			list.animate({'left':(-1000)*ind+'px'},2000,function(){
				//判断当ind等于li个数-1 个时，把ind设为0，list位置设为0
				if(ind==lis.length-1){
					ind=0;
					list.css('left',0+'px');
				}
				flag=true;
			})
		}
		var imgurl=$(".list>li").eq(ind).css("background-image").match(/img\/lunbo\d{1}.jpg/g)[0];
		img.src=imgurl;
		img.onload = function() {
			ctx.drawImage(img,0,0,myc.width,myc.height);
			getLineColor(0,1,myc.height,luL);
			getLineColor(myc.width-1,myc.width,myc.height,luR);
		} 			
	}
	//轮播图点击点
	$(".hot").on('click','li',function(){
		ind=$(this).index();
		list.animate({'left':(-1000)*ind+'px'},0,);
		$(this).addClass('active').siblings().removeClass('active');
	})

//画布填充颜色
	var luL=document.getElementsByClassName('luL')[0];
	var luR=document.getElementsByClassName('luR')[0];
	var myc=document.getElementById('myCanvas');
	var ctx=myc.getContext("2d");
	var img=document.createElement('img');
	//获取y轴方向的数据
	//x1---第一个点的x坐标
	//x2---第二个点的x坐标
	//h----图片的高度
	//ele--要添加颜色的元素
	function getLineColor(x1,x2,h,ele){
		var r=0,g=0,b=0;
		for(var i=0;i<h;i++){
			var imgdata=ctx.getImageData(x1,i,x2,i+1);
			var d=imgdata.data;
			r+=d[0];
			g+=d[1];
			b+=d[2];
		}
		ele.style.backgroundColor='rgba('+r/h+','+g/h+','+b/h+',1)';				
	}

//渲染数据

//优选必买
//http://www.sfbest.com/ajaxIndex/GetPerfectGoods/?callback=jsonp1544779341198
jpGetData("http://www.sfbest.com/ajaxIndex/GetPerfectGoods/?callback=","cbbimai");
window.cbbimai=function(a){
	showbimai(a.upProduct);
	showbimai(a.downProduct);
//	抢购数据
	showqiang(a.upProduct)	
}
	
//渲染必买数据的方法
function showbimai(arr){
	for(var i=0;i<arr.length;i++){
		var li=document.createElement('li');
		//product_id
		li.setAttribute("pid",arr[i]['product_id']);
		li.setAttribute("urlimg",arr[i]['img']);
		var pname=document.createElement('p');
		$(pname).addClass('puname')
		
		pname.innerText=arr[i].name;
		li.appendChild(pname);
		var pri=document.createElement('p');
		$(pri).addClass('ppri')
		
		pri.innerText="￥"+arr[i].price;
		li.appendChild(pri);
		var iImg=document.createElement('i');	
		iImg.style.backgroundImage="url("+arr[i].productIndexPic+")";
		li.appendChild(iImg);
		var divc=document.createElement('div');
		$(divc).addClass('gcart');
		var spc=document.createElement('span');
		spc.innerText="加入购物车";
		divc.appendChild(spc);
		li.appendChild(divc);
		$(".bimailist").append(li);
	}	
}

//设置限时抢购剩余时间倒计时
setInterval(function(){
	//获取当前时间
	var d=new Date();
	var nh=d.getHours();
	var nm=d.getMinutes();
	var ns=d.getSeconds();
//倒计时截止时间为12时和24时
	var jh="12";
	var jm="60";
	var js="60";
	if(nh>=12){
		jh="24";
	}

	var dnh=(jh-nh-1)>9?(jh-nh-1).toString():"0"+(jh-nh-1);
	if(dnh==jh){dnh="00"}
	var dnm=(jm-nm-1)>9?(jm-nm-1).toString():"0"+(jm-nm-1);
	if(dnm==jm){dnm="00"}
	
	var dns=(js-ns)>9?(js-ns).toString():"0"+(js-ns);
	if(dns==js){dns="00"}
	$("#nh1").text(dnh.substr(0,1));
	$("#nh2").text(dnh.substr(1));
	$("#nm1").text(dnm.substr(0,1));
	$("#nm2").text(dnm.substr(1));
	$("#ns1").text(dns.substr(0,1));
	$("#ns2").text(dns.substr(1));
},1000)

//抢购
//http://www.sfbest.com/ajax/GetQingIndex  
//post方式不会请求数据 暂用其他数据代替

//渲染抢购数据的方法
function showqiang(arr){
	for(var i=0;i<arr.length;i++){
		var li=document.createElement('li');
		//product_id
		li.setAttribute("pid",arr[i]['product_id']);
		li.setAttribute("urlimg",arr[i]['img']);
		
		var iImg=document.createElement('i');	
		iImg.style.backgroundImage="url("+arr[i].img+")";
		li.appendChild(iImg);

		var pname=document.createElement('p');
		$(pname).addClass('puname')
		pname.innerText=arr[i].name;
		li.appendChild(pname);
		var pri=document.createElement('p');
		$(pri).addClass('ppri')
		
		pri.innerText="￥"+arr[i].price;
		li.appendChild(pri);
		var divq=document.createElement('div');
		divq.innerText='抢购';
		li.appendChild(divq);
		$(".qianglist").append(li);
	}	
}

//渲染数据
//水果数据
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118046&cId=7&floorId=297

jpGetData("http://www.sfbest.com/ajaxIndex/GetFloorGoods/?floorId=297&callback=","cbshuiguo");
window.cbshuiguo=function(a){
	showdata(a,"shuiguo");
}

//肉类
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118047&cId=7&floorId=301
jpGetData("http://www.sfbest.com/ajaxIndex/GetFloorGoods/?floorId=301&callback=","cbrou");
window.cbrou=function(a){
	showdata(a,"rou");
}

//速食冷藏
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118048&cId=0&floorId=357
jpGetData("http://www.sfbest.com/ajaxIndex/GetFloorGoods/?floorId=357&callback=","cbsushi");
window.cbsushi=function(a){
	showdata(a,"sushi");
}
//粮油干货
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118049&cId=7&floorId=309
jpGetData("http://www.sfbest.com/ajaxIndex/GetFloorGoods/?floorId=309&callback=","cbganhuo");
window.cbganhuo=function(a){
	showdata(a,"ganhuo");
}
//休闲糖巧
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118050&cId=7&floorId=173
jpGetData("http://www.sfbest.com/ajaxIndex/GetFloorGoods/?floorId=173&callback=","cbtang");
window.cbtang=function(a){
	showdata(a,"tang");
}
//冲调茶饮
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118051&cId=5&floorId=371
//茶水饮料
//http://www.sfbest.com/ajaxIndex/GetFloorGoods/?callback=jsonp1544836118052&cId=4&floorId=169

//创建节点渲染商品的方法
function showdata(arr,claN){
	for(var i=0;i<arr.length;i++){
		var li=document.createElement('li');
		//product_id
		li.setAttribute("pid",arr[i]['product_id']);
		li.setAttribute("urlimg",arr[i]['img']);
		
		var iImg=document.createElement('i');	
		iImg.style.backgroundImage="url("+arr[i].img+")";
		li.appendChild(iImg);

		var pname=document.createElement('p');
		$(pname).addClass('puname')
		pname.innerText=arr[i].ProductAbbreviation;
		li.appendChild(pname);
		var pri=document.createElement('p');
		$(pri).addClass('ppri')
		pri.innerText="￥"+arr[i].price;
		li.appendChild(pri);
		var divq=document.createElement('div');
		$(divq).addClass('gcart');
		divq.innerText='加入购物车';
		li.appendChild(divq);
		$("."+claN).append(li);
	}	
}

//jsonp获取数据的方法
function jpGetData(url,cb){
	var scri=document.createElement('script');
	scri.src=url+cb;
	document.body.appendChild(scri)	
}

//吸顶导航
$(window).on('scroll',function(){
	if($(window).scrollTop()>0){
		$("#totop").css('display','block');
	}else{
		$("#totop").css('display','none');
	}
//	当页面在最开始的位置时,返回头部按钮隐藏，超过一定位置后显示
})
//一键置顶
$("#totop").on('click',function(){
	$(window).scrollTop(0);
})



	
//跳转到详情页	
$(".goshopcar").on('click','li',function(){
	var pid=$(this)[0].getAttribute('pid');
	var urlimg=$(this)[0].getAttribute('urlimg');
	var name=$(this).children().filter('.puname').text();
	var pri=$(this).children().filter('.ppri').text().substr(1);
	location.href="detail.html#"+pid+'&'+encodeURI(name)+'&'+pri+'&'+urlimg;
})
	
/*********购物车部分*购物车部分*购物车部分*购物车部分********************/

//加入购物车
$(".goshopcar").on('click','div',function(e){
	console.log(1234);
	addShopCar($(this),'1');
	//阻止冒泡
	e.stopPropagation();
	return false;
})

//根据本地存储中的值渲染购物车数据
showcar();

//如果购物车为空,侧边栏不显示件数
if(mynum>0){
	$(".connum").css('display','block');
	$("#fixshow").css('display','none');
}
$(".cnum").text(mynum);
}