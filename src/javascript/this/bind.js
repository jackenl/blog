Function.prototype.bind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  const self = this;

  const args = [...arguments].slice(1);
  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments);
    }
    return self.apply(context, [...args, ...arguments]);
  };
};

// rest
const obj = {
  value: 0
};
function sum(...args) {
  this.value = args.reduce((pre, cur) => pre + cur);
}
sum.bind(obj, 1, 2, 3)(4);
console.log(obj.value);
