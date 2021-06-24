/**
 * 基于双重循环数组去重
 */
function unique(arr) {
  const res = [];
  const n1 = arr.length;
  for (let i = 0; i < n1; i++) {
    const n2 = res.length;
    for (let j = 0; j < n2; j++) {
      if (arr[i] === res[i]) break;
    }
    if (j === n2) res.push(arr[i]);
  }
  return res;
}

/**
 * 基于 indexOf 数组去重
 */
function unique(arr) {
  const res = [];
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let cur = arr[i];
    if (res.indexOf(cur) === -1) {
      res.push(cur);
    }
  }
  return res;
}

/**
 * 先排序后去重
 */
function unique(arr) {
  const res = [];
  arr.sort((a, b) => a - b);
  let pre;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i] !== pre) {
      res.push(arr[i]);
    }
    pre = arr[i];
  }
  return res;
}

/**
 * 基于 filter 数组去重
 */
function unique(arr) {
  return arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
}

/**
 * 基于 Object 键值对数组去重
 */
function unique(arr) {
  const obj = {};
  return arr.filter((item, index) => {
    if (!obj.hasOwnProperty(item)) {
      obj[item] = true;
      return true;
    }
    return false;
  });
}

/**
 * 基于 Set 数组去重
 */
function unique(arr) {
  return Array.from(new Set(arr));
}

function unique(arr) {
  const map = new Map();
  return arr.filter((item) => {
    if (!map.has(item)) {
      map.set(item, true);
      return true;
    }
    return false;
  });
}
