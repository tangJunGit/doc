// 基类
var util = require('./util'),
    mysql = require('mysql'),
    dbClient;

module.exports = function(){
    _constructor();

    // 数据查询接口
    this.findOneById = function(tableName, idJson, callback) {
        dbClient.query('SELECT * FROM ' + tableName + ' where ?', idJson, function(err, result){
            if(err){
                console.log('Get data Error:' + err.message);
                dbClient.end();
                callback(false);
            }else{
                if(result){
                    callback(result.pop());
                }else{
                    callback(result);
                }
            }
        });
    };

    // 数据插入接口
    this.insert = function(tableName, rowInfo, callback) {
        dbClient.query('INSERT INTO ' + tableName + ' SET ?', rowInfo, function(err, result){
            if(err){
                console.log('Insert Error:' + err.message);
                dbClient.end();
                callback(false);
            }else{
                callback(result.insertId);
            }
        });
    };

    // 数据修改接口
    this.modify = function(tableName, idJson, rowInfo, callback) {
        dbClient.query('UPDATE ' + tableName + ' SET ? where ?', [rowInfo, idJson], function(err, result){
            if(err){
                console.log('Update Error:' + err.message);
                dbClient.end();
                callback(false);
            }else{
                callback(result);
            }
            
        });
    };

    // 数据删除接口
    this.remove = function(tableName, idJson, callback) {
        dbClient.query('DELETE FROM ' + tableName + ' where ?', idJson, function(err, result){
            if(err){
                console.log('Delete Error:' + err.message);
                dbClient.end();
                callback(false);
            }else{
                callback(true);
            }
            
        });
    };

    // 数据条件查询接口
    this.find = function(tableName, whereJson, orderByJson, limitArr, fieldArr, callback) {
        // 复杂代码
    };

    function _constructor(){
        var dbConfig = util.get('config.json', 'db');
        
        // 获取 mysql 配置信息
        var client = {
            host: dbConfig['host'],
            port: dbConfig['port'],
            user: dbConfig['user'],
            password: dbConfig['password']
        };
        
        // 创建 mysql 连接
        dbClient = mysql.createConnection(client);          // 创建对象
        dbClient.connect();                                 // 连接 mysql 服务器

        // 连接 mysql 服务器的一个数据库
        dbClient.query('USE ' + dbConfig['dbName'], function(err, result){
            if(err){
                console.log('connection Error:' + err.message);
                dbClient.end();
            }else{
                console.log('connection local mysql success');
            }
            
        });


    }
}