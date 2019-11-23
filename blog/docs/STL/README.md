---
title: C++ STL 学习
---
# C++ STL
> 三个核心组件:  
> 1.容器  
> 2.算法  
> 3.迭代器  

## 常用容器介绍:
### string:
  一个可变长字符串,包含在头文件\<string\>当中  
  **初始化方式**:
  ```C++
  std::string s1                 //默认初始化,s1为一个空字符串  
  std::string s2(s1)             //s2是s1的一个深拷贝的副本
  std::string s2=s1              //s2是s1的一个深拷贝的副本,和上面的方法等价
  std::string s3("value")        //s3是一个字符串常量的副本
  std::string s3="value"         //s3是一个字符串常量的副本,和上面的方法等价
  std::string s4=(number,'char') //s4是由Number个相同的char组成的字符串
  ```
  **常用的方法**
  .empty() 判断该字符串是否为空,为空返回true,不然返回false    
  .size() 返回该字符串长度  

### array:
  不可变长度数组,包含在头文件\<array\>当中  
  **初始化方式**  
  ```C++
  std::array<type,number> name              //元素没有进行初始化
  std::array<type,number> name{init value}  //给元素初始值
  ```
  **常用的方法**  
  .fill(value) 快速将一个数组所有元素赋值,会覆盖掉原有的值  
  .at(number) 访问数组中指定位置的元素,会进行越界检查(注:中括号语法访问不会进行越界检查)
