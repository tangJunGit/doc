(function(window, undefined) {
	var slice = Array.prototype.slice;

	var $ = function(selector, context) {
		return new jQuery(selector, context);
	};

	var jQuery = function(selector, context) {
		context = context || document;
		var nodes = context.querySelectorAll(selector);
		for (var i = 0, len = nodes.length; i < len; i++) {
			this[i] = nodes[i];
		}
		this.length = len;
	};
	
	jQuery.fn = jQuery.prototype = {
		/**
		  * 转化成真正的数组
		  */
		toArray: function(){
			return slice.call(this, 0);
		},
		/**
		  * 返回指定位置的元素
		  */
		get: function(num){
			return num == null ? this.toArray() : (num < 0 ? this[this.length + num] : this[num]);
		},
		/**
		  * 遍历迭代
		  */
		each: function(callback){
			return $.each(this, callback);
		},
		/**
		  * 返回一个新数组
		  */
		map: function(callback){
			return $.map(this, callback);
		},
		/**
		  * 筛选
		  */
		eq: function(i){
			i = +i;
			return i === -1 ? slice.call(this, i) : slice.call(this, i, i+1);
		},
	};
 
	// =============================== 静态方法

	/**
	  * 遍历迭代
	  */
	$.each = function(array, callback){
		for (var i = 0; i < array.length; i++) {
			callback.call(array[i], i, array[i], array);
		}
		return array;
	};

	/**
	  * 返回一个新数组
	  */
	$.map = function(array, callback){
		var result = [];
		for (var i = 0; i < array.length; i++) {
			result.push(callback.call(array[i], i, array[i], array));
		}
		return result;
	};


	window.jQuery = window.$ = $;

	if ( typeof define === "function" && define.amd && define.amd.jQuery ) {
		define( "jquery", [], function () { return jQuery; } );
	}
    
})(window);