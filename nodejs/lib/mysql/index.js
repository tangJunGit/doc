// 测试
// node lib/mysql/index.js
var BaseModel = require('./BaseModel');

// 测试连接
var baseModel = new BaseModel();     
var tableName = 'node_book';       


// ------------------------------
// 测试插入数据到数据库
// var rowInfo = {
//     book_name: 'nodejs book',
//     author: 'jun'
// };

// baseModel.insert(tableName, rowInfo, function(result){
//     console.log(result);
// });


// ------------------------------
// 测试通过 id 查询
// var idJson = {
//     book_id: 1
// };

// baseModel.findOneById(tableName, idJson, function(result){
//     console.log(result);
// });

// ------------------------------
// 测试更新操作
// var idJson = {
//     book_id: 2
// };

// var rowInfo = {
//     book_name: 'nodejs book by jun',
//     author: 'tang jun'
// };

// baseModel.modify(tableName, idJson, rowInfo, function(result){
//     console.log(result);
// });



// ------------------------------
// 测试删除操作
// var idJson = {
//     book_id: 2
// };


// baseModel.remove(tableName, idJson, function(result){
//     console.log(result);
// });