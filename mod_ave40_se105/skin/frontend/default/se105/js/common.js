/**
 * @var ave40 全局变量, 用于储存站点中通用的数据或者通用方法
 * ave40.params 方法参数存放地方
 *
 * 方法参考:
 * @see ave40.addEscCloseElement
 *
 * 参数参考:
 * @see ave40.params
 */

/*=======全局Ajax通用封装函数=========*/
jQuery.ax = function (url, data, async, type, dataType, successfn, errorfn) {
    async = (async == null || async == "" || typeof(async) == "undefined") ? "true" : async;
    type = (type == null || type == "" || typeof(type) == "undefined") ? "post" : type;
    dataType = (dataType == null || dataType == "" || typeof(dataType) == "undefined") ? "json" : dataType;
    data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
    jQuery.ajax({
        type: type,
        async: async,
        data: data,
        url: url,
        dataType: dataType,
        success: function (d) {
            // successfn(d);
        },
        error: function (e) {
            // errorfn(e);
        }
    });
};

jQuery.axpost = function (url, data, successfn) {
    data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
    jQuery.ajax({
        type: "post",
        data: data,
        url: url,
        dataType: "json",
        success: function (d) {
            // successfn(d);
        }
    });
};

jQuery.axspost = function (url, data, successfn, errorfn) {
    data = (data == null || data == "" || typeof(data) == "undefined") ? {"date": new Date().getTime()} : data;
    jQuery.ajax({
        type: "post",
        data: data,
        url: url,
        dataType: "json",
        success: function (d) {
            successfn(d);
        },
        error: function (e) {

        }
    });
};


/*========倒计时插件：=========*/
/*
 调用方法：
 countDown("<?=$_product->getSpecialToDate()?>", ".limit-time-<?=$_product->getId()?> .time .day",
 ".limit-time-<?=$_product->getId()?> .time .hour", ".limit-time-<?=$_product->getId()?> .time .minute",
 ".limit-time-<?=$_product->getId()?> .time .second");

 注：需加父级元素前缀，防止冲突
 */
function countDown(time, day_elem, hour_elem, minute_elem, second_elem) {
    //if(typeof end_time == "string")
    var end_time = new Date(time).getTime(),
        //current_time = new Date().getTime(),
        sys_second = (end_time - new Date().getTime()) / 1000;
    var timer = setInterval(function () {
        if (sys_second > 0) {
            sys_second -= 1;
            var day = Math.floor((sys_second / 3600) / 24);
            var hour = Math.floor((sys_second / 3600) % 24);
            var minute = Math.floor((sys_second / 60) % 60);
            var second = Math.floor(sys_second % 60);
            day_elem && jQuery(day_elem).text(day);
            jQuery(hour_elem).text(hour < 10 ? "0" + hour : hour);
            jQuery(minute_elem).text(minute < 10 ? "0" + minute : minute);
            jQuery(second_elem).text(second < 10 ? "0" + second : second);

        } else {
            clearInterval(timer);
        }
    }, 1000);
}

/*========输入验证=========*/
/*
 输入验证：只能输入大于1的正整数
 onlyNumberKeyup:鼠标抬起触发函数
 onlyNumberAfterpaste：粘贴触发函数
 onlyNumberFocus：输入框获得焦点选中文本

 调用：
 <input type="number" onkeyup="onlyNumberKeyup(this)" onafterpaste="onlyNumberAfterpaste(this)" onfocus="onlyNumberFocus(this)" >
 */
function onlyNumberKeyup(_this) {
    _this.value = (parseInt((_this.value = _this.value.replace(/\D/g, '')) == '' || parseInt((_this.value = _this.value.replace(/\D/g, '')) == 0) ? '1' : _this.value, 10));
    return _this.value;
}
function onlyNumberAfterpaste(_this) {
    _this.value = (parseInt((_this.value = _this.value.replace(/\D/g, '')) == '' || parseInt((_this.value = _this.value.replace(/\D/g, '')) == 0) ? '1' : _this.value, 10));
    return _this.value;
}
function onlyNumberFocus(_this) {
    return _this.select();
}
function NoSpace(_this) {
    _this.value = _this.value.replace(/\s+/g, '');
    return _this.value;
}

function resizeOverlay($overlay) {
    var $overlays = $overlay == undefined ? jQuery('.overlay') : $overlay;

    for (var i = 0; i < $overlays.length; i++) {
        var $row = $overlays.eq(0);

        if ($row.parent().length <= 0) {
            return;
        }

        if ($row.parent().prop('tagName').toLowerCase() == 'body') {
            $row.css({'height': jQuery(document).height(), 'width': jQuery(document).width()});
        } else {
            $row.css({'height': $row.parent().height(), 'width': $row.parent().width()});
        }
    }
}


function clickClose(closeName, parentName) {
    jQuery(closeName).click(function () {
        // jQuery(this).closest(parentName).hide();
        jQuery(this).closest(parentName).animateHide();
        // jQuery('.overlay').hide();
        jQuery('.overlay').animateHide();
    })
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
    /*
     var $msg = jQuery('#Max_msg');
     if ($msg.length == 200) {
     $obj.after(strResult);
     }
     else {
     $msg.html(strResult);
     }
     */
}

