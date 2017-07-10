var http = require('http'),
    url = require('url');

// 路由模块
var {router} = require('./lib/router.js');

// socket模块
var socket = require('./lib/socket.js');

// 创建服务器
var server = http.createServer(function(req, res){
    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    router(req, res, pathname);
});

socket.listen(server);
server.listen(3001);
console.log('Server running at http://http://localhost:3001/');
