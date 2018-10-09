/**
 * Created by Administrator on 2017/5/20.
 */

function createPagitation() {
    ~function ($) {
        $(function () {
            $('.pagination').on('click', '.pagination-page-item', function () {
                if ($(this).data('url') && !$(this).hasClass('disabled') && !window.loadingPage) {
                    if ($('.pagination').getAndInBusying()) {
                        return;
                    }

                    ave40.ajaxGet($(this).data('url'), null,
                        function () {
                            if (this.ok) {
                                $('.comment-list').html(this.data.reviews_content);
                                $('.pagination').html(this.data.page_html);
                                createPagitation();
                            } else {
                                Ave40MessageBox.alertError(this.message);
                            }

                            $('.pagination').outBusying();
                        }
                    );
                }
            });

            var detailsImageSwiper = new multipleProductCarousl({
                parentSelector: '.spec-scroll',
                elmSelector: '.swiper-container-spec-scroll',
                autoplay: 0,
                isLoop: false,
                slidesPerView : 4,
                nextBtnSelector: '.spec-scroll .swiper-button-next',
                prevBtnSelector: '.spec-scroll .swiper-button-prev',
                breakpoints:{
                    320: {
                        slidesPerView: 1
                    },
                    500: {
                        slidesPerView: 2
                    },
                    640: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 4
                    },
                    1920:{
                        slidesPerView: 4
                    }
                }

            });

            /*var detailsImageSwiper = new Swiper('.swiper-container-spec-scroll', {
                paginationClickable: true,
                autoplay: 0,
                slidesPerView : 4,
                loop: false,
                autoplayDisableOnInteraction: false,
                nextButton: '.spec-scroll .swiper-button-next',
                prevButton: '.spec-scroll .swiper-button-prev'
            });*/

        });
    }(jQuery);
};

createPagitation();



function cartAddAnimate(elm) {
    var cart = jQuery('.topcart');
    var imgtodrag = jQuery(elm).closest('.product-info').find('.jqzoom').find("img").eq(0);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '9999'
            })
            .appendTo(jQuery('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1000, 'easeOutBounce');

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            cart.addClass('cartIconShanke');
            jQuery(this).detach()
        });
    }
}

function preview(img) {
    jQuery(img).addClass('active').parent('li').siblings('li').children('img').removeClass('active');
    jQuery("#preview .jqzoom img").attr("src", jQuery(img).attr("mimg"));
    jQuery("#preview .jqzoom img").attr("jqimg", jQuery(img).attr("bimg"));
}

function checkboxCheck(obj) {
    if (obj.checked) {
        jQuery(obj).parent('.checkbox').siblings('.frequen-product').addClass('active')
    } else {
        jQuery(obj).parent('.checkbox').siblings('.frequen-product').removeClass('active')
    }
}

function showWholesaleTip() {
    jQuery('.wholesale-tip').stop(true).fadeIn();
    var myDelay = setTimeout(function () {
        jQuery('.wholesale-tip').stop(true).fadeOut();
    }, 15000);

    jQuery('.wholesale-tip').hover(function () {
        clearTimeout(myDelay);
    }, function () {
        var myDelay = setTimeout(function () {
            jQuery('.wholesale-tip').stop(true).fadeOut();
        }, 15000);
    })
}