~function ($) {
    /**
     * 整体参数变量
     * @type {{animationShow: {defaultScale: number, defaultOpacity: number, duration: number}}}
     */
    window.ave40 = window.Ave40 = {};
	window.ave40$ = $;
	
    /**
     * ave40对象扩展
     */
    $.extend(ave40, {
        'params': {
            'animateShow': {
                'default': {
                    'defaultScale': 1.3,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 200,
                    'rotateX': 15,
                    'calcTranslateY': true,
                    'translateY': 0,
                    'translateX': 0
                },

                'fade': {
                    'defaultScale': 1,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': 0,
                    'translateX': 0
                },

                'fadeslidup': {
                    'defaultScale': 1,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': 50,
                    'translateX': 0
                },

                'fadesliddown': {
                    'defaultScale': 1,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': -50,
                    'translateX': 0
                },


                'fadeslidup_litter': {
                    'defaultScale': 1,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': 20,
                    'translateX': 0
                },

                'fadesliddown_litter': {
                    'defaultScale': 1,
                    'defaultOpacity': 0,
                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': -20,
                    'translateX': 0
                },

                'fadezoomin': {
                    'defaultScale': 0.9,
                    'defaultOpacity': 0,

                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': 0,
                    'translateX': 0
                },

                'fadezoomout': {
                    'defaultScale': 1.1,
                    'defaultOpacity': 0,

                    'duration': 300,
                    'perspective': 0,
                    'rotateX': 0,
                    'translateY': 0,
                    'translateX': 0
                }
            },

            /* ESC 键能关闭的弹框 */
            'escCloseElements': [],

            'keyCode': {
                'esc': 27,
                'enter': 13,
                'shift': 16,
                'ctrl': 18,
                'left': 37,
                'up': 38,
                'right': 39,
                'down': 40,
                'insert': 45,
                'home': 36,
                'pageUp': 33,
                'pageDown': 34,
                'delete': 46,
                'end': 35,
                'tab': 9,
                'backspace': 8
            },

            /* 部分固定类型的页面元素的选择器, 如遮罩, loading, 提示等元素 */
            'pageElementSelector': {
                'overlay': '> .overlay',
                'topCartButton': '.topcart'
            },

            /* 部分固定类型的页面元素的具体实例对象 */
            'pageElements': {},

            'control': {},

            'ajaxType': {
                'get': 'get',
                'post': 'post',
                'put': 'put',
                'delete': 'delete'
            },

            'time': {
                SECOND: 1000,
                MINUTE: 1000 * 60,
                HOUR: 1000 * 60 * 60,
                DAY: 1000 * 60 * 60 * 24
            }
        },

        /**
         * Esc 键取消或关闭弹框
         * @param $elm
         */
        addEscCloseElement: function ($elm) {
            if (-1 == ave40.params.escCloseElements.indexOf($elm)) {
                ave40.params.escCloseElements.push($elm);
            }

            return ave40;
        },

        setCookie: function (name, value, validTime) {
            var Days = 30;

            if (typeof validTime == 'undefined') {
                validTime = Days * 24 * 60 * 60 * 1000;
            }

            var exp = new Date();
            exp.setTime(exp.getTime() + validTime);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
            return ave40;
        },

        getCookie: function (name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
            if (arr = document.cookie.match(reg))
                return unescape(arr[2]);
            else
                return null;
        },

        delCookie: function (name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.getCookie(name);
            if(cval!=null){
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
            }
        },

        getExploreName: function (){
            var userAgent = navigator.userAgent;
            if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1){
                return 'Opera';

            } else if(userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1){
                return 'IE';

            } else if(userAgent.indexOf("Edge") > -1){
                return 'Edge';

            } else if(userAgent.indexOf("Firefox") > -1){
                return 'Firefox';

            } else if(userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1){
                return 'Safari';

            } else if(userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1){
                return 'Chrome';

            } else if(!!window.ActiveXObject || "ActiveXObject" in window){
                return 'IE>=11';

            } else{
                return 'Unkonwn';
            }
        },

        /**
         * 获取页面遮罩层实例
         * @returns {*|HTMLElement}
         */
        getOverlay: function (parent) {
            var $parent = parent ? $(parent) : $('body');
            var $overlay = $parent.find('> .overlay');

            if ($overlay.length == 0) {
                $overlay = $('<div class="overlay"/>');
                $overlay.css({width: $parent.innerWidth(), height: $parent.innerHeight()});
                $parent.append($overlay);
                ave40.params.pageElements.overlay = $overlay;
            }

            if ($parent.length > 0 && $parent.prop('tagName').toLowerCase() != 'body') {
                $overlay.css({'zIndex': 'initial'});
            }

            if(!window.handledResizeOverlay) {
				window.handledResizeOverlay = true;
				$(window).resize(function () {
					ave40.getOverlay().css({
						position: 'fixed',
						left: 0,
						top: 0,
						width: $('body').innerWidth(),
						height: $('body').innerHeight()
					});
				});
			}

            return $overlay;
        },

        showPopupBox: function ($selector) {
            $($selector).showAve40PopupBox(animation);
            return ave40;
        },

        closePopupBox: function ($selector) {
            $($selector).closeAve40PopupBox();
            return ave40;
        },

        showLoading: function (text) {
            var loading = ave40.getLoading(null, null, null, text);

            if(loading[0].showCount) {
                loading[0].showCount ++;
            } else {
                loading[0].showCount = 1;
            }

            loading.showAve40PopupBox();
            return ave40;
        },

        closeLoading: function (callback) {
            var loading = ave40.getLoading(null, null, null, false);
            loading[0].showCount --;

            if(loading[0].showCount <= 0) {
                loading.closeAve40PopupBox(callback);
                loading[0].showCount = 0;
            } else {
                ave40.getOverlay().hideOverlay();
            }



            return ave40;
        },

        showCustomLoading: function (parent, selector, src, text) {
            var $parent = parent ? $(parent) : null;

            if ($parent) {
                if ($parent.css('position') == 'static') {
                    $parent.css('position', 'relative');
                }
            }

            ave40.getLoading(parent, selector, src, text).letHVCenter(parent).animateShow();
            ave40.getOverlay(parent).showOverlay();
            return ave40;
        },

        closeCustomLoading: function (parent, selector, src, text) {
            ave40.getLoading(parent, selector, src, text).animateHide();
            ave40.getOverlay(parent).hideOverlay();
            return ave40;
        },

        getLoading: function (parent, selector,src, text) {
            var $parent = parent ? $(parent) : $('body');
            selector = selector ? selector : '> .ave40-loading';
            // var src = src ? src : '/skin/frontend/default/se105/images/loading/ajax-loader.gif';

            if(false !== text) {
                text = text ? text : '';
                text = (text === 0 || text != '') ? text : '';
            }

            var $ave40Loading = $parent.find(selector);

            if ($ave40Loading.length > 0) {
                var $p = $ave40Loading.find('p');

                if ($p.length <= 0) {
                    $p = $("<p/>");
                    $ave40Loading.append($p);
                }

                if(false !== text) {
                    $p.html(text);
                }


                /*if (src == undefined) {
                    $p.html(text);
                } else {
                    $ave40Loading.find('img').prop(src, newsrc);
                    $p.html(text);
                }*/

                $ave40Loading.find('.ave40_loading_animation').load();
            } else {
                $ave40Loading = $('<div class="ave40-loading" style="display:none;">' +
                    '<style>.ave40-loading{display:inline-block;position:fixed;z-index:10002;color: #dddddd;font-size: 1.1em;text-align: center;}' +
                    ' .ave40-loading p{padding-top:10px;}</style>' +
                    '</div>');
                var $img = $('<div class="ave40_loading_animation"></div>');

                if ($parent.length > 0 && $parent.prop('tagName').toLowerCase() != 'body') {
                    $ave40Loading.css({'position': 'absolute', 'zIndex': 1});
                }

                $img.load(function () {
                    var $p = $(this).parent().find('p');
                    var pwidth = $(this).parent().parent().innerWidth() - 2;
                    var pheight = $(this).parent().parent().innerHeight() - $p.outerHeight() - 2;
                    var w = $(this).width();
                    var h = $(this).height();

                    pwidth = pwidth > 75 ? 75 : pwidth;
                    pheight = pheight > 80 ? 80 : pheight;

                    if (pwidth < w && pheight < h) {
                        if (pwidth < pheight) {
                            $(this).css('width', pwidth);
                        } else {
                            $(this).css('height', pheight);
                        }
                    } else if (pwidth < w) {
                        $(this).css('width', pwidth);
                    } else if (pheight < h) {
                        $(this).css('height', pheight);
                    }

                    $(this).parent().letHVCenter();
                });

                $ave40Loading.append($img);

                if (String(text).length > 0) {
                    var $p = $('<p>' + text + '</p>');
                    $ave40Loading.append($p);
                }

                $parent.append($ave40Loading);
            }

            if (!$ave40Loading.setAlertText) {
                $ave40Loading.setAlertText = (function ($loading) {
                    return function (text) {
                        var $p = $loading.find('p');

                        if ($p.length <= 0) {
                            $p = $('<p/>');
                            $loading.append($p);
                        }

                        $p.html(text);
                        return $loading;
                    }
                })($ave40Loading);
            }

            /*if (!$ave40Loading.setImageSrc) {
                $ave40Loading.setImageSrc = (function ($loading) {
                    return function (src) {
                        $loading.find('img').prop('src', src);
                        return $loading;
                    }
                })($ave40Loading);
            }*/

            return $ave40Loading;
        },

        isMoblie: function () {
            var $bodyOpacity = $('html').css('opacity') ? $('html').css('opacity') : 1 ;
            if ($bodyOpacity < 1) {
                return $bodyOpacity;
            } else {
                return 0;
            }
        },
        translate: function(str) {
            if(ave40.TranslateDictionaries[str] && !ave40.TranslateDictionaries[str].added) {
                Translator.add(str, ave40.TranslateDictionaries[str].word);
            }

            return Translator.translate.apply(null, arguments);
        },

        /**
         * ave40 内置ajax逻辑, 依赖jQuery
         * @param type 请求类型, 如post, get, delete等
         * @param url 请求url
         * @param data 请求数据
         * @param callback 回调
         *    callback函数有两个接收参数, 第一个是响应结果, 第二个是jQuery.ajax原始对象
         *    callback函数中的this变量参数如下:
         *     {
		 * 	 	fail:  布尔变量, 当请求失败时, 为true, 成功时为false
		 * 	 	ok:  布尔变量, 当请求成功时, 为true, 失败时为false
		 * 	 	success:  布尔变量, 当请求成功时, 为true, 失败时为false
		 * 	 	error:  int , otherOptions.ave40Ajax 为true时, 返回ave40参数格式中的错误代码
		 * 	 	scode: 字符串错误代码	 otherOptions.ave40Ajax=true时才有
		 * 	 	message: 错误信息
		 * 	 	data: ave40格式的data数据 otherOptions.ave40Ajax=true时才有
		 * 	 	result: 请求的result otherOptions.ave40Ajax=true时才有
		 * 	 }
         * @param otherOptions 其他参数, 可以覆盖函数参数以及使用jQuery.ajax中的其他参数
         *    此选项中有一个特殊参数, ave40Ajax , 此参数默认为true, 若此参数设置为false,
         *    则不会按照ave40接口的返回值合并到this变量中
         */
        'ajax': function (type, url, data, callback, otherOptions) {
            type = type ? type : ave40.params.ajaxType.get;
            otherOptions = otherOptions ? otherOptions : {};
            var ave40Ajax = otherOptions['ave40Ajax'] == undefined ? true : otherOptions['ave40Ajax'];
            delete otherOptions['ave40Ajax'];

            $.ajax($.extend({
                'type': type,
                'dataType': 'json',
                'url': url,
                'data': data,
                'success': function (result) {
                    if (typeof(callback) == 'function') {
                        var applayThis = {'network_error': false};

                        if (ave40Ajax) {
                            if (result && result.success) {
                                applayThis.fail = false;
                                applayThis.ok = applayThis.success = true;
                            } else {
                                applayThis.fail = true;
                                applayThis.ok = applayThis.success = false;
                            }

                            applayThis.error = applayThis.code = result ? result.error : -1;
                            applayThis.data = result ? result.data : null;
                            applayThis.message = result ? result.message : 'Server Error';
                            applayThis.scode = result ? result.scode : '';
                            applayThis.result = result ? result : null;
                        } else {
                            applayThis.ok = false;
                            applayThis.success = false;
                            applayThis.fail = true;
                        }

                        callback.apply(applayThis, [result, this]);
                    }
                },

                'error': function (xhr, error, message) {
                    if (typeof(callback) == 'function') {
                        var applayThis = {'network_error': true};

                        if (ave40Ajax) {
                            applayThis.fail = true;
                            applayThis.ok = applayThis.success = false;
                            applayThis.error = applayThis.code = -1;
                            applayThis.data = null;
                            applayThis.scode = null;
                            applayThis.result = null;

                            applayThis.message = message ? message : 'Server Error';
                            applayThis.xhr = xhr;
                            applayThis.xhr_error = error;
                        } else {
                            applayThis.ok = false;
                            applayThis.success = false;
                            applayThis.fail = true;
                            applayThis.message = message ? message : 'Server Error';
                            applayThis.xhr = xhr;
                            applayThis.xhr_error = error;
                        }

                        callback.apply(applayThis, [{}, this]);
                    }
                }
            }, otherOptions));
        },

        'ajaxGet': function (url, data, callback, otherOptions) {
            ave40.ajax(ave40.params.ajaxType.get, url, data, callback, otherOptions);
        },

        'ajaxPost': function (url, data, callback, otherOptions) {
            ave40.ajax(ave40.params.ajaxType.post, url, data, callback, otherOptions);
        },

        'ajaxPut': function (url, data, callback, otherOptions) {
            ave40.ajax(ave40.params.ajaxType.put, url, data, callback, otherOptions);
        },

        'ajaxDelete': function (url, data, callback, otherOptions) {
            ave40.ajax(ave40.params.ajaxType['delete'], url, data, callback, otherOptions);
        },

        'goto': function (url) {
            window.location.href = url;
        },

        'gotoCheckoutPage': function () {
            ave40.goto('/onestepcheckout');
        },

        'gotoLoginPage': function () {
            ave40.goto('/customer/account/login');
        },

        'gotoCartPage': function () {
            ave40.goto('/checkout/cart');
        },

        escapeHtml: function (str) {
            var map = {'&': '&amp;', '"': '&quot;', "'": '&apos;', '<': '&lt;', '>': '&gt;'};

            for (var replace in map) {
                if (map.hasOwnProperty(replace)) {
                    str = str.replace(new RegExp(replace, 'g'), map[replace]);
                }
            }

            return str;
        },

        unescapeHtml: function (str) {
            var map = {'&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>'};

            for (var replace in map) {
                if (map.hasOwnProperty(replace)) {
                    str = str.replace(new RegExp(replace, 'g'), map[replace]);
                }
            }

            return str;
        },

        calcLinePointByLine: function (line, percent) {
            return ave40.calcLinePoint(line[0], line[1], percent);
        },

        calcLinePoint: function (pA, pB, percent) {
            if (x(pA) == x(pB)) {
                if (y(pA) <= y(pB)) {
                    return [x(pA), Math.abs(y(pA) - y(pB)) * percent + y(pA)];
                } else {
                    return [x(pA), y(pA) - Math.abs(y(pA) - y(pB)) * percent];
                }
            }

            if (y(pA) == y(pB)) {
                if (x(pA) <= x(pB)) {
                    return [Math.abs(x(pA) - x(pB)) * percent + x(pA), y(pB)];
                } else {
                    return [x(pA) - Math.abs(x(pA) - x(pB)) * percent, y(pB)];
                }
            }

            var px = x(pA) + Math.abs(x(pA) - x(pB)) * percent * (x(pA) >= x(pB) ? -1 : 1);
            var py = ((px - x(pB)) / (x(pA) - x(pB))) * (y(pA) - y(pB)) + y(pB);
            return [px, py];

            function x(point) {
                if (Object.prototype.toString.call(point) === Object.prototype.toString.call([])) {
                    return point[0];
                } else {
                    return point.x;
                }
            }

            function y(point) {
                if (Object.prototype.toString.call(point) === Object.prototype.toString.call([])) {
                    return point[1];
                } else {
                    return point.y;
                }
            }
        },

        bezierLinePoint: function (beginPoint, endPoint, adjustPoints, percent) {
            var points = [beginPoint].concat(adjustPoints);
            points.push(endPoint);

            var line = calcBezierLine(points, percent);
            return ave40.calcLinePointByLine(line, percent);

            /**
             * 计算贝塞尔最后一条向量
             * @param points
             * @param percent
             * @returns {*}
             */
            function calcBezierLine(points, percent) {
                if (points.length <= 2) {
                    return points;
                }

                var newpoints = [];

                for (var i = 0; i < points.length - 1; i++) {
                    newpoints.push(ave40.calcLinePoint(points[i], points[i + 1], percent));
                }

                return calcBezierLine(newpoints, percent);
            }
        }/* bezierLinePoint */
    });
    /* 扩展 ave40 */


    window.Ave40ShoppingCart = {};
    /**
     * 扩展Ave40ShoppingCart
     */
    $.extend(Ave40ShoppingCart, {
        dataAddedAlertText: ['Failed to add!', 'Add successfully!'],

        ///
        /// 添加到购物车
        ///
        add: function (productId, qty, optionParams, callback) {
            var params = optionParams;
            params = !params ? {} : params;

            if (!params.qty) {
                qty = qty == undefined ? 1 : qty;
                params.qty = qty;
            }

            params.product = productId;

            $.ajax({
                url: '/ave40api/shoppingcart/add',
                data: params,
                dataType: 'json',
                type: 'post',

                success: function (result) {
                    if (result.error) {
                        callback && callback.call(null, 0, result);

                    } else {
                        callback && callback.call(null, 1, result);
                    }
                },
                error: function (a, b, c, d) {
                    callback && callback.call(null, 0, a, b, c, d);
                }
            });
        },

        ///
        /// 添加单件商品到购物车
        ///
        addOne: function ($productId, callback, overlay) {
            if (overlay) {
                var callbackFunc = function (ok, result) {
                    ave40.closeLoading();
                    callback && callback(ok, result);
                };

                ave40.showLoading();
            } else {
                callbackFunc = callback;
            }

            Ave40ShoppingCart.add($productId, 1, {}, callbackFunc);
        },

        ///
        /// 添加捆绑商品到购物车
        ///
        addBundleProduct: function (productId, bundleOptions, callback, optionParams) {
            optionParams = !optionParams ? {} : optionParams;

            for (var i in bundleOptions) {
                var k = 'bundle_option[' + i + ']';
                optionParams [k] = [];

                for (var j = 0; j < bundleOptions[i].length; j++) {
                    optionParams [k].push(bundleOptions[i][j]);
                }
            }

            Ave40ShoppingCart.add(productId, 1, optionParams, callback);
        }

    });
    /* 扩展 Ave40ShoppingCart */

    window.Ave40MessageBox = {};
    /**
     * 扩展Ave40MessageBox
     */
    $.extend(Ave40MessageBox, {
        dataAlertType: {
            info: 'mess-info',
            error: 'mess-error',
            warning: 'mess-warning',
            success: 'mess-success'
        },

        dataParams: {
            duration: 400,
            zoom: 1,
            bottom: -60,
            marginBottom: 15,
            right: 15,
            lineHeight: 30,
            beginOpacity: 0.5,
            showCount: 5,
            centerBottom: true,
            windowHeightMeanError: -85,
            autoClose: 2000
        },

        dataMessageStack: [],

        _createMessageBox: function (type, text, options) {
            options = options ? options : {};
            type = type ? type : Ave40MessageBox.dataAlertType.info;
            var $messageBox = $('<div class="ave40-message-box boxhover ' + type + '"><span class="ave40Mess-icon"></span><div></div><i class="close">×</i></div>');
            var $content = $messageBox.find('div');
            var $close = $messageBox.find('i');

            var alertText = text;

            if (Object.prototype.toString.call(text) == '[object Array]') {
                alertText = text.join("\n");
            }

            $content.html(alertText);
            $messageBox.prop('title', alertText);
            // $content.css('height', Ave40MessageBox.dataParams.height + 'px');
            $content.css('lineHeight', Ave40MessageBox.dataParams.lineHeight + 'px');

            $close.click(function () {
                $messageBox.closeAve40PopupBox(function () {
                    $messageBox.remove();
                });
                // var $parent = $(this).parent();
                // var right = $parent.outerHeight() + Ave40MessageBox.dataParams.right + 45;
                // $parent.removeClass('boxhover').stop().animate({
                // 	opacity: 0,
                // 	right: (-right) + 'px'
                // }, Ave40MessageBox.dataParams.duration, null, function () {
                // 	$(this).remove();
                // });
                //
                // var index = $parent.prop('ave40MessageIndex');
                // Ave40MessageBox.dataMessageStack.splice(index, 1);
                // Ave40MessageBox._reindexMessageBox();
                // Ave40MessageBox._adjustOldMessageBoxPosition();
            });

            if (options.autoClose !== false) {
                ~function (options, defParams) {
                    var closeWaitingSecond = 0;

                    options.autoClose = typeof options.autoClose == 'undefined' ? defParams.autoClose : options.autoClose;

                    if ((!options.autoClose) || options.autoClose === true) {
                        closeWaitingSecond = defParams.autoCloseDuration ? defParams.autoCloseDuration : 2000;
                    } else {
                        closeWaitingSecond = options.autoClose;
                    }

                    if (!closeWaitingSecond) {
                        return;
                    }

                    $close.parent().on('mouseover', function () {
                        if ($close.prop('closeTimer')) {
                            clearTimeout($close.prop('closeTimer'));
                        }
                    }).on('mouseout', function () {
                        if ($close.prop('closeTimer')) {
                            clearTimeout($close.prop('closeTimer'));
                        }

                        var timer = setTimeout((function ($close) {
                            return function () {
                                $close.click();
                            }
                        })($close), closeWaitingSecond);
                        $close.prop('closeTimer', timer);
                    }).mouseout();
                }(options, Ave40MessageBox.dataParams);
            }


            $('body').append($messageBox);
            return $messageBox;
        },

        _reindexMessageBox: function () {
            var data = Ave40MessageBox.dataMessageStack;

            for (var i = 0; i < data.length; i++) {
                data[i].prop('ave40MessageIndex', i);
            }
        },

        _calcHeight: function (count) {
            var data = Ave40MessageBox.dataMessageStack;
            var height = 0;

            for (var i = data.length - 1; i >= 0 && i >= data.length - count; i--) {
                height += data[i].outerHeight();
            }

            return height;
        },

        _adjustOldMessageBoxPosition: function (isAddingToPanel) {
            var data = Ave40MessageBox.dataMessageStack;

            if (data.length <= 0) {
                return;
            }
            var pshowCount = Ave40MessageBox.dataParams.showCount;
            // var pheight = Ave40MessageBox.dataParams.lineHeight;
            var pbottom = Ave40MessageBox.dataParams.bottom;
            var pmarginBottom = Ave40MessageBox.dataParams.marginBottom;
            var pbeginOpacity = Ave40MessageBox.dataParams.beginOpacity;

            var bottom = bottom < 0 ? 0 : pbottom;

            if (Ave40MessageBox.dataParams.centerBottom) {
                bottom += 0.5 * ($(window).height() + Ave40MessageBox.dataParams.windowHeightMeanError - (Ave40MessageBox._calcHeight(pshowCount) + pmarginBottom * pshowCount))
            }

            bottom = bottom < 0 ? 0 : bottom

            var newbox = data[data.length - 1];
            var lastHeight = data[data.length - 1].outerHeight();//pheight;//Ave40MessageBox.dataParams.zoom;
            var lastBottom = bottom;
            var nextbottom = lastBottom + lastHeight + pmarginBottom;
            var animateParams = {
                opacity: 1,
                right: Ave40MessageBox.dataParams.right
            };

            if (isAddingToPanel) {
                newbox.css('bottom', lastBottom + 'px');
            } else {
                animateParams.bottom = lastBottom + 'px';
            }

            newbox.show().stop().animate(animateParams, Ave40MessageBox.dataParams.duration);
            var count = 0;

            for (var i = data.length - 2; i >= 0; i--) {
                count++;
                var right = Ave40MessageBox.dataParams.right;
                var opacity = pbeginOpacity - count * (1 - pbeginOpacity) / pshowCount;
                var callback = null;
                var css = {opacity: opacity, right: right + 'px', bottom: nextbottom + 'px'};

                if (opacity == 0) {
                    callback = function () {
                        $(this).hide();
                    };
                }

                data[i].show().stop().animate(css, Ave40MessageBox.dataParams.duration, null, callback);

                nextbottom = nextbottom + data[i].outerHeight() + pmarginBottom;
            }
        },

        _alert: function (text, type, options) {
            type = type ? type : Ave40MessageBox.dataAlertType.info;
            var $message = Ave40MessageBox._createMessageBox(type, text, options);
            $message.showAve40PopupBox('fade');
            // $message.css({bottom: (-$message.outerHeight()) + 'px', right: (-$message.outerWidth()) + 'px'});
            // Ave40MessageBox.dataMessageStack.push($message);
            // Ave40MessageBox._reindexMessageBox();
            // Ave40MessageBox._adjustOldMessageBoxPosition(true);
            return Ave40MessageBox;
        },

        alert: function (text, options) {
            Ave40MessageBox._alert(text, null, options);
            return Ave40MessageBox;
        },

        alertError: function (text, options) {
            Ave40MessageBox._alert(text, Ave40MessageBox.dataAlertType.error, options);
            return Ave40MessageBox;
        },

        alertSuccess: function (text, options) {
            Ave40MessageBox._alert(text, Ave40MessageBox.dataAlertType.success, options);
            return Ave40MessageBox;
        },

        alertWarning: function (text, options) {
            Ave40MessageBox._alert(text, Ave40MessageBox.dataAlertType.warning, options);
            return Ave40MessageBox;
        }
    });


    /**
     * 扩展 Ave40_ads
     */
    window.Ave40_ads = {};

    window.Ave40_ads = (function () {
        var ave40ads = function () {
            this.params = {
                showFullAds: {
                    /* cookie 持续时间 单位:天 */
                    cookieDuration: 15,
                    /* cookie 倒计时秒数 单位:秒 */
                    cookieCountDownTime: 30,
                    /*弹窗的类名*/
                    fullImgClass: '.giveaway-ad-popup'
                }
            };

            this.data = {
                timer: {
                    fullImgTop30: 0
                }
            };
        };

        $.extend(ave40ads.prototype, {

            /**
             * 30秒倒计时弹窗广告
             */

            beginCountDownFullImg: function () {
                var _this = this;
                if (!ave40.getCookie('full_img_poped')) {
                    this.data.timer.fullImgTop30 = setInterval(function () {
                        _this.showCountDownFullImg()
                    }, 1000);
                }
            },

            showCountDownFullImg: function (options) {
                var calcOptions = $.extend({}, this.params.showFullAds, options);

                if (!ave40.getCookie('full_img_poped')) {
                    if (ave40.getCookie('full_img_pop_start')) {
                        if (!ave40.getCookie('full_img_pop_30')) {
                            $(calcOptions.fullImgClass).showAve40PopupBox();
                            if (this.data.timer.fullImgTop30) {
                                clearInterval(this.data.timer.fullImgTop30);
                                this.data.timer.fullImgTop30 = null;
                            }
                        }
                    } else {
                        ave40.setCookie('full_img_pop_30', 1, calcOptions.cookieCountDownTime * ave40.params.time.SECOND);
                        ave40.setCookie('full_img_pop_start', 1, calcOptions.cookieDuration * ave40.params.time.DAY);
                    }
                }
            },

            hideCountDownFullImg: function () {
                $(this.params.showFullAds.fullImgClass).closeAve40PopupBox();
            }
        });

        return new ave40ads();
    })();

    /**
     * 扩展 Ave40_notification
     */
    window.Ave40_notification = {};
    window.Ave40_notification = (function () {
        var ave40Notification = function () {
            this.data ={
                flag: true,
                notificationTimer:0

            }

        };

        $.extend(ave40Notification.prototype, {
            isNotificationSupported: 'Notification' in window,
            isPermissionGranted: function() {
                return Notification.permission === 'granted';
            },
            requestPermission: function() {
                var _this = this;
                if (!this.isNotificationSupported) {
                    return;
                }

                Notification.requestPermission(function(status) {
                    console.log('status: ' + status);
                    var permission = Notification.permission;
                    //default 用户没有接收或拒绝授权 不能显示通知
                    //granted 用户接受授权 允许显示通知
                    //denied  用户拒绝授权 不允许显示通知

                    if (permission === "granted"){
                        $.ajax({
                            url: '/ave40api/message/checkUnreadMessage',
                            dataType: 'json',
                            type: 'post',
                            success: function (result) {
                                if (result.data){
                                    ave40.setCookie('unreadMessage',JSON.stringify(result.data));
                                }

                                setTimeout(function () {
                                    _this.showNotification()
                                },5000);

                                if (_this.data.flag) {
                                    _this.data.flag = false;
                                    _this.data.notificationTimer = setInterval(function () {
                                        _this.showNotification()
                                    },30000)
                                }
                            },
                            error: function () {

                            }
                        });
                    }
                });


            },

            showNotification: function() {
                var _this = this;

                if (!this.isNotificationSupported) {
                    return;
                }

                if (!this.isPermissionGranted()) {
                    this.requestPermission();
                    return;
                }

                // 未读消息cookies
                var unreadMessage = ave40.getCookie('unreadMessage');
                var unreadMessageCookies = JSON.parse(unreadMessage);

                if ( !unreadMessageCookies || unreadMessageCookies.length < 1){
                    if (this.data.notificationTimer){
                        clearInterval(this.data.notificationTimer);
                        this.data.notificationTimer = null;
                    }
                    return;
                }

                // var notificationTimer = setInterval(function () {
                jQuery.ajax({
                    url: '/ave40api/message/pushMessage',
                    data: {"unreadMessage" : unreadMessageCookies[0] },
                    dataType: 'json',
                    type: 'post',
                    success: function (result) {
                        var readedMessageArray = ave40.getCookie('readedMessage') ? JSON.parse(ave40.getCookie('readedMessage')) : [];
                        readedMessageArray.push(unreadMessageCookies[0]);
                        unreadMessageCookies.splice(0,1);
                        ave40.setCookie('readedMessage',JSON.stringify(readedMessageArray));
                        ave40.setCookie('unreadMessage',JSON.stringify(unreadMessageCookies));

                        _this.pushNotification(result.data[0]);
                    },
                    error: function () {

                    }
                });
                // },5000);

            },

            pushNotification:function (data) {
                var n_icon = "/skin/frontend/default/se105/images/v2/logo_notice.jpg";

                if (ave40.getExploreName() == 'Firefox' ){
                    n_icon = data.logo;
                }

                var n = new Notification(data.title, {
                    icon : n_icon,
                    body : data.content,
                    requireInteraction: true,
                    image:data.image,
                    data:data.url
                });

                n.onclick = function() {
                    window.open(n.data);
                    n.close();
                };

            }
        });

        return new ave40Notification();
    })();

    $(function () {
        /**
         *  Ave40_notification
         */
        Ave40_notification.requestPermission();
    });


    $(function () {
        $(window).on('resize', function () {
            if (!Ave40MessageBox.dataParams.centerBottom) {
                return;
            }

            if (Ave40MessageBox.dataResizeTimer) {
                clearTimeout(Ave40MessageBox.dataResizeTimer);
                Ave40MessageBox.dataResizeTimer = null;
            }

            Ave40MessageBox.dataResizeTimer = setTimeout(Ave40MessageBox._adjustOldMessageBoxPosition, 300);
        });
    });

    /* ave40 其他初始化 */
    $(function () {
        //添加默认的ESC关闭弹出层
        ave40.addEscCloseElement('.esc-pop');

        //按键事件绑定
        $(window).keydown(function (e) {
            if (e.keyCode != ave40.params.keyCode.esc) {
                return;
            }

            for (var i = 0; i < ave40.params.escCloseElements.length; i++) {
                var elm = ave40.params.escCloseElements[i];
                $(elm).animateHideWithOverlay();
            }
        });

        //购物车动画效果重置
        $(ave40.params.pageElementSelector.topCartButton).on('animationend', function () {
            $(this).removeClass('cartIconShanke');
        });
    });

    /**
     * jQuery的功能扩展
     */
    $.fn.extend({
        /**
         * 以动画效果弹出或显示某层
         * @param duration
         * @param callback
         * @param animation
         */
        animateShow: function (duration, callback, animation) {
            animation = animation ? animation : 'default';
            var animationOption = Object.prototype.toString.call(animation) == '[object String]' ? ave40.params.animateShow[animation] : animation;
            if (!animationOption) {
                animationOption = ave40.params.animateShow['default'];
            }

            duration = duration ? duration : ave40.params.animateShow.duration;
            var $this = $(this);
            $this.prop('ave40_animation', animation);

            $this.show();

            var defaultScale = animationOption.defaultScale;
            var defaultOpacity = animationOption.defaultOpacity;
            var perspective = animationOption.perspective;
            var defaultTranslateY = animationOption.calcTranslateY ? -$this.outerHeight() * (defaultScale - 1) / 2 : animationOption.translateY;

            $this.css('opacity', defaultOpacity).css('transform', 'perspective(' + perspective + 'px) ' +
                'rotateX(' + animationOption.rotateX + 'deg) ' +
                'translateY(' + defaultTranslateY + 'px)');

            $this.stop().animate({animateUnit: 1000}, {
                step: function (now) {
                    var percent = now / 1000;
                    var deg = animationOption.rotateX * (1 - percent);
                    var translateY = defaultTranslateY * (1 - percent);
                    var translateX = animationOption.translateX * (1 - percent);
                    var scale = defaultScale + percent * (1 - defaultScale);

                    jQuery(this).css('opacity', (defaultOpacity + (percent * (1 - defaultOpacity))));
                    jQuery(this).css('transform', 'perspective(' + perspective + 'px) ' +
                        'scale(' + scale + ') ' +
                        'rotateX(' + deg + 'deg) ' +
                        'translate(' + translateX + 'px, ' + translateY + 'px) ');
                },
                duration: duration,
                complete: callback
            });
        },

        /**
         * 以动画效果弹出或显示某层, 并带上遮罩层
         * @param duration
         * @param callback
         * @param $overlay
         */
        animateShowWithOverlay: function (duration, callback, $overlay, animation) {
            $overlay = $overlay ? $overlay : true;

            if ($overlay) {
                if ($overlay === true) {
                    $overlay = ave40.getOverlay();
                }
            }

            $(this).animateShow(duration, callback, animation);

            if ($overlay) {
                $overlay.showOverlay();
            }
        },

        /**
         * 让某个块在元素中居中
         */
        letHVCenter: function () {
            var display = $(this).css('display');
            var visibility = $(this).css('visibility');

            $(this).css({
                'diplay': 'block', 'visibility': 'hidden'
            })
                .css({
                    'left': '50%',
                    'top': '50%',
                    'marginTop': (-$(this).outerHeight() / 2) + 'px',
                    'marginLeft': (-$(this).outerWidth() / 2) + 'px'
                })
                .css({
                    'display': display,
                    'visibility': visibility
                });

            return this;
        },

        /**
         * 以弹出框形式出现
         */
        showAve40PopupBox: function (animation, callback, options) {
            options = $.extend({
                noCenter: false
            }, options);
            animation = animation ? animation : 'fadezoomout';
            $(this).show();

            if (!options.noCenter) {
                $(this).letHVCenter();
            }

            $(this).animateShowWithOverlay(null, callback, null, animation);
            return this;
        },

        /**
         * 以弹出框形式关闭
         */
        closeAve40PopupBox: function (callback) {
            $(this).animateHideWithOverlay(null, callback);
            return this;
        },

        /**
         *  倒计时
         *  data-now:现在时间
         *  data-end:结束时间
         *  data-start:开始时间
         *  timeSeparator:[day,hour,min,sec]
         */
        ave40CountDown: function (timeSeparator) {
            var timeSeparator = (typeof timeSeparator === "object") ? timeSeparator  : [':',':',':',''];
             for (var i = 0; i < $(this).length; i++) {
                var $this = $(this).eq(i);
                var countDownNowTime = new Date($this.data('now')).getTime();
                var countDownEndTime = new Date($this.data('end')).getTime();
                var countDownStartTime = new Date($this.data('start')).getTime();

                /**
                 *   距离开始的时间,data-start
                 *   && countDownStartTime >= countDownNowTime
                 */
                 if (countDownStartTime && countDownNowTime ){
                     var startStamp = (countDownStartTime - countDownNowTime) / 1000;
                     $this.countDownCalc(timeSeparator,startStamp);
                 }

                 /**
                  *   距离结束的时间,data-end
                  *   && countDownStartTime <= countDownNowTime
                  */
                 if (countDownEndTime && countDownNowTime ){
                     var endStamp = (countDownEndTime - countDownNowTime) / 1000;
                     $this.countDownCalc(timeSeparator,endStamp);
                 }

             }
        },

        countDownCalc:function (timeSeparator,stamp ) {
            var $this = $(this);
            var timer = setInterval(function () {
                if (stamp > 0) {
                    stamp -= 1;
                    var day = Math.floor((stamp / 3600) / 24);
                    var hour = Math.floor((stamp / 3600) % 24);
                    var minute = Math.floor((stamp / 60) % 60);
                    var second = Math.floor(stamp % 60);

                    day = (day > 9 ? day : (day > 0 ? ('0' + day ) : ''));
                    hour = (hour > 9 ? hour : '0' + hour);
                    minute = (minute > 9 ? minute : '0' + minute);
                    second = (second > 9 ? second : '0' + second);

                    var day_html =  '<span class="t_day">' + day + '</span><i>'+ timeSeparator[0] +'&nbsp;</i>';
                    var hour_html = '<span class="t_hour">' + hour + '</span><i>'+ timeSeparator[1] +'&nbsp;</i>';
                    var min_html = '<span class="t_min">' + minute + '</span><i>'+ timeSeparator[2] +'&nbsp;</i>';
                    var sec_html = '<span class="t_sec">' + second + '</span><i>'+ timeSeparator[3] +'&nbsp;</i>';

                    if (day <= 0){
                         day_html = '';
                    }

                    $this.html(day_html + hour_html + min_html + sec_html);
                } else {
                    clearInterval(timer);
                }
            }, 1000);
        },


        /**
         * 以动画效果关闭或隐藏某层
         * @param duration
         * @param callback
         */
        animateHide: function (duration, callback) {
            duration = duration ? duration : ave40.params.animateShow.duration;
            var $this = $(this);
            var animation = $this.prop('ave40_animation');
            var animationOption = Object.prototype.toString.call(animation) == '[object String]' ? ave40.params.animateShow[animation] : animation;
            if (!animationOption) {
                animationOption = ave40.params.animateShow['default'];
            }

            var defaultScale = animationOption.defaultScale;
            var defaultOpacity = animationOption.defaultOpacity;
            var perspective = animationOption.perspective;
            var defaultTranslateY = animationOption.calcTranslateY ? -$this.outerHeight() * (defaultScale - 1) / 2 : animationOption.translateY;

            $this.stop().show().animate({animateUnit: 0}, {
                step: function (now) {
                    var percent = now / 1000;
                    var deg = animationOption.rotateX * (1 - percent);
                    // var translateY = animationOption.translateY*(1-percent);
                    var translateY = defaultTranslateY * (1 - percent);
                    var translateX = animationOption.translateX * (1 - percent);
                    var scale = defaultScale + percent * (1 - defaultScale);

                    jQuery(this).css('opacity', (defaultOpacity + (percent * (1 - defaultOpacity))));
                    jQuery(this).css('transform', 'perspective(' + perspective + 'px) ' +
                        'scale(' + scale + ') ' +
                        'rotateX(' + deg + 'deg) ' +
                        'translate(' + translateX + 'px, ' + translateY + 'px) ');
                },
                duration: duration,
                complete: function () {
                    $this.hide();
                    callback && callback.call(this);
                }
            });
        },

        /**
         * 以动画效果关闭或隐藏某层, 并关闭此元素打开的overlay
         * @param duration
         * @param callback
         * @param $overlay
         */
        animateHideWithOverlay: function (duration, callback, $overlay) {
            $overlay = $overlay == undefined ? true : $overlay;

            if ($overlay) {
                if ($overlay === true) {
                    $overlay = ave40.getOverlay();
                }
            }

            $(this).animateHide(duration, callback);

            if ($overlay) {
                $overlay.hideOverlay();
            }
        },

        /**
         * 以overlay显示
         * @param duration
         * @returns {*|HTMLElement}
         */
        showOverlay: function (duration) {
            var $overlay = $(this);
            duration = duration == undefined ? ave40.params.animateShow.duration : duration;

            if ($overlay.prop('overlayIndex') > 0) {
                $overlay.prop('overlayIndex', $overlay.prop('overlayIndex') + 1);
                return $overlay;
            } else {
                $overlay.prop('overlayIndex', 1);
                $overlay.css({'opacity': 0}).show();
                resizeOverlay($overlay);
                $overlay.stop().animate({opacity: 0.4}, duration);
            }

        },

        /**
         * 元素以overlay形式隐藏
         * @param duration
         */
        hideOverlay: function (duration) {
            var $overlay = $(this);
            $overlay.prop('overlayIndex', $overlay.prop('overlayIndex') - 1);

            duration = duration == undefined ? ave40.params.animateShow.duration : duration;

            if ($overlay.prop('overlayIndex') > 0) {
                return;
            }

            $overlay.stop().animate({opacity: 0}, duration, null, function () {
                $overlay.hide();
            });
        },

        /**
         * 进入忙碌模式
         */
        inBusying: function () {
            $(this).prop('busying', 1).addClass('busying').attr('busying', 1);
        },

        /**
         * 如果当前为非忙碌模式则进入, 否则返回是否处于忙碌模式
         * @returns {boolean}
         */
        getAndInBusying: function () {
            if ($(this).isBusying()) {
                return true;
            } else {
                $(this).inBusying();
                return false;
            }
        },

        /**
         * 退出忙碌模式
         */
        outBusying: function () {
            $(this).prop('busying', 0).removeClass('busying').removeAttr('busying');
        },

        /**
         * 是否忙碌中
         */
        isBusying: function () {
            return $(this).prop('busying');
        }
    });


}(jQuery);



