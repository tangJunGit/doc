var formidable = require('formidable'),
    fs = require('fs'),
    page = require('../util/page'),
    CONF = require('../../conf');

/**
 * 图片上传
 * 
 * @param {any} req 
 * @param {any} res 
 */
function upload(req, res){
    var timestamp = Date.parse(new Date()),
        form = new formidable.IncomingForm({        // new 一个 form 对象
            encoding: 'utf-8'
        });  

    form.parse(req, function(err, fields, files){           // 解析 POST 数据. fields为POST数据，files为文件对象
        var UPLOAD_DIR = '/images/upload/',                 // 图片保存的文件夹（相对项目的路径）
            fileName = timestamp +'_'+ files.image.name,    // 图片的名字
            imgSrc = CONF.STATIC + UPLOAD_DIR + fileName;   // 图片保存的文件夹（绝对路径）
        
        
        // 跨分区重命名文件，会有权限问题 
        // fs.renameSync(files.image.path, imgSrc);         // Error: EXDEV: cross-device link not permitted, rename   

        // 解决办法：
        var readStream = fs.createReadStream(files.image.path),
            writeStream = fs.createWriteStream(imgSrc);       

        readStream.pipe(writeStream);
        readStream.on('end', function() {
            page.jump(req, res, 'images/showImg', {imgSrc: UPLOAD_DIR + fileName});
            fs.unlinkSync(files.image.path);                // 删除临时图片
        });
        
    });
    return;
}

exports.upload = upload;
