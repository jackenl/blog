function curry(fn) {
  const judge = (...args1) => {
    if (args1.length === fn.length) return fn(...args1);
    return (...args2) => judge(...args1, ...args2);
  }
  return judge;
}

function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
