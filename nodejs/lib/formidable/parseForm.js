var util = require('util'),
    formidable = require('formidable'),
    page = require('../util/page');

         
var form = new formidable.IncomingForm({        // new 一个 form 对象
    encoding: 'utf-8'
});  

/**
 * 处理上传文件
 * 
 * @param {any} req 
 * @param {any} res 
 */
function parseForm(req, res){
    form.parse(req, function(err, fields, files){           // 解析 POST 数据. fields为POST数据，files为文件对象
        // console.log(fields);
        // console.log(files);
        var formStr = util.inspect({fields: fields, files: files});     // 将 json 对象转化成字符串
        page.jump(req, res, 'formidable/parseForm', {form: formStr});
    });
    return;
}   

exports.parseForm = parseForm;