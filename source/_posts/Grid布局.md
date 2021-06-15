---
title: Grid布局
date: 2018-09-11 16:19:22
tags: 随手记
category: CSS
---

# Grid 布局

> 最强大，最复杂的布局，也是刚出来没多久的布局
> 将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局

---

## 基本概念

容器 (container): 最外层元素
 项目 (item): 容器的直接子元素，不能使容器子元素的子元素

:::tip
注意：grid 布局规定的样式只对项目生效
:::
网格线包含最两端，所以网格线的数量是网格加 1

#### 例子：

<div class="grid" style="display:grid;grid-template-columns:33% 33% 33%;grid-template-rows:200px 50px">
  <div style="border:2px solid black;line-height:200px;text-align:center;background-color:white">实例</div>
  <div style="border:2px solid black;line-height:200px;text-align:center;background-color:red">1</div>
  <div style="border:2px solid black;line-height:200px;text-align:center;background-color:green">2</div>
  <div style="border:2px solid black;line-height:50px;text-align:center;background-color:yellow">3</div>
  <div style="border:2px solid black;line-height:50px;text-align:center;background-color:orange">4</div>
  <div style="border:2px solid black;line-height:50px;text-align:center;background-color:skyblue">5</div>
</div>

```html
<div class="grid">
  <div
    style="
    border:2px solid black;
    line-height:200px;
    text-align:center;
    background-color:white
  "
  >
    实例
  </div>
  <div
    style="
    border:2px solid black;
    line-height:200px;
    text-align:center;
    background-color:red
  "
  >
    1
  </div>
  <div
    style="
    border:2px solid black;
    line-height:200px;
    text-align:center;
    background-color:green
  "
  >
    2
  </div>
  <div
    style="
    border:2px solid black;
    line-height:50px;
    text-align:center;
    background-color:yellow
  "
  >
    3
  </div>
  <div
    style="
    border:2px solid black;
    line-height:50px;
    text-align:center;
    background-color:orange
  "
  >
    4
  </div>
  <div
    style="
    border:2px solid black;
    line-height:50px;
    text-align:center;
    background-color:skyblue
  "
  >
    5
  </div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: 200px 50px;
}
```

## 配置在容器上的属性

- 设置行 / 列的两个属性：
  - grid-template-columns: 设置每一列的大小，每两个列之间用空格隔开，有几个列写几个
  - grid-template-row: 设置每一行的大小，每两个行之间用空格隔开，有几个行写几个

:::warning
注意：如果使用相对单位如 % 并且没有给容器规定大小，则是以容器的父容器计算
:::

- 简化书写的小技巧：

  - repeat（重复的次数，重复的值）
     如：grid-template-columns: 200px 200px 200px
     可以简写成 grid-template-columns:repeat(3,200px)
     grid-template-columns:200px 100px 200px 100px 200px 100px
     可以简写成 grid-template-columns:repeat(3,200px 100px)

- 自动数量填充：

  - auto-fill: 自动填充项目个数
     如：repeat(auto-fill,200px): 创建 n 个（尽可能多）, 直到行（列）装不下或者项目显示完全为止

- 相对单位：

  - fr: 用容器总宽（高）减去绝对单位之后，分成 N（所有 fr 个数加起来）份，再按照每个项目的 fr 值分配大小
    如：grid-template-columns: 1fr 2fr 将容器宽度均分成三份，第一个项目占一份 (33.3%), 第二个项目占两份 (66.6%)
     grid-template-columns: 100px 1fr 4fr 将容器总宽度减去 100px 之后均分成五份，第二个项目占一份，第三个项目占四份

- 自适应调节大小：

  - minmax（最小值，最大值）: 产生一个长度范围，表示长度就在这个范围之中自动执行
    如：grid-template-columns: 100px minmax(200px,300px) 第二个项目宽度默认是尽可能的接近最大值

- 自动大小

  - auto: 由浏览器自己决定，如果设置给宽 (columns) 时尽可能的宽，如果设置给高 (row) 时，与元素高度相匹配

- 行 / 列间距：

  - grid-row-gap: 设置行与行之间的间距
  - grid-column-gap: 设置列与列之间的间距
  - grid-gap: 简写

- 填充方式：
  - grid-auto-flow: 有以下四个值 - row 从行开始 - column 从列开始 - row dense 从行开始，尽可能满（见缝大小够就插） - column dense 从列开始，尽可能满（见缝大小够就插）
    :::tip
    此处应有例子，下面几个例子是用来展示填充方式的
    :::

**grid-auto-flow:row**

<div style="grid-auto-flow:row;width:300px;height:300px;display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);grid-gap:5px 5px;margin-bottom:100px">
  <div style="background-color:red;text-align:center;line-height:50px">1</div>
  <div style="background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

**grid-auto-flow:column**

<div style="grid-auto-flow:column;width:300px;height:300px;display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);grid-gap:5px 5px;margin-bottom:100px">
  <div style="background-color:red;text-align:center;line-height:50px">1</div>
  <div style="background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

**grid-auto-flow:row**

<div style="grid-auto-flow:row;width:300px;height:300px;display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);grid-gap:5px 5px;margin-bottom:100px">
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:red;text-align:center;line-height:50px">1</div>
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

**grid-auto-flow:row dense**

