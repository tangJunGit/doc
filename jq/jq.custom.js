// 现代浏览器，IE8及以上版本
(function(window, undefined) {
	var slice = Array.prototype.slice,
		rclass = /[\t\r\n\f]/g,
		rnotwhite = /\S+/g;

	var $ = function(selector, context) {
		return new jQuery(selector, context);
	};

	var jQuery = function(selector, context) {
		var nodes = [];
		if(typeof selector ===  'string'){
			context = context || document;
			nodes = context.querySelectorAll(selector);
			this.selector = selector;
		}else if($.isArray(selector)){
			nodes = selector;
		}else if(typeof selector === 'object'){
			nodes = [selector]
		}
		for (var i = 0, len = nodes.length; i < len; i++) {
			this[i] = nodes[i];
		}
		this.length = len;
		
	};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,
		// 转化成真正的数组
		toArray: function(){
			return slice.call(this, 0);
		},
		// 返回指定位置的元素
		get: function(num){
			return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
		},
		// 遍历迭代
		each: function(callback){
			return $.each(this, callback);
		},
		// 返回一个新数组
		map: function(callback){
			return $.map(this, callback);
		},
		// 筛选
		eq: function(i){
			i = +i;
			var nodes =  i === -1 ? slice.call(this, i) : slice.call(this, i, i+1);
			return $(nodes);
		},
		// 获取与添加属性
		attr: function(name, value){
			return value == null ? this[0].getAttribute(name)
								: $.each(this, function(i, elem){elem.setAttribute(name, value+'')});
		},
		// 删除属性
		removeAttr: function(name){
			return $.each(this, function(i, elem){elem.removeAttribute(name)});
		},
		// 添加class
		addClass: function(value){
			var cur, j, className, 
				classNames = ( value || "" ).match( rnotwhite ) || [];
			$.each(this, function(i, elem){
				// 获取 class
				cur = elem.nodeType === 1 && 
						( elem.className ? ( " " + elem.className + " " ).replace( rclass, " " ) : " ");
				if(!cur) return;
				j = 0;

				// 处理 class
				while ( (className = classNames[j++]) ) {
					if ( cur.indexOf( " " + className + " " ) < 0 ) cur += className + " ";
				}
				elem.className = $.trim(cur);
			});
			return this;
		},
		// 删除class
		removeClass: function(value){
			var cur, j, className, 
				classNames = ( value || "" ).match( rnotwhite ) || [];
			$.each(this, function(i, elem){
				// 获取 class
				cur = elem.nodeType === 1 && 
						( elem.className ? ( " " + elem.className + " " ).replace( rclass, " " ) : " ");
				if(!cur) return;
				j = 0;

				// 处理 class
				while ( (className = classNames[j++]) ) {
					if ( cur.indexOf( " " + className + " " ) >= 0 ) cur = cur.replace( " " + className + " ", " " );
				}
				elem.className = $.trim(cur);
			});
			return this;
		},
		// 检验是否包含class
		hasClass: function(value){
			var className = " " + value + " ";
			for (var i = 0, len = this.length; i < len; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
			return false;
		},
		// 转换 class
		toggleClass: function(value){
			$.each(this, function(i, elem){
				var className,
					i = 0,
					self = $(this),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}
			});
		},

	};
 
	// =============================== 静态方法 (兼容IE8)

	// 遍历迭代
	$.each = function(array, callback){
		for (var i = 0, len = array.length; i < len; i++) {
			callback.call(array[i], i, array[i], array);
		}
		return array;
	};

	// 返回一个新数组
	$.map = function(array, callback){
		var result = [];
		for (var i = 0, len = array.length; i < len; i++) {
			result.push(callback.call(array[i], i, array[i], array));
		}
		return result;
	};

	// 去除字符串两段的空格
	$.trim = function(value){
		return String.prototype.trim ? value.trim() : value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};

	// 判断是否是数组
	$.isArray = function(arg){
		return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === '[object Array]';
	};

	window.jQuery = window.$ = $;

	if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
		define( "jquery", [], function () { return jQuery; } );
	}
    
})(window);