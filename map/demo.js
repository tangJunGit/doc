// ================= demo
// 加载地图
function loadMap(){
	// 实例化
	var point = new BMap.Point(104.071216, 30.576279);
	map = new BaiduMap('mapContainer', point);
		
	// 根据IP定位
	map.localCityByIp(function(result){
		map.bmap.setCenter(result.name);
	});

	// 获取地图显示范围
	var bs = map.getBounds();
	var sw = bs.getSouthWest();   		//可视区域左下角
	var ne = bs.getNorthEast();   		//可视区域右上角
	// console.log("当前地图可视范围是：" + sw.lng + "," + sw.lat + "到" + ne.lng + "," + ne.lat);


	// 测距
	var pointA = new BMap.Point(104, 30);
	var pointB = new BMap.Point(105, 31);
	var d = map.getDistance(pointA, pointB);
	// console.log('两点距离是：'+ d + '米');


// ==========================================================================================
	var geolocation = new BMap.GeolocationControl();						//左下角，添加定位控件
	var navigation = new BMap.NavigationControl();							//左上角，添加默认缩放平移控件
	var cityList = new BMap.CityListControl({           					//左上角，添加城市列表控件
				    anchor: BMAP_ANCHOR_TOP_LEFT, 
				    offset: new BMap.Size(80, 15)          
				})

	window.demo = {
		// 添加控件
		addControls: function(){ 
			map.addControls({
				'cityList': cityList,
				'navigation': navigation,        					
				'geolocation': geolocation						
			})
		},

		// 删除控件
		removeControls: function(){
			map.removeControls(['cityList'])
		},

		// 添加覆盖物
		addOverlays: function(){
			map.addOverlays({
				'marker': new BMap.Marker(point)
			});
		},

		// 删除覆盖物
		removeOverlays: function(){
			map.removeOverlays(['marker'])
		},

		// 删除所有覆盖物
		clearOverlays: function(){
			map.clearOverlays();
		},
	};
}