<div style="grid-auto-flow:row dense;width:300px;height:300px;display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);grid-gap:5px 5px;margin-bottom:100px">
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:red;text-align:center;line-height:50px">1</div>
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

**grid-auto-flow:column**

<div style="grid-auto-flow:column;width:300px;height:300px;display:grid;grid-template-columns:repeat(3,100px);grid-template-rows:repeat(3,100px);grid-gap:5px 5px;margin-bottom:100px">
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:red;text-align:center;line-height:50px">1</div>
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

**grid-auto-flow:column dense**

<div style="
  grid-auto-flow:column dense;
  width:300px;
  height:300px;
  display:grid;
  grid-template-columns:repeat(3,100px);
  grid-template-rows:repeat(3,100px);
  grid-gap:5px 5px;
  margin-bottom:100px
">
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:red;text-align:center;line-height:50px">1</div>
  <div style="grid-column-start: 1;grid-column-end: 3;background-color:orange;text-align:center;line-height:50px">2</div>
  <div style="background-color:grey;text-align:center;line-height:50px">3</div>
  <div style="background-color:gold;text-align:center;line-height:50px">4</div>
  <div style="background-color:yellow;text-align:center;line-height:50px">5</div>
  <div style="background-color:green;text-align:center;line-height:50px">6</div>
  <div style="background-color:skyblue;text-align:center;line-height:50px">7</div>
  <div style="background-color:darkred;text-align:center;line-height:50px">8</div>
  <div style="background-color:pink;text-align:center;line-height:50px">9</div>
</div>

---

- 指定单元格内容的位置：
  - justify-items:start | end | center | stretch
    设置单元格中内容的水平位置
  - align-items:start | end | center | stretch
    设置单元格中内容的垂直位置
  - place-items:
    简写

* 设置所有内容的位置：

  - justify-content:start | end | center | stretch | space-around | space-between | space-evenly
    设置整个内容区域的水平位置
  - align-content:start | end | center | stretch | space-around | space-between | space-evenly
    设置整个内容区域的垂直位置
  - place-content:
    简写

* 设置自动补充的网格大小：
  - grid-auto-columns
    自动补充列的宽度
  - grid-auto-rows
    自动补充行的高度

---

## 配置在项目上的属性

- 指定单元格所在位置：
  - grid-column-start
    起始列
  - grid-column-end
    结束列
  - grid-row-start
    起始行
  - grid-row-end
    结束行

:::tip
下面的例子展示的是单元格位置设置
:::

  <div style="
      width: 300px;
      height: 300px;
      display: grid;
      grid-template-columns: repeat(3,100px);
      grid-template-rows: repeat(3,100px);
      grid-auto-columns: 100px;
      grid-auto-rows: 100px;
      margin-bottom: 200px;
  ">
      <div style="grid-column-start:1;grid-column-end:3;background-color:red;font-weight:bold;text-align:center;">1</div>
      <div style="background-color:green;font-weight:bold;text-align:center;">2</div>
      <div style="background-color:grey;font-weight:bold;text-align:center;">3</div>
      <div style="background-color:skyblue;font-weight:bold;text-align:center;">4</div>
      <div style="background-color:gold;font-weight:bold;text-align:center;">5</div>
      <div style="background-color:pink;font-weight:bold;text-align:center;">6</div>
      <div style="background-color:orange;font-weight:bold;text-align:center;">7</div>
      <div style="background-color:darkred;font-weight:bold;text-align:center;">8</div>
      <div style="background-color:yellow;font-weight:bold;text-align:center;">9</div>
  </div>

> > 因为第一个块占据了两格，因此下面多出一格

```html
<div
  style="
    width: 300px;
    height: 300px;
    display: grid;
    grid-template-columns: repeat(3,100px);
    grid-template-rows: repeat(3,100px);
    grid-auto-columns: 100px;
    grid-auto-rows: 100px;
    margin-bottom: 200px;
"
>
  <div
    style="
      grid-column-start:1;
      grid-column-end:3;
      background-color:red;
      font-weight:bold;
      text-align:center;
    "
  >
    1
  </div>
  <div
    style="
      background-color:green;
      font-weight:bold;
      text-align:center;
    "
  >
    2
  </div>
  <div
    style="
      background-color:grey;
      font-weight:bold;
      text-align:center;
    "
  >
    3
  </div>
  <div
    style="
      background-color:skyblue;
      font-weight:bold;
      text-align:center;
    "
  >
    4
  </div>
  <div
    style="
      background-color:gold;
      font-weight:bold;
      text-align:center;
    "
  >
    5
  </div>
  <div
    style="
      background-color:pink;
      font-weight:bold;
      text-align:center;
    "
  >
    6
  </div>
  <div
    style="
      background-color:orange;
      font-weight:bold;
      text-align:center;
    "
  >
    7
  </div>
  <div
    style="
      background-color:darkred;
      font-weight:bold;
      text-align:center;
    "
  >
    8
  </div>
  <div
    style="
      background-color:yellow;
      font-weight:bold;
      text-align:center;
    "
  >
    9
  </div>
</div>
```

- 设置自身在单元格中的位置
  - justify-self:start | end | center | stretch
    规定自身在单元格内容中的水平位置
  - align-self: start | end | center | stretch
    规定自身在单元格内容中的垂直位置
  - place-self:
    简写
