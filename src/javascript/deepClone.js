function deepClone(source, hash = new WeakMap()) {
  if (typeof source !== 'object' || source === null) {
    return source;
  }
  // 使用哈希表解决循环引用
  if (hash.has(source)) return hash.get(source);

  const target = Array.isArray(source) ? [] : {};
  hash.set(source, target);

  // 针对 Symbol 属性
  const symKeys = Object.getOwnPropertySymbols(source);
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (typeof source[symKey] === 'object' && source[symKey] !== null) {
        target[symKey] = deepClone(source[symKey]);
      } else {
        target[symKey] = source[symKey];
      }
    });
  }

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source === 'object' && source !== null) {
        target[key] = deepClone(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}

// test
const sym1 = Symbol('a');
const sym2 = Symbol.for('b');
const obj = {
  [sym1]: 1,
  [sym2]: 2,
  c: 3,
};
const newObj = deepClone(obj);
console.log(newObj);
