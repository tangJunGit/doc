var dns = require('dns'),
    qs = require('querystring'),
    page = require('../util/page');

/**
 * 获取 post 参数，并解析Dns
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
            var dns = {
                domain: domain,
                addresses: addresses
            };
            page.jump(req, res, 'dns/parseDns', {dns: dns});
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
    var domain = qs.parse(postData).search_dns;            // 获取表单的DNS

    dns.resolve(domain, function(err, addresses){
        if(!addresses) addresses = ['不存在域名'];
        callback(domain, addresses);
    });
}

exports.parseDns = parseDns;