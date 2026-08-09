---
title: Ubuntu使用笔记
date: 2025-04-09T12:40:00
tags:
  - Ubuntu
  - ROS
description: 汇总 Ubuntu 常用文件命令、C++ 与 Python 基础环境，以及 Ubuntu 20.04 安装 ROS 时的关键步骤和问题处理。
mathjax: false
---


# Linux系统基础操作

pwd——查看当前目录
cd 目录名——进入目录
mkdir 文件夹名——新建文件夹
ls——查看当前路径下的文件
touch 文件名——当前目录下新建文件
mv 文件名 目标地址——剪切文件
cp 文件名 目标地址 重命名——复制文件
rm 文件名——删除文件
rm-r 文件夹名——删除文件夹
sudo ——提权指令

# C++&Python极简基础

# 安装ROS系统

[【ROS】在 Ubuntu 20.04 安装 ROS 的详细教程_ubuntu20.04安装ros-CSDN博客](https://blog.csdn.net/PlutooRx/article/details/127558240)

20.04找不到命令先输入：sudo apt install python3-rosdep

初始化
```text
sudo rosdepc init
```

第一个终端
```text
roscore
```

第二个终端，出现小海龟
```text
rosrun turtlesim turtlesim_node

```

第三个终端，控制移动
```text
rosrun turtlesim  turtle_teleop_key

```
