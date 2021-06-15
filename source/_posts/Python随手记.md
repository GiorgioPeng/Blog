---
title: Python随手记
date: 2019-03-11 15:18:45
tags: 随手记
category: PYTHON
---

# Python

> 这篇文章主要功能暂定为一个通俗易懂的功能字典

:::warning
普通的变量声明和简单的语法及循环等这里不再赘述
:::

## 几个操作

- 多变量声明：a,b,c = 1,2,3
- 取幂：**  如 2**3 = 8
- 取整商：// 如 10//4 = 2
---

## Python 中常用的数据结构

- 元组 ()
- 列表 []
- 字典 {}

:::tip
两个元组（列表） 可以通过 "+" 操作符连接
一个元组（列表） 可以通过 "\*" 操作符复制
:::

## 切片

切出一个左闭右开的区间
如："abcdefg"[2:4] 返回的是 "cd"
- [x:] 表示从第 x 个到最后一个
- [:y] 表示从第 0 个到第 y-1 个

## 步长

规定切片之间间隔的变量个数
如 "abcdefg"[1:4:2] 返回的是 "bd"
解释：[1:4] 切出来的是 "bcde" 从这个结果中第 0 个开始，每隔 1 个取一个

## 删除列表 / 列表元素

使用 del 语句
- del list[1] 删除列表中第一个元素
- del list[2:4] 删除列表中第三和第四个元素
- del list 删除这个列表，这个变量没有任何指向了

## 列表常用函数

- len() 返回列表长度
- max() 返回列表中最大值
- min() 返回列表中最小值
- sum() 返回列表的和
- sorted() 对一个列表进行排序，返回排序的结果，不改变被排序的列表

## 列表常用方法

- .index(value) 求列表中第一次出现值为 value 元素的索引，不存在会报错
- .count(value) 求列表中出现了几次值为 value 的元素
- .remove(value) 移除列表中值为 value 的元素，有多个只会移除第一个，没有该值会报错
- .append(value) 在列表末尾添加一个值为 value 的元素，即使这个元素时一个列表，也会作为一个元素添加进去
- .extend(value) 可以用来添加多个元素，如果 value 是一个列表，则会将这个两个列表拼起来
- .clear() 删除列表中所有元素
- .insert(position,value) 在索引为 Position 的地方插入 value
- .copy() 复制一个列表，仅仅是值传递，不是引用传递
- .sort() 对一个列表进行排序，如果括号内写 reverse=True 则会方向排序，默认对数字从小到大，对字母按照字典顺序排列

## 生成器

- range() 生成一个左闭右开的区间，左边的数缺省是 0, 参数间隔和切片不同，使用",", 可以设定步长 生成的结果可以强转为列表或者元组

## 格式化输出

- %i 表示整数
- %c 表示字符
- %u 表示无符号整数
- %o 表示八进制
- %d 表示十进制
- %x 表示十六进制
- %s 表示字符串
  - %10s 表示右对齐输出，占位符 10 位（占位符个数可以更改，占位符为空格符）
  - %-10s 表示左对齐输出，占位符 10 位
  - %.2s 截取字符串起始两位
- %e 表示科学计数法
- %g 自动识别，比较简单用浮点数，比较复杂用科学计数法
- 多个参数时，采用 %(str1,str2) 的格式
> a = "hello python"
> print("%s" % a)
> 输出：hello python

- 使用{} 和 .format() format() 参数为一个元组，{}内可以加一个索引，如果没有索引的时候{}的数量必须和元组长度一样，当{}内为一个变量名时，format() 参数为一条赋值语句。
>如 print('今天如何{}昨天{}'.format(", 好，",". 不好。"))
print("今天{how}".format(how = '好'))

## 字符串常用方法

