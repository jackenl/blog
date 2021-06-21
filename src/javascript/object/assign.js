Object.defineProperty(Object, 'assign', {
  value: function (target, ...args) {
    if (target === null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const obj = Object(target);
    const n = args.length;
    for (let i = 0; i < n; i++) {
      const source = args[i];
      if (source !== null) {
        for (let key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            obj[key] = source[key];
          }
        }
      }
    }
    return obj;
  },
  enumerable: false,
  writable: true,
  configurable: true
});

// test
const obj1 = {
  a: 1
};
const obj2 = {
  b: 2
};
const obj = Object.assign(obj1, obj2);
console.log(obj);
