var page = require('./util/page');

/**
 * 渲染首页
 * 
 * @param {any} req 
 * @param {any} res 
 */
function indexRender(req, res){
    page.jump(req, res, 'index');
}

exports.indexRender = indexRender;