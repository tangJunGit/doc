var gulp = require('gulp'),
    browserSync = require('browser-sync').create();

// 代理配置
// var proxyMiddleware = require('http-proxy-middleware'),
// 	proxy = proxyMiddleware(
// 		'/xx', {target: 'http://10.9.42.203:29776'}        
// 	);

    
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            index: 'index.html',
            // middleware: [proxy]         
        },
        port: 3002
    });

});