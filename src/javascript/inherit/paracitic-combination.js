/**
 * 寄生组合继承
 */

function Parent() {
  this.name = 'parent';
  this.list = [1, 2, 3];
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  // 借助call
  Parent.call(this);
  this.subName = 'child';
}
// 仅继承包含Parent原型的空对象
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child1 = new Child();
const child2 = new Child();
child1.sayName();
child1.list.push(4);
console.log(child1.list, child2.list);
