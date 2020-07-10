## Node.js

### 模块系统

#### 工作原理

Node.js每个文件都是模块，模块内的变量都是局部变量，不会污染全局变量，在执行模块代码之前，Node.js 会使用函数函数封装器将模块封装

```js
const exports = module.exports;
(function(exports, require, module, __filename, __dirname) {
	// 模块代码实际执行位置
})
```

* __filename：当前模块文件名称
* __dirname：当前模块文件所在目录的绝对路径
* module：当前模块实例
* require：加载其他模块的方法，module.require 快捷方式
* exports：导出模块接口的对象，module.export  的快捷方式

#### 模块机制

Node.js的模块系统使用的类似 CommonJS 的实现，遵循一下几个原则

1. 一个文件是一个模块，文件内的变量作用域都在模块内
2. 使用`moduel.exports`对象导出模块对外接口
3. 使用`require`引入其他模块

##### module.exports

模块对外暴露接口使用`modele.exports`，常见的两种方法：为其添加属性或赋值到新对象

```js
// 添加属性
module.exports.mod1 = xxx;
module.exports.mod2 = xxx;

// 赋值到新对象
module.exports = {
	mod1,
	mod2,
};
```

还有另外一种直接使用`exports`对象的方法，但是只能对其添加属性，不能赋值到新对象，这是因为`exports`是对`module.exports`对象的引用，如果把`exports`赋值给其他对象，则无法通过`exports`获取模块。

```js
// 使用exports导出
exports.mod1 = xxx;
exports.mod2 = xxx;
```

##### require('id')

`require`用法相对简单，id支持模块名称或文件路径类型

通过`require`引入第三方模块时，第三方模块的查找过程会遵循就近原则逐层上溯（可以使用程序打印`module.paths`查看具体查找路径），直到根据`NODE_PATH`环境变量查找到文件系统根目录，具体过程参考[官方文档](https://nodejs.org/docs/latest-v12.x/api/modules.html#modules_loading_from_node_modules_folders)

此外，Node.js 还会搜索以下全局目录列表：

* $HOME/.node_modules
* $HOME/.node_libraries
* $PREFIX/lib/node

其中`$HOME`用户的主目录，`$PREFIX`是 Node.js 里配置的`node_prefix`。

### Event Loop

Node.js 启动后就会初始化事件轮询，在过程当中可能处理异步调用、定时器调度和`process.nextTick()`，然后开始处理 event loop。事件循环流程如下：

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
4. poll：获取新的 I/O 事件，执行相关回调，在适当条件下阻塞 node
5. check：setImmediate 回调在此阶段执行
6. close callbacks：执行 socket 等 close 事件回调

event loop 的每个阶段都有一个任务队列，当 event loop 进入给定的阶段时，将执行该阶段的任务队列，直到任务队列清空或执行的回调达到系统上限后，才会进入下一个阶段，当所有阶段被循序执行一次后，称 event loop 完成了一个 tick

异步操作都被放到了下一个 event loop tick 中，process.nextTick 在进入下一次 even loop tick 之前执行。

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

日常开发绝大部分异步任务都是在 timers、pool、check 阶段处理的

##### timers

 timers 阶段主要用于执行定时器的回调,Node.js 会在 timers 阶段检查是否有过期的 timer，如果有则把回调放到 timer 队列中等待执行，定时器主要有两种，分别是`setImmediate`和`setTimeout`，Immediate 类型计时器回调会在 check 被调用，Timeout 计时器会在设定的事件过期后在 timers 阶段被调用

##### poll

poll 阶段主要有两个任务

1. 计算应该阻塞和轮询 I/O 的时间
2. 处理 poll 队列里的事件

##### check

在该阶段中主要执行计时器`setImmediatere`的回调

### web 框架

#### express

#### Koa

Koa 的最大特点就是中间件流程控制，是一个典型的洋葱模型。其中 Koa 和 Koa2 中间件控制实现的主要区别是 Koa2 直接用`async/await`来代替 Koa 的`generator`异步实现。

##### 洋葱模型

![洋葱模型](../images/洋葱模型.png)

执行一下代码

```js
const Koa = require('koa');

const app = new Koa();
const Port = 3000;

// middle1
app.use(async (ctx, next) => {
	console.log('middle1 start');
	await next();
	console.log('middle1 end');
})

// middle2
app.use(async (ctx, next) => {
	console.log('middle2 start');
	await next();
	console.log('middle2 end');
})

// middle3
app.use(async (ctx, next) => {
	console.log('middle3 start');
	await next();
	console.log('middle3 end');
})

app.listen(Port, () => {
	console.log(`http://localhost:${Port}`);
});
```

输出结果如下：

```
middle1 start
middle2 start
middle3 start
middle3 end
middle2 end
middle1 end
```

##### 实现原理

Koa 中间件控制实现的重要几个点

1. context 实例的保存和传递
2. 中间件的管理和 next 函数的实现

```js
listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
}

// this.callback
callback() {
    const fn = compose(this.middleware);

    if (!this.listenerCount('error')) this.on('error', this.onerror);

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
}

// this.createContext
createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.state = {};
    return context;
}

// this.handleRequest
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
}

// app.use
use(fn) {
    this.middleware.push(fn);
    return this;
}
```

```js
function compose (middleware) {
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```

#### egg.js







