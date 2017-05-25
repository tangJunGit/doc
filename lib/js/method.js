;(function(window, undefined){
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	var _ = {};

	// ==========================  判断函数

	/**
	  * 判断是否是类数组
	  */
	_.isArrayLike = function(collection){
		var length = collection && collection.length;
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	};

	// =========================  集合函数(数组或对象)
	/**
	  * forEach
	  */
	_.forEach = function(obj, iteratee){
		var keys = !_.isArrayLike(obj) && Object.keys(obj),
	        length = (keys || obj).length;

	    for (var index = 0; index < length; index++) {
	      	var key = keys ? keys[index] : index;
	      	iteratee(obj[key], key, obj);
	    }
	    return obj;
	};

	/**
	  * map
	  */
	_.map = function(obj, iteratee){
		var keys = !_.isArrayLike(obj) && Object.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);

	    for (var index = 0; index < length; index++) {
	      	var key = keys ? keys[index] : index;
	      	results[index] = iteratee(obj[key], key, obj);
	    }
	    return results;
	};

	/**
	  * reduce
	  *
	  * @param memo 初始值
	  */
	function createReduce(dir) {
		return function(obj, iteratee, memo){
			var keys = !_.isArrayLike(obj) && _.keys(obj),
				length = (keys || obj).length,
				index = dir > 0 ? 0 : length - 1;

			// 无默认值
			if (arguments.length < 3) {
				memo = obj[keys ? keys[index] : index];
				index += dir;
			}

			for (; index >= 0 && index < length; index += dir) {
				var key = keys ? keys[index] : index;
				memo = iteratee(memo, obj[key], key, obj);
			}
			return memo;
		};
		
	}

	 _.reduce = createReduce(1);
	 _.reduceRight = createReduce(-1);


	// ==========================  数组

	/**
	  * 索引
	  */
	function createIndexFinder(dir) {
	    return function(array, predicate) {
			predicate = _.matcher(predicate);
	      	var length = array != null && array.length,
	      		index = dir > 0 ? 0 : length - 1;

	      	for (; index >= 0 && index < length; index += dir) {
	        	if (predicate(array[index], index, array)) return index;
	      	}
	      	return -1;
	    };
	}

	_.findIndex = createIndexFinder(1);
	_.findLastIndex = createIndexFinder(-1);


	// ==========================  对象

	/**
	  * 断言函数：用来辨别给定的对象是否匹配attrs指定键/值属性
	  */
	_.matcher = function(attrs) {
	    return function(obj) {
	    	return _.isMatch(obj, attrs);
	    };
	};

	/**
	  * 键和值是否包含在object中
	  */
	_.isMatch = function(obj, attrs){
		var keys = Object.keys(attrs),
			length = keys.length;

		if(obj == null) return !length;
		for (var i = 0; i < length; i++) {
			var key = keys[i];
			if (attrs[key] !== obj[key] || !(key in obj)) return false;
		}
		return true;
	};



	window._ = _;
})(window);