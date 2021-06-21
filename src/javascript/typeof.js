function typeOf(target) {
  const type = Object.prototype.toString.call(target).split(' ')[1];
  return type.substring(0, type.length - 1).toLowerCase();
}

// test
const a = 1;
function fn(value) {
  console.log(value);
}
console.log(typeOf(a));
console.log(typeOf(fn));
