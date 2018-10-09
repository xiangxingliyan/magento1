/**
 * 产品详情页面的批发用户属性选择的js
 * 产品详情页面bulk choice javascript 功能
 */

/* bulk choice js */
~function ($) {
	function updatePriceLabel(strkey, qty) {
		qty = isNaN(qty) ? 0 : qty;
		var products = allProductInfo['product'];
		var baseTierPrice = allProductInfo['tier_price'];
		var product = null;
		var tierPriceOrder = null;
		
		var wholesaleQty = getTierPriceQty(strkey, qty);
		var allWholesaleLi = $('.wholesale-price-list').find('li');
		var className = 'path';
		
		if(strkey!=null) {
			product = products[strkey];
			tierPriceOrder = product['tier_prices'];
		} else {
			tierPriceOrder = baseTierPrice;
		}
		
		var tierPriceOrder = tierPriceOrder.sort(function(obj1, obj2) {
			return parseInt(obj1.price_qty) < parseInt(obj2.price_qty) ? 0 : 1;
		});
		
		allWholesaleLi.removeClass('on').removeClass(className);
		
		if(strkey == null) {
			className = '';
		}
		
		for(var i=0; i<allWholesaleLi.length; i++) {
			var row = $(allWholesaleLi[i]);
			row.find('.wholesale-price-box span').html(formatPriceNumber(tierPriceOrder[i].price));
			row.addClass(className);
			
			if(parseInt(row.find('.wholesale-qty-box span').html()) == parseInt(wholesaleQty)) {
				row.addClass('on');
				className = '';
			}
		}
		
		//没有找到对应的阶梯价
		if(className != '') {
			allWholesaleLi.removeClass(className);
		}
		
		var msrp = null;
		
		if(product) {
			msrp = parseFloat(product.msrp);
		} else {
			msrp = parseFloat(allProductInfo.msrp);
		}
		
		msrp = isNaN(msrp) ? 0 : msrp;
		
		if(msrp) {
			var price = allProductInfo['price'];
			
			if(strkey) {
				price = getProductFinalPrice(strkey, qty);
			}
			
			var percent = Math.round((msrp - price)/msrp * 100);
			percent = percent < 0 ? ('+' + percent * -1) : '-' + percent;
			percent += '%';
			
			$('#msrp_value').html(formatPriceLabel(msrp));
			$('#msrp_discount_percent').html(percent);
		}
		
		var price = allProductInfo['price'];
		
		if(strkey) {
			price = getProductFinalPrice(strkey, qty);
		}
		
		$('#price_label').html(formatPriceLabel(price));
	}
	
	function calcBulkChoicePrice() {
		var bulk_choice_frame = $('#bulk_choice_frame');
		var qtys = bulk_choice_frame.find('input[data-type-id=qty_input]');
		var count = 0;
		var subtotal = 0;
		var estimatedTotal = 0;
		
		for(var i=0; i<qtys.length; i++) {
			var qtyinput = $(qtys[i]);
			var qty = qtyinput.val();
			var rowtotal = 0;
			
			qty = parseInt(qty);
			qty = isNaN(qty) ? 0 : qty;
			qty = qty < 0 ? 0 : qty;
			var strkey = qtyinput.data('attrStrkey');
			
			count += qty;
			var price = getProductFinalPrice(strkey, qty);
			var parent = qtyinput.closest('.row');
			
			rowtotal = parseFloat(price) * parseInt(qty);
			subtotal += rowtotal;
			
			parent.find('[data-type-id=price]').html(formatPriceLabel(price));
			var qtyCurrentRow = qtyinput.closest('.table_tr');
			
			if(qty == 0) {
				qtyinput.removeAttr('title');
				qtyCurrentRow.removeClass('selected');
			} else {
				qtyinput.attr('title', 'Row total: ' + formatPriceLabel(rowtotal));
				qtyCurrentRow.addClass('selected');
			}
		}
		
		var currentCartTotal = bulk_choice_frame.find('[data-type-id=current_cart]').data('amount');
		currentCartTotal = parseFloat(currentCartTotal);
		estimatedTotal = subtotal + currentCartTotal;
		
		bulk_choice_frame.find('[data-type-id=quantity]').html(formatQtyLabel(count));
		bulk_choice_frame.find('[data-type-id=subtotal]').html(formatPriceLabel(subtotal));
		bulk_choice_frame.find('[data-type-id=current_cart]').html(formatPriceLabel(currentCartTotal));
		bulk_choice_frame.find('[data-type-id=estimated_cart]').html(formatPriceLabel(estimatedTotal));
	}
	
	$(function () {
		var bulk_choice_frame = $('#bulk_choice_frame');
		bulk_choice_frame.find('input[data-type-id=qty_input]').keydown(function (e) {
			var UP = 38;
			var DOWN = 40;
			
			var count = $(this).val();
			count = parseInt(count);
			count = isNaN(count) ? 0 : count;
			
			if(e.keyCode == UP) {
				$(this).val(count+1);
			} else if(e.keyCode == DOWN) {
				if(count-1 <= 0) {
					$(this).val('');
				} else {
					$(this).val(count-1);
				}
			}
			
			calcBulkChoicePrice();
			updatePriceLabel($(this).data('attrStrkey'), parseInt($(this).val()));
		}).keyup(function(){
			calcBulkChoicePrice();
			updatePriceLabel($(this).data('attrStrkey'), parseInt($(this).val()));
		}).blur(function () {
			var products = allProductInfo['product'];
			var bulk_choice_frame = $('#bulk_choice_frame');
			if($(this).val() > products[$(this).attr('data-attr-strkey')]['stock_qty']) {
				$(this).val(products[$(this).attr('data-attr-strkey')]['stock_qty']);
				// Ave40MessageBox.alertError('The maximum inventory of this product is ' + products[$(this).attr('data-attr-strkey')]['stock_qty']);
			}
			
			updatePriceLabel(null, 0);
			calcBulkChoicePrice();
		}).focus(function () {
			updatePriceLabel($(this).data('attrStrkey'), parseInt($(this).val()));
			changePreviewImage($(this).data('imgAttributes'));
			
			if($(this).data('attrStrkey')) {
				var info = allProductInfo['product'][$(this).data('attrStrkey')];
				updateProductArrivalDate(info);
			} else {
				updateProductArrivalDate(null);
			}
		});
	});
	
	$('#add-to-cart-btn').click(function () {
		var bulk_choice_frame = $('#bulk_choice_frame');
		var qtys = bulk_choice_frame.find('input[data-type-id=qty_input]');
		var isQuickView  = $('#add-to-cart-btn').data('quickView') ? true : false;
		var products = [];
		
		for(var i=0; i<qtys.length; i++) {
			var qtyinput = $(qtys[i]);
			var qty = qtyinput.val();
			
			qty = parseInt(qty);
			qty = isNaN(qty) ? 0 : qty;
			
			if(qty > 0) {
				products.push({
					'product_id': $(this).data('productId'),
					'qty': qty,
					'super_attribute': qtyinput.data('superAttribute')
				});
			}
		}
		
		if(products.length == 0) {
			Ave40MessageBox.alertError('Please choice an option');
			return;
		}
		
		ave40.showLoading('Please wait...');
		ave40.ajaxPost('/ave40api/shoppingcart/batchAddCart',  {'products':products}, function() {
			ave40.closeLoading();
			
			if(this.ok) {
				var result = this;
				var img = $('.img-show .swiper-container .preview_image_list img').eq(0);

                if(!isQuickView) {
                    ave40JoinToCartAnimation(function () {
                        updateTopCartInfo(result);
                    }, img);
                } else{
                	//quick view 禁用动画并更新小购物车,提示通知
                    window.parent.closequickViewWin();
                    window.parent.updateTopCartInfo(result);
                    window.parent.Ave40MessageBox.alertSuccess('Successfully joined the shopping cart');
				}
				
				if(this.data.total) {
					$('[data-type-id=current_cart]').data('amount', this.data.total);
					calcBulkChoicePrice();
				}
			} else {
				Ave40MessageBox.alertError(this.message);
			}
		});
	});
}(ave40$)