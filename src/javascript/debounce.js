function debounce(fn, wait) {
  let timeout = null;
  return function(...args) {
    if (timer) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
}