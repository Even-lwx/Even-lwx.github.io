---
title: 24级杭电《C语言程序设计》先修课-mooc作业
date: 2024-08-31 17点03分
tags:
  - c语言
  - 杭电
  - Mooc
description: 按课程章节整理杭电 C 语言先修课 MOOC 练习，覆盖数据类型、流程控制、数组、函数、指针、字符串、结构体和文件操作。
---


# 序言

这是笔者的c语言学习记录
内容覆盖c语言入门的基础知识
已完结，后续会补充代码的注释

**声明**  

本文章内容请未完成的同学谨慎查看。
以下代码的发布时间均在考试截止时间之后，未构成作弊。
<!--more-->

# 第一章 C语言概述

## “Welcome to HDU!”

**题目要求：**  
本题要求编写程序，输出一个短句 “Welcome to HDU!”。  

**输入格式:** 
本题目没有输入。  

**输出格式：**  
在一行中输出短句 “Welcome to HDU!”（引号无需输出）
```c
#include<stdio.h>  
int main(){  
	printf("Welcome to HDU!");  
	return 0;  
}
```

## 加法运算

**题目内容：**  
输入两个整数，计算、输出两数之和  

**输入格式:**  
输入一行，包含用空格分隔的两个整数（32 位 int 整数）  

**输出格式：**  
输出一个整数，表示两数之和（32 位 int 整数）
```c
#include <stdio.h>  
int main(){  
    int a, b;   
    scanf("%d %d", &a, &b);  
    printf("%d\n", a + b);  
    return 0;   
}
```

## 标准体重

**题目内容：**  
据说一个人的标准体重应该是其身高（单位：厘米）减去 100、再乘以 0.9 所得到的公斤数。现给定某人身高，请你计算其标准体重应该是多少？  

**输入格式:**  
输入第一行给出一个正整数 H（100 < H ≤ 300），为某人身高。  

**输出格式:**  
在一行中输出对应的标准体重，单位为公斤，保留小数点后 1 位。
```c
#include <stdio.h>  
int main() {  
    int height; // 定义一个整型变量，用于存储身高  
    float standard_weight; // 定义一个浮点型变量，用于存储标准体重  
  
    // 读取身高值  
    scanf("%d", &height);  
  
    // 计算标准体重  
    standard_weight = (height - 100) * 0.9;  
  
    // 输出标准体重，保留小数点后一位  
    printf("%.1f\n", standard_weight);  
  
    return 0; // 返回 0 表示程序成功执行  
}
```

# 第二章 基本数据类型和输入输出

## 面积公式

**题目内容:**  
请编写程序，输入三角形的底 和高，计算并输出三角形的面积。  

**输入格式**  
一行包含两个正实数，空格分隔，表示底和高  

**输出格式**  
一个实数，2 位小数  

**输入样例**  
1.5 2.4  

**输出样例:**  
1.80
```c
#include <stdio.h>  
int main() {  
    double base, height;  
    // 读取底边和高度  
    scanf("%lf %lf", &base, &height);  
    // 计算三角形的面积  
    double area = (base * height) / 2;  
    // 输出面积，保留两位小数  
    printf("%.2lf\n", area);  
    return 0;  
}
```

## 加减乘除

**题目内容:**  
本题要求编写程序，计算并输出 2 个正整数的和、差、积。题目保证输入和输出全部在整型范围内。输入格式:  
输入在一行中给出 2 个正整数 A 和 B。  

**输出格式:**  
分行按照格式 “A 运算符 B = 结果” 顺序输出和、差、积。  

**输入样例:**  
7 8  

**输出样例:**  
7+8=15  
7-8=-1  
7*8=56
```c
#include <stdio.h>  
int main() {  
    int a, b;  
    scanf("%d %d", &a, &b);  
    printf("%d+%d=%d\n", a, b, a + b);  
    printf("%d-%d=%d\n", a, b, a - b);  
    printf("%d*%d=%d\n", a, b, a * b);  
    return 0;  
}
```

## 欠债还钱

**题目内容：**  
阿福打算向朋友借钱，请输入一个浮点数 m 和一个整数 n，分别表示他想借的钱数和借期，程序输出他的意图。  

**输入格式:**  
输入在一行中给出 1 个浮点数和 1 个整数，二者均大于 0。  

