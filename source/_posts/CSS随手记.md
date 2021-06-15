---
title: CSS随手记
date: 2018-04-11 08:15:41
tags: 随手记
category: CSS
---

# CSS

> 这篇会说什么？基础？不，这里会说一些小技巧或者小应用

## 重写浏览器默认选择条 (type = range 的 input 框）

> 先介绍一下 range 型的 input 吧

**常用属性：**

- value 设置当前值
- min 设置最小值
- max 设置最大值
- step 设置步长

**默认的选择条样式**

<input type = 'range'>

_对，没有看错就是这么"丑"_

---

**经过重写之后：**
<input type = 'range' id="range" style="
  position: relative;
  left: 10%;
  width: 80%;
  height: 15px;
  appearance: none;
  background: linear-gradient(#bfddf5, #bfddf5) no-repeat, #f2f2f2;
  outline: none;
  background-size: 50% 100%;
" value="50">

<style type="text/css">

  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none;
    height:25px;
    width: 25px;
    background:#a1a2ac;
    border-radius: 50%;
    border: solid 1px #a1a2ac;
  }
</style>

_是不是好看了许多？因为缺乏 js 的支持，所以可能暂时填充背景颜色的长度可能不会根据滑块的位置变化_

**下面是例子的代码**

```html
<input type="range" id="range" value="50" />
```

```css
input[type="range"] {
  position: relative;
  left: 10%;
  width: 80%;
  height: 15px;
  -webkit-appearance: none; /*清除webkit内核浏览器的默认样式*/
  background: #bfddf5, #f2f2f2; /*设置颜色,前面的为选中,后面的为未选中的颜色*/
  outline: none;
  background-size: 50% 100%;
}
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除webkit内核浏览器的默认样式*/
  height: 25px; /*设置滑块的高度*/
  width: 25px; /*设置滑块的宽度*/
  background: #a1a2ac; /*设置滑块的颜色*/
  border-radius: 50%; /*将滑块变为圆形*/
  border: solid 1px #a1a2ac; /*设置滑块边框*/
}
```

```js
window.onload = function() {
  let range = document.querySelector("#range");
  range.onchange = function() {
    range.style.backgroundSize = range.value + "% 100%"; //根据滑块的位置变化有色条的长度
  };
};
```

---
