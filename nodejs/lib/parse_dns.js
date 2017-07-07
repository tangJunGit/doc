var dns = require('dns'),
    querystring = require('querystring');

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
            res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>DNS</title>'+
                    '</head><body><div style="text-align:center">'+
                    '<p>Domain：'+domain+'</p><p>Ip：'+addresses.join(', ')+'</p>'+
                    '</div></body></html>');
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