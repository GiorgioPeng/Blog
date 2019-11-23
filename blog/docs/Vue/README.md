---
title: Vue笔记

---


# Vue
---
#### 如何创建一个vue对象:
:::tip
 new Vue()
:::
---  

``` html
<div id="example1">
</div>
```

如果想将上面这个html元素挂载在一个vue对象上

``` js
var example1 = new Vue({
  el:'example1'
})
```
---
#### Vue对象中常用的属性:
- el  
  挂载的元素,使用一个css选择符作为该属性的值
- data  
  vue对象所包含的数据,可以是一个数值,字符串,数组,对象,对象数组
- methods  
  定义vue对象中包含的方法
- computed  
  定义vue对象中包含的属性的计算结果,本质上也就是一个类似data中的数据的数据
- watch  
  定义vue对象中的观测属性

> 初学者可能很难理解computed 属性有什么用, 这里我借用一下官方文档中的例子说明一下   

假如说现在有这样一段html代码和vue代码
```html
<div id="example2">
  {{message.split('').reverse().join("")}}
  <!-- 输出Vue对象中定义的message数据的反转 -->
</div>
```  
```js
var example2 = new Vue({
    el:'example2', //挂载元素
    data:{
      message:"hello vue", // 定义一个message数据
    },
  })
```
很自然,输出结果就是 euv olleh  
那这时候假如我们有需求,假如说我们要输出100000次 message数据的反转  
那么可能有初学者会这么想,定义一个method方法,简化我们的书写,如:  
```html
<div id="example2">
  {{re()}}
</div>
```
```js
var example2 = new Vue({
    el:'example2', //挂载元素
    data:{
      message:"hello vue", // 定义一个message数据
    },
    methods:{
      re:function(){
        return this.message.split('').reverse().join("");// 这里用this表示这个
        //message就是data 中定义的message
      }
    }
  })
```  
哎,确实简化了许多,message.split('').reverse().join("") 这么长一串只需要 写 re() 这四个字符了  

那这时候我们又需要考虑一个问题,每次输出的结果都是相同的,但是我们这么做的话相当于让浏览器执行重复
计算的步骤100000次,这时候我们正常的想法是,将这个结果缓存起来，每次要就直接读取输出就行了，而不是每次
要的时候都是重新计算并且输出的  

这时候我们的computed属性就可以出场了,computed就是这种自带缓存的属性  
我们可以这么写  
```html
<div id="example2">
  {{reverseMessage}}
</div>
```
```js
var example2 = new Vue({
    el:'example2', //挂载元素
    data:{
      message:"hello vue", // 定义一个message数据
    },
    computed:{
      reverseMessage:function(){
        return return this.message.split('').reverse().join("");
      }
    }
  })
```
其实这个使用computed属性的vue对象你可以这么看待,不过是在data中多定义了一条数据而已,但是这条数据是略微动态的,也就是说 message不变的时候它不变,但是message 改变的时候它就会改变
```js
var example2 = new Vue({
    el:'example2', //挂载元素
    data:{
      message:"hello vue", // 定义一个message数据
      reverseMessage:"euv olleh"// 略微动态
    },
  })
```  

#### 上面就是我对computed属性的大致介绍
---  