**输出格式:**  
输出的钱数保留两位小数，格式如下所示：  
你好，可以借我 XX.XX 元钱吗？  
X 天后一定还！  

**输入样例:**  
166.66 7  

**输出样例:** 
你好，可以借我 166.66 元钱吗？  
7 天后一定还！
```c
#include<stdio.h>  
int main()
{  
	double m;  
	int n;  
	scanf("%lf%d",&m,&n);  
	printf("你好，可以借我%.2lf元钱吗？\n",m);  
	printf("%d天后一定还！",n);  
	return 0;  
}
```

# 第三章 运算符和表达式

## 判断闰年

**题目内容:**  
输入年份判断该年份是否是闰年。闰年的判定条件是能被 400 整除或能被 4 整除但不能被 100 整除的年份  

**输入格式:**  
输入年份，判断其是否闰年。  

**输出格式:**  
YES 或 NO  

**输入样例:**  
2000  

**输出样例:**  
YES
```c
#include <stdio.h>  
int main() {  
    int year;  
    scanf("%d", &year);  
    if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0)) {  
        printf("YES\n");  
    } else {  
        printf("NO\n");  
    }  
    return 0;  
}
```

## 移花接木

**题目内容:**  
输入两个浮点数，将第二个数的小数部分拼接到第一个数的整数部分将第一个数的小数部分拼接到第二个数的整数部分。然后输出新生成的浮点数。  

**输入格式:**  
输入两个浮点数。(注意可能有负数)  

**输出格式:**  
输出新生成的两个浮点数。(输出保留 6 位小数)  

**输入样例 1:**  
135.79 24.068  

**输出样例 1:**  
135.068000 24.790000  

**输入样例 2:**  
-1.23 4.56  

**输出样例 2:**  
-1.560000 4.230000

### 我的版本
```
#include <stdio.h>  
#include <math.h>  
  
int main()  
{  
double n1,n2,i1,i2,f1,f2,r1,r2;  
scanf("%lf %lf",&n1,&n2);  
i1=(int)n1;  
i2=(int)n2;  
f1 = (n2 < 0 ? -1 : 1) * (fabs(n1) - (int)fabs(n1));  
f2 = (n1 < 0 ? -1 : 1) * (fabs(n2) - (int)fabs(n2));  
r1=i1+f2;  
r2=i2+f1;  
printf("%lf %lf",r1,r2);  
}
```

### 张跃哲同学的版本
```c
#include<stdio.h>  
#include<math.h>  
int main() {  
	double n1, n2;  			//原数  
	int i1 , i2;    			//取整数  
	double f1, f2;  			//取小数  
	scanf_s("%lf%lf", &n1, &n2);	  
	i1 = (int)n1;				//注意，强制转换成int，向零取整  
	i2 = (int)n2;  
	f1 = n1 - i1;				//正数情况即直接就是小数  
	f2 = n2 - i2;				//负数情况即为带符号的小数 即-1.23转化为0.23  
	//注意第一个数加上第二个数的小数部分，小数部分看第一个数的符号  
	n1 = i1+((n1 == fabs(n1)) * 2 - 1) * fabs(f2);	  
	n2 = i2 + ((n2 == fabs(n2)) * 2 - 1) * fabs(f1);  
	printf("%lf %lf\n", n1, n2);  
	return 0;  
}
```

### 陈怀宇同学的版本
```c
#include <stdio.h>  
  
int main() {  
    double a,b;  
    scanf("%lf %lf", &a, &b);  
    if (a*b >= 0){  
        printf("%.6lf %.6lf", (int)a+b-(int)b, (int)b+a-(int)a);  
    }  
    else {  
        printf("%.6lf %.6lf", (int) a - b + (int) b, (int) b - a + (int) a);  
    }  
    return 0;  
}
```

