// Product A
var util = require('util'),
    Product = require('./product');

function ProductA(){
    Product.call(this);
    this.getProduct = function(){
        console.log('Product A');
    }
}

util.inherits(ProductA, Product);
module.exports = ProductA;