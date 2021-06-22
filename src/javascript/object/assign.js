Object.assign = function (target, ...sources) {
  if (target === null || target === undefined) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  const res = Object(target);
  sources.forEach((source) => {
    if (source !== null) {
      for (let key in source) {
        if (source.hasOwnProperty(key)) {
          res[key] = source[key];
        }
      }
    }
  });
  return res;
};

// test
const obj1 = {
  a: 1,
}
const obj2 = {
  a: 2,
  b: 3,
}
const obj = Object.assign(obj1, obj2);
console.log(obj);
