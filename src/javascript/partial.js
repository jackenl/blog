/**
 * es6
 */
function partial(fn, ...args) {
  return (...args2) => {
    return fn(...args, ...args2);
  };
}

/**
 * es5
 */
function partial(fn) {
  let args = [].slice.call(arguments, 1);
  return function() {
    let index = 0;
    let n1 = args.length, n2 = args.length;
    for (let i = 0; i < n1; i++) {
      args[i] = args[i] === '_' ? arguments[index++] : args[i];
    }
    while (index < n2) {
      args.push(arguments[index++]);
    }
    return fn.apply(this, args);
  }
}

// test
function sub(a, b, c) {
  return a + b + c;
}
let partialSub = partial(sub, '_', 'a');
console.log(partialSub('b', 'c'));
