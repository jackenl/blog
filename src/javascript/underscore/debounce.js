function debounce(func, wait, immediate) {
  let timeout, context, args, result;
  let previous = 0;

  let later = () => {
    let passed = Date.now() - previous;
    if (wait > passed) {
      timeout = setTimeout(latter, wait - passed);
    } else {
      timeout = null;
      if (!immediate) result = func.apply(context, args);
      if (!timeout) args = context = null;
    }
  };

  let debounced = () => {
    context = this;
    args = [...arguments];
    previous = Date.now();
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) result = func.apply(context, args);
    }
    return result;
  };

  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = args = context = null;
  };

  return debounced;
}
