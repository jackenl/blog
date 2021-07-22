class Parent {
  constructor() {
    this.name = 'parent';
    this.list = [1, 2, 3];
  }
  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent {
  constructor() {
    super();
    this.subName = 'child';
  }
}

const child1 = new Child();
const child2 = new Child();
child1.sayName();
child1.list.push(4);
console.log(child1.list, child2.list);
