---
title: MATLAB 学习
---

# MATLAB 学习

> 从零开始学习,为了打建模国赛

## MATLAB 界面构成

- 顶部菜单栏
- 当前文件夹
- 工作区
- 编辑区
- 命令行窗口
  :::tip
  快速退出 matlab: 在命令行窗口中使用 quit 命令
  :::

## 命令行窗口使用

- 想要创建一个变量,声明时就需要赋值
- 可以使用表达式
- 所有的变量都会在工作区显示
- 清除工作区中的所有变量: clear 命令
- 命令行窗口清屏: clc 命令

## 数据表示

- 创建矩阵时: 列向量之间用 空格 或者 逗号 隔开,行向量之间用 分号 隔开

---

如 1 2 3  
 4 5 6  
 创建方式为:
[1 2 3;4 5 6] 或者 [1,2,3;4,5,6]  
:::tip
所有的变量都是矩阵
:::

## axis 用法

- axis auto 将坐标轴刻度恢复为自动的默认设置
- axis manual 冻结坐标轴刻度,此时如果 hold 被设定为 on, 那么后边的图形将使用与前面相同的坐标轴刻度范围
- axis tight 将坐标范围设定为被绘制的数据范围
- axis fill 坐标范围和屏幕的宽高比,使得坐标轴可以包含整个绘制区域.该选项只有在 PlotBoxaApect 或 DataAspectRatioMode 被设置为 'manual' 模式才有效
- axis ij 将坐标轴设置为矩阵模式,此时水平坐标轴从左到右取值,垂直坐标从上到下
- axis xy 将坐标设置为笛卡尔模式,此时水平坐标轴从左到右取值,垂直坐标从下到上
- axis equal 设置屏幕高宽比,使得每个坐标轴都具有均匀的刻度间隔
- axis square 将坐标轴设置为正方形
- axis normal 将当前的坐标轴恢复为全职村,并将单位刻度的所有限制取消
- axis vis3d 冻结屏幕高宽比,使得一个三维对象的旋转不会改变坐标轴的刻度显示
- axis off 关闭所有的坐标轴标签,刻度,背景
- axis on 打开所有的坐标轴标签,刻度,背景

## 一些函数说明

- view(az,el) 设置观察视角:当 x 轴平行观察者身体，y 轴垂直于观察者身体时，az=0； 以此点为起点，绕着 z 轴顺时针运动，az 为正，逆时针为负。
  - view(2) 默认二维视角
  - view(3) 默认三维视角
- max(matrix) 返回一个矩阵,每一个元素都是目标矩阵的最大值
- linspace(minValue,maxValue[,number]) 返回(指定数量)值为最大值减最小值的结果均分组成的矩阵
- repmat(matrix,row,column) 返回原矩阵行和列分别翻倍 row column 倍的结果,将原矩阵的行列视为整体进行翻倍
- length(matrix) 返回矩阵行数或者列数中较大的一个(3 维矩阵以此类推)
- surf(x,y,z) 绘制比较光滑的三维曲面网格图，各线条之间的补面用颜色填充
- mesh(x,y,z) 绘制不是特别精细的三维曲面网格图，同一层面的线条用相同的颜色表示
- syms var1 var2 ...... 定义一些没有赋值的变量,可以用于求导等
- solve(eq,eq1,..var1,var2...) 求解方程,如果方程只有左半部分,默认求右半部分为 0 的情况
- subs(eq,var,value) 在指定方程中,将指定变量替换为指定值计算出结果
- simplify(eq) 化简表达式
- polyfit(x,y,times) 对 x,y 使用最小二乘法的方式进行拟合,返回系数,几阶拟合可以自己设置
- polyval(系数,x) 使用上面函数的结果系数,对指定 X 进行求解
- sprintf(formatSpec,A1,...,An) 将数据格式化为字符串,第一个参数为字符串格式,后面的参数为点的坐标
- meshgrid(x[,y,z]) 通过各个轴的范围生成一个个坐标点
- linprog(c,A,b,Aeq,beq,LB,UB,X0,OPTIONS) 求解线性化化问题的最小值的最优解(如果题目要求最大值,则乘一个负一,使其变成求解最小值问题)
  - c 是求解方程的各个系数组成的矩阵
  - A 是各个限制条件的**不等式**的系数矩阵(该不等式也应该化成小于某个值的形式)
  - b 是各个限制条件中**不等式**的右值的矩阵
  - Aeq 是各个限制条件中的**等式**的系数矩阵
  - beq 是各个限制条件中的**等式**的右值的矩阵
  - LB 是各个变量的下限组成的矩阵
  - UB 是各个变量的上限组成的矩阵
  - X0 是各个变量的初始值
  - OPTIONS 是控制参数
