var request = require('request');

function requestGet(req, res){
    request.get('http://nodejs.cn/node/api_count?show=1', function(err, respone, result){
        // console.log(result);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(result);
    });
}

exports.requestGet = requestGet;