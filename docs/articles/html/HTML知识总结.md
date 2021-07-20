# HTML 知识总结

## html5 新特性

1. 语义化更好的标签元素，新增 header、footer、nav、section、article、aside、details、summary、dialog 等标签；
2. 增强型表单，新增更多的表单 Input 输入类型；
3. 多媒体元素，用于媒介回放的 video 和 audio 元素；
4. 图像效果，用于绘画的 canvas 画布和 svg 矢量图；
5. 地理定位，HTML5 Geolocation 用于定位设备的地理位置；
6. 拖放 API，新增 dragstart、drag、dragend 拖放事件；
7. 离线 & 存储，对本地离线存储的更好的更好支持，cookie、localStorage、sessionStorage 等；
8. WebSocket，提供在单个 TCP 连接上进行双工通讯的协议；
9. Web Workers，提供多线程支持，让 Web 应用程序具备后台处理能力；

## 语义化标签

**语义化**是根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

- 作用：

  1. 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
  2. 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重
  3. 方便其他设备解析，如盲人阅读器根据语义渲染网页
  4. 有利于开发和维护，语义化更具可读性，代码更好维护，与 CSS3 关系更和谐

- 常见语义化标签
  - `<header>`
  - `<nav>`
  - `<section>`
  - `<article>`
  - `<aside>`
  - `<figcaption>`
  - `<figure>`
  - `<footer>`

## DOCTYPE

DOCTYPE 是用来声明 HTML 文档类型和 DTD 规范的，浏览器可以通过它校验文件代码的合法性

```html
<!DOCTYPE html> H5标准声明
```

## meta 标签

- `charset`：定义 HTML 文档的字符集

  ```html
  <meta charset="utf-8">
  ```

- `http-equiv`：用于模拟 http 请求头，可设置过期时间、缓存、刷新

  ```html
  <meta http-equiv="Expires" content="0">
  <meta http-equiv="Cache-control" content="no-cache">
  ```

- `viewport`：视图窗口，用于控制页面宽高及缩放缩放比例

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
  ```

## viewport 属性

- `width`/`height`: 视图窗口宽高，默认宽度为980px
- `initial-scale`: 初始缩放比例，比例范围为1～10
- `maximum-scale`/`minimum-scale`：允许用户缩放的最大/最小比例
- `user-scalable`：用户是否可以缩放

## src 与 href 的区别

- src 是指外部资源的位置，指向的内容会嵌入到文档中当前标签所在的位置，当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到该资源加载、编译和执行完毕
- href 是指向外部资源的位置的超链接，当浏览器解析到当该元素时，会并行下载资源，不会停止对当前文档的处理

## div + css 布局与 table 布局

div + css 布局在具备 table 标签的样式布局的同时，同样拥有以下优势：

1. 结构与样式分离
2. 代码语义性更好
3. 更符合 HTML5 标准规范
4. 对 SEO 更友好

