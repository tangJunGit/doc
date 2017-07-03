// ======================  数据 data

// ----  get -----
var get = { 'a': [{ 'b': { 'c': 3 } }] };
 
data.get(get, 'a[0].b.c');
// => 3

data.get(get, 'a.b.c', 'default');
// => 'default'


// ----  findIndex  -----
var findIndex = [{'id': 1, 'name': 'Bob', 'last': 'Brown'},
             {'id': 2, 'name': 'Ted', 'last': 'White'},
             {'id': 3, 'name': 'Frank', 'last': 'James'},
             {'id': 4, 'name': 'Ted', 'last': 'Jones'}];

data.findIndex(findIndex, {
  name: 'Ted'
});
// => 1

// ----  isMatch -----
var isMatch = {name: 'moe', age: 32};

data.isMatch(isMatch, {age: 32});
// =>  true


// ======================  promise

var promise1 = new TPromise();
promise1.start(function(){
	// console.log('start函数开始');

	setTimeout(function(){
		promise1.resolve('then调用开始');
	}, 3000);
})
.then(function(message){
		// console.log(message);
		// console.log('success函数执行');

		setTimeout(function(){
			promise1.resolve();
		}, 3000);
	}, 
	function(){
		// console.log('error函数执行');
	},
	function(){
		// console.log('final函数执行');
	});

promise1.then(function(){
	// console.log('最后一个then调用');
});


// ======================  promise


var promise2 = new TPromise2(function(resolve, reject) {
  	// console.log('Promise');
  	resolve('one');
});

promise2.then(function(data) {
  	// console.log('Resolved.');
  	// console.log('接受数据：', data);			// => 'one'
  	return {message: 'two'};
},function(error){
	// console.log('Rejected.');
	// console.log('错误信息：', error);
})
.then(function(data){
	// console.log(data);		// => {message: 'two'}
});


// promise.all
var promise21 = new TPromise2(function(resolve, reject) {
  	resolve('one');
});
var promise22 = new TPromise2(function(resolve, reject) {
  	setTimeout(function(){
  		resolve('two');
  	}, 3000);
});

var obj = {
	message: 'four',
	then: function(resolve, reject){
		resolve(this.message);
	}
};


TPromise2.all([promise21, promise22, 'three', obj])
.then(function(result){
	// console.log(result); 		// ["one", "two", "three", "four"]
},
function(error){
	// console.log(error);  
});


// ======================  队列  queue
var q = new TQueue();

q.queue(function(){
	// console.log('第一个队列执行');
})
.delay(2000)
.queue(function(){
	// console.log('第二个队列执行');
})
.delay(5000)
.queue(function(){
	// console.log('第三个队列执行');
})
.dequeue();


// ======================  观察者模式  subscribe
var pub = new TSubject();

var subscription = pub.subscribe( "hello", function(){			// 订阅
	// console.log('订阅1');
});	

pub.subscribe( 'hello', function(topic, args){			// 订阅
	// console.log('订阅2');
	// console.log('topic:', topic);
	// console.log('args:', args);
});	

pub.publish( 'hello', 'hello world!' );		// 发布

pub.unsubscribe( subscription );			// 取消订阅1

pub.publish( 'hello',  {					// 再次发布
	name: 'TJ',
	message: 'Hello again!'
});		



// ======================  时间 time

time.dateFormat();  
// 当前日期
// => "2017-06-07 00:05:02"

var d = (new Date()).getTime();   // 当前时间戳
time.dateFormat(d);
// => "2017-06-07 00:05:02"