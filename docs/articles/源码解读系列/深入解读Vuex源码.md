# 深入解读 Vuex 源码

Vuex 是什么？

> Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

这是 Vuex 官方文档对其的定义说明。简单来说就是 Vuex 提供了一个集中式的数据状态管理存储仓库，允许 Vue 组件对其进行数据的访问和通讯，并且 Vuex 限定了 Vue 对其数据进行操作的规则，保证数据的统一性。

接下来，我们来深入分析解读 Vuex 的源码，分析其是如何构建一个集中式的数据状态管理应用，并且将其注入到 Vue 实例应用上的。

## 1 功能特性

<div align="center">
  <img src="../../../images/image-20210420092928587.png" alt="image-20210419145741154" width="50%" />
</div>

以上就是 Vuex 的框架核心流程图，Vue Component 负责数据的渲染，Vuex 负责数据的状态管理，Vue Component 通过`dispatch`函数触发 Vuex 对应`action`函数的执行，`action`函数内部调用`commit`函数触发对应`mutation`函数执行，`mutation`函数可访问 Vuex 的 state 对象并对其进行修改，响应式的 state 数据在被修改后触发执行 Vue Component 的`render`函数的重载，从而把 state 数据更新到渲染视图。

## 2 目录结构

```sh
src
├── module                    # 模块相关操作
│   ├── module-collection.js  # 模块对象树构建
│   └── module.js             # 模块对象定义
├── plugins                   # 相关插件
│   ├── devtool.js            # 调试插件
│   └── logger.js             # 日志插件
├── helpers.js                # 相关辅助函数
├── index.cjs.js              # commonjs 入口文件
├── index.js                  # 默认入口文件
├── index.mjs                 # esModule 入口文件
├── mixin.js                  # store 对象注入实现
├── store.js                  # store 对象定义
└── util.js                   # 相关工具函数
```

大体的目录文件功能如下：

