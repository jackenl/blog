/**
 * 桥接模式
 */
class Color {
  constructor(name) {
    this.name = name;
  }
}

class Shape {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  draw() {
    console.log(`${this.color.name} ${this.name}`);
  }
}

// test
let red = new Color('red');
let yellow = new Color('yellow');
let circle = new Shape('circle', red);
circle.draw();
let triangle = new Shape('triangle', yellow);
triangle.draw();
