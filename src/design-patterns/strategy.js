/**
 * 策略模式
 */
const strategies = {
  'square': function(value) {
    return value * value;
  },
  'cube': function(value) {
    return value * value * value;
  }
}

let calculate = function (type, value) {
  return strategies[type](value);
}

// test
console.log(calculate('square', 5));
console.log(calculate('cube', 5));
