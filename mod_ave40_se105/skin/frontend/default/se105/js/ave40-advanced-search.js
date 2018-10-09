/**
 * 高级搜索页面的js
 */
~function ($) {
	$(function () {

		if(!SearchRequestParams.categories) {
			SearchRequestParams.categories = [];
		}
		
		if(!SearchRequestParams.brands) {
			SearchRequestParams.brands = [];
		}

		/**
		 * 品牌筛选
		 */
		~function () {
			// $('.brands-screen .litter-brands li').on('click', function () {
			// 	var brandId = String($(this).data('brandId'));
			// 	var brandsAry = url.getParam('brands', ',');
			// 	var brandPosInAry = brandsAry.indexOf(brandId);
			//
			// 	if (brandPosInAry == -1) {
			// 		brandsAry.push(brandId);
			// 	} else {
			// 		brandsAry.splice(brandPosInAry, 1);
			// 	}
			//
			// 	if (brandsAry.length == 0) {
			// 		url.deleteParam('brands');
			// 	} else {
			// 		url.setParam('brands', brandsAry);
			// 	}
			//
			// 	url.go();
			// });

			var $brandMoreLis = $('.brand-more-pop .brands-screen-list li');
			$brandMoreLis.on('click', function () {
				$(this).toggleClass('user-selected');
			});

			$('#more-brands-ok').on('click', function () {
				$brandMoreLis.each(function () {
					var brandId = String($(this).data('brandId'));
					var pos = SearchRequestParams.brands.indexOf(brandId);

					if($(this).hasClass('user-selected')) {
						if(pos === -1) {
							SearchRequestParams.brands.push(brandId);
						}
					} else {
						if(pos !== -1) {
							SearchRequestParams.brands.splice(pos, 1);
						}
					}
				});

				if(SearchRequestParams.brands.length == 0) {
					window.location.href = $(this).data('urlDel');
				} else {
					var urlstr = $(this).data('urlTpl');
					window.location.href = urlstr.replace('{{val}}', SearchRequestParams.brands.join('-'));
				}
			});

			$('.brands-screen .brand-more').on('click', function () {
				var brands = SearchRequestParams.brands;

				$brandMoreLis.each(function () {
					var brand = String($(this).data('brandId'));

					if (!brand) {
						$(this).removeClass('user-selected');
						return;
					}

					if (brands.indexOf(brand) >= 0) {
						$(this).addClass('user-selected');
					} else {
						$(this).removeClass('user-selected');
					}
				});
			});
		}();

		/**
		 * 左侧分类筛选
		 */
		// $('.category-screen .menu a').click(function () {
		// 	var cat = SearchRequestParams.categories;
		// 	cat = cat == null ? [] : cat;
		// 	var id = String($(this).data('id'));
		// 	var index = cat.indexOf(id);
		//
		// 	if(index != -1) {
		// 		cat.splice(index, 1);
		// 		url.setParam('cat', cat).go();
		// 	} else {
		// 		cat.push(id);
		// 		url.setParam('cat', cat).go();
		// 	}
		// });

		/**
		 * 价格筛选
		 */
		$('.price-section .price-btn').on('click', function () {
			var priceMin = $('#price-min').val();
			var priceMax = $('#price-max').val();

			var par = [];
			if (priceMin !== '') {
				par.push('from');
				par.push(priceMin);
			}

			if (priceMax !== '') {
				par.push('to');
				par.push(priceMax);
			}

			if(par.length == 0) {
				window.location.href = $(this).data('urlDel');
			} else {
				var urlstr = $(this).data('urlTpl');
				window.location.href = urlstr.replace('{{val}}', par.join('-'));
			}
		});

		/**
		 * 排序
		 */
		// $('.sort-by .sort-item').on('click', function () {
		// 	try {
		// 		var orders = JSON.parse(url.getParam('order'));
		// 		orders = orders == null ? {} : orders;
		// 	} catch (e) {
		// 		orders = {};
		// 	}
		//
		// 	var sortKey = $(this).data('sortKey');
		//
		// 	if (!sortKey) {
		// 		return;
		// 	}
		//
		// 	if (orders[sortKey]) {
		// 		if (orders[sortKey] == 'desc') {
		// 			delete orders[sortKey];
		// 		} else {
		// 			orders[sortKey] = 'desc';
		// 		}
		// 	} else {
		// 		orders[sortKey] = 'asc';
		// 	}
		//
		// 	url.setParam('order', JSON.stringify(orders)).go();
		// });

		// $('.default-sort').click(function () {
		// 	url.deleteParam('order').go();
		// });

		/**
		 * 额外条件筛选
		 */
		~function () {
			var $additionalFilters = $('.additional-filter');

			for (var i = 0; i < $additionalFilters.length; i++) {
				var $row = $additionalFilters.eq(i);
				var filterKey = String($row.data('filterKey'));

				if (!filterKey) {
					continue;
				}

				var queryFilter = SearchRequestParams[filterKey];
				var $litterFilter = $row.find('.litter-filter');
				var $litterFilterRows = $litterFilter.find('[data-value]');
				var $resetFilter = $row.find('.reset-filter');
				var $chooseMoreBtn = $row.find('.choose-more-btn');
				var $chooseOkBtn = $row.find('.choose-more .choose-more-ok');
				var $moreRows = $row.find('.choose-more [data-value]');

				//部分点击筛选
				// $litterFilterRows.on('click', (function (filterKey, queryFilter) {
				// 	return function () {
				// 		var filterValue = String($(this).data('value'));
				// 		var queryFilterValues = !queryFilter && queryFilter !== 0 ? [] : queryFilter.split(',');
				//
				// 		var fvPos = queryFilterValues.indexOf(filterValue);
				//
				// 		if (fvPos < 0) {
				// 			queryFilterValues.push(filterValue);
				// 		} else {
				// 			queryFilterValues.splice(fvPos, 1);
				// 		}
				//
				// 		url.setParam(filterKey, queryFilterValues.join(',')).go();
				// 	}
				// })(filterKey, queryFilter));

				/* (function(filterKey, queryFilter) {})(filterKey, queryFilter) */

				//重置此筛选
				// $resetFilter.on('click', (function (filterKey, queryFilter) {
				// 	return function () {
				// 		url.deleteParam(filterKey).go();
				// 	}
				// })(filterKey, queryFilter));

				//标记当前选中
				$chooseMoreBtn.on('click', (function (filterKey, queryFilter, $moreRows) {
					return function () {
						var queryFilterValues = queryFilter ? queryFilter : [];

						$moreRows.each(function () {
							var theValue = String($(this).data('value'));
							if (queryFilterValues.indexOf(theValue) >= 0) {
								$(this).addClass('user-selected');
							} else {
								$(this).removeClass('user-selected');
							}
						});
					}
				})(filterKey, queryFilter, $moreRows));

				$moreRows.on('click', function () {
					$(this).toggleClass('user-selected');
				});

				// more 筛选
				$chooseOkBtn.on('click', (function (filterKey, queryFilter, $moreRows) {
					return function () {
						var filterValues = [];
						var $moreRowsFilter = $moreRows.filter('.user-selected');

						if ($moreRowsFilter.length == 0) {
							window.location.href = $(this).data('urlDel');
							return;
						}

						$moreRowsFilter.each(function () {
							var v = String($(this).data('value'));

							if (!v) {
								return;
							}

							filterValues.push(v);
						});

						if(filterValues.length > 0) {
							var urlstr = $(this).data('urlTpl');
							window.location.href = urlstr.replace('{{val}}', filterValues.join('-'));
						} else {
							window.location.href = $(this).data('urlDel');
						}

					}
				})(filterKey, queryFilter, $moreRows));
			}
		}(); //额外属性筛选

		/**
		 * 按钮切换
		 */
		$(document).ready(function () {
			var $leftScreenBoxLi = $("#left-screen-box").find("li ");
			// $leftScreenBoxLi.children("ul").hide();
			$leftScreenBoxLi.children(".choose-more").hide();
			$leftScreenBoxLi.find(".left-screen-title").click(function () {
				$(this).closest('li').children("ul").toggle();

				if($(this).closest('li').children("ul").css('display') == 'none') {
					$(this).find('.left-arrow-icon').addClass('on');
				} else {
					$(this).find('.left-arrow-icon').removeClass('on');
				};
			});
			
			$leftScreenBoxLi.find("dt").click(function () {
				$(this).siblings('dd').toggle();
				
				if($(this).siblings('dd').css('display') == 'none') {
					$('.block-layered-nav dt').addClass('on');
				} else {
					$('.block-layered-nav dt').removeClass('on');
				};
			});

			$leftScreenBoxLi.find(".left-choose").click(function (e) {
				e.preventDefault();
				e.stopPropagation();

				if($(this).closest('li').children(".choose-more").css('display') == 'none') {
					$(".choose-more").not($(this).closest('li').children(".choose-more")[0]).animateHide();
					$(this).closest('li').children(".choose-more").animateShow();
				} else {
					$(".choose-more").animateHide();
				}

			});

			$('.color-choose-ok').click(function () {
				$(this).closest('.choose-more').animateHide();
			});

			$('.choose-more-operation .cancel').click(function () {
				$(this).closest('.choose-more').animateHide();
			});

			/*brand-more 点击*/
			$('.brands-screen .brand-more').click(function () {
				$('.brand-more-pop').animateShow();
			});
			$('.brand-more-pop .color-choose-ok').click(function () {
				$('.brand-more-pop').animateHide();
			});
			$('.brand-more-pop .cancel').click(function () {
				$('.brand-more-pop').animateHide();
			});
		});

		/**
		 * 价格筛选添加回车响应
		 */
		$('#price-min, #price-max').on('keyup', function (e) {
			if(e.keyCode == ave40.params.keyCode.enter) {
				$('#price-filter-button').click();
			}
		});

		$('button[data-popup-loading=1],a[data-popup-loading=1]').click(function () {
			ave40.showLoading('Searching..');
		});

		$('body').click(function () {
			$('.choose-more').animateHide();
		});

		$('.choose-more').click(function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
		
		
		//生成当前筛选项到左上角
		~function() {
			var selectItems = $('#selected_items');
			var selectItemsTemplate = $('#remove_filter_template').html();
			generateBrandListFilter();
			generateFilterRemoveItems();
			generatePriceRemoveItems();
			addCheckedBoxRemoveItem('tpd', 'TPD');
			
			var length = selectItems.find('li').length - 1;
			selectItems.find('.selected-options i').html(String(length));
			
			function generateBrandListFilter() {
				var brandsList = $('#brands_list');
				$lis = brandsList.find('.brand-more-pop .brands-screen-list li.user-selected');
				
				for(var i=0; i<$lis.length; i++) {
					$li = $($lis[i]);
					addItemToRemoveList('brands', $li.data('brandId'), $li.find('img').prop('title'));
				}
			}
			
			function addItemToRemoveList(key, val, title) {
				if(!title || String(title).length == 0) {
					return;
				}
				
				var $item = $(selectItemsTemplate);
				
				$item.find('.text').html(title);
				$item.find('.remove').on('click', (function (key, val) {
					return function() {
						removeFilterItem(key, val);
						location.href = rebuildUrl();
					}
				})(key, val));
				
				selectItems.append($item);
			}
			
			function generateFilterRemoveItems() {
				for(key in SearchAdditionalFilters) {
					var keyval = SearchRequestRebuildParams[key];
					var options = SearchAdditionalFilters[key]['options'];
					
					if(keyval && keyval.length>0) {
						for(var i=0; i<keyval.length; i++ ) {
							addItemToRemoveList(key, keyval[i], options[keyval[i]]);
						}
					}
				}
			}
			
			function generatePriceRemoveItems() {
				var price = SearchRequestRebuildParams['price'];
				
				if(!price) {
					return ;
				}
				
				var from = price.from;
				var to = price.to;
				var text = '';
				
				if(from && to) {
					text = from + '~' + to;
				} else if(from) {
					text = ">=" + from;
				} else {
					text = "<=" + to;
				}
				
				var fromText = from ? 'from-' + from : '';
				var toText = to ? 'to-' + to : '';
				
				addItemToRemoveList('price', (fromText ? fromText : '') + (fromText?'-':'') + toText, 'Price ' + text);
			}
			
			function addCheckedBoxRemoveItem(key, title) {
				var keyvalue = SearchRequestRebuildParams[key];
				
				if(keyvalue && keyvalue[0]) {
					addItemToRemoveList(key, 1, title);
				}
			}
		}()
	})
	
	function removeFilterItem(key, value) {
		var keyval = SearchRequestRebuildParams[key];
		
		if(keyval && keyval.length > 0) {
			for(var i=0; i<keyval.length; i++) {
				if(keyval[i] == value) {
					SearchRequestRebuildParams[key].splice(i, 1);
					break;
				}
			}
		}
	}
	
	function rebuildUrl() {
		var url='/search';
		
		for(var key in SearchRequestRebuildParams) {
			if(SearchRequestRebuildParams[key].length > 0) {
				url += '/'+key + '/' + SearchRequestRebuildParams[key].join('-');
			}
		}
		
		return url;
	}
}(jQuery);