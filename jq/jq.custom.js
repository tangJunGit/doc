// 现代浏览器，IE8及以上版本
(function(window, undefined) {
	var slice = Array.prototype.slice,
		rclass = /[\t\r\n\f]/g,
		rnotwhite = /\S+/g;

	var $ = function(selector, context) {
		return new jQuery(selector, context);
	};

	var jQuery = function(selector, context) {
		var nodes = [],
			type = typeof selector;

		if(selector[0] === '#'){                               	// $('#id')
			nodes = document.getElementById(selector.slice(1));
			nodes = nodes === null ? [] : [nodes];
		}else if(type ===  'string' && context == null){        // css选择器
			nodes = document.querySelectorAll(selector);
		}else if(type ===  'string' && context.length > 0){     // 查找儿子节点                   
			nodes = context.find(selector);
		}else if($.isArray(selector)){                        	// 将数组封装成jq对象
			nodes = selector;
		}else if(type === 'function'){                			// $(function(){})   DOM加载完成执行
			var completed = function(e){
				if ( document.removeEventListener || e.type === "load" || document.readyState === "complete" ) { 
					//	解除绑定事件
        			if ( document.removeEventListener ) { 
				        document.removeEventListener( "DOMContentLoaded", completed, false ); 
				        window.removeEventListener( "load", completed, false ); 
				    } else if( document.detachEvent ) { 
				        document.detachEvent( "onreadystatechange", completed ); 
				        window.detachEvent( "onload", completed ); 
				    } 
					selector();
    			} 
			};
			$(document).ready(completed);
		}else if(type === 'object'){                			// $({})
			nodes = [selector];
		}

		for (var i = 0, len = nodes.length; i < len; i++) {
			this[i] = nodes[i];
		}
		this.length = len;
	};
	
	jQuery.fn = jQuery.prototype = {
		constructor: jQuery,

		//  ready 事件
		ready: function(fn){
	        if ( document.readyState === "complete" ) {  				// 在 ready 事件过后被调用的时候，直接触发
	            setTimeout( jQuery.ready ); 
	        } else if ( document.addEventListener ) { 										// DOMContentLoaded 事件绑定
	            document.addEventListener( "DOMContentLoaded", fn, false ); 			
	            window.addEventListener( "load", fn, false ); 
	        } else if( document.attachEvent ) { 																		// 低版本IE8
	            document.attachEvent( "onreadystatechange", fn );	
	            window.attachEvent( "onload", fn ); 
	        }
		},


		// ===============================  筛选

		// 返回指定位置的元素
		get: function(num){
			return num == null ? $.toArray(this) : (num < 0 ? this[this.length + num] : this[num]);
		},
		// 遍历迭代
		each: function(fn){
			return $.each(this, fn);
		},
		// 返回一个新数组
		map: function(fn){
			return $.map(this, fn);
		},
		// 筛选
		eq: function(i){
			i = +i;
			var nodes =  i === -1 ? slice.call(this, i) : slice.call(this, i, i+1);
			return $(nodes);
		},
		// 查找儿子节点
		find: function(selector){
			var nodes = [];
			$.each(this, function(i, elem){
				var elems = elem.querySelectorAll(selector);
				$.each(elems, function(){
					nodes.push(this);
				});
			});
			return nodes;
		},

		// ===============================  属性

		// 获取与添加属性
		attr: function(name, value){
			return value == null ? this[0].getAttribute(name)
								: $.each(this, function(i, elem){elem.setAttribute(name.tolowercase(), value+'')});
		},
		// 删除属性
		removeAttr: function(name){
			return $.each(this, function(i, elem){elem.removeAttribute(name)});
		},
		// 添加class
		addClass: function(value){
			var cur, j, className, 
				classNames = ( value || "" ).match( rnotwhite ) || [];
			return $.each(this, function(i, elem){
					// 获取 class
					cur = elem.nodeType === 1 && 
							( elem.className ? ( " " + elem.className + " " ).replace( rclass, " " ) : " ");
					if(!cur) return;
					j = 0;

					// 处理 class
					while ( (className = classNames[j++]) ) {
						if ( cur.indexOf( " " + className + " " ) < 0 ) cur += className + " ";
					}
					elem.className = $.trim(cur);
				});
		},
		// 删除class
		removeClass: function(value){
			var cur, j, className, 
				classNames = ( value || "" ).match( rnotwhite ) || [];
			return $.each(this, function(i, elem){
					// 获取 class
					cur = elem.nodeType === 1 && 
							( elem.className ? ( " " + elem.className + " " ).replace( rclass, " " ) : " ");
					if(!cur) return;
					j = 0;

					// 处理 class
					while ( (className = classNames[j++]) ) {
						if ( cur.indexOf( " " + className + " " ) >= 0 ) cur = cur.replace( " " + className + " ", " " );
					}
					elem.className = $.trim(cur);
				});
		},
		// 检验是否包含class
		hasClass: function(value){
			var className = " " + value + " ";
			for (var i = 0, len = this.length; i < len; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}
			return false;
		},
		// 转换 class
		toggleClass: function(value){
			return $.each(this, function(i, elem){
					var className,
						i = 0,
						self = $(this),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
				});
		},
		// 获取与赋值value值
		val: function(value){
			return value == null ? $.trim(this[0].value)
								: $.each(this, function(i, elem){elem.value = value});
		},
		// html
		html: function(html){
			return html == null ? this[0].innerHTML
								: $.each(this, function(i, elem){elem.innerHTML = html});
		},
		// 文本
		text: function(text){
			return text == null ? this[0].innerText
								: $.each(this, function(i, elem){elem.innerText = text});
		},


		// ===============================  事件

		// 绑定事件委托   selector 只包括 元素（如div），class名
		on: function(types, selector, fn){
			if(!fn){
				fn = selector;
				selector = undefined;
			};
			return $.each(this, function(i, elem) {
				$.event.add( elem, types, fn, selector );
			});
		},
		// 解除绑定事件
		off: function(types, selector, fn){
			if(!fn){
				fn = selector;
				selector = undefined;
			};
			return $.each(this, function(i, elem) {
				$.event.remove( elem, types, fn, selector );
			});
		},

		// ==================================  数据存储

		// 获取与添加数据   
		data: function(name, value, typeName){
			var index, jqNameObj, typeNameObj,
				jqName = 'jQuery';
				typeName = typeName || 'data';

			if(value === undefined){
				index = this.hasData(name, typeName);
				return  index !== -1? this[index][jqName][typeName][name] : undefined;
			}

			return $.map(this, function(i, elem){
				jqNameObj = elem[jqName] || (elem[jqName] = {}),
			 	typeNameObj = jqNameObj[typeName] || (elem[jqName][typeName] = {});
					
				elem[jqName][typeName][name] = value;
				return elem;
			});
		},
		// 删除存储数据
		removeData: function(name, typeName){
			var jqName = 'jQuery';
				typeName = typeName || 'data';

			return $.map(this, function(i, elem){
				if($(elem).hasData(name, typeName) !== -1){
					delete elem[jqName][typeName][name];
				}
				return elem;
			});
		},
		// 检验是否存在数据
		hasData: function(name, typeName){
			var jqName = 'jQuery';
			typeName = typeName || 'data';

			for (var i = 0; i < this.length; i++) {
				if(this[i][jqName] && this[i][jqName][typeName] &&  this[i][jqName][typeName][name]) return i;
			}
			return -1;
		},

		// ==================================  样式

		// css
		css: function(name, value){
			value === undefined ?  return $.getStyle(elem).getPropertyValue(name) :
				return $.each(this, function(i, elem){
					
				});
		},

	};
 
	// =============================== 静态方法 (兼容IE8)

	// 遍历迭代
	$.each = function(array, fn){
		for (var i = 0, len = array.length; i < len; i++) {
			fn.call(array[i], i, array[i], array);
		}
		return array;
	};

	// 返回一个新数组
	$.map = function(array, fn){
		var result = [];
		for (var i = 0, len = array.length; i < len; i++) {
			result.push(fn.call(array[i], i, array[i], array));
		}
		return result;
	};

	// 转化成真正的数组
	$.toArray = function(array){
		return slice.call(array, 0);
	};

	// 去除字符串两段的空格
	$.trim = function(value){
		return String.prototype.trim ? value.trim() : value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};

	// 判断是否是数组
	$.isArray = function(arg){
		return Array.isArray ? Array.isArray(arg) : Object.prototype.toString.call(arg) === '[object Array]';
	};

	// 事件
	$.event = {
		// 绑定事件
		add: function(elem, types, handler, selector){
			types = types.split(" ");

			$.each(types, function(i, type){

				if ( elem.addEventListener ) {
					elem.addEventListener( type, handler, false );
				}else if( elem.attachEvent ) {
					elem.attachEvent( "on" + type, handler );
				}
			});
			
		},
		// 解绑事件
		remove: function(elem, types, handler, selector){
			types = types.split(" ");

			$.each(types, function(i, type){
				if ( elem.removeEventListener ) {
					elem.removeEventListener( type, handler, false );
				}else if( elem.detachEvent ) {
					elem.detachEvent( "on" + type, handler );
				}
			});
			
		},
	};


	// 获取css样式
	$.getStyle = function(elem){
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};


	window.jQuery = window.$ = $;

	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function() {
			return $;
		});
	}
    
})(window);