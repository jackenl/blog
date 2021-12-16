Object.flatten = function (obj) {
  const result = {};

  function recurse(target, prop) {
    if (typeof target === 'object') {
      if (Array.isArray(target)) {
        let len = target.length;
        if (len > 0) {
          for (let i = 0; i < len; i++) {
            recurse(target[i], prop ? prop + '[' + i + ']' : i);
          }
        } else {
          result[prop] = [];
        }
      } else {
        let isEmpty = true;
        for (let key in target) {
          if (target.hasOwnProperty(key)) {
            isEmpty = false;
            recurse(target[key], prop ? prop + '.' + key : key);
          }
        }
        if (prop && isEmpty) {
          result[prop] = {};
        }
      }
    } else if (prop) {
      result[prop] = target;
    }
  }
  recurse(obj, '');
  return result;
}

Object.unFlatten = function (data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data;
  }
  const result = {};
  const regex = /\.?([^.\[\]]+)|\[(\d+)\]/g;
  for (let p in data) {
    let cur = result, prop = '', matches;
    while (matches = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (matches[2] ? [] : {}));
      prop = matches[2] || matches[1];
    }
    cur[prop] = data[p];
  }
  return result[''] || result;
}

// test
const entryObj = {
	a: {
		b: {
			c: {
				dd: 'abcdd'
			}
		},
		d: {
			xx: 'adxx'
		},
		e: 'ae'
	}
}
const flatObj = Object.flatten(entryObj);
const unflatObj = Object.unFlatten(flatObj);
console.log(flatObj, unflatObj);
