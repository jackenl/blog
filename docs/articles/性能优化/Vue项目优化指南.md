# Vue 项目优化指南

## 1. v-if 和 v-show 区分使用场景

v-if 属于条件渲染，在切换过程会对组件进行销毁和重建，并且当初始值为 false 时不会进行渲染，当值切换为 true 时才开始渲染

v-show 元素总是会被渲染，只是条件切换元素 CSS 的 dispaly 属性

因此，v-if 适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show 则适用于需要非常频繁切换条件的场景

## 2. computed 和 watch 区分使用场景

computed 是计算属性，依赖于其他属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值

watch 本质上是为每个监听属性 setter 创建了一个 watcher，当被监听的属性更新时，调用传入的回调函数

computed 适用于依赖多个属性的频繁计算逻辑；watcher 适用于需要执行异步或开销较大的操作

## 3. v-for 遍历为item添加key

```vue
<ul>
  <li v-for="user in users":key="user.id">
    {{ user.name }}
  </li>
</ul>
```

## 4. 避免同时使用 v-for 和 v-if

```vue
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id">
    {{ user.name }}
  </li>
</ul>
<script>
	export default {
    computed: {
      // 使用计算属性过滤列表元素
      activeUsers() {
        return ths.users.filter(item => {
          return item.isActive;
        });
      }
    }
  }
</script>
```

## 5. 长列表性能优化

```js
export default {
	data() {
		return {
			list: []
		};
	},
	async created() {
		const res = await axios.get('/api/list');
    // 使用Object.freeze冻结对象
		this.list = Object.freeze(list);
	}
}
```

## 6. 事件的销毁

```js
export default {
  created() {
    document.addEventListener('scroll', this.scrollHandle);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.scrollHandle);
  }
}
```

## 7. 按需引入第三方插件

（1）安装babel-plugin-component：

```
npm install balbel-plugin-component -D
```

（2）将 .babelrc 修改为：

```
{
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}

```

（3）引入部分组件：

```js
// 编译前
import { Button } from 'element-ui';

// 编译后
var button = require('components/lib/button')
require('components/lib/button/style.css')
```

## 8. 路由懒加载

```js
const Home = () => import('@/views/home/index.vue');
const router = new VueRouter({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    }
  ]
});
```

## 9. 虚拟长列表

```js
const imageLazy = {
  // 初始化
  _init(el, val, def = '') {
    el.setAttribute('data-src', val);
    el.setAttribute('src', def);
  },
  // 初始化IntersectionObserver监听
  _initIntersectionObserver(el) {
    const observe = new IntersectionObserver((entries) => {
      const realSrc = el.dataset.src;
      if (entries[0].isIntersecting && realSrc) {
        el.src = realSrc;
        el.removeAttribute('data-src');
      }
    });
    observe.observe(el);
  }
}

Vue.directive('lazy', {
  bind(el, binding) {
    imageLazy._init(el, binding.value);
  },
  inserted(el) {
    imageLazy._initIntersectionObserver(el);
  }
});
```

## 10. 服务端渲染或预渲染

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。