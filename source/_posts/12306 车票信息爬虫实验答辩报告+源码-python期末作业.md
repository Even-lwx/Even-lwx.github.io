---
title: 12306 车票信息爬虫实验答辩报告+源码-python期末作业
date: 2024年12月3日 18点58分
tags:
  - python
  - 爬虫
  - 学科作业
description: 完整记录基于 Python 的 12306 余票爬虫课程实验，包括方案比较、反爬处理、数据解析、Excel 导出、答辩报告与源码。
---

/*

答辩报告为一份word报告，内容包括以下几个部分：⑴实验目的；⑵实验方案分析比较；⑶实验过程（含实验方案、流程图、程序等）；⑷实验结果及结果分析；⑸实验总结；

*/

12306 车票信息爬虫实验答辩报告

# 1 实验目的

鉴于在使用 12306 网页查票时操作复杂，本实验运用爬虫技术编写一个程序来自动提取各车次剩余车票的数据，并整理为 Excel 表格。通过该实验，旨在实现以下目标：

1. 提高获取车票信息的效率，减少人工查询的繁琐操作。

2. 熟练掌握爬虫技术，包括网页数据抓取、解析和存储等环节。

3. 能够将爬取到的数据进行有效的整理和分析，为用户提供更直观的车票信息展示。

# 2 实验方案分析比较

## 2.1 方案一：传统的网页抓取工具

### 2.1.1 工具选择：

可以考虑使用一些常见的网页抓取工具，如八爪鱼采集器等。这些工具通常具有图形化界面，操作相对简单，不需要编写大量代码。

### 2.1.2 优点：

对于没有编程经验的用户较为友好，通过简单的配置即可实现网页数据的抓取。

提供了一些数据预处理功能，如数据清洗、格式转换等。

### 2.1.3 缺点：

灵活性较差，对于复杂的网页结构和特定的数据需求，可能无法满足。

可能受到工具本身的功能限制，无法进行深度定制和扩展。

## 2.2 方案二：自定义爬虫程序

### 2.1.1 技术选择：

使用 Python 等编程语言结合相关的爬虫库，如 Requests 等。

### 2.1.2 优点：

高度定制化，可以根据具体需求灵活调整爬虫的行为。

能够处理各种复杂的网页结构和动态加载的内容。

可以结合其他数据分析和处理工具，进行更深入的数据挖掘和分析。

### 2.1.3 缺点：

需要一定的编程基础和技术能力。

开发过程相对复杂，需要考虑网页反爬机制、数据存储等多个方面。

## 2.3 方案选择

经过综合考虑，本实验选择了方案二，即自定义爬虫程序。虽然需要一定的编程基础，但可以更好地满足实验的需求，实现更高效、灵活的数据抓取和处理。

# 3 实验过程

## 3.1实验方案

### 3.1.1 需求分析：

确定要爬取的 12306 网页页面，分析页面结构和数据来源。

明确需要提取的车票信息，如车次、出发地、目的地、出发时间、到达时间、剩余票数等。

### 3.1.2 技术选择：

选择 Python 作为编程语言，因其具有丰富的第三方库和强大的数据分析能力。

使用 Requests 库发送 HTTP 请求，获取网页内容。

使用 xlsxwriter 库将数据整理为 Excel 表格。

使用 pyinstaller 将程序封装为可执行文件。

### 3.1.3 反爬机制处理：

分析 12306 网页的反爬机制，如设置请求头、模拟用户行为等，避免被网站识别为爬虫而被封禁。

控制请求频率，避免对网站服务器造成过大压力。

## 3.2 流程图

## 3.3程序

### 3.3.1车票获取
```python
# 获取票信息  
ba = station_name.get(begin_addr)  
ea = station_name.get(end_addr)  
info_url =f'https://kyfw.12306.cn/otn/leftTicket/queryO?leftTicketDTO.train_date={start_time}&leftTicketDTO.from_station={ba}&leftTicketDTO.to_station={ea}&purpose_codes=ADULT'  
headers = {  
    #用户代理伪装  
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',  
    #获取cookie  
    'cookie': 'YOUR_12306_COOKIE',  # 请在本地填入有效 Cookie，不要提交真实会话信息
  
}  
resp = requests.get(info_url,headers = headers)  
resp_data = resp.json().get('data').get('result')
```
### 3.3.2城市获取
```python
# 获取城市信息  
station_url ='https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9142'  
headers ={  
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',  
}  
resp = requests.get(station_url,headers=headers)  
s_data = resp.text[resp.text.find('='):-1]  
s_data = s_data.split('|')  
num = len(s_data)//5  
station_name ={}  
station_name2 ={}  
k1 =1  
k2 =2  
for i in range(num):  
    station_name[s_data[k1]]= s_data[k2]  
    station_name2[s_data[k2]] = s_data[k1]  
    k1 += 5  
    k2 +=5
```