### 陈冠亨同学的版本
```c
#include <stdio.h>  
#include <string.h>  
  
#define MAX_LENGTH 100  
  
void swap_integer_and_decimal(const char *num1, const char *num2, char *result) {  
    char int_part1[MAX_LENGTH], decimal_part1[MAX_LENGTH];  
    char int_part2[MAX_LENGTH], decimal_part2[MAX_LENGTH];  
  
    // 找到第一个数字的小数点  
    char *decimal1 = strchr(num1, '.');  
    char *decimal2 = strchr(num2, '.');  
  
    // 如果找到小数点  
    if (decimal1 != NULL && decimal2 != NULL) {  
        // 提取整数部分和小数部分  
        strncpy(int_part1, num1, decimal1 - num1);  
        int_part1[decimal1 - num1] = '\0';  
        strcpy(decimal_part1, decimal1 + 1);  
  
        strncpy(int_part2, num2, decimal2 - num2);  
        int_part2[decimal2 - num2] = '\0';  
        strcpy(decimal_part2, decimal2 + 1);  
  
        // 生成结果字符串  
        snprintf(result, MAX_LENGTH, "%s.%s %s.%s", int_part2, decimal_part1, int_part1, decimal_part2);  
    } else {  
        strcpy(result, "Invalid input format");  
    }  
}  
  
int main() {  
    char input1[MAX_LENGTH];  
    char input2[MAX_LENGTH];  
    char result[MAX_LENGTH];  
  
    // 从标准输入读取数据  
    printf("Enter two decimal numbers separated by space: ");  
    scanf("%s %s", input1, input2);  
  
    // 进行整数部分和小数部分的互换  
    swap_integer_and_decimal(input1, input2, result);  
  
    // 输出结果  
    printf("Swapped result: %s\n", result);  
  
    return 0;  
}
```

## 三目运算

**题目内容:**
输入四个浮点数，只用三目运算符 (不能用 if 等条件语句或循环语句) 找出其中的最大值和最小值。  

**输入格式：**
第一行输入四个数值；  

**输出格式:**
最大值 最小值 (结果保留两位小数)  

**输入样例:**
5 9 3 7.0  

**输出样例:**
9.00 3.00
```c
#include<stdio.h>  
int main() {  
	double a, b, c, d;  
	double max, min;  
	scanf("%lf%lf%lf%lf", &a, &b, &c, &d);  
	max = a > b ? a : b;  
	max = max > c ? max : c;  
	max = max > d ? max : d;  
	min = a > b ? b : a;  
	min = min > c ? c : min;  
	min = min > d ? d : min;  
	printf("%.2f %.2f", max, min);  
	return 0;  
}
```

# 第四章 程序流程控制

## 阿福家的电费

**题目内容：**  
入秋了，家里的用电量也减少了许多。阿福收到了新一期的电费通知单，却发现本期电费与高温天的电费不相上下。杭州现行的阶梯电价是按照年用电量来划分的，这说明阿福家的低价电额度已用完，接下来可得节约用电咯。阿福想自己验证一下，今年以来代扣的总电费到底是否正确。请编写一个程序，已知今年 1 月份以来的各月用电量，根据电价规定，计算出今年应缴的总电费是多少。  
杭州现行的阶梯电价标准分三档：  
第一档：电量为年用电量 2760 度及以下部分，电价不作调整，标准电价为 0.538 元 / 度；  
第二档：电量为年用电量 2761 至 4800 度的部分，电价在第一档基础上加价 0.05 元，为 0.588 元 / 度；  
第三档：电量超过 4800 的部分，电价在第一档基础上加价 0.3 元，为 0.838 元 / 度。  
**输入格式:**  
输入占一行，给出若干个整数（以输入 - 1 表示结束），分别表示从 1 月开始各个月份的用电量（单位是度），注意：-1 不算用电量。  

**输出格式：**  
输出总电费（单位是元），结果保留 1 位小数。  

**输入样例：**  
468 489 370 363 397 380 712 679 484 453 462 -1  

**输出样例：**  
3067.4
```c
#include <stdio.h>
int main()
{
	int i,sum,a[13];
	double r;
	
	for(i=0;i<12;i+=1){
		scanf("%d",&a[i]);
		if (a[i]==-1){
		break;
	}
		sum+=a[i];
		
	}
	
	
	if (sum<=2760){
		r=sum*0.538;
	}else if(sum>2760&&sum<=4800){
		r=2760*0.538+(sum-2760)*0.588;
		}else{
			r=0.838*(sum-4800)+2760*0.538+(4800-2760)*0.588;
		}
	printf("%.1f",r);
}
```

## 幂级数求近似值


**题目内容：** 
已知函数 的幂级数展开式为 。现给定一个实数 和一个整数 ，利用此幂级数展开式的前 n+1 项之和，求 的近似值。  

**输入格式:**
输入在一行中给出一个实数 x 和一个整数 n。  

**输出格式：**  
输出展开式的前 n+1 项之和，保留 4 位小数。  

