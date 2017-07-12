// 装饰类
var util = require('util'),
    Component = require('./component');

function Decorator(){
    Component.call(this);
}

util.inherits(Decorator, Component);
module.exports = Decorator;