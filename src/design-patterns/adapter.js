/**
 * 适配器模式
 */
class Plug {
  getName() {
    return 'iphone充电头';
  }
}

class Adapter {
  constructor() {
    this.plug = new Plug();
  }

  getName() {
    return this.plug.getName() + ' 适配器适配Type-C';
  }
}

// test
let adapter = new Adapter();
console.log(adapter.getName());
