var util = require('util'),
    formidable = require('formidable'),
    page = require('../util/page'),
    {parseForm} = require('./parseForm');

/**
 * 渲染 /formidable 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function formidableRender(req, res){
    page.jump(req, res, 'formidable/index');
}

/**
 * 渲染 /formidable/upload 页面
 * 
 * @param {any} req 
 * @param {any} res 
 */
function formidableUploadRender(req, res){
    parseForm(req, res);
}

exports.formidableRender = formidableRender;
exports.formidableUploadRender = formidableUploadRender;
