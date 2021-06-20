Function.prototype.apply = function (context, args) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  context = context || window;
  context.fn = this;

  let res;
  if (args) {
    res = context.fn(args);
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
};

// test
const obj = {
  value: 0
};
function sum(arr) {
  this.value = arr.reduce((pre, cur) => pre + cur);
}
sum.apply(obj, [1, 2, 3]);
console.log(obj.value);
