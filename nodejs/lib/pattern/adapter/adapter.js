// 适配器类

var util = require('util'),
    Target = require('./target'),
    Adaptee = require('./adaptee');

function Adapter(){
    Target.call(this);                          // 继承属性
    this.request = function(){                  // 重写方法
        var adapteeObj = new Adaptee();
        adapteeObj.specialRequest();
    }
}

util.inherits(Adapter, Target);                 // 继承方法
module.exports = Adapter;