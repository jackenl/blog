/**
 * 装饰器模式
 */
class Cellphone {
  constructor() {}

  create() {
    console.log('创建一个手机');
  }
}

class Decorator {
  constructor(cellphone) {
    this.cellphone = cellphone;
  }

  create() {
    this.cellphone.create();
    this.createShell();
  }

  createShell() {
    console.log('创建一个手机壳');
  }
}

// 测试代码
let cellphone = new Cellphone();
cellphone.create();

console.log('--------------------------------')
let shell = new Decorator(cellphone);
shell.create();