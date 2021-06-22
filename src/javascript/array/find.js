Array.prototype.find = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return O[k];
      }
    }
    k++;
  }
  return undefined;
};

// test
const arr = [1, 2, 3];
const newArr = arr.find((value, index) => {
  return value === 1;
});
console.log(newArr);