- .replace("oldString","newString"[,count]) count 表示要替换的个数，返回值为结果字符串，不会改变源字符串
- .split("symbol") 用指定符号将字符串切割成列表
:::tip
如果 split() 中不传入任何参数，则会以空格切割
:::
:::danger
不能使用 split(''), 如果想将字符串中每一个字符都变成一个列表中的元素，应该使用 list() 函数强转字符串
:::
- 'symbol'.join(list/tuple) 将一个列表或者元组以指定分隔符合并成一个字符串
:::tip
这里可以使用空字符串进行合并
:::
- .startswith("string") 检测该字符串是否以默认字符（串）开头，如果是则返回 True, 否则返回 False
- .endswith("String") 检测该字符串是否以默认字符（串）结尾，如果是则返回 True, 否则返回 False
:::warning
这里是 startswith 而不是 startwith
:::
- .upper() 返回一个新字符串，该字符串的值为源字符串转化成大写，不会改变源字符串
- .lower() 返回一个新字符串，该字符串的值为源字符串转化成小写，不会改变源字符串
- .swapcase() 返回一个新字符串，该字符串中大写字符为源字符串的小写字符，该字符串的小写字符为源字符串的大写字母，不会改变源字符串
- .capitalize() 返回一个新字符串，新字符串和源字符串的区别为新字符串首字母大写，不会改变原字符串
- .isnumeric() 判断该字符串是否全部由数字构成，如果是则返回 True, 否则返回 False
- .isalpha() 判断该字符串是否全部为字符构成，如果是则返回 True, 否则返回 False
- .isalnum() 判断该字符串是否全部由字符和数字构成，如果是则返回 True, 否则返回 False
- .isspace() 判断该字符串是否全为空格，如果是则返回 True, 否则返回 False
- .isdigit() 判断该字符串是否全为数字，如果是则返回 True, 否则返回 False
- .strip() 去掉源字符串两端的空格并且返回一个新字符串，不会改变源字符串
- .rstrip() 去掉源字符串右侧的空格并且返回一个新字符串，不会改变源字符串
- .lstrip() 去掉源字符串左侧的空格并且返回一个新字符串，不会改变源字符串

## 字典

声明一个字典的常用方式：
- 直接赋值 如 dic = {'a':1,'b':2}
- 使用 dict()
  - 使用 dict() 转化包含列表的列表：
> lst = [[1,2],[2,3],[3,4]]
dic = dict(lst)
dic : {1: 2, 2: 3, 3: 4}

  - 使用 dict() 快速赋值：
