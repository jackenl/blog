/**
 * 原型模式
 */
class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}
class Student extends Person {
  constructor(name) {
    super(name);
  }
  sayHello() {
    console.log(`Hello, My name is ${this.name}`);
  }
}

let student = new Student('xiaoming');
student.sayHello();
