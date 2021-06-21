function create(ctor) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error');
  }
  const args = Array.prototype.slice.call(arguments, 1);

  // const obj = Object.create(ctor.prototype);
  const obj = new Object(null);
  obj.__proto__ = ctor.prototype;
  const res = ctor.apply(obj, args);

  return typeof res === 'object' ? res : obj;
}

// test
function Person(age) {
  this.age = age;
  this.sayAge = function () {
    console.log(this.age);
  };
}
const p1 = create(Person, 18);
p1.sayAge();