/**
 * 添加到购物车的动画效果
 */
function ave40JoinToCartAnimation(callback, $image) {
    var cart = jQuery('.topcart');
    var imgtodrag = $image ? $image : jQuery(this).closest('.item').find("img").eq(0);

    if (imgtodrag) {
        var width = 150;
        var height = 150;
        var targetWidth = 35;
        var targetHeight = 35;

        var beginPoint = [imgtodrag.offset().left, imgtodrag.offset().top];
        var endPoint = [cart.offset().left + 15, cart.offset().top + 10];
        var centerPoint = ave40.calcLinePointByLine([beginPoint, endPoint], 0.5);
        var adjustX = centerPoint[0] / 6;
        adjustX = adjustX < 50 ? 50 : adjustX;
        adjustX = adjustX > 250 ? 250 : adjustX;

        var bezierAdjustPonits = [[centerPoint[0] + adjustX, beginPoint[1]]];

        var imgclone = imgtodrag.clone()
            .offset({
                top: beginPoint[1],
                left: beginPoint[0]
            })
            .css({
                'opacity': '0.7',
                'position': 'absolute',
                'height': height,
                'width': width,
                'z-index': '9999'
            })
            .appendTo(jQuery('body'))
            .animate({animateUnit: 1000}, {
                step: function (now) {
                    // console.log(now);
                    var percent = now / 1000;
                    var currentWidth = width - (width - targetWidth) * percent;
                    var currentHeight = height - (height - targetHeight) * percent;

                    var currentPoint = ave40.bezierLinePoint(beginPoint, endPoint, bezierAdjustPonits, percent);
                    jQuery(this).css({
                        left: currentPoint[0],
                        top: currentPoint[1],
                        width: currentWidth,
                        height: currentHeight
                    });
                },
                duration: 800,
                easing: 'easeOutSine'
            });

        imgclone.animate({
            'width': 10,
            'height': 10,
            'opacity': 0
        }, 300, null, function () {
            //	飞入效果完成, 购物车图标进行抖动
            cart.addClass('cartIconShanke');
            callback && callback();
            jQuery(this).detach();
        });
    }
}

