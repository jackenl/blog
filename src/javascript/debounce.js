/**
 * 防抖函数
 * 在事件被触发单位时间后再执行回调，如果在这单位时间内再次触发该事件，则进行重新计时
 */

function debounce(fn, wait) {
  let timer;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}