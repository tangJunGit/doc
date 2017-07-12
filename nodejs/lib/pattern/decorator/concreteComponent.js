// 继承类      类中的属性和方法
var util = require('util'),
    Component = require('./component');

function concreteComponent(){
    Component.call(this);
    this.operation = function(){
        console.log('output by the concrete Component');
    }
}

util.inherits(concreteComponent, Component);
module.exports = concreteComponent;