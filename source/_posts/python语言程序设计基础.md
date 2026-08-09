---
title: python语言程序设计基础
date: 2024-09-14 21点38分
tags:
  - python
  - 杭电
description: 整理 Python 基础语法练习及参考实现，包括质数、回文、斐波那契数列、字符串数字检查和手机号校验。
---

# 【第一周】基础语法
### 1. (简答题) 输出1到100之间的所有质数。
```python
for num in range(2,100):  
    flag=True  
          
    for i in range(2,num):  
        if num%i==0:  
            flag=False  
            break  
  
    if flag:  
        print(num)

```

### 2. (简答题) 判断回文数

  
判断一个字符串是否是回文字符串（正着读和倒着读都一样），如果是则输出"是回文字符串"，否则输出"不是回文字符串"。

程序字符串通过input输入。

```python
string=input("请输入一个字符串：")  
length=len(string)  
  
for i in range(length):  
    flag=True  
    if string[0+i]!=string[-1-i]:  
        flag=False  
  
if flag:  
    print("是回文字符串")  
else:  
    print("不是回文字符串")
```

### 3. (简答题)  计算斐波那契数列的前10个数并输出。
计算斐波那契数列的前10个数并输出。
```python
a,b=0,1  
for i in range(10):  
    print(a)  
    a,b=b,a+b
```

### 4. (简答题)  检查数字
判断一个字符串中是否包含数字，如果包含则输出"包含数字"，否则输出"不包含数字"。使用input输入字符串
```python
str=input("输入字符串：")  
length=len(str)  
  
flag=False  
  
for i in range(length):  
    if str[i]>="0" and str[i]<="9":  
        flag=True  
  
if flag:  
    print("包含数字")  
else:  
    print("不包含数字")
```

### 5. (简答题)  有效手机号码
检查一个字符串是否是有效的手机号码（11位数字，以1开头），如果是则输出"有效手机号码"，否则输出"无效手机号码"。使用input输入手机号码
```python
num=input("输入手机号码：")  
length=len(num)  
flag=True  
  
if num[0]!=1 or length!=11:  
    flag=False  
  
if flag:  
    print("有效手机号码")  
else:  
    print("无效手机号码")
```

# 【第二周】
