/**
 * 基于计时器节流
 */
function throttle(func, wait) {
  let timeout;
  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
      }, wait);
    }
  };
}

/**
 * 基于时间戳节流
 */
function throttle(func, wait) {
  let pre = 0;
  return function (...args) {
    let now = +new Date();
    if (now - pre > wait) {
      pre = now;
      func.apply(this, args);
    }
  };
}

/**
 * 基于时间戳和计时器节流
 */
function throttle(func, wait) {
  let timeout = null, pre = 0;
  return function (...args) {
    let now = +new Date();
    if (!pre) pre = now;
    let remaining = wait - (now - pre);
    if (timeout) clearTimeout(timeout);
    if (remaining <= 0 || remaining > wait) {
      func.apply(this, args);
      pre = now;
    } else {
      // 保证最后一次触发回调能够执行
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(this, args);
        pre = now;
      }, remaining);
    }
  };
}
