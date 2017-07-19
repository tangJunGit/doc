// 基类
var util = require('./util'),
    mongodb = require('mongodb'),
    mongoClient = mongodb.MongoClient,
    db;

/**
 * 连接数据库
 * 
 * @param {any} callback 
 */
function connection(callback){
    if(!db){
        // 获取 mongodb 配置信息
        var dbConfig = util.get('config.json', 'db'),
            host = dbConfig['host'],
            port = dbConfig['port'],
            user = dbConfig['user'],
            password = dbConfig['password'],
            dbName = dbConfig['db_name'];

        // var DB_CONN_STR = 'mongodb://'+ user +':'+ password +'@'+ host +':'+ port +'/'+ dbName;
        var DB_CONN_STR = 'mongodb://'+ host +':'+ port +'/'+ dbName;

        mongoClient.connect(DB_CONN_STR, function(err, dbObject) {
            if(err){
                console.log("connection fails");
            }else{
                db = dbObject;
                callback(db);
                console.log("connection success");
            }
        });
    }else{
        callback(db);
    }
}

module.exports = function(){
    _constructor();

    // 数据查询接口
    this.findOneById = function(tableName, id, callback) {
        var self = this;
        connection(function(db){
            var collection = db.collection(tableName),
                mongoId = mongodb.ObjectID(id);          // 将 id 字符串转化成 mongodb 的 ObjectId
            
            var cursor = collection.find({_id: mongoId});       // 查询对象

            cursor.toArray(function(err, result){               // 查询结构转化成数组
                if(err){
                    callback(false);
                }else{
                    var row = {};
                    if(result){
                        row = self.filterSeltRow(result.shift());       // 过滤对象中的 _id，将其转化成 id
                    }
                    callback(row);
                }
            });

            cursor.rewind();            // 重置对象
        });
    };

    // 数据插入接口
    this.insert = function(tableName, rowInfo, callback) {
        connection(function(db){
            //连接到表 
            var collection = db.collection(tableName);

            collection.insert(rowInfo, function(err, result) { 
                if(err){
                    console.log('Error:'+ err.message);
                    return;
                }     
                callback(result);
            });
        });
    };

    // 数据修改接口
    this.modify = function(tableName, id, rowInfo, callback) {
        connection(function(db){
            var collection = db.collection(tableName),
                mongoId = mongodb.ObjectID(id);          // 将 id 字符串转化成 mongodb 的 ObjectId
            
            collection.update({_id: mongoId}, rowInfo, {safe: true}, function(err){
                if(err){
                    callback(false);
                }else{
                    callback(true);
                }
            });
        });
    };

    // 数据删除接口
    this.remove = function(tableName, id, callback) {
        connection(function(db){
            var collection = db.collection(tableName),
                mongoId = mongodb.ObjectID(id);          // 将 id 字符串转化成 mongodb 的 ObjectId
            
            collection.remove({_id: mongoId}, function(err){
                if(err){
                    callback(false);
                }else{
                    callback(true);
                }
            });
        });
    };

    // 数据条件查询接口
    this.find = function(tableName, whereJson, orderByJson, limitJson, fieldJson, callback) {
        // ...
    };

    // 数据转化
    this.filterSeltRow = function(rowInfo){
        if(rowInfo['_id']){
            rowInfo['id'] = rowInfo['_id'];
            delete rowInfo['_id'];
        }
        return rowInfo;
    };

    function _constructor(){}
}