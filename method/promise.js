;(function(window) {
	var state = ['pending', 'done', 'error', 'final'],        // 状态
		fn = ['success', 'final', 'error'];                   // 处理的函数

	var Promise = function(){
		this.state = state[0];
        this.thenArr = [];
	};


	Promise.prototype = {
		//promise开始调用的函数
        start: function(callback){
            var that = this;
            setTimeout(function(){
                callback.call(that);
            }, 0);
            return this;
        },
        //then方法添加回调
        then:function(successFn, errorFn, finalFn){
            var obj={
                success: successFn,
                error: errorFn,
                final: finalFn
            };
            this.thenArr.push(obj);
            return this;
        },
        //执行then添加的回调函数
        execThen:function(fnArr, message){
            this.state = state[0];
            if(!this.thenArr.length) return;
            var thenFn = this.thenArr.shift();

            for (var i = 0, len = fnArr.length; i < len; i++) {
                if (thenFn[fnArr[i]]) {
                    thenFn[fnArr[i]].call(this, message);
                }
            }
 
        },
		//异步完成时调用
        resolve: function(message){
            this.state = state[1];
            this.execThen(fn.slice(0, 2), message);
        },
        //异步错误时调用
        reject: function(message){
            this.state = state[2];
            this.execThen(fn.slice(1).reverse(), message);
        },
        //无论正确，错误都调用
        final: function(message){
            this.state = state[3];
            this.execThen(fn.slice(2), message);
        }
	};

	window.TPromise = Promise;
}(window));