var fs = require('fs'),
    CONF = require('../../conf');

/**
 * 获取静态文件
 * 
 * @param {any} res 
 * @param {any} path 
 */
function getStaticFile(res, path){
    var data = fs.readFileSync(CONF.STATIC + path);
    res.writeHead(200, {'Content-Type': 'text/plian'});
    res.end(data);
}

exports.getStaticFile = getStaticFile;



