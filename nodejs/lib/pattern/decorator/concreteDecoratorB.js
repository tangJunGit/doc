// decorator B
var util = require('util'),
    Decorator = require('./decorator');

function concreteDecoratorB(){
    Decorator.call(this);
    this.operation = function(){
        console.log('add Decorator B');
    }
    this.addedBehavior = function(){
        console.log('add Method B');
    }
}

util.inherits(concreteDecoratorB, Decorator);
module.exports = concreteDecoratorB;