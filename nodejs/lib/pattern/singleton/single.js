// 单例模式
var _instance = null;

module.exports = function (time) {
    function Class(time){
        this.name = 'tangjun';
        this.book = 'Node.js';
        this.time = time;
    }    
    Class.prototype = {
        constructor: Class,
        show: function(){
            console.log(this.book + '是' + this.name + '在' + this.time + '写的');
        }
    }

    this.getInstance = function(){
        if(_instance === null){
            _instance = new Class(time);
        }
        return _instance;
    }
}