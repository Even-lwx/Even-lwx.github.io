---
title: Python 操作 SQLite3 核心功能
date: 2025-05-21T23:00:00
tags:
  - python
description: 以速查表形式整理 Python sqlite3 的连接建库、DDL、CRUD、事务异常处理及批量操作等常用实践。
---

 **Python 操作 SQLite3 核心功能的表格化整理**，涵盖连接、建表、CRUD 等核心操作，代码可直接复制使用：
### **Python SQLite3 操作指令速查表**

| **操作场景**        | **Python 代码示例**                                                                                                        | **说明/注意事项**                               |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| **连接数据库（文件）**   | `import sqlite3<br>conn = sqlite3.connect('mydb.db')`                                                                  | 文件不存在时自动创建<br>支持绝对路径（如 `'/data/mydb.db'`） |
| **连接内存数据库（临时）** | `conn = sqlite3.connect(':memory:')`                                                                                   | 程序关闭后数据丢失，适合临时测试场景                        |
| **创建游标**        | `cursor = conn.cursor()`                                                                                               | 所有 SQL 操作需通过游标执行                          |
| **关闭连接**        | `conn.close()`                                                      （推荐）`with sqlite3.connect('mydb.db') as conn: ...` | `with` 块自动提交事务并关闭连接，避免资源泄漏                |


### **表结构操作（DDL）**

| **操作场景**     | **Python 代码示例**                                                                                                                                                                                                                           | **说明**                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **创建表（含约束）** | with conn:)<br>    cursor.execute('''<br>        CREATE TABLE IF NOT EXISTS users (<br>            id INTEGER PRIMARY KEY AUTOINCREMENT,<br>            name TEXT NOT NULL,<br>            email TEXT UNIQUE<br>        )<br>    ''')<br> | `IF NOT EXISTS` 避免重复创建<br>`AUTOINCREMENT` 自增主键<br>`UNIQUE` 唯一约束 |
| **查询所有表名**   | cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")<br>print(cursor.fetchall())<br>                                                                                                                                       | 通过系统表 `sqlite_master` 获取元数据                                     |
| **删除表**      | with conn:)<br>    cursor.execute("DROP TABLE IF EXISTS users")<br>                                                                                                                                                                       | 谨慎操作！数据无法恢复                                                     |
| **添加列**      | with conn:)<br>    cursor.execute("ALTER TABLE users ADD COLUMN age INTEGER")<br>                                                                                                                                                         | SQLite 仅支持有限修改（如添加列），不支持删除/重命名列                                 |


### **数据操作（CRUD）**

#### **插入数据（Create）**
| **场景**   | **Python 代码示例**                                                                                                                                                                               | **安全实践**                               |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| **单条插入** | with conn:)<br>    cursor.execute('''<br>        INSERT INTO users (name, email) VALUES (?, ?)<br>    ''', ('Alice', 'a@example.com'))<br>                                                    | 用 `?` 占位符防 SQL 注入，参数以元组传递（即使单个参数也需加逗号） |
| **批量插入** | users = [('Bob', 'b@example.com'), ('Charlie', 'c@example.com')]<br>with conn:)<br>    cursor.executemany('''<br>        INSERT INTO users (name, email) VALUES (?, ?)<br>    ''', users)<br> | `executemany()` 比循环单条插入效率更高            |


#### **查询数据（Read）**
| **场景**     | **Python 代码示例**                                                                                                                            | **结果处理**                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| **查询所有记录** | cursor.execute("SELECT * FROM users")<br>rows = cursor.fetchall()<br>for row in rows: print(row)  # 元组形式：(1, 'Alice', 'a@example.com')<br> | `fetchall()` 返回元组列表，按列顺序取值        |
| **条件查询**   | cursor.execute("SELECT * FROM users WHERE age > ?", (28,))<br>results = cursor.fetchall()<br>                                              | 条件参数用元组传递，避免直接拼接字符串               |
| **查询单条记录** | cursor.execute("SELECT * FROM users WHERE id = ?", (1,))<br>user = cursor.fetchone()  # 取第一条记录<br>                                         | `fetchone()` 返回单个元组，无结果时返回 `None` |


#### **更新数据（Update）**
| **场景**    | **Python 代码示例**                                                                                                                          | **注意事项**               |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **按条件更新** | with conn:)<br>    cursor.execute('''<br>        UPDATE users SET email = ? WHERE name = ?<br>    ''', ('new@example.com', 'Alice'))<br> | 必须包含 `WHERE` 条件，避免全表更新 |


#### **删除数据（Delete）**
| **场景**    | **Python 代码示例**                                                               | **注意事项**             |
| --------- | ----------------------------------------------------------------------------- | -------------------- |
| **按条件删除** | with conn:)<br>    cursor.execute("DELETE FROM users WHERE id = ?", (1,))<br> | 无 `WHERE` 条件会删除全表数据！ |


### **事务与错误处理**
| **场景**     | **Python 代码示例**                                                                                                                                                                           | **核心逻辑**                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| **手动事务控制** | <br>try:<br>    cursor.execute("操作1")<br>    cursor.execute("操作2")<br>    conn.commit()  # 成功则提交<br>except sqlite3.Error as e:<br>    conn.rollback()  # 失败则回滚<br>    print("错误:", e)<br> | 确保一组操作要么全部成功，要么全部回滚     |
| **自动提交事务** | <br>with sqlite3.connect('mydb.db') as conn:)<br>    cursor.execute("INSERT INTO users VALUES (..., ...)")<br>    # 退出 with 块时自动提交<br>                                                    | 推荐写法！简化代码并避免忘记 `commit` |


### **高级技巧**
| **场景**        | **Python 代码示例**                                                                                                                                                       | **用途**             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **以字典形式返回结果** | <br>conn.row_factory = sqlite3.Row<br>cursor.execute("SELECT * FROM users")<br>row = cursor.fetchone()<br>print(dict(row))  # 输出: {'id': 1, 'name': 'Alice', ...}<br> | 方便通过字段名访问数据，提升可读性  |
| **使用可视化工具调试** | 安装 [DB Browser for SQLite](https://sqlitebrowser.org/)<br>直接打开 `.db` 文件执行 SQL                                                                                         | 图形化查看表结构和数据，替代代码调试 |


### **最佳实践速记(进阶)**

1. **永远用 `?` 占位符**：防止 SQL 注入，如 `cursor.execute("SELECT * FROM users WHERE name = ?", (user_name,))`。  
2. **用 `with` 管理连接**：自动处理事务提交和资源释放，避免代码遗漏。  
3. **批量操作首选 `executemany`**：比循环单条插入效率高 10 倍以上。  
4. **调试用可视化工具**：遇到数据问题时，用 DB Browser 直接查看文件内容。
