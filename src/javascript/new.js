function create(ctor) {
  const obj = new Object();
  obj.__proto__ = ctor.prototype;
  const args = [...arguments].slice(1);
  const res = ctor.apply(obj, args);
  return typeof res === 'object' ? res || obj : obj;
}

// test
function Person(name) {
  this.name = name;
}
Person.prototype.sayName = function () {
  console.log(this.name);
}
const p1 = create(Person, 'jacken');
const p2 = new Person('xiaoming');
p1.sayName();
p2.sayName();
