(function(window, undefined) {
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
		
	};

	window.jQuery = window.$ = $;

    if ( typeof define === "function" && define.amd ) {
    	define( "jquery", [], function () { return $; } );
    }
})(window);