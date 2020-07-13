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
  constructor() {}

  create(name) {
    return new Product(name);
  }
}

// 测试代码
let factory = new Factory();
let p1 = factory.create('p1');
p1.getName();