**输入样例：**  
1.2 10  

**输出样例：**
3.3201
```c
#include <stdio.h>
#include <math.h>
long long factorial(int n);

int main()
{
	double x,r=1;
	int i,n;
	scanf("%lf %d",&x,&n);
	if(n!=0){
		for(i=1;i<n+1;i+=1){
			r+=pow(x,i)/factorial(i);
		}
	}
	printf("%.4lf",r);
}

long long factorial(int n)
{
    long long result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
```

## 素数口袋


**题目内容：**  
阿福有一个口袋，可以用来装各个素数。他从 2 开始，依次判断各个自然数是不是素数，如果是素数就把这个数字装入口袋。口袋的承载量就是包里所有数字之和，但口袋的承载量有限。假设口袋的承载量是 L，表示只能装得下总和不超过 L 的素数。现给出一个正整数 L，请问口袋里能装下几个素数？将这些素数从小到大输出，再输出最多能装下的素数个数。  

**输入格式:**  
输入一个正整数 L（2<=L<=10000），表示最大承载量。  

**输出格式：**  
输出包括两行，第一行从小到大输出能装下的所有素数，数与数之间用空格隔开（注意：行末无空格）  
第二行输出”count = 素数个数”  

**输入样例：**  
100  

**输出样例：**  
2 3 5 7 11 13 17 19 23  
count = 9
```c
#include <stdio.h>

int isPrime(int num) {
    if (num < 2) {
        return 0;
    }
    for (int i = 2; i * i <= num; i++) {
        if (num % i == 0) {
            return 0;
        }
    }
    return 1;
}

int main() {
    int L;
    scanf("%d", &L);

    int sum = 0;
    int count = 0;
    int num = 2;
    while (sum + num <= L) {
        if (isPrime(num)) {
            if (count > 0) {
                printf(" ");
            }//通过循环处理空格
            printf("%d", num);
            sum += num;
            count++;
        }
        num++;
    }

    printf("\ncount = %d", count);

    return 0;
}
```

# 第五章 数组

## 支撑数


**题目内容：**
找出一个数列中全部的“支撑数”。
“支撑数”有这样的特征：它们不在第一个，也不在最后一个，而且比左边和右边相邻的数都大。 

**输入格式:**  
第一行输入一个整数n，表示数列中有n个整数。（3<=n<=100） 
第二行输入n个整数。

**输出格式：**  
分行输出所有的支撑数，每行输出一个支撑数（保证至少有一个）。 

**输入样例：**  
6
1 3 2 4 1 5

**输出样例：**  
3
4
```c
#include <stdio.h>
int main(){
	int n,i;
	scanf("%d",&n);
	int a[n];
	for(i=0;i<n;i++){
		scanf("%d",&a[i]);	
	}
	for(i=1;i<n-1;i++){
		if(a[i-1]<a[i]&&a[i]>a[i+1]){
			printf("%d\n",a[i]);
		}
	}	
}
```

## 上三角矩阵

**题目内容：**
上三角矩阵指主对角线以下的元素都为0的矩阵（不包括主对角线）；主对角线为从矩阵的左上角至右下角的连线。
本题要求编写程序，判断一个给定的方阵是否上三角矩阵。

**输入格式:**  
输入第一行给出一个正整数N（2≤N≤10)。
随后N行，每行给出N个整数，其间以空格分隔。

**输出格式：**  
如果输入的矩阵是上三角矩阵，输出YES，否则输出NO。

**输入样例：**  

5

1 2 3 4 5

0 1 2 3 4

0 0 1 2 3

0 0 0 1 2

0 0 0 0 1

**输出样例：**  

YES
```c
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);

    int matrix[n][n];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }

    int isUpperTriangular = 1;

    for (int i = 1; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (matrix[i][j]!= 0) {
                isUpperTriangular = 0;
                break;
            }
        }
        if (!isUpperTriangular) {
            break;
        }
    }

    if (isUpperTriangular) {
        printf("YES\n");
    } else {
        printf("NO\n");
    }

    return 0;
}
```

## 按绝对值排序

**题目内容：**
输入n(n<=100)个整数，按照绝对值从大到小排序后输出

**输入格式：**  
输入数据的第一个数字为n，接着是n个整数。

**输出格式：**  
按照绝对值从大到小排序后输出n个整数，两数之间空格隔开，最后一个数后面无空格。

