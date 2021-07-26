function shadowClone(source) {
  if (typeof source !== 'object' || source === null) return source;

  const result = Array.isArray(source) ? [] : {};
  for (let key in source) {
    if (source.hasOwnProperty(key)) {
      result[key] = source[key];
    }
  }
  return result;
}

// test
const obj = {
  a: 1,
  b: 2,
};
const newObj = shadowClone(obj);
console.log(newObj);
