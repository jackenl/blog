function create(ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw new TypeError('Type Error');
  }
  const obj = Object.create(ctor.prototype);
  const result = ctor.apply(obj, args);

  return typeof result === 'object' ? result : obj;
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
