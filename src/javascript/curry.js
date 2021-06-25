/**
 * es6
 */
function curry(fn) {
  const judge = (...args1) => {
    if (args1.length === fn.length) return fn(...args1);
    return (...args2) => judge(...args1, ...args2);
  }
  return judge;
}

/**
 * es5
 */
function curry(fn, args) {
  let len = fn.length;
  args = args || [];

  return function () {
    let _args = args.concat([].slice.call(arguments));
    if (_args.length < len) {
      return curry.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  }
}

function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));
let addCurry = curry(add);
console.log(addCurry(1)(2)(3));
