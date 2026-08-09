---
title: 24级杭电先修课PTA作业
date: 2024-08-30 21点17分
tags:
  - c语言
  - 杭电
  - PTA
description: 汇总杭电 C 语言先修课 PTA 练习题及参考实现，覆盖基础输入输出、分支循环、数组、字符串和综合编程题。
---


# 序言
这是pta的c语言练习  

由于本人能力有限，后面个别题目未提供代码。可参考[张跃哲同学的代码](https://zyzblog.com/post/42283b9e.html)
<!--more-->

# 2024-1

## 最好的文档

有一位软件工程师说过一句很有道理的话：“Good code is its own best documentation.”（好代码本身就是最好的文档）。本题就请你直接在屏幕上输出这句话。

### 输入格式：

本题没有输入。

### 输出格式：

在一行中输出 `Good code is its own best documentation.`。

### 输入样例：

```in
无
```

### 输出样例：

```out
Good code is its own best documentation.
```
```c
#include <stdio.h>
int main()
{
	printf("Good code is its own best documentation.");
}
```

## 自动编程

输出语句是每个程序员首先要掌握的语句。Python 的输出语句很简单，只要写一个 `print(X)` 即可，其中 `X` 是需要输出的内容。

本题就请你写一个自动编程机，对任何一个要输出的整数 N，给出输出这个整数的 Python 语句。

### 输入格式：

输入给出一个不超过 105 的正整数。

### 输出格式：

在一行中打印输出这个整数的 Python 语句，其中不包含任何空格。

### 输入样例：

```in
520
```

### 输出样例：

```out
print(520)
```
```c
#include <stdio.h>
int main()
{
	int a;
	scanf("%d",&a);
	printf("print(%d)",a);
}
```

## 什么是机器学习
什么是机器学习？上图展示了一段面试官与“机器学习程序”的对话：

```
面试官：9 + 10 等于多少？
答：3
面试官：差远了，是19。
答：16
面试官：错了，是19。
答：18
面试官：不，是19。
答：19
```

本题就请你模仿这个“机器学习程序”的行为。

### 输入格式：

输入在一行中给出两个整数，绝对值都不超过 100，中间用一个空格分开，分别表示面试官给出的两个数字 A 和 B。

### 输出格式：

要求你输出 4 行，每行一个数字。第 1 行比正确结果少 16，第 2 行少 3，第 3 行少 1，最后一行才输出 A+B 的正确结果。

### 输入样例：

```in
9 10
```

### 输出样例：

```out
3
16
18
19
```
```c
#include <stdio.h>
int main()
{
	int a,b;
	scanf("%d %d",&a,&b);
	printf("%d\n",a+b-16);
	printf("%d\n",a+b-3);
	printf("%d\n",a+b-1);
	printf("%d\n",a+b);
}
```

# 2024-2

## 是不是太胖了
据说一个人的标准体重应该是其身高（单位：厘米）减去100、再乘以0.9所得到的公斤数。已知市斤的数值是公斤数值的两倍。现给定某人身高，请你计算其标准体重应该是多少？（顺便也悄悄给自己算一下吧……）

### 输入格式：

输入第一行给出一个正整数`H`（100 < H ≤ 300），为某人身高。

### 输出格式：

在一行中输出对应的标准体重，单位为市斤，保留小数点后1位。

### 输入样例：

```in
169
```

### 输出样例：

```out
124.2
```
```c
#include<stdio.h>
int main()
{
	int h;
	double w;
	scanf("%d",&h);
	w=(h-100)*0.9*2;
	printf("%.1f",w);
}
```

## 计算存款利息
本题目要求计算存款利息，计算公式为interest=money×(1+rate)year−money，其中interest为存款到期时的利息（税前），money是存款金额，year是存期，rate是年利率。

### 输入格式：

输入在一行中顺序给出三个正实数money、year和rate，以空格分隔。

### 输出格式：

在一行中按“interest = 利息”的格式输出，其中利息保留两位小数。

### 输入样例：

```in
1000 3 0.025
```

### 输出样例：

```out
interest = 76.89
```
```c
#include <stdio.h>
#include <math.h>

int main()
{
	double m,y,r,i;
	scanf("%lf %lf %lf",&m,&y,&r);
	i=m*pow((1+r),y)-m;
	printf("interest = %.2lf",i);
}
```

## 计算摄氏温度
给定一个华氏温度F，本题要求编写程序，计算对应的摄氏温度C。计算公式：C=5×(F−32)/9。题目保证输入与输出均在整型范围内。

### 输入格式:

输入在一行中给出一个华氏温度。

### 输出格式:

在一行中按照格式“Celsius = C”输出对应的摄氏温度C的整数值。

### 输入样例:

```in
150
```

### 输出样例:

```out
Celsius = 65
```
```c
#include <stdio.h>
#include <math.h>

int main()
{
	int c,f;
	scanf("%d",&f);
	c=5*(f-32)/9;
	printf("Celsius = %d",c);
}
```

# 2024-3

## 程序员买包子
![bao.jpg](https://images.ptausercontent.com/a35ac075-7709-4ff7-b7ce-6d2208afc6af.jpg)

这是一条检测真正程序员的段子：假如你被家人要求下班顺路买十只包子，如果看到卖西瓜的，买一只。那么你会在什么情况下只买一只包子回家？  
本题要求你考虑这个段子的通用版：假如你被要求下班顺路买 N 只包子，如果看到卖 X 的，买 M 只。那么如果你最后买了 K 只包子回家，说明你看到卖 X 的没有呢？

### 输入格式：

输入在一行中顺序给出题面中的 N、X、M、K，以空格分隔。其中 N、M 和 K 为不超过 1000 的正整数，X 是一个长度不超过 10 的、仅由小写英文字母组成的字符串。题目保证 N=M。

### 输出格式：

在一行中输出结论，格式为：

- 如果 K=N，输出 `mei you mai X de`；
- 如果 K=M，输出 `kan dao le mai X de`；
- 否则输出 `wang le zhao mai X de`.  
    其中 `X` 是输入中给定的字符串 X。

### 输入样例 1：

```in
10 xigua 1 10
```

### 输出样例 1：

```out
mei you mai xigua de
```

### 输入样例 2：

```in
10 huanggua 1 1
```

### 输出样例 2：

```out
kan dao le mai huanggua de
```

### 输入样例 3：

```in
10 shagua 1 250
```

### 输出样例 3：

```out
wang le zhao mai shagua de
```
```c
#include <stdio.h>
int main()
{
    int N,M,K;
    char X[10];
    scanf("%d %s %d %d",&N,&X,&M,&K);
    if(K==N)
    	printf("mei you mai %s de",X);
    
    else if(K==M)
    	printf("kan dao le mai %s de",X);
    	
    else
    	printf("wang le zhao mai %s de",X);
    return 0;

}
```

## 新胖子公式
根据钱江晚报官方微博的报导，最新的肥胖计算方法为：体重(kg) / 身高(m) 的平方。如果超过 25，你就是胖子。于是本题就请你编写程序自动判断一个人到底算不算胖子。

### 输入格式：

输入在一行中给出两个正数，依次为一个人的体重（以 kg 为单位）和身高（以 m 为单位），其间以空格分隔。其中体重不超过 1000 kg，身高不超过 3.0 m。

### 输出格式：

首先输出将该人的体重和身高代入肥胖公式的计算结果，保留小数点后 1 位。如果这个数值大于 25，就在第二行输出 `PANG`，否则输出 `Hai Xing`。

### 输入样例 1：

```in
100.1 1.74
```

### 输出样例 1：

```out
33.1
PANG
```

### 输入样例 2：

```in
65 1.70
```

### 输出样例 2：

```out
22.5
Hai Xing
```
```c
#include <stdio.h>
#include <math.h>
#include <string.h>

int main()
{
	double l,w,r;
	char s[20];
	scanf("%lf %lf",&w,&l);
	r=w/pow(l,2);
	strcpy(s,r>25?"PANG":"Hai Xing");
	printf("%.1lf\n%s",r,s);
}

```

## 真的恭喜你
当别人告诉你自己考了 x 分的时候，你要回答说：“恭喜你考了 x 分！”比如小明告诉你他考了90分，你就用汉语拼音打出来 `gong xi ni kao le 90 fen!`。

但是如果小明没考好，比如只考了 20 分，你也“恭喜”人家就不对了。这时候你应该安慰他说：“考了 20 分别泄气！”用汉语拼音写出来就是 `kao le 20 fen bie xie qi!`。

### 输入格式：

输入在一行里给出一位小朋友的分数。这个分数是一个 0 到 100 之间的整数。

### 输出格式：

在一行中输出你对这位小朋友说的话。如果人家考到不低于 90 分，就说 `gong xi ni kao le X fen!`；如果不到 90 分，就说 `kao le X fen bie xie qi!`。其中 `X` 是小朋友输入的分数。

### 输入样例 1：

```in
95
```

### 输出样例 1：

```out
gong xi ni kao le 95 fen!
```

### 输入样例 2：

```in
89
```

### 输出样例 2：

```out
kao le 89 fen bie xie qi
```
```c
#include <stdio.h>
int main()
{
	int a;
	scanf("%d",&a);
	if (a<90)
		printf("kao le %d fen bie xie qi!",a);
	else
		printf("gong xi ni kao le %d fen!",a);
}
```

## 判断一个三位数是否为水仙花数
本题要求编写程序，判断一个给定的三位数是否为水仙花数。三位水仙花数，即其个位、十位、百位数字的立方和等于该数本身。

### 输入格式:

输入在一行中给出一个需要判断的整数 N（100≤N≤999）。

### 输出格式:

如果N是水仙花数，则在一行中输出`Yes`，否则输出`No`。如果N不是三位数，则输出`Invalid Value.`。

### 输入样例1:

```in
153
```

### 输出样例1:

```out
Yes
```

### 输入样例2:

```in
500
```

### 输出样例2:

```out
No
```

### 输入样例3:

```in
-2
```

### 输出样例3:

```out
Invalid Value.
```
```c
#include <stdio.h>
#include <math.h>
int main()
{
	int a,a1,a2,a3;
	scanf("%d",&a);
	a1=a/100;
	a2=(a/10)%10;
	a3=a%100%10;
	if (a>=100&&a<1000)
		if (a==pow(a1,3)+pow(a2,3)+pow(a3,3))
			printf("Yes");
		else
			printf("No");
	else
		printf("Invalid Value.");
}

```

## 成绩转换
本题要求编写程序将一个百分制成绩转换为五分制成绩。转换规则：

- 大于等于90分为A；
- 小于90且大于等于80为B；
- 小于80且大于等于70为C；
- 小于70且大于等于60为D；
- 小于60为E。

### 输入格式:

输入在一行中给出一个整数的百分制成绩。

### 输出格式:

在一行中输出对应的五分制成绩。

### 输入样例:

```in
90
```

### 输出样例:

```out
A
```
```c
#include <stdio.h>
#include <math.h>
int main()
{
	int a;
	scanf("%d",&a);
	if(a>=90)
		printf("A");
	else if(a>=80&&a<90)
		printf("B");
	else if(a>=70&&a<80)
		printf("C");
	else if(a>=60&&a<70)
		printf("D");
	else if(a<60)
		printf("E");	
}
```

## 五级制成绩
### 任务描述

五级制成绩表示法可以这样来理解，A代表[90-100]、B代表[80-90)、C代表[70-80)、D代表[60-70)、E代表[0-60)。  
给出五级制成绩(一个字符)，请输出这个字符所代表的分数范围。

### 输入格式:

一个大写的英文字符，代表五级制成绩。

### 输出格式:

在一行中输出该成绩所表示的整数成绩范围区间，如果该字符不在五级制定义范围之内，输出：ERROR。

### 输入样例1:

```in
A
```

### 输出样例1:

```out
[90-100]
```

### 输入样例2:

```in
D
```

### 输出样例2:

```out
[60-70)
```

### 输入样例3:

```in
X
```

### 输出样例3:

```out
ERROR
```
```c
#include <stdio.h>
int main()
{
	char a;
	scanf("%c",&a);
	if(a=='A')
		printf("[90-100]");
	else if(a=='B')
		printf("[80-90)");
	else if(a=='C')
		printf("[70-80)");
	else if(a=='D')
		printf("[60-70)");
	else if(a=='E')
		printf("[0-60)");
	else
		printf("ERROR");
}
```

## 输出星期名
请编写程序，输入星期数，输出对应的英文星期名。

|   |   |
|---|---|
|**星期数**|**星期名**|
|0|Sunday|
|1|Monday|
|2|Tuesday|
|3|Wednesday|
|4|Thursday|
|5|Friday|
|6|Saturday|

#### 输入格式

> w

#### 输出格式

> 若 w 在 0 ~ 6 范围内，则输出星期名 若 w 在 0 ~ 6 范围外，则输出None

#### 输入样例1

```in
3
```

#### 输出样例1

```out
Wednesday
```

#### 输入样例2

```in
9
```

#### 输出样例2

```out
None
```
```c
#include <stdio.h>
#include <string.h>
int main()
{
	int a;
	char s[8][1000]={"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"};
	scanf("%d",&a);
	if(a>=0&&a<7)
		printf("%s",s[a]);
	else
		printf("None");	
	
}
```

# 2024-4

## 电子汪
据说汪星人的智商能达到人类 4 岁儿童的水平，更有些聪明汪会做加法计算。比如你在地上放两堆小球，分别有 1 只球和 2 只球，聪明汪就会用“汪！汪！汪！”表示 1 加 2 的结果是 3。

本题要求你为电子宠物汪做一个模拟程序，根据电子眼识别出的两堆小球的个数，计算出和，并且用汪星人的叫声给出答案。

### 输入格式：

输入在一行中给出两个 [1, 9] 区间内的正整数 A 和 B，用空格分隔。

### 输出格式：

在一行中输出 A + B 个`Wang!`。

### 输入样例：

```in
2 1
```

### 输出样例：

```out
Wang!Wang!Wang!
```
```c
#include <stdio.h>
int main()
{
	int a,b,i;
	scanf("%d %d",&a,&b);
	for(i=0;i<a+b;i++){
		printf("Wang!");	
	}
	
}
```

## 爬动的蠕虫
一条蠕虫长1寸，在一口深为N寸的井的底部。已知蠕虫每1分钟可以向上爬U寸，但必须休息1分钟才能接着往上爬。在休息的过程中，蠕虫又下滑了D寸。就这样，上爬和下滑重复进行。请问，蠕虫需要多长时间才能爬出井？

这里要求不足1分钟按1分钟计，并且假定只要在某次上爬过程中蠕虫的头部到达了井的顶部，那么蠕虫就完成任务了。初始时，蠕虫是趴在井底的（即高度为0）。

### 输入格式：

输入在一行中顺序给出3个正整数N、U、D，其中D<U，N不超过100。

### 输出格式：

在一行中输出蠕虫爬出井的时间，以分钟为单位。

### 输入样例：

```in
12 3 1
```

### 输出样例：

```out
11
```
```c
#include <stdio.h>

int main() {
    int N, U, D;
    scanf("%d %d %d", &N, &U, &D);

    int time = 0;
    int position = 0;

    while (position < N) {
        position += U;
        time++;
        if (position >= N) {
            break;
        }
        position -= D;
        time++;
    }

    printf("%d\n", time);

    return 0;
}
```

## 约分最简分式
分数可以表示为`分子/分母`的形式。编写一个程序，要求用户输入一个分数，然后将其约分为最简分式。最简分式是指分子和分母不具有可以约分的成分了。如6/12可以被约分为1/2。当分子大于分母时，不需要表达为整数又分数的形式，即11/8还是11/8；而当分子分母相等时，仍然表达为1/1的分数形式。

### 输入格式：

输入在一行中给出一个分数，分子和分母中间以斜杠`/`分隔，如：`12/34`表示34分之12。分子和分母都是正整数（不包含0，如果不清楚正整数的定义的话）。

**提示：**

- 对于C语言，在`scanf`的格式字符串中加入`/`，让`scanf`来处理这个斜杠。
- 对于Python语言，用`a,b=map(int, input().split('/'))`这样的代码来处理这个斜杠。

### 输出格式：

在一行中输出这个分数对应的最简分式，格式与输入的相同，即采用`分子/分母`的形式表示分数。如  
`5/6`表示6分之5。

### 输入样例：

```in
66/120
```

### 输出样例：

```out
11/20
```
```c
#include <stdio.h>

int calculate(int a,int b){
    while (b!=0){
        int temp=b;
        b=a%b;
        a=temp;
    }
    return a;
}

int main() {
    int a,b;
    scanf("%d/%d", &a, &b);

    int y=calculate(a,b);

    a/=y;
    b/=y;

    printf("%d/%d\n",a,b);

    return 0;
}	
```

## 寻找250
![](https://images.ptausercontent.com/365)

对方不想和你说话，并向你扔了一串数…… 而你必须从这一串数字中找到“250”这个高大上的感人数字。

### 输入格式：

输入在一行中给出不知道多少个绝对值不超过1000的整数，其中保证至少存在一个“250”。

### 输出格式：

在一行中输出第一次出现的“250”是对方扔过来的第几个数字（计数从1开始）。题目保证输出的数字在整型范围内。

### 输入样例：

```in
888 666 123 -233 250 13 250 -222
```

### 输出样例：

```out
5
```
```c
#include <stdio.h>

int main(){
	int i,j,a[10000];
	for(i=0;;i++){
		scanf("%d",&a[i]);
	if (a[i]==250){
		printf("%d",i+1);
		break;
	}
	}
	
	
	
}
```

## 降价提醒机器人
小 T 想买一个玩具很久了，但价格有些高，他打算等便宜些再买。但天天盯着购物网站很麻烦，请你帮小 T 写一个降价提醒机器人，当玩具的当前价格比他设定的价格便宜时发出提醒。

### 输入格式：

输入第一行是两个正整数 N 和 M (1≤N≤100,0≤M≤1000)，表示有 N 条价格记录，小 T 设置的价格为 M。

接下来 N 行，每行有一个实数 Pi​（−1000.0<Pi​<1000.0），表示一条价格记录。

### 输出格式：

对每一条比设定价格 M 便宜的价格记录 `P`，在一行中输出 `On Sale! P`，其中 `P` 输出到小数点后 1 位。

### 输入样例：

```in
4 99
98.0
97.0
100.2
98.9
```

### 输出样例：

```out
On Sale! 98.0
On Sale! 97.0
On Sale! 98.9
```
```c
#include <stdio.h>
int main(){
	int n,m,i;
	double a[10000];
	scanf("%d %d",&n,&m);
	for(i=0;i<n;i++){
		scanf("%lf",&a[i]);
		
		}
	for(i=0;i<n;i++){
		if(a[i]<m){
			printf("On Sale! %.1lf\n",a[i]);	
	}
	
		
	}
}
```

## 求特殊方程的正整数解
本题要求对任意给定的正整数N，求方程X2+Y2=N的全部正整数解。

### 输入格式：

输入在一行中给出正整数N（≤10000）。

### 输出格式：

输出方程X2+Y2=N的全部正整数解，其中X≤Y。每组解占1行，两数字间以1空格分隔，按X的递增顺序输出。如果没有解，则输出`No Solution`。

### 输入样例1：

```in
884
```

### 输出样例1：

```out
10 28
20 22
```

### 输入样例2：

```
11
```

### 输出样例2：

```
No Solution
```
```c
#include <stdio.h>
#include <math.h>

int main() {
    int n;
    scanf("%d", &n);

    int flag= 0;

    for (int x=1;x<=sqrt(n);x++) {
        int y = (int)sqrt(n-x*x);
        if (x*x+y*y==n&&x<=y) {
            printf("%d %d\n",x,y);
            flag=1;
        }
    }

    if (!flag) {
        printf("No Solution\n");
    }

    return 0;
}		
```

## 计算阶乘和
对于给定的正整数N，需要你计算 S=1!+2!+3!+...+N!。

### 输入格式：

输入在一行中给出一个不超过10的正整数N。

### 输出格式：

在一行中输出S的值。

### 输入样例：

```in
3
```

### 输出样例：

```out
9
```
```c
#include <stdio.h>

int jc(int n){
int result = 1;
for (int i=1;i<=n;i++) {
	result*=i;
}
return result;

}

int main(){
int num,i,sum=0;
scanf("%d",&num);

for(i=1;i<num+1;i++){
	sum+=jc(i);
}
printf("%d",sum);
return 0;
}
```

# 2024-5

## 大笨钟的心情
![心情.jpg](https://images.ptausercontent.com/8c3b8713-1703-4e56-addb-492f738c3a7c.jpg)

有网友问：未来还会有更多大笨钟题吗？笨钟回复说：看心情……

本题就请你替大笨钟写一个程序，根据心情自动输出回答。

### 输入格式：

输入在一行中给出 24 个 [0, 100] 区间内的整数，依次代表大笨钟在一天 24 小时中，每个小时的心情指数。

随后若干行，每行给出一个 [0, 23] 之间的整数，代表网友询问笨钟这个问题的时间点。当出现非法的时间点时，表示输入结束，这个非法输入不要处理。题目保证至少有 1 次询问。

### 输出格式：

对每一次提问，如果当时笨钟的心情指数大于 50，就在一行中输出 `心情指数 Yes`，否则输出 `心情指数 No`。

### 输入样例：

```in
80 75 60 50 20 20 20 20 55 62 66 51 42 33 47 58 67 52 41 20 35 49 50 63
17
7
3
15
-1
```

### 输出样例：

```out
52 Yes
20 No
50 No
58 Yes
```
```c
#include <stdio.h>

int main() {
    int moodIndices[24];
    for (int i = 0; i < 24; i++) {
        scanf("%d", &moodIndices[i]);
    }

    int time;
    while (1) {
        scanf("%d", &time);
        if (time < 0 || time > 23) {
            break;
        }
        int moodIndex = moodIndices[time];
        if (moodIndex > 50) {
            printf("%d Yes\n", moodIndex);
        } else {
            printf("%d No\n", moodIndex);
        }
    }

    return 0;
}
```

## 求最大值及其下标
本题要求编写程序，找出给定的n个数中的最大值及其对应的最小下标（下标从0开始）。

### 输入格式:

输入在第一行中给出一个正整数n（1<n≤10）。第二行输入n个整数，用空格分开。

### 输出格式:

在一行中输出最大值及最大值的最小下标，中间用一个空格分开。

### 输入样例:

```in
6
2 8 10 1 9 10
```

### 输出样例:

```out
10 2
```
```c
#include <stdio.h>
int main(){
	int n;
	scanf("%d",&n);
	int a[n];
	for(int i=0;i<n;i++){
		scanf("%d",&a[i]);
	}
	int r=a[0],index=0;
	for(int i=0;i<n;i++){
		if(a[i]>r){
			r=a[i];
			index=i;
		}
	}
	printf("%d %d",r,index);
	
}
```

## 统计分数段人数
请对某次考试的分数，统计各分数段人数,统计原则:分别对10分以下、10-19分、20-29分、30-39分、40-49分、50-59分、60-69分、70-79,80-89分,90到99分，100分为一段,共11段 。  
注意：如果输入分数不在[0,100]之间，不参与统计。

### 输入格式:

先输入一个整数n,表示将输入n个分数。  
再输入n个分数,范围在[0~100].  
每个数用空格间隔。

### 输出格式:

每一行输出一个分数段的人数统计结果。分数段用0~10表示。

### 输入样例:

在这里给出一组输入。例如：

```in
6
50 60 98 100 0 1000
```

### 输出样例:

在这里给出相应的输出。例如：

```out
0: 1
1: 0
2: 0
3: 0
4: 0
5: 1
6: 1
7: 0
8: 0
9: 1
10: 1
```
我的版本（比较繁琐）
```c
#include <stdio.h>
int main(){
	int n;
	scanf("%d",&n);
	int a[n];
	for(int i=0;i<n;i++){
		scanf("%d",&a[i]);
	}
	int b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,b7=0,b8=0,b9=0,b10=0;
	for(int i=0;i<n;i++){
		switch ((int)(a[i]/10)){
			case 0:b0++;break;
			case 1:b1++;break;
			case 2:b2++;break;
			case 3:b3++;break;
			case 4:b4++;break;
			case 5:b5++;break;
			case 6:b6++;break;
			case 7:b7++;break;
			case 8:b8++;break;
			case 9:b9++;break;
			case 10:b10++;break;
		}
	}
	printf("0: %d\n1: %d\n2: %d\n3: %d\n4: %d\n5: %d\n6: %d\n7: %d\n8: %d\n9: %d\n10: %d",b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,b10);
}
```

## C程序设计教程与实训-数组-查找k出现次数
从键盘输入10个整数，将其存入数组中，输入一个整数k，在数组中查找k出现的次数。

### 输入格式:

在第一行输入10个整数（在int类型的范围内），在第二行输入要查找的整数k。

### 输出格式:

k出现的次数。如果未出现，输出0。

### 输入样例:

在这里给出一组输入。例如：

```in
12 13 45 13 45 34 67 12 12 78
12
```

### 输出样例:

```out
3
```
```c
#include <stdio.h>
int main(){
	int a[10];
	for(int i=0;i<10;i++){
		scanf("%d",&a[i]);
	}
	int k,count=0;
	scanf("%d",&k);
	for(int i=0;i<10;i++){
		if(a[i]==k){
			count++;
		}
			
	}
	printf("%d\n",count);	
}
```

## 求矩阵的局部极大值
给定M行N列的整数矩阵A，如果A的非边界元素A[i][j]大于相邻的上下左右4个元素，那么就称元素A[i][j]是矩阵的局部极大值。本题要求给定矩阵的全部局部极大值及其所在的位置。

### 输入格式：

输入在第一行中给出矩阵A的行数M和列数N（3≤M,N≤20）；最后M行，每行给出A在该行的N个元素的值。数字间以空格分隔。

### 输出格式：

每行按照“元素值 行号 列号”的格式输出一个局部极大值，其中行、列编号从1开始。要求按照行号递增输出；若同行有超过1个局部极大值，则该行按列号递增输出。若没有局部极大值，则输出“None 总行数 总列数”。

### 输入样例1：

```in
4 5
1 1 1 1 1
1 3 9 3 1
1 5 3 5 1
1 1 1 1 1
```

### 输出样例1：

```out
9 2 3
5 3 2
5 3 4
```

### 输入样例2：

```
3 5
1 1 1 1 1
9 3 9 9 1
1 5 3 5 1
```

### 输出样例2：

```
None 3 5
```
```c
#include <stdio.h>
int main(){
	int m=0,n=0;
	scanf("%d %d",&m,&n);
	int a[m][n];
	for(int i=0;i<m;i++){
		for(int j=0;j<n;j++){
			scanf("%d",&a[i][j]);
		}
	}
	int flag=0;
	for(int i=1;i<m-1;i++){
		for(int j=1;j<n-1;j++){
			if(a[i][j]>a[i-1][j]&&a[i][j]>a[i+1][j]&&a[i][j]>a[i][j-1]&&a[i][j]>a[i][j+1]){
				printf("%d %d %d\n", a[i][j], i + 1, j + 1);
				flag=1;
			}
		}
	}
	if(!flag){
		printf("None %d %d",m,n);
	}
		
}
```

## 打印杨辉三角

本题要求按照规定格式打印前N行杨辉三角。

### 输入格式：

输入在一行中给出N（1≤N≤10）。

### 输出格式：

以正三角形的格式输出前N行杨辉三角。每个数字占固定4位。

### 输入样例：

```in
6
```

### 输出样例：

```out
        1
       1   1
      1   2   1
     1   3   3   1
    1   4   6   4   1
   1   5  10  10   5   1
```
目前我的版本存在格式问题
```c

```
张跃哲同学的版本
```c
#include <stdio.h>  
  
int main() {  
    int N;  
    scanf("%d", &N);  
    int triangle[N][N];  
    for (int i = 0; i < N; i++) {  
        for (int j = 0; j <= i; j++) {  
            if (j == 0 || j == i) {  
                triangle[i][j] = 1;  
            } else {  
                triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];  
            }  
        }  
    }  
  
    // 打印杨辉三角  
    for (int i = 0; i < N; i++) {  
        for (int j = 0; j < (N - i - 1); j++) {  
            printf(" ");  
        }  
        // 打印每一行的数字  
        for (int j = 0; j <= i; j++) {  
            printf("%4d", triangle[i][j]); // 每个数字占4个字符宽度  
        }  
        printf("\n");  
    }  
    return 0;  
}
```

# 2024-6

## 使用函数输出一个整数的逆序数（函数题）
本题要求实现一个求整数的逆序数的简单函数。

### 函数接口定义：

```c++
int reverse( int number );
```

其中函数`reverse`须返回用户传入的整型`number`的逆序数。

### 裁判测试程序样例：

```c++
#include <stdio.h>

int reverse( int number );
    
int main()
{
    int n;

    scanf("%d", &n);
    printf("%d\n", reverse(n));

    return 0;
}

/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
-12340
```

### 输出样例：

```out
-4321
```
```c
int reverse( int num){
	int r = 0;
    while (num!= 0) {
        r=r*10+num%10;
        num/=10;
    }
    return r;
}
```

## 使用函数求最大公约数（函数题）
本题要求实现一个计算两个数的最大公约数的简单函数。

### 函数接口定义：

```c++
int gcd( int x, int y );
```

其中`x`和`y`是两个正整数，函数`gcd`应返回这两个数的最大公约数。

### 裁判测试程序样例：

```c++
#include <stdio.h>

int gcd( int x, int y );

int main()
{
    int x, y;
    
    scanf("%d %d", &x, &y);
    printf("%d\n", gcd(x, y));
    
    return 0;
}

/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
32 72
```

### 输出样例：

```out
8
```
```c
int gcd( int x, int y ){
	while (y!= 0) {
        int temp=y;
        y=x%y;
        x=temp;
    }
    return x;

}
```

## 使用函数的选择法排序（函数题）
本题要求实现一个用选择法对整数数组进行简单排序的函数。

### 函数接口定义：

```c++
void sort( int a[], int n );
```

其中`a`是待排序的数组，`n`是数组`a`中元素的个数。该函数用选择法将数组`a`中的元素按升序排列，结果仍然在数组`a`中。

### 裁判测试程序样例：

```c++
#include <stdio.h>
#define MAXN 10

void sort( int a[], int n );

int main()
{
    int i, n;
    int a[MAXN];
    
    scanf("%d", &n);
    for( i=0; i<n; i++ )
        scanf("%d", &a[i]);

    sort(a, n);

    printf("After sorted the array is:");
    for( i = 0; i < n; i++ )
        printf(" %d", a[i]);
    printf("\n");
        
    return 0;
}

/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
4
5 1 7 6
```

### 输出样例：

```out
After sorted the array is: 1 5 6 7
```
```c
void sort( int a[], int n ){
	int i, j, min_idx;

    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        for (j = i + 1; j < n; j++)
            if (a[j] < a[min_idx])
                min_idx = j;

        if (min_idx!= i) {
            int temp = a[i];
            a[i] = a[min_idx];
            a[min_idx] = temp;
        }
    }
}
```

## 求排列数（函数题）
本题要求实现一个计算阶乘的简单函数，使得可以利用该函数，根据公式Pnm​=(n−m)!n!​算出从n个不同元素中取出m个元素（0<m≤n）的排列数。

### 函数接口定义：

```c++
double fact( int n );
```

其中n是用户传入的参数，函数返回n的阶乘。

### 裁判测试程序样例：

```c++
#include <stdio.h>

double fact( int n );

int main(void)
{    
    int m, n;
    double result; 

    scanf("%d%d", &m, &n);
    if(m > 0 && n > 0 && m <= n){
        result = fact(n)/fact(n-m);
        printf("result = %.0f\n", result);    
    }

    return 0;
}

/* 请在这里填写答案 */
```

### 输入样例：

```in
2 14
```

### 输出样例：

在这里给出相应的输出。例如：

```out
result = 182
```
```c
double fact( int n ){
	
double result = 1;
for (int i=1;i<=n;i++) {
	result*=i;
}
return result;
	
}
```

# 2024-7

## 一元二次方程求根（程序填空题）
输入三个整数a，b，c（a不为0），输出一元二次方程ax^2+bx+c=0的根。
```c
#include <stdio.h>
#include <math.h>
int root(int a,int b,int c,double *p1,double *p2) {  
    int d=b*b-4*a*c;
    if(d>=0){       
        
*p1=(-b+sqrt(d))/(2*a);            
        
*p2=(-b-sqrt(d))/(2*a);
        return 1; 
    }
    return 0;                     
} 
int main() {  
    double  x1,x2; 
    int a,b,c;   
    int flag;
    scanf("%d%d%d", &a,&b,&c);
    flag=root(a,b,c,&x1,&x2);
    if (flag)
        printf("%.2f %.2f\n",x1,x2); 
    else
        printf("No\n");
    return 0;
 }
```

## 查找最高分（程序填空题）
输入10个成绩，查找最高分并输出。
```c
#include <stdio.h>
int *GetMax(int score[ ], int n);

int main(void)
{
    int i, score[10], *p;
        
    for(i = 0; i < 10; i++){
        scanf("%d", &score[i]);
    }
    p = GetMax(score, 10);
 ;
    printf("%d\n", *p);
        
    return 0;
}

int *GetMax(int score[ ], int n)
{
    int i, max, pos = 0;
        
    max = score[0] ;
    for(i = 0 ; i < 10 ; i++){
        if(score[i] > max){
            max = score[i];
            pos = i ; 
        }
    }
        
    return &score[pos];
 ;
}
```

## 求二维数组中偶数元素之和（程序填空题）
下面这段程序是计算并打印一个二维数组（数组的数组）中值为偶数的元素之和。题目保证输入的元素均为绝对值不超过10000的整数。请填写空缺的代码。
```c
#include <stdio.h>

int sumEven(int (*array)[5], int row) {
    int sum = 0;
    for (int i = 0; i < row; i++)
        for (int j = 0; j < 5; j++)
            if ((*array)[i * 5 + j] % 2 == 0) sum += (*array)[i * 5 + j];
    return sum;
}

int main() {
    int array[4][5];
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 5; j++)
            scanf("%d", &array[i][j]);
    printf("%d\n", sumEven(array, 4));
    return 0;
}
```

## 计算两数的和与差（函数题）
本题要求实现一个计算输入的两数的和与差的简单函数。

### 函数接口定义：

```c++
void sum_diff( float op1, float op2, float *psum, float *pdiff );
```

其中`op1`和`op2`是输入的两个实数，`*psum`和`*pdiff`是计算得出的和与差。

### 裁判测试程序样例：

```c++
#include <stdio.h>

void sum_diff( float op1, float op2, float *psum, float *pdiff );

int main()
{
    float a, b, sum, diff;

    scanf("%f %f", &a, &b);
    sum_diff(a, b, &sum, &diff);
    printf("The sum is %.2f\nThe diff is %.2f\n", sum, diff);
    
    return 0; 
}

/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
4 6
```

### 输出样例：

```out
The sum is 10.00
The diff is -2.00
```
```c
void sum_diff( float op1, float op2, float *psum, float *pdiff ){
	*psum=op1+op2;
	*pdiff=op1-op2;
}
```

## 拆分实数的整数与小数部分（函数题）
本题要求实现一个拆分实数的整数与小数部分的简单函数。

### 函数接口定义：

```c++
void splitfloat( float x, int *intpart, float *fracpart );
```

其中`x`是被拆分的实数（0≤`x`<10000），`*intpart`和`*fracpart`分别是将实数x拆分出来的整数部分与小数部分。

### 裁判测试程序样例：

```c++
#include <stdio.h>

void splitfloat( float x, int *intpart, float *fracpart );

int main()
{
    float x, fracpart;
    int intpart;
    
    scanf("%f", &x);
    splitfloat(x, &intpart, &fracpart);
    printf("The integer part is %d\n", intpart);
    printf("The fractional part is %g\n", fracpart);
    
    return 0;
}

/* 你的代码将被嵌在这里 */
```

### 输入样例：

```in
2.718
```

### 输出样例：

```out
The integer part is 2
The fractional part is 0.718
```
```c
void splitfloat( float x, int *intpart, float *fracpart ){
	*intpart=(int)x;
	*fracpart=x-*intpart;
}
```

## 使用函数找出数组中的最大值（函数题）
本题要求实现一个找出整型数组中最大值的函数。

### 函数接口定义：

```c++
int FindArrayMax( int a[], int n );
```

其中`a`是用户传入的数组，`n`是数组`a`中元素的个数。函数返回数组`a`中的最大值。

### 裁判测试程序样例：

```c++
#include <stdio.h>
#define MAXN 10

int FindArrayMax( int a[], int n );

int main()
{
    int i, n;
    int a[MAXN];
    
    scanf("%d", &n);
    for( i=0; i<n; i++ ){
        scanf("%d", &a[i]);
    }

    printf("%d\n", FindArrayMax(a, n));
   
    return 0;
}

/* 请在这里填写答案 */
```

### 输入样例：

```in
4
20 78 99 -14
```

### 输出样例：

```out
99
```
```c
int FindArrayMax( int a[], int n ){
	int max=a[0];
	for(int i=0;i<n;i++){
		if(a[i]>max){
			max=a[i];
		}
	}
	return max;
}
```

## 动态内存中数据排序
#### 任务描述:

读入整数N，再读入N个整数，将这N个整数从小到大排序后输出。（不能定义整型数组，用动态内存技术实现）

#### 输入样例:

```in
5
1 5 3 4 2
```

#### 输出样例:

```out
1 2 3 4 5
```
```c
#include <stdio.h>
#include <stdlib.h>

void sort(int *arr, int n) {
    int i, j, temp;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int n, i;
    scanf("%d", &n);

    int *arr = (int *)malloc(n * sizeof(int));

    for (i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    sort(arr, n);

    for (i = 0; i < n; i++) {
        if(i!=0){
        	printf(" ");
		}
		printf("%d", arr[i]);
    }
    

    free(arr);

    return 0;
}
```

##动态数组（需要多大内存申请多大内存）
#### 任务描述：

输入整数N，再输入N个整数，将这N个整数倒序输出。（不用定义数组，用动态内存实现）

#### 输入样例:

```in
10
1 2 3 4 5 6 7 8 9 10
```

#### 输出样例:

```out
10 9 8 7 6 5 4 3 2 1
```

#### 输入样例:

```in
15
708 417 427 843 610 838 932 978 189 981 208 618 178 872 576
```

#### 输出样例:

```out
576 872 178 618 208 981 189 978 932 838 610 843 427 417 708
```
```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, i, num;
    scanf("%d", &n);

    int *arr = NULL;
    arr = (int *)malloc(sizeof(int));

    for (i = 0; i < n; i++) {
        scanf("%d", &num);
        arr = (int *)realloc(arr, (i + 1) * sizeof(int));
        arr[i] = num;
    }

    for (i = n - 1; i >= 0; i--) {
    	if(i!=n-1){
        	printf(" ");
		}
        printf("%d", arr[i]);
    }
    

    free(arr);

    return 0;
}
```

# 2024-8


## 时间计算（程序填空题）
下列程序读入时间数值，将其加1秒后输出，时间格式为：hh: mm: ss，即“小时:分钟:秒”，当小时等于24小时，置为0。
```c
#include <stdio.h>

struct {
    int hour, minute, second;
} time;

int main(void)
{
    scanf("%d:%d:%d", &time.hour, &time.minute, &time.second);
    time.second++;
    if(time.second == 60){
        time.second = 0;
        time.minute++;
        if(time.minute == 60){
            time.minute = 0;
            time.hour++;
            if(time.hour == 24)
                time.hour = 0;
        }
    }
    printf("%d:%d:%d\n", time.hour, time.minute, time.second);
            
    return 0;
}
```

## 分段统计学生成绩（程序填空题）
输入n个学生的姓名和百分制成绩，分段统计学生的成绩。

### 输入格式：

输入在第一行中给出正整数N（1≤n≤100）。随后N行，每行给出一位学生的姓名和成绩，中间以空格分隔。

### 输出格式：

在一行中顺序输出成绩为80－100分、60－79分、0－59分的学生人数，中间以空格分隔。

### 输入样例：

```
5
huanglan 83
wanghai 76
shenqiang 50
zhangfeng 95
zhangmeng 60
```

### 输出样例：

```
2 2 1
```
```c
#include <stdio.h>
#define MAXN 100

struct student {
    char name[20];
    int score;
};

void cnt_score(struct student *p, int n);

int main() {
    int i, n;
    struct student stu[MAXN];

    scanf("%d", &n);
    for (i = 0; i < n; i++) {
        scanf("%s%d", stu[i].name, &stu[i].score);
    }
    cnt_score(stu, n);

    return 0;
}

void cnt_score(struct student *p, int n) {
    int cnt_a = 0, cnt_p = 0, cnt_f = 0;
    struct student *q = p + n - 1;

    while (p <= q) {
        if (p->score >= 80 && p->score <= 100) cnt_a++;
        else if (p->score >= 60 && p->score <= 79) cnt_p++;
        else cnt_f++;
        p++;
    }
    printf("%d %d %d\n", cnt_a, cnt_p, cnt_f);
}
```

## 有理数均值

### 输入格式：

输入第一行给出正整数N（≤100）；第二行中按照`a1/b1 a2/b2 …`的格式给出N个分数形式的有理数，其中分子和分母全是整形范围内的整数；如果是负数，则负号一定出现在最前面。

### 输出格式：

在一行中按照`a/b`的格式输出N个有理数的平均值。注意必须是该有理数的最简分数形式，若分母为1，则只输出分子。

### 输入样例1：

```in
4
1/2 1/6 3/6 -5/10
```

### 输出样例1：

```out
1/6
```

### 输入样例2：

```
2
4/3 2/3
```

### 输出样例2：

```
1
```
```c

```

## 找出总分最高的学生

给定N个学生的基本信息，包括学号（由5个数字组成的字符串）、姓名（长度小于10的不包含空白字符的非空字符串）和3门课程的成绩（[0,100]区间内的整数），要求输出总分最高学生的姓名、学号和总分。

### 输入格式：

输入在一行中给出正整数N（≤10）。随后N行，每行给出一位学生的信息，格式为“学号 姓名 成绩1 成绩2 成绩3”，中间以空格分隔。

### 输出格式：

在一行中输出总分最高学生的姓名、学号和总分，间隔一个空格。题目保证这样的学生是唯一的。

### 输入样例：

```in
5
00001 huanglan 78 83 75
00002 wanghai 76 80 77
00003 shenqiang 87 83 76
10001 zhangfeng 92 88 78
21987 zhangmeng 80 82 75
```

### 输出样例：

```out
zhangfeng 10001 258
```
```c
#include <stdio.h>
#include <string.h>

struct Student {
    char id[6];
    char name[11];
    int score1;
    int score2;
    int score3;
    int totalScore;
};

int main() {
    int n;
    scanf("%d", &n);
    struct Student students[n];
    for (int i = 0; i < n; i++) {
        scanf("%s %s %d %d %d", students[i].id, students[i].name, &students[i].score1, &students[i].score2, &students[i].score3);
        students[i].totalScore = students[i].score1 + students[i].score2 + students[i].score3;
    }
    int maxIndex = 0;
    for (int i = 1; i < n; i++) {
        if (students[i].totalScore > students[maxIndex].totalScore) {
            maxIndex = i;
        }
    }
    printf("%s %s %d\n", students[maxIndex].name, students[maxIndex].id, students[maxIndex].totalScore);
    return 0;
}
```

## 通讯录排序

输入n个朋友的信息，包括姓名、生日、电话号码，本题要求编写程序，按照年龄从大到小的顺序依次输出通讯录。题目保证所有人的生日均不相同。

### 输入格式:

输入第一行给出正整数n（<10）。随后n行，每行按照“姓名 生日 电话号码”的格式给出一位朋友的信息，其中“姓名”是长度不超过10的英文字母组成的字符串，“生日”是`yyyymmdd`格式的日期，“电话号码”是不超过17位的数字及`+`、`-`组成的字符串。

### 输出格式:

按照年龄从大到小输出朋友的信息，格式同输出。

### 输入样例:

```in
3
zhang 19850403 13912345678
wang 19821020 +86-0571-88018448
qian 19840619 13609876543
```

### 输出样例:

```out
wang 19821020 +86-0571-88018448
qian 19840619 13609876543
zhang 19850403 13912345678
```
```c
#include <stdio.h>
#include <string.h>

// 创建结构体
struct Friend {
    char name[11];
    int birthday;
    char phoneNumber[18];
};

// 比较函数，用于按照 yyyymmdd 格式的生日进行从大到小排序
int compare(const void* a, const void* b) {
    struct Friend* f1 = (struct Friend*)a;  // 将 void 指针转换为 Friend 结构体指针 f1
    struct Friend* f2 = (struct Friend*)b;  // 将 void 指针转换为 Friend 结构体指针 f2

    int year1 = f1->birthday / 10000;  // 提取 f1 生日中的年份
    int month1 = (f1->birthday % 10000) / 100;  // 提取 f1 生日中的月份
    int day1 = f1->birthday % 100;  // 提取 f1 生日中的日期

    int year2 = f2->birthday / 10000;  // 提取 f2 生日中的年份
    int month2 = (f2->birthday % 10000) / 100;  // 提取 f2 生日中的月份
    int day2 = f2->birthday % 100;  // 提取 f2 生日中的日期

    // 先比较年份
    if (year2 > year1) {
        return -1;
    } else if (year2 < year1) {
        return 1;
    } else {
        // 年份相同，比较月份
        if (month2 > month1) {
            return -1;
        } else if (month2 < month1) {
            return 1;
        } else {
            // 月份相同，比较日期
            if (day2 > day1) {
                return -1;
            } else if (day2 < day1) {
                return 1;
            } else {
                return 0;  // 日期也相同，返回 0
            }
        }
    }
}

int main() {
    int n;
    scanf("%d", &n);  // 输入朋友的数量

    struct Friend friends[n];  // 创建结构体数组来存储朋友的信息

    for (int i = 0; i < n; i++) {  // 循环输入每个朋友的信息
        scanf("%s %d %s", friends[i].name, &friends[i].birthday, friends[i].phoneNumber);
    }

    qsort(friends, n, sizeof(struct Friend), compare);  // 对朋友结构体数组进行排序

    for (int i = 0; i < n; i++) {  // 循环输出排序后的朋友信息
        printf("%s %d %s\n", friends[i].name, friends[i].birthday, friends[i].phoneNumber);
    }

    return 0;
}
```

## 一帮一

“一帮一学习小组”是中小学中常见的学习组织方式，老师把学习成绩靠前的学生跟学习成绩靠后的学生排在一组。本题就请你编写程序帮助老师自动完成这个分配工作，即在得到全班学生的排名后，在当前尚未分组的学生中，将名次最靠前的学生与名次最靠后的**异性**学生分为一组。

### 输入格式：

输入第一行给出正偶数`N`（≤50），即全班学生的人数。此后`N`行，按照名次从高到低的顺序给出每个学生的性别（0代表女生，1代表男生）和姓名（不超过8个英文字母的非空字符串），其间以1个空格分隔。这里保证本班男女比例是1:1，并且没有并列名次。

### 输出格式：

每行输出一组两个学生的姓名，其间以1个空格分隔。名次高的学生在前，名次低的学生在后。小组的输出顺序按照前面学生的名次从高到低排列。

### 输入样例：

```in
8
0 Amy
1 Tom
1 Bill
0 Cindy
0 Maya
1 John
1 Jack
0 Linda
```

### 输出样例：

```out
Amy Jack
Tom Linda
Bill Maya
Cindy John
```
```c

```

# 2024-9

## 删除重复字符

本题要求编写程序，将给定字符串去掉重复的字符后，按照字符ASCII码顺序从小到大排序后输出。

### 输入格式：

输入是一个以回车结束的非空字符串（少于80个字符）。

### 输出格式：

输出去重排序后的结果字符串。

### 输入样例：

```in
ad2f3adjfeainzzzv
```

### 输出样例：

```out
23adefijnvz
```
```c

```

##  输出GPLT

给定一个长度不超过10000的、仅由英文字母构成的字符串。请将字符重新调整顺序，按`GPLTGPLT....`这样的顺序输出，并忽略其它字符。当然，四种字符（不区分大小写）的个数不一定是一样多的，若某种字符已经输出完，则余下的字符仍按`GPLT`的顺序打印，直到所有字符都被输出。

### 输入格式：

输入在一行中给出一个长度不超过10000的、仅由英文字母构成的非空字符串。

### 输出格式：

在一行中按题目要求输出排序后的字符串。题目保证输出非空。

### 输入样例：

```in
pcTclnGloRgLrtLhgljkLhGFauPewSKgt
```

### 输出样例：

```out
GPLTGPLTGLTGLGLL
```
```c
#include <stdio.h>
#include <string.h>
#include <ctype.h>

int main() {
    char str[10005];
    scanf("%s", str);

    int count_g = 0, count_p = 0, count_l = 0, count_t = 0;
    for (int i = 0; i < strlen(str); i++) {
        char c = tolower(str[i]);
        if (c == 'g') count_g++;
        else if (c == 'p') count_p++;
        else if (c == 'l') count_l++;
        else if (c == 't') count_t++;
    }

    int index = 0;
    while (count_g > 0 || count_p > 0 || count_l > 0 || count_t > 0) {
        if (count_g > 0) {
            str[index++] = 'G';
            count_g--;
        }
        if (count_p > 0) {
            str[index++] = 'P';
            count_p--;
        }
        if (count_l > 0) {
            str[index++] = 'L';
            count_l--;
        }
        if (count_t > 0) {
            str[index++] = 'T';
            count_t--;
        }
    }
    str[index] = '\0';

    printf("%s\n", str);

    return 0;
}
```

## A-B

本题要求你计算A−B。不过麻烦的是，A和B都是字符串 —— 即从字符串A中把字符串B所包含的字符全删掉，剩下的字符组成的就是字符串A−B。

### 输入格式：

输入在2行中先后给出字符串A和B。两字符串的长度都不超过104，并且保证每个字符串都是由可见的ASCII码和空白字符组成，最后以换行符结束。

### 输出格式：

在一行中打印出A−B的结果字符串。

### 输入样例：

```in
I love GPLT!  It's a fun game!
aeiou
```

### 输出样例：

```out
I lv GPLT!  It's  fn gm!
```
```c
```

## 检查密码

本题要求你帮助某网站的用户注册模块写一个密码合法性检查的小功能。该网站要求用户设置的密码必须由不少于6个字符组成，并且只能有英文字母、数字和小数点 `.`，还必须既有字母也有数字。

### 输入格式：

输入第一行给出一个正整数 N（≤ 100），随后 N 行，每行给出一个用户设置的密码，为不超过 80 个字符的非空字符串，以回车结束。

**注意：** 题目保证不存在只有小数点的输入。

### 输出格式：

对每个用户的密码，在一行中输出系统反馈信息，分以下5种：

- 如果密码合法，输出`Your password is wan mei.`；
- 如果密码太短，不论合法与否，都输出`Your password is tai duan le.`；
- 如果密码长度合法，但存在不合法字符，则输出`Your password is tai luan le.`；
- 如果密码长度合法，但只有字母没有数字，则输出`Your password needs shu zi.`；
- 如果密码长度合法，但只有数字没有字母，则输出`Your password needs zi mu.`。

### 输入样例：

```in
5
123s
zheshi.wodepw
1234.5678
WanMei23333
pass*word.6
```

### 输出样例：

```out
Your password is tai duan le.
Your password needs shu zi.
Your password needs zi mu.
Your password is wan mei.
Your password is tai luan le.
```
