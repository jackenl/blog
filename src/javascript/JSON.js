JSON.stringify = function (value) {
  const valueType = typeof value;

  if (valueType !== 'object') {
    let result = value;
    if (Number.isNaN(value) || value === Infinity) {
      // NaN 和 Infinity 序列化返回 "null"
      result = "null"
    } else if (valueType === 'function' || valueType === 'undefined' || valueType === 'symbol') {
      // function 、undefined 、symbol 序列化返回 undefined
      return undefined;
    } else if (valueType === 'string') {
      result = '"' + value + '"';
    }
    return String(result);
  } else {
    if (value === null) {
      return "null";
    } else if (value.toJSON && typeof value.toJSON === 'function') {
      return JSON.stringify(value.toJSON());
    } else if (value instanceof Array) {
      let result = [];
      value.forEach((item, index) => {
        if (typeof item === 'undefined' || typeof item === 'function' || typeof item === 'symbol') {
          result[index] = "null";
        } else {
          result[index] = JSON.stringify(item);
        }
      });
      result = '[' + result + ']';
      return result.replace(/'/g, '"');
    } else {
      let result = [];
      Object.keys(value).forEach((key, index) => {
        if (typeof key !== 'symbol') {
          // 忽略 symbol 对象属性
          if (value[key] !== undefined && typeof value[key] !== 'function' && typeof value[key] !== 'symbol') {
            result.push('"' + key + '"' + ':' + JSON.stringify(value[key]));
          }
        }
      });
      result = '{' + result + '}';
      return result.replace(/'/g, '"');
    }
  }
};

JSON.parse = function (json) {
  const rx_one = /^[\],:{}\s]*$/;
  const rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  const rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  const rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  if (
    rx_one.test(
      json
        .replace(rx_two, "@")
        .replace(rx_three, "]")
        .replace(rx_four, "")
    )
  ) {
    return eval("(" + json + ")");
  }
};

JSON.parse = function (json) {
  return (new Function('return ' + json))();
};

// test
const obj = {
  a: {
    value: 1
  },
  b: [1, 2, 3],
};
const str = JSON.stringify(obj);
console.log(str);
const newObj = JSON.parse(str);
console.log(newObj);
