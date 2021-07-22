/**
 * 构造函数继承
 */

function Parent() {
  this.name = 'parent';
  this.list = [1, 2, 3];
}
Parent.prototype.sayName = function () {
  console.log(this.name);
};

function Child() {
  // 借助 call
  Parent.call(this);
  this.subName = 'child';
}

const child1 = new Child();
const child2 = new Child();
child1.list.push(4);
console.log(child1.list, child2.list);
// 原型方法继承问题
child1.sayName();
