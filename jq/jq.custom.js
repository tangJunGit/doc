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
			return $(nodes);
		},

		// ===============================  属性

		// 获取与添加属性
		attr: function(name, value){
			return value == null ? this[0].getAttribute(name)
								: $.each(this, function(i, elem){elem.setAttribute(name.toLowerCase(), value+'')});
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


		// ===============================  操作

		// 从内部最后面插入子节点
		append: function(nodes){
			if(typeof nodes === 'string') nodes = [$.buildFragment(nodes)];
			return $.each(this, function(i, elem){
				$.each(nodes, function(j, node){
					elem.appendChild(node.cloneNode(true));  // 同一个元素无法重复插入，需要克隆一份，不然直接 append 表示移动节点
				});
				
			});
		},
		// 从内部最前面插入节点
		prepend: function(nodes){
			if(typeof nodes === 'string') nodes = [$.buildFragment(nodes)];
			return $.each(this, function(i, elem){
				$.each(nodes, function(j, node){
					elem.insertBefore(node.cloneNode(true), elem.firstChild); 
				});
			});
		},
		// 从外部最前面插入兄弟节点
		before: function(nodes){
			if(typeof nodes === 'string') nodes = [$.buildFragment(nodes)];
			return $.each(this, function(i, elem){
				$.each(nodes, function(j, node){
					elem.parentNode.insertBefore(node.cloneNode(true), elem);  
				});
			});
		},
		// 从外部最后面插入兄弟节点
		after: function(nodes){
			if(typeof nodes === 'string') nodes = [$.buildFragment(nodes)];
			return $.each(this, function(i, elem){
				$.each(nodes, function(j, node){
					elem.parentNode.insertBefore(node.cloneNode(true), elem.nextSibling); 
				});
			});
		},
		// 删除节点
		remove: function(){
			return $.each(this, function(i, elem){
				elem.parentNode.removeChild(elem); 
			});
		},
		// 克隆
		clone: function(deep){
			deep = deep || false;
			var nodes = $.map(this, function(i, elem){
				return elem.cloneNode(deep); 
			});
			return $(nodes);
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
			if(fn === undefined){
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
		// 绑定一次事件
		one: function(types, selector, fn){
			var self = this;
			if(fn === undefined){
				fn = selector;
				selector = undefined;
			};
			return $.each(this, function(i, elem) {
				$.event.add( elem, types, fn, selector, self, true );
			});
		},

		// ==================================  数据存储

		// 获取与添加数据   
		data: function(name, value){
			var index,
				jq = 'jQuery';

			if(value === undefined){
				index = this.hasData(name);
				return  index !== -1? this[index][jq][name] : null;
			}

			return $.map(this, function(i, elem){
				if(!elem[jq]) elem[jq] = {};
				elem[jq][name] = value;
				return elem;
			});
		},
		// 删除存储数据
		removeData: function(name){
			var jq = 'jQuery';

			return $.map(this, function(i, elem){
				if($(elem).hasData(name) !== -1){
					delete elem[jq][name];
				}
				return elem;
			});
		},
		// 检验是否存在数据
		hasData: function(name){
			var jq = 'jQuery';

			for (var i = 0; i < this.length; i++) {
				if(this[i][jq] && this[i][jq] &&  this[i][jq][name]) return i;
			}
			return -1;
		},

		// ==================================  样式

		// css
		css: function(value){
			return typeof value === 'string' ? $.getStyle(this[0], value) :
				$.each($.toArray(this), function(i, elem){
					$.each(value, function(key, val){
						elem.style[key] = val;
					});
				});
		},
		// 隐藏
		hide: function(){
			return this.css({display: 'none'});
		},
		// 显示
		show: function(){
			return this.css({display: 'block'});
		},
	};
 
	// =============================== 静态方法 

	// 创建文档碎片
	$.buildFragment = function(html){
		if (typeof html !== 'string') return '';
		var temp = document.createElement('div');
		temp.innerHTML = html;

		// 防止元素太多 进行提速
		var frag = document.createDocumentFragment();
		while (temp.firstChild) {
			frag.appendChild(temp.firstChild);
		}
		return frag;
	};

	// 遍历迭代
	$.each = function(object, fn){
		if($.isArrayLike(object)){
			var arr = $.toArray(object);
			for (var i = 0, len = arr.length; i < len; i++) {
				fn.call(arr[i], i, arr[i], arr);
			}
		}else if(typeof object === 'object'){
			for (key in object) {
				if(object.hasOwnProperty(key)){
					fn.call(object[key], key, object[key], object);
				}
			}
		}
		return object;
	};

	// 返回一个新数组
	$.map = function(object, fn){
		var result = [];
		if($.isArrayLike(object)){
			var arr = $.toArray(object);
			for (var i = 0, len = arr.length; i < len; i++) {
				result.push(fn.call(arr[i], i, arr[i], arr));
			}
		}else if(typeof object === 'object'){
			for (key in object) {
				if(key >= 0 && object.hasOwnProperty(key)){
					result.push(fn.call(object[key], key, object[key], object));
				}
			}
		}
		return result;
	};

	// 去除字符串两段的空格
	$.trim = function(value){
		return String.prototype.trim ? value.trim() : value.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};

	// 转化成真正的数组
	$.toArray = function(array){
		return slice.call(array, 0);
	};

	// 判断是否是数组
	$.isArray = function(object){
		return Array.isArray ? Array.isArray(object) : Object.prototype.toString.call(object) === '[object Array]';
	};

	// 判断是否是类数组
	$.isArrayLike = function(object){
		var length = object.length;
		return length && typeof length === "number" && ( length - 1 ) in object;
	};

	// 获取css样式表
	$.getStyle = function(elem, name){
		if (elem.style[name]){				// 存在于style[]中
			return elem.style[name];
		}else if(elem.currentStyle){		// IE的方式
			elem.currentStyle[name];
		}else if(document.defaultView && document.defaultView.getComputedStyle){		// W3C的方法
			name = name.replace(/([A-Z])/g,"-$1").toLowerCase();						// 转化成"text-align"风格
			var style = document.defaultView.getComputedStyle(elem, "");    			// 获取style对象
			return style && style.getPropertyValue(name);								// 取得属性的值
		}
		return null;
	};

	// 事件
	$.event = {
		// 绑定事件 
		add: function(elem, types, handler, selector, elems, one){
			var fn, fnData, target;
			types = types.split(" ");

			$.each(types, function(i, type){
				// 处理后的函数
				fn = function(e){
					e = e || window.event; 
					target = e.target || e.srcElement;

					// 处理事件委托的判断
					if( selector === undefined ||                  // 不委托
						target.nodeName.toLowerCase() === selector ||                    // 委托元素
						selector.slice(1) !== '' && target.className.indexOf(selector.slice(1)) !== -1)     // 委托 class
					{
						handler.call(elem, e);
						// 绑定一次解绑
						if(one){
							elems.off(type, handler, selector);
						}
					}
				};

				// 存储函数
				fnData = {
					selector: selector,
					type: type,
					handler: handler,
					fn: fn
				};
				$.event.data(elem, type, fnData);

				// 监听
				if ( elem.addEventListener ) {
					elem.addEventListener( type, fnData.fn, false );
				}else if( elem.attachEvent ) {
					elem.attachEvent( "on" + type, fnData.fn );
				}
			});
		},
		// 解绑事件
		remove: function(elem, types, handler, selector){
			var fnData, j = 0, jq = 'jQuery';
			types = types.split(" ");

			$.each(types, function(i, type){
				fnData = $(elem).data(type);

				// 匹配监听的函数
				while(fnData[j].handler !== handler){
					j++;
				}

				// 取消监听
				if ( elem.removeEventListener ) {
					elem.removeEventListener( type, fnData[j].fn, false );
				}else if( elem.detachEvent ) {
					elem.detachEvent( "on" + type, fnData[j].fn );
				}
				if(fnData[j].handler !== handler){
					elem[jq][type].splice(j, 1);
				}
			});
		},
		// 添加 fn 到 elem
		data: function(elem, type, fn){
			var index,
				jq = 'jQuery';

			if(!elem[jq]) elem[jq] = {};
			if(!elem[jq][type]) elem[jq][type] = [];
			elem[jq][type].push(fn);
			return fn;
		},
	};



	window.jQuery = window.$ = $;

	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function() {
			return $;
		});
	}
    
})(window);