(() => {
    var modules = {
      "./src/node/mypack/src/index.js": ((module, __exports__, __require__) => {
        const print = __require__("./src/node/mypack/src/print.js");

print();
      }),
"./src/node/mypack/src/print.js": ((module, __exports__, __require__) => {
        function print() {
  console.log('Hello world!');
}

module.exports = print;
      })
    }
    var __module_cache__ = {}
    var __require__ = function(moduleId) {
      if (__module_cache__[moduleId]) return __module_cache__[moduleId].exports

      var module = __module_cache__[moduleId] = {
        exports: {}
      }

      modules[moduleId](module, module.exports, __require__)
      return module.exports
    }

    var __exports__ = __require__('./src/node/mypack/src/index.js')
  })()