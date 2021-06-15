---
title: XSS
date: 2018-06-11 13:22:22
tags: 学习笔记
category: Web安全
---

## XSS（跨站脚本攻击）

常见 XSS 类型：
  - 存储型 XSS
  - 反射型 XSS
  - DOM 型 XSS
---

存储型 XSS: 攻击者先再页面中插入恶意 JS 代码，随后用户访问带有恶意代码的页面
> 挖掘：找到能向数据库传递，并且能够再次访问（常见留言，评论等）

反射型 XSS: 攻击者在 URL 中插入 XSS 代码，服务端将 URL 中的 XSS 代码输出到页面上，攻击者将带有 XSS 代码的 URL 发送给用户，用户打开后受到 XSS 攻击
> 挖掘：找到能传入 URL 参数的地方（常见于搜索）

DOM 型 XSS: 攻击者在 URL 中插入 XSS 代码，前端页面直接从 URL 中获取 XSS 代码并且输出到页面，导致 XSS 代码的执行，攻击者将带有 XSS 代码的 URL 发送给用户，用户打开后受到 XSS 攻击
> 挖掘：看 JS 代码

[一个工具](http://xssor.io/)
[IE 测试工具](https://www.my-debugbar.com/wiki/IETester/HomePage)
