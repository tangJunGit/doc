var fs = require('fs'),
    mime = require('mime'),
    CONF = require('../../conf');

/**
 * 获取静态文件
 * 
 * @param {any} res 
 * @param {any} path 
 */
function getStaticFile(req, res, pathname){
    var realPath = CONF.STATIC + pathname;          // 静态文件路径

    fs.exists(realPath, function(exists){
        // 判断文件是否存在
        if(exists){
            var mimeType = mime.lookup(realPath),
                lastModified;

            if(mimeType){
                lastModified = setFileCache(realPath, res);          // 设置缓存
            }

            // 判断文件是否修改过
            // 通过请求头的修改文件时间与服务器修改文件时间
            if(req.headers['if-modified-since'] && lastModified == req.headers['if-modified-since']){
                res.writeHead(304, 'Not Modified');                 // 文件未修改，返回 304
                res.end();
            }else{
                fs.readFile(realPath, 'binary', function(err, file){
                    if(err){
                        res.writeHead(500, {'Content-Type': 'text/plain'});
                        res.end(err);
                    }else{
                        res.setHeader('Last-Modified', lastModified);
                        res.writeHead(200, {'Content-Type': mimeType});   // 引用 mime 模块
                        res.end(file, 'binary');
                    }
                });
            }

        }else{
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end();
        }
    });

}

/**
 * 设置静态文件缓存
 * 
 * @param {any} file 
 */
function setFileCache(realPath, res){
    var fileInfo = fs.statSync(realPath),                   // 获取文件信息
        lastModified = fileInfo.mtime.toUTCString(),        // 获取文件最近被修改的时间
        date = new Date();
    
    date.setTime(date.getTime() + CONF.CACHE_TIME * 1000);
    res.setHeader('Expires', date.toUTCString());
    res.setHeader('Cache-Control', 'max-age='+ CONF.CACHE_TIME);

    return lastModified;
}

exports.getStaticFile = getStaticFile;



