/**
 * 函数节流
 * 在规定单位时间内，只能触发一次事件的回调函数执行
 * 如果在同一单位时间内某事件被触发多次，则只有一次生效
 */

// 基于计时器实现
function throttle(fn, wait) {
  let timer;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, wait);
    }
  }
}

// 基于时间戳实现
function throttle(fn, wait) {
  let previous = 0;
  return function(...args) {
    let now = +new Date();
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args);
    }
  }
}

// 基于时间戳和计时器的实现
function throttle(fn, wait) {
  let timer, previous;
  return function(...args) {
    let now = +new Date();
    if (!previous) previous = now;
    let time = wait - (now - previous);
    if (timer) clearTimeout(timer);
    if (time <= 0 || time > wait) {
      fn.apply(this, args);
      previous = now;
    } else { // 保证在规定时间内，连续多次触发事件后最后执行回调
      timer = setTimeout(() => {
        fn.apply(this, args);
        previous = now;
      }, time);
    }
  }
}