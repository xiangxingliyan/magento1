
~function ($) {
	$(function () {
		$('#phone_number').val($('#verify_phone_country_id').val());
		/*左侧tab切换*/
		// jQuery('.aside-tab li').click(function () {
		// 	jQuery(this).addClass('on').siblings('li').removeClass('on');
		// 	var index = jQuery(this).index();
		// 	console.log(index)
		// 	jQuery('.personal-main .main-right').eq(index).show().siblings('.main-right').hide()
		// });

		/*右侧tab切换*/
		$('.main-tab .tab li').click(function () {
			if ($(this).data('taboff') != undefined || $(this).parent().data('taboff') != undefined) {
				return;
			}

			if ($(this).attr('hash')) {
				location.hash = $(this).attr('hash');
			}

			$(this).addClass('active').siblings().removeClass('active');
			var index = $(this).index();
			$(this).parent().parent().siblings('.tab-main-content').eq(index).show().siblings('.tab-main-content').hide();
		});

		if (location.hash) {
			$('.main-tab .tab li[hash=' + location.hash.substring(1) + ']').click();
		}
		$('.account-main').removeClass('hidden');


		/**
		 *  v2.0修改头像
		 */
		$('#person-change-avatar-btn').click(function () {
            $('.up-load-icon').show();
        });


		/**
		 * 修改email password name 点击显示隐藏
		 *
		 */
        $('.toggle-title-btn').click(function () {
            var toggleElem = $(this).next(".toggle-module");
            toggleElem.toggleClass('show-item');
            var showElem = $('.change-account-information').find('.toggle-module:visible');
            var showPasswordElem = $('.change-account-information').find('.toggle-module.current_password_is_show:visible');

            $(this).toggleClass('active');

            if(toggleElem.is(':hidden')){
                toggleElem.find('input').removeAttr('name');
            }else{
                toggleElem.find('input').each(function(index,item){
                    $(this).attr('name',$(this).data('name'));
                });
            }

            if (showElem.length > 0){
                $('.change-account-info-save-btn').show();
            }else {
                $('.change-account-info-save-btn').hide();

            }

            if (showPasswordElem.length > 0){
                $('.current_password-box ').show();
                $('.current_password-box input').attr('name',$('.current_password-box input').data('name'))

            }else {
                $('.current_password-box ').hide();
                $('.current_password-box input').removeAttr('name');
            }
        });

        $('.change-account-info-save-btn').click(function() {
            var accountFormData = $('#change-account-info-form').serialize();
            ave40.showLoading('Please wait...');
            ave40.ajaxPost('/ave40api/customer/saveCustomerInfo', accountFormData, function (result) {
                if (this.ok) {
                    ave40.closeLoading();
                    Ave40MessageBox.alertSuccess('Successfully modified');
                    location.reload();
                } else {
                    ave40.closeLoading();
                    Ave40MessageBox.alertError(this.message);
                }
            });
        });







        /*$('.change-account-information .toggle-title-btn').click(function () {
        	if($(this).next('.toggle-module').hasClass('current_password_is_show')){
				$('.current_password-box').toggle();
                $(this).next(".toggle-module").toggle();
			}
            $('.change-account-info-save-btn').toggle();
        });*/


		/*Rename*/
		$('.user-info .modify-btn').on("click", function () {
			$('.up-load-icon').show();
			var newFirstName;
			var newLastName;
			$('.ensure-btn').show();
			$('.user-info .modify-btn').hide();
			var userFirst = $('.user-firstname')
			var userLast = $('.user-lastname');
			var userFirstVal = $('.user-firstname').text();
			var userLastVal = $('.user-lastname').text();
			var firstInput = $('<input type="text" class="editNameInput" id="firstname"  maxlength="10" value="' + userFirstVal + '"/>');
			var lastInput = $('<input type="text" class="editNameInput" id="lastname"   maxlength="10" value="' + userLastVal + '"/>')
			userFirst.html(firstInput);
			userLast.html(lastInput);
			firstInput.click(function () {
				return false;
			});
			firstInput.trigger("focus");
			firstInput.trigger("select");

			lastInput.focus(function () {
				lastInput.trigger("select");
			});

			$('.editNameInput').unbind('click').on('keypress', function (e) {
				var mEvt = e || window.event;
				if (mEvt.keyCode == "13") {
					mEvt.preventDefault();
					$('.user-info .ensure-btn').click();
				}
			});

			$('.user-info .ensure-btn').unbind('click').on('click', function () {
				$('.up-load-icon').hide();
				$('.editNameInput').each(function () {
					newLastName = $(this).val();
					newFirstName = $(this).parent().siblings().children('input').val();
				});

				if (newFirstName == "" || newLastName == "") {
					userFirst.text(userFirstVal);
					userLast.text(userLastVal);
				} else {
					userFirst.text(newFirstName);
					userLast.text(newLastName);
					$.ajax({
						url: '/customer/account/editName/',
						type: 'post',
						data: {
							ajax: 1,
							firstname: newFirstName,
							lastname: newLastName,
							form_key: $('#form_key').val()
						},
						dataType: 'json',
						success: function (result) {
						},
						error: function () {
						}
					});
				}
				$('.ensure-btn').hide();
				$('.user-info .modify-btn').show();
			});
		});


		/*default-address switch*/
		$('.person-ship-address-li .address-radio').click(function () {
			if ($(this).is(':checked')) {
                $(this).closest('.person-ship-address-li').addClass('active').siblings('.person-ship-address-li').removeClass('active');
				$(this).siblings('label').find('.ship-default-select-icon').addClass('default-show');
				$(this).closest('.person-ship-address-li').siblings('.person-ship-address-li').find('.ship-default-select-icon').removeClass('default-show');
                $(this).siblings('.ship-default-triangle-icon').show();
                $(this).closest('.person-ship-address-li').siblings('.person-ship-address-li').find('.ship-default-triangle-icon').hide();
			}
		});

		/*Security , change Phone and email*/
		$('.curr-phone-info .modify-btn').click(function () {
			if ($('.change-phone').hasClass('hide')) {
				$('.change-phone').addClass('show').removeClass('hide');
				$(this).addClass('active');
				$(this).siblings('.currently').addClass('active');

			} else {
				$('.change-phone').removeClass('show').addClass('hide');
				$(this).removeClass('active');
				$(this).siblings('.currently').removeClass('active');
			}
		});

		$('#phone_verify_code').on("input  propertychange", function () {
			var $phone_verify_code_val = $(this).val();
			if ($phone_verify_code_val.length >= 4) {
				$('#phone_verify_btn').removeAttr("disabled").removeClass('disable');
			} else {
				$('#phone_verify_btn').attr('disabled', 'disabled').addClass('disable');
			}
		});


        $('#send_phone_code').click(function () {
            var $phone_number_val = $('#phone_number').val();
            if ($phone_number_val == '' || $phone_number_val.length == 0) {
                $('#phone_number').focus();
                return;
            }

            var thiselm = $(this);
            thiselm.attr('disabled', 'disabled').html(thiselm.data('sendingText'));

            if (thiselm[0].intervalTimer) {
                clearInterval(thiselm[0].intervalTimer);
            }

            var _message = Translator.translate('Please wait...');

            $.ajax({
                url: '/sms/index/send',
                type: 'post',
                data: {
                    ajax: 1,
                    phone_number: $phone_number_val
                },
                dataType: 'json',
                success: function (result) {
                    if (result.errno) {
                        thiselm.removeAttr('disabled').html(thiselm.data('text'));
                        Ave40MessageBox.alertError(result.errmsg);
                    } else {

                        thiselm[0].intervalTimer = setInterval((function (elm) {
                            return function () {
                                if (!elm.timecount) {
                                    elm.timecount = 1
                                } else {
                                    elm.timecount++;
                                }

                                if (elm.timecount > 60) {
                                    clearInterval(elm.intervalTimer);
                                    elm.timecount = 0;
                                    elm.intervalTimer = null;
                                    $(elm).html($(elm).data('text')).removeAttr('disabled');
                                    return;
                                }

                                $(elm).html((60 - elm.timecount) + $(elm).data('timeUnit'));
                            }
                        })(thiselm[0]), 1000);
                        var _message = Translator.translate('Verification code sent successfully');
                        Ave40MessageBox.alertSuccess(_message);
                    }
                },
                error: function () {
                }
            });
        });


		$('[name=address-radio-group]').click(function () {
			var address_id = this.value;
			$.ajax({
				url: '/customer/address/formPost/id/' + address_id,
				type: 'post',
				data: {
					ajax: 1,
					action: 'set_default',
					default_billing: 1,
					default_shipping: 1,
					form_key: $('#form_key').val(),
				},
				dataType: 'json',
				success: function (result) {
					if (result.errno) {
						Ave40MessageBox.alertError(result.errmsg,{autoClose:2000});
						return;
					}
					return;

				},
				error: function () {
				}
			});
		});

		// $('#change-new-passwd').submit(function (e) {
		// 	var mEvt = e || window.event;
		// 	mEvt.preventDefault();
		//
		// 	$.ajax({
		// 		url: '/customer/account/editPost/?ajax=1',
		// 		type: 'post',
		// 		data: $('#change-new-passwd').serialize(),
		// 		dataType: 'json',
		// 		success: function (result) {
		// 			if (result.errno) {
		// 				Ave40MessageBox.alertError(result.errmsg);
		// 				return;
		// 			}else{
		// 				Ave40MessageBox.alertSuccess('Your password has been updated')
		// 			}
		// 		},
		// 		error: function () {
		// 		}
		// 	});
		// });

		$("#change-new-passwd").validate({
			rules: {
				current_password: {
					required: true,
					minlength: 6
				},
				password: {
					required: true,
					minlength: 6
				},
				confirmation: {
					required: true,
					minlength: 6,
					equalTo: "#password"
				}
			},
			onfocusout: false,
			errorClass: 'mess-error-tip',
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo(element.next('.input-tip-info'));
			},
			submitHandler: function (form) {
				var _message = Translator.translate('Please wait...');
				ave40.showLoading(_message);
				$.ajax({
					url: '/customer/account/editPost/?ajax=1',
					type: 'post',
					data: $('#change-new-passwd').serialize(),
					dataType: 'json',
					success: function (result) {
						ave40.closeLoading();
						if (result.errno) {
							Ave40MessageBox.alertError(result.errmsg);
						} else {
							form.reset();

							var _message = Translator.translate('Your password has been updated');
							Ave40MessageBox.alertSuccess(_message,{autoClose:2000})
						}
					},
					error: function () {
					}
				});
			}
		});


		$('.person-ship-address-li  .del').click(function () {
			var _message = Translator.translate('Are you sure you want to delete this address?');
			if (!confirm(_message)) {
				return;
			}
			var address_id = $(this).attr('address_id');
			$.ajax({
				url: '/customer/address/delete/id/' + address_id,
				type: 'get',
				data: {
					ajax: 1,
					form_key: $('#form_key').val(),
				},
				dataType: 'json',
				success: function (result) {
					if (result.errno) {
						Ave40MessageBox.alertError(result.errmsg);
						return;
					}
					location.reload();
					return;
				},
				error: function () {
				}
			});
		});

		$('#phone_verify_btn').click(function () {
			ave40.showLoading('Please wait...');
			$.ajax({
				url: '/sms/index/save',
				type: 'post',
				data: {
					ajax: 1,
					phone_number: $('#phone_number').val(),
					code: $('#phone_verify_code').val(),
				},
				dataType: 'json',
				success: function (result) {
					ave40.closeLoading();
					if (result.errno) {
						Ave40MessageBox.alertError(result.errmsg);
					} else {
						var _message = Translator.translate('You can check our wholesale prices on product page now!');
						Ave40MessageBox.alertSuccess(result.errmsg + _message);
                        location.reload();
						$('#phone_verify_btn').disabled = true;
					}


				},
				error: function () {
					ave40.closeLoading();
				}
			});
		});

		$('.curr-email-info .modify-btn').click(function () {
			if ($('.new-email-box').hasClass('hide')) {
				$('.new-email-box').addClass('show').removeClass('hide');
				$(this).addClass('active');
				$(this).siblings('.currently').addClass('active');

			} else {
				$('.new-email-box').removeClass('show').addClass('hide');
				$(this).removeClass('active');
				$(this).siblings('.currently').removeClass('active');
			}
		})


		// $('#change-email-form').submit(function (e) {
		// 	var evt = e || window.event;
		// 	evt.preventDefault();
		// 	$.ajax({
		// 		url: '/customer/account/emailchange/',
		// 		type: 'post',
		// 		data: {
		// 			ajax: 1,
		// 			email: $('#change-email-form [name=email]').val(),
		// 			password: $('#change-email-form [name=password]').val(),
		// 			form_key: $('#form_key').val(),
		// 		},
		// 		dataType: 'json',
		// 		success: function (result) {
		// 			if (result.errno) {
		// 				Ave40MessageBox.alertError(result.errmsg);
		// 				return;
		// 			}
		// 			$('#change-email-form').find('#new-email-submit').attr('disabled', 'disabled').addClass('send');
		// 			$('#change-email-form').find('#new-email-submit').text('Email Sent');
		// 			$('.email-send-info').show();
		// 		},
		// 		error: function () {
		// 		}
		// 	});
		// });

		$("#change-email-form").validate({
			rules: {
				email: {
					required: true,
					email: true
				},
				password: {
					required: true,
					minlength: 6
				}
			},
			onfocusout: false,
			errorClass: 'mess-error-tip',
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.appendTo(element.next('.input-tip-info'));
			},
			submitHandler: function (form) {
				var _message = Translator.translate('Please wait...');
				ave40.showLoading(_message);
				$.ajax({
					url: '/customer/account/emailchange/',
					type: 'post',
					data: {
						ajax: 1,
						email: $('#change-email-form [name=email]').val(),
						password: jQuery('#change-email-form [name=password]').val(),
						form_key: jQuery('#form_key').val(),
					},
					dataType: 'json',
					success: function (result) {
						ave40.closeLoading();
						if (result.errno) {
							Ave40MessageBox.alertError(result.errmsg,{autoClose: 2000});
							return;
						}
						jQuery('#change-email-form').find('#new-email-submit').attr('disabled', 'disabled').addClass('send').text('Email Sent');
						jQuery('.email-send-info').show();
					},
					error: function () {
					}
				});
			}

		});


		/*add new address*/
		jQuery('.add-address-btn').on('click', function () {
			jQuery(this).hide();
			jQuery('.add-address-pop').slideDown();
		});



        $('#cancel_address_btn').click(function () {
        	if (window.location.search.substr(1).indexOf('id') == -1){
                $('.add-address-pop').fadeOut();
                $('.add-address-btn').show();
                $('html,body').animate({ scrollTop: 0 }, 500);
			} else {
        		location.href = '/customer/account/index/nodt/1/#address'
			}

        });

		/*退货弹出框*/
		jQuery('.refund-btn').on('click', function () {
			jQuery(this).parent().next('.refund-pop').showAve40PopupBox();
		}).parent().next('.refund-pop').find('.close').click(function () {
			jQuery(this).closest('.refund-pop').closeAve40PopupBox();
		});

		/*point pop*/
		// jQuery('.point-overview .more-btn').on('click', function () {
		// 	jQuery('.alert').fadeIn(2000)
		// 	showOverlay();
		// 	jQuery(this).siblings('.points-pop').show();
		// 	var closeName = jQuery('.close');
		// 	var parentName = jQuery('.refund-pop')
		// 	clickClose(closeName, parentName);
		// });

		jQuery('.point-overview .more-btn').click(function () {
			$(this).parent().find('.points-pop').showAve40PopupBox('fadezoomin');
		});

		jQuery('.point-over-box .close').click(function () {
			$(this).closest('.points-pop').closeAve40PopupBox();
		});


  		/*jQuery(".phone-wid li a.on").click(function(e){

  			var devicewid=document.documentElement.clientWidth;
  			if(devicewid < 768){
  				$(".phone-wid").css("display","none");
  				$(".phone-hidden").css("display","block");
  			}
  			e.preventDefault();
  		});*/
	})
}(jQuery);

