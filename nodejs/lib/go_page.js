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
    var data,
        reg = /\.\w+$/,                                     // 匹配文件拓展名
        readPath = 'public/'+url; 
    if(!reg.test(url)){                                     // .jade 文件
        readPath += '.jade';               
        data = jade.renderFile(readPath, params);           // 解析jade文件，并返回 html
        res.writeHead(200, {'Content-Type': 'text/html'});
    }else{                                                  // 静态文件
        data = fs.readFileSync(readPath);
    }
    res.end(data);
}

exports.goPage = goPage;