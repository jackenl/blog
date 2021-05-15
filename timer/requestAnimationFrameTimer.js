const timer = {}; // 计时器索引存储对象
let index = 0;

/**
 * setTimeout 模拟实现
 * @param {function} cb 
 * @param {number} delay 
 * @returns 
 */
function setTimeout2(cb, delay) {
  const start = +new Date();
  let timerIndex = index++;
  step();

  function step() {
    const now = +new Date();
    if (now - start >= delay) {
      cb();
      return;
    }
    if (!timer[timerIndex]) {
      requestAnimationFrame(step);
    }
  }
  return timerIndex;
}

/**
 * 模拟计时器清除
 * @param {number} timerIndex 
 */
function clearTimeout2(timerIndex) {
  if (!timer[timerIndex]) {
    timer[timerIndex] = true;
  }
}

/**
 * requestAnimationFrame 计时器
 * @param {*} callback 
 */
function requestAnimationFrameTimer(callback) {
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

    count.timer = setTimeout2(() => {
      instance();
    }, speed);
  }

  count.timer = setTimeout2(() => {
    instance();
  }, speed);
}
