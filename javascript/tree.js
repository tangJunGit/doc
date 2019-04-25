/**
  * 列表数据转化成tree结构
  * 
  * list   列表数据
  * parentId  父节点id
  * 属性参数 {
  *		id 节点id， parentId 父节点id， children 儿子节点数组
  *	}
  */
function transformListToTree(list, parentId){
    var tree = [];

    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        if (item['parentId'] === parentId) {
            var temp = transformListToTree(list, item['id']);
            if (temp.length) {
                item['children'] = temp;
            }
            tree.push(item);
        }
    }
    
    return tree;
}