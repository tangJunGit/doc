var jade = require('jade'),
    CONF = require('../../conf');

/**
 * 响应html页面
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} url         jade 文件地址
 * @param {any} params      jade 参数
 */
function jump(req, res, url, params, callback){
    var readPath = CONF.STATIC + '/view/'+url+'.jade'; 
    var data = jade.renderFile(readPath, params);           // 解析jade文件，并返回 html

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(data);
    if(callback) callback();
}

exports.jump = jump;