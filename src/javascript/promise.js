const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(executor) {
  let self = this;
  self.status = PENDING;
  self.value = undefined;
  self.reason = undefined;
  self.onFulfilledCallbacks = [];
  self.onRejectedCallbacks = [];

  function resolve(value) {
    if (value instanceof Promise) {
      return value.then(resolve, reject);
    }
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = FULFILLED;
        self.value = value;
        self.onFulfilledCallbacks.forEach(fn => fn(self.value));
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === PENDING) {
        self.status = REJECTED;
        self.reason = reason;
        self.onRejectedCallbacks.forEach(fn => fn(self.reason));
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

function resolvePromise(promise, x, resolve, reject) {
  // 防止循环引用
  if (promise === x) {
    return reject(new TypeError('The promise is same with the return value'));
  }

  if (x instanceof Promise) {
    x.then((y) => {
      resolvePromise(promise, y, resolve, reject);
    }, (reason) => {
      reject(reason);
    });
  } else if (x && (typeof x === 'object' || typeof x === 'function')) {
    let called;
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (called) return;
          called = true;
          resolvePromise(promise, y, resolve, reject);
        }, (reason) => {
          if (called) return;
          called = true;
          reject(reason);
        });
      } else {
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

  let self = this;
  let promise2 = new Promise((resolve, reject) => {
    if (self.status === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(self.value);
          resolvePromise(promise2. x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    } else if (self.status === PENDING) {
      self.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
      self.onRejectedCallbacks.push((reason) => {
        try {
          let x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch (e) {
          reject(e);
        }
      });
    }
  });
  return promise2;
};

Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
}

Promise.resolve = function (value) {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise((resolve, reject) => {
    resolve(value);
  });
};

Promise.reject = function (reason) {
  return new Promise((resolve, reject) => {
    reject(reason);
  });
}

Promise.prototype.finally = function (callback) {
  return this.then((value) => {
    return Promise.resolve(callback()).then(() => {
      return value;
    });
  }, (reason) => {
    return Promise.resolve(callback()).then(() => {
      throw reason;
    });
  });
};

Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const n = promises.length;
    const values = [];
    let count = 0;
    for (let i = 0; i < n; i++) {
      Promise.resolve(promises[i]).then((value) => {
        values[i] = value;
        count++;
        if (count === n) resolve(values);
      }, (reason) => {
        return reject(reason);
      });
    }
  });
};

Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    const n = promises.length;
    for (let i = 0; i < n; i++) {
      Promise.resolve(promises[i]).then((value) => {
        return resolve(value);
      }, (reason) => {
        return reject(reason);
      });
    }
  });
};

Promise.allSettled = function (promises) {
  return new Promise((resolve, reject) => {
    const n = promises.length;
    const values = [];
    let count = 0;
    for (let i = 0; i < n; i++) {
      Promise.resolve(promises[i]).then((value) => {
        values[i] = {
          status: FULFILLED,
          value: value,
        };
        count++;
        if (count === n) resolve(values);
      }, (reason) => {
        values[i] = {
          status: REJECTED,
          reason: reason,
        };
        count++;
        if (count === n) resolve(values);
      });
    }
  });
};

Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;

// test
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() < 0.5 ? resolve(true) : reject(false);
  }, 1000);
});
p.then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 1000);
});
Promise.all([p1, p2]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
Promise.race([p1, p2]).then((res) => {
  console.log(res);
}).catch((err) => {
  console.log(err);
});
Promise.allSettled([p1, p2]).then((res) => {
  console.log(res);
});