**输入样例：**  
3 3 -4 2  

**输出样例：**  
-4 3 2
```c
#include <stdio.h>
#include <math.h>

// 冒泡排序函数
void bubbleSort(int arr[], int n) {
    int i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (fabs(arr[j]) < fabs(arr[j + 1])) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n;
    scanf("%d", &n);

    int arr[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    bubbleSort(arr, n);

    for (int i = 0; i < n - 1; i++) {
        printf("%d ", arr[i]);
    }
    printf("%d", arr[n - 1]);

    return 0;
}
```

# 第六章 函数

## 判断是否为完数

**题目内容：**
编写函数，判断一个正整数a是否为完数，如果是完数，函数返回值为1；否则为0.（完数：一个数的所有因子之和等于该本身，如6、28都是完数；6=1+2+3； 28=1+2+4+7+14）

**输入格式:**  
输入一个正整数。

**输出格式：**  
如果是，输出“是完数”，否则输出“不是完数”

**输入样例1：**  
6

**输出样例1：**  
是完数

**输入样例2：**  
25

**输出样例2：**  
不是完数
```c
#include <stdio.h>

int ws(int num) {
    int sum = 0;
    for (int i = 1; i < num; i++) {
        if (num % i == 0) {
            sum += i;
        }
    }
    if (sum == num) {
        return 1;
    } else {
        return 0;
    }
}

int main() {
    int num;
    scanf("%d", &num);
    if (ws(num)) {
        printf("是完数\n");
    } else {
        printf("不是完数\n");
    }
    return 0;
}
```

## 递归求 Fabonacci 数列

**题目内容：**  
本题要求实现求 Fabonacci 数列项的函数。Fabonacci 数列的定义如下：  
f (n)=f (n−2)+f (n−1) (n≥2)，其中 f (0)=0，f (1)=1。  
题目保证输入输出在长整型范围内。建议用递归实现.  

**输入格式:**  
输入一个正整数 n  

**输出格式：**  
输出 f (n) 的值。  

**输入样例：**  
6  

**输出样例：**  
8
```c
#include <stdio.h>

long long f(int n) {
    if (n == 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return f(n - 2) + f(n - 1);
    }
}

int main() {
    int n;
    scanf("%d", &n);
    printf("%lld\n", f(n));
    return 0;
}
```

## 输出一个整数的逆序数（10分）

**题目内容：**
实现一个求整数的逆序数的简单函数。

**输入格式:**  
输入一个整数（可正可负）。

**输出格式：**  
输出它的逆序，注意考虑正负。

**输入样例1：**  
1234

**输出样例1：**  
4321

**输入样例2：**  
-12340

**输出样例2：**  
-4321
```c
#include <stdio.h>

int reverse( int number );
    
int main()
{
    int n;

    scanf("%d", &n);
    printf("%d\n", reverse(n));

    return 0;
}

int reverse( int num){
	int r = 0;
    while (num!= 0) {
        r=r*10+num%10;
        num/=10;
    }
    return r;
}
```

# 第七章 指针

##  删除数列中的指定数

**题目内容：**
请使用指针的方法编写程序，程序的功能是先输入10个整数存储到数组a中，再输入一个指定的数x，把数组中的x数据删除掉，并保证数组中剩余的数还是连续存储的。

比如输入10个整数：3 2 8 6 5 8 7 9 8 5，存入数组，然后输入一个数8，把数组中的8全部删除。最后数组中剩下的数：3 2 6 5 7 9 5，在数组a中还是连续存储的。

要求定义函数实现删除功能：int del_num(int *p, int n, int x)；其中函数的返回值为删除指定数后数组中剩余数据的个数。

**输入格式:**  
输入10个整数，和1个指定数。

**输出格式：**  
输出剩余数，以空格隔开，最后一个数后面没有空格。

**输入样例：**  
3 2 8 6 5 8 7 9 8 5
8

**输出样例：**  
3 2 6 5 7 9 5
```c
#include <stdio.h>

int del_num(int *p, int n, int x);

int main() {
    int a[10];
    for (int i = 0; i < 10; i++) {
        scanf("%d", &a[i]);
    }
    int x;
    scanf("%d", &x);
    int newLength = del_num(a, 10, x);
    for (int i = 0; i < newLength; i++) {
        printf("%d", a[i]);
        if (i < newLength - 1) {
            printf(" ");
        }
    }
    return 0;
}

int del_num(int *p, int n, int x) {
    int j = 0;
    for (int i = 0; i < n; i++) {
        if (p[i]!= x) {
            p[j++] = p[i];
        }
    }
    return j;
}
```
  
