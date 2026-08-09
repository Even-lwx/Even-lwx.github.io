---
title: 项目经历
date: 2026-08-08 18:00:00
description: if-else 的嵌入式、控制算法与机器人项目经历。
comments: false
aside: false
---

<div class="project-portfolio">

<p class="project-portfolio__lead">
我的项目主要围绕嵌入式系统、运动控制、传感器融合与机器人协同展开。
以下内容聚焦我在项目中的职责、技术决策和可验证成果。
</p>

<div class="project-stats" aria-label="项目概览">
<div class="project-stat"><strong>2</strong><span>核心项目</span></div>
<div class="project-stat"><strong>1st</strong><span>浙江赛区一等奖</span></div>
<div class="project-stat"><strong>1</strong><span>已受理实用新型专利</span></div>
</div>

<div id="air-ground-system" class="project-anchor"></div>

## 四旋翼无人机空地有缆协同系统

<div class="project-meta">
<span><i class="fas fa-calendar"></i> 2025.11 至今</span>
<span><i class="fas fa-user-gear"></i> 项目负责人</span>
</div>

<div class="project-tags">
<span>TRAVEO</span><span>STC32G</span><span>多传感器融合</span><span>串级 PID</span><span>模糊 PID</span><span>计算机视觉</span>
</div>

### 项目目标

设计四旋翼无人机与麦克纳姆轮车模的有缆协同系统。无人机自主探测地面信标灯，协同地面车模完成精准灭灯任务。

### 我的工作

- 负责无人机端技术开发，完成 ICM42688、PMW3901、ToF 等传感器的数据采集、解算和滤波处理。
- 负责飞控运动控制，使用串级 PID 与模糊 PID 复合控制，保障稳定悬停和灵活机动。
- 完成 MT9V034 图像采集与视觉处理，并结合多级状态机实现信标灯识别与路径规划。
- 作为项目负责人协调系统联调，推进无人机、地面车和任务流程之间的接口闭环。

### 项目成果

- 第 21 届全国大学生智能汽车竞赛“飞跃雷区”组浙江赛区一等奖，赛区第一名。
- 获得 2026 年全国大学生智能汽车竞赛参赛资格。

<div id="wheeled-leg-robot" class="project-anchor"></div>

## 智能手机协同的桌面级轮足机器人

<div class="project-meta">
<span><i class="fas fa-calendar"></i> 2024.11 - 2025.6</span>
<span><i class="fas fa-user-gear"></i> 算法负责人</span>
</div>

<div class="project-tags">
<span>ESP32</span><span>FreeRTOS</span><span>IMU</span><span>EKF</span><span>巴特沃斯滤波</span><span>多串级 PID</span>
</div>

### 项目目标

研发基于舵机串联腿结构的双足轮足机器人，通过 ESP32 实现整机协同控制，并完成自主平衡和单边桥前进运动。

### 我的工作

- 基于 FreeRTOS 搭建实时软件架构，完成任务划分与底层驱动组织。
- 完成 IMU 姿态解算、上位机通信、总线舵机和电机驱动开发。
- 使用多串级 PID、EKF 和二阶巴特沃斯滤波，提高姿态估计和控制稳定性。
- 负责平衡控制与运动算法联调，实现机器人自主平衡和单边桥前进功能。

### 项目成果

- 获评浙江省新苗人才计划立项。
- 相关技术成果已申请实用新型专利并获受理。

<div id="technical-stack" class="project-anchor"></div>

## 技术栈

| 方向 | 技术与工具 |
| --- | --- |
| 嵌入式平台 | AURIX、TRAVEO、STM32、ESP32、STC32/8051、CH32、MM32 |
| 软件与工具链 | C、FreeRTOS、Keil、IAR、STM32CubeIDE、ADS |
| 控制与感知 | 串级 PID、模糊 PID、EKF、巴特沃斯滤波、IMU 解算、计算机视觉 |
| 硬件开发 | 嘉立创 EDA、DCDC 和单片机电路设计、PCB Layout 与 PCB 调试 |
| 机械与工程 | SolidWorks、自动化脚本、上位机、服务器运维、网页部署、Android 实践 |

</div>
