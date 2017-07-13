var request = require('request'),
    page = require('../util/page');

/**
 * 渲染 /request 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function requestRender(req, res){
    page.jump(req, res, 'request/index');
}


/**
 * 服务器获取跨域数据
 * 
 * @param {any} req 
 * @param {any} res 
 */
function requestGetRender(req, res){
    request.get('http://nodejs.cn/node/api_count?show=1', function(err, respone, result){
        // console.log(result);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(result);
    });
}

exports.requestRender = requestRender;
exports.requestGetRender = requestGetRender;