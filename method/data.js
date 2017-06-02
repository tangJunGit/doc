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
	}
};