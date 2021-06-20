Array.prototype.filter = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const res = [];
  const arr = this.slice();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (callback.call(thisArg, arr[i], i, this)) {
      res.push(arr[i]);
    }
  }
  return res;
};

Array.prototype.map = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const res = [];
  const arr = this.slice();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    res.push(callback.call(thisArg, arr[i], i, this));
  }
  return res;
};

Array.prototype.forEach = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const arr = this.slice();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    callback.call(thisArg, arr[i], i, this);
  }
};

Array.prototype.reduce = function (callback, initialValue) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const arr = this.slice();
  const n = arr.length;
  let accumulator = initialValue;
  let i = 0;
  if (accumulator === undefined) {
    accumulator = arr[i++];
  }
  while (i < n) {
    accumulator = callback.call(undefined, accumulator, arr[i], i, this);
    i++;
  }
  return accumulator;
};

Array.prototype.find = function (callback, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('this is null or undefined');
  }
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not a function');
  }
  const arr = this.slice();
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (callback.call(thisArg, arr[i], i, this)) {
      return arr[i];
    }
  }
  return undefined;
};
