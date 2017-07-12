var ProductA = require('./productA'),
    ProductB = require('./productB');

exports.createProduct = function(type){
    switch (type) {
        case 'ProductA':    
            return new ProductA();
        default:
        case 'ProductA':
            return new ProductB();
    }
}