/**
 * 原型链继承
 */

function Parent() {
  this.name = 'parent';
  this.list = [1, 2, 3];
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  this.subName = 'child';
}
// 原型继承实例
Child.prototype = new Parent();

const child1 = new Child();
const child2 = new Child();
child1.sayName();
// 属性共用问题
child1.list.push(4);
console.log(child1.list, child2.list);
