/**
 * 模板方法模式
 */
class Beverage {
  constructor({ brewDrink, addCondiment }) {
    this.brewDrink = brewDrink;
    this.addCondiment = addCondiment;
  }
  /* 烧开水，共用方法 */
  boilWater() {
    console.log('水已经煮沸=== 共用');
  }
  /* 倒杯子里，共用方法 */
  pourCup() {
    console.log('倒进杯子里===共用');
  }
  /* 模板方法 */
  init() {
    this.boilWater();
    this.brewDrink();
    this.pourCup();
    this.addCondiment();
  }
}
/* 咖啡 */
const coffee = new Beverage({
  /* 冲泡咖啡，覆盖抽象方法 */
  brewDrink: function () {
    console.log('冲泡咖啡');
  },
  /* 加调味品，覆盖抽象方法 */
  addCondiment: function () {
    console.log('加点奶和糖');
  },
});

coffee.init();
