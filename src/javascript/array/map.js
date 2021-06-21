Array.prototype.map = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  const res = [];
  let k = 0;
  while (k < len) {
    if (k in O) {
      res[k] = callback.call(thisArg, O[k], k, O);
    }
    k++;
  }
  return res;
};

// test
const arr = [1, 2, 3];
const newArr = arr.map((value, index) => {
  return value * 2;
});
console.log(newArr);
