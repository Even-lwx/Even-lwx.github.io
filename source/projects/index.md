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
这里重点记录问题约束、我的技术决策、调试方法和已经完成验证的结果。
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

### 背景与约束

系统需要让四旋翼无人机自主探测地面信标灯，并与麦克纳姆轮车模通过有缆方式协同完成灭灯任务。开发中需要同时处理飞行姿态稳定、传感器噪声与漂移、视觉环境变化，以及空地设备在任务状态上的一致性。

### 个人职责

- 负责无人机端技术开发，完成 ICM42688、PMW3901、ToF 等传感器的数据采集、解算和滤波处理。
- 负责飞控运动控制，使用串级 PID 与模糊 PID 复合控制，保障稳定悬停和灵活机动。
- 完成 MT9V034 图像采集与视觉处理，并结合多级状态机实现信标灯识别与路径规划。
- 作为项目负责人协调系统联调，推进无人机、地面车和任务流程之间的接口闭环。

### 关键技术决策

- 将传感器采集、状态估计、运动控制和任务状态机分层，降低视觉任务与底层控制之间的直接耦合。
- 组合使用 IMU、光流和 ToF 的互补信息，为姿态、平面运动和高度控制提供各自所需的反馈量。
- 以串级 PID 建立可解释、便于逐环调试的控制基线，再使用模糊 PID 调整部分动态过程。
- 使用多级状态机组织搜索、识别、接近和协同流程，使异常状态能够回退并重新进入任务链路。

### 调试与问题定位

- 先完成传感器、姿态控制、视觉识别的单模块验证，再逐步接入完整任务流程。
- 同步记录原始量、滤波结果、目标值与反馈值，通过时序对比区分感知误差和控制误差。
- 为关键状态切换保留日志，复现联调过程中偶发的识别失败、状态不同步和任务中断问题。

### 已验证结果

- 完成稳定悬停、信标灯识别、路径规划和空地任务流程联调。
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

### 背景与约束

项目研发基于舵机串联腿结构的双足轮足机器人，以 ESP32 完成整机实时控制。主要约束包括腿部关节耦合、IMU 噪声、控制任务时序，以及有限计算资源下的通信和运动控制并行执行。

### 个人职责

- 基于 FreeRTOS 搭建实时软件架构，完成任务划分与底层驱动组织。
- 完成 IMU 姿态解算、上位机通信、总线舵机和电机驱动开发。
- 使用多串级 PID、EKF 和二阶巴特沃斯滤波，提高姿态估计和控制稳定性。
- 负责平衡控制与运动算法联调，实现机器人自主平衡和单边桥前进功能。

### 关键技术决策

- 按采样、状态估计、控制和通信职责拆分 FreeRTOS 任务，明确不同实时等级并减少相互阻塞。
- 使用 EKF 融合姿态信息，并通过二阶巴特沃斯滤波抑制高频噪声，为平衡控制提供稳定反馈。
- 将平衡控制拆为多级闭环，分别处理姿态、速度和执行量，便于独立观察与调参。
- 将舵机、电机和通信接口封装为独立模块，使运动算法不直接依赖具体外设调用。

### 调试与问题定位

- 对采样周期和控制任务执行时间进行日志检查，优先排除时序抖动后再调整控制参数。
- 对比滤波前后的 IMU 数据和控制输出，分别定位估计滞后、机械振动与控制增益问题。
- 按单关节、静态平衡、低速运动和单边桥流程逐级联调，缩小故障定位范围。

### 已验证结果

- 完成机器人自主平衡和单边桥前进功能验证。
- 获评浙江省新苗人才计划立项。
- 相关技术成果已申请实用新型专利并获受理。

<div id="open-source" class="project-anchor"></div>

## 公开仓库精选

<p class="project-section-note">
除完整项目经历外，下面两个仓库可以直接查看实现细节与提交记录。展示内容仅描述源码中可核验的功能。
</p>

### N-Car 倒立摆小车控制固件

<div class="project-meta">
<span><i class="fab fa-github"></i> 嵌入式控制固件</span>
<span><i class="fas fa-code-branch"></i> 持续迭代与调试记录</span>
</div>

<div class="project-tags">
<span>TC264D</span><span>C</span><span>三环 PID</span><span>IMU</span><span>EKF</span><span>Flash</span>
</div>

- **解决的问题：** 在 TC264D 平台上组织倒立摆小车的姿态感知、平衡控制、转向与参数调试流程。
- **可核验实现：** 互补滤波与四元数 EKF 两套姿态解算、角速度/角度/速度多环控制、LCD 参数菜单，以及带版本和校验信息的 Flash 参数保存。
- **工程侧重点：** 将控制器、传感器、菜单和参数持久化拆分为独立模块，并通过提交记录保留转向补偿、参数保存和菜单显示问题的修复过程。

<a class="project-repo-link" href="https://github.com/Even-lwx/N_Car" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i><span>查看 N_Car 源码</span><i class="fas fa-arrow-up-right-from-square"></i></a>

### 飞书发票批量归档工具

<div class="project-meta">
<span><i class="fab fa-github"></i> Python 桌面工具</span>
<span><i class="fas fa-shield-halved"></i> 凭据与源码分离</span>
</div>

<div class="project-tags">
<span>Python</span><span>PyQt5</span><span>Selenium</span><span>OpenPyXL</span><span>PyInstaller</span>
</div>

- **解决的问题：** 将飞书导出的 Excel 表格中的发票附件批量归档，减少逐条打开页面和手动保存文件的重复操作。
- **可核验实现：** 读取单元格超链接、浏览器会话登录、附件发现与下载、下载状态反馈，以及通过工作线程隔离耗时任务的 PyQt5 图形界面。
- **工程侧重点：** 将界面与下载逻辑分离，提供环境变量和本地忽略文件两种凭据配置方式，并保留命令行入口与 PyInstaller 打包配置。

<a class="project-repo-link" href="https://github.com/Even-lwx/FeishuInvCrawl" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i><span>查看 FeishuInvCrawl 源码</span><i class="fas fa-arrow-up-right-from-square"></i></a>

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
