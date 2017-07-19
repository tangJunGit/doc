// 公用方法
var fs = require('fs'),
    util = require('util');

// 读取配置文件
exports.get = function(fileName, key){
    var configJson = {};

    try {
        var str = fs.readFileSync(__dirname+'/'+fileName, 'utf8');
        configJson = JSON.parse(str);
    } catch (error) {
        util.debug('JSON parse fails');
    }
    return configJson[key];
}