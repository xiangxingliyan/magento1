/**
 * header scroll
 */

jQuery(function () {
	if (!ave40.params.control.disableTopFloatMenuBar) {
		jQuery(window).scroll(function () {
			var sticky = jQuery('.sticky');
			var $blackGiveawaysGo =  jQuery('.black-giveaways-go');
			
			if( jQuery('.sticky').length  == 0) {
				return;
			}
			
			if (ave40.params.control.disableTopFloatMenuBar) {
				if (sticky.hasClass('fixed')) {
					sticky.removeClass('fixed');
				}
				return;
			}
			
			var scrollTop = jQuery(window).scrollTop();
			var $headerPlaceholder = jQuery('#header-placeholder-elm');
			
			var borderScrollerTop = $headerPlaceholder.prop('ave40BorderScrollerTop');
			
			
			
			
			if (!sticky.hasClass('fixed')) {
				if (sticky.find('.nav-column ').css('display') != 'none' && sticky.find('.nav-column').outerHeight() > 0) {
					/*borderScrollerTop = sticky.find('.nav-column').offset().top ;*/
                    borderScrollerTop = sticky.find('.login_content').offset().top
                } else {
					borderScrollerTop = sticky.find('.login_content').offset().top + sticky.find('.login_content').outerHeight() / 2;
				}
				
				$headerPlaceholder.prop('ave40BorderScrollerTop', borderScrollerTop);
			}
			
			if (scrollTop > borderScrollerTop) {
				if (!sticky.hasClass('fixed')) {
					var oriHeight = sticky.outerHeight();
					$headerPlaceholder.css('paddingTop', (oriHeight) + 'px');
					sticky.addClass('fixed').css('opacity', 1);//.stop().animate({opacity:1}, 500);
					if ($blackGiveawaysGo) {
						var stickyHeight = sticky.height();
						$blackGiveawaysGo.css({
							'position':'fixed',
							'top':stickyHeight
						});
					}
				}
			} else {
				if (sticky.hasClass('fixed')) {
					sticky.removeClass('fixed').css('opacity', 1);//.stop().animate({opacity:1}, 300);
					$headerPlaceholder.css('paddingTop', '0px');
					if ($blackGiveawaysGo) {
						$blackGiveawaysGo.css({
							'position':'absolute',
							'top':0
						});
					}
				}
			}
		});
	}
	
});



/**
 *  home page top ad close
 **/
