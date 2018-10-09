~function ($) {
    $(function () {

        var search_btn = $('#fast-order-search-btn');
        var search_input = $('#fast-order-search-input');
        var search_result = $('#fast-search-result').find('.fast-order-table');
        var search_result_body = search_result.find('tbody');
        var select_list = $('#fast-select-list').find('tbody');
        var search_data = null;

        var loading_html = '<tr class="fast_loading"><td style="text-align: center"><div class="ave40_loading_animation"></div></td></tr><tbody</table>';

        var skus = [];

        select_list.find('tr[data-type=item]').each(function (index, item) {
            if ($(this).length < 1){
                return;
            }
            skus.push($.trim($(this).data('sku')))
        });

        //点击搜索
        search_btn.on('click', function () {
            var val = $.trim(search_input.val());
            if (val) {
                search_result.show();
                search_result_body.html($('#loading_tmp').html());

                $.ajax({
                    type: 'POST',
                    url: '/ave40_base/fastorder/search',
                    dataType: 'json',
                    data: {
                        sku: val
                    },
                    success: function (result) {
                        if (result.success) {
                            var isAddedFlag = false;

                            if (skus && $.inArray(result.data.sku, skus) !== -1 ) {
                                isAddedFlag = true;     //搜索结果已选中添加
                            }

                            var html = template('product_item_tmp',{
                                result_status: result.success,
                                data: result.data,
                                isAddedStatus: isAddedFlag
                            });
                            search_result_body.html(html);
                            search_data = result.data;
                            /*var tr_html = formatSelectHtml(result.data, null);
                            search_data = result.data;
                            search_result_body.html(html + tr_html);*/
                        } else {
                            var html = template('product_item_tmp',{
                                result_status: result.success,
                                data: {
                                    sku: val
                                }
                            });
                            search_result_body.html(html);
                        }
                    },
                    error: function () {
                        var html = template('product_item_tmp',{
                            result_status_error_code: true
                        });
                        search_result_body.html(html);
                    }
                })
            }

        });

        //回车键搜索
        search_input.keyup(function (event) {
            if (event.keyCode == 13) {
                search_btn.trigger("click");
            }
        });

        //点击 add 插入到selected product
        search_result.on('click', '.fast-action-add-btn', function () {
            if ($(this).hasClass('disabled')) {
                return;
            }

            if (search_data) {
                $('#no-select-result').hide();
                $(this).closest('tr[data-type=item]').remove().closest('table').hide();

                var html = template('product_item_tmp',{
                    isAddedClickAction: true,
                    data: search_data,
                    result_status: true
                });
                select_list.prepend(html);

                /*var select_html = formatSelectHtml(search_data, true);
                $('#fast-select-list').prepend(select_html);*/
                calcProductPrice();
                if($.inArray(search_data.sku, skus) == -1) {
                    skus.push($.trim(search_data.sku));
                }
            }
        });

        //点击remove删除选中的product
        select_list.on('click', '.fast-remove-btn', function () {
            var itemSku = $(this).closest('[data-type="item"]').data('sku');
            $(this).closest('[data-type="item"]').remove();
            var items = $('#fast-select-list').find('tr[data-type=item]');

            if (items.length < 1){
                $('#no-select-result').show();
            }

            if($.inArray(itemSku, skus) !== -1) {
                skus.splice($.inArray(itemSku, skus), 1);
            }

            calcProductPrice();
        });

        var oldQty;
        $('#fast-select-list').on('click', '.qty-add-btn', function () {
            if($(this).hasClass('disabled')){
                return;
            }

            var itemId = $(this).closest('[data-type="item"]').data("itemId");
            var num = $(this).prev().val() / 1 + 1;

            $(this).prev().val(num);

            updateQtyAjax(itemId, num);
        });

        $('#fast-select-list').on('click', '.qty-reduce-btn', function(){
            if($(this).hasClass('disabled')){
                return;
            }

            var itemId = $(this).closest('[data-type="item"]').data("itemId");
            var num = $(this).next().val() / 1;
            if(num > 1){
                num = num - 1;
                $(this).next().val(num);
                updateQtyAjax(itemId, num);
            }
            else{
                $(this).next().val(1);
            }
        });


        $('#fast-select-list').on('focus', '.input_qty', function(){
            oldQty = $(this).val();
        });

        $('#fast-select-list').on('blur', '.input_qty', function(){
            var itemId = $(this).closest('[data-type="item"]').data("itemId");
            var currentQty = $(this).val();

            if(currentQty <= 0 || !(/^(\+|-)?\d+$/.test( currentQty ))) {
                Ave40MessageBox.alertError('Quantity must be a number and greater than 0');
                $(this).val(oldQty);
                currentQty = oldQty;
                return;
            }
            updateQtyAjax(itemId, currentQty);
        });

        function updateQtyAjax(itemId,qty) {
            ave40.showLoading("Please wait...");
            $.ajax({
                url: '/ave40_base/fastorder/updateitemqty',
                type:'POST',
                datatype: 'json',
                data:{
                    entity_id: itemId,
                    qty: qty
                },
                success: function (results) {
                    ave40.closeLoading();

                    if (!results.error) {

                        if(results.data.is_qty_not_available){
                            Ave40MessageBox.alertError("Qty is not available");
                        }

                        if (results.data.qty){
                            $('#fast-select-list .product_item_'+ itemId).find('[data-type="qty"]').val(results.data.qty);
                        }

                        if(results.data.price) {
                            $('#fast-select-list .product_item_'+ itemId).find('[data-type="price"]').text(results.data.price_symbol + parseFloat(results.data.price).toFixed(2));
                            $('#fast-select-list .product_item_'+ itemId).find('[data-fill-id="price"]').val(results.data.price);
                        }

                        if(results.data.origin_price) {
                            $('#fast-select-list .product_item_'+ itemId).find('[data-type="origin-price"]').text(results.data.price_symbol + parseFloat(results.data.origin_price).toFixed(2));
                        } else {
                            $('#fast-select-list .product_item_'+ itemId).find('[data-type="origin-price"]').text('');
                        }

                        if(results.data.subtotal_price) {
                            $('#fast-select-list .product_item_'+ itemId).find('[data-type="subtotal"]').text(results.data.price_symbol + parseFloat(results.data.subtotal_price).toFixed(2));
                        }

                        calcProductPrice();

                    } else{
                        Ave40MessageBox.alertError(results.message)
                    }
                },
                error: function (message) {
                    ave40.closeLoading();
                    Ave40MessageBox.alertError(message)
                }
            })
        }

        function calcProductPrice() {
            var items = $('#fast-select-list').find('tr[data-type=item]');
            var totalQty = 0;
            var totalPrice = 0;

            if (items.length == 0){
                $('#total_qty').html(0);
                $('#total_price').html(0.00);
            }

            items.each(function (i,item) {
                var price = parseFloat($(item).find('[data-fill-id="price"]').val());
                var qty = parseInt($(item).find('input[data-type="qty"]').val());
                var subtotal = qty * price;


                totalQty += qty;
                totalPrice += subtotal;

                
            });

            $('#total_qty').html(totalQty);
            $('#total_price').html(parseFloat(totalPrice).toFixed(2));
        }

        $('#fast-order-checkout-btn').click(function () {
            var items = $('#fast-select-list').find('tr[data-type=item]');
            var items_data_arr = [];

            if (items.length < 1) {
                Ave40MessageBox.alertError('Please select a product');
                return;
            }

            var outOfStockItem = $('#fast-select-list').find('.outofstock');
            if (outOfStockItem.length > 0){
                var outOfStockSkus = [];
                outOfStockItem.each(function (i,item) {
                    outOfStockSkus.push($.trim($(this).closest('tr[data-type=item]').data('sku')));
                });
                Ave40MessageBox.alertError('Product with '+ outOfStockSkus.join(',') +' is current out of stock');
                return;
            }

            items.each(function (i,item) {
                var itemId = $(this).data('itemId');
                var qty = parseInt($(this).find('input[data-type="qty"]').val());
                var data = {
                    entity_id: itemId,
                    qty: qty
                };
                items_data_arr.push(data);
            });

            ave40.showLoading("Please wait...");
            $.ajax({
                url: '/ave40_base/fastorder/translate',
                type: 'POST',
                dataType:'json',
                data: {item : items_data_arr},
                success: function (results) {
                    ave40.closeLoading();
                    if (!results.error) {
                        Ave40MessageBox.alertSuccess(results.message);
                        location.href = results.data.url;
                    } else{
                        Ave40MessageBox.alertError(results.message)
                    }
                },
                error: function (message) {
                    ave40.closeLoading();
                    Ave40MessageBox.alertError(message)
                }

            })
        });


    })


}(jQuery);