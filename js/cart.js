window.onload=function(){
//开始检测用户有没有登录	
 var loguser=localStorage.getItem("loguser");
 if(loguser){
 	$("#loginuser").css("display","block");
 	$("#quit").css("display","block");
 	$("#loginuser>b").text(loguser.uname);
 	$("#huanying").css("display","none");
 	$(".login").css("display","none");
 	$(".reg").css("display","none");
 }else{
  	$("#loginuser").css("display","none");
 	$("#quit").css("display","none");
  	$("#huanying").css("display","block");
 	$(".login").css("display","block");
 	$(".reg").css("display","block");	
 }
//	退出按钮
$("#quit").on("click",function(){
	localStorage.removeItem("loguser");
  	$("#loginuser").css("display","none");
 	$("#quit").css("display","none");
  	$("#huanying").css("display","block");
 	$(".login").css("display","block");
 	$(".reg").css("display","block");	
})	
	
//城市选择	
$(".hotcity").on('click','a',function(){
	$('.area').text($(this).text());
})
$(".arealist").on('click','dd',function(){
	$('.area').text($(this).text());
})	
//调用渲染购物车数据的方法
showdata();
function showdata(){		
	$(".showlist").html('');
	for(k in localStorage){
		if(localStorage.hasOwnProperty(k)){
			var cinfo=JSON.parse(localStorage.getItem(k));
			if(cinfo['cnum']){
				var li=document.createElement('li');
				li.setAttribute('pid',k)
				var ul=document.createElement('ul');
				$(ul).addClass('showline clear');
				var lis1=document.createElement('li');
				var inp=document.createElement('input');
				inp.type='checkbox';
				lis1.appendChild(inp);
				var lis2=document.createElement('li');
				$(lis2).addClass('shangpin clear');
				var i=document.createElement('i');
				$(i).css({'background-image':'url('+cinfo.cimg+')' ,"background-size": "contain"});
				lis2.appendChild(i);				
				var p=document.createElement('p');
				p.innerText=cinfo['cname']
				lis2.appendChild(p);	
				
				var lis3=document.createElement('li');				
				var sp=document.createElement('span');
				sp.innerText="￥"+cinfo['cpri'];	
				lis3.appendChild(sp);	
				
				var lis4=document.createElement('li');
				$(lis4).addClass('wid');				
				
				var lis5=document.createElement('li');	
				$(lis5).addClass('shuliang');
				////	数量减少按钮
				var inp1=document.createElement('input');
				inp1.value="-";	
				inp1.type="button";
				$(inp1).addClass('reduce');
				$(inp1).on('click',function(){
					if(Number($(this).next().val())==1){
						$(this).next().val(1)
					}else{
						$(this).next().val(Number($(this).next().val())-1);
					}
//						获取此行的pid
						var reducepid=$(this).parent().parent().parent().attr('pid');
						//修改件数
						var info=JSON.parse(localStorage.getItem(reducepid));
						info.cnum=$(this).next().val();
//						重新存入
						localStorage.setItem(reducepid,JSON.stringify(info));
//					获取此行数据的单价
					var dpri=Number($(this).parent().prevAll().eq(1).find('span').text().substr(1));
					
//					计算此行数据的总价
					$(this).parent().nextAll().eq(1).find('span').text("￥"+(Number($(this).next().val())*dpri).toFixed(2));
					//调用计算总价的方法
					checkTotalPrice();
					
				})				
				lis5.appendChild(inp1);	
				var inp2=document.createElement('input');
				$(inp2).addClass('inp2')
				inp2.type="text";
				inp2.value=cinfo['cnum'];	
				lis5.appendChild(inp2);	
				////	数量增加按钮
				var inp3=document.createElement('input');
				$(inp3).addClass('add');
				inp3.type="button";
				inp3.value="+";	
				$(inp3).on('click',function(){
					$(this).prev().val(Number($(this).prev().val())+1);
//						获取此行的pid
						var reducepid=$(this).parent().parent().parent().attr('pid');
						//修改件数
						var info=JSON.parse(localStorage.getItem(reducepid));
						info.cnum=$(this).prev().val();
//						重新存入
						localStorage.setItem(reducepid,JSON.stringify(info));					
//					获取此行数据的单价
					var dpri=Number($(this).parent().prevAll().eq(1).find('span').text().substr(1));
//					计算此行数据的总价
					$(this).parent().nextAll().eq(1).find('span').text("￥"+(Number($(this).prev().val())*dpri).toFixed(2))	;
					//调用计算总价的方法
					checkTotalPrice();
				})
				lis5.appendChild(inp3);
				
				var lis6=document.createElement('li');				
				var sp=document.createElement('span');
				sp.innerText="2kg";	
				lis6.appendChild(sp);				

				var lis7=document.createElement('li');				
				var sp=document.createElement('span');
				sp.innerText="￥"+cinfo['cpri']*cinfo['cnum'];	
				lis7.appendChild(sp);
				
				var lis8=document.createElement('li');				
				var sp=document.createElement('span');
				sp.innerText="现货";	
				lis8.appendChild(sp);				

				var lis9=document.createElement('li');				
				var sp1=document.createElement('span');
				sp1.innerText="收藏";	
				lis9.appendChild(sp1);
				var sp2=document.createElement('span');
				sp2.innerText="删除";
	//			给删除按钮添加点击事件
//				$(sp2).on('click',function(){
//					var rpid=$(this).parent().parent().parent().attr('pid');
//					localStorage.removeItem(rpid);
//					showdata();
//					showcar();
//					//			调用计算选中商品的总价
//					checkTotalPrice();
//					singleCheckClick();
//				})
//				
				$(sp2).addClass('del');				
				lis9.appendChild(sp2);
				
				ul.appendChild(lis1);
				ul.appendChild(lis2);
				ul.appendChild(lis3);
				ul.appendChild(lis4);
				ul.appendChild(lis5);
				ul.appendChild(lis6);
				ul.appendChild(lis7);
				ul.appendChild(lis8);
				ul.appendChild(lis9);
				
				li.appendChild(ul);
				
				$(".showlist").append(li);
			}
		}
	}
}	

////默认全选按钮和各个按钮都是选中状态
//$(".showlist>li input[type=checkbox]")
	
//	全选按钮
//console.log($(".showlist>li input[type=checkbox]").get())
$("#allcheck").on('click',function(){
	var allche=$(this)[0].checked;
	$(".showlist>li input[type=checkbox]").each(function(ind,ele){
		ele.checked=allche;
	});
	mo=0;
	$(".showlist>li input[type=checkbox]").each(function(ind,ele){
		if(ele.checked){
			mo+=Number($(ele).parent().nextAll().eq(5).find('span').text().substr(1));
		}
	});
	$("#allshowmo").text(mo.toFixed(2));
})
//当有一个取消时,全选取消
singleCheckClick();
//单个复选框的点击事件
function singleCheckClick(){
	$(".showlist>li input[type=checkbox]").on('click',function(){
		console.log('pp');
		var count=0;//全选反选计数；
		$(".showlist>li input[type=checkbox]").each(function(ind,ele){
			if(ele.checked){
				count++;
			}
		});
		checkTotalPrice()
		if(count==$(".showlist>li input[type=checkbox]").length){
			$("#allcheck")[0].checked=true;
		}else{
			$("#allcheck")[0].checked=false;
		}
	})	
}


//删除选中的商品
$("#redan").on('click',function(){
	var arr=$(".showlist>li input[type=checkbox]").get();
	for(var i=0;i<arr.length;i++){
		if(arr[i].checked==true){
			var rpid=$(arr[i]).parent().parent().parent().attr('pid');
			localStorage.removeItem(rpid);
			showdata();
			showcar();
//			调用计算选中商品的总价
			checkTotalPrice();
			singleCheckClick();
		}
	}
})
//计算选中商品的总价	
function checkTotalPrice(){
	mo=0;
	$(".showlist>li input[type=checkbox]").each(function(ind,ele){
		if(ele.checked){
			mo+=Number($(ele).parent().nextAll().eq(5).find('span').text().substr(1));
		}
	});
	$("#allshowmo").text(mo.toFixed(2));	
}
//清空购物车
$("#reAll").on('click',function(){
	var arr=$(".showlist>li input[type=checkbox]").get();
	for(var i=0;i<arr.length;i++){
		var rpid=$(arr[i]).parent().parent().parent().attr('pid');
		localStorage.removeItem(rpid);
		showdata();
		$("#allshowmo").text(0);
	}
	//当清空购物车时隐藏购物车部分,显示空购物车部分
	$(".kongcar").css('display','block');
	$(".shopcarwrap").css('display','none');	
})

//当空购物车时隐藏购物车部分,显示空购物车部分
//当购物车有商品时显示购物车部分,隐藏空购物车部分
showcar();
function showcar(){
	var count=0;
	for(k in localStorage){
		if(localStorage.hasOwnProperty(k)){
			if(JSON.parse(localStorage[k]).cnum){
				count++;
			}
		}
	}
	if(count>0){
		$(".shopcarwrap").css('display','block');
		$(".kongcar").css('display','none');
		
	}else{
		$(".kongcar").css('display','block');
		$(".shopcarwrap").css('display','none');
		
	}	
}

//空购物车时,如果没有登录出现提示信息	
if(loguser){
	$(".nolog").css('display','none');
}else{
	$(".nolog").css('display','block');
}
	
//计算总价格的方法	
function total(){
	var totalPrice=0;
	for(k in localStorage){
		if(localStorage.hasOwnProperty(k)){
			var info=JSON.parse(localStorage.getItem(k));
			if(info.cnum){
				totalPrice+=Number(info.cnum)*Number(info.cpri)
			}
		}
	}
	$(".allshowmo").text(totalPrice.toFixed(2));
}
	
	
	
	
	
	
	
	
	
	
	
	
}