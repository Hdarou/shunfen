window.onload=function(){

}

function showdata(arr){
	for(var i=0;i<arr.length;i++){
		var li=document.createElement('li');
		
		var iImg=document.createElement('i');	
		iImg.style.backgroundImage="url("+arr[i].img+")";
		li.appendChild(iImg);

		var pname=document.createElement('p');
		pname.innerText=arr[i].name;
		li.appendChild(pname);
		var pri=document.createElement('p');
		pri.innerText="￥"+arr[i].price;
		li.appendChild(pri);
		var divq=document.createElement('div');
		divq.innerText='抢购';
		li.appendChild(divq);
		$(".qianglist").append(li);
	}	
}