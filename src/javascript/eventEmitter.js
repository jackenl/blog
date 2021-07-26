function EventEmitter() {
  this.events = new Map();
}

const wrapCallback = (fn, once) => ({ callback: fn, once });
EventEmitter.prototype.addListener = function (type, fn, once = false) {
  const handler = this.events.get(type);
  if (!handler) {
    this.events.set(type, wrapCallback(fn, once));
  } else if (typeof handler.callback === 'function') {
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    handler.push(wrapCallback(fn, once));
  }
}

EventEmitter.prototype.removeListener = function (type, listener) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < handler.length; i++) {
    if (handler[i].callback === listener.callback) {
      handler.splice(i, 1);
      i--;
      if (handler.length === 1) {
        this.events.set(type, handler[0]);
      }
    }
  }
}

EventEmitter.prototype.once = function (type, listener) {
  this.addListener(type, listener, true);
}

EventEmitter.prototype.emit = function (type, ...args) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (Array.isArray(handler)) {
    handler.forEach(item => {
      item.callback.apply(this, args);
      if (item.once) {
        this.removeListener(type, item);
      }
    })
  } else {
    handler.callback.apply(this, args);
    if (handler.once) {
      this.events.delete(type);
    }
  }
  return true;
}

EventEmitter.prototype.removeAllListeners = function (type) {
  const handler = this.events.get(type);
  if (!handler) return;
  this.events.delete(type);
}

// test
const evt = new EventEmitter();
evt.addListener('a', (value) => {
  console.log(value);
});
evt.addListener('b', (value) => {
  console.log(value);
});
evt.emit('a', 1);
evt.emit('b', 2);
evt.removeAllListeners('a');
evt.emit('a', 1);
evt.emit('b', 2);
