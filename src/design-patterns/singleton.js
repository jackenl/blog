/**
 * 单例模式
 */
class Singleton {
  constructor() {}
  
  fun() {
    console.log('this pattern is singleton');
  }
}

Singleton.getInstance = (function () {
  let instance;
  return function () {
    if (!instance) {
      instance = new Singleton();
    }
    return instance;
  }
})();

// 测试代码
let s1 = Singleton.getInstance();
let s2 = Singleton.getInstance();
console.log(s1 === s2);
