(() => {
    var modules = {
      "./src/examples/mypack/src/index.js": function(module, _exports_, _require_) {
        eval(
          `const print = _require_("./src/examples/mypack/src/print.js");

print();`
        )},
"./src/examples/mypack/src/print.js": function(module, _exports_, _require_) {
        eval(
          `const fun = _require_("./src/examples/mypack/src/demo.js");

function print() {
  fun();
  console.log('Hello world!');
}

module.exports = print;`
        )},
"./src/examples/mypack/src/demo.js": function(module, _exports_, _require_) {
        eval(
          `function fun() {
  console.log('hahaha!');
}

module.exports = fun;`
        )}
    }
    var modules_cache = {}
    var _require_ = function(moduleId) {
      if (modules_cache[moduleId]) return modules_cache[moduleId].exports

      var module = modules_cache[moduleId] = {
        exports: {}
      }

      modules[moduleId](module, module.exports, _require_)
      return module.exports
    }

    var _exports_ = _require_('./src/examples/mypack/src/index.js')
  })()