/**
 * setTimeout 时间补偿计时器
 * @param {function} callback 
 */
function offsetTimer(callback) {
  const speed = 50
  let counter = 1;
  const start = new Date().getTime();
  const count = {};

  function instance() {
    let ideal = counter * speed;
    let real = (new Date().getTime() - start);

    counter++;
    count.ideal = ideal;
    count.real = real;

    let diff = real - ideal;
    count.diff = diff;
    callback(count);

    count.timer = setTimeout(() => {
      instance();
    }, speed - diff); // 动态时间补偿
  }

  count.timer = setTimeout(() => {
    instance();
  }, speed);
}