/**
 * 此文件用于产品详情页面的普通用户多选属性的js
 * 产品详情页面的下拉框js代码
 */
~function ($) {
	window.updateWholesalePriceLabel = function() {
		var amount = $('#qty').val();
		amount = isNaN(amount) ? 0 : amount;
		
		// var tierprices = $('#simple_product_tier_prices').data('json');
		var allWholesaleLi = $('.wholesale-price-list').find('li');
		var className = 'path';
		
		allWholesaleLi.removeClass('on').removeClass(className);
		// tierPriceOrder = tierprices.sort(function(obj1, obj2) {
		// 	return parseInt(obj1.price_qty) < parseInt(obj2.price_qty) ? 0 : 1;
		// });
		var elm = null;
		var priceLabel = $('#price_label');
		var originPrice = priceLabel.data('origin-price-label');
		var currentPrice = null;
		
		if(!originPrice) {
			originPrice = priceLabel.html();
			priceLabel.data('origin-price-label', originPrice);
		}
		
		
		for(var i=0; i<allWholesaleLi.length; i++) {
			var row = $(allWholesaleLi[i]);
			row.addClass(className);
			
			if(parseInt(row.find('.wholesale-qty-box span').html()) <= parseInt(amount)) {
				currentPrice = parseFloat(row.find('.wholesale-price-box span').html());
				elm = row;
				className = '';
			}
		}
		
		if(elm) {
			elm.addClass('on');
		}
		
		//没有找到对应的阶梯价
		if(className != '') {
			allWholesaleLi.removeClass(className);
		}
		
		if(currentPrice) {
			priceLabel.html(formatPriceLabel(currentPrice));
		} else {
			priceLabel.html(originPrice);
		}
	};
	
	$(function () {
		$('.attributeset select.attribute-select-control').change(function () {
			calcProductSelectStatus();
			
			var attributeSelects = $('.attributeset select.attribute-select-control');
			var key = '';
			var attrs = [];
			
			for(var i=0; i<attributeSelects.length; i++) {
				var currentSelect = $(attributeSelects[i]);
				var rowkey = currentSelect.data('attributeId') + '_' + currentSelect.val();
				key += key.length > 0 ? '-' : '';
				key += rowkey;
				var superId = currentSelect.data('superId');
				attrs.push(superId+ '_' + currentSelect.val());
			}
			
			var info = allProductInfo['product'][key];
			updateProductArrivalDate(info);
			
			if(info) {
				$('.availability-satus .status').html('In stock');
				
				if(info.tag) {
					var stock_text = info.tag.stock_text;
					var text = (stock_text&&stock_text.length)?stock_text:'In stock';
					$('.availability-satus .status').html(text);
				}
				
				$('#price_label').html(formatPriceLabel(info['price']));
				$('.old-price .price .price').html(formatPriceLabel(info['origin_price']));
				$('#ave40_off_label').html( '- ' +  formatQtyLabel(100*(info['origin_price']-info['price'])/info['origin_price']));
			}
			
			var attrCode = $(this).data('attributeCode');
			var id = 'product_attribute_' + attrCode;
			
			$('#' + id).val($(this).val());
			
			changePreviewImage(attrs);
		});
		
		calcProductSelectStatus();
	});
	
	function calcProductSelectStatus() {
		var attributeSelects = $('.attributeset select.attribute-select-control');
		var keyprefix = '';
		
		for(var i=0; i<attributeSelects.length; i++) {
			var currentSelect =  $(attributeSelects[i]);
			
			var currentAttrId =  currentSelect.data('attributeId');
			var options = currentSelect.find('option');
			var breakFor = false;
			
			for(var oi=0; oi<options.length; oi++) {
				var option = $(options[oi]);
				
				if(option.val() == '') {
					continue;
				}
				
				var tmpKey = currentAttrId+'_'+option.val();
				var checkKey = keyprefix.length > 0 ? (keyprefix + '-'+tmpKey) : tmpKey;
				
				if(isInStock(checkKey)) {
					option.removeAttr('disabled');
					
					if(!option.data('originText')) {
						option.data('originText', option.html());
					}
					
					option.html(option.data('originText'));
				} else {
					option.attr('disabled', 'disabled');
					
					if(!option.data('originText')) {
						option.data('originText', option.html());
					}
					
					option.html(option.data('originText') + ' - (Out of stock)');
					
					if(option.val() == currentSelect.val()) {
						currentSelect[0].selectedIndex = 0;
						breakFor = true;
					}
				}
			}
			
			if(breakFor) {
				break;
			}
			
			if(currentSelect.val() == '') {
				break;
			} else {
				keyprefix += keyprefix.length > 0 ? '-' : '';
				keyprefix += currentAttrId + '_' + currentSelect.val();
			}
		}
	}
	
	function isInStock(key) {
		var products = allProductInfo['product'];
		
		for(var k in products) {
			if(k.indexOf(key) == 0) {
				if(parseInt(products[k].is_in_stock) != 0) {
					return true;
				}
			}
		}
		
		return false;
	}
}(ave40$);