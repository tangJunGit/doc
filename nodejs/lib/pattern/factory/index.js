// $ node lib/pattern/factory/index.js

var ProductFactory = require('./productFactory');

var ProductA = ProductFactory.createProduct('ProductA');
ProductA.getProduct();

var ProductB = ProductFactory.createProduct('ProductB');
ProductB.getProduct();