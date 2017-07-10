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
        readPath = 'public/'+url; 
    if(/.js$/.test(url)){                                   // .js 文件
        data = fs.readFileSync(readPath);
    }else{                                                  // .html 文件
        readPath += '.jade';               
        data = jade.renderFile(readPath, params);           // 解析jade文件，并返回 html
    }
    res.end(data);
}

exports.goPage = goPage;