- fmincon(fun,x0,a,b,aeq,beq,lb,ub,nonlcon,options) 求解非线性规划问题的的最小值的最优解(同上)
  - fun 是用 .m 文件定义的函数 f(x) (只能有一个返回值,返回值为待求的规划方程)
  - x0 是 x 的初始值
  - a,b,aeq,beq 定义了线性约束 a*x<=b , aeq*x = beq,没有线性约束就设置为 []
  - lb 和 ub 分别是变量 x 的上界和下界,没有就设置为[],如果仅没有下界,那么下界设置为 -inf; 如果仅没有上界, 那么上界设置为 inf
  - nonlcon 是用 .m 文件定义的非线性向量函数 C(x) ceq(x)(必须要两个返回值,第一个是不等式矩阵(右边必须化成 0),第二个是等式矩阵)
  - options 定义了优化参数

## 画图

- hold on 在不擦除图形的情况下继续向图上画
- plot(x,y) 绘制二维图像
- plotyy(x1,y1,x2,y2) 绘制 y1 坐标在左,y2 坐标在右的双 y 坐标二维图像
- axes(nameOfX,regionOfX,nameOfY,regionOfY) 设置 x,y 轴的范围大小和名称
- axis(minValueOfX,maxValueOfX,minValueOfY,maxValueOfY) 设置 x,y 轴的范围大小
- xlabel('nameOfX') 设置 x 轴的名字
- ylabel('nameOfY') 设置 y 轴的名字
- title('nameOfFigure') 设置图像的名字
- grid on/off 开启/关闭图像网格
- box on/off ......
- .YScale = 'linear/log' 以线性/对数 的格式来显示坐标轴的值(X 轴同理)
- .XTick = [,,,,,] 在 x 轴上显示特定的值(用数值标明)(Y 轴同理)
- .XTickLabel = {'','',''....} 将 X 轴的显示的特定值用自定义昵称标识(Y 轴同理)
- .FontSize = number 将图像的字体大小设置为特定值
- gca (get current axes) 当前坐标轴
- gcf (get current figure) 当前图形
- legend(string1,string2,string3...[,'Location','{{position}}']) 对各个数据的线进行标注
  - position 的所有情况
    - North：Inside plot box near top
    - South：Inside bottom
    - EastI：nside right
    - West：Inside left
    - NorthEast：Inside top right (default)
    - NorthWest：Inside top left
    - SouthEast：Inside bottom right
    - SouthWest：Inside bottom left
    - NorthOutside：Outside plot box near top
    - SouthOutside：Outside bottom
    - EastOutside：Outsideright
    - WestOutside：Outside left
    - NorthEastOutside：Outside top right
    - NorthWestOutside：Outside top left
    - SouthEastOutside：Outside bottom right
    - SouthWestOutside：Outside bottom left
    - Best：Least conflict with data in plot
    - BestOutside：Least unused space outside plot
- text(x,y,z,txt) 像指定坐标的数据点添加文本说明
- 图形对象常用属性:
  - .Visible = 'off/on' 图像是否可见
  - .Position = [,,,,] 图像在屏幕上显示的位置
  - .Color = [,,,] 图像颜色的 rgb 值
  - .Name = '' 设置图像的名字
  - .ToolBar = 'none/auto/figure' 设置图像的工具栏是否存在
  - .MenuBar = 'none/figure' 设置图像的菜单栏是否存在
  - .Units = 'inches' | 'centimeters' | 'characters' |'normalized' | 'points' | 'pixels 设置图像的单位
  - .XData = newXdata 重设 X 轴的数据值
  - .YData = newYdata 重设 Y 轴的数据值

---

#### 参考博客:

- [Matlab axis 用法](http://blog.sina.com.cn/s/blog_b26a90750101kxdx.html)
