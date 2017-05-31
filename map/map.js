/** ====== 百度地图 ========= **/

/**
 * 构造器
 */
function BaiduMap(id, point){
	if(!id) return;
	this.bmap = undefined;          // map实例化对象
	this.controls = {};              // 存放控件数组
	this.overlays = {};              // 存放覆盖物数组
	return this.init(id, point);
}

/**
 * 初始化
 * 
 * id  选择器
 * point   位置坐标
 */
BaiduMap.prototype.init = function(id, point){
	this.bmap = new BMap.Map(id, {enableMapClick:false});    
	this.bmap.centerAndZoom(point, 12);
	this.bmap.enableScrollWheelZoom(true); 
	return this;
};

// ===================  地图显示

/**
 * 获取地图显示范围
 * 
 */
BaiduMap.prototype.getBounds = function() {
	return this.bmap.getBounds();       
};


/**
 * 测距
 * 
 */
BaiduMap.prototype.getDistance = function(pointA, pointB) {
	return this.bmap.getDistance(pointA, pointB).toFixed(2);
};




// ===================  控件

/**
 * 添加控件
 * 
 * controls {name: 别名，control: 对象}  控件对象
 */
BaiduMap.prototype.addControls = function(controls) {
	var currKeys = Object.keys(this.controls);
	var keys = Object.keys(controls);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = keys[i];
		if(currKeys.indexOf(name) === -1) {
			this.bmap.addControl(controls[keys[i]]);
			this.controls[name] = controls[name];
		}
		
	}
	return this;
};

/**
 * 删除控件
 * 
 * controls  控件名字的数组
 */
BaiduMap.prototype.removeControls = function(controls) {
	var currKeys = Object.keys(this.controls);

	for (var i = 0, len = controls.length; i < len; i++) {
		var name = controls[i];
		if(currKeys.indexOf(name) !== -1) {
			this.bmap.removeControl(this.controls[name]);
			delete this.controls[name];
		}
	}
	return this;
};


// ===================  覆盖物

/**
 * 添加覆盖物
 * 
 * overlays {name: 别名，overlay: 对象}  覆盖物对象
 */
BaiduMap.prototype.addOverlays = function(overlays) {
	var currKeys = Object.keys(this.overlays);
	var keys = Object.keys(overlays);

	for (var i = 0, len = keys.length; i < len; i++) {
		var name = keys[i];
		if(currKeys.indexOf(name) === -1) {
			this.bmap.addOverlay(overlays[keys[i]]);
			this.overlays[name] = overlays[name];
		}
		
	}
	return this;
};

/**
 * 删除覆盖物
 * 
 * overlays  控件名字的数组
 */
BaiduMap.prototype.removeOverlays = function(overlays) {
	var currKeys = Object.keys(this.overlays);

	for (var i = 0, len = overlays.length; i < len; i++) {
		var name = overlays[i];
		if(currKeys.indexOf(name) !== -1) {
			this.bmap.removeOverlay(this.overlays[name]);
			delete this.overlays[name];
		}
	}
	return this;
};

/**
 * 删除所有覆盖物
 * 
 */
BaiduMap.prototype.clearOverlays = function() {
	this.bmap.clearOverlays(); 
	this.overlays = {}; 
	return this;
};



// ===================  定位
/**
 * 根据IP定位
 * 
 * callback  回调函数
 */
BaiduMap.prototype.localCityByIp = function(callback) {
	var city = new BMap.LocalCity();
	city.get(callback);
	return this;
};


// ====================   Polyfill

/**
 * Object.keys
 */
if (!Object.keys) Object.keys = function(o) {
  var k=[],p;
  for (p in o) if (Object.prototype.hasOwnProperty.call(o,p)) k.push(p);
  return k;
}


