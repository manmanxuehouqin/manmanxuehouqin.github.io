/*$(function(){
	var container={
		main:$('.container'),
		imgWrapper:$('.container .focus-box'),
		imgs:$('.container img'),
		width:0,
		index:0,
		init:function(){
			this.width=$('body').width();
			this.imgs.width(this.width);
			
			this.imgs.show();
			
			this.autoPlay();
		},
		//自动滚动轮播
		autoPlay:function(){
			
			var that=this;
			setInterval(function(){
				that.index++;
				that.index %= that.imgs.length;
				that.imgWrapper.animate({
					marginLeft:-1 * that.index * that.width
				},1000);
			},2000);
			
		}
	};
	container.init();
});*/



$(function(){
	
	var intDiff = parseInt(600);//倒计时总秒数量

            function t(intDiff) {
                window.setInterval(function() {
                    var day = 0,
                            hour = 0,
                            minute = 0,
                            second = 0;//时间默认值		
                    if (intDiff > 0) {
                        day = Math.floor(intDiff / (60 * 60 * 24));
                        hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
                        minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
                        second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
                    }
                    if (minute <= 9)
                        minute = '0' + minute;
                    if (second <= 9)
                        second = '0' + second;
                    $('#day_show').html(day + "天");
                    $('#hour_show').html('<s id="h"></s>' + hour + '时');
                    $('#minute_show').html('<s></s>' + minute + '分');
                    $('#second_show').html('<s></s>' + second + '秒');
                    intDiff--;
                }, 1000);
            }

            $(function() {
                t(intDiff);
            });
	
		//banner 轮播
		
			var oBanner=document.getElementById('banner');//获取图片列表id
			var oTab=document.getElementById('tab');//获取图片列表id
			var aPic=oTab.getElementsByTagName('li');//将图片li定义为数组
			var oList=document.getElementById('list');//获取编号列表id
			var aList=oList.getElementsByTagName('li');//将编号列表Li定义为数组
			var oBtn=document.getElementById('btn');
			var oPrev=document.getElementById("prev");
			var oNext=document.getElementById("next");
			
			var index=0;
			var timer=null;
			
			//自动播放
			timer=setInterval(autoPlay,1500);//此处调用autoPlay函数时，（）不能带，带就出错
			
			//鼠标悬浮时，停止轮播
			oBanner.onmousemove=function()
			{
				oBtn.style.display='block';
				clearInterval(timer);
			}
			
			//鼠标离开，继续轮播
			oBanner.onmouseout=function()
			{
				oBtn.style.display='none';
				timer=setInterval(autoPlay,1500);//此处必须重新设置定时器
			}
			
			//点击左边按钮，上一页
			oPrev.onclick=function()
			{
				index=index-1;
				if(index<0)
				{
					index=aPic.length-1;
				}
				changePic(index);
			}
			
			//点击右边按钮，下一页
			oNext.onclick=function()
			{
				index=index+1;
				if(index==aPic.length)
				{
					index=0;
				}
				changePic(index);
			}
			
			//播放函数
			function autoPlay()
			{
				
				index=index+1;
				if(index==aPic.length)
				{
					index=0;
				}
				changePic(index);
			}
			
			//把数字与图片对应起来
			for(var i=0;i<aList.length;i++)
			{
				aList[i].onmouseover=function()
				{
					clearInterval(timer);
					index=this.innerText-1;
					changePic(index);
				}
			}
			
			//图片、编号切换
			function changePic(curIndex)
			{
				for(var i=0;i<aPic.length;i++)
				{
					aPic[i].style.display='none';
					aList[i].className='';
				}
				aPic[curIndex].style.display="block";
				aList[curIndex].className="on";
			}
			
		
	
});

