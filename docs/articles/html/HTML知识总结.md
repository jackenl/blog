# HTML 知识总结

## html5 新特性

1. 语义化更好的标签元素，新增 header、footer、nav、section、article、aside、details、summary、dialog 等标签；
2. 增强型表单，新增更多的表单 Input 输入类型；
3. 多媒体元素，用于媒介回放的 video 和 audio 元素；
4. 图像效果，用于绘画的 canvas 画布和 svg 矢量图；
5. 地理定位，HTML5 Geolocation 用于定位设备的地理位置；
6. 拖放API，新增 dragstart、drag、dragend 拖放事件；
7. 离线 & 存储，对本地离线存储的更好的更好支持，cookie、localStorage、sessionStorage等；
8. WebSocket，提供在单个 TCP 连接上进行双工通讯的协议；
9. Web Workers，提供多线程支持，让Web应用程序具备后台处理能力；

## 语义化标签

**语义化**是根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

* 作用：
  1. 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
  2. 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重
  3. 方便其他设备解析，如盲人阅读器根据语义渲染网页
  4. 有利于开发和维护，语义化更具可读性，代码更好维护，与 CSS3 关系更和谐

* 常见语义化标签
  * `<header>`
  * `<nav>`
  * `<section>`
  * `<article>`
  * `<aside>`
  * `<figcaption>`
  * `<figure>`
  * `<footer>`

## meta viewport 相关

``` html
<!DOCTYPE html>  H5标准声明，使用 HTML5 doctype，不区分大小写
<head lang=”en”> 标准的 lang 属性写法
<meta charset=’utf-8′>    声明文档使用的字符编码
<meta http-equiv=”X-UA-Compatible” content=”IE=edge,chrome=1″/>   优先使用 IE 最新版本和 Chrome
<meta name=”description” content=”不超过150个字符”/>       页面描述
<meta name=”keywords” content=””/>      页面关键词
<meta name=”author” content=”name, email@gmail.com”/>    网页作者
<meta name=”robots” content=”index,follow”/>      搜索引擎抓取
<meta name=”viewport” content=”initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no”> 为移动设备添加 viewport
<meta name=”apple-mobile-web-app-title” content=”标题”> iOS 设备 begin
<meta name=”apple-mobile-web-app-capable” content=”yes”/>  添加到主屏后的标题（iOS 6 新增）
是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
<meta name=”apple-itunes-app” content=”app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL”>
添加智能 App 广告条 Smart App Banner（iOS 6+ Safari）
<meta name=”apple-mobile-web-app-status-bar-style” content=”black”/>
<meta name=”format-detection” content=”telphone=no, email=no”/>  设置苹果工具栏颜色
<meta name=”renderer” content=”webkit”>  启用360浏览器的极速模式(webkit)
<meta http-equiv=”X-UA-Compatible” content=”IE=edge”>     避免IE使用兼容模式
<meta http-equiv=”Cache-Control” content=”no-siteapp” />    不让百度转码
<meta name=”HandheldFriendly” content=”true”>     针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓
<meta name=”MobileOptimized” content=”320″>   微软的老式浏览器
<meta name=”screen-orientation” content=”portrait”>   uc强制竖屏
<meta name=”x5-orientation” content=”portrait”>    QQ强制竖屏
<meta name=”full-screen” content=”yes”>              UC强制全屏
<meta name=”x5-fullscreen” content=”true”>       QQ强制全屏
<meta name=”browsermode” content=”application”>   UC应用模式
<meta name=”x5-page-mode” content=”app”>    QQ应用模式
<meta name=”msapplication-tap-highlight” content=”no”>    windows phone 点击无高光
设置页面不缓存
<meta http-equiv=”pragma” content=”no-cache”>
<meta http-equiv=”cache-control” content=”no-cache”>
<meta http-equiv=”expires” content=”0″>
```