> dic = dict( m = 1,n = 2,h = 3)
print(dic)
dic:{'m':1,'n':2','h':3}

- 使用 dict.fromkeys(list[,value]) 函数
> list 为字典的键名，如果 value 没有指定，那么默认每一个元素的值都为 None

:::warning
字典的键名必须是不可变对象
:::

字典中常用的方法：
- .get(key) 返回 key 所对应的值
:::tip
可以直接使用中括号语法访问
:::
- .keys() 返回一个视图，其中包含所有 key 值，和 range 生成的结果结构类似
- .values() 返回一个视图，其中包含所有 value 值，和 range 生成的结果结构类似
- .items() 返回一个视图，其中包含所有项目，和 range 生成的结果结构类似
---

## 函数声明

- def function_name（参数列表）:
 - 默认值：直接在声明参数的时候，赋值即可 如 def a(x,y=10)
 - 可变参数：使用 "\*" 关键字 如 def a(\*x) 这时候会将这个参数变成一个元组

## python 层级概念

- 表达式 -> 创建，处理对象
- 语句 -> 包含表达式
- 逻辑单元 -> 函数或者类，由语句构成
- 模块 -> .py 代码文件组成模块
- 包 ->定义自己有关系的文件，或者模块（包可以想象成文件夹，模块可以想象成文件夹当中的模块）
- 程序 -> 若干个包 + 若干个模块

## 导入模块

- import modelname 导入指定模块
- import modelname as simplename 在调用的时候可以简化书写
- from modelname import functionname 导入部分模块（例如仅仅导入几个函数）

## 常用模块介绍

- random
  - random.random() 返回一个 0 到 1 之间的随机浮点数
  - random.randint(a,b) 返回一个在 [a,b] 区间中的随机整数
  - random.choice(list/tuple) 返回指定列表（元组）中的随机一项
  - random.sample(list/tuple,numberOfResult) 返回一个指定元素个数的列表，列表中的元素为在指定的列表或者元组中随机选择的
  - random.shuffle(list) 将指定列表随机打乱，直接在源列表中操作，没有返回值
- time
  - time.sleep(second)  暂停指定秒数（不是毫秒）
  - time.ctime() 返回当地时间，为字符串类型 如：'Sun May 19 16:00:58 2019'
  - time.localtime() 返回当前时区的时间，为一个视图 wday 0-6 分别表示周一到周天，yday 1-366 分别表示一年中的第几天
  - time.strftime("时间格式",time.localtime()) 返回当前指定格式的时间，为一个字符串，如 %Y-%m-%d %H:%M:%S 返回  年 - 月 - 日 时：分：秒
  - time.time() 返回当前毫秒数

## 文件读取

:::tip
多多注意文件指针的位置
:::
- open(filePath,type[,encoding]) 返回一个类似 C 语言中文件指针的东西
  - filePath（记得转义）
    - 绝对路径
    - 相对路径
  - type 类型：
    - 'r' 读取文件，默认
    - 'w' 写入文件
    - 'rw' 读写文件
    - 'a' 追加
- filePointer.read([number]) 读取文件所有内容，返回一个字符串，如果指定 Number 值，则会读取指定数量的字符
- fielPointer.readline([number]) 读取文件一行，如果指定 number 值的话，则会读取该行的 number 个字符，第二次调用该函数的时候，如果该行没有读完，会继续读
- filePointer.readlines() 读取文件中所有行，返回结果为一个列表，每一行就是列表中的一个元素，每一个元素以换行符结尾
- filePointer.seek(number) 移动文件指针 0 表示起始位置
- filePointer.close() 关闭文件
- filePointer.write(string) 将指定内容写入文件中，记得要关闭文件
- filePointer.writelines(list) 一行一行的写入文件，列表中必须是字符串型的数据，不会换行，直接把列表变成字符串，除非添加换行符

## os 模块

> 提供了丰富的方法处理文件和目录
> 使用方法：import os

- os.name 返回一个包含系统名字的字符串
- os.getcwd() 返回一个字符串，其中包含当前文件绝对路径
- os.listdir() 返回一个列表，其中包含当前文件的所有文件和目录名
- os.chdir(newPath) 改变工作路径为指定工作路径
- os.remove(filename) 删除指定文件
- os.path.split(filePath) 返回一个元组，前者是文件目录，后者是文件名
- os.path.exists(filePath) 返回一个布尔值，判断一个文件是否存在

## pickle 模块

> 提供了一个简单的持久化功能，可以将对象以文件的形式存放在磁盘中
> 提供了基本数据的序列化和反序列化
> 通过序列化操作可以将程序运行中的对象信息保存在文件中，永久储存
> 通过反序列化操作，可以从文件中创建上一次程序保存的对象

:::warning
写入方式不是'w' 而是 'wb'; 读取方式不是'r' 而是 'rb'
:::
- pickle.dump(string,filepath) 将数据储存进 .pkl 文件
- pickle.load(filepath) 返回 file 中的数据

## numpy 模块

> 开源强大的科学计算工具包
> 与列表的直观区别：输出的时候元素之间没有','号

- 创建 numpy 数组
  - numpy.array(list/range()) 通过一个 list 或者视图返回一个数组
  - numpy.arange(number) 直接调用内置方法返回一个数组，和 range 用法类似
:::tip
对数组直接进行加减乘除操作就相当于对数组中的每一项进行该操作
:::

- 数组常用属性：
  - .ndim 返回数组的维度
  - .shape 返回一个元组，其中包含数组的列数和行数
  - .size 返回数组中元素的个数
  - .dtype 返回数组中元素的数据类型
  - .itemsize 返回数组中元素的字节大小
  - .data 返回数组在缓存区中的位置

- 数组常用方法：
  - .mean() 返回数组中所有元素取平均值的结果
  - .sum() 返回数组中所有元素加起来的值
  - .reshape(shape) 返回重置形状之后的数组，不改变原数组，但是不能改变元素个数
:::tip
这里的 shape 就是一个有序数对，假如说使用 array.reshape(2,5) 就是将这个数组变成一个两行五列的数组
:::
  - .resize(shape) 直接修改原数组的形状
  - .T 返回一个数组的转置，不改变原数组
  - .astype(type) 修改数组中元素的类型
    - numpy.int64
    - numpy.str
    - numpy.float
    - numpy.int32

- 数组常用函数：
  - numpy.resize(array,shape) 返回一个新数组，为原数组指定形状转化后得到，如果新数组的元素个数比原数组少，则直接删除，如果比原数组多，那么就按照原数组中的数据从小到大的顺序填充到新数组当中
  - numpy.linspace（开始的数字大小，结束的数字大小，样本的个数，endpoint=True/False,restep=True/False) 返回在间隔 【开始，停止】 上计算的指定个均匀间隔的样本数组 （是一个闭区间所以会多一个） endpoint 是否包含结束数字大小的值  如果 restep 设置为 true, 会返回一个包含两个元素的元组，其中的第一个元素为数组，第二个元素为步长
  - numpy.zeros(shape,dtype) 返回一个指定形状的用 0 填充的数组，默认数据类型为浮点型，可以自定义当中的数据类型（如果定义为字符型的话，数组中的每一个元素都是空字符串）
  - numpy.zeros_like(array) 返回一个和另一个数组形状相同的用 0 填充的数组
  - numpy.ones() 同上 numpy.zeros()
  - numpy.ones_like() 同上 numpy.zeros_like()
  - numpy.eye(number) 返回一个方阵，大小为 number 的值，对角线上为 1, 其余位置值为 0
  - numpy.random.rand(shape) 返回指定形状的数组，其中每一个元素都是从 0 到 1 随机取值，均匀分布
  - numpy.random.normal(size=shape) 返回一个自定形状的正太分布的数组
