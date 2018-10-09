/**
 * Created by Administrator on 2017/5/19.
 */

~function ($) {
	$(function () {
		$('#newsletter-validate-detail').validate({
			rules: {
				email: {
					required: true,
					email: true
				}
			},
			errorClass: 'mess-error-tip-dashed',
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.hide();
			},
			submitHandler: function (form) {

				var FormData = $('#newsletter-validate-detail').serialize();
				$.ajax({
					url: '/newsletter/subscriber/new?ajax=1',
					type: 'POST',
					dataType: 'json',
					data: FormData,
					success: function (data) {
						ave40.closeLoading();
						if (data.errno == 0) {
							ave40.closeLoading();
							Ave40MessageBox.alertSuccess('Thank you for your subscription.')
						} else {
							ave40.closeLoading();
							Ave40MessageBox.alertError(data.errmsg);
						}
					},
					error: function (error) {
					}
				});
                return false;
			}
		})
	});
	
	$(function () {
		
		
		$('.customer-feedback .feedback-submit').on('click', function() {
			$('.feedback-popup').animateShow();
		});
		$('.feedback-popup .close').on('click', function() {
			validator.resetForm();
			$('.feedback-popup').animateHide();
		});
		
		var validator = $("#feedback-form").validate({
			errorClass: 'mess-error-tip',
			errorElement: "div",
			errorPlacement: function (error, element) {
				error.hide();
			},
			onfocusout:false,
			submitHandler: function (form) {
				ave40.showLoading('Sending feedback ...');
				$('.feedback-popup').animateHide();
				ave40.ajaxPost('/ave40_contacts/index/axpost', $('.feedback-popup .input_form').serialize(),
					function () {
						if(this.ok) {
							form.reset();
							Ave40MessageBox.alertSuccess($('.feedback-popup .input_form').attr('success-msg'));
						} else {
							$('.feedback-popup').animateShow();
							Ave40MessageBox.alertError(this.message);
						}
						ave40.closeLoading();
					}
				);
			}

		});

		/*
		 $('.feedback-popup .submit-common').click(function () {
		 ave40.showLoading('Sending feedback');
		 $('.feedback-popup').animateHide();

		 ave40.ajaxPost('/ave40_contacts/index/axpost', $('.feedback-popup .input_form').serialize(),
		 function () {
		 if(this.ok) {
		 Ave40MessageBox.alertSuccess($('.feedback-popup .input_form').attr('success-msg'));
		 } else {
		 $('.feedback-popup').animateShow();
		 Ave40MessageBox.alertError(this.message);
		 }
		 ave40.closeLoading('Sending');
		 }
		 );
		 });
		 */
	})

	/* This site is converting visitors into subscribers and customers with OptinMonster - http://optinmonster.com*/
	var om591ab5c643a16,om591ab5c643a16_poll=function(){var r=0;return function(n,l){clearInterval(r),r=setInterval(n,l)}}();!function(e,t,n){if(e.getElementById(n)){om591ab5c643a16_poll(function(){if(window['om_loaded']){if(!om591ab5c643a16){om591ab5c643a16=new OptinMonsterApp();return om591ab5c643a16.init({"s":"32175.591ab5c643a16","staging":0,"dev":0,"beta":0});}}},25);return;}var d=false,o=e.createElement(t);o.id=n,o.src="//a.optnmstr.com/app/js/api.min.js",o.async=true,o.onload=o.onreadystatechange=function(){if(!d){if(!this.readyState||this.readyState==="loaded"||this.readyState==="complete"){try{d=om_loaded=true;om591ab5c643a16=new OptinMonsterApp();om591ab5c643a16.init({"s":"32175.591ab5c643a16","staging":0,"dev":0,"beta":0});o.onload=o.onreadystatechange=null;}catch(t){}}}};(document.getElementsByTagName("head")[0]||document.documentElement).appendChild(o)}(document,"script","omapi-script");
	/*/ OptinMonster*/
}(jQuery)