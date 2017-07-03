var time = {
    /**
     * 格式化时间
     *
     * time UNIX时间戳 可选
     * 返回时间 格式：yyyy-MM-dd HH:mm:ss 
     */
    dateFormat: function (time) { 
        var d = time ? new Date(parseInt(time)) : new Date();
        var month = d.getMonth() + 1;
        var day =  d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();
        var second = d.getSeconds();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return d.getFullYear() + '-' + month + '-' +  day + ' ' + hour + ':' + minute + ':' + second; 
    }
};