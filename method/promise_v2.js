;(function(window) {
	var state = ['Pending', 'Resolved', 'Rejected'];        // 状态

	var Promise = function(resolver){
        this.value = null;
        this.deferreds = [];                          // 保存链式调用的数组
        this.state = state[0];

        resolver(this.resolve.bind(this), this.reject.bind(this)); 
	};


	Promise.prototype = {
        constructor: Promise,

        // 执行函数
        handle: function(deferred){     
            // 初始化
            if (this.state === state[0]) {
                this.deferreds.push(deferred);
                return;
            }

            // 执行函数
            var fn = this.state === state[1] ? deferred.onResolved : deferred.onRejected,
                result;

            result = fn !== null ? fn.call(this, this.value) : undefined;
            this.state === state[1] ? deferred.resolve(result) : deferred.reject(result); 
        },

        // 成功
        resolve: function(value){
            this.value = value;
            this.state = state[1];
            this.finale();
           
        },
        
        // 失败
        reject: function(reason) {
            this.value = reason;
            this.state = state[2];
            this.finale();
        },

        // 完成
        finale: function() {
            var self = this;
            setTimeout(function () {
                for (var i = 0, len = self.deferreds.length; i < len; i++) {
                    self.handle(self.deferreds[i]);
                }
            }, 0);
        },

        // then 接收函数
        then: function(onResolved, onRejected) {
            var self = this;
            // 每一个then都初始化一个promise
            return new Promise(function (resolve, reject) {
                self.handle({
                    onResolved: onResolved || null,
                    onRejected: onRejected || null,
                    resolve: resolve,
                    reject: reject
                });
            });
        }
	};

	window.TPromise2 = Promise;
})(window);