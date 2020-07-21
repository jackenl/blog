/**
 * 外观模式
 */
let myEvent = {
  listen: (el, ev, fn) => {
    if (el.addEventListener) {
      el.addEventListener(ev, fn, false);
    } else if (el.attachEvent) {
      el.attachEvent('on' + ev, fn);
    } else {
      el['on' + ev] = fn;
    }
  },
  stop: el => {
    el.stopPropagation();
    el.preventDefault();
  }
}