;(function($, window, undefined) {
    var Default = {
        drag: undefined,                // 拖拽的选择器
    };

	var Drag = function(element, options) {
        var _this = this;

        _this.options = options;
        _this.element = element;
        _this.drag = options.drag ? $(options.drag) : _this.element;        // 拖拽的节点
        _this.currentX = 0;             // 开始计算的当前 x 点
        _this.currentY = 0;             // 开始计算的当前 y 点
        _this.offsetX = 0;              // 计算的偏移 x 点
        _this.offsetY = 0;              // 计算的偏移 y 点
        _this.isDrag = false;           // 是否在拖拽状态中

		_this.init();
	};

	Drag.prototype = {
	    constructor: Drag,

        /**
		 * 初始化函数
		 * 
		 */
	    init: function(){
            this.addEventListeners();
        },

        /**
		 * 事件监听
		 * 
		 */
        addEventListeners: function(){
            var _this = this,
                _drag = _this.drag,
                _document = $(document);
            
            _drag.css({'cursor': 'move'});
            
            // 鼠标按下开始计算
            _drag.on('mousedown', function(e){
                _this.isDrag = true;
                _this.start(e);
            });

            // 鼠标移动偏移量的计算
            _document.on('mousemove', function(e){
                if(_this.isDrag) _this.offset(e);
            });

            // 鼠标松开，停止拖拽
            _document.on('mouseup', function(){
                _this.isDrag = false;
                _this.stop();
            });

        },
        
         /**
		 * 计算开始位置
		 * 
         * @param {*} e 
		 */
        start: function(e){
            var _this = this;
                
            if(!e){
                e = window.event;
                // 防止IE文字选中
                _this.drag.onselectstart = function(){
                    return false;
                }; 
            }
            _this.currentX = e.clientX;
            _this.currentY = e.clientY;
        },

         /**
		 * 计算偏移量
		 * 
         * @param {*} e 
		 */
        offset: function(e){
            e = e || window.event;
            var _this = this,
                _nowX = e.clientX,
                _nowY = e.clientY;

            _this.offsetTempX = _nowX - _this.currentX + _this.offsetX, 
            _this.offsetTempY = _nowY - _this.currentY + _this.offsetY;

            _this.element.css(_this.transform(_this.offsetTempX,  _this.offsetTempY));
        },

        /**
		 * 停止拖拽
		 * 
		 */
        stop: function(){
            var _this = this;

            _this.offsetX = _this.offsetTempX;
            _this.offsetY = _this.offsetTempY;
        },

        // 位移变化样式
        transform: function(x, y){
            return {
                '-webkit-transform': '-webkit-translate('+ x +'px, '+ y +'px)',
                '-moz-transform': '-moz-translate('+ x +'px, '+ y +'px)',
                '-ms-transform':'-ms-translate('+ x +'px, '+ y +'px)',
                'transform': 'translate('+ x +'px, '+ y +'px)',
            };
        },

	}

    $.fn.extend({
		drag: function(options){
			options = $.extend(Default, options || {});

			this.each(function(){
	            new Drag($(this), options);
	        });

			return this;
		}
    });
    
})(jQuery, window);