/**
 * 更新顶部购物车的信息(数量, 列表, 价格等)
 * @param result
 */
function updateTopCartInfo(result) {
    if (result.data) {
        ~function ($) {
            $(ave40.params.pageElementSelector.topCartButton)
                .find('.car_count').html(result.data.total_count);

            var $cartContainer = $('.head-cart-product-list');
            var $container = $cartContainer;

            if ($cartContainer.find('.mCSB_container').length > 0) {
                $container = $container.find('.mCSB_container');
            }

            if (result.data.list_html) {
                $container.html(result.data.list_html);
                $cartContainer.mCustomScrollbar("update");
            }

            $('.topcart .head-cart-product-item-num').html(result.data.item_count);
            $('.topcart  .cart-total-price').html(result.data.total_price);
        }(jQuery);
    }
}

function removeToWishListAnimation() {
    var $this = jQuery(this);
    var $thisCopy = jQuery($this[0].outerHTML);
    var height = $this.outerHeight();
    $thisCopy.css({'position': 'relative', 'top': '-' + height + 'px', 'opacity': 1});
    $this.parent().append($thisCopy);

    $thisCopy.animate({textIndent: 100}, {
        step: function (now, fx) {
            jQuery(this).css('transform', "scale(" + (1 + now / 100 * 2) + ")");
            jQuery(this).css('opacity', (1 - now / 100));
        },
        duration: 300,
        complete: function () {
            $thisCopy.remove();
        }
    });
}

