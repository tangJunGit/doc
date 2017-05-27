window.mapControl = {
	/**
     * 初始化地图
     *
     */
    initMap: function(){
    	window.map = new BMap.Map("mapContainer");    
    	this.locationByIp(function(result){
    		map.setCenter(result.name);
    	});    
    },

    /**
     * 根据浏览器定位
     * 
     */
    locationByBrowser: function(callback) {
	    var geolocation = new BMap.Geolocation();
		geolocation.getCurrentPosition(function(result){
			if(this.getStatus() == BMAP_STATUS_SUCCESS){
				callback(result); 
			}else {
				alert('失败状态码'+this.getStatus());
			}
		}, {enableHighAccuracy: true});
    },

    /**
     * 根据IP定位
     *
     */
    locationByIp: function(callback) {
	    var city = new BMap.LocalCity();
		city.get(callback);
    }
};