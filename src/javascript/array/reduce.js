Array.prototype.reduce = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or not defined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  const O = Object(this);
  const len = O.length >>> 0;
  let k = 0;
  let acc;
  if (arguments.length > 1) {
    acc = initialValue;
  } else {
    while (k < len && !(k in O)) {
      k++;
    }
    if (k > len) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    acc = O[k++];
  }
  while (k < len) {
    if (k in O) {
      acc = callback(acc, O[k], k, O);
    }
    k++;
  }
  return acc;
};

// test
const arr = [1, 2, 3];
const sum = arr.reduce((pre, cur) => {
  return pre + cur;
});
console.log(sum);
