var fs = require('fs'),
    url = require('url');

/**
 * 响应html页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function goIndex(req, res){
    var readPath = 'public/'+url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);
    res.end(indexPage);
}

exports.goIndex = goIndex;