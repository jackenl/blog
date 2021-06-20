Function.prototype.call = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  context = context || window;
  context.fn = this;

  const res = context.fn(...args);
  delete context.fn;
  return res;
};

// test
const obj = {
  value: 0
};
function sum(...args) {
  this.value = args.reduce((pre, cur) => pre + cur);
}
sum.call(obj, 1, 2, 3);
console.log(obj.value);
