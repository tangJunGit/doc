// 路由模块处理
var ParseDns = require('./parse_dns.js'),
    MainIndex = require('./main_index.js');

/**
 * 路由
 * 
 * @param {any} req 
 * @param {any} res 
 * @param {any} pathname 
 */
function router(req, res, pathname){
    switch(pathname){
        case '/parse':
            ParseDns.parseDns(req, res);        // 执行DNS解析
            break;
        default:
            MainIndex.goIndex(req, res);        // 响应html页面到客户端
    }    
}
exports.router = router;