//1个是父级名。

function imgscrool(obj){
	var width = jQuery(obj+'.banner .img img').width();
	var i=0;
	var clone=jQuery(obj+" .banner .img li").first().clone();
	jQuery(obj+" .banner .img").append(clone);
	var size=jQuery(obj+" .banner .img li").size();
	for(var j=0;j<size-1;j++){
		jQuery(obj+" .banner .num").append("<li></li>");
	}
	jQuery(obj+" .banner .num li").first().addClass("on");

	/*鼠标划入圆点*/
	jQuery(obj+" .banner .num li").hover(function(){
		var index=jQuery(this).index();
		i=index;
		jQuery(obj+" .banner .img").stop().animate({left:-index*width},500)
		jQuery(this).addClass("on").siblings().removeClass("on")
	})

	/*自动轮播*/
	var t=setInterval(function(){
		i++;
		move();
	},3000)

	/*对banner定时器的操作*/
	jQuery(obj+" .banner").hover(function(){
		clearInterval(t);
	},function(){
		t=setInterval(function(){
			i++;
			move();
		},3000)
	})

	/*向左的按钮*/
	jQuery(obj+" .banner .btn_l").stop(true).delay(800).click(function(){
		i--
		move();
	})

	/*向右的按钮*/
	jQuery(obj+" .banner .btn_r").stop(true).delay(800).click(function(){
		i++
		move()
	})

	function move(){

		if(i==size){
			jQuery(obj+" .banner  .img").css({left:0})
			i=1;
		}

		// 修改轮播没屏宽度
		if(i==-1){
			jQuery(obj+" .banner .img").css({left:-(size-1)*width})
			i=size-2;
		}

		jQuery(obj+" .banner .img").stop(true).animate({left:-i*width},500)

		if(i==size-1){
			jQuery(obj+" .banner .num li").eq(0).addClass("on").siblings().removeClass("on")
		}else{
			jQuery(obj+" .banner .num li").eq(i).addClass("on").siblings().removeClass("on")
		}
	}
}
