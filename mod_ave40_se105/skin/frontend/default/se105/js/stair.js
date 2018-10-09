jQuery(function () {
	
	jQuery(window).scroll(function () {
		
		if (jQuery('.stairsSection').length == 0) {
			return;
		}
		if (jQuery(window).scrollTop() > (jQuery('.stairsSection').eq(0).offset().top - jQuery('.stairsSection').height() / 2 - 100)) {
			jQuery('#stair').slideDown(300);
		} else {
			jQuery('#stair').slideUp(300);
		}
	})
	var myClick = false;
	jQuery(window).on('scroll', function () {
		var that = jQuery(this);
		if (jQuery('.stairsSection').length == 0) {
			return;
		}

		if (jQuery(window).scrollTop() > (jQuery('.stairsSection').eq(0).offset().top - jQuery('.stairsSection').height() / 2 - 100)) {
			jQuery('#stair').slideDown(300, function () {
				
				jQuery('#stair > li').unbind().on('click', function () {
					myClick = true;
					
					jQuery('body,html').stop(true).animate({scrollTop: jQuery('.stairsSection').eq(jQuery(this).index()).offset().top - 100}, 500, function () {
						myClick = false;
					});
					
					jQuery(this).addClass('active').siblings().removeClass('active');
				})
			});
		} else {
			jQuery('#stair').slideUp(300);
		}
		
		jQuery('.stairsSection').each(function (i, v) {
			if (that.scrollTop() > (jQuery(this).offset().top - jQuery('.stairsSection').height() / 2 - 100)) {
				
				if (!myClick) {
					
					jQuery('#stair > li').eq(i).addClass('active').siblings().removeClass('active');
				}
			}
		});
		
	})
	
	
})

// 首页下拉菜单栏 动态添加id用来提高css优先级
jQuery(function () {
	jQuery('.sticky-container').attr('id', 'fixed');
	// 点击搜索按钮
	/*jQuery('.header .quick-access-left .nav-submit-button').on('click', function () {
		console.log(1);
		jQuery('.sticky-container').attr('id', 'search_fixed');
	});
	// 关闭搜索
	jQuery('.close').on('click', function () {
		jQuery('.sticky-container').attr('id', 'fixed');
	})*/
})
/*右侧楼梯*/
jQuery(function () {
	jQuery(".rightFloorWrap .expand").toggle(function () {
		jQuery(".rightFloorWrap .more_way").show();
	}, function () {
		jQuery(".rightFloorWrap .more_way").hide();
	})
	jQuery(".rightFloorWrap .gotoTop").click(function () {
		jQuery('body,html').animate({scrollTop: 0}, 200);
		return false;
	});
})

/*登录注册页切换*/
/*jQuery(function () {
	jQuery(".login .back-sign-in a").on('click', function () {
		jQuery(".login").fadeOut(300).siblings(".register").fadeIn(300);
	})
	jQuery(".register .back-sign-in a").on('click', function () {
		jQuery(".register").fadeOut(300).siblings(".login").fadeIn(300);
	})
})*/
/*注册按钮*/
jQuery(function () {
	var regBtn = jQuery("#regit_btn");
	jQuery("#iAgree").change(function () {
		var that = jQuery(this);
		that.prop("checked", that.prop("checked"));
		if (that.prop("checked")) {
			regBtn.prop("disabled", false);
			regBtn.removeClass("disable");
		} else {
			regBtn.prop("disabled", true)
			regBtn.addClass('disable');
		}
	});
});