:::tip
如果想创建一个 2X3 大小的我们应该写 numpy.random.normal(size=(2,3))
:::
  - numpy.random.randn(shape) 返回一个指定形状的正太分布数组
  - numpy.random.randint(low,high[,size=shape,dtype=]) 返回一个左闭右开的区间上的随机数组，大小可以指定
  - numpy.savetxt(filename,arrayname,fmt= 存储类型，delimiter= 分隔符，newline="\n",header="",footer="",comments="#") 将指定数组存入指定文件中
  - numpy.loadtxt(filename,delimiter= 分隔符） 返回一个数组
  - numpy.save('filename.npy',array) 储存一个数组格式的文件
  - numpy.load(filename) 返回一个数组
  - numpy.nan 返回 nan

- 布尔数组
  - 布尔数组可以用来提取数组中想要的元素
  - 布尔数组可以直接创建，也可以直接用一个已有的数组进行逻辑判断获得 如：
arr = [[1 2 3 4]
      [2 4 5 9]]
arr>5 返回：
     [False False False False]
     [False False False True]
:::danger
这里判断后返回的是一个一维数组，不会保留数组原始结构
:::
> 如果想要获得 array 中所有大于 5 的值，可以使用 array[[array>5]] 或者 array[array>5]
解释：相当于用 array>5 这个布尔数组每一个元素的值来一一对应是否输出 array 数组中的元素

- 多维数组访问
  - array[a](b)= array[a,b]

## pandas 模块

### 1. series

> series 数据结构：带有标签的一维数组，可以保存任何数据类型，标签统称为索引（索引可以为数字，字符等）

:::danger
series 是一个一维数组
:::
- series 创建方法
  - 由字典创建 pandas.Series(dict)
  - 由一维数组创建 pandas.Series(array)
  - 通过标量创建 如 pandas.Series(100,index=range(5)) 创建一个索引为 0 到 4 的五个元素组成的 series, 每一个元素的值都是 100
:::tip
括号内可选参数：dtype,name,index
:::
- 索引使用：（可以不唯一，但尽量避免）
  - 下标索引（不能使用 -1)
  - 标签索引 当指定索引时，如果使用字符当索引，可以直接通过字符检索，如果想要选出多个值，可以是用 [[]], 如 series[['a','b']]
  - 切片索引 当使用下标切片时，为一个左闭右开的区间，如果使用标签的话，为闭区间，如果标签也是数字的话，默认当做下标做切片（可以使用 -1)
