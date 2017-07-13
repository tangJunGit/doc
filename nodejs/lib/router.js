// 路由模块处理
var url = require('url'),
    page = require('./util/page');
    
/**
 * 路由
 * 
 * @param {any} req 
 * @param {any} res 
 */
function router(req, res, pathname){
    // 根据用户请求的 url 路径，截取 module 和 controller
    // url  /index?c=render   调用index模块的render方法，默认为render方法
    var pathnames = pathname.split('/').filter(function(v){return v !== ''}),
        module = pathnames.shift() || 'index',              // 获取请求模块
        controller, moduleObj;
    
    // 获取请求模块的方法
    controller = pathnames.map(function(v, i){  
        return v = v.substr(0, 1).toUpperCase() + v.substr(1)
    }).join('');
    controller = module + controller + 'Render';            // 调用的方法名  url: /dns   方法名：dnsRender()

    // 捕获异常
    try {
        moduleObj = require('./'+module);                   // require 模块
    } catch (error) {
        console.log('调用模块错误：'+error);
    }

    if(moduleObj && moduleObj[controller]){      
        moduleObj[controller].call(null, req, res);         // require 成功，实现类中的方法调用执行
    }else{
        console.log(moduleObj);
        console.log('调用'+module+'模块的'+controller+'方法错误');
        page.jump(req, res, '404');                         // 跳转到404页面
    }
}

module.exports = router;
