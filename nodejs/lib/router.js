// 路由模块处理
var {parseDns} = require('./parse_dns.js'),
    {goPage} = require('./go_page.js');

/**
 * 路由
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} pathname 
 */
function router(req, res, pathname){
    switch(pathname){
        case '/dns/parse':
            parseDns(req, res);                                 // 执行DNS解析
            break;
        default:
            if(pathname === '/') pathname = 'index';
            goPage(req, res, pathname);                         // 响应 html页面
            break;
    }    
}
exports.router = router;