(function(window, undefined) {
	var _me = function (){

	};

	window._me = _me;

	if ( typeof define === "function" && define.amd ) {
    	define( "_me", [], function () { return _me; } );
    }
})(window);