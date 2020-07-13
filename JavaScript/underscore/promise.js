function Promise(executor) {
  let self = this;
  self.data = undefined;
  self.status = 'pending';
  self.onResolvedCallback = [];
  self.onRejectedCallback = [];

  function resolve(value) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'resolved';
        self.data = value;
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value);
        }
      }
    });
  }

  function reject(reason) {
    setTimeout(() => {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    });
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  let self = this;
  let promise2;
  onResolved = typeof onResolved === 'function' ?
    onResolved :
    (value) => {return value};
  onRejected = typeof onRejected === 'function' ?
    onRejected :
    (reason) => {throw reason};
  if (self.status === 'resolved') {
    return promise2 = new Promise((resolve, reject) => {
      try {
        let x = onResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (e) {
        reject(e)
      }
    })
  } else if (self.status === 'rejected') {
    return promise2 = new Promise((resolve, reject) => {
      try {
        let x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          reject(x);
        }
      } catch (e) {
        reject(e);
      }
    })
  } else if (self.status === 'pending') {
    return promise2 = new Promise((resolve, reject) => {
      self.onResolvedCallback.push(function (value) {
        try {
          let x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      })
      self.onRejectedCallback.push(function (reason) {
        try {
          let x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            reject(x);
          }
        } catch (e) {
          reject(e);
        }
      })
    })
  }
}

Promise.prototype.valueOf = function() {
  return this.data;
}

Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
}

Promise.race = function(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        return resolve(value);
      }, reason => {
        return reject(reason);
      })
    }
  })
}

Promise.all = function() {
  let resList = [];
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(value => {
        resList.push(value);
        if (res.length === promises.length) return resList;
      }, reason => {
        return reject(reason);
      })
    }
  })
}

Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value);
  });
}

Promise.reject = function(value) {
  return new Promise((resolve, reject) => {
    reject(reason);
  })
}

/**
 * test
 */
const p = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve(1);
  }, 2000);
});

p.then(function(v) {
  console.log(v);
  return 2;
}).then(function(v) {
  console.log(v);
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(3);
    }, 3000);
  });
}).then(function(v) {
  console.log(v);
}).catch(err => {
  console.log(err);
})
