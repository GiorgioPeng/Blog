---
title: 记一次在centos上发布create-react-app的经历
date: 2020-06-11 18:34:18
tags: 随手记
category: React
---
## 安装nodejs
- 安装wget
- - yum install -y wget
- 在[官网](https://nodejs.org/en/download/)找到想要的版本,安装
- - cd ~
- - wget https://nodejs.org/dist/v9.3.0/node-v9.3.0-linux-x64.tar.xz
- 解压
- - xz -d node-v9.3.0-linux-x64.tar.xz
- - tar -xf node-v9.3.0-linux-x64.tar
- 添加软连接(nodejs装好了就别动位置了, 装的时候尽量找一个想要的位置,,懒得找)
- - ln -s ~/node-v9.3.0-linux-x64/bin/node /usr/bin/node
- - ln -s ~/node-v9.3.0-linux-x64/bin/npm /usr/bin/npm
- 检查是否安装好
- - node -v
- - npm -v
## 安装apache
- 安装
- - yum list | grep httpd
- - yum install httpd 
- 启动
- - systemctl start httpd       //开机自启动
- - systemctl enable httpd        //也可以用一下方式启动
- - service httpd start      　//如果执行service httpd start命令出现
- 删掉/var/www/html文件中的内容
## 打包项目
- 在package.json中添加
- - "home":"."
- 打包
- - yarn build
- 移动
- - mv build * /var/www/html
## 成功
-------------------------------------------------------
## 问题:
- 运行yarn 安装项目依赖的时候出现类似 symbol SSL_set_cert_cb 的问题
- - 安装工具包
- - - yum -y install yum-utils
- - 安装或者更新openssl
- - - 安装 yum -y install openssl
- - - 更新 yum -y update openssl
- - 启用
- - - yum-config-manager --enable cr  
- - - yum update
- - 再次yarn 安装依赖