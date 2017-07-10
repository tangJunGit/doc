var fs = require('fs'),
    url = require('url'),
    jade = require('jade');

/**
 * 响应html页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function goPage(req, res, url, params){
    var readPath = 'public/view/'+url;                  // jade文件路径从public/view/下开始
    var html = jade.renderFile(readPath+'.jade', params);
    // var html = fs.readFileSync(readPath+'.html');
    res.end(html);
}

exports.goPage = goPage;