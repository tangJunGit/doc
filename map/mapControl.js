/** ====== 百度地图 ========= **/

/**
 * 构造器
 * 
 * id  选择器
 * point   位置坐标
 */
function BaiduMap(id, point){
	if(!id) return;
	this.map = new BMap.Map(id, {enableMapClick:false});    
	this.map.centerAndZoom(point, 12);
	this.map.enableScrollWheelZoom(true); 
}


var mapControl = {
	/**
	 * 根据IP定位
	 */
	locationByIp: function(callback) {
		var city = new BMap.LocalCity();
		city.get(callback);
	}
};



