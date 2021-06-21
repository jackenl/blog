Function.prototype.apply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  context = context || window;
  context.fn = this;

  let res;
  const args = arguments[1];
  if (args) {
    res = context.fn(...args);
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
function add(a, b) {
  this.value = a + b;
}
add.apply(obj, [1, 2]);
console.log(obj.value);
