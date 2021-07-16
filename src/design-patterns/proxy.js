/**
 * 代理模式
 */
let Flower = function () {};
let xiaoming = {
  sendFlower: function (target) {
    let flower = new Flower();
    target.receiveFlower(flower);
  },
};
let B = {
  receiveFlower: function (flower) {
    A.listenGoodMood(function () {
      A.receiveFlower(flower);
    });
  },
};
let A = {
  receiveFlower: function (flower) {
    console.log('收到花' + flower);
  },
  listenGoodMood: function (fn) {
    setTimeout(function () {
      fn();
    }, 1000);
  },
};

// test
xiaoming.sendFlower(B);
