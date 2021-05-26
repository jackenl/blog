(self['webpackChunkfrontend'] = self['webpackChunkfrontend'] || []).push([
  ['src_examples_module_async-import_a_js'],
  {
    './src/examples/module/async-import/a.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        default: () => /* binding */ print1
      });
      /* harmony import */ var _b__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
        /*! ./b */ './src/examples/module/async-import/b.js'
      );

      (0, _b__WEBPACK_IMPORTED_MODULE_0__.default)();

      function print1() {
        console.log('hello world');
      }
    },

    './src/examples/module/async-import/b.js': (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
      'use strict';
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, {
        default: () => /* binding */ print2
      });
      function print2() {
        console.log('hahaha!');
      }
    }
  }
]);
