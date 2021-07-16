/**
 * 状态模式
 */
class State {
  constructor(state) {
    this.state = state;
  }
  handle(context) {
    console.log(`this is ${this.state} light`);
    context.setState(this);
  }
}

class Context {
  constructor() {
    this.state = null;
  }
  getState() {
    return this.state;
  }
  setState(state) {
    this.state = state;
  }
}

// test
let context = new Context();
let weak = new State('weak');
let strong = new State('strong');

weak.handle(context);
console.log(context.getState());

strong.handle(context);
console.log(context.getState());
