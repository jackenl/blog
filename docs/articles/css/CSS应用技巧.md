## CSS 应用技巧

> 一行文本超出省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

> 多行文本超出显示省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

> IOS手机容器滚动条滚动不流畅

```css
overflow: auto;
-webkit-overflow-scrolling: touch;
```

> 4.适配 IphoneX 屏幕安全区域

```html
<head>
	<meta content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" name="viewport"/>
</head>
```

```css
.fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
    padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */
}
```

OS11 新增特性，苹果公司为了适配 iPhoneX 对现有 viewport meta 标签的一个扩展，用于设置网页在可视窗口的布局方式，可设置三个值：

- contain: 可视窗口完全包含网页内容（左图）
- cover：网页内容完全覆盖可视窗口（右图）
- auto：默认值，跟 contain 表现一致

iOS11 新增特性，Webkit 的一个 CSS 函数，用于向 CSS 插入用户代理定义的变量设定安全区域与边界的距离，有四个预定义的变量：

- safe-area-inset-left：安全区域距离左边边界距离
- safe-area-inset-right：安全区域距离右边边界距离
- safe-area-inset-top：安全区域距离顶部边界距离
- safe-area-inset-bottom：安全区域距离底部边界距离

> 4.修改滚动条样式

- `div::-webkit-scrollbar` 滚动条整体部分
- `div::-webkit-scrollbar-thumb` 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条
- `div::-webkit-scrollbar-track` 滚动条的轨道（里面装有 `Thumb`
- `div::-webkit-scrollbar-button` 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置
- `div::-webkit-scrollbar-track-piece` 内层轨道，滚动条中间部分（除去
- `div::-webkit-scrollbar-corner` 边角，即两个滚动条的交汇处
- `div::-webkit-resizer` 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件注意此方案有兼容性问题，一般需要隐藏滚动条时我都是用一个色块通过定位盖上去，或者将子级元素调大，父级元素使用 `overflow-hidden` 截掉滚动条部分。暴力且直接。

> IOS下input输入框placeholder不垂直居中问题

为`input`设置`line-height: 1`可以使input输入框内输入文本垂直居中，但是在 IOS 的 Safari 浏览器中查看， `placeholder` 提示文字垂直方向靠上，解决方案为：为input输入框设置`line-height: normal`。

```css
input {
	line-height: normal;
}
```