function addToWishListAnimation() {
    var $this = jQuery(this);
    var $thisCopy = jQuery($this[0].outerHTML);
    var height = $this.outerHeight();
    $thisCopy.css({'position': 'relative', 'top': '-' + height + 'px', 'opacity': 0});
    $thisCopy.css('transform', 'scale(2)');
    $this.parent().append($thisCopy);

    $thisCopy.animate({textIndent: 100}, {
        step: function (now, fx) {
            jQuery(this).css('transform', "scale(" + (3 - now / 100 * 2) + ")");
            jQuery(this).css('opacity', (now / 100));
        },
        duration: 300,
        complete: function () {
            $thisCopy.remove();
        }
    });
}


/**
 * 窗口移动时候的调整任务
 */
jQuery(window).resize(function () {
    resizeOverlay();

    var deviceWidth = document.documentElement.clientWidth;
    if (deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
});


/**
 *  移动端动态设置rem
 */

var deviceWidth = document.documentElement.clientWidth;
if (deviceWidth > 750) deviceWidth = 750;

document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';


/**
 * 页面元素初始化
 */

~function ($) {
    $(function () {


        /**
         * 图片懒加载
         *
         */
        $.fn.lazyload && $('img.lazy').lazyload({
            skip_invisible: false,
            failure_limit: 1000,
            effect: "show",
            threshold: 200
        });





        /**
         * 商品列表的心愿单添加和移除按钮事件绑定
         */
        $('.wish-list-toggle').click(function () {
            var $this = $(this);

            if ($this.prop('ave40_toggle_active')) {
                $this.prop('ave40_toggle_active', 0);

                if (!$this.parent('a').data('itemId')) {
                    return;
                }


                var collecDelUrl = $this.parent('a').attr('del_url');

                $.ajax({
                    url: collecDelUrl + $this.parent('a').data('itemId'),
                    data: {ajax: 1},
                    success: function (result) {
                        if (result.success) {
                            removeToWishListAnimation.call($this);
                            $this.removeClass('active');
                        } else {
                            Ave40MessageBox.alertError(result.message, {autoClose: 2000});
                        }

                        $this.outBusying();
                    },

                    error: function () {
                        Ave40MessageBox.alertError('Remove failed!');
                        $this.outBusying();
                    }
                });
            } else {
                // if ($this.getAndInBusying()) {
                // 	return;
                // }
                $this.prop('ave40_toggle_active', 1);
                var collecAddUrl = $this.parent('a').attr('add_url');

                jQuery.ajax({
                    url: collecAddUrl,
                    data: {ajax: 1},
                    success: function (result) {
                        $this.outBusying();

                        if (result.success) {
                            /*Ave40MessageBox.alertSuccess('Join the wish list success')*/
                            $this.parent('a').data('itemId', result.data.item_id);
                            addToWishListAnimation.call($this);
                            $this.addClass('active');
                        } else {
                            alert(result.message);
                        }
                    },

                    error: function () {
                        alert('Add failed!');
                        $this.outBusying();
                    }
                });
            }
        });

        /**
         * 商品列表添加到购物车按钮事件
         */
        $('.join-cart-btn').click(function () {
            var $elm = $(this);

            if ($elm.isBusying()) {
                return;
            }

            $elm.inBusying();

            Ave40ShoppingCart.addOne($elm.data('id'), function (ok, result) {
                $elm.outBusying();

                if (ok) {
                    ave40JoinToCartAnimation.call($elm, function () {
                        updateTopCartInfo(result)
                    });
                } else {
                    if (result.message) {
                        Ave40MessageBox.alertError(result.message, {autoClose: 2000});
                    } else {
                        Ave40MessageBox.alertError(Ave40ShoppingCart.dataAddedAlertText[ok]);
                    }
                }
            });
        });
    });

}(jQuery);

function getLimiterValue(str, limiter) {
    if (isArray(limiter) && limiter.length > 1) {
        for (var i = 1; i < limiter.length; i++) {
            str.replace(new RegExp('/' + limiter[i] + '/g'), limiter[i]);
        }

        limiter = limiter[0];
    } else {
        limiter = (limiter == undefined || limiter == '') ? ';' : limiter;
    }

    var strAry = str.split(limiter);
    var values = {};

    for (var i = 0; i < strAry.length; i++) {
        var exp = trim(strAry[i]);

        if (exp == '') {
            continue;
        }

        var pos = exp.indexOf('=');
        var k = '';
        var v = null;

        if (pos == -1) {
            k = exp;
        } else {
            k = exp.substr(0, pos);
            v = exp.substr(pos + 1);
        }

        values[trim(k)] = trim(v);
    }

    return values;
}

function trim(str) {
    str = str.replace(/^\s+/, '');
    return str.replace(/\s+$/, '');
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) == '[object Array]';
}


