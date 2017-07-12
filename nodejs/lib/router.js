// 路由模块处理
var {parseDns} = require('./parse_dns.js'),
    {parseForm} = require('./formidable.js'),
    {requestGet} = require('./request.js'),
    {goPage} = require('./go_page.js');

/**
 * 路由
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} pathname 
 */
function router(req, res, pathname){
    var method = req.method.toLowerCase();
    if(method === 'post'){
        switch(pathname){
            case '/dns/parse':
                parseDns(req, res);                                 // 执行DNS解析
                break;
            case '/formidable/upload':                              // 上传
                parseForm(req, res);
                break;
        }  
    }else if(method === 'get'){
        switch(pathname){
            case '/request/get':
                requestGet(req, res);                              // Request模块请求数据
                break;
            default:
                if(pathname === '/') pathname = 'index';
                goPage(req, res, pathname);                         // 响应 html, css, js 静态文件
                break;
        }  
    }  
}
exports.router = router;