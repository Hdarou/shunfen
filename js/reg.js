window.onload=function(){
//	当form表单的input框获得焦点时让边框变色,并出现提示信息
	$("#reglist").on('focus','input',function(){
		$(this).parent().filter('span').css('border','1px solid #ff4800');
		$(this).parent().next().css('display','block')
	});
//	当form表单的input框失去焦点时让边框变色,并取消提示信息
	$("#reglist").on('blur','input',function(){
		$(this).parent().css('border','');
//		$(this).parent().next().css('display','')
	});	
//声明一个变量,保存验证码是否输入正确,初始化false	
	var yzm=false;
//	验证账户名
//正确的手机号
//	$("#uname").focus();
	$("#uname").on('focus',function(){
		$(this).parent().nextUntil().eq(1).css('display','')			
		$(this).parent().nextUntil().eq(2).css('display','')			
	})
	$("#uname").on('blur',function(){
		var reg=/^1[2-9][0-9]{9}$/g	;
		if($(this).val().trim().match(reg)==null){
//			console.log($(this).parent().nextAll().filter('.tip'));
			$(this).parent().nextAll().filter('.tip2').css('display','block');
		}else{
//			判断手机号是否已注册
			if(localStorage.getItem($(this).val().trim())){
//				手机号已存在,提示已存在
				$(this).parent().nextAll().filter('.tip3').css('display','block');
				$(this).parent().nextAll().filter('.tip').css('display','none');
				$(this).parent().nextAll().filter('.tip2').css('display','none');	
			}else{
//				手机号不存在,提示手机号符合要求
				$(this).next().css('display','block');
				$(this).parent().nextAll().filter('.tip3').css('display','none');
				$(this).parent().nextAll().filter('.tip').css('display','none');
				$(this).parent().nextAll().filter('.tip2').css('display','none');			
			}
		}
//		$(this).parent().filter('span').css('border','1px solid #ff4800');
	});	
//验证密码	
	
//	第一次密码
	$("#pwd1").on('keyup',function(){
//		8-12字符不能为纯数字纯字母
		var reg=/^(?!\d*$)(?![a-zA-Z]*$)\w{8,12}$/g;
//		console.log(reg.test($(this).val().trim()))
		if(reg.test($(this).val().trim())){
//			密码符合正则,出现勾号,隐藏提示信息
			$(this).next().css('display','block');
			$(this).parent().next().css('display','')
		}else{
			$(this).next().css('display','');
			$(this).parent().next().css('display','block')			
		}
	})
//	再次确认密码
	$("#pwd2").on('blur',function(){
		if($("#pwd1").val().trim().length>=8&&$("#pwd1").val().trim()==$(this).val().trim()){
			$(this).next().css('display','block');
			$(this).parent().next().css('display','')			
		}
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
$(".change").click(function(){
	code();
})

//验证验证码正确
$("#shuru").on('blur',function(){
	if($(this).val()==showcode){
		$(this).next().css('display','block');
		$(this).parent().nextAll().eq(2).css("display","none")
	}else{
		$(this).next().css('display','none');
		$(this).parent().nextAll().eq(2).css("display","block")
	}
})
//同意条款
$("#che").on('click',function(){
	if($("#che")[0].checked){
		$("#che").nextAll().eq(1).css('display','');
	}else{
		$("#che").nextAll().eq(1).css('display','block');
	} 
})
//立即注册
$("#check-btn").on('click',function(){
 	var info = {
 		"password":$("#pwd1").val(),
 	}
	if($("#uname").val()&&$("#pwd1").val()){
 		if(localStorage.getItem($("#uname").val())){
 			$(".tip3").css('display','block');
 		}else{
// 			验证码
 			if($('#shuru').val()==showcode){
	 			if($("#che")[0].checked){
					$("#che").nextAll().eq(1).css('display','');
	 	       		localStorage.setItem($("#uname").val(),JSON.stringify(info));
	 	       		location.href="log.html";
				}else{
					$("#che").nextAll().eq(1).css('display','block');
				} 					
 			}
 		}
	}else{
		console.log('什么都没有!')
	}	
})



	
	
//	Verify初始化
//初始化设置参数。
//	$('#mpanel1').codeVerify({
//
//  //常规验证码type=1， 运算验证码type=2
//  type : 1,
//	
//  //验证码宽度
//  width : '80px',
//  
//  //验证码高度
//  height : '36px',
//  codeLength : 4,
//  //......更多参数设置请查阅文档
//	 fontSize : '18px',
//  //提交按钮的id名称
//  btnId : 'check-btn',
//
//  //验证成功以后的回调
//  success : function() {
//  	alert('验证匹配！');
//  	return yzm=true;
//  }
//  
//});			
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