- 基本技巧
  - 数据查看
    - series.head(number) 默认查看最前面五条数据，可以传入 Number 的值，自己指定查看最前面几个数据
    - series.tail(number) 默认查看最后面五条数据，可以传入 Number 的值，自己指定查看最后面几个数据
    - series.reindex（一些索引） 返回值为一个 series, 返回的 series 中，给定的索引如果在原 series 中存在，则会将原 series 中的对应的索引和值添加到这个 series 中，如果不存在则会给给定索引添加空值并保留在返回的 series 中
:::warning
reindex 方法并不是改变原 series 的索引
reindex 方法有一个可以选参数 fill_value 可以指定给所有不存在的索引添加一个默认值
:::
  - 对齐
    - 当两个 series 做操作时，比如说做加法运算，会将两个 series 中索引相同的值相加，如果某些索引只在一个 series 中存在，则这些索引的相加结果为 0
  - 添加，修改，删除
    - 删除
      - series.drop(index) 返回值为一个 series, 不会改变原 series, 新的 series 不包含被删除的项，如果需要删除多项，那么则需要传入一个索引列表
    - 添加
      - 直接通过标签 / 索引添加值 如 b[20] = 10
      - series.append(series) 返回一个新的 series, 添加一个 series 到指定 series 末端，但不会改变原 series
  - 两个方法
    - series.isnull() 返回一个布尔 series, 空值对应 true
    - series.notnull() 返回一个布尔 series, 空置对应 false

### 2. DataFrame

> DataFrame: 二维数组，一个表格型的数据结构，包含一组有序的列，其列的值类型可以是数值，字符串，布尔值等，DataFrame 中的数据以一个或多个二维块存放，不是列表，字典或者一维数组结构
例子：
data = {'name':['Jack','Tom','Mary'],
       'age':[18,19,20],
       'gender':['m','m','w']}
frame = pandas.DataFrame(data)

:::tip
  DataFrame 有三个部分 index（行标签） columns（列标签） value（值） 有点类似 excel
:::
- 创建方法：pandas.DataFrame(?)
  - 由数组 / 列表组成的字典
    这种方法创建的 dataframe  columns 为字典的 key, index 为默认数字标签，如果要指定 index, 可以加入可选参数
    index = list index 的个数必须和原数据段数量相互匹配
    和
    columns = list columns 可以重新指定列的顺序，也可以增加或者减少列的数量，如果添加的 List 中有列名不存在于原列名中，会创建空值
    :::tip
      字典的值的长度必须保持一致
    :::
  - 由 series 组成的字典
    这种方法创建的 dataframe, columns 为字典的 key,index 为 series 的标签（如果 series 没有指定标签，则是默认的数字标签）
    series 的长度可以不一样，生成的 dataframe 会出现 nan 值
  - 由二维数组直接创建
    index 和 columns 的长度必须和数组形状一致，如果不指定 index 和 columns, 两者均为默认样式
  - 由字典组成的列表
    如果字典中的字段的值长度不一致，会添加空值用来对齐
    每一个字典代表一行数据
    columns 为字典的 Key index 不做指定则为默认的数组标签
  - 由字典组成的字典
    该方法创建的 dataframe, columns 为字典的 Key index 为子字典的 key
    创建方法中的可选参数与上面几种创建方法不同，不能改变原有的 index, 如果指向新的标签，值为空值，有点像 series.reindex()
