function shadowClone(source) {
  if (typeof source !== 'object' || source === null) return source;

  const result = Array.isArray(source) ? [] : {};
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      result[key] = source[key];
    }
  }
  return result;
}

// test
const obj = {
  a: 1
}
const newObj = shadowClone(obj);
console.log(newObj);
