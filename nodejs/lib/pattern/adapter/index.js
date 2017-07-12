// $ node lib/pattern/adapter/index.js

var Adapter = require('./adapter.js');

var target = new Adapter();
target.request();               // => Adaptee::specialRequest