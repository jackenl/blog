const deepTag = ['map', 'set', 'array', 'object', 'arguments'];

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function getType(target) {
  const type = Object.prototype.toString.call(target).split(' ')[1];
  return type.substring(0, type.length - 1).toLowerCase();
}

function forEach(array, fn) {
  let index = -1;
  const length = array.length;
  while (++index < length) {
    fn(array[index], index);
  }
  return array;
}

function getInit(target) {
  const Ctor = target.constructor;
  return new Ctor();
}

function cloneSymbol(symbol) {
  return Object(Symbol.prototype.valueOf.call(symbol));
}

function cloneReg(reg) {
  const reFlags = /\w*$/;
  const result = new reg.constructor(reg.source, reFlags.exec(reg));
  result.lastIndex = reg.lastIndex;
  return result;
}

function cloneFunction(func) {
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const funcStr = func.toString();
  if (func.prototype) {
    const param = paramReg.exec(funcStr);
    const body = bodyReg.exec(funcStr);
    if (body) {
      if (param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcStr);
  }
}

function cloneOtherType(target, type) {
  const Ctor = target.constructor;
  switch (type) {
    case 'boolean':
    case 'number':
    case 'string':
    case 'error':
    case 'date':
      return new Ctor(target);
    case 'regexp':
      return cloneReg(target);
    case 'symbol':
      return cloneSymbol(target);
    case 'function':
      return cloneFunction(target);
    default:
      return null;
  }
}

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.has(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === 'set') {
    target.forEach(val => {
      cloneTarget.add(clone(val, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === 'map') {
    target.forEach((val, key) => {
      cloneTarget.set(key, clone(val, map));
    });
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === 'array' ? undefined : Object.keys(target);
  forEach(keys || target, (val, key) => {
    if (keys) {
      key = val
    }
    if (isObject(target[key])) {
      cloneTarget[key] = clone(target[key], map);
    } else {
      cloneTarget[key] = target[key];
    }
  });
  
  // 克隆对象symbol属性值
  const symKeys = Object.getOwnPropertySymbols(target);
  forEach(symKeys, (val, key) => {
    key = val;
    if (isObject(target[key])) {
      cloneTarget[key] = clone(target[key], map);
    } else {
      cloneTarget[key] = target[key];
    }
  })

  return cloneTarget;
}

// test
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');

const set = new Set();
set.add('value1');
set.add('value2');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('func1');
    },
    func2: function (a, b) {
        return a + b;
    },
    [Symbol(1)]: 'symbol1',
    [Symbol(2)]: 'symbol2'
};

console.log(target);
console.log(clone(target));