### 3.3.3 数据处理
```python
#数据生成EXCEL  
def xw_toExcel( fileName):  # xlsxwriter库储存数据到excel  
  
    workbook = xw.Workbook(fileName)  # 创建工作簿  
    worksheet1 = workbook.add_worksheet("sheet1")  # 创建子表  
    worksheet1.activate()  # 激活表  
  
    bold = workbook.add_format({  
        'bold': True,  # 字体加粗  
        'border': 1,  # 单元格边框宽度  
        'align': 'left',  # 水平对齐方式  
        'valign': 'vcenter',  # 垂直对齐方式  
        'fg_color': '#F4B084',  # 单元格背景颜色  
        'text_wrap': True,  # 是否自动换行  
    })  
  
    title = ['日期','车号', '出发时间', '到达时间','历时','商务特等','一等座','二等座']  # 设置表头  
    worksheet1.write_row('A1', title)  # 从A1单元格开始写入表头  
    i=2#从第2行输入数据  
    for r in resp_data:  
        data = [a for a in r.split('|')]  
        if data[1] != '列车停运':  
            row='A'+str(i)  
            i+=1  
            insertData = [data[13], data[3],data[8],data[9],data[10],data[32],data[31],data[30]]#插入数据  
            worksheet1.write_row(row, insertData, bold)  
    workbook.close()  # 关闭表  
  
  
fileName = f'{start_time}从{begin_addr}到{end_addr}.xlsx'  
xw_toExcel(fileName)
```

# 4 实验结果及结果分析

## 4.1 实验结果

成功爬取了 12306 网页上的各车次剩余车票数据，并将其整理为 Excel 表格。表格中包含了车次、出发地、目的地、出发时间、到达时间和剩余票数等信息，数据清晰、直观，便于用户查看和分析。

## 4.2 结果分析

效率提升：与传统的人工查询方式相比，爬虫程序大大提高了获取车票信息的效率。用户只需运行程序，即可快速获取大量车次的剩余票数信息，无需逐个车次进行手动查询。

# 5 实验总结

本实验通过运用爬虫技术，成功实现了自动提取 12306 网页上各车次剩余车票数据并整理为 Excel 表格的目标。在实验过程中，我深入了解了网页爬虫的原理和技术，掌握了如何使用 Python 进行网页数据抓取、解析和存储。同时，也遇到了一些问题，如网页反爬机制的处理、数据整理、可执行文件生成等，通过不断地尝试和探索，我找到了有效的解决方案。

通过本次实验，我不仅提高了编程能力和数据分析能力，还为解决实际问题提供了一种有效的方法。在未来的学习和工作中，我会继续深入研究爬虫技术，探索更多的应用场景，为提高工作效率和数据分析能力做出更大的贡献。


# 源代码

{% note warning %}
需要提前安装第三方库：requests、xlsxwriter
{% endnote %}

win+R输入cmd，在命令框输入以下命令
```
pip install requests
pip install xlsxwriter
```

若安装速度较慢，请自行上网查找换清华园的下载源

```python
import requests  
import xlsxwriter as xw  
  
#用户输入  
  
print('请输入时间：格式XXXX-XX-XX')  
start_time =input()  
  
print('请输入出发站名')  
begin_addr =input()  
  
print('请输入到达站名')  
end_addr=input()  
'''  
start_time ='2024-11-30'  
end_addr='杭州东'  
begin_addr ='温州南'  
'''  
# 获取城市信息  
station_url ='https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.9142'  
headers ={  
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36',  
}  
resp = requests.get(station_url,headers=headers)  
s_data = resp.text[resp.text.find('='):-1]  
s_data = s_data.split('|')  
num = len(s_data)//5  
station_name ={}  
station_name2 ={}  
k1 =1  
k2 =2  
for i in range(num):  
    station_name[s_data[k1]]= s_data[k2]  
    station_name2[s_data[k2]] = s_data[k1]  
    k1 += 5  
    k2 +=5  
  
# 获取票信息  
ba = station_name.get(begin_addr)  
ea = station_name.get(end_addr)  
info_url =f'https://kyfw.12306.cn/otn/leftTicket/queryO?leftTicketDTO.train_date={start_time}&leftTicketDTO.from_station={ba}&leftTicketDTO.to_station={ea}&purpose_codes=ADULT'  
headers = {  
    #用户代理伪装  
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',  
    #获取cookie  
    'cookie': 'YOUR_12306_COOKIE',  # 请在本地填入有效 Cookie，不要提交真实会话信息
  
}  
resp = requests.get(info_url,headers = headers)  
resp_data = resp.json().get('data').get('result')  
  
  
  
#数据生成EXCEL  
def xw_toExcel( fileName):  # xlsxwriter库储存数据到excel  
  
    workbook = xw.Workbook(fileName)  # 创建工作簿  
    worksheet1 = workbook.add_worksheet("sheet1")  # 创建子表  
    worksheet1.activate()  # 激活表  
  
    bold = workbook.add_format({  
        'bold': True,  # 字体加粗  
        'border': 1,  # 单元格边框宽度  
        'align': 'left',  # 水平对齐方式  
        'valign': 'vcenter',  # 垂直对齐方式  
        'fg_color': '#F4B084',  # 单元格背景颜色  
        'text_wrap': True,  # 是否自动换行  
    })  
  
    title = ['日期','车号', '出发时间', '到达时间','历时','商务特等','一等座','二等座']  # 设置表头  
    worksheet1.write_row('A1', title)  # 从A1单元格开始写入表头  
    i=2#从第2行输入数据  
    for r in resp_data:  
        data = [a for a in r.split('|')]  
        if data[1] != '列车停运':  
            row='A'+str(i)  
            i+=1  
            insertData = [data[13], data[3],data[8],data[9],data[10],data[32],data[31],data[30]]#插入数据  
            worksheet1.write_row(row, insertData, bold)  
    workbook.close()  # 关闭表  
  
  
fileName = f'{start_time}从{begin_addr}到{end_addr}.xlsx'  
xw_toExcel(fileName)
```
