var url = require('url'),
    qs = require('querystring');

/**
 * 获取GET的参数
 * 
 * @param {any} req 
 * @param {any} key 
 * @returns 
 */
function GET(req, key){
    var paramStr = url.parse(req.url).query,
        param = qs.parse(paramStr);

    return key? param[key] : param;
}

/**
 * 获取POST的参数
 * 
 * @param {any} req 
 * @param {any} key 
 * @returns 
 */
function POST(req, key, callback){
    if(!callback){
        callback = key;
        key = undefined;
    }
    var postData = '';
    req.on('data', function(chunk){
        postData+=chunk;
    });

    req.on('end', function(){
        var param = qs.parse(postData),
            value = key? param[key] : param;
        callback(value);
    });
}

exports.GET = GET;
exports.POST = POST;