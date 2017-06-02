// ======================  data

// ----  get -----

var object = { 'a': [{ 'b': { 'c': 3 } }] };
 
data.get(object, 'a[0].b.c');
// => 3

data.get(object, 'a.b.c', 'default');
// => 'default'

// ======================  promise

var promise = new TPromise();
promise.start(function(){
	var that = this;
	// console.log('start函数开始');

	setTimeout(function(){
		that.resolve('then调用开始');
	}, 3000);
})
.then(function(message){
		var that = this;
		// console.log(message);
		// console.log('success函数执行');

		setTimeout(function(){
			that.resolve();
		}, 3000);
	}, 
	function(){
		// console.log('error函数执行');
	},
	function(){
		// console.log('final函数执行');
	});

promise.then(function(){
	// console.log('最后一个then调用');
});