
//	初始化总件数和总价格
var mynum=0	;//总件数
var allmoney=0;//总价格
	//var y=[1,"s"]
	//localStorage.setItem("x",y)
	//	console.log(localStorage.getItem("x"))
	for(k in localStorage) {
		if(localStorage.hasOwnProperty(k)) {
			//console.log(localStorage[k])
			//JSON.parse()处理的东西为json格式,不然会报错
			//将localstorage中引号个数不是双数的的记录移除掉
			if(localStorage[k].match(/"/gi).length%2==1) {
				localStorage.removeItem(k)
			}
		}
	}
	//开始检测用户有没有登录方法
//	function userlogshow(){
		var loguser = localStorage.getItem("loguser");
		if(loguser) {
			$("#loginuser").css("display", "block");
			$("#quit").css("display", "block");
			$("#loginuser>b").text(loguser.uname);
			$("#huanying").css("display", "none");
			$(".login").css("display", "none");
			$(".reg").css("display", "none");
		} else {
			$("#loginuser").css("display", "none");
			$("#quit").css("display", "none");
			$("#huanying").css("display", "block");
			$(".login").css("display", "block");
			$(".reg").css("display", "block");
		}
		//	退出按钮
		$("#quit").on("click", function() {
			localStorage.removeItem("loguser");
			$("#loginuser").css("display", "none");
			$("#quit").css("display", "none");
			$("#huanying").css("display", "block");
			$(".login").css("display", "block");
			$(".reg").css("display", "block");
		})
	
		//城市选择	
		$(".hotcity").on('click', 'a', function() {
			$('.area').text($(this).text());
		})
		$(".arealist").on('click', 'dd', function() {
			$('.area').text($(this).text());
		})
	
		//点击让新人礼包消失
		$(window).on('click', function() {
			$(".reg>div").css('display', 'none');
		})		
//	}


	//搜索框搜索时出现下拉列表显示内容
//	function searchbox(){
		//jsonp跨域获取数据
		$("#seacon").focus();
		var ind = -1; //定义初始值
		$("#seacon").on('keyup', function(e) {
			var e = e || window.event;
			if(e.keyCode == 38) {
				//阻止默认行为
				e.preventDefault();
				ind--;
				if(ind < 0) {
					ind = $(".showsea>li").length - 1;
				}
				//清除样式						
				clearStyle($(".showsea>li"));
				$(".showsea>li").eq(ind).css("background-color", "pink");
				$("#seacon").val($(".showsea>li").eq(ind).children().eq(0).text())
			} else if(e.keyCode == 40) {
				ind++;
				if(ind == $(".showsea>li").length) {
					ind = 0;
				}
				//清除样式
				clearStyle($(".showsea>li"));
				$(".showsea>li").eq(ind).css("background-color", "pink");
				$("#seacon").val($(".showsea>li").eq(ind).children().eq(0).text())
			} else {
				var q = $("#seacon").val().trim();
				var scri = document.createElement('script');
				scri.src = "http://www.sfbest.com/productlist/keysearch?callback=fns&q=" + q
				window.fns = function(a) {
					$(".showsea").html('');
					ind = -1;
					if(a != null) {
						//			字符串按空格分割
						var d = a.split(/\s/g)
						for(var i = 0; i < d.length; i++) {
							var li = document.createElement('li');
							var sp = document.createElement('span');
							sp.innerHTML = d[i].split("|")[1];
							li.appendChild(sp);
							var sp = document.createElement('span');
							sp.innerHTML = "约" + d[i].split("|")[2] + "件";
							li.appendChild(sp);
							$('.showsea').append(li);
							$('.showsea').css('display', 'block');
						}
					}
				}
				document.body.appendChild(scri)
			}	
		})
		//当搜索框失去焦点时，让显示的内容消失
		$("#seacon").on('blur', function() {
			$('.showsea').html('');
			$('.showsea').css('display', 'none');
		})
//	}

	//清除样式
	function clearStyle(arr) {
		for(var i = 0; i < arr.length; i++) {
			arr[i].style = '';
		}
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




//点击上面的购物车,跳转到购物车页面
$(".myCarTop").on('click',function(){location.href="cart.html"});

//计算购物车中商品总件数,总价格
	totalNum();
	function totalNum(){
		mynum=0;
		allmoney=0;
		for(k in localStorage){
			if(localStorage.hasOwnProperty(k)){
				var info=JSON.parse(localStorage.getItem(k));
				if(info.cnum){
					allmoney+=Number(info.cnum)*Number(info.cpri);
					mynum+=Number(info.cnum);
				}
			}
		}
		$(".cnum").text(mynum);
		$(".allmoney").text(allmoney.toFixed(2));
	}
	//鼠标移入移出滑动动画效果
	//上面购物车鼠标移入
	$(".cartTop").on('mouseenter',function(){
	//	判断购物车中是否有商品,有商品显示购物车,没有商品显示暂无商品提示
		if(mynum==0){
			$(this).children().filter('.showcart').css('display','block').fadeIn();	
		}else{
			$(this).children().filter('.shopcar').css('display','block').fadeIn();		
		}
		//判断购物车内商品框的高度,当高度大于三个 种类的高度后，让框定高且出现滚动条
		if($(".shopcarList").height()>179){
			$(".cartTop>.shopcar>.shopcarList").css({"overflow": "scroll","height": "200px"})
		}else{
			$(".cartTop>.shopcar>.shopcarList").css('')
		}
	})
	//上面购物车鼠标移出
	$(".cartTop").on('mouseleave',function(){
			$(this).children().filter('.showcart').css('display','none').fadeOut();	
			$(this).children().filter('.shopcar').css('display','none').fadeOut();
	})
	//侧边栏滑动动画
	//购物车
	
	$("#carbox").on('mouseenter',function(){
		if(mynum==0){
			$(this).children().eq(2).css('display','block').animate({'right':'50px'},200,'linear')
		}else{
			$(this).children().eq(1).css('display','block').animate({'right':'40px'},200,'linear');
			if($("#carbox .shopcarList").height()>288){
				$("#carbox>.shopcar>.shopcarList").css({"overflow": "scroll","height": "270px"})
			}
		}
	})
	$("#carbox").on('mouseleave',function(){
		$(this).children().eq(1).animate({'right':'-50px'},200,'linear',1000).css('display','none')
		$(this).children().eq(2).css('display','none').animate({'right':'-50px'},200,'linear')
	})
	//侧边栏滑动动画
	//下载
	$("#dowm").on('mouseenter',function(){
		$(this).children().eq(0).css('display','block').animate({'right':'50px'},200,'linear')
	})
	$("#dowm").on('mouseleave',function(){
		$(this).children().eq(0).css('display','none').animate({'right':'-50px'},200,'linear')
	})	
//}

function addShopCar(ele,addNum){
	console.log(addNum);
	//用户登录状态商品才能加入购物车
	if(localStorage.getItem('loguser')){
		//让侧边栏显示商品件数的模块显示
		$(".connum").css('display','block');
		//商品的id
		var cpid=ele.parent().attr('pid');
		//商品的其他信息对象
		var cartinfo={
			"cname":ele.parent().children().filter('p.puname').text(),
			"cpri":ele.parent().children().filter('p.ppri').text().substr(1),
			"cimg":ele.parent().children().filter('i').css("backgroundImage").match(/http.*\.jpg/gi)[0],
			"cnum":addNum
		}
		//如果商品已经存在，商品的件数等于存储数据的件数加新加入的件数
		if(localStorage.getItem(cpid)){
			cartinfo.cnum=Number(JSON.parse(localStorage.getItem(cpid)).cnum)+Number(addNum);
		}
		//将新的数据存到localStorage
		localStorage.setItem(cpid,JSON.stringify(cartinfo));
		//购物车总件数
		//$(".cnum").text(function(ind,old){
		//	return  mynum=Number(old)+1;
		//})
	    //调用渲染购物车数据的方法
		showcar();
		//调用购物车总件数初始化,总价格变化的方法
//		totalNum();		
	}else{
		alert("请先登录！")
	}
}




//渲染购物车的数据方法
function showcar(){
	//清空购物车列表
	$(".shopcarList").html('');
	//for in遍历localStorage数据
	for(k in localStorage){
		//判断k为localStorage的自有属性
		if(localStorage.hasOwnProperty(k)){
			//将数据转换为数组对象
			var cinfo=JSON.parse(localStorage.getItem(k));
			//localStorage中含有各种数据，
			//数据中包含有cnum
			//挑选出需要渲染的数据的
			if(cinfo.cnum){
				//创建节点渲染数据
				var li=document.createElement('li');
				li.setAttribute('pid',k);
				$(li).addClass('clear');
				var pic=document.createElement('div');
				$(pic).css({'background-image':'url('+cinfo.cimg+')' ,"background-size": "contain"});
				li.appendChild(pic);
				
				var div=document.createElement('div');
				div.innerText=cinfo['cname'];
				li.appendChild(div);
	
				var div3=document.createElement('div');
				var p1=document.createElement('p');
				var sp1=document.createElement('span');
				sp1.innerText="￥"+cinfo['cpri'];
				var sp2=document.createElement('span');
				sp2.innerText="x"+cinfo['cnum'];
				p1.appendChild(sp1);
				p1.appendChild(sp2);
				div3.appendChild(p1);
				var p2=document.createElement('p');
				var sp=document.createElement('span');
				sp.innerText='删除';
	//			给删除按钮添加点击事件
				$(sp).on('click',function(){
					var rpid=$(this).parentsUntil('ul').eq(2).attr('pid');
					localStorage.removeItem(rpid);
					showcar();
					totalNum();
					if(mynum==0){
						$(".shopcar").css('display','none')
						$(".connum").css('display','none')
					}
				})
				$(sp).addClass('del');
				p2.appendChild(sp);
				div3.appendChild(p2);
				li.appendChild(div3);
				$(".shopcarList").append(li);	
				totalNum();
			}
		}
	}
	
}