// (function ($) {
//     window.ProductDetailRender = function (priceInfo) {
//         this._priceSelector = '#ave40_price_label';
//         this._oriPriceSelector = '#ave40_ori_price_label';
//         this._offSelector = null;
//         this._previewImageListSelector = '#ave40_preview_image_list';
//         this._attributeListSelector = '#ave40_attributes_list';
//         priceInfo.extra = priceInfo.extra ? priceInfo.extra : {};
//         this._data = priceInfo;
//     };
//
//     function parseLabels(label) {
//         label = label.toLowerCase();
//         var labels = label.split(';');
//
//         for (var i = 0; i < labels.length; i++) {
//             label = $.trim(labels[i]).replace(/\s*,\s*/g, ',');
//
//             if (!label && label !== 0) {
//                 labels.splice(i, 1);
//             }
//
//             labels[i] = label;
//         }
//
//         return labels;
//     }
//
//     function getSelectedLabels($elm) {
//         var $spans = $elm.find('li span.color-on');
//         var labels = [];
//
//         for (var i = 0; i < $spans.length; i++) {
//             var label = parseLabels($spans.eq(i).data('label'))[0];
//
//             if (label || label === 0) {
//                 labels.push(label);
//             }
//         }
//
//         return labels;
//     }
//
//     $.extend(window.ProductDetailRender.prototype, {
//         refreshPriceLabel: function () {
//             var priceDetail = this.priceDetail();
//             this.priceElm().html(priceDetail.price);
//             this.oriPriceElm().html(priceDetail.origin);
//             this.offElm().html(priceDetail.offval);
//
//             var tier = this._data.tier;
//
//             // tier price update
//             for (var i = 0; i < tier.length; i++) {
//                 var tierPrice = parseFloat(tier[i].price);
//                 var priceId = tier[i].price_id;
//                 var $label = $('#product_tier_price_value_' + priceId);
//
//                 if ($label.length > 0) {
//                     var tierPriceDetail = this.priceDetail(tierPrice);
//                     $label.html(parseFloat(tierPriceDetail.price));
//                 }
//             }
//
//             var inputCount = this._getInputCount();
//             var $priceLi = null;
//
//             if (tier && tier.length > 0) {
//                 for (var i = tier.length - 1; i >= 0; i--) {
//                     var priceQty = tier[i].price_qty;
//
//                     if (inputCount >= priceQty) {
//                         $priceLi = $('#product_tier_price_value_' + tier[i].price_id).closest('li');
//                         break;
//                     }
//                 }
//             }
//
//             if ($priceLi) {
//                 $priceLi.addClass('on').siblings().removeClass('on');
//                 /*$('.wholesale-price-list')[0].bxslider.goToSlide(parseInt($priceLi.index() / 4));*/
//             } else {
//                 $('.wholesale-price-list li').removeClass('on');
//             }
//
//             return this;
//         },
//
//         priceDetail: function (basePrice) {
//             var base = basePrice ? basePrice : this._getBasePrice();
//             var origin = parseFloat(this._data.origin);
//             var price = base;
//             var oriPrice = origin;
//
//             for (var i in this._data.extra) {
//                 if (this._data.extra.hasOwnProperty(i)) {
//                     var priceDetail = this._data.extra[i];
//                     var priceValue = parseFloat(priceDetail.value);
//                     var pricePercent = parseFloat(priceDetail.percent);
//
//                     if (pricePercent > 0) {
//                         price += isNaN(parseFloat(priceValue * base / 100)) ? 0 : parseFloat(priceValue * base / 100);
//                         oriPrice += isNaN(parseFloat(priceValue * origin / 100)) ? 0 : parseFloat(priceValue * origin / 100);
//                     } else {
//                         price += isNaN(priceValue) ? 0 : priceValue;
//                         oriPrice += isNaN(priceValue) ? 0 : priceValue;
//                     }
//                 }
//             }
//
//             price = price < 0 ? 0 : price;
//             oriPrice = oriPrice < 0 ? 0 : oriPrice;
//             var offval = oriPrice == 0 ? 0 : parseInt((oriPrice - price) / oriPrice * 100);
//             offval = isNaN(offval) ? 0 : offval;
//
//             return {
//                 origin: Number(oriPrice).toFixed(2),
//                 price: Number(price).toFixed(2),
//                 offval: offval
//             };
//         },
//
//         _getInputCount: function () {
//             var val = $('#qty').val();
//             return val == '' ? 0 : val;
//         },
//
//         _getBasePrice: function () {
//             var base = parseFloat(this._data.base);
//             var tier = this._data.tier;
//             var inputCount = this._getInputCount();
//
//             if (tier && tier.length > 0) {
//                 for (var i = tier.length - 1; i >= 0; i--) {
//                     var priceQty = tier[i].price_qty;
//
//                     if (inputCount >= priceQty) {
//                         base = parseFloat(tier[i].price);
//                         break;
//                     }
//                 }
//             }
//
//             return parseFloat(base);
//         },
//
//         _getElm: function (intraName) {
//             if (this[intraName] === undefined) {
//                 return null;
//             }
//
//             if (!this[intraName]) {
//                 this[intraName] = $('<span/>');
//             } else if (Object.prototype.toString.call(this[intraName]) == Object.prototype.toString.call('')) {
//                 this[intraName] = $(this[intraName]);
//             }
//
//             return this[intraName];
//         },
//
//         priceElm: function () {
//             return this._getElm('_priceSelector');
//         },
//
//         oriPriceElm: function () {
//             return this._getElm('_oriPriceSelector');
//         },
//
//         offElm: function () {
//             return this._getElm('_offSelector');
//         },
//
//         previewImageListElm: function () {
//             return this._getElm('_previewImageListSelector');
//         },
//
//         attributeListElm: function () {
//             return this._getElm('_attributeListSelector');
//         },
//
//         setExtraPrice: function (id, price, isPercent) {
//             price = parseFloat(price);
//             price = isNaN(price) ? 0 : price;
//             this._data.extra [id] = {value: price, percent: isPercent};
//             return this;
//         },
//
//         updatePriceInfo: function (id, params) {
//             if (!params) {
//                 return this.refreshPriceLabel();
//             }
//
//             return this.setExtraPrice(id, params.pricing_value, params.is_percent).refreshPriceLabel();
//         },
//
//         reselectPrivewImage: function () {
//             var selectedLabels = getSelectedLabels(this.attributeListElm());
//             var selectedLabels2 = selectedLabels.slice();
//
//             if (selectedLabels.length == 0) {
//                 return this;
//             }
//
//             var imgs = this.previewImageListElm().find('li img');
//             var selected = false;
//
//             while (selectedLabels.length > 0) {
//                 for (var i = 0; i < imgs.length; i++) {
//                     var labels = parseLabels($(imgs[i]).data('label'));
//
//                     if (labels.indexOf(selectedLabels.join(',')) !== -1) {
//                         preview(imgs[i]);
//                         selected = true;
//                         break;
//                     }
//                 }
//
//                 if (selected) {
//                     break;
//                 }
//
//                 selectedLabels.pop();
//             }
//
//             while (!selected && selectedLabels2.length > 0) {
//                 for (var i = 0; i < imgs.length; i++) {
//                     var labels = parseLabels($(imgs[i]).data('label'));
//                     var imgLabel = labels.join(';');
//                     var label = selectedLabels2.join(',');
//
//                     var pos = imgLabel.indexOf(label);
//
//                     if (pos !== -1 &&
//                         (pos - 1 == -1 || label[pos - 1] == ';' || label[pos - 1] == ',') &&
//                         (pos + label.length == imgLabel.length || imgLabel[pos + label.length] == ';' || imgLabel[pos + label.length] == ',')
//                     ) {
//                         preview(imgs[i]);
//                         selected = true;
//                         break;
//                     }
//                 }
//
//                 if (selected) {
//                     break;
//                 }
//
//                 selectedLabels2.pop();
//             }
//
//             return this;
//         }
//     });
// })(jQuery);


