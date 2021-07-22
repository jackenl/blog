/**
 * 组合继承
 */

function Parent() {
  this.name = 'parent';
  this.list = [1, 2, 3];
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child() {
  // Parent执行第一次
  Parent.call(this);
  this.subName = 'child';
}
// Parent执行第二次
Child.prototype = new Parent();
Child.prototype.constructor = Child;


const child1 = new Child();
const child2 = new Child();
child1.sayName();
child1.list.push(4);
console.log(child1.list, child2.list);
