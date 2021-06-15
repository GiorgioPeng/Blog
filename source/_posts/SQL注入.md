---
title: SQL注入
date: 2018-07-11 18:22:11
tags: 学习笔记
category: Web安全
---

## sql 注入准备知识

> 原文在我的 csdn 博客上
传送门 => [](https://blog.csdn.net/Q_giorgio/article/details/88750624)
> 这篇文章会介绍一些 sql 注入的准备知识，都是基于 mysql 数据库的

**sql 语言是什么：** 一种功能极强的关系数据库标准语言，不需要定义如何访问数据库，只需要告诉数据库要做什么

**sql 语言的主要功能** :

 - 查询
 - 操纵
 - 定义
 - 控制
---

### 常用的 sql 注入中的函数：

**基本数据库信息**
 - @@version 和 version() 查询数据库的版本信息
 - user() 查询用户名
 - current_user() 查询当前用户名
 - system_user() 查询系统用户名
 - session_user() 查询链接数据库的用户名
 - database() 查询当前使用的数据库名
 - @@datadir 查询数据库的路径
 - @@version_compile_os 查询操作系统
 - @@basedir 	查询数据库安装路径

 **操作查询出的数据函数**

 - concat（多个字段名）  连接数据，例如 concat(username,password), 将连个字段连接成一个字段，中间没有任何符号分割，但是可以自己指定分割符，如 concat(username,'~',password)
 - concat_ws('分隔符', 多个字段名）, 可以直接指定分隔符，如果分隔符在中间，如 concat_ws(username,'~',password), 查询结果会变成 ~usernamepassword
 - ascii(string) 返回参数的第一位的 ascii 码值
 - ord(string) 返回参数的第一位的 ascii 码值
 - substr(string,start,lenth) 切割字符串，返回切割后的结果，通常和 ASCII() 连用
 - mid() 和 substr() 类似
 - length(string) 返回参数的长度
 - group_concat（可以多个字段字段名） 将多行结果连接成一行返回出来，通常在查询时页面只能显示一行结果时使用，能较为快捷的获得所有数据，如果用多个字段名，会返回类似 concat() 拼接的结果然后再组成一行
 - count（单个字段名） 返回该字段名下一共有多少个结果
 - left(string,number) 返回 string 中 从左往右数共 Number 个字符
 - floor(number) 返回小于等于 number 的最大整数
 - rand() 返回 0 到 1 之间的一个随机数
- sleep(time) 休眠多少秒
 ---

### 常见疑惑：

> 我初期学习的时候一直感到疑惑的语句，在这里记录一下

 **select 1,2 这种语句是干什么的？**

 *在 sql 语句查询中，如果使用 Union 进行联合查询，union 前后结果的列的数量不同会导致报错，这里 1,2 等就起一个占位的作用，select 某个常量值就会直接返回这个常量*

 如 select username,password from users union select schema_name from information_schema.schemata 会报错，因为前面的语句 select username,password from users 返回结果为：

|username |password |
|--|--|
|username1 | password |

而后面返回的结果为
| schema_name|
|--|
| schema_name1 |

两边的列的数量不一样
但是如果这时我使用   select username,password from users union select 1,schema_name from information_schema.schemata

返回结果就是
|username|password |
|--|--|
|username1|password1|
|username2|password2|
|1|schema_name1|
|1|schema_name2|

由此可见，这个 1 仅仅是一个占位作用
当然为了更加明了，有时候我们也可以 select 一个字符串常量，如
select username,password from users union select "database name: ",schema_name from information_schema.schemata
返回结果就是
|username|password |
|--|--|
|username1|password1|
|username2|password2|
|database name: |schema_name1|
|database name:|schema_name2|
