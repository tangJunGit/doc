// 测试
// node lib/mongodb/index.js
var BaseMongoDB = require('./BaseMongoDB');

// 测试连接
var baseMongoDB = new BaseMongoDB();     
var tableName = 'node_book';       


// ------------------------------
// 测试插入数据到数据库
// var rowInfo = {
//     book_name: 'nodejs book2',
//     author: 'jun'
// };

// baseMongoDB.insert(tableName, rowInfo,  function(result){
//     console.log(result);
// });


// ------------------------------
// 测试修改数据到数据库
// var rowInfo = {
//     book_name: 'nodejs book by jun',
//     author: 'tang'
// };

// var id = '596ee6545f13541b78d518e8';

// baseMongoDB.modify(tableName, id, rowInfo,  function(result){
//     console.log(result);
// });


// ------------------------------
// 测试查询数据到数据库
// var id = '596ee6545f13541b78d518e8';

// baseMongoDB.findOneById(tableName, id,  function(result){
//     console.log(result);
// });

// ------------------------------
// 测试删除数据到数据库
// var id = '596ee6545f13541b78d518e8';

// baseMongoDB.remove(tableName, id,  function(result){
//     console.log(result);
// });