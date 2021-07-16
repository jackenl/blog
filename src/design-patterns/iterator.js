/**
 * 迭代器模式
 */
class Iterator {
  constructor(container) {
    this.list = container.list;
    this.index = 0;
  }
  next() {
    if (this.hasNext()) {
      return this.list[this.index++];
    }
    return null;
  }
  hasNext() {
    if (this.index >= this.list.length) {
      return false;
    }
    return true;
  }
}

class Container {
  constructor(list) {
    this.list = list;
  }
  getIterator() {
    return new Iterator(this);
  }
}

// test
let container = new Container([1, 2, 3]);
let iterator = container.getIterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
