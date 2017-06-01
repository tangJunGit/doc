// ================= demo
// 加载地图
function loadMap(){
	// 实例化
	var point = new BMap.Point(104.071216, 30.576279);
	var point2 = new BMap.Point(104.084159, 30.66232);
	var map = new BaiduMap('mapContainer', point);
		
	var geolocation = new BMap.GeolocationControl();						//左下角，添加定位控件
	var navigation = new BMap.NavigationControl();							//左上角，添加默认缩放平移控件
	var cityList = new BMap.CityListControl({           					//左上角，添加城市列表控件
				    anchor: BMAP_ANCHOR_TOP_LEFT, 
				    offset: new BMap.Size(80, 15)          
				});

	var marker = new BMap.Marker(point); 
	var marker2 = new BMap.Marker(point2); 

	window.demo = {
		// 逆地址解析
		getLocation: function(){
			mapControl.getLocation(point2, function(result){
				var addComp = result.addressComponents;
				alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " 
					+ addComp.street + ", " + addComp.streetNumber);
			});
		},

		// 地址解析
		getPoint: function(){
			mapControl.getPoint('春熙路', function(point){
				map.bmap.centerAndZoom(point, 16);
				map.addOverlays({'marker3': new BMap.Marker(point)});
			}, '成都市');
		},

		// 根据IP定位
		getLocalCityByIp: function(){
			mapControl.getLocalCityByIp(function(result){
				map.bmap.setCenter(result.name);
			});
		},

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
				'marker': marker,
				'marker2': marker2
			}, function(name, marker, rs){
				var sContent = '<p>name: '+ name +'</p>';
				var infoWindow = new BMap.InfoWindow(sContent);
				marker.openInfoWindow(infoWindow);
			});
		},

		// 删除覆盖物
		removeOverlays: function(){
			map.removeOverlays(['marker2'])
		},

		// 删除所有覆盖物
		clearOverlays: function(){
			map.clearOverlays();
		},

		// 显示覆盖物
		showOverlays: function(){
			map.showOverlays(['marker2']);
		},

		// 隐藏覆盖物
		hiddenOverlays: function(){
			map.hideOverlays(['marker2']);
		},
	};
}


