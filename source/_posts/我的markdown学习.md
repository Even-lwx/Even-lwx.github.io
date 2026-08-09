---
title: 我的markdown学习
date: 2024-08-23 21点37分
tags: markdown
description: 以示例方式整理 Markdown 的文本、列表、代码、引用、链接、图片、表格、HTML、Hexo Tag 插件和数学公式语法。
mathjax: true
---

# 序言
这是笔者的markdown学习笔记
<!-- more -->

***

# 文本
**加粗文本1**   __加粗文本2__
*斜体1*   _斜体2_
***加粗+斜体***
~~中划线~~
分割线

***

# 列表
* 无序列表1
* 无序列表2
1. 有序列表1
    * 二级列表
        * 三级列表
2. 有序列表2（只能按顺序，第一项可自定义)  

退出列表
* [ ] 任务打勾1（未完成）
* [x] 任务打勾2（已完成）

***

# 代码
代码块
```c
#include <stdio.h> 
int main() 
{ printf("Hello, World!\n");
  return 0; 
}
```
代码语句`printf()`

***

# 引用
>引用  
>引用中换行

***

# 链接
[链接](https://www.gov.cn/)<——点它

[不要点我][a]

[a]:https://www.bilibili.com/video/BV18E4m1d7b7/?spm_id_from=333.337.search-card.all.click&vd_source=da905aeb41d3bbab09f2abf41b856272

展示脚注[^1]

***

# 图片
图片的插入
网络
![图片网络链接](/img/posts/markdown-learning/image-01.webp)
图片（做了图床用的gitee，但是好像不行。现在是用现成的）

这个照片不是本人！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！

![本地图片](/img/posts/markdown-learning/image-02.webp)
原先用于演示的 Gitee 图床链接已经失效。本站文章图片现统一放在 `source/img/posts/`，并使用站内路径引用。

***

# 表格

|姓名 | 年龄 |
|:---:|:---:|
|小明|17|
|小豪|18|

***

# 自制HTML内容
不会！！！

***

# Tag插件（高亮）
{% note warning %}
我是警告色（高亮文本）
{% endnote %}
方法
![](/img/posts/markdown-learning/image-04.webp)

***

# 数学公式嵌入（需要另外渲染）
$x=1+y$
$$
\frac{x+1}{20-x}
$$
$$
x_2^2
$$
$$
\sqrt[3]{\{[(4+x)-3]*3\}}
$$
符号
$$
\not=         
\approx
\leq
\geq
\times
\div
\pm
\sum_0^n
\prod
\coprod
\overline{1+2+3+4}
$$
常见表达
$$
\alpha
\beta
\mu
\epsilon
180^\circ
\sin
\pi
\cos
\cot
\tan
\in
\notin
\supset
\supseteq
\bigcap
\bigcup
\emptyset
\infty
\int
\iint
y\prime
\lim
$$
排版
$$
\int_0^1x^2dx
$$
$$
\lim_{n\rightarrow+\infty} \frac{1}{n}
$$

***

# 尾声
目前内容的源码稍后上传
持续更新中
——2024.8.23

***

[^1]:我是脚注











