/**
 * 访问者模式
 */

// 访问者  
class Visitor {
  constructor() {}
  visitConcreteElement(ConcreteElement) {
      ConcreteElement.operation()
  }
}
// 元素类  
class ConcreteElement{
  constructor() {
  }
  operation() {
     console.log("ConcreteElement.operation invoked");  
  }
  accept(visitor) {
      visitor.visitConcreteElement(this)
  }
}
// client
let visitor = new Visitor()
let element = new ConcreteElement()
element.accept(visitor)
