/**
 * 工厂模式
 */
class Product {
  constructor(name) {
    this.name = name;
  }

  getName() {
    console.log(this.name);
  }
}

class Factory {
  create(name) {
    return new Product(name);
  }
}

// test
let factory = new Factory();
let p1 = factory.create('p1');
let p2 = factory.create('p2');
p1.getName(); // p1
p2.getName(); // p2