function previewImage(file) {
	var MAXWIDTH = 260;
	var MAXHEIGHT = 180;
	var div = document.getElementById('upload-imgBox');
	if (file.files && file.files[0]) {
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.onload = function () {
			var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
			img.width = rect.width;
			img.height = rect.height;
			// img.style.marginLeft = rect.left+'px';
			// img.style.marginTop = rect.top+'px';
		}
		var reader = new FileReader();
		reader.onload = function (evt) {
			img.src = evt.target.result;
		}
		reader.readAsDataURL(file.files[0]);
	} else {
		var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
		file.select();
		var src = document.selection.createRange().text;
		div.innerHTML = '<img id=imghead>';
		var img = document.getElementById('imghead');
		img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
		var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
		status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
		div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;" + sFilter + src + "\"'></div>";
	}
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
	var param = {
		top: 0,
		left: 0,
		width: width,
		height: height
	};
	if (width > maxWidth || height > maxHeight) {
		rateWidth = width / maxWidth;
		rateHeight = height / maxHeight;
		
		if (rateWidth > rateHeight) {
			param.width = maxWidth;
			param.height = Math.round(height / rateWidth);
		} else {
			param.width = Math.round(width / rateHeight);
			param.height = maxHeight;
		}
	}
	param.left = Math.round((maxWidth - param.width) / 2);
	param.top = Math.round((maxHeight - param.height) / 2);
	return param;
}

/*textarea words*/
function checkMaxInput(obj, maxLen) {
	if (obj == null || obj == undefined || obj == "") {
		return;
	}
	if (maxLen == null || maxLen == undefined || maxLen == "") {
		maxLen = 200;
	}
	
	var strResult;
	var $obj = jQuery(obj);
	var newid = $obj.attr("id") + 'msg';
	if (obj.value.length > maxLen) {
		obj.value = obj.value.substring(0, maxLen);
		jQuery('.Max_msg').html(obj.value.length);
	}
	else {
		jQuery('.Max_msg').html(obj.value.length);
		
	}
	// var $msg = jQuery('#Max_msg');
	// if ($msg.length == 200) {
	// 	$obj.after(strResult);
	// }
	// else {
	// 	$msg.html(strResult);
	// }
}