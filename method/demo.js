// ======================  data

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