## 求一组数中的最大值、最小值及总和

**题目内容：**
求一组数中的最大值、最小值及总和。要求定义函数
int f(int a[],int n,int *pmax,int *pmin)
函数返回总和，并分别通过指针pmax 和 pmin将最大值、最小值赋值给主函数中的对应变量。

**输入格式:**  
第1行为正整数n（n>2）,表示一组数的个数 第2行包含n个整数，用空格分隔。

**输出格式：**  
一行包含3个整数，分别为最大值、最小值及总和

**输入样例：**  
10
2 5 4 8 6 9 1 3 7 0

**输出样例：**  
9 0 45
```c
#include <stdio.h>

int f(int a[], int n, int *pmax, int *pmin);

int main() {
    int n;
    scanf("%d", &n);
    int a[n];
    for (int i = 0; i < n; i++) {
        scanf("%d", &a[i]);
    }
    int max, min;
    int sum = f(a, n, &max, &min);
    printf("%d %d %d", max, min, sum);
    return 0;
}

int f(int a[], int n, int *pmax, int *pmin) {
    *pmax = a[0];
    *pmin = a[0];
    int sum = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] > *pmax) {
            *pmax = a[i];
        }
        if (a[i] < *pmin) {
            *pmin = a[i];
        }
        sum += a[i];
    }
    return sum;
}
```

# 第八章 字符串

## 查找字符串

**题目内容：**
给定一个字符串，在字符串中找到第一个连续出现至少k次的字符。

**输入格式:**  
第一行包含一个正整数k，表示至少需要连续出现的次数。1 <= k <= 100。
第二行包含需要查找的字符串。字符串长度在1到100之间，且不包含任何空白符。  

**输出格式：**  
若存在连续出现至少k次的字符，输出该字符；否则输出NO。

**输入样例1：**  
3
abcccaaab

**输出样例1：**  
c

**输入样例2：**  
3
abccaab

**输出样例2：**  
NO
```c
#include <stdio.h>
#include <string.h>

int main() {
    int k;
    scanf("%d", &k);
    char s[101];
    scanf("%s", s);
    int len = strlen(s);
    for (int i = 0; i < len; i++) {
        int count = 1;
        for (int j = i + 1; j < len; j++) {
            if (s[j] == s[i]) {
                count++;
            } else {
                break;
            }
        }
        if (count >= k) {
            printf("%c\n", s[i]);
            return 0;
        }
    }
    printf("NO\n");
    return 0;
}
```

## 求最大字符串

**题目内容：**
本题要求编写程序，针对输入的N个字符串，输出其中最大的字符串。

**输入格式：**  
输入第一行给出正整数N；随后N行，每行给出一个长度小于80的非空字符串，其中不会出现换行符，空格，制表符。

**输出格式：**  
输出最大的字符串。

**输入样例：**  
6  
best
cat
east
a
free
day

**输出样例：**  
free
```c
#include <stdio.h>
#include <string.h>

int main() {
    int n;
    scanf("%d", &n);
    char maxStr[80];
    scanf("%s", maxStr);
    for (int i = 1; i < n; i++) {
        char str[80];
        scanf("%s", str);
        if (strcmp(str, maxStr) > 0) {
            strcpy(maxStr, str);
        }
    }
    printf("%s\n", maxStr);
    return 0;
}
```

# 第九章 结构体

## 最高分的学生

**题目内容：**
输入学生的人数，然后再输入每位学生的分数和姓名，求获得最高分数的学生的姓名。

**输入格式:**  
第一行输入一个正整数N（N <= 100），表示学生人数。接着输入N行，每行格式如下： 分数 姓名 分数是一个非负整数，且小于等于100； 姓名为一个连续的字符串，中间没有空格，长度不超过20。

**输出格式：**  
输出最高分数的学生姓名。每行包含一个姓名

**输入样例：**  
5
87 lilei
99 hanmeimei
97 lily
99 lucy
77 jim

