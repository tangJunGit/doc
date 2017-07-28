// 淡入淡出 fade
;(function($, window, undefined) {
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


// 滑动 slide
;(function($, window, undefined) {
    // class 类
    var Attribute = {
        ACTIVE: 'active',           // 当前幻灯片
        
    };

	var Slide = function(items, options) {
        var _this = this;

        _this.items = items;
        _this.width = items.width();
        _this.parent = items.parent();

        _this.init(options.index || 0);
	};

	Slide.prototype = {
	    constructor: Slide,

	    init: function(index){
            var _this = this;

            _this.setStyle();
            _this.exec(index);
        },
            
        // 设定样式
        setStyle: function(){
            var _this = this,
                _items = _this.items,
                _length = _items.length;
            
            _this.parent.css({'width': _this.width * _length + 'px'});
        },

        // Slide 执行效果的方法
        exec: function(index){
            var _this = this,
                _style = _this.transform(index * _this.width);

            _this.parent.css(_style);
        },

        // 位移变化
        transform: function(x){
            return {
                '-webkit-transform': '-webkit-translate3d(-'+ x +'px, 0, 0)',
                'moztransform': '-moz-translate3d(-'+ x +'px, 0, 0)',
                '-ms-transform':'-ms-translate3d(-'+ x +'px, 0, 0)',
                'transform': 'translate3d(-'+ x +'px, 0, 0)',
            };
        },

	}

    window.Slide = Slide;
})(jQuery, window);



// 无缝滑动 Seamless
;(function($, window, undefined) {
    // class 类
    var Attribute = {
        ACTIVE: 'active',           // 当前幻灯片
        ANIM : 'anim',              // 动画过渡时间样式
    };

      // 滑动方向
    var Direction = {
        L: 'prev',                  // 调用 prev 方法
        R: 'next',                  // 调用 next 方法
    };

	var Seamless = function(items, options) {
        var _this = this;

        _this.items = items;
        _this.width = items.width();
        _this.parent = items.parent();
        _this.prevIndex = undefined;        // 上一次执行的 index

        _this.init(options.index || 0);
	};

	Seamless.prototype = {
	    constructor: Seamless,

	    init: function(index){
            var _this = this;

            _this.prevIndex = index;
            _this.setStyle();
            _this.change(index);
        },
            
        // 设定样式
        setStyle: function(){
            var _this = this,
                _items = _this.items,
                _length = _items.length;

            // 前后增添两个 item
            _this.parent
                    .append(_items.eq(0))
                    .prepend(_items.eq(_length-1));
            
            _this.parent.css({'width': _this.width * (_length + 2) + 'px'});
        },

        // Slide 执行效果的方法
        exec: function(index, direction){
            var _this = this,
                _length =  _this.items.length,
                _prevIndex = _this.prevIndex,
                _style;
            
            if(_prevIndex == 0 && Direction.L == direction){
                _this.change(_length);
            }else if(_prevIndex == _length-1 && Direction.R == direction){
                _this.change(-1);
            }
            
            _this.prevIndex = index;
           setTimeout(function() {
                _this.change(index, true);
           }, 15);

        },

        // 滑块移动变换
        change: function(index, isAnim){
            var _this = this,
                _style;

            if(isAnim){
                _this.parent.addClass(Attribute.ANIM);
            }else{
                _this.parent.removeClass(Attribute.ANIM);
            }
            
            _style = _this.transform(++index * _this.width);
            _this.parent.css(_style);
        },

        // 位移变化
        transform: function(x){
            return {
                '-webkit-transform': '-webkit-translate3d(-'+ x +'px, 0, 0)',
                'moztransform': '-moz-translate3d(-'+ x +'px, 0, 0)',
                '-ms-transform':'-ms-translate3d(-'+ x +'px, 0, 0)',
                'transform': 'translate3d(-'+ x +'px, 0, 0)',
            };
        },

	}

    window.Seamless = Seamless;
})(jQuery, window);
