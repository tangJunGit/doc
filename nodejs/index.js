var http = require('http'),
    url = require('url'),
    socket = require('./lib/socket'),
    file = require('./lib/util/file');
    

// 路由模块
var router = require('./lib/router');

// 创建服务器 
var server = http.createServer(function(req, res){
    var reg = /\.\w+$/,
        pathname = url.parse(req.url).pathname;

    if(!reg.test(pathname)){                                // 调用模块
        router(req, res, pathname);                         // 调用路由的方法
    }else{                                                  // 静态文件
        file.getStaticFile(res, pathname);                  // 调用获取静态文件的方法
    }
});

socket.listen(server);
server.listen(3001);
console.log('Server running at http://http://localhost:3001/   ----------- start ------------');
