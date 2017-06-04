var data = {
	/**
	  * 通过对象的 path 获取值
	  * 
	  * object   对象
	  * path     路径
	  * defaultValue    默认值  
	  */
	 get: function (object, path, defaultValue) {
	 	// 查找 path 的结果值
	 	var _getValue = function(object, path) {
	        path = _stringToPath(path+'');
	        
	        var index = 0, length = path.length;

	        while (object != null && index < length) {
	            object = object[path[index++]];
	        }

	        // 匹配到需要的路径，会循环 path.length 次
	        // 所以 index == length 才算匹配到
	        return (index && index == length) ? object : undefined;
	    }
	    
	    //  解析 path 为数组
	    var _stringToPath = function(path) {
	        var prop = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
	            result = [];
	        
	        path.replace(prop, function(match, number) {
	            result.push(number || match);
	        });
	        return result;
	    }

        var result = object == null ? undefined : _getValue(object, path);
        return result === undefined ? defaultValue : result;
	},

	/**
	  * 通过真检查时，返回第一个索引值
	  * 
	  * array    数组
	  * attrs    检查的键值对 
	  */
	findIndex: function(array, attrs){
	    for (var i = 0, length = array.length; i < length; i++) {
	       if (data.isMatch(array[i], attrs)) return i;
	    }
	    return -1;
	},

	/**
	  * 键和值是否包含在object中
	  * 
	  * object   对象
	  * attrs    匹配的键值对 
	  */
	isMatch: function(object, attrs) {
	    var keys = Object.keys(attrs),
	    	length = keys.length;
	    if (object == null) return !length;

	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== object[key] || !(key in object)) return false;
	    }
	    return true;
	},

	/**
	  * 对象属性覆盖掉
	  */
	extend: function() {
		var object = {},
			length = arguments.length;
	  	if (!length) return object;

	  	for (var index = 0; index < length; index++) {
		    var source = arguments[index],
		    	keys = [];
		    for (key in source) {
		    	if(source.hasOwnProperty(key)) keys.push(key);   // 自身属性
		    }
		    for (var i = 0, l = keys.length; i < l; i++) {
		      	var key = keys[i];
		      	object[key] = source[key];
		    }
		}
	    return object;
	},

	extendDeep: function() {
		var object = {},
			length = arguments.length;
	  	if (!length) return object;

	  	for (var index = 0; index < length; index++) {
		    var source = arguments[index],
		    	keys = [];
		    for (key in source) {
		    	keys.push(key);                    // 自身属性，继承属性
		    }
		    for (var i = 0, l = keys.length; i < l; i++) {
		      	var key = keys[i];
		      	object[key] = source[key];
		    }
		}
	    return object;
	},


	 
};
