/**
 * 产品详情页通用js
 * @param qty
 * @returns {string}
 */



function formatQtyLabel(qty) {
	return String(parseInt(qty));
}

function formatPriceLabel(price) {
	if(!window.currencySymbol) {
		window.currencySymbol = document.getElementById('currency_symbol').value
	}
	
	return window.currencySymbol + formatPriceNumber(price);
}


function formatPriceNumber(price) {
	if(isNaN(price)) {
		price = 0;
	}
	
	price = parseFloat(price).toFixed(2);
	var priceStr = String(price);
	var dotpos = priceStr.indexOf('.');
	var intpart = priceStr.substr(0, dotpos);
	var floatpart = priceStr.substr(dotpos);
	var chunkAry = intpart.split('');
	var pos = intpart.length%3;
	
	for(var i=0; i < parseInt(intpart.length/3); i++) {
		if(pos == 0) {
			pos += 3;
			continue;
		}
		
		chunkAry.splice(pos, 0, ',');
		pos += 4;
	}
	
	return chunkAry.join('') + floatpart;
}

/**
 * 获取产品最终价格, 包含阶梯价
 */
function getProductFinalPrice(attrkey, qty) {
	var products = allProductInfo['product'];
	var product = products[attrkey];
	
	var tierPriceQty = getTierPriceQty(attrkey, qty);
	var tierPrices = product['tier_prices'];
	var price = product['price'];
	var tierPrice = price;
	
	for(var i=0; i<tierPrices.length; i++) {
		if(parseInt(tierPriceQty) == parseInt(tierPrices[i].price_qty)) {
			tierPrice = tierPrices[i].price;
			break;
		}
	}
	
	return tierPrice > price ? price : tierPrice;
}

/**
 * 获取当前阶梯价的数量阶梯
 * @param attrkey
 * @param qty
 * @returns {*}
 */
function getTierPriceQty(attrkey, qty) {
	var products = allProductInfo['product'];
	var product = products[attrkey];
	
	if(!product) {
		return 1;
	}
	
	var cartQtyInfo = quoteProductInfo[product.entity_id];
	var cartQty = cartQtyInfo ? parseInt(cartQtyInfo['qty']) : 0;
	cartQty = isNaN(cartQty) ? 0 : cartQty;
	var tierPrices = product['tier_prices'];
	var price = product['price'];
	
	if(tierPrices.length == 0) {
		return price;
	}
	
	tierPrices = tierPrices.sort(function(obj1, obj2) {
		return parseInt(obj1.price_qty) > parseInt(obj2.price_qty) ? 0 : 1;
	});
	
	for(var i=0; i<tierPrices.length; i++) {
		if(parseInt(qty)/*+cartQty*/ >= parseInt(tierPrices[i].price_qty)) {
			return parseInt(tierPrices[i].price_qty);
		}
	}
	
	return 1;
}

~function ($) {
	window.changePreviewImage = function(attrs) {
		var imgs = $('.img-show .swiper-container ul li img');
		var selectedImgs = [];
		
		for(var i=0; i<imgs.length; i++) {
			var img = $(imgs[i]);
			var imgmap = null;
			
			if(img.prop('imageAttributeMap')) {
				imgmap = img.prop('imageAttributeMap');
			} else {
				var labelStr = img.data('label');
				var data = labelStr.split(';');
				for(var k=0; k<data.length;k++) {
					data[k] += ',';
				}
				
				img.prop('imageAttributeMap', data);
				imgmap = data;
			}
			
			var tmpattrs = attrs.clone();
			var find = false;
			
			//寻找所有相匹配的图片
			while (tmpattrs.length > 0) {
				var key = tmpattrs.join(',') + ',';
				
				for (var j = 0; j< imgmap.length; j++) {
					if (imgmap[j].indexOf(key) !== -1) {
						selectedImgs.push({imgkey: imgmap[j], key: key, img: img[0]});
						find = true;
						break;
					}
				}
				
				//当前属性的产品图片已经找到,
				if(find) {
					break;
				}
				
				tmpattrs.pop();
			}
		}
		
		if(selectedImgs.length > 0) {
			var maxKeyLength = selectedImgs[0].key.length;
			
			selectedImgs.map(function (row) {
				maxKeyLength = maxKeyLength < row.key.length ? row.key.length : maxKeyLength;
			});
			
			selectedImgs = selectedImgs.filter(function (row) {
				return row.key.length ==  maxKeyLength;
			});
			
			var bestImg = selectedImgs[0].img;
			var minImgkeyLength = selectedImgs[0].imgkey.length;
			
			for(var i=1; i<selectedImgs.length; i++) {
				if(minImgkeyLength > selectedImgs[i].imgkey.length) {
					bestImg = selectedImgs[i].img;
					minImgkeyLength = selectedImgs[i].imgkey.length;
				}
			}
			
			//切换图片
			$('.goods-info .img-show .swiper-container-spec-scroll')[0].swiperInstance.slideTo($(bestImg).parent('li').index());
			bestImg.onmousemove();
		}
	};
	
	
	
	window.updateProductArrivalDate = function(info) {
		$('#crm_arrival_date').hide();
		$('#mdw_ed_days').hide();
		
		if(!info) {
			return ;
		}
		
		if(parseInt(info['pre_sales'])) {
			if(info['crm_arrival_date']) {
				$('#crm_arrival_date').show().find('.value').html(info['crm_arrival_date_label']);
			}
		} else {
			if(info['mdw_ed_days']) {
				$('#mdw_ed_days').show().find('.value').html(info['mdw_ed_days']);
			}
		}
	}
}(ave40$);