window.onload = function() {
	//	引入js文件
	$.getScript('js/common.js');

		var hashdata=location.hash.substr(1);
		var infodata=hashdata.split("&")
		console.log(infodata);
		var pid=infodata[0];
		var name=decodeURI(infodata[1]);
		var pri=infodata[2];
		var urlMidImg=infodata[3].substr(0,infodata[3].length-12);
		var urlThuImg=urlMidImg.replace('middle','thumb');
		var urlOriImg=urlMidImg.replace('middle','original');
		
//		console.log(name,urlimg);

	//根据数据渲染商品信息部分
	//商品名字
	$(".tit>h2").html(name);
	//	商品价格
	$(".price").html(pri);
	//	初始化数据
	initMid(urlMidImg);
	initOri(urlOriImg);
//	init(infoData["img"][0]);
	//	初始化数据函数
	function initMid(url) {
		$(".mid").css({
			"background": " transparent url(" + url+ ".jpg) no-repeat center",
			"background-size": "cover"
		})
	}
	function initOri(url) {
		$(".bigbox").css({
			"background": " transparent url(" + url + ".jpg) no-repeat 0 0"
		})
	}
	//根据数据渲染list小图的图片
	var startnum=urlMidImg.substr(urlMidImg.length-1);
	for(var i=startnum;i<Number(startnum)+5;i++){
		var li = document.createElement('li');
		li.setAttribute('ind',i);
		li.style = "background: transparent url(" + urlMidImg.substr(0,urlMidImg.length-1)+i + ".jpg) no-repeat center;background-size: cover;";
		$(".list").append(li);		
	}
//	infoData["img"].forEach(function(ele) {
//		var li = document.createElement('li');
//		li.style = "background: transparent url(" + ele[0] + ") no-repeat center;background-size: cover;";
//		$(".list").append(li);
//	})
	//		鼠标滑入让小图加上边框,同时切换mid和bigbox的图片
	$(".list").delegate('li', 'mouseenter', function() {
		$(this).addClass('active').siblings().removeClass('active')
//		console.log(infoData);
//		init(infoData["img"][$(this).index()]);
		initMid(urlMidImg.substr(0,urlMidImg.length-1)+$(this).attr('ind'));
		initOri(urlOriImg.substr(0,urlOriImg.length-1)+$(this).attr('ind'));
	})

	//计算mask的宽高
	//大图的像素为1000x1000
	mW = $(".bigbox").width() / 1000 * $(".mid").width();
	mH = $(".bigbox").height() / 1000 * $(".mid").height();

	$(".mask").css({
		"width": mW + "px",
		"height": mH + "px"
	});

	//		鼠标的位置、
	$(window).on("mousemove", function(e) {
		//	鼠标距离页面的距离
		var ex = e.pageX;
		var ey = e.pageY;
		//	mid元素距离页面的距离
		var midx = getPos($(".mid")[0]).left;
		var midy = getPos($(".mid")[0]).top;
		//	相见计算出鼠标距离mid的距离
		var l = ex - midx;
		var t = ey - midy;
		//	让鼠标总是在mask的中间,还得减去mask自身的一半
		l = l - mW / 2;
		t = t - mH / 2;
		//	限制l,t的大小
		if(l <= 0) {
			l = 0
		};
		if(t <= 0) {
			t = 0
		};

		if(l >= ($(".mid").width() - mW)) {
			l = ($(".mid").width() - mW)
		}
		if(t >= ($(".mid").height() - mH)) {
			t = ($(".mid").height() - mH)
		}

		//	将值赋给mask的left,top
		$(".mask").css({
			'left': l + 'px',
			'top': t + 'px'
		})

		//	放大镜背景图的位置
		var bigl = (-1) * l / $(".mid").width() * 1000;
		var bigt = (-1) * t / $(".mid").height() * 1000;
		$(".bigbox").css({
			'background-position-x': bigl + 'px',
			'background-position-y': bigt + 'px'
		})

	})

	//鼠标移入mid让mask,bigbox显示
	$(".mid").on('mouseenter', function() {
		$(".mask").css('display', 'block');
		$(".bigbox").css('display', 'block');

	})
	//鼠标移出mid让mask,bigbox消失
	$(".mid").on('mouseleave', function() {
		$(".mask").css('display', 'none');
		$(".bigbox").css('display', 'none');

	})

	//鼠标移入问号显示内容

	$("#wh").on('mouseenter', function() {
		$(".tip").css('display', 'block');
	})

	//鼠标移出问号内容消失

	$("#wh").on('mouseleave', function() {
		$(".tip").css('display', 'none');
	})

	var pageCount = commdata[0].pageCount
	//渲染tab评价的总次数
	$(".commnum").text(pageCount[0]);

	//点击tab栏切换对应的内容
	$('#comm1').on('click', 'li', function() {
		$(this).addClass('active').siblings().removeClass('active');
		//	$(".conc").removeClass('fixnav');
		console.log();
		if($(window).scrollTop() > 715) {
			$(window).scrollTop(710)
		}
		var na = $(this).index();
		switch(na) {
			case 0:
				$("#comm1con>li").eq(0).removeClass('hidde');
				$("#comm1con>li").eq(1).addClass('hidde');
				$("#comm1con>li").eq(2).removeClass('hidde');
				break;
			case 1:
				$("#comm1con>li").eq(0).addClass('hidde');
				$("#comm1con>li").eq(1).removeClass('hidde');
				$("#comm1con>li").eq(2).removeClass('hidde');
				break;
			case 2:
				$("#comm1con>li").eq(0).addClass('hidde');
				$("#comm1con>li").eq(1).addClass('hidde');
				break;
		}
	})

	//吸顶导航
	$(window).on('scroll', function() {
		console.log($(window).scrollTop());
		if($(window).scrollTop() >= 715) {
			$(".conc").addClass('fixnav')
		} else {
			$(".conc").removeClass('fixnav');
		}
		if($(window).scrollTop() > 0) {
			$("#totop").css('display', 'block');
		} else {
			$("#totop").css('display', 'none');
		}
		//	当页面在最开始的位置时,返回头部按钮隐藏，超过一定位置后显示
	})

	//全部评论数据渲染
	$(".commnav>li:eq(0)>span").text(pageCount[0]);
	$(".commnav>li:eq(1)>span").text(pageCount[1]);
	$(".commnav>li:eq(2)>span").text(pageCount[2]);
	$(".commnav>li:eq(3)>span").text(pageCount[3]);
	$(".commnav>li:eq(4)>span").text(pageCount[4]);
	//渲染每条评论的数据
	for(i = 0; i < 10; i++) {
		shooweverycomm();
	}

	function shooweverycomm() {
		var li = document.createElement('li');
		$(li).addClass('clear');
		var divL = document.createElement('div');
		$(divL).addClass('divL');
		var p = document.createElement('p');
		var img = document.createElement('img');
		$(img).addClass('rankImg');
		img.src = commdata[0].rankImg;
		divL.appendChild(img);
		var sprname = document.createElement('span');
		sprname.innerText = commdata[0].rankName;
		divL.appendChild(sprname);
		var pname = document.createElement('p');
		pname.innerText = commdata[0].author;
		divL.appendChild(pname);
		li.appendChild(divL);
		var divR = document.createElement('div');
		$(divR).addClass('divR');
		var p1 = document.createElement('p');
		var star = document.createElement('i');

		var star = document.createElement('i');
		$(star).addClass('mstar');
		p1.appendChild(star)

		var spdes = document.createElement('span');
		spdes.innerText = commdata[0].comment_desc;
		p1.appendChild(spdes)
		var spfr = document.createElement('span');
		spfr.innerText = "来自" + commdata[0].comment_from;
		$(spfr).css("float", 'right');
		p1.appendChild(spfr)
		divR.appendChild(p1);

		var p2 = document.createElement('p');
		p2.innerText = "评价内容:" + commdata[0]["comment"];
		divR.appendChild(p2);

		var p3 = document.createElement('p');
		p3.innerText = "客户回复:" + commdata[0]["comments_for"];
		divR.appendChild(p3);

		var p4 = document.createElement('p');
		$(p4).addClass('zan');
		p4.innerText = "赞"
		divR.appendChild(p4);
		li.appendChild(divR);
		$(".commcon").append(li);

	}

	//如果购物车为空,侧边栏不显示件数
	if(mynum > 0) {
		$(".connum").css('display', 'block');
	}
	$(".cnum").text(mynum);

	//根据本地存储中的值渲染购物车数据
	showcar();

	//购物车点击添加商品
	$("#add").on('click', function() {
		$("#num").val(Number($("#num").val()) + 1);
	})

	//购物车点击减少商品
	$("#red").on('click', function() {
		if(Number($("#num").val()) == 1) {
			$("#num").val(1)
		} else {
			$("#num").val(Number($("#num").val()) - 1);
		}
	})

	//加入购物车
	$("#addcart").on('click', function(e) {
		//阻止冒泡
		e.stopPropagation();
		$(".connum").css('display', 'block');

		var cartinfo = {
			"cname": $(".tit").children().filter('h2').text(),
			"cpri": $(".price").text(),
			"cimg": $(".list>li").eq(0).css("backgroundImage").match(/http.*\.jpg/gi)[0],
			"cnum": $("#num").val()
		}

		if(localStorage.getItem(pid)) {
			cartinfo.cnum = Number(JSON.parse(localStorage.getItem(pid)).cnum) + Number($("#num").val());
		}
		localStorage.setItem(pid, JSON.stringify(cartinfo));

		//调用渲染购物车数据的方法
		showcar();
		//购物车总件数初始化,总价格变化
		totalNum();
	})

}