**输出样例：**  
hanmeimei
lucy
```c
#include <stdio.h>
#include <string.h>

struct student {
    int score;
    char name[21];
};

int main() {
    int n;
    scanf("%d", &n);
    struct student students[n];
    for (int i = 0; i < n; i++) {
        scanf("%d %s", &students[i].score, students[i].name);
    }
    int maxScore = students[0].score;
    for (int i = 1; i < n; i++) {
        if (students[i].score > maxScore) {
            maxScore = students[i].score;
        }
    }
    for (int i = 0; i < n; i++) {
        if (students[i].score == maxScore) {
            printf("%s\n", students[i].name);
        }
    }
    return 0;
}
```

## 计算平均成绩

**题目内容：**
给定N个学生的基本信息，包括学号（由5个数字组成的字符串）、姓名（长度小于10的不包含空白字符的非空字符串）和成绩（[0,100]区间内的整数），要求计算他们的平均成绩，并顺序输出平均线以下的学生名单。

**输入格式:**  
输入在一行中给出正整数N（≤10）。随后N行，每行给出一位学生的信息，格式为“学号 姓名 成绩”，中间以空格分隔。

**输出格式：**  
首先在一行中输出平均成绩，保留2位小数。然后按照输入顺序，每行输出一位平均线以下的学生的姓名和学号，间隔一个空格。

**输入样例：**  

```
5
00001 zhang 70
00002 wang 80
00003 qian 90
10001 li 100
21987 chen 60
```

**输出样例：**  
```
80.00
zhang 00001
chen 21987
```
```c
#include <stdio.h>
#include <string.h>

struct Student {
    char id[6];
    char name[10];
    int score;
};

int main() {
    int n;
    scanf("%d", &n);
    struct Student students[n];
    int total_score = 0;
    for (int i = 0; i < n; i++) {
        scanf("%s %s %d", students[i].id, students[i].name, &students[i].score);
        total_score += students[i].score;
    }
    double average_score = (double)total_score / n;
    printf("%.2lf\n", average_score);
    for (int i = 0; i < n; i++) {
        if (students[i].score < average_score) {
            printf("%s %s\n", students[i].name, students[i].id);
        }
    }
    return 0;
}
```

# 第十章 文件

无练习

# 线上期末考试

## 计算行李费

**题目内容：**
乘坐飞机时，当乘客行李重量不超过10公斤时，可随身携带行李免费。当行李重量超过10公斤时，必须办理托运。行李费这样计算量大于10公斤且小于等于20公斤时，每公斤2元。如果行李重量大于20公斤时，每公斤3元。请编程计算行李费。

**输入格式:**
一个正整数（<100），乘客携带行李重量，单位公斤

**输出格式:**
一个整数，表示行李费用

**输入样例：**
11

**输出样例：**
22

```c
#include <stdio.h>

int main()
{
	int weight;
	scanf("%d",&weight);
	
	int fee;
	if(weight<=10)
	{
		fee=0;
	}
	else if(weight>10&&weight<=20)
	{
		fee=weight*2;
	}
	else if(weight>20)
	{
		fee=weight*3;
	}
	printf("%d",fee);
}
```

## 行程长度压缩

**题目内容：**
在数据压缩中，一个常用的途径是行程长度压缩。对于一个待压缩的字符串（只包含大写字母）而言，我们可以依次记录每个字符及重复的次数。这种压缩，对于相邻数据重复较多的情况比较有效。 例如，如果待压缩串为"AAABBBBCBB"，则压缩的结果是(A,3)(B,4)(C,1)(B,2)。当然，如果相邻字符重复情况较少，则压缩效率就较低。 现要求根据输入的字符串，得到压缩结果。

**输入格式:**
一个字符串，全部由大写字母组成。长度大于1，小于10000 

**输出格式：**
输出为一行，表示压缩结果，形式为： (A,3)(B,4)(C,1)(B,2) 即每对括号内部分别为字符及重复出现的次数，不含任何空格。 

**输入样例：**
AAABBBBCCCAAAAA 

**输出样例：**
(A,3)(B,4)(C,3)(A,5)

```c
#include <stdio.h>
#include <string.h>

int main() {
    char str[10000];
    scanf("%s", str);

    int len = strlen(str);
    int count = 1;
    for (int i = 0; i < len; i++) {
        if (str[i] == str[i + 1]) {
            count++;
        } else {
            printf("(%c,%d)", str[i], count);
            count = 1;
        }
    }

    return 0;
}
```