/**
 * 首页品牌轮播、产品详情页关联产品轮播、空购物车猜你喜欢商品轮播 公共函数
 */

~function ($) {
    window.multipleProductCarousl = (function (options) {
        var self = this;
        window.xxxx = self;
        //实例配置
        this._config = {
            parentSelector: null,
            autoplay: 5000,
            elmSelector: null,
            pageWidth: 184,
            isLoop: true,
            prevBtnSelector: '.swiper-button-prev',
            nextBtnSelector: '.swiper-button-next',
            slidesPerColum: 1,
            spaceBetween: 0,
            slidesPerView : 6,
            breakpoints:{}
        };

        //实例运行数据
        this._data = {};

        //实例初始化
        this._init = function () {
            if (this._inited) {
                return;
            }

            this._inited = true;

            options = $.extend({}, this._config, options);

            if (this.getElement().length < 1) {
                return;
            }

            this._initSwiper();
            return this;
        };

        // 获取elmSelector的JQ对象转化为JS对象
        this.getElement = function () {
            if (!this._data.elm) {
                this._data.elm = $(options.elmSelector);

                this._data.elm.getDOM = function () {
                    return self._data.elm[0];
                }
            }

            return this._data.elm;
        };

        //获取父元素parentSelector
        this.getParentElement = function () {
            if (!this._data.pelm) {
                this._data.pelm = $(options.parentSelector);

                this._data.pelm.getDOM = function () {
                    return self._data.elm[0];
                }
            }

            return this._data.elm;
        };

        //计算轮播显示数量
        this.calcSliderCount = function () {
            return Math.floor((this.getElement().width()) / options.pageWidth);
        };

        //获取swiper
        this.getSwiper = function () {
            return this._data.swiper;
        };

        //初始化swiper
        this._initSwiper = function () {
            var _this = this;
            if (!this._data.swiper) {
                // var sliderCount = this.calcSliderCount();
                this._data.swiper = new Swiper(this.getElement().getDOM(), {
                    grabCursor: true,
                    paginationClickable: true,
                    autoplay: options.autoplay,
                    loop: options.isLoop,
                    slidesPerView: options.slidesPerView,
                    slidesPerGroup: options.slidesPerGroup,
                    slidesPerColumn : options.slidesPerColumn,
                    autoplayDisableOnInteraction: false,
                    nextButton: options.nextBtnSelector,
                    prevButton: options.prevBtnSelector,
                    spaceBetween: options.spaceBetween,
                    breakpoints:options.breakpoints
                });

                var swiper = this._data.swiper;

                this.getParentElement().mouseenter(function () {
                    self.getSwiper().stopAutoplay();
                });
                this.getParentElement().mouseleave(function () {
                    self.getSwiper().startAutoplay();
                });

                this.getElement().getDOM().swiperInstance = swiper;


                /*this.getParentElement().find(params.prevClass).on('click', function (e) {
                    e.preventDefault();
                    self.getSwiper().swipePrev();
                });
                this.getParentElement().find(params.nextClass).on('click', function (e) {
                    e.preventDefault();
                    self.getSwiper().swipeNext();
                });*/

                /*$(window).resize(function () {
                    var rzSliderCount = self.calcSliderCount();
                    self.getSwiper().slidesPerView = rzSliderCount;
                    self.getSwiper().slidesPerGroup = rzSliderCount;
                    self.getSwiper().reLoop();
                });*/
            }

            return this._data.swiper;
        };

        this._init();
    });
}(jQuery);


