;(function(window) {
	var Subject = function(){
		this.topics = {};     // 订阅的主题
        this.uid = -1;        // 订阅的标识  
	};


	Subject.prototype = {
        constructor: Subject,

        // 发布
        publish: function( topic, args ) {
            var topics = this.topics;
            if ( !topics[topic] ) return false;
     
            var subscribers = topics[topic], 
                len = subscribers ? subscribers.length : 0;

            while (len--) {
                subscribers[len].fn( topic, args );         // 执行订阅的方法
            }
     
            return this;
        },

        // 订阅
        subscribe: function( topic, fn ) {
            var topics = this.topics;
            if (!topics[topic]) topics[topic] = [];
            
            var token = ( ++this.uid ).toString();
            topics[topic].push({
                token: token,
                fn: fn
            });
            return token;
        },

        // 取消订阅
        unsubscribe: function( token ) {
            var topic,
                topics = this.topics;

            for ( var key in topics ) {
                topic = topics[key];
                if ( topic ) {          // topic是否存在
                    for ( var i = 0, len = topic.length; i < len; i++ ) {
                        if ( topic[i].token === token ) {       // 匹配取消订阅的标识
                            topic.splice( i, 1 );
                            return token;
                        }
                    }
                }
            }
            return this;
        }
	};

	window.TSubject = Subject;
})(window);