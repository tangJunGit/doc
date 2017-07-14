var util = require('util'),
    page = require('../util/page'),
    {upload} = require('./upload');

/**
 * 渲染 /images 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function imagesRender(req, res){
    page.jump(req, res, 'images/index');
}

/**
 * 渲染 /images/upload 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function imagesUploadRender(req, res){
    upload(req, res);
}

exports.imagesRender = imagesRender;
exports.imagesUploadRender = imagesUploadRender;
