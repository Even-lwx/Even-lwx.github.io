---
title: Git 常见使用指令——省流版
date: 2025-06-22T00:44:00
tags:
  - Git
description: 以 Windows 环境为例，速查 Git 配置、仓库初始化、暂存提交、状态查看、版本回退以及远程仓库推送等常用命令。
---

## 一、读前须知

- 1.本文汇总Git常见指令——以Windows系统为例

- 2.本文的目的是学习者在使用Git初期忘记一些常见指令时，可将此作为一个**简易的使用手册**方便查阅。

- 3.若是**初学者或希望了解具体细节者**建议学习[时光机穿梭 - Git教程 - 廖雪峰的官方网站 (liaoxuefeng.com)](https://liaoxuefeng.com/books/git/time-travel/index.html)，其内容更完善，有助于更好的了解Git的作用和使用方法。

- 4.**第一次使用Git的同学不建议看这篇文章**

- 5.为了方便读者直接复制指令使用，本文指令前一律省略 **$** 

## 二、配置Git

### 1.设置用户名和邮箱
```git
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

### 2.查看所有配置
```git
git config --list
```

## 三、创建版本库

首先，选择一个合适的地方 **（最好是全英文路径）**，创建一个空目录：

### 1.创建名为learngit的文件夹

```git
mkdir learngit
```

### 2.进入learngit文件夹

```git
cd learngit
```

### 3.显示当前目录

```git
pwd
```

### 4.把这个目录变成Git可以管理的仓库

```git
git init
```

##  把文件添加到版本库

### 1.添加文件

添加readme.txt文件
```git
git add readme.txt
```

add文件可以通过执行多次实现添加多个文件的目的
```git
git add file1.txt
git add file2.txt file3.txt
```

### 2.把文件提交到仓库

-m“  ”中的内容为这次提交的说明
```git
git commit -m "wrote a readme file"
```

## 仓库查看


### 1.查看仓库当前的状态

检查当前仓库中文件保存情况
```git
git status
```

### 2.查看现文件和已保存文件的区别

```git
git diff
```

## 版本回溯

### 1.文件提交历史记录

```git
git log
```

### 2.版本回退

HEAD表示当前版本

HEAD^ 表示上个版本

HEAD^^ 表示上上个版本

往上n个版本用HEAD~n表示

```git
git reset --hard HEAD^
```



## 远程仓库

### 关联(换成自己的库)

```git
git remote add origin git@github.com:michaelliao/learngit.git
```

### 本地库推送到远程

- 1.第一次
```git
 git push -u origin master
```

- 2.后续

```git
git push origin master
```





***
未完待续……