(function ($) {
    $(function () {
        //请求权限



        /* ------------- 本地测试js----------- */
        /*var testNotificationTimer;
        var status = true;
        jQuery.ajax({
            url: '/ave40api/message/checkUnreadMessage',
            dataType: 'json',
            type: 'post',
            success: function (result) {
                console.log(result);
                if (result.data){
                    ave40.setCookie('unreadMessage',JSON.stringify(result.data));
                }

                testShowNotification();
                if (status) {
                    status= false;
                    testNotificationTimer = setInterval(testShowNotification,10000);
                }
            },
            error: function () {

            }
        });

        function testShowNotification(){

            var unreadMessage = ave40.getCookie('unreadMessage');
            var unreadMessageCookies = JSON.parse(unreadMessage);

            if ( !unreadMessageCookies || unreadMessageCookies.length < 1){
                if (testNotificationTimer){
                    clearInterval(testNotificationTimer);
                }
                return;
            }

            jQuery.ajax({
                url: '/ave40api/message/pushMessage',
                data: {"unreadMessage" : unreadMessageCookies[0] },
                dataType: 'json',
                type: 'post',
                success: function (result) {
                    var readedMessageArray = ave40.getCookie('readedMessage') ? JSON.parse(ave40.getCookie('readedMessage')) : [];
                    readedMessageArray.push(unreadMessageCookies[0]);
                    unreadMessageCookies.splice(0,1);
                    ave40.setCookie('readedMessage',JSON.stringify(readedMessageArray));
                    ave40.setCookie('unreadMessage',JSON.stringify(unreadMessageCookies));

                    pushMessage(result.data);
                },
                error: function () {

                }
            });
        }

        function pushMessage (data){
            console.log(data[0].image);
        }*/

    })
})(jQuery);


