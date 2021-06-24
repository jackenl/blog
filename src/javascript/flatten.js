/**
 * 基于递归数组扁平化
 */
function flatten(arr) {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      res.res.concat(flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
}

/**
 * 基于 toString 数组扁平化
 */
function flatten(arr) {
  return arr.toString().split(',').map((item) => {
    return +item;
  });
}

/**
 * 基于 reduce 数组扁平化
 */
function flatten(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

/**
 * 基于扩展运算符数组扁平化
 */
function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}