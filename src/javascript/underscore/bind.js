Function.prototype.bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error');
  }

  var _this = this;
  var args = [...arguments].slice(1);

  return function F() {
    if (this instanceof F) {
      return new _this(...args, ...arguments);
    }
    return _this.apply(context, args.concat(...arguments));
  }
}