(() => {
  // webpackBootstrap
  var __webpack_modules__ = {
    './src/examples/module/require/a.js': (module, __unused_webpack_exports, __webpack_require__) => {
      const value = __webpack_require__(/*! ./b */ './src/examples/module/require/b.js');

      function print() {
        console.log(value);
      }

      module.exports = print;
    },

    './src/examples/module/require/b.js': (module) => {
      module.exports = 'Hello world!';
    }
  };
  /************************************************************************/
  // The module cache
  var __webpack_module_cache__ = {};

  // The require function
  function __webpack_require__(moduleId) {
    // Check if module is in cache
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    // Create a new module (and put it into the cache)
    var module = (__webpack_module_cache__[moduleId] = {
      // no module.id needed
      // no module.loaded needed
      exports: {}
    });

    // Execute the module function
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    // Return the exports of the module
    return module.exports;
  }

  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    const print = __webpack_require__(/*! ./a */ './src/examples/module/require/a.js');
    print();
  })();
})();
