/**
 * Created by Administrator on 2017/3/20.
 * 高版本jQuery和prototype.js的兼容性处理
 */

~function($) {
    if($ && $.fn && $.fn.jquery) {
    	$.noConflict();
	}
} (jQuery);