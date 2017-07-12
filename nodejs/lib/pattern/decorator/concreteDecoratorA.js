// decorator A
var util = require('util'),
    Decorator = require('./decorator');

function concreteDecoratorA(){
    Decorator.call(this);
    this.operation = function(){
        console.log('add Decorator A');
    }
}

util.inherits(concreteDecoratorA, Decorator);
module.exports = concreteDecoratorA;