~function ($) {
    $(function () {
        $('#paypal_ec_link').find('a[data-href]').click(function (e) {
            e.preventDefault();
            productAddToCartForm.submit(this, null, true, (function(href) {
                return function() {
                    ave40.showLoading();
                    window.location.href = href;
                }
            })($(this).data('href')))
        });

        var detailsRecommendProduct = new Swiper('.viewed-carousel', {
            slidesPerView:5,
            loop: false,
            prevButton: '.viewed-carousel-box .left',
            nextButton: '.viewed-carousel-box .right',
            breakpoints:{
                320: {
                    slidesPerView: 1
                },
                640: {
                    slidesPerView: 2
                },
                940: {
                    slidesPerView: 3
                },
                1199: {
                    slidesPerView: 4
                },
                1920:{
                    slidesPerView: 5
                }
            }
        });

        /*var detailShrink = new Swiper('.swiper-container-detail-shrink', {
            paginationClickable: true,
            autoplayDisableOnInteraction: false
        });*/


        /* $('.preview_image_list').bxSlider({
             auto:false,
             infiniteLoop:false,
             hideControlOnEnd:true,
             moveSlides:1,
             pager: false,
             slideWidth: 70,
             minSlides: 2,
             maxSlides: 7,
         });
         */

        $(".table_body").mCustomScrollbar({
            mouseWheel:{ scrollAmount: 140 },
            theme: 'dark',
            alwaysShowScrollbar: 1
        });

        // if ($('#is_in_stock').val() == 0) {
        //     $('#buy-now-btn').addClass('disable').removeAttr('onclick');
        //     $('#add-to-cart-btn').addClass('disable').removeAttr('onclick');
        // }

        $('.add-to-wishlist').click(function () {
            var url = $(this).data('url');
            ave40.ajaxPost(url, null, function (data) {
                if (this.ok) {
                    Ave40MessageBox.alertSuccess(this.message, {autoClose: 1500});
                } else {
                    Ave40MessageBox.alertError(this.message, {autoClose: 1500});
                }
            });
        });

        $('.spec-scroll .items li').first().children('img').addClass('active');

        $('.button-read-more').click(function(){
            $('.detail-read-more').slideToggle("slow");
        });

        $(".jqzoom").jqueryzoom({
            xzoom: 450,
            yzoom: 450
        });


        // function selectAttrs()
        // {
        //     $(this).addClass('color-on').parent('li').siblings('li').children('.listBox').removeClass('color-on');
        //     var attrValue = $(this).closest('.color').attr('attribute');
        //     $('#product_attribute_' + attrValue).val($(this).attr('value'));
        //     ProductRender.updatePriceInfo($(this).data('attributeId'), $(this).data('json')).reselectPrivewImage();
		//
        //     changeState();
        // }

        function changeState()
        {
            var key = "";
            if ($(".color .color-list span.color-on").length > 0) {
                $(".color .color-list span.color-on").each(function () {
                    var node = $(this);
                    key += node.attr('value') + "";
                });
            } else {
                key = 'single';
            }

            var pmap = $('#qty-show').data('pmap');

            if (pmap && pmap[key]) {
                $(".availability-satus .status").html(pmap[key]['status']);

                var qty = pmap[key]['qty'];
                var s = '';
                /*
                if (qty <= 200 && qty > 0) {
                    s = "<div>Only <span>" + qty + "</span> Left</div>";
                }
                */
                $('#qty-show').html(s);

                var qtyVal = $('#qty').val();
                if (qtyVal > qty) {
                    $('#notemnoy').html('The quantities of this item is temporarily limited. If you order it, your shipment might be split or delayed.');
                } else {
                    $('#notemnoy').html('');
                }
            }
            else {
                $('#qty-show').html('');
                $('#notemnoy').html('');
            }
        }

        // $(".color .color-list .listBox").on('click', selectAttrs);

        $("#qty").change(function() {
            changeState();
        });
        $(".Quantity-num").bind("input propertychange", function() {
            changeState();
        });


        /**
         *  动态计算wholesale_price长度
         */
        var wholesale_item = $('.wholesale-price-list').find('li.wholesale-price-info');
        wholesale_item.css('width',Math.round(100 / wholesale_item.length)  + "%" );



        $('.deatails-tab .tab li').click(function () {
            if ($(this).attr('hash')) {
                location.hash = $(this).attr('hash');
            }
            $(this).addClass('active').siblings().removeClass('active');
            var index = $(this).index();
            $('.deatails-box .detail-main').eq(index).show().siblings('.detail-main').hide();
        });

        if (location.hash) {
            $('.deatails-tab .tab li[hash=' + location.hash.substring(1) + ']').click();
        };

        $('.page-num').on('click', function () {
            var divedit = $(this);
            if (divedit.children("input").length > 0) {
                return false;
            }
            var inputIns = $("<input type='number' class='page-input' min='1' onkeyup='onlyNumberKeyup(this)' onafterpaste='onlyNumberAfterpaste(this)' onfocus='onlyNumberFocus(this)' />");  //创建input 输入框
            var oldtext = $(this).html();
            inputIns.val(divedit.html());
            divedit.html("");
            inputIns.appendTo(divedit).focus().select();
            inputIns.click(function () {
                return false;
            });
            inputIns.keyup(function (event) {
                var keycode = event.which;
                if (keycode == 13) {
                    divedit.html($(this).val());         //设置新值
                }
                if (keycode == 27) {
                    divedit.html(oldtext);         //返回旧值
                }
            }).blur(function (event) {
                if ($(this).val() != oldtext) {
                    divedit.html($(this).val());
                } else {
                    divedit.html(oldtext);
                }
            });
        });

        // $(".Quantity-num .num").attr('value', '1');
        var num = $(".Quantity-num .num");

        $('.Quantity-num .reduce').click(function () {
            num.val(parseInt(num.val() - 1) < 1 ? 1 : parseInt(num.val() - 1));
            // console.log(num)
			updateWholesalePriceLabel();
            // ProductRender.refreshPriceLabel();
        });

        $('.Quantity-num .add').click(function () {
            num.val(parseInt(num.val()) + 1);
            showWholesaleTip();
			updateWholesalePriceLabel();
            // ProductRender.refreshPriceLabel();
        });

        $('.Quantity-num .num').focus(function () {
            showWholesaleTip()
        });

        $('#inquire-form .send-verify').click(function () {
            $('#hidden-input').attr('value', '1');
        });

        $('#inquire-form .send').click(function () {
            $('#hidden-input').attr('value', '0');
        });

        $('#qty').on('blur', function () {
            // ProductRender.refreshPriceLabel();
        }).blur();
    });
}(jQuery);


