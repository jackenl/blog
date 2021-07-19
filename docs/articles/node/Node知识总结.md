## Node Modules

### Module 构造函数

```js
function Module(id, parent) {
  this.id = id;
  this.exports = {};
  this.parent = parent;
  if (parent && parent.children) {
    parent.children.push(this);
  }

  this.filename = null;
  this.loaded = false;
  this.children = [];
}
module.exports = Module;
```

实例化一个`Module`对象

```js
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: 'e:\\demo\\test\\index.js',
  loaded: false,
  children: [],
  paths: 
   [ 'e:\\demo\\test\\node_modules',
     'e:\\demo\\node_modules',
     'e:\\node_modules' ]
}
```

### require 模块加载机制

`require`函数

```js
function require(path) {
  try {
    exports.requireDepth += 1;
    return mod.require(path);
  } finally {
    exports.requireDepth -= 1;
  }
}
```

`Module.prototype.require`函数

```js
Module.prototype.require = function (path) {
  assert(path, 'missing path');
  assert(typeof path === 'string', 'path must be a string');
  return Module._load(path, this, /* isMain */ false);
}
```

`Module._load`函数

```js
Module._load = function(request, parent, isMain) {

  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;

  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }

  // 第三步：生成模块实例，存入缓存
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  // 第四步：加载模块
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```

`Module.prototype.load`函数

```js
Module.prototype.load = function(filename) {
  debug('load ' + JSON.stringify(filename) +
        ' for module ' + JSON.stringify(this.id));

  assert(!this.loaded);
  this.filename = filename;
  this.paths = Module._nodeModulePaths(path.dirname(filename));

  var extension = path.extname(filename) || '.js';
  if (!Module._extensions[extension]) extension = '.js';
  Module._extensions[extension](this, filename);
  this.loaded = true;
};
```

`__filename`和`__dirname`生成

```js
Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(stripBOM(content), filename);
};

Module.prototype._compile = function(content, filename) {
  var self = this;
  var args = [self.exports, require, self, filename, dirname];
  // __filename 和 __dirname 参数注入
  return compiledWrapper.apply(self.exports, args);
};
```

相当于以下形式

```js
(function (exports, require, module, __filename, __dirname) {
	// 模块源码
})()
```

实际上`exports`本质上就是`module.exports`的引用

## Node 异步 I/O

### Node 事件循环流程

```
┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

各个阶段的主要任务

1. timers：执行`setTimeout`、`setInterval`回调

2. pending callbacks：执行I/O（文件、网络等）回调

3. idle, prepare：仅供系统内部调用

4. poll：获取新的 I/O 事件，执行相关回调，在适当条件下阻塞 node 执行

5. check：`setImmediate`回调在此阶段执行

6. close callbacks：执行 socket 等`close`事件回调

event loop 的每个阶段都有一个任务队列，当 event loop 进入给定的阶段时，将执行该阶段的任务队列，直到任务队列清空或执行的回调达到系统上限后，才会进入下一个阶段，当所有阶段被循序执行一次后，称 event loop 完成了一个 Tick。

其中异步任务都被放到了下一个 event loop Tick 中，`process.nextTick` 在进入下一次 even loop Tick 之前执行。

```js
setImmediate(console.log, 1);
setTimeout(console.log, 1, 2);
Promise.resolve(3).then(console.log);
/** **************** 下次 event loop tick 分割线 ******************* */
process.nextTick(console.log, 4);
/** **************** 同步任务和异步任务的分割线 ******************* */
console.log(5);

// 输出：5 4 3 2 1
```

## Buffer 模块

Buffer 并不是通过 V8 引擎进行内存分配的，其分配的内存属于堆外内存。

### Buffer 的内存分配机制

为了高效的使用申请来的内存，Node 采用了 slab 分配机制。slab 是一种动态的内存管理机制。Node 以 8kb 为界限来来区分 Buffer 为大对象还是小对象，如果是小于 8kb 就是小 Buffer，大于 8kb 就是大 Buffer。例如第一次分配一个 1024 字节的 Buffer，`Buffer.alloc(1024)`,那么这次分配就会用到一个 slab，接着如果继续`Buffer.alloc(1024)`,那么上一次用的 slab 的空间还没有用完，因为总共是 8kb，1024+1024 = 2048 个字节，没有 8kb，所以就继续用这个 slab 给 Buffer 分配空间。如果超过 8kb，那么直接用 C++底层地宫的`SlowBuffer`来给 Buffer 对象提供空间。