~function ($) {
    /*window.resize 时遮罩层大小bug解决*/
    $(window).resize(function () {
        ave40.getOverlay().css({
            position: 'fixed',
            left: 0,
            top: 0,
            width: $('body').innerWidth(),
            height: $('body').innerHeight()
        });
    });

    /**
     * 滚动超过一定值时出现回到顶部
     */
    $(window).scroll(function() {
        if($(this).scrollTop() > 100) {
            $(".gotoTop").fadeIn()
        } else {
            $(".gotoTop").fadeOut()
        }
    });

    $(function () {
        if($(this).scrollTop() > 100) {
            $(".gotoTop").fadeIn()
        } else {
            $(".gotoTop").fadeOut()
        }
    })


    /**
     *
     */
    $(function () {

        if ($('.bottom-fix').is(":visible")) {
            $('body').on('focus', 'input', function () {
                $('.bottom-fix').css({'position': 'absolute', 'opacity': 0});
            }).on('blur','input', function () {
                $('.bottom-fix').css({'position': 'fixed', 'bottom': '0', 'opacity': 1});
            });
        };

        /*  移动端左侧弹出框 */
        $('.i_menu').click(function () {
            $('.sticky-container').toggleClass('show_navigation');
            $('body').toggleClass('overflow_hide');
            $(this).toggleClass('popping-menu');
            if ($('.sticky-container').hasClass('show_navigation')) {
                $(".trans_mask").remove();
                $('<div class="trans_mask"></div>').appendTo($(".sticky-container"));
            } else {
                $(".trans_mask").remove();
            }
            $(this).addClass('popping-menu');
        });

        $('.sticky-container ').on('click', '.trans_mask', function () {
            $('.i_menu').click();
        });

        /**
         *  即时聊天弹出提示框
         *  */
        if( $('.simple-inquire-tip-close').length < 1 ){
            $('.live-chat-tipbox').fadeIn(500).delay(5000).fadeOut(1000);
        }


        /**
         * 通用关闭按钮
         * class:
         *      close-ele: ave40-common-close-btn
         *      parent-ele: ave40-common-modal
         *
         * */
        $('.ave40-common-close-btn').on('click', function () {
            $(this).closest('.ave40-common-modal').closeAve40PopupBox();
        });


    });
}(jQuery);

