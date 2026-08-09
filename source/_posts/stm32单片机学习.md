---
title: stm32单片机学习
date: 2024-09-28 20点45分
tags:
  - 单片机
  - stm32
  - c语言
description: 按学习日期记录 STM32F10x 入门实践，覆盖 GPIO、LED、OLED、蜂鸣器、按键、传感器、EXTI/NVIC、编码器和蓝牙控制。
---

# 序言
本文所需的材料软件等均在下方链接。

stm32单片机的PC端配置需要keil5 MDK，并且需要手动配置编译环境。具体看B站UP主的教程（讲的非常好  !  !  !）

学习教程：[STM32入门教程-2023版 细致讲解 中文字幕_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1th411z7sn/?spm_id_from=333.337.search-card.all.click)

[资料下载](https://jiangxiekeji.com/download.html)

# DAY 1 (240913)
这段代码主要是对 STM32F10x 系列芯片的 GPIOC 端口的 13 号引脚进行配置和操作。首先初始化引脚为推挽输出模式，然后先将该引脚设置为高电平，接着又设置为低电平，之后进入死循环。在实际应用中，可能会在循环中添加其他的逻辑来实现特定的功能，比如控制 LED 闪烁等相关操作。
```c
#include "stm32f10x.h"                  // 包含 STM32F10x 系列相关的头文件

int main(void)  // 主函数，程序的入口点
{
    // 使能 GPIOC 外设的时钟，这是对 GPIOC 进行操作的前提
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOC, ENABLE);

    // 定义一个 GPIO 初始化结构体变量
    GPIO_InitTypeDef GPIO_InitStructure;

    // 设置 GPIO 引脚的工作模式为推挽输出（Push-Pull Output）
    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;

    // 选择 GPIOC 的 13 号引脚进行配置
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_13;

    // 设置输出引脚的速度为 50MHz
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;

    // 根据上述设置的参数初始化 GPIOC 的相关引脚
    GPIO_Init(GPIOC, &GPIO_InitStructure);

    // 将 GPIOC 的 13 号引脚置为高电平
    GPIO_SetBits(GPIOC, GPIO_Pin_13);

    // 将 GPIOC 的 13 号引脚置为低电平
    GPIO_ResetBits(GPIOC, GPIO_Pin_13);

    // 进入一个无限循环，使程序保持运行状态
    while (1)
    {

    }
}

```

效果图
[![单片机点灯](/img/posts/stm32-learning/image-01.webp)](https://img.z4a.net/image/%E5%8D%95%E7%89%87%E6%9C%BA%E7%82%B9%E7%81%AF.AlDAR)

# DAY 2 (240914) LED 闪烁
## LED 闪烁

成果

<a href="https://thumbsnap.com/AbVWuJp6" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-01.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/AbVWuJp6.mp4" type="video/mp4"></video></a>

接线图
[![3 1 LED闪烁](/img/posts/stm32-learning/image-02.webp)](https://img.z4a.net/image/3-1-LED%E9%97%AA%E7%83%81.ADHhf)

源码
```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"

int main(void)
{
	/*开启时钟*/
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);	//开启GPIOA的时钟
															//使用各个外设前必须开启时钟，否则对外设的操作无效
	
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;					//定义结构体变量
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;		//GPIO模式，赋值为推挽输出模式
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_0;				//GPIO引脚，赋值为第0号引脚
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;		//GPIO速度，赋值为50MHz
	
	GPIO_Init(GPIOA, &GPIO_InitStructure);					//将赋值后的构体变量传递给GPIO_Init函数
															//函数内部会自动根据结构体的参数配置相应寄存器
															//实现GPIOA的初始化
	
	/*主循环，循环体内的代码会一直循环执行*/
	while (1)
	{
		/*设置PA0引脚的高低电平，实现LED闪烁，下面展示3种方法*/
		
		/*方法1：GPIO_ResetBits设置低电平，GPIO_SetBits设置高电平*/
		GPIO_ResetBits(GPIOA, GPIO_Pin_0);					//将PA0引脚设置为低电平
		Delay_ms(500);										//延时500ms
		GPIO_SetBits(GPIOA, GPIO_Pin_0);					//将PA0引脚设置为高电平
		Delay_ms(500);										//延时500ms
		
		/*方法2：GPIO_WriteBit设置低/高电平，由Bit_RESET/Bit_SET指定*/
		GPIO_WriteBit(GPIOA, GPIO_Pin_0, Bit_RESET);		//将PA0引脚设置为低电平
		Delay_ms(500);										//延时500ms
		GPIO_WriteBit(GPIOA, GPIO_Pin_0, Bit_SET);			//将PA0引脚设置为高电平
		Delay_ms(500);										//延时500ms
		
		/*方法3：GPIO_WriteBit设置低/高电平，由数据0/1指定，数据需要强转为BitAction类型*/
		GPIO_WriteBit(GPIOA, GPIO_Pin_0, (BitAction)0);		//将PA0引脚设置为低电平
		Delay_ms(500);										//延时500ms
		GPIO_WriteBit(GPIOA, GPIO_Pin_0, (BitAction)1);		//将PA0引脚设置为高电平
		Delay_ms(500);										//延时500ms
	}
}
```

# DAY 3 (240915) LED流水灯+OLED屏显示
## LED流水灯

成果
<a href="https://thumbsnap.com/PfsjbSQD" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-02.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/PfsjbSQD.mp4" type="video/mp4"></video></a>
接线图
[![3 2 LED流水灯](/img/posts/stm32-learning/image-03.webp)](https://img.z4a.net/image/3-2-LED%E6%B5%81%E6%B0%B4%E7%81%AF.AkKlf)
源码
```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"

int main(void)
{
    /*开启时钟*/
    RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);  // 开启 GPIOA 的时钟。
    // 使用各个外设前必须开启时钟，否则对外设的操作无效。这一步确保了对 GPIOA 的操作能够正常进行。

    /*GPIO 初始化*/
    GPIO_InitTypeDef GPIO_InitStructure;  // 定义结构体变量，用于存储 GPIO 的初始化参数。

    GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;  // GPIO 模式，设置为推挽输出模式。推挽输出模式可以输出较强的电流，适合驱动外部设备。
    GPIO_InitStructure.GPIO_Pin = GPIO_Pin_All;  // GPIO 引脚，设置为所有引脚。这意味着将对 GPIOA 的所有引脚进行配置。
    GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;  // GPIO 速度，设置为 50MHz。不同的速度适用于不同的应用场景。

    GPIO_Init(GPIOA, &GPIO_InitStructure);  // 将结构体变量传递给 GPIO_Init 函数，函数会根据结构体中的参数配置相应的寄存器，实现对 GPIOA 的初始化。

    /*主循环，循环体内的代码会一直循环执行*/
    while (1)
    {
        /*使用 GPIO_Write，同时设置 GPIOA 所有引脚的高低电平，实现 LED 流水灯*/
        GPIO_Write(GPIOA, ~0x0001);  // 0000 0000 0000 0001，PA0 引脚为低电平，其他引脚均为高电平，注意数据有按位取反。
        Delay_ms(100);  // 延时 100ms。这个延时函数可能来自于引入的 "Delay.h" 头文件，用于控制流水灯的速度。
        GPIO_Write(GPIOA, ~0x0002);  // 0000 0000 0000 0010，PA1 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0004);  // 0000 0000 0000 0100，PA2 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0008);  // 0000 0000 0000 1000，PA3 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0010);  // 0000 0000 0001 0000，PA4 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0020);  // 0000 0000 0010 0000，PA5 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0040);  // 0000 0000 0100 0000，PA6 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
        GPIO_Write(GPIOA, ~0x0080);  // 0000 0000 1000 0000，PA7 引脚为低电平，其他引脚均为高电平。
        Delay_ms(100);  // 延时 100ms。
    }
}
```

## OLED屏显示

{% note warning %}
使用OLED屏需要配置新的环境（导入新的库函数、头文件）
{% endnote %}
OLED屏可以实时显示设备参数，可作为监视器使用。

接线图
[![4 1 OLED显示屏](/img/posts/stm32-learning/image-04.webp)](https://img.z4a.net/image/4-1-OLED%E6%98%BE%E7%A4%BA%E5%B1%8F.A9aDZ)

源码
```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"
#include "OLED.h"

int main(void)
{
	/*模块初始化*/
	OLED_Init();		//OLED初始化
	
	/*OLED显示*/
	OLED_ShowChar(1, 1, 'A');				//1行1列显示字符A
	
	OLED_ShowString(1, 3, "HelloWorld!");	//1行3列显示字符串HelloWorld!
	
	OLED_ShowNum(2, 1, 12345, 5);			//2行1列显示十进制数字12345，长度为5
	
	OLED_ShowSignedNum(2, 7, -66, 2);		//2行7列显示有符号十进制数字-66，长度为2
	
	OLED_ShowHexNum(3, 1, 0xAA55, 4);		//3行1列显示十六进制数字0xA5A5，长度为4
	
	OLED_ShowBinNum(4, 1, 0xAA55, 16);		//4行1列显示二进制数字0xA5A5，长度为16
											//C语言无法直接写出二进制数字，故需要用十六进制表示
	
	while (1)
	{
		
	}
}

```

### 关于中文显示的补充-1

成果
[![Oled](/img/posts/stm32-learning/image-05.webp)](https://img.z4a.net/image/Oled.A9tGK)

中文的显示需要手动配置头文件

在OLED.h文件中进行如下配置(仅作为示例)
```c
#ifndef __OLED_CHINESE_H
#define __OLED_CHINESE_H

/*中文字符字节宽度*/
#define OLED_CHN_CHAR_WIDTH			3

/*字模基本单元*/
typedef struct 
{
	char Index[OLED_CHN_CHAR_WIDTH + 1];
	char Data[32];
} ChineseCell_t;

/*字模数据*/
const ChineseCell_t OLED_CF16x16[] = {
	
	"你",
	0x00,0x80,0x60,0xF8,0x07,0x40,0x20,0x18,0x0F,0x08,0xC8,0x08,0x08,0x28,0x18,0x00,
	0x01,0x00,0x00,0xFF,0x00,0x10,0x0C,0x03,0x40,0x80,0x7F,0x00,0x01,0x06,0x18,0x00,/*0*/

	"好",
	0x10,0x10,0xF0,0x1F,0x10,0xF0,0x00,0x80,0x82,0x82,0xE2,0x92,0x8A,0x86,0x80,0x00,
	0x40,0x22,0x15,0x08,0x16,0x61,0x00,0x00,0x40,0x80,0x7F,0x00,0x00,0x00,0x00,0x00,/*1*/

	"，",
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x58,0x38,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,/*2*/

	"世",
	0x20,0x20,0x20,0xFE,0x20,0x20,0xFF,0x20,0x20,0x20,0xFF,0x20,0x20,0x20,0x20,0x00,
	0x00,0x00,0x00,0x7F,0x40,0x40,0x47,0x44,0x44,0x44,0x47,0x40,0x40,0x40,0x00,0x00,/*3*/

	"界",
	0x00,0x00,0x00,0xFE,0x92,0x92,0x92,0xFE,0x92,0x92,0x92,0xFE,0x00,0x00,0x00,0x00,
	0x08,0x08,0x04,0x84,0x62,0x1E,0x01,0x00,0x01,0xFE,0x02,0x04,0x04,0x08,0x08,0x00,/*4*/

	"。",
	0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,
	0x00,0x00,0x18,0x24,0x24,0x18,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00,/*5*/

	"这",
	0x40,0x40,0x42,0xCC,0x00,0x08,0x28,0x48,0x89,0x0E,0xC8,0x38,0x08,0x08,0x00,0x00,
	0x00,0x40,0x20,0x1F,0x20,0x50,0x48,0x44,0x42,0x41,0x42,0x44,0x58,0x40,0x40,0x00,/*6*/

	"是",
	0x00,0x00,0x00,0x7F,0x49,0x49,0x49,0x49,0x49,0x49,0x49,0x7F,0x00,0x00,0x00,0x00,
	0x81,0x41,0x21,0x1D,0x21,0x41,0x81,0xFF,0x89,0x89,0x89,0x89,0x89,0x81,0x81,0x00,/*7*/

	"汉",
	0x10,0x60,0x02,0x0C,0xC0,0x02,0x1E,0xE2,0x02,0x02,0x02,0xE2,0x1E,0x00,0x00,0x00,
	0x04,0x04,0x7C,0x03,0x80,0x80,0x40,0x20,0x13,0x0C,0x13,0x20,0x40,0x80,0x80,0x00,/*8*/

	"字",
	0x10,0x0C,0x04,0x24,0x24,0x24,0x25,0x26,0xA4,0x64,0x24,0x04,0x04,0x14,0x0C,0x00,
	0x02,0x02,0x02,0x02,0x02,0x42,0x82,0x7F,0x02,0x02,0x02,0x02,0x02,0x02,0x02,0x00,/*9*/

	"测",
	0x10,0x60,0x02,0x8C,0x00,0xFE,0x02,0xF2,0x02,0xFE,0x00,0xF8,0x00,0xFF,0x00,0x00,
	0x04,0x04,0x7E,0x01,0x80,0x47,0x30,0x0F,0x10,0x27,0x00,0x47,0x80,0x7F,0x00,0x00,/*10*/

	"试",
	0x40,0x40,0x42,0xCC,0x00,0x90,0x90,0x90,0x90,0x90,0xFF,0x10,0x11,0x16,0x10,0x00,
	0x00,0x00,0x00,0x3F,0x10,0x28,0x60,0x3F,0x10,0x10,0x01,0x0E,0x30,0x40,0xF0,0x00,/*11*/

	"程",
	0x24,0x24,0xA4,0xFE,0x23,0x22,0x00,0x3E,0x22,0x22,0x22,0x22,0x22,0x3E,0x00,0x00,
	0x08,0x06,0x01,0xFF,0x01,0x06,0x40,0x49,0x49,0x49,0x7F,0x49,0x49,0x49,0x41,0x00,/*12*/

 
	
	
	/*按照上面的格式，在这个位置加入新的数据*/
	//...

	
	"中",
	0xFF,0xFF,0x0F,0xEF,0xEF,0xEF,0xEF,0x00,0xEF,0xEF,0xEF,0xEF,0x0F,0xFF,0xFF,0xFF,
	0xFF,0xFF,0xF0,0xFB,0xFB,0xFB,0xFB,0x00,0xFB,0xFB,0xFB,0xFB,0xF0,0xFF,0xFF,0xFF,
	
	"秋",
	0xDB,0xDB,0x5B,0x01,0xDC,0xDD,0x7F,0x8F,0xFF,0x00,0xFF,0x7F,0xBF,0xCF,0xFF,0xFF,
	0xF7,0xF9,0xFE,0x00,0xFE,0x79,0xBF,0xCF,0xF1,0xFE,0xF9,0xE7,0xDF,0xBF,0x7F,0xFF,
	
	"节",
	0xFB,0xBB,0xBB,0xBB,0xA0,0xBB,0x3B,0xBB,0xBB,0xBB,0xA0,0xBB,0x3B,0xFB,0xFB,0xFF,
	0xFF,0xFF,0xFF,0xFF,0xFF,0xFF,0x00,0xFF,0xFF,0xF7,0xEF,0xF7,0xF8,0xFF,0xFF,0xFF,
	
	"快",
	0xFF,0x1F,0xFF,0x00,0xEF,0xDF,0xF7,0xF7,0xF7,0x00,0xF7,0xF7,0x07,0xFF,0xFF,0xFF,
	0xFE,0xFF,0xFF,0x00,0xFF,0x7E,0xBE,0xCE,0xF2,0xFC,0xF2,0xCE,0xBE,0x7E,0x7E,0xFF,
	
	"乐",
	0xFF,0xFF,0x1F,0x63,0x7B,0x7B,0x7B,0x0B,0x7D,0x7D,0x7C,0x7D,0x7F,0x7F,0xFF,0xFF,
	0xFF,0xDF,0xEF,0xF7,0xF9,0xBF,0x7F,0x80,0xFF,0xFF,0xFD,0xFB,0xF7,0xCF,0xFF,0xFF,




	
	/*未定义的默认样式，请确保其位于数组最末尾*/
	"",		
	0xFF,0x03,0x05,0x09,0x11,0x21,0x41,0x81,0x81,0x41,0x21,0x11,0x09,0x05,0x03,0xFF,
	0xFF,0xC0,0xA0,0x90,0x88,0x84,0x82,0x81,0x81,0x82,0x84,0x88,0x90,0xA0,0xC0,0xFF,/*默认*/
};

#endif

```
在OLED.c文件中定义如下函数
```c
void OLED_ShowChinese(uint8_t Line, uint8_t Column, char *Chinese)
{
	uint8_t i;
	char single[OLED_CHN_CHAR_WIDTH + 1] = {0};
	uint8_t ps = 0;
	
	/*依次提取每个汉字并调用显示单个汉字的函数进行显示*/
	for (i = 0; Chinese[i] != '\0'; i ++)
	{
		single[ps] = Chinese[i];
		ps ++;
		if (ps >= OLED_CHN_CHAR_WIDTH)
		{
			ps = 0;
			OLED_ShowSingleChinese(Line, Column + i / 3 * 2, single);
		}
	}
}hanshu
```

**代码解释：**

我重新定义了一个函数：

`OLED_ShowChinese`函数的作用是在 OLED 显示屏上显示中文字符串。它接受行号（`Line`）、列号（`Column`）以及一个中文字符串指针（`Chinese`）作为参数，将中文字符串逐个显示在指定位置。

### 关于中文显示的补充-2

上述代码中的
```c
"你",
	0x00,0x80,0x60,0xF8,0x07,0x40,0x20,0x18,0x0F,0x08,0xC8,0x08,0x08,0x28,0x18,0x00,
	0x01,0x00,0x00,0xFF,0x00,0x10,0x0C,0x03,0x40,0x80,0x7F,0x00,0x01,0x06,0x18,0x00,/*0*/

```
这表示“你”显示的像素位置

获取汉字/图像的像素位置需要`PCtoLCD2002`软件。

具体使用方法见下：[02-快速上手（下集）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1EN41177Pc?p=2&vd_source=da905aeb41d3bbab09f2abf41b856272)


# DAY 4 (240916) 蜂鸣器使用

## 蜂鸣器使用

成果
<a href="https://thumbsnap.com/YR8vTJzs" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-03.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/YR8vTJzs.mp4" type="video/mp4"></video></a>

```c
#include "stm32f10x.h"                  // Device header
#include "Delay.h"

int main(void)
{
	/*开启时钟*/
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB, ENABLE);	//开启GPIOB的时钟
															//使用各个外设前必须开启时钟，否则对外设的操作无效
	
	/*GPIO初始化*/
	GPIO_InitTypeDef GPIO_InitStructure;					//定义结构体变量
	
	GPIO_InitStructure.GPIO_Mode = GPIO_Mode_Out_PP;		//GPIO模式，赋值为推挽输出模式
	GPIO_InitStructure.GPIO_Pin = GPIO_Pin_12;				//GPIO引脚，赋值为第12号引脚
	GPIO_InitStructure.GPIO_Speed = GPIO_Speed_50MHz;		//GPIO速度，赋值为50MHz
	
	GPIO_Init(GPIOB, &GPIO_InitStructure);					//将赋值后的构体变量传递给GPIO_Init函数
															//函数内部会自动根据结构体的参数配置相应寄存器
															//实现GPIOB的初始化
	
	/*主循环，循环体内的代码会一直循环执行*/
	while (1)
	{
		GPIO_ResetBits(GPIOB, GPIO_Pin_12);		//将PB12引脚设置为低电平，蜂鸣器鸣叫
		Delay_ms(100);							//延时100ms
		GPIO_SetBits(GPIOB, GPIO_Pin_12);		//将PB12引脚设置为高电平，蜂鸣器停止
		Delay_ms(100);							//延时100ms
		GPIO_ResetBits(GPIOB, GPIO_Pin_12);		//将PB12引脚设置为低电平，蜂鸣器鸣叫
		Delay_ms(100);							//延时100ms
		GPIO_SetBits(GPIOB, GPIO_Pin_12);		//将PB12引脚设置为高电平，蜂鸣器停止
		Delay_ms(700);							//延时700ms
	}
}
‘
```

# DAY 5(240920) GPIO数字接口结构原理+GPIO输入+按键控制LED

## GPIO数字接口结构原理

{% note warning %}
这部分内容应该在LED闪烁之前学习
{% endnote %}

[STM32 基础学习——GPIO位结构（江科大老师教程）_江科大stm32教程-CSDN博客](https://blog.csdn.net/weixin_46711336/article/details/132941831)

### GPIO是什么
GPIO是一种常见的数字接口，用于连接微控制器和其他数字信号的设备。GPIO允许微控制器读取和写入数字信号，从而控制外部设备的状态和读取外部设备的输入信号。

GPIO具有多种引脚配置，可以配置为输入模式或输出模式。在输入模式下，GPIO可以读取外部设备的状态，通常通过高电平（1）或低电平（0）来表示。在输出模式下，GPIO可以控制外部设备的状态，通过输出高电平或低电平来控制设备的开关状态。

GPIO允许我们的单片机与外部世界进行通信，它是我们控制外部设备和接收外部信号的接口。

### GPIO工作模式主要有8种：

|   |   |   |
|---|---|---|
|模式名称|性质|特征|
|浮空输入|数字输入|可读取引脚电平，若引脚悬空，则电平不确定|
|上拉输入|数字输入|可读取引脚电平，内部连接上拉电阻，悬空时默认高电平|
|下拉输入|数字输入|可读取引脚电平，内部连接下拉电阻，悬空时默认低电平|
|模拟输入|模拟输入|GPIO无效，引脚直接接入内部ADC|
|开漏输出|数字输出|可输出引脚电平，高电平为高阻态，低电平接VSS|
|推挽输出|数字输出|可输出引脚电平，高电平接VDD，低电平接VSS|
|复用开漏输出|数字输出|由片上外设控制，高电平为高阻态，低电平接VSS|
|复用推挽输出|数字输出|由片上外设控制，高电平接VDD，低电平接VSS|

### 关于三极管原理的补充
三极管是由两个 PN 结组成的一种半导体器件。

PN 结是半导体中最重要的基本结构之一，它是由 P 型半导体和 N 型半导体接触形成的。在 PN 结中，由于扩散运动和漂移运动的相互作用，形成了内建电场，使得 PN 结具有单向导电性。

三极管通常由三个区域组成：发射区、基区和集电区。发射区和基区之间形成的 PN 结称为发射结，基区和集电区之间形成的 PN 结称为集电结。

[三极管的介绍及工作原理_三极管的作用和工作原理-CSDN博客](https://blog.csdn.net/lvturancao/article/details/91365448)
[三极管是如何导电？超形象动画让你一看就懂！_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1kv411574Y/?spm_id_from=333.337.search-card.all.click&vd_source=da905aeb41d3bbab09f2abf41b856272)

## GPIO输入

[![GPIO输入](/img/posts/stm32-learning/image-06.webp)](https://img.z4a.net/image/GPIO%E8%BE%93%E5%85%A5.MfXnr)


## 按键控制LED

{% note warning %}
后续部分内容不再提供代码，因为涉及到代码封装，讲解起来较为麻烦。
{% endnote %}

成果
<a href="https://thumbsnap.com/e1hWHKzG" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-04.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/e1hWHKzG.mp4" type="video/mp4"></video></a>

# DAY 6 (240921) 自创-光线传感器控制LED灯

**这是我的第一个自己写的程序（脱离教程）**

光线传感器控制LED灯

成果


<a href="https://thumbsnap.com/BCFkhBtj" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-05.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/BCFkhBtj.mp4" type="video/mp4"></video></a>

**main函数**

```c
#include "stm32f10x.h"                  // Device header
#include "LED.h"
#include "LIGHT-SENSOR.h"

int main(void)
{
	LIGHT_SENSOR_Init();
	LED_Init();
	
	while(1)
	{
		if(LIGHT_SENSOR_Get()==1)
			LED_ON();
		else
			LED_off();
			
	}
}

```

LED控制

```c
#include "stm32f10x.h"                  // Device header

void LED_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOA, ENABLE);
	
	GPIO_InitTypeDef InitStructure;
	
	InitStructure.GPIO_Mode=GPIO_Mode_Out_PP;
	InitStructure.GPIO_Pin=GPIO_Pin_1;
	InitStructure.GPIO_Speed=GPIO_Speed_50MHz;
	
	GPIO_Init(GPIOA,&InitStructure);
	
	GPIO_SetBits(GPIOA,GPIO_Pin_1);
}

void LED_ON(void)
{
	GPIO_ResetBits(GPIOA,GPIO_Pin_1);
}

void LED_off(void)
{
	GPIO_SetBits(GPIOA,GPIO_Pin_1);
}

```
```h
#ifndef _LED_H
#define _LED_H

void LED_Init(void);
void LED_ON(void);
void LED_off(void);


#endif
```

光感控制

```c
#include "stm32f10x.h"                  // Device header

void LIGHT_SENSOR_Init(void)
{
	RCC_APB2PeriphClockCmd(RCC_APB2Periph_GPIOB,ENABLE);
	
	GPIO_InitTypeDef InitStructure;
	InitStructure.GPIO_Mode=GPIO_Mode_IPU;
	InitStructure.GPIO_Pin=GPIO_Pin_13;
	InitStructure.GPIO_Speed=GPIO_Speed_50MHz;
	GPIO_Init(GPIOB,&InitStructure);
	
	GPIO_SetBits(GPIOB,GPIO_Pin_13);
}

uint8_t LIGHT_SENSOR_Get(void)
{
	return GPIO_ReadInputDataBit(GPIOB,GPIO_Pin_13);
}

```
```h
#ifndef _LIGHT_SENSOR_H
#define _LIGHT_SENSOR_H
void LIGHT_SENSOR_Init(void);
uint8_t LIGHT_SENSOR_Get(void);

#endif

```


# DAY 7 (240923) 外部中断入门

## 外部中断(exti）入门（包括NVIC介绍）
前面硬件部分的内容真的看不懂，感觉要数电基础。

首先先捋一下各个设备的联系
### NVIC简介
NVIC（嵌套向量中断控制器）是用于管理微控制器中断的模块，可实现中断优先级设置、中断嵌套等功能，以高效地处理各种外部和内部中断事件。
[![NVIC是CPU的小助手](/img/posts/stm32-learning/image-07.webp)](https://img.z4a.net/image/NVIC%E6%98%AFCPU%E7%9A%84%E5%B0%8F%E5%8A%A9%E6%89%8B.MzQ3j)
所以exti是只是实现中断的一种手段

### EXTI
[![EXTI简介](/img/posts/stm32-learning/image-08.webp)](https://img.z4a.net/image/EXTI%E7%AE%80%E4%BB%8B.MzHjk)
[![EXTI基本结构](/img/posts/stm32-learning/image-09.webp)](https://img.z4a.net/image/EXTI%E5%9F%BA%E6%9C%AC%E7%BB%93%E6%9E%84.Mzwtz)
[中断-NVIC与EXTI外设详解(超全面)-CSDN博客](https://blog.csdn.net/k666499436/article/details/124181471)
所以我们配置的顺序是从GPIO开始，到AFIO选择线路（总共16条从AFIO中出去），进入EXTI再到NVIC。

其中GPIO AFIO是需要开启时钟的，而NVIC是CPU直接供电的，不需要另外设置。

# DAY 8 (240928) 自创-旋转编码器控制led亮度

成果

<a href="https://thumbsnap.com/pWhfFCw3" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-06.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/pWhfFCw3.mp4" type="video/mp4"></video></a>

运用知识点：

1.EXTI外部中断

2.PWM输出

# DAY 9 (241003) 自创—蓝牙控制LED

成果

<a href="https://thumbsnap.com/uKDTVkQs" title="Image Hosted by ThumbSnap"><video poster="/img/posts/stm32-learning/video-poster-07.webp" loop muted autoplay playsinline><source src="https://thumbsnap.com/i/uKDTVkQs.mp4" type="video/mp4"></video></a>













# 补充：stm32介绍（这是CV过来的）
- **一、架构与内核**

  

- **内核类型**
    
    - STM32 单片机采用了 ARM Cortex - M 系列内核，常见的有 Cortex - M0、Cortex - M3、Cortex - M4 等。这些内核在性能、功耗和功能上有所不同，可以满足不同应用场景的需求。
    - 例如，Cortex - M0 内核具有低功耗、低成本的特点，适用于简单的控制和低功耗应用；Cortex - M3 内核在性能上有了进一步提升，具备更高的处理能力和更丰富的指令集；Cortex - M4 内核则在 Cortex - M3 的基础上增加了浮点运算单元，适合于需要进行复杂数学运算的场合，如数字信号处理等。
- **架构特点**
    
    - STM32 的架构采用了哈佛结构，即数据总线和指令总线分开，这样可以实现并行的数据访问和指令执行，提高了运行效率。
    - 它还具备嵌套向量中断控制器（NVIC），可以实现快速的中断响应和灵活的中断优先级设置。这对于实时性要求较高的应用非常关键，例如在电机控制中，能够及时响应电机的过流、过压等异常情况，保证系统的安全运行。

  

**二、硬件资源**

  

- **时钟系统**
    
    - STM32 单片机拥有复杂而灵活的时钟系统。它可以使用内部时钟源（如内部 RC 振荡器）或外部时钟源（如外部晶振）来提供系统时钟。
    - 通过时钟配置寄存器，可以对时钟进行分频、倍频等操作，以满足不同外设和系统运行的时钟需求。例如，在低功耗模式下，可以降低系统时钟频率以降低功耗；在需要高速数据处理时，可以提高时钟频率来提升系统性能。
- **GPIO（通用输入 / 输出）**
    
    - STM32 具有丰富的 GPIO 引脚，这些引脚可以配置为输入或输出模式，并且具有多种输入输出模式可供选择，如推挽输出、开漏输出、浮空输入、上拉输入、下拉输入等。
    - GPIO 的复用功能使得一个引脚可以用于多种不同的外设功能，例如，一个 GPIO 引脚既可以作为普通的数字输入输出引脚，也可以复用为定时器的输入捕获引脚、串口的发送或接收引脚等，大大提高了引脚的使用效率。
- **定时器**
    
    - STM32 单片机内置了多个定时器，包括基本定时器、通用定时器和高级定时器。
    - 基本定时器主要用于产生定时中断，可用于简单的定时任务，如定时采样传感器数据等。通用定时器除了具备基本定时器的功能外，还可以实现输入捕获和输出比较功能。例如，在电机控制中，可以利用输入捕获功能测量电机的转速，通过输出比较功能生成 PWM（脉冲宽度调制）信号来控制电机的转速和转向。高级定时器则在通用定时器的基础上增加了更多的功能，如死区时间插入等，适用于三相电机控制等复杂应用。
- **串口通信**
    
    - STM32 支持多种串口通信协议，如 USART（通用同步 / 异步收发器）、UART（通用异步收发器）、SPI（串行外设接口）和 I2C（内部集成电路总线）等。
    - USART 和 UART 常用于与其他设备进行异步串行通信，如与 PC 机进行数据传输、与其他单片机或微控制器进行通信等。SPI 是一种高速同步串行通信协议，常用于与外部的高速外设进行通信，如与 Flash 存储器、显示屏等进行数据传输。I2C 则是一种多主从的同步串行通信协议，适用于连接多个低速外设，如温度传感器、EEPROM 等。
- **ADC（模数转换器）和 DAC（数模转换器）**
    
    - 许多 STM32 型号都集成了 ADC 和 DAC 模块。ADC 用于将模拟信号（如传感器输出的电压、电流等模拟信号）转换为数字信号，以便单片机进行处理。
    - STM32 的 ADC 通常具有多通道，可以同时对多个模拟信号进行采样，并且采样精度可以达到 12 位甚至更高。DAC 则是将数字信号转换为模拟信号，例如在音频播放系统中，可以将数字音频信号通过 DAC 转换为模拟音频信号输出到扬声器。
- **其他外设**
    
    - 除了上述主要的硬件资源外，STM32 单片机还可能配备其他外设，如 CAN（控制器局域网络）控制器，用于汽车电子等领域的通信；USB 接口，方便与 USB 设备进行连接和通信；外部中断 / 事件控制器，用于响应外部事件的触发等。

  

**三、开发环境与编程**

  

- **开发环境**
    
    - STM32 的开发通常使用 Keil MDK、IAR Embedded Workbench 等集成开发环境（IDE）。
    - 这些 IDE 提供了代码编辑、编译、调试等一站式开发服务。例如，Keil MDK 集成了编译器、调试器和仿真器等工具，并且支持 C、C++ 等编程语言。在开发过程中，开发者可以在 IDE 中方便地编写代码、设置编译选项、进行在线调试等操作。
- **编程语言**
    
    - 主要使用 C 语言和 C++ 语言进行编程，也可以使用汇编语言进行底层的优化和特殊功能的实现。
    - C 语言是最常用的编程语言，它具有高效、灵活、可移植性好等优点。对于一些对性能要求较高的场合，可以使用汇编语言来编写部分关键代码，以进一步提高程序的运行效率。

  

**四、应用领域**

  

- **工业控制**
    
    - 在工业自动化领域，STM32 单片机可用于控制各种工业设备，如 PLC（可编程逻辑控制器）、工业机器人、数控机床等。
    - 例如，在工业机器人中，STM32 可以实现对机器人关节电机的精确控制，包括电机的转速、位置和转矩控制等。通过采集机器人关节的位置传感器数据，利用 STM32 的定时器和 ADC 等外设进行处理，并根据控制算法输出 PWM 信号来驱动电机，实现机器人的精确运动控制。
- **消费电子**
    
    - 广泛应用于消费电子产品中，如智能手机、平板电脑、智能手环、智能家居设备等。
    - 在智能手环中，STM32 单片机负责采集各种传感器（如加速度计、心率传感器等）的数据，进行数据处理和分析，然后将处理后的结果（如运动步数、心率等）通过蓝牙等无线通信方式传输到手机等设备上进行显示和进一步分析。
- **汽车电子**
    
    - 在汽车电子系统中，STM32 可用于发动机控制、车身电子稳定系统（ESP）、车载娱乐系统等方面。
    - 例如，在发动机控制系统中，STM32 单片机通过采集发动机的各种传感器（如曲轴位置传感器、氧传感器等）的数据，实时计算和调整燃油喷射量、点火提前角等参数，以保证发动机的高效运行和低排放。
- **物联网（IoT）**
    
    - 作为物联网设备的核心控制器，STM32 单片机可以连接各种传感器和执行器，实现设备之间的互联互通。
    - 在智能农业物联网系统中，STM32 单片机可以采集土壤湿度、温度、光照强度等环境参数，通过无线通信模块（如 LoRa、NB - IoT 等）将数据传输到云端进行分析和处理，同时根据云端的指令控制灌溉设备、遮阳设备等执行器的动作，实现农业生产的智能化管理。
