window.onload=function(){
//	点击切换tab栏
$(".tab").on('click','li',function(){
	$(this).addClass('active').siblings().removeClass('active');
})

//	数字验证码
var showcode='';
code();
function code(){
	showcode='';
	$(".yzmpic")[0].innerHTML='';
	var codedata=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z',1,2,3,4,5,6,7,8,9,0]
	for(var i=0;i<4;i++){
		var r=Math.floor(Math.random()*35);
		showcode+=codedata[r]
	}
	$(".yzmpic").text(showcode);
}	
//点击换一张
$(".yzmpic").click(function(){
	code();
})
//输入框有内容时,出现叉号,没有内容叉号消失
$(".inps>input").on('keyup',function(){
	if($(this).val().trim()>0){
		$(this).next().filter('.iconX').css('display','inline-block');
	}else{
		$(this).next().filter('.iconX').css('display','none');
	}
})
//点击叉号让输入框的内容清空,同时自己也消失
$(".inps").on('click','i',function(){
	$(this).css('display','none');
	$(this).prev().val('');
})


// 登录
 $("#log").on("click",function(){

 	//检测用户是否存在
 	if(localStorage.getItem($("#uname").val())){
//		 		将取到的内容转换为对象
 		var info=JSON.parse(localStorage.getItem($("#uname").val()));
 		//用户存在检测密码是否一样
 		if(info.password==$("#upwd").val()){
// 			验证码
 			if($('.yzm').val()==showcode){
 // 			alert('登录成功')
	   			location.href="home.html";
			 	var info={
			 		"uname":$("#uname").val(),
			 		"password":$("#upwd").val()
			 	}
	 	       	localStorage.setItem("loguser",JSON.stringify(info))				
 			}else{
				$(".tips1").css('display','block').siblings().css('display','');
 			}

 		}else{
// 			alert('密码错误')
			$(".tips2").css('display','block').siblings().css('display','');
 		}
 	}else{
// 		alert('用户不存在')
		$(".tips3").css('display','block').siblings().css('display','');
 	}
 })	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