* module/* 提供 module 对象和 module 对象树的创建功能；
* plugins/* 提供开发辅助插件，如“时光穿梭”功能、state 修改的日志记录功能；
* helpers 提供 action、mutations 以及 getters 的查找API；
* index 是源码入口文件
* mixin 提供 store 装载注入到 Vue 实例的功能；
* store 属于核心文件，提供了 store 对象的构建方法；
* utils 负责提供工具方法，如 bind、forEachValue 等方法；

## 3 应用实例

我们来看一个简单的 Vuex 应用实例：

```js
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

// $store 属性注入
Vue.use(Vuex)

// 创建 store 对象
export default new Vuex.Store({...})
```

store 对象插入

```js
// main.js
import Vue from 'vue'
import App from './App'
improt store from './store'

new Vue({
	el: '#root',
	store, // 通过 options 传参传入 store 对象
	render: h => h(App)
})
```

可以发现，Vuex 的应用主要分为两部，首先通过调用`Vue.use(Vuex)`在 Vue 实例化过程中触发执行 Vuex 对象的`install`函数，用于后续给 Vue  实例注入下一步创建的 store 对象，接下来就是构建 store 对象通过传参的形式插入 Vue 实例。下面将通过源码分析 Vue 是如何实现构建 store 对象并装载到 Vue 实例上的。

## 4 Vuex 的装载与注入

查看`Vue.use(plugin)`方法定义，可以发现其内部会调用 plugin 的`install`方法。

```js
export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    const args = toArray(arguments, 1)
    args.unshift(this)
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin)
    return this
  }
}
```

查看 Vuex 源码的入口文件 index.js，`install`方法的定义在文件 store.js 中。

```js
// 通过局部变量 Vue，判断是否已装载
let Vue // bind on install
...

export class Store {
  constructor (options = {}) {
    // Auto install if it is not done yet and `window` has `Vue`.
    // To allow users to avoid auto-installation in some cases,
    // this code should be placed here. See #731
    // 如果是浏览器环境上通过 CDN 方式加载 Vue，则自动执行 install 方法
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
    ...
  }
}

export function install (_Vue) {
  // 防止 Vuex 重复装载
  if (Vue && _Vue === Vue) {
    if (__DEV__) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
```

查看 applyMixin 方法，如果是 Vue2 以上版本通过 mixin 使用 hook 的方式给所有组件实例注入 store 对象， Vue1 通过重写原型 _init 方法给所有组件实例注入 store 对象，同时保证在任意组件访问 $store 属性都指向同一个 store 对象。

```js
// applyMixin 方法定义
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0])

  if (version >= 2) {
    // Vue2 通过 mixin 使用 hook 方式进行 store 对象注入
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    // Vue1 通过重写原型 _init 方法进行 store 对象注入
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    const options = this.$options
    // store injection
    // store 注入
    // 保证在任意组件访问 $store 属性都指向同一个 store 对象
    if (options.store) {
      // 将 store 对象注入到根组件的 $store 属性上
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      // 将子组件的 $store 属性指向父组件的 $store 属性上
      this.$store = options.parent.$store
    }
  }
}
```

通过`Vue.use(Vuex)`将 Vuex 以插件的形式装载进 Vue 实例中，Vue 在实例化过程中会调用 Vuex 的`install`方法调用`Vue.mixin`以 hook 的形式将 store 对象注入到 Vue 实例当中，使得可以通过访问实例的 $store 属性访问到 store 对象。

## 5 store 对象的构造

### 5.1 数据初始化与 module 对象树构建

查看 Store 构造类，可以看到初始化了一系列的内部变量，这些内部变量主要用于存储封装过的 mutations 、actions、modules 等，其主要作用是用于`commit(type, ...)`和`dispatch(type, ...)`以路径的形式访问这些内部变量属性值并执行，从而触发对应 module 对象的 mutations 或 actions 执行修改 state 属性值。另外还有 subscribe 和 watch 等集合，这里先不展开。

```js
// store internal state
this._committing = false // 表示 commit 状态，用于判断是否是通过 commit 修改 state 属性
this._actions = Object.create(null) // 存储封装后的 actions 集合
this._actionSubscribers = []
this._mutations = Object.create(null)
this._wrappedGetters = Object.create(null)
this._modules = new ModuleCollection(options) // 构建 module 对象树
this._modulesNamespaceMap = Object.create(null)
this._subscribers = []
this._watcherVM = new Vue()
this._makeLocalGettersCache = Object.create(null)
```

而构建的 module 对象树使 store 对象能够访问嵌套 module 对象并对其进行操作修改，通过查看 module/module-collection.js 文件，我们可以查看整个 module 对象树的构建实现。

```js
// module-collection.js
export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false)
  }
  ...
  register (path, rawModule, runtime = true) {
    if (__DEV__) {
      // 校验 module 对象结构
      assertRawModule(path, rawModule)
    }

    // 创建 module 对象，提供内部属性操作方法，如 addChild 等
    const newModule = new Module(rawModule, runtime)
    if (path.length === 0) {
      // 根module
      this.root = newModule
    } else {
      const parent = this.get(path.slice(0, -1))
      parent.addChild(path[path.length - 1], newModule)
    }

    // register nested modules
    // 通过递归构建嵌套 modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }
}
```

Module 类定义如下：

```js
export default class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule // 存储当前模块
    const rawState = rawModule.state

    // Store the origin module's state
    // 可以允许 state 属性是一个返回一个对象的函数或对象
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }
  // module 对象更行方法
  ...
}
```

ModuleCollection 构造类主要通过调用`this.register([], rawRootModule, false)`将传入的options 对象构造成一个 module 对象，并循环调用 this.register(path.concat(key), rawChildModule, runtime) 对其中的 modules 属性进行模块注册，使其都构建成 module 对象插入到 _children 属性中，最终构建成一个完整的 module 树结构，另外 ModuleCollection  类提供了 modules 的更替功能。

### 5.2 commit 和 dispatch 函数配置

接下来是内部方法 commit 和 dispatch 的定义和封装。

```js
// bind commit and dispatch to self
const store = this
const { dispatch, commit } = this
this.dispatch = function boundDispatch (type, payload) {
  return dispatch.call(store, type, payload)
}
this.commit = function boundCommit (type, payload, options) {
  return commit.call(store, type, payload, options)
}
```

封装原型中的 dispatch 和 commit 方法，将 this 指针指向当前 store 对象。dispatch和commit方法具体实现如下：

```js
commit (_type, _payload, _options) {
  // check object-style commit
  // 配置参数校验和处理
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options)

  const mutation = { type, payload }
  const entry = this._mutations[type]
  if (!entry) {
    if (__DEV__) {
      console.error(`[vuex] unknown mutation type: ${type}`)
    }
    return
  }
  // 用于判断是否是通过 commit 修改 state 属性
  this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
      handler(payload)
    })
  })

  // 如果有订阅函数存在，则逐个执行
  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(sub => sub(mutation, this.state))

  if (
    __DEV__ &&
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    )
  }
}

dispatch (_type, _payload) {
  // check object-style dispatch
  const {
    type,
    payload
  } = unifyObjectStyle(_type, _payload)

  const action = { type, payload }
  const entry = this._actions[type]
  if (!entry) {
    if (__DEV__) {
      console.error(`[vuex] unknown action type: ${type}`)
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(sub => sub.before)
      .forEach(sub => sub.before(action, this.state))
  } catch (e) {
    if (__DEV__) {
      console.warn(`[vuex] error in before action subscribers: `)
      console.error(e)
    }
  }

  // 通过异步 Promise 向 actionSubscribers 传递 action 执行结果并执行
  const result = entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload)

  return new Promise((resolve, reject) => {
    result.then(res => {
      try {
        this._actionSubscribers
          .filter(sub => sub.after)
          .forEach(sub => sub.after(action, this.state))
      } catch (e) {
        if (__DEV__) {
          console.warn(`[vuex] error in after action subscribers: `)
          console.error(e)
        }
      }
      resolve(res)
    }, error => {
      try {
        this._actionSubscribers
          .filter(sub => sub.error)
          .forEach(sub => sub.error(action, this.state, error))
      } catch (e) {
        if (__DEV__) {
          console.warn(`[vuex] error in error action subscribers: `)
          console.error(e)
        }
      }
      reject(error)
    })
  })
}
```

首先校验 commit  的传参格式是否正确，在执行执行内部对应 _mutations 前执行原型上的 _withCommit 函数，用于检验是否是通过 commit 执行 mutations 方法修改 state 属性，判断 state 修改的合法性。修改完 state 后如果如果当前 store 对象设置了 subscribe 订阅函数则逐个执行。dispatch  方法的实现差不多，不同的是通过异步 Promise 执行 actions 传递执行结果给 actionSubscribe 函数执行。

如何判断 state 属性修改的合法性，可以查看原型上的 _withCommit 方法：

```js
_withCommit (fn) {
  // 在修改 state 期间，将内部属性 _committing 设置为 true
  // 通过 watch stateChange 查看 _committing 是否为 true 即可判断修改的合法性
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
```

### 5.3 module 安装

配置好 commit 和 dispatch 方法后，进行严格模式的设置，以及模块的安装。严格模式下禁止用户通过其方式修改 state，允许通过 mutations 进行 state 修改。至于模块的安装，其包括初始化 root module、模块的 mutations、actions 以及 getters注册和递归安装子 module。

```js
// strict mode
this.strict = strict

const state = this._modules.root.state

// init root module.
// this also recursively registers all sub-modules
// and collects all module getters inside this._wrappedGetters
installModule(this, state, [], this._modules.root)
```

#### 5.3.1 初始化 rootModule

对于初始化 rootModule，个人感觉更像是初始化 rootState，实现源码如下：

```js
function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  // 注册进模块 namespace map，防止命名冲突
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && __DEV__) {
      console.error(`[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join('/')}`)
    }
    store._modulesNamespaceMap[namespace] = module
  }

  // set state
  // 把模块的 state 设置到 state._vm.$data 的 $$state 属性中，其中 state._vm 定义在 resetStoreVM 中
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      if (__DEV__) {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join('.')}"`
          )
        }
      }
      Vue.set(parentState, moduleName, module.state)
    })
  }
  ...
}
```

判断是否设置了命名空间，若存在则在模块 namespace 的 Map 集合中存储，防止重复安装相同命名空间的子 module，在不是根 module 和 热重载配置的情况下，获取父级 state 和 moduleName， 通过调用`Vue.set(parentState, moduleName, module.state)`将其 sate 设置到父级 state 对象中的 moduleName 属性中，实现模块的响应式 state 注册。

#### 5.3.2 module 上下文环境设置

由于 namespace 的存在，module 如何在 store 对象定位到该模块对象的属性，module 上下文环境的设置实现了该功能，在 module 对象中调用的 mutations、actions 等函数实际上调用的是就是该上下文环境对应命名的属性。

```js
// module上下文环境生成
const local = module.context = makeLocalContext(store, namespace, path)
```

通过调用`makeLocalContext`函数生成对应的 module 上下文环境。

```js
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      // 给 type 添加前置模块命名
      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._actions[type]) {
          console.error(`[vuex] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (__DEV__ && !store._mutations[type]) {
          console.error(`[vuex] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace)
    },
    state: {
      get: () => getNestedState(store.state, path)
    }
  })

  return local
}
```

可以发现`makeLocalContext`函数重新封装了 mutations、actions、getters、state 属性了，module 访问的这些对象属性实际上访问执行的就是设置的上下文环境属性，用于兼容 namespace 的存在。

#### 5.3.3 mutations、actions 以及 getters 注册

循环注册 module 对象下的 mutations、actions 以及 getters。

```js
// 注册一系列 mutations 、actions 以及 getters，并将其 this 绑定到当前 store 对象
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key
    const handler = action.handler || action
    registerAction(store, type, handler, local)
  })

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })
```

给 mutations 所有属性函数插入前置参数的 context 上下文的 state 对象并注册到 store 的 _mutations 属性对象中，给 actions 所有属性函数插入前置前置参数并将函数执行结果转换成 Promise，注册到 store 对象的 _actions 属性对象中，循环注册 getters 则是将添加前置参数的回调函数注册到 store 对象的 _wrappedGetters 属性对象中，这也是为什么通过前置参数访问到 module 的对应属性的原因。

#### 5.3.4 子 module 安装 

```js
// 递归安装子 module
  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
```

通过递归调用`installModule`函数循环注册所有子 module。

### 5.4 初始化用于数据响应式的 store._vm

store 构造函数中调用了`resetStoreVM(this, state)`实现了 state 数据的响应式，具体实现如下：

```js
function resetStoreVM (store, state, hot) {
  const oldVm = store._vm

  // bind store public getters
  store.getters = {}
  // reset local getters cache
  // 重置 getter 缓存集合
  store._makeLocalGettersCache = Object.create(null)
  const wrappedGetters = store._wrappedGetters
  const computed = {}
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    // 设置 compute 对象集合
    computed[key] = partial(fn, store)
    // 通过 Object.defineProperty 重置访问 store.getters 为获取的是 store._vm 属性上的值
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true // for local getters
    })
  })

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  // 使用一个 Vue 实例存储 state 对象树，实现数据响应式
  const silent = Vue.config.silent
  Vue.config.silent = true
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed
  })
  Vue.config.silent = silent

  // enable strict mode for new vm
  // 严格模式用于校验 state 修改合法性
  if (store.strict) {
    enableStrictMode(store)
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null
      })
    }
    // 销毁旧的状态管理实例
    Vue.nextTick(() => oldVm.$destroy())
  }
}
```

绑定 store 对象的 getters 属性，通过`Object.defineProperty`代理不同的 namespace 属性到对应的 store._vm 实例属性上，重置初始化 store 的 getters 缓存集合，执行 getters 函数并赋值给 computed 对象，然后实例化一个用于状态管理的 Vue 实例，把 state 对象和 computed 回调集合传给 Vue 实例，实现数据的响应式，最后将就的 vm 实例给销毁。

### 5.5 plugins 注入

```js
// apply plugins
plugins.forEach(plugin => plugin(this))
```

store 构造函数是 plugins 注入，plugin 插件函数的第一个参数是 store 对象，plugin 可通过 store 提供的可操作函数对 store 进行修改，如`store.subscribe`和`store.subscribeAction`函数，其分别会在对应 mutation 和 action 执行后触发执行。其中 Vuex 自带 devtool 和 logger 插件函数，devtool 的作用主要是提供“时空穿梭”功能，logger 的作用主要是用于保存 mutations 和 actions 的执行日志。

### 5.6 组件绑定的辅助函数实现

在入口文件中，可以看到 mapState、mapGetters、mapMutations、mapActions 以及  createNamespacedHelpers 函数的定义在 helper.js 文件中，具体实现就不在这里展开赘述了，实现无非就是获取对一个 module 组件，通过访问传入的参数对应的组件的上下文环境属性并执行，方便更加高效的调用每个 module 的状态管理。

## 6 实现一个简单版的 Vuex

通过分析学习 Vuex 源码，接下来我们可以基于 Vuex 的编程思想实现一个仅仅含有状态管理功能的 Vuex，具体代码实现见[代码仓库](https://github.com/jackenl/vuex-analysis/tree/master/example) ，你也可以访问该[demo](https://jackenl.github.io/vuex-analysis/)查看实现效果。

## 结语

以上便是本人对 Vuex 源码的解读和分析，对于它个人觉得须着重于分析如何将 store 对象的注入 Vue，store 对象是如何构建的，以及如何构建 module 对象树令 store 对象能够访问到各个子 module 的变量属性，相信经过以上源码的深入解读，大家都对其过程有一定的理解和认识了。

## 参考文献

* [Vuex框架原理与源码分析 - 美团技术团队](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)

