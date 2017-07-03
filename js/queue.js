;(function(window) {
	var Queue = function(){
		this.time = 0;
		this.fnList = [];
	};


	Queue.prototype = {
        constructor: Queue,

        // 添加队列方法
        queue: function(fn){
        	var self = this;

        	// 构建新的函数
        	var newFn = function(){
        		fn.call(self);
        		self.dequeue();			
        	};

        	this.fnList.push({
        		fn: newFn,
        		time: this.time
        	});
            return this;
        },

        // 移除队列方法
        dequeue: function(){
        	if(!this.fnList.length) return;
            var current = this.fnList.shift();
            setTimeout(current.fn, current.time);
        	return this;
        },

        // 延迟时间
        delay: function(time){
        	this.time = +time;
        	return this;
        },
	};

	window.TQueue = Queue;
})(window);