~function ($) {
	$(function () {
		var $topAdClose = $('.top_ad .top-close');

		$topAdClose.off('click');
		$topAdClose.click(function () {
			function setCookie(name, value) {
				var Days = 1;
				var exp = new Date();
				exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
				document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
			}

			setCookie('top_ad_click', 1);
			// var $parent = $(this).parent().css('height', $(this).offsetHeight);
			// $parent.find('img').animate({height: 0}, 500);
			$(this).parents('.top_ad ').remove();
		});
	});

/**
 *  nav
 **/
	$(function () {
		$('#custom_navigation_subtop_list').find('ul[data-target]').each(function () {
			var target = $(this).data('target');
			var $content = $('li[data-fill-parent=yes] ul[data-fill-id="'+target+'"]');
			if($content.length > 0) {
				$content.html($(this).html());
			}
		});
	});

/**
 *  nav drop down animation
 **/
	$(function ( ) {
		// $('#topnav ul li').hover(function () {
		// 	$(this).find('.topnav-poplayer').stop(true,true).show(300);
		// },function () {
		// 	$(this).find('.topnav-poplayer').hide()
		// });

		$('.topnav-poplayer').hover(function () {
			$(this).siblings('a').addClass('active')
		},function () {
			$(this).siblings('a').removeClass('active')
		})
	})


/**
 *  18notice tip animate
 **/
	$(function () {

		if ($('.ave-18notice').length > 0){
			var $ave18notice = $('.ave-18notice');
			if ($ave18notice.find('.ave-18notice-body').length > 0) {
				$ave18notice.letHVCenter().showAve40PopupBox();
			} else {
				$ave18notice.html(ave40.unescapeHtml($ave18notice.html()))
					.letHVCenter().showAve40PopupBox();
			}

			$('.ave-18notice-true').click(function () {
				var $notice = $('.ave-18notice');
				var $simpleInquire = $('.simple-inquire');

				setCookie('18_jin_tip', 1);

				if ($simpleInquire.length <= 0 || ave40.isMoblie() ){
					$notice.closeAve40PopupBox();
					return;
				}

				var scrollTop = $(document).scrollTop();
				var scrollLeft = $(document).scrollLeft();
				var $footer = $notice.find('.ave-18notice-footer');
				var pbLeft = $notice.offset().left - scrollLeft;
				var pbTop = $notice.offset().top - scrollTop;
				var siLeft = $simpleInquire.offset().left - scrollLeft;
				var siTop = $simpleInquire.offset().top - scrollTop;

				var pbWidth = $notice.outerWidth();
				var pbHeight = $notice.outerHeight();
				var siWidth = $simpleInquire.outerWidth();
				var siHeight = $simpleInquire.outerHeight();

				var pbCenterTop = pbTop + pbHeight / 2;
				var pbCenterLeft = pbLeft + pbWidth / 2;
				var siCenterLeft = siLeft + siWidth / 2;
				var siCenterTop = siTop + siHeight / 2;

				var targetRotateX = 20;
				var targetRotateY = 20;
				var targetRotateZ = 20;

				$notice.css({margin: 0, left: pbLeft, top: pbTop});
				var name = 'animateUnit' + String(Math.random()).substr(2);
				var data = {};
				data[name] = 1000;

				$footer.animate({opacity: 0}, 1000);

				$notice.stop().animate(data, {
					step: function (now) {
						var percent = now / 1000;
						var scale = 1.05 - percent;
						scale = scale > 1 ? 1 : scale;
						var opacity = 1.5 - percent;
						var left = pbLeft + (siCenterLeft - pbCenterLeft) * percent;
						var top = pbTop + (siCenterTop - pbCenterTop) * percent;

						var rx = targetRotateX * percent;
						var ry = targetRotateY * percent;
						var rz = targetRotateZ * percent;

						jQuery(this).css('opacity', opacity);
						jQuery(this).css({left: left, top: top});
						jQuery(this).css('transform', 'perspective(200px) scale(' + scale + ') ' +
							'rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) rotate(' + rz + 'deg)');
					},
					duration: 1200,
					complete: function () {
						spotlightInquireIcon(1);
						$(this).animate({opacity: 0}, 300, function () {
							$(this).hide();
							ave40.getOverlay().hideOverlay();
						});
					},

					easing: 'swing'
				});

				function spotlightInquireIcon(n) {
					n = n == undefined ? 1 : n;

					if (n == 1) {
						makeIcon(1);
						return;
					}

					for (var i = 0; i < n; i++) {
						setTimeout(function () {
							makeIcon(i);
						}, i * 50);
					}

					function makeIcon(z) {
						var $simpleInquire = $('.simple-inquire');
						var $icon = $simpleInquire.find('a');
						var html = $icon[0].outerHTML;

						var $nico = $(html);
						$simpleInquire.append($nico);
						$nico.css({position: 'absolute', top: 0, left: 0, zIndex: 1000 - z}).animate({
							anmateUnit: 1000
						}, {
							step: function (now) {
								var percent = now / 1000;
								var scale = tofixed(1 + 0.5 * percent, 2);
								var opacity = 1 - percent;

								jQuery(this).css({'opacity': opacity, 'transform': 'scale(' + scale + ')'});
							},
							duration: 600,
							complete: function () {
								$(this).remove();
							}
						});
					}
				}

				function tofixed(num, length) {
					if (Number(num).toFixed) {
						return Number(num).toFixed(length);
					} else {
						return num;
					}
				}

				function setCookie(name, value) {
					var Days = 30;
					var exp = new Date();
					exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
					document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
				}

                if(ave40.getCookie('18_jin_tip')) {
                    Ave40_ads.beginCountDownFullImg();
                }

			});

			$('.ave-18notice-flase').click(function () {
                ave40.setCookie('18_jin_tip', 1);

                if(ave40.getCookie('18_jin_tip')) {
                    Ave40_ads.beginCountDownFullImg();
                }

                window.location.href="/customer/account/create";
			});

			$('.ave40-tip-close').click(function () {
				window.location.reload();
			});

		}
	});

/**
 *  search
 **/
	$(function () {
		$('#page_head_searchbar_ok_btn').click(function () {
			doSearch();
		});

		function doSearch()
		{
			var cat = $('#page_head_searchbar_categorys_selected_box').val();
			var $search = $('#page_head_search_input');
			var search = $search.val();
			// var url = $search.closest('form').attr('action');
			var url = '/search';

			if(cat && cat != '0') {
				url += '/categories/' + cat;
			}

			if(search && search != 'Search...') {
				url += '/name/' + _urlEncode(search);
			}

			window.location.href = url;

			function _urlEncode(str) {
				return encodeURIComponent(String(str)).replace(/%20/g, '+')
					.replace(/!/g, '%21').replace(/\(/g, '%28')
					.replace(/\)/g, '%29').replace(/\*/g, '%2A')
					.replace(/'/g, '%27').replace(/~/g, '%7E');
			}
		}

		$('#page_head_search_input').on('keyup', function (e) {
			if(e.keyCode == ave40.params.keyCode.enter) {
				doSearch();
			}
		});

		$(".category").chosen({
			disable_search_threshold: 10
		});

		$('.UI-NAV-INPUT').css('margin-left', $('.chosen-single span').width()+55);

		$('.category').chosen().change(function(){
			$('.UI-NAV-INPUT').css('margin-left', $('.chosen-single span').width()+55);
		});
	})

/**
 *  header cart Scrollbar
 **/
	$(window).on("load",function(){
		$(".head-cart-product-list").mCustomScrollbar({
            mouseWheel:{ scrollAmount: 80 },
			theme: 'dark'
		});
	});


	$(function () {

        /**
         * 选定导航栏变色
         */
		var pathname = getUrlPath(location.pathname);
		var $allLink = $('#topnav').find('> ul > li > a');

		for(var i=0; i<$allLink.length; i++) {
			if(getUrlPath($allLink.eq(i).attr('href')) == pathname) {
				$allLink.eq(i).addClass('active');
				break;
			}
		}

		function getUrlPath(url) {
			url = standardUrl(url);
			return url.replace(/^[0-9a-zA-Z]+:\/+[0-9a-zA-Z._]+\/+/, '').toLowerCase();
		}

		function standardUrl(url) {
			url = url.replace(/\\/g, '/');
			url = url.replace(/^\/+/, '');
			url = url.replace(/\/+$/, '');

			return url;
		}

		/* nav */

        $(".cate-list").mouseenter(function(){
            $(".cate-list").show();
        })

	});



}(jQuery);



