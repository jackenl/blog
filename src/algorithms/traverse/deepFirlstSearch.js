// 深度优先搜索（递归版本）
function deepFirstSearch(node, nodeList) {
  if (node != null) {
    nodeList.push(node);
    var children = node.children;
    for (var i = 0; i < children.length; i++) {
      deepFirstSearch(children[i], nodeList);
    }
  }

  return nodeList;
}

// 深度优先搜索（非递归版）
function deepFirstSearch(node) {
  var nodeList = [];

  if (node != null) {
    var stack = [];
    stack.push(node);

    var current;
    while (stack.length > 0) {
      current = stack.pop();
      nodeList.push(current);
      var children = current.children;
      for (var i = children.length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }

  return nodeList;
}