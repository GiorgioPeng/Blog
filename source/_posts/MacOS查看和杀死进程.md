---
title: MacOS查看和杀死进程
date: 2020-02-10 21:55:13
tags: 随手记
category: 操作系统
---
## 查看指定端口是哪个进程占用
```shell
sudo lsof -i:端口号
```
返回的数据中包含

COMMAND  PID         USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
## 杀死指定进程
sudo kill -9 进程id(PID)
