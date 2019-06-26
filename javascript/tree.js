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

/**
  * 列表数据转化成tree结构
  * 
  * json   tree数据
  * nodeId  nodeId
  */
function getTreeNode(json, nodeId) {
    let node = null;          // 获取的子节点
    let code = 'label';          //  匹配的属性
    let children = 'children';    //  包含子节点的属性

    /**
     * 根据 NodeID 查找当前节点以及父节点
     * json    数据源
     * nodeId  匹配的值
     */
    let getNode = (json, nodeId) => { 
        for (let i = 0; i < json.length; i++) {
            let obj = json[i];
            if (!nodeId) break;
            if (!obj || !obj[code]) continue;
            if (obj[code] == nodeId) {
                node = obj;
                break;
            } else {
                if (obj[children]) {
                    getNode(obj[children], nodeId);
                } else {
                    continue;
                }
            }
        }
        return node;
    }

    return getNode(json, nodeId);
};