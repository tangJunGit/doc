;(function($, window,undefined) {
    // class 类
    var Attribute = {
        ACTIVE: 'active',           // 当前幻灯片
        HIDE: 'hide',               // 隐藏幻灯片
    };

	var Fade = function(items, options) {
        var _this = this;
        _this.items = items;

		_this.init(options.index || 0);
	};

	Fade.prototype = {
	    constructor: Fade,

	    init: function(index){
            this.exec(index);
	    },

        // fade 执行效果的方法
        exec: function(index){
            var _this = this;

            _this.items.addClass(Attribute.HIDE).removeClass(Attribute.ACTIVE).eq(index).removeClass(Attribute.HIDE);

            setTimeout(function(){
                _this.items.eq(index).addClass(Attribute.ACTIVE);
            }, 15);
        },

	}

    window.Fade = Fade;
})(jQuery, window);