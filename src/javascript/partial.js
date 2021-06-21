function partial(fn, ...args) {
  return (...args2) => {
    return fn(...args, ...args2);
  };
}

// test
function add(a, b, c) {
  return a + b + c;
}
let partialAdd = partial(add, 1);
console.log(partialAdd(2, 3));
