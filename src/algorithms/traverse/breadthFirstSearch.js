// 广度优先遍历（非递归版）
function breadthFirstSearch(node) {
  var nodeList = [];

  if (node != null) {
    var queue = [];
    queue.push(node);

    var current;
    while (queue.length > 0) {
      current = queue.shift();
      nodeList.push(current);
      var children = current.children;
      for (var i = 0; i < children.length; i++) {
        queue.push(children);
      }
    }
  }

  return nodeList;
}