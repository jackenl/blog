/**
 * 组合模式
 */
class TrainOrder {
  create() {
    console.log('创建火车票订单');
  }
}

class HotelOrder {
  create() {
    console.log('创建酒店订单');
  }
}

class TotalOrder {
  constructor() {
    this.orderList = [];
  }
  addOrder(order) {
    this.orderList.push(order);
    return this;
  }
  create() {
    this.orderList.forEach((item) => {
      item.create();
    });
    return this;
  }
}

// test
let train = new TrainOrder();
let hotel = new HotelOrder();
let total = new TotalOrder();
total.addOrder(train).addOrder(hotel).create();
