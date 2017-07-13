var scoket = io.connect('http://localhost:3001');       // 创建连接

scoket.on('news', function(data){           // 接受服务器发送的 news 消息
    console.log(data);

    scoket.emit('event', {my: 'data'});     // 发送到服务器的数据
});