- 选择方法：
  - 选择列：
      直接使用方括号语法 如 DataFrame['column1']
      如果要选择多列，和多维数组选择元素方法类似，如 DataFrame[['column1','column2']]
 - 选择行：
    - DataFrame.loc['row1'] 使用 loc 方法传入参数 '行名' 多行选择和多列选择方法一样
:::tip
选择一行或者一列的时候返回的是一个 series, 选择多行或者多列的时候放回一个 DataFrame
:::
    - DataFrame【一个切片】 方括号内直接使用切片会选择行，左闭右开
:::warning
使用切片选择的时候就算只选择一行也是一个 DataFrame
:::
    - DataFrame.loc【一个切片】 这种切片方式是一个闭区间，末端包含
    - DataFrame.iloc【第几行】  传入行号（注意这里不是传入行的索引） -1 表示最后一行，可以使用切片 选择多行使用 DataFrame.iloc[[]]
  - 布尔索引：
    - 单行 / 列  做判断的时候只保留所有为 True 的行，为 False 的行不会选出来
    - 多行 / 列  做判断的时候保留所有行，但是为 True 的元素会显示其数值，为 False 的元素会显示 NaN
- 基本技巧
  - DataFrame.head() 查看前 N 行数据，默认查看最前面五条数据
  - DataFrame.tail() 查看后 N 行数据，默认查看最后面五条数据
  - DataFrame.T 转置，行列值和标签都互换
  - 添加：
    - 直接使用中括号语法添加（行使用 .loc 等方法）
  - 修改：
    - 直接使用中括号语法修改（行使用 .loc 等方法）
:::tip
可以直接操作多个
:::
  - 删除：
    - 使用 drop(n) : 默认删除第 n 行，如果需要删除列 则需要添加参数 axis=1
:::tip
使用额外参数 inplace = False 表示生成新的 DataFrame, 而不是直接改变源 DataFrame 的数据
:::
    - del 语句 : 使用中括号语法，默认删除列
  - 对齐：
    - 同 Series
  - 排序（也适用于 Series)
    - 按值排序 sort_values【列标签名】 额外参数 ascending=True 表示升序排序  ascending=False 表示降序排序  默认升序
    - 按索引排序 sort_index() ascending 和上面的用法意义相同 索引时数组安大小排序，索引时字符按字典书序排序
:::tip
可以多列排序，例如 DataFrame.sort_values(['a','c']) 先将 a 列的值排完，然后针对 a 列中值相同情况根据 c 列排序（但是不会改变 a 列的顺序）, 如果 a 全部都不一样，就不用考虑 c 了
:::

## datetime 模块

- 获取当前时间 datetime.date.today() 返回的数据格式是一个 datetime.date 可以强转成字符串
> 返回的格式不是一个字符串的意义：返回一个特殊的对象我们可以在其中添加很多的自定义方法，能够更加方便的使用这个字符串

- 生成一个 datetime.date 对象：datetime.date(year.month,day)
- 获得当前时间（最小单位为毫秒） datetime.datetime.now() 返回的数据格式为 datetime.datetime
- 生成一个时间戳：datetime.datetime（年，月，日，时，分，秒） 可以用来做加减法
- 时间差 (datetime.timedelta) 可以由两个时间戳做计算得到，默认时间差的单位是天，可以和一个时间戳做计算
  - 生成一个时间差：datetime.timedelta（天，秒）
:::tip
将一个字符串转化成一个时间 from dateutil.parser import parse
使用 parse（字符串） 方法，会将指定字符串转化成一个可读的时间（不支持中文） 支持 / - 空格 英文
:::

## 数值计算和统计
