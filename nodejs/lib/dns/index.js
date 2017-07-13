var page = require('../util/page'),
    {parseDns} = require('./parseDns');

/**
 * 渲染 /dns 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function dnsRender(req, res){
    page.jump(req, res, 'dns/index');
}

/**
 * 渲染 /dns/parse 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function dnsParseRender(req, res){
    parseDns(req, res);
}

exports.dnsRender = dnsRender;
exports.dnsParseRender = dnsParseRender;