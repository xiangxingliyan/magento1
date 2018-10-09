/**
 * url操作
 * @param url
 * @returns {JKURLOperator}
 * @constructor
 */
function JKURLOperator(url)
{
	this.onGo = null;

	this.getParam = function(key, separator) {
        if(typeof key == 'undefined') {
        	return this._attributes.params;
        }

        separator = !separator && separator !== 0 ? null : separator;

        var value = this._attributes.params[key];
        value = typeof value == 'undefined' ? null : value;

        if(separator) {
            return !value && value!==0 ? [] : value.split(separator);
		} else {
        	return value;
		}
	};

	this.getAttributes = function () {
		return this._attributes;
	};

	this.getAttribute = function(key) {
		return this._attributes[key];
	};

	this.setAttribute = function (key, value) {
		this._attributes[key] = value;
		return this;
	};

	this.setPath = function (value) {
		value = value.substr(0) == '/' ? '' : '/' + value;
		this.setAttribute('path', value);
		return this;
	};

	this.setPort = function (value) {
		this.setAttribute('port', value);
		return this;
	};

	this.setHost = function (value) {
		this.setAttribute('host', value);
		return this;
	};

	this.setScheme = function (value) {
		this.setAttribute('scheme', value);
		return this;
	};

	this.toString = this.str = this.getUrl = function () {
		var url = this._attributes.scheme +
			(this._attributes.scheme ? '://' : '') +
				this._attributes.host;

		if(this._attributes.host) {
			url += ((this._attributes.port == '80' || this._attributes.port == '') ? '' : ':' + this._attributes.port);
		}

		url += this._attributes.path +
			this.getQueryBody();

		return url;
	};

	this.go = function() {
		window.location.href = this.str();

		if(this.onGo) {
			this.onGo();
		}

		return this;
	};

	this.setUrl = function (url) {
		url = typeof url == 'undefined' ? '' : url;
		this._attributes = parseUrl(url);
		return this;
	};

	this.addParam = function(key, value) {
		if(isArray(this._attributes.params[key])) {
			this._attributes.params[key].push(value);
		} else if(this._attributes.params[key] || this._attributes.params[key] ===0 ){
			this._attributes.params[key] = [this._attributes.params[key], value];
		} else {
			this._attributes.params[key] = value;
		}
		return this;
	};

	this.setParam = this.updateParam = function(key, value) {
		this._attributes.params[key] = value;
		return this;
	};

	this.deleteParam = this.clearParam = function (key) {
		delete this._attributes.params[key];
		return this;
	};

	this.getQueryBody = function () {
		var str = '';
		var params = this._attributes.params;

		for(var k in params) {
			var paramValue = _urlEncode(params[k]);
			var paramName = _urlEncode(k);
			if(isArray(paramValue)) {
				for(var i=0; i<paramValue.length; i++) {
					str += '&' + paramName + '=' + paramValue[i];
				}
			} else {
				str += '&' + paramName + '=' + paramValue;
			}
		}

		if(str == '') {
			return '';
		}

		return '?' + str.substr(1);
	};

	this.setUrl(url);

	function parseQueryString(query) {
		var paramsSegmentAry = query.split('&');
		var params = {};

		for(var i=0; i<paramsSegmentAry.length; i++) {
			if(paramsSegmentAry[0] == '') {
				continue;
			}

			var eqPos = paramsSegmentAry[i].indexOf('=');
			var key = eqPos < 0 ? paramsSegmentAry[i] : paramsSegmentAry[i].substr(0, eqPos);
            key = _urlDecode(key);
			var value = eqPos < 0 ? '' : paramsSegmentAry[i].substr(eqPos+1);
            value = _urlDecode(value);
			params[key] = value;
		}

		return params;
	}

	function parseUrl(url) {
		var qmPos = url.indexOf('?');
		var baseUrl = qmPos<0 ? url : url.substr(0, qmPos);
		baseUrl = baseUrl.replace(/\\/g, '/');
		var matchs = baseUrl.match(/(?:(.*):\/\/+)?(.*)/);
		var head = matchs[1] ? matchs[1] : '';
		var pathinfo = matchs[2] ? matchs[2] : '';
		pathinfo = pathinfo.replace(/\/+/g, '/');
		var headSplit = head.split(':');
		var pathinfoSplit = pathinfo.split('/');
		var host = pathinfoSplit[0];
		pathinfoSplit.splice(0, 1);

		var attributes = {
			scheme: headSplit[0],
			port: headSplit[1] ? headSplit[1] : '80',
			host: host,
			path: '/' + pathinfoSplit.join('/')
		};

		attributes.queryBody = qmPos<0 ? '' : url.substr(qmPos);
		attributes.query = attributes.queryBody.substr(1);
		attributes.params = parseQueryString(attributes.query);

		return attributes;
	}

	function _urlEncode(str) {
		return encodeURIComponent(String(str)).replace(/%20/g, '+')
			.replace(/!/g, '%21').replace(/\(/g, '%28')
			.replace(/\)/g, '%29').replace(/\*/g, '%2A')
			.replace(/'/g, '%27').replace(/~/g, '%7E');
	}

	function _urlDecode(str) {return decodeURIComponent(String(str).replace(/\+/g, '%20'));}

	return this;
}

/**
 * @param url
 * @returns {JKURLOperator}
 */
function jkUrl(url)
{
	return new JKURLOperator(url);
}

/**
 * 自适应图片大小
 * @param elm
 */
function jkImageFitWrap(elm) {
    ~function($) {
        var $elm = $(elm);
        var $wrap = $elm.parent();
        var image = $elm[0];

        function clacAdaptWrapImgSize(maxWidth, maxHeight, width, height) {
            var param = {top:0, left:0, width:width, height:height};
            if( width>maxWidth || height>maxHeight ){
                var rateWidth = width / maxWidth;
                var rateHeight = height / maxHeight;
                if( rateWidth > rateHeight ){
                    param.width =  maxWidth;
                    param.height = Math.round(height / rateWidth);
                }else{
                    param.width = Math.round(width / rateHeight);
                    param.height = maxHeight;
                }
            }
            param.left = Math.round((maxWidth - param.width) / 2);
            param.top = Math.round((maxHeight - param.height) / 2);
            return param;
        }

        $elm.css('width', 'auto');
        $elm.css('height', 'auto');

        var maxWidth = $wrap.innerWidth(),
            maxHeight = $wrap.innerHeight(),
            width = image.naturalWidth,
            height = image.naturalHeight;
        var param = clacAdaptWrapImgSize(maxWidth, maxHeight, width, height);

        $elm.css({
            marginLeft: param.left + 'px',
            marginTop: param.top + 'px',
            width: 'auto',
            height: 'auto'
        }).css('width', param.width + 'px');
    }(jQuery);
}


function isArray(obj) {
    return Object.prototype.toString.call(obj)=='[object Array]';
}