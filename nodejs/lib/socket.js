var socketio = require('socket.io');

exports.listen = function(server){
    var io = socketio.listen(server);               // 启动socket.io搭建在已有的HTTP上

    io.sockets.on('connection', function(socket){
        socket.emit('news', {hello: 'world'});      // 连接成功向客户端发送个 news 消息

        socket.on('event', function(data){          // 接受客户端 event 消息
            console.log(data);
        });
    });
}