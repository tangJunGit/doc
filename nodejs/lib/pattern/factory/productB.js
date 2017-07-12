// Product B
var util = require('util'),
    Product = require('./product');

function ProductB(){
    Product.call(this);
    this.getProduct = function(){
        console.log('Product B');
    }
}

util.inherits(ProductB, Product);
module.exports = ProductB;