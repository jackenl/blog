function compose() {
  let args = [].slice.call(arguments);
  let start = args.length - 1;
  return function() {
    let i = start;
    let result = args[start].apply(this, arguments);
    while (i-- > 0) {
      result = args[i].call(this, result);
    }
    return result;
  }
}

// test
const toUpperCase = function(x) { return x.toUpperCase(); };
const hello = function(x) { return 'HELLO, ' + x; };
const greet = compose(hello, toUpperCase);
console.log(greet('kevin'));
