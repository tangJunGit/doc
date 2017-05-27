// ================= demo
// 加载地图
function loadMap(){
	var point = new BMap.Point(104.071216, 30.576279);
	var map = new BaiduMap('mapContainer', point);

	// 根据IP定位
	// mapControl.locationByIp(function(result){
	// 	var map = new BaiduMap('mapContainer', result.center);
	// });
	
}

