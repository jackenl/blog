# Vue 和 React 的异同

## 共同点

### 1. 数据驱动视图

在JQuery时代，我们需要频繁的操作DOM来实现页面效果与交互，而Vue和React采用了数据驱动视图的方式，对DOM操作进行隐藏自动处理，对于开发者而言，只需要关注数据变化即可

### 2. 遵循组件化思想

Vue和React都遵循了组件化思想，对视图进行了特定的抽象，是我们可以开发一个个独立的视图组件来构建一个完整的前端应用

### 3. 使用Virtual DOM

Vue与React都使用了`Virtual DOM`+`Diff`算法来描述组件和进行组件更新，不管是Vue的template模板+`option api`的写法，还是React的class或者Function写法，都是最后生成`render`函数，通过执行`render`函数返回对应的`VNode`节点对象

当触发组件更新时，总会根据render函数重新生成最新的VNode对象，然后使用diff算法与旧的VNode进行对比，更新渲染出真实DOM

## 不同点

### 1. 核心数据流不同

### 1. 响应式原理不同

### 2. 编译渲染不同

