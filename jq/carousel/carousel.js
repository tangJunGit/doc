;(function($, window,undefined) {
	// 默认参数
	var Default = {
        index: 0,                  	// 第几张幻灯片    
        loop: true,                	// 幻灯片是否循环
        interval: undefined,       	// 幻灯片自动播放时间
        effect: 'fade',         	// 幻灯片切换效果
        pause: true,        		// 鼠标 mouseover 时暂停
    };

    // 选择器
    var Selector = {
        PREV: '.prev',              // 幻灯片向左切换按钮
        NEXT: '.next',              // 幻灯片向右切换按钮
        ITEM: '.item',          	// 幻灯片的类名
        NAV : '.nav',           	// 导航按钮
    };

     // class 类
    var DATA = 'data-';
    var Attribute = {
        ACTIVE: 'active',           // 当前幻灯片的样式 .active
        INDEX: DATA+'index',		// 导航点的索引属性 data-index
    };
    
    // 滑动方向
    var Direction = {
        L: 'prev',                  // 调用 prev 方法
        R: 'next',                  // 调用 next 方法
    };

    // 动画
    var Animation = {
    	FADE: 'fade'               // fade 动画效果
    };


	var Carousel = function(element, options) {
		var _this = this;

		_this.options = options;
		_this.index = options.index;
		_this.element = element;
        _this.items = element.find(Selector.ITEM);
        _this.nav = element.find(Selector.NAV);

		_this.init();
	};

	Carousel.prototype = {
	    constructor: Carousel,

	    init: function(){
	    	var _this = this;

            // 给导航添加 data-index 属性
            _this.nav.each(function(i){
                $(this).attr(Attribute.INDEX, i);
            });

	    	_this.handler(_this.index);
			_this.addEventListeners();
	    },

	    // 事件监听
	    addEventListeners: function(){
	    	var _this = this,
	    		_element = _this.element,
	    		_prev = _element.find(Selector.PREV),
	    		_next = _element.find(Selector.NEXT);


            // 自动播放
            if(typeof _this.options.interval === 'number'){
            	var pauseElems = $(Selector.PREV+','+Selector.NEXT+','+Selector.NAV);		// 默认暂停播放的 element

            	_this.cycle();

            	// 鼠标移上去，暂停播放
            	if(_this.options.pause) pauseElems = _this.element;

        		pauseElems
                    .on('mouseover', function(){
                        _this.pause();
                    })
                    .on('mouseout', function(){
                        _this.cycle();
                    });
            }


	    	// 上一张幻灯片按钮
            _prev.on('click', function(){
                _this.jump(Direction.L);
            });

            // 下一张幻灯片按钮
            _next.on('click', function(){
                _this.jump(Direction.R);
            });

           	// 点击导航
           	_this.nav.on('click', function(){
           		var index = $(this).attr(Attribute.INDEX);
           		if(index) _this.handler(index);
           	});
	    },

	    // 跳到第几张幻灯片
	    jump: function(direction){
	    	var _this = this,
	    		_options = _this.options;

	    	_this.index = _this[direction](_this.index, _this.items.length, _options.loop); 	// 获取页码
	    	
	    	_this.handler(_this.index);
	    },

	    // 执行幻灯片
	    handler: function(index){
	    	var _this = this,
	    		_fade = 'fade',
	    		_effect = _this.options.effect || Animation.FADE;

	    	var options = {
	    		index: index
	    	};

	    	if(!_this.animation){
	    		_this.element.addClass(_effect);				// 添加动画的class

	    		// 创建幻灯片动画
	    		switch(_effect){
	    			case Animation.FADE:
	    			default:
	    				_this.animation = new Fade(_this.items, options);			
	    				break;
	    		}
	    	}else{
	    		_this.animation.exec(index);	// 执行动画效果
	    	}

            if(_this.nav) _this.nav.removeClass(Attribute.ACTIVE).eq(index).addClass(Attribute.ACTIVE);
	    },

	    // 循环播放
	    cycle: function(){
	    	var _this = this;

            _this.isInterval = setInterval(function(){
				                    _this.jump(Direction.R);
				                }, _this.options.interval);
	    },

	    // 暂停播放
        pause: function(){
            clearInterval(this.isInterval);
        },

	    // 下一页
        next: function(page, length, loop){
            page++;
            if(page >= length){
                page = loop ? 0 : length - 1;
            }
            return page;
        },

        // 上一页
        prev: function(page, length, loop){
            page--;
            if(page < 0){
                page = loop ? length - 1 : 0;
            }
            return page;
        },
	}
	
	$.fn.extend({
		carousel: function(options){
			options = $.extend(Default, options || {});

			this.each(function(){
	            new Carousel($(this), options);
	        });

			return this;
		}
	});

})(jQuery, window);