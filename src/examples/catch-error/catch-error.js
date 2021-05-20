const monitor = {
  errors: []
};

// 在捕获阶段，捕获资源加载失败错误
window.addEventListener('error', (e) => {
  const target = e.target;
  if (target != window) {
    monitor.errors.push({
      type: target.localName,
      url: target.src || target.href,
      msg: (target.src || target.href) + ' is load error',
      time: Date.now(),
    });
  }
}, true);

// 监听 js 执行错误
window.onerror = function (msg, url, row, col, error) {
  monitor.errors.push({
    type: 'javascript',
    row: row,
    col: col,
    msg: error && error.stack ? error.stack : msg,
    url: url,
    time: Date.now(),
  });
};

// 监听 promise 错误 缺点是获取不到行数数据
window.addEventListener('unhandledrejection', (e) => {
  e.preventDefault();
  monitor.errors.push({
    type: 'promise',
    msg: (e.reason && e.reason.msg) || e.reason || '',
    time: Date.now(),
  });
});

function throwError() {
  throw new Error('javascript error');
}

function throwPromiseError() {
  Promise.reject('promise error');
}

function showError() {
  console.log(monitor.errors);
}
