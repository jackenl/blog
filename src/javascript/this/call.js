Function.prototype.call = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  context = context || window;
  context.fn = this;

  const args = [...arguments].slice(1);
  const res = context.fn(...args);
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
add.call(obj, 1, 2);
console.log(obj.value);
