// $ node lib/pattern/singleton/index.js

var Single = require('./single');

var singleObj = new Single('2017年5月5日');
var singleClass = singleObj.getInstance();
singleClass.show();             // => Node.js是tangjun在2017年5月5日写的