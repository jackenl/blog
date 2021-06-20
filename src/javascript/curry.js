function curry() {
  const args = [...arguments];
  function fn() {
    if (arguments[0]) {
      args.push(...arguments);
      return fn;
    }
    return fn.sum();
  }
  fn.sum = function () {
    return args.reduce((pre, cur) => pre + cur);
  };
  return fn;
}

// test
const sum = curry(1, 2, 3)(4)();
console.log(sum);
