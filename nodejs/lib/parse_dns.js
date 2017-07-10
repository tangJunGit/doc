var dns = require('dns'),
    querystring = require('querystring');

var {goPage} = require('./go_page.js');
/**
 * 解析DNS
 * 
 * @param {any} req 
 * @param {any} res 
 */
function parseDns(req, res){
    var postData = '';
    req.on('data', function(chunk){
        postData+=chunk;
    });

    req.on('end', function(){
        getDns(postData, function(domain, addresses){
            res.writeHead(200, {'Content-Type': 'text/html'});
            var dns = {
                domain: domain,
                addresses: addresses
            };
            goPage(req, res, 'dns/parse_dns', {dns: dns});
            return;
        });
    });
}

/**
 * 获取Dns
 * 
 * @param {any} postData 
 * @param {any} callback 
 */
function getDns(postData, callback){
    var domain = querystring.parse(postData).search_dns;            // 获取表单的DNS

    dns.resolve(domain, function(err, addresses){
        if(!addresses) addresses = ['不存在域名'];
        callback(domain, addresses);
    });
}

exports.parseDns = parseDns;