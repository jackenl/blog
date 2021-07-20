# Javascript 知识总结

## 数据类型

基本类型（primitives）：undefined, null, string, number, boolean, symbol(es6)；

引用类型（objects）：Object(Array, Function, Date, Regx, ...)；

## 类型转换

#### ToPrimitive

在发生类型转换时，js会将操作对象转换成`primitive`类型，即原始对象。

ToPrimitive(input, PPreferredType?) //PreferredType: Number 或者 String

流程如下：

1. `input`为原始值（即基本类型），直接返回；
2. 不是原始值，调用该对象的valueOf()方法，如果结果是原始值，返回原始值；
3. 调用valueOf()结果不是原始值，调用此对象的toString()方法，如果结果是原始值，返回原始值；
4. 如果返回的不是原始值，抛出异常TypeError。

其中`PPreferredType`控制是调用valueOf()还是toString()。

> PS：在ES6中JS会优先调用[Symbol ToPrimitive]来转换为原始类型

## 类型判断

## 原型

## 原型链

## 执行上下文

## 词法环境

## 作用域

## 作用域链

## 闭包

## new

## instanceof

## this

## 对象拷贝

## 模块化

## 防抖与节流

## 继承

## ES6/ES7