jQuery(function () {
    var productAddToCartForm = new VarienForm('product_addtocart_form');
    productAddToCartForm.submit = function (button, url, disabledAnimation, callback) {
        if (this.validator.validate()) {
            var form = this.form;
            var oldUrl = form.action;

			var flag = false;
			jQuery('.color').each(function () {
				if (!jQuery(this).find('input[type=hidden]').val()) {
					flag = true;
				}
			})
			if (flag) {
				var _message = Translator.translate('Please specify the product\'s option(s).');
				Ave40MessageBox.alertWarning(_message, {autoClose: 1500});
				return;
			}

            if (url) {
                form.action = url;
            }

			var e = null;
			try {
				if (button.href != undefined) {
					var _message = Translator.translate('Please wait...');
					ave40.showLoading(_message);
					jQuery.ajax({
						// url: form.action + '?ajax=1',
						url: '/ave40api/shoppingcart/add?product=' + jQuery('.goods-info').attr('product_id'),
						type: 'POST',
						dataType: 'json',
						data: jQuery('#product_addtocart_form').serialize(),
						success: function (result) {
							ave40.closeLoading();

                            if (result.success) {
                                if(!disabledAnimation) {
                                    ave40JoinToCartAnimation(
                                        function () {
                                            updateTopCartInfo(result)
                                        },
                                        jQuery(button).closest('.product-info').find('.jqzoom').find("img").eq(0)
                                    );
                                }

                                if (result.data) {
                                    jQuery('.buyinfo .car_count').html(result.data.total_count);
                                }

                                /*if(!disabledAnimation) {
                                    var _message = Translator.translate('Successful Operation!');
                                    Ave40MessageBox.alertSuccess(_message,{autoClose: 1000});
                                }*/

                                if(typeof callback == "function") {
                                    callback(result);
                                }
							} else {
								Ave40MessageBox.alertError(result.message,{autoClose: 1000});
							}
						},
						error: function (error) {
							ave40.closeLoading();
							return;
							// location.reload();
						}
					});
					return;
				}
				var _message = Translator.translate('Please wait...');
				ave40.showLoading(_message);
				form.submit();
				form.reset();

            } catch (e) {
            }
            this.form.action = oldUrl;
            if (e) {
                throw e;
            }

            if (button && button != 'undefined') {
                button.disabled = true;
            }
        }
    }.bind(productAddToCartForm);

    productAddToCartForm.submitLight = function (button, url) {
        if (this.validator) {
            var nv = Validation.methods;
            delete Validation.methods['required-entry'];
            delete Validation.methods['validate-one-required'];
            delete Validation.methods['validate-one-required-by-name'];
            if (this.validator.validate()) {
                if (url) {
                    this.form.action = url;
                }
                this.form.submit();
            }
            Object.extend(Validation.methods, nv);
        }
    }.bind(productAddToCartForm);

	window.productAddToCartForm = productAddToCartForm;




})
