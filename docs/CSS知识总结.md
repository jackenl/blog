## CSS 知识总结

### CSS盒模型

W3C 标准盒模型：属性width、height指的是content区域的宽度和高度

IE 盒模型：属性width、heigtht指的是content+padding+border的宽度和宽度

### CSS权重

浏览器通过css权重的大小决定css样式的优先级，权重越高样式生效优先级越高。

* !important: 无限高
* 行内样式：权重值为 1000
* id 选择器：权重值为 100
* 类、伪类、属性选择器：权重值为 10
* 元素选择器、伪元素选择器：权重值为 1

### 什么是 BFC ？

CSS布局方案有三种：普通流（normal flow）、浮动（float）、绝对定位（absolute position）

格式上下文（BFC）是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及与其他元素的关系和相互作用，属于定位方案中的普通流。

### BFC 特性和应用

BFC的特性：

* BFC 内的元素不会影响外部其他元素的布局
* BFC 内的浮动元素也会参与高度计算
* 同一个 BFC 内的相邻元素垂直方向的 margin 会发生重叠
* BFC 的元素按照水平方向一次排列
* BFC 元素不会与 float 元素重叠

触发 BFC 的方式：

* 根元素
* position 为 fixed、absolute
* float 不为 none
* overflow 不为 visible
* display 为 iniline-block、table-cell、flex

### 定位方式

* relative：相对定位是相对于自身位置定位，设置的位置相对于自己进行位移，不脱离文档流。
* absolute：绝对定位是相对于父级块定位，设置的位置相对于父级块起始位置进行位移，脱离文档流。
* fixed：固定定位是相对于当前窗口定位，设置的位置相对于窗口起始位置进行位移，脱离文档流。
* static：静态定位是每个每个元素的默认值，即文档布局流中的正常位置

### 垂直水平居中

* 父节点设置 text-align: center和line-height等同高度；
* 父节点absolute + translate，设置 postion: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
* 父节点absolute + margin，需设置宽高，设置 postion: absolute; top: 0; left: 0; right: 0; right: 0; bottom: 0;  margin: auto;
* 父节点设置 display: table，子节点设置 display: table-cell; text-align: center; vertical-align: middle;
* 父节点设置 display: flex; justify-content: center; align-items: center;
* 父节点设置 display: grid，子节点设置 align-self: center; justify-self: center;

### 清除浮动（高度塌陷）

```css
// 1.伪类清除浮动
clearfix:after {
	content: '';
	display: inline-block;
	clear: both;
}

// 2.在末尾增加以下属性的空元素
.clear { clear: both }

// 3.触发父元素 BFC
.outer {
  overflow: hidden;
}
```

### 画三角形

```css
.tangle {
	width: 0;
	height: 0;
	border-left: 50px solid transparent;
	border-right: 50px solid transparent;
	border-top: 50px solid transparent;
	border-bottom: 50px solid blue;
}
```

### link @import导入css

1. link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
2. link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
3. link无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
4. link支持使用Javascript控制DOM去改变样式；而@import不支持。

### Animation 和 transition的区别

### Flex 模型

