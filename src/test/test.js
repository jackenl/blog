Function.prototype.before = function(beforeHook) {
  let _self = this;
  return function() {
    beforeHook.apply(this, arguments);
    return _self.apply(this, arguments);
  };
}

Function.prototype.after = function(afterHook) {
  let _self = this;
  return function() {
    let ret = _self.apply(this, arguments);
    afterHook.apply(this, arguments);
    return ret;
  };
}

var func = function() {
  console.log(2);
};

func = func.before(function() {
  console.log(1);
}).after(function() {
  console.log(3);
});

func();