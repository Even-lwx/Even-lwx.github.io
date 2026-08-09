---
title: C语言-期末复习
date: 2025-01-10T18:22:00
tags:
  - c语言
  - 期末复习
description: 面向期末查漏补缺，梳理 C 语言字符串、标准库、文件读写及常见函数，并收录典型函数题和编程题。
mathjax: false
---

# 数据基本类型和输入输出

## C语言——将数字和数字字符输入给char型变量会如何？

[C语言——将数字和数字字符输入给char型变量会如何？-CSDN博客](https://blog.csdn.net/weixin_52005740/article/details/117432826)

# 字符串

## 输入输出函数

### sscanf

1. **函数定义与功能**
    
    - **sscanf**是 C 语言中的函数，函数原型为`int sscanf(const char *str, const char *format,...)`。它的主要作用是从字符串`str`中按照`format`指定的格式读取数据，并将读取的数据存储到可变参数列表所指定的变量中。
    - 简单来说，它是`sprintf`的逆操作。`sprintf`是将数据格式化后写入字符串，而`sscanf`是从字符串中解析出数据并存储到变量中。
2. **使用示例**
    
    - **基本数据类型的读取**
        
        
        
        
        
        ```c
        #include <stdio.h>
        int main()
        {
            char str[] = "10 3.14 A";
            int num;
            float f_num;
            char ch;
            sscanf(str, "%d %f %c", &num, &f_num, &ch);
            printf("读取的整数：%d，浮点数：%f，字符：%c\n", num, f_num, ch);
            return 0;
        }
        ```
        
          
        在这个例子中，`sscanf`从字符串`str`（"10 3.14 A"）中按照`%d %f %c`的格式读取数据。它将字符串中的第一个数字`10`读取并存储到`num`变量中，第二个数字`3.14`存储到`f_num`变量中，最后一个字符`A`存储到`ch`变量中。最后输出`读取的整数：10，浮点数：3.140000，字符：A`。
    - **字符串部分读取与格式匹配**
        
        
        
        
        
        ```c
        #include <stdio.h>
        int main()
        {
            char str[] = "abcdefg";
            char part1[4];
            char part2[4];
            sscanf(str, "%3s%3s", part1, part2);
            printf("读取的第一部分：%s，第二部分：%s\n", part1, part2);
            return 0;
        }
        ```
        
          
        这里，`sscanf`按照`%3s%3s`的格式从`str`中读取数据。`%3s`表示读取最多 3 个字符作为一个字符串。所以`part1`读取了`abc`，`part2`读取了`def`，输出为`读取的第一部分：abc，第二部分：def`。
3. **注意事项**
    
    - **格式匹配与数据类型**：格式控制字符串`format`的格式必须与要读取的数据类型和格式相匹配。如果不匹配，可能会导致读取的数据错误或者程序异常。例如，如果格式控制字符串中要求读取一个整数，但字符串中对应的部分不是合法的整数格式，就会出现问题。
    - **缓冲区大小**：在读取字符串数据到字符数组变量时，要确保字符数组有足够的大小来容纳读取的数据。如果字符数组过小，可能会导致缓冲区溢出，覆盖其他内存区域的数据。
    - **可变参数列表的正确使用**：传递给`sscanf`的可变参数必须是正确的变量地址，这样才能将读取的数据正确存储。例如，对于整数变量，要传递其地址`&num`，而不是变量本身`num`。
4. **应用场景**
    
    - **数据解析与提取**：在处理用户输入、配置文件或者网络数据包等数据时，`sscanf`可以用于从字符串格式的数据中提取出需要的信息。例如，从用户输入的日期字符串（如`"2025-01-10"`）中提取出年、月、日等信息。
    - **数据转换与验证**：可以用于验证和转换数据格式。比如，检查一个字符串是否符合某种数字格式，如果符合则将其转换为相应的数字类型存储到变量中，方便后续的计算和处理。

### sprintf

1. **函数定义与功能**
    
    - **sprintf**是 C 语言中的一个函数，函数原型为`int sprintf(char *str, const char *format,...)`。它的主要功能是将格式化的数据写入到字符串`str`中。
    - 其中，`format`是格式化字符串，类似于`printf`函数中的格式控制字符串，它规定了要写入的数据的格式，包括数据类型（如整数、浮点数、字符等）、宽度、精度等信息。后面的省略号`...`表示可变参数列表，用于传递要格式化的数据。
2. **使用示例**
    
    - **基本数据类型的格式化输出**
        
        
        
        
        
        ```c
        #include <stdio.h>
        int main()
        {
            char buffer[100];
            int num = 10;
            float f_num = 3.14;
            char ch = 'A';
            sprintf(buffer, "整数：%d，浮点数：%f，字符：%c", num, f_num, ch);
            printf("%s\n", buffer);
            return 0;
        }
        ```
        
          
        在这个例子中，`sprintf`函数将整数`num`、浮点数`f_num`和字符`ch`按照指定的格式（`%d`、`%f`、`%c`）进行格式化，并写入到`buffer`字符串中。最后通过`printf`输出`buffer`的内容，结果为`整数：10，浮点数：3.140000，字符：A`。
    - **格式化字符串拼接**
        
        
        
        
        
        ```c
        #include <stdio.h>
        int main()
        {
            char buffer[100];
            char str1[] = "Hello";
            char str2[] = "World";
            sprintf(buffer, "%s %s", str1, str2);
            printf("%s\n", buffer);
            return 0;
        }
        ```
        
          
        这里，`sprintf`将`str1`和`str2`两个字符串拼接起来写入到`buffer`中，输出结果为`Hello World`。
3. **注意事项**
    
    - **缓冲区大小**：使用`sprintf`时，必须确保目标字符串`str`有足够的空间来容纳格式化后的数据。如果空间不足，会导致缓冲区溢出，可能会引起程序崩溃或产生不可预测的行为。
    - **格式化字符串的正确性**：格式控制字符串`format`的格式必须与后面传递的参数类型和数量相匹配。否则，可能会得到错误的结果或者程序出现异常。例如，如果格式控制字符串中要求一个整数参数，但实际传递的是一个字符，就会出现问题。
4. **应用场景**
    
    - **数据记录与日志记录**：在程序中记录数据或生成日志时，可以使用`sprintf`将各种数据（如时间、状态信息、数据值等）按照一定的格式组合成一个字符串，方便存储或输出。
    - **数据转换与显示**：可以将不同类型的数据（如二进制数据转换为十六进制字符串显示，整数转换为特定格式的字符串等）进行格式化，用于在用户界面或者数据传输过程中进行合适的展示。


## 字符串处理函数
### strlen 与sizeof

1. **含义**
    - **strlen**：是一个函数，用于计算字符串的长度。它从给定字符串的起始位置开始，一直计数到遇到字符串结束标志 '\0' 为止，并且不包括 '\0' 本身。这个函数定义在 <string.h> 头文件中（在 C 语言中）。
    - **sizeof**：是一个操作符，不是函数。它用于计算变量或数据类型所占用的字节数。在计算数组时，它返回整个数组所占用的字节数；在计算指针时，它返回指针本身所占用的字节数（通常在 32 位系统中是 4 字节，在 64 位系统中是 8 字节）。
2. **使用示例**
    - **strlen 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char str[] = "Hello";
            int len = strlen(str);
            printf("The length of the string is %d\n", len);
            return 0;
        }
        ```
        
          
        在这个示例中，`strlen(str)`会计算字符串`str`中字符的个数，不包括 '\0'。所以输出结果是`5`。
    - **sizeof 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        int main()
        {
            int arr[] = {1, 2, 3, 4, 5};
            int size_of_arr = sizeof(arr);
            int size_of_int = sizeof(int);
            int num_elements = sizeof(arr)/sizeof(int);
            printf("The size of the array is %d bytes\n", size_of_arr);
            printf("The size of an int is %d bytes\n", size_of_int);
            printf("The number of elements in the array is %d\n", num_elements);
            return 0;
        }
        ```
        
          
        这里，`sizeof(arr)`返回整个数组`arr`所占用的字节数。假设`int`类型占 4 字节，那么`size_of_arr`的值为`20`（因为数组中有 5 个`int`元素，每个`int`占 4 字节）。`sizeof(int)`返回`int`类型所占用的字节数，这里假设是 4。`num_elements`通过`sizeof(arr)/sizeof(int)`计算出数组中元素的个数，结果为`5`。
3. **对于不同数据类型的应用区别**
    - **对于字符数组（字符串）**
        - **strlen**：重点关注字符串内容的长度，即字符的个数。例如，对于字符数组`char str[] = "abcde"`，`strlen(str)`返回`5`。
        - **sizeof**：如果是字符数组，它返回数组占用的总字节数。对于`char str[] = "abcde"`，`sizeof(str)`返回包括 '\0' 在内的字符数组的大小，通常是 6（假设`char`占 1 字节）。
    - **对于普通变量和数据类型**
        - **strlen**：不能用于非字符数组类型来获取其长度相关信息。例如，对于`int num = 10;`，不能使用`strlen`来计算它的任何长度相关内容。
        - **sizeof**：可以用于任何变量或数据类型。对于`int num = 10;`，`sizeof(num)`返回`int`类型所占用的字节数，通常在 32 位系统中是 4 字节，在 64 位系统中也是 4 字节（`int`类型大小一般是固定的，但也有一些特殊情况）。对于自定义的结构体等复杂数据类型，`sizeof`也可以计算其占用的字节数。
4. **在指针方面的区别**
    - **strlen**：当应用于字符指针时，它会从指针所指向的字符开始，一直计数到遇到 '\0' 字符为止。例如：
        
        
        
        
        
        ```c
        char *ptr = "abcde";
        int len = strlen(ptr);
        ```
        
          
        这里`len`的值为`5`，因为`strlen`会沿着指针`ptr`所指向的字符串计算长度，直到 '\0'。
    - **sizeof**：当应用于指针时，不管指针指向什么类型的数据，它只返回指针本身所占用的字节数。例如：
        
        
        
        
        
        ```c
        char *ptr;
        int size = sizeof(ptr);
        ```
        
          
        在 32 位系统中`size`为 4 字节，在 64 位系统中`size`为 8 字节，因为它计算的是指针变量本身的大小，而不是指针所指向的数据的大小。

在使用strlen和sizeof时，有哪些需要注意的地方？

除了C语言，其他编程语言中是否有类似strlen和sizeof的函数或操作符？

在计算结构体大小时，sizeof和strlen有什么区别？

### strcpy 与strncpy

1. **含义**
    - **strcpy**：是一个 C 语言中的字符串操作函数，用于将一个字符串（包括结束符 '\0'）复制到另一个字符串中。它的函数原型是`char* strcpy(char* destination, const char* source)`。它会从`source`字符串的起始位置开始，逐个字符地将内容复制到`destination`字符串中，直到遇到`source`中的 '\0' 字符，然后也会把 '\0' 复制过去，这样`destination`就成为了`source`的一个副本。
    - **strncpy**：也是一个用于字符串复制的函数，它的函数原型是`char* strncpy(char* destination, const char* source, size_t n)`。它会从`source`字符串中复制最多`n`个字符到`destination`字符串中。如果`source`的长度小于`n`，则会在`destination`中剩余的位置填充 '\0'；如果`source`的长度大于等于`n`，则不会自动在`destination`的末尾添加 '\0'。
2. **使用示例**
    - **strcpy 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char source[] = "Hello";
            char destination[20];
            strcpy(destination, source);
            printf("Copied string: %s\n", destination);
            return 0;
        }
        ```
        
          
        在这个例子中，`strcpy`函数将`source`字符串（"Hello"）复制到`destination`字符串中。最后输出`Copied string: Hello`。
    - **strncpy 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char source[] = "Hello, world!";
            char destination1[10];
            char destination2[20];
            // 使用strncpy复制部分字符
            strncpy(destination1, source, 5);
            destination1[5]='\0';// 如果source长度大于等于n，需要手动添加'\0'
            strncpy(destination2, source, 15);
            printf("Copied string 1: %s\n", destination1);
            printf("Copied string 2: %s\n", destination2);
            return 0;
        }
        ```
        
          
        在这里，`strncpy(destination1, source, 5)`会将`source`中的前 5 个字符（"Hello"）复制到`destination1`中。由于`source`的长度大于 5，所以需要手动添加 '\0' 来正确结束字符串。而`strncpy(destination2, source, 15)`会将`source`中的前 15 个字符复制到`destination2`中，因为`source`的长度小于 15，所以`strncpy`会自动在剩余位置填充 '\0'，最后输出`Copied string 1: Hello`和`Copied string 2: Hello, world!`。
3. **安全风险和注意事项**
    - **strcpy**：存在缓冲区溢出的安全风险。如果`destination`字符串的长度小于`source`字符串的长度，就会导致缓冲区溢出，可能会覆盖其他内存区域的数据，甚至可能导致程序崩溃或产生安全漏洞。例如，如果`destination`的大小只有 6 字节，而`source`是一个长度大于 6 的字符串，如`"abcdefg"`，使用`strcpy`就会出现问题。
    - **strncpy**：虽然可以通过指定复制的字符数`n`来在一定程度上避免缓冲区溢出，但是如果使用不当，也会出现问题。如忘记在`source`长度大于等于`n`时手动添加 '\0'，会导致`destination`字符串可能没有正确结束，从而在后续使用这个字符串时产生意外的结果。
4. **适用场景**
    - **strcpy**：适用于已知`destination`足够大，能够容纳`source`字符串的情况，比如在对一些已经初始化好足够空间的字符串进行复制操作时。例如，在处理固定大小且足够大的缓冲区来接收另一个已知长度不会超过它的字符串时可以使用。
    - **strncpy**：适用于对复制字符数量有明确限制的情况，比如只需要复制字符串的前一部分，或者在处理可能会出现缓冲区大小不确定的情况，通过限制复制字符数来防止缓冲区溢出。例如，在从网络接收数据，并且只希望将接收到的前几个字节作为字符串处理时，可以使用`strncpy`。

### strcat 与strncat

1. **含义**
    - **strcat**：是 C 语言中的字符串拼接函数。它的函数原型是`char* strcat(char* destination, const char* source)`。该函数会将`source`字符串（包括结束符 '\0'）追加到`destination`字符串的末尾。它首先会找到`destination`字符串的结束符 '\0' 的位置，然后从这个位置开始，将`source`字符串的内容逐个字符地复制到`destination`中，最后在新的`destination`字符串的末尾添加 '\0'。
    - **strncat**：同样是字符串拼接函数，函数原型为`char* strncat(char* destination, const char* source, size_t n)`。这个函数会将`source`字符串中的最多`n`个字符追加到`destination`字符串的末尾。它也会先找到`destination`字符串的结束符 '\0'，然后从这个位置开始复制。如果`source`字符串的长度小于`n`，则会将整个`source`字符串复制过去，并添加 '\0'；如果`source`字符串的长度大于等于`n`，则只复制`n`个字符，然后添加 '\0'。
2. **使用示例**
    - **strcat 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char destination[30] = "Hello, ";
            char source[] = "world!";
            strcat(destination, source);
            printf("Concatenated string: %s\n", destination);
            return 0;
        }
        ```
        
          
        在这个例子中，`strcat`函数会将`source`字符串（"world!"）追加到`destination`字符串（"Hello,"）的末尾，最终输出`Concatenated string: Hello, world!`。
    - **strncat 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char destination[30] = "Hello, ";
            char source[] = "beautiful world!";
            strncat(destination, source, 7);
            printf("Concatenated string: %s\n", destination);
            return 0;
        }
        ```
        
          
        这里，`strncat`函数会将`source`字符串中的前 7 个字符（"beautiful" 中的前 7 个字符，即 "beauti"）追加到`destination`字符串（"Hello,"）的末尾，最后输出`Concatenated string: Hello, beauti`。
3. **安全风险和注意事项**
    - **strcat**：存在缓冲区溢出的风险。如果`destination`字符串没有足够的空间来容纳`source`字符串以及自身原有的内容，就会导致缓冲区溢出。例如，如果`destination`的长度为 10 字节，已经有内容占用了 6 字节，而`source`的长度为 5 字节，使用`strcat`就会超出`destination`的范围，可能会覆盖其他内存区域的数据。
    - **strncat**：相比`strcat`，在一定程度上降低了缓冲区溢出的风险。但是如果`n`的值设置不合理，仍然可能会出现问题。比如，当`n`设置得过大，使得`destination`无法容纳追加后的内容，就会出现溢出；当`n`设置得过小，可能无法完整地追加想要的内容。
4. **适用场景**
    - **strcat**：适用于能够确定`destination`字符串有足够的空间来容纳拼接后的字符串的情况。例如，在处理一些内部缓冲区大小固定且足够大，并且已经对拼接后的长度有预估的字符串拼接操作时可以使用。
    - **strncat**：更适合用于对拼接字符数量有明确限制的情况，特别是当不确定`source`字符串的长度或者担心`destination`的空间不够时。比如，在从用户输入或网络接收数据进行拼接时，为了避免缓冲区溢出，可以使用`strncat`来限制每次拼接的字符数量。


### strcmp 与strncmp

1. **含义**
    
    - **strcmp**：是 C 语言中的字符串比较函数，函数原型为`int strcmp(const char* s1, const char* s2)`。它用于比较两个字符串`s1`和`s2`的内容。比较是基于字符的 ASCII 码值进行的，从两个字符串的第一个字符开始，逐个字符比较。如果`s1`中的字符的 ASCII 码值小于`s2`中的相应字符的 ASCII 码值，那么`strcmp`返回一个负整数；如果`s1`中的字符的 ASCII 码值大于`s2`中的相应字符的 ASCII 码值，那么`strcmp`返回一个正整数；如果两个字符串完全相同（长度相等且每个对应字符都相同），则返回 0。
    - **strncmp**：也是一个字符串比较函数，函数原型是`int strncmp(const char* s1, const char* s2, size_t n)`。它用于比较两个字符串`s1`和`s2`的前`n`个字符。比较规则和`strcmp`类似，也是基于字符的 ASCII 码值进行比较。如果在比较的前`n`个字符中，`s1`中的字符的 ASCII 码值小于`s2`中的相应字符的 ASCII 码值，那么`strncmp`返回一个负整数；如果`s1`中的字符的 ASCII 码值大于`s2`中的相应字符的 ASCII 码值，那么`strncmp`返回一个正整数；如果前`n`个字符完全相同，则返回 0。
2. **使用示例**
    
    - **strcmp 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char s1[] = "apple";
            char s2[] = "banana";
            int result = strcmp(s1, s2);
            if (result < 0)
                printf("s1 is less than s2\n");
            else if (result > 0)
                printf("s1 is greater than s2\n");
            else
                printf("s1 is equal to s2\n");
            return 0;
        }
        ```
        
          
        在这个例子中，因为`apple`的第一个字符`a`的 ASCII 码值小于`banana`的第一个字符`b`的 ASCII 码值，所以`strcmp(s1, s2)`返回一个负整数，程序输出`s1 is less than s2`。
    - **strncmp 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char s1[] = "abcdef";
            char s2[] = "abcghi";
            int result = strncmp(s1, s2, 3);
            if (result < 0)
                printf("s1 is less than s2 (first 3 characters)\n");
            else if (result > 0)
                printf("s1 is greater than s2 (first 3 characters)\n");
            else
                printf("s1 is equal to s2 (first 3 characters)\n");
            return 0;
        }
        ```
        
          
        这里比较了`s1`和`s2`的前 3 个字符，因为这 3 个字符（`abc`）完全相同，所以`strncmp(s1, s2, 3)`返回 0，程序输出`s1 is equal to s2 (first 3 characters)`。
3. **区别和注意事项**
    
    - **比较范围**：
        - **strcmp**：会比较两个字符串的全部内容，直到遇到字符串结束符 '\0'。这意味着它会考虑两个字符串的完整长度来判断是否相等或大小关系。
        - **strncmp**：只比较指定的前`n`个字符，不考虑字符串后面部分的内容。这种比较方式在只需要关注字符串开头部分是否相同的情况下非常有用，例如比较文件名的前缀或者协议头的部分内容。
    - **返回值用途**：
        - **strcmp**：常用于判断两个完整的字符串是否完全相同。例如，在验证用户输入的密码和存储的密码是否一致时，可以使用`strcmp`。
        - **strncmp**：可以用于在不需要比较完整字符串的情况下，快速判断部分字符是否相同。比如，在搜索文件系统中以特定前缀开头的文件时，可以使用`strncmp`来比较文件名的前缀部分。
    - **安全性和边界情况**：
        - **strcmp**：如果两个字符串没有正确地以 '\0' 结束，可能会导致比较结果错误或者程序出现异常行为，因为它会一直比较下去，直到遇到 '\0'。
        - **strncmp**：虽然只比较前`n`个字符，但也需要注意`n`的取值。如果`n`大于字符串的长度，可能会导致访问越界的风险，因为它会尝试读取超出字符串实际长度的字符。同时，如果`n`取值过小，可能无法得到想要的比较结果。

### strchr 与 strrchr

1. **含义**
    
    - **strchr**：是 C 语言中的字符串处理函数，其函数原型为`char* strchr(const char* s, int c)`。它的主要功能是在字符串`s`中查找字符`c`第一次出现的位置。返回值是一个指向字符`c`在字符串`s`中第一次出现位置的指针，如果字符串`s`中不存在字符`c`，则返回`NULL`。这里的字符`c`可以是普通字符，也可以是字符串结束符`'\0'`。
    - **strrchr**：也是一个用于字符串查找的函数，函数原型是`char* strrchr(const char* s, int c)`。它与`strchr`不同的是，`strrchr`是在字符串`s`中查找字符`c`最后一次出现的位置。返回值同样是一个指向字符`c`在字符串`s`中最后一次出现位置的指针，若未找到则返回`NULL`。
2. **使用示例**
    
    - **strchr 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char str[] = "hello world";
            char* ptr = strchr(str, 'o');//注意有单引号
		    if (ptr!= NULL)//表示是空指针
            {
                printf("The first 'o' is at position %ld\n", ptr - str);
            }
            else
            {
                printf("Character 'o' not found.\n");
            }
            return 0;
        }
        ```
        
          
        在这个例子中，`strchr(str, 'o')`会在字符串`str`（"hello world"）中查找字符`o`第一次出现的位置。如果找到，`ptr`会指向这个位置，通过`ptr - str`可以计算出字符`o`在字符串中的位置索引（从 0 开始）。在这里，第一个`o`的位置是 4，所以会输出`The first 'o' is at position 4`。
    - **strrchr 示例（C 语言）**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char str[] = "hello world";
            char* ptr = strrchr(str, 'o');
            if (ptr!= NULL)
            {
                printf("The last 'o' is at position %ld\n", ptr - str);
            }
            else
            {
                printf("Character 'o' not found.\n");
            }
            return 0;
        }
        ```
        
          
        对于`strrchr(str, 'o')`，它会在字符串`str`中查找字符`o`最后一次出现的位置。在这个例子中，最后一个`o`的位置是 7，所以会输出`The last 'o' is at position 7`。
3. **区别与应用场景**
    
    - **查找方向**：
        - **strchr**：是从字符串的开头开始查找，一旦找到目标字符就停止查找并返回指针。这种查找方式适用于需要找到某个字符在字符串中首次出现的情况，比如在解析配置文件时，查找某个参数首次出现的位置，以获取其对应的值。
        - **strrchr**：是从字符串的末尾开始往前查找，找到目标字符最后一次出现的位置后返回指针。例如，在处理文件路径时，可能需要找到最后一个目录分隔符（如`/`或`\`）的位置，以便提取文件名部分，这时`strrchr`就非常有用。
    - **应用场景举例**：
        - **strchr**：在处理文本文件中的命令行格式内容时，如果命令格式是`command -option value`，可以使用`strchr`来查找`-`首次出现的位置，从而确定命令选项的开始位置。
        - **strrchr**：当处理 URL 时，比如`https://example.com/path/to/file.html`，可以使用`strrchr`来找到最后一个`/`的位置，进而提取出文件名`file.html`。



### strstr

1. **函数定义与功能**
    
    - **strstr**是 C 语言中的一个字符串处理函数，函数原型为`char* strstr(const char* haystack, const char* needle)`。它的主要作用是在字符串`haystack`中查找第一次出现字符串`needle`的位置。
    - 如果找到了`needle`，则返回一个指向`haystack`中`needle`首次出现位置的指针；如果`needle`为空字符串，则返回`haystack`本身；如果在`haystack`中没有找到`needle`，则返回`NULL`。
2. **使用示例**
    
    - **示例一：简单查找子串**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char haystack[] = "This is a test string";
            char needle[] = "test";
            char* result = strstr(haystack, needle);
            if (result!= NULL)
            {
                printf("Substring found at position %ld\n", result - haystack);
            }
            else
            {
                printf("Substring not found.\n");
            }
            return 0;
        }
        ```
        
          
        在这个例子中，`strstr(haystack, needle)`会在`haystack`（"This is a test string"）中查找`needle`（"test"）第一次出现的位置。如果找到，`result`会指向这个位置，通过`result - haystack`可以计算出子串在原字符串中的位置索引（从 0 开始）。在这里，子串 "test" 的位置是 10，所以会输出`Substring found at position 10`。
    - **示例二：空字符串作为查找内容**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char haystack[] = "This is a test string";
            char needle[] = "";
            char* result = strstr(haystack, needle);
            if (result!= NULL)
            {
                printf("Empty substring found, and the pointer is: %p\n", (void*)result);
            }
            else
            {
                printf("Substring not found.\n");
            }
            return 0;
        }
        ```
        
          
        当`needle`为空字符串时，按照函数定义，`strstr`会返回`haystack`本身。这里会输出`Empty substring found, and the pointer is: 0x7ffee7c0`（地址值可能因运行环境不同而不同）。
3. **应用场景**
    
    - **文本处理与搜索**：在文本编辑器或者文档处理软件中，可以使用`strstr`来实现查找功能。例如，在一个长篇文档中查找特定的单词或者短语，确定它们在文档中的位置，方便后续的编辑操作，如替换、标记等。
    - **数据解析**：在解析网络协议、配置文件等数据格式时，`strstr`可以帮助查找特定的关键字或者标签。比如，在解析 HTML 文件时，通过查找`<body>`标签来定位文档主体部分的开始位置，或者查找特定的 CSS 类名来提取对应的样式信息。
    - **代码文本分析**：在代码格式化工具或者代码审查工具中，`strstr`可以用于查找特定的代码结构或者关键字。例如，在 C/C++ 代码中查找函数定义的位置，通过查找`{`和`}`来确定函数体的范围，或者查找特定的头文件引用等。



### strtok

1. **函数定义与原理**
    - **strtok**是 C 语言中用于字符串分割的函数，函数原型为`char* strtok(char* str, const char* delimiters)`。
    - 它的工作原理是在字符串`str`中根据`delimiters`指定的分隔符来分割字符串。第一次调用`strtok`时，它会在`str`中查找第一个非分隔符字符，然后从这个字符开始，查找下一个分隔符，将分隔符替换为`'\0'`，并返回指向这个非分隔符字符的指针。后续调用`strtok`（传递`NULL`作为第一个参数）时，它会从上次结束的位置继续，在剩余的字符串中继续按照相同的规则进行分割。
2. **使用示例**
    - **简单的字符串分割示例**
        
        
        
        
        
        ```c
        #include <stdio.h>
        #include <string.h>
        int main()
        {
            char str[] = "apple,banana;cherry";
            char* token = strtok(str, ",;");
            while (token!= NULL)
            {
                printf("%s\n", token);
                token = strtok(NULL, ",;");//从上次结束的位置开始
            }
            return 0;
        }
        ```
        
          
        在这个例子中，首先定义了一个包含多种分隔符（`,;`）的字符串`str`。第一次调用`strtok(str, ",;")`时，它会在`str`中找到第一个非分隔符字符（`a`），然后找到第一个分隔符（`,`），将其替换为`'\0'`，并返回指向`apple`的指针。在`while`循环中，每次输出当前的`token`（即分割后的子字符串），然后再次调用`strtok(NULL, ",;")`，它会从上次结束的位置（在第一次循环后，是`banana;cherry`）继续进行分割，直到返回`NULL`，表示已经分割完所有的子字符串。这个程序会输出：
        
        收起
        
        
        
        ```plaintext
        apple
        banana
        cherry
        ```
        
          
        
3. **注意事项**
    - **修改原字符串**：`strtok`会修改原始字符串，将分隔符替换为`'\0'`，这在某些情况下可能会影响原始数据的完整性。如果不希望修改原始字符串，可以先复制一份再进行分割操作。
    - **多线程环境**：`strtok`不是线程安全的。在多线程环境下，如果多个线程同时调用`strtok`，可能会导致不可预测的结果。如果需要在多线程环境下进行字符串分割，可以考虑使用可重入的替代函数，如`strtok_r`（在一些系统中提供）。
    - **分隔符字符串的处理**：分隔符字符串中的每个字符都被视为独立的分隔符。例如，在上面的示例中，`,;`表示字符串可以被逗号或者分号分割。
4. **应用场景**
    - **命令行参数解析**：在处理命令行输入的程序中，`strtok`可以用于将命令行字符串分割成各个参数。例如，对于命令`cp file1.txt file2.txt`，可以使用`strtok`将其分割为`cp`、`file1.txt`和`file2.txt`，以便进一步处理每个参数。
    - **文本数据提取**：在处理文本文件，如 CSV（逗号分隔值）文件时，`strtok`可以用于提取每一列的数据。例如，对于一行 CSV 数据`"John,Doe,30"`，可以使用`strtok`将其分割为`John`、`Doe`和`30`，方便后续的数据存储和处理。

## 函数所在标准库（必看）

1. **`<string.h>`库**
    - **strlen**、**strcpy**、**strncpy**、**strcat**、**strncat**、**strcmp**、**strncmp**、**strchr**、**strrchr**、**strstr**、**strtok**这些函数都在 C 语言的`<string.h>`标准库中。这个库提供了一系列用于处理 C 风格字符串（以`'\0'`结尾的字符数组）的函数。
    - 例如，在 C 程序中，如果要使用`strcpy`函数来复制字符串，需要在代码开头包含`#include <string.h>`头文件，这样编译器才能找到`strcpy`函数的定义并正确地编译程序。
2. **`<stdio.h>`库**
    - **sprintf**和**sscanf**函数在 C 语言的`<stdio.h>`标准库中。这个库主要用于输入 / 输出操作，`sprintf`和`sscanf`函数在一定程度上与格式化的输入输出有关。`sprintf`用于将格式化的数据写入字符串，`sscanf`用于从字符串中读取并解析格式化的数据，它们的功能和`printf`、`scanf`类似，只是操作对象是字符串而不是标准输入输出设备。
    - 同样，在使用`sprintf`或`sscanf`函数时，需要在程序开头包含`#include <stdio.h>`头文件，以确保程序能够正确调用这些函数。


# 文件

## 读写函数

### fputc fgetc

1. **`fputc`函数**
    - **函数原型**：`int fputc(int c, FILE *stream);`
    - **功能描述**：
        - 将字符`c`写入到指定的文件流`stream`中。其中`c`是要写入的字符（可以是一个字符常量或字符变量），`stream`是指向`FILE`类型的指针，它表示一个文件流，通常是通过`fopen`函数打开文件后返回的文件指针。
    - **返回值**：
        - 如果写入成功，返回写入的字符（即参数`c`的值）。
        - 如果发生错误，返回`EOF`（`EOF`是在`<stdio.h>`头文件中定义的一个常量，通常值为 - 1）。
    - **示例**：

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    char ch = 'A';
    fp = fopen("test.txt", "w");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    int result = fputc(ch, fp);
    if (result == EOF)
    {
       perror("Error writing to file");
    }
    eclse
    {
       printf("Character '%c' written successfully.\n", ch);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，首先打开一个名为`test.txt`的文件（如果文件不存在则创建，如果存在则截断内容），然后使用`fputc`函数将字符`'A'`写入文件。最后关闭文件。如果写入过程中出现错误，`fputc`会返回`EOF`，程序会输出错误信息；如果写入成功，会输出成功信息。

  

2. **`fgetc`函数**
    - **函数原型**：`int fgetc(FILE *stream);`
    - **功能描述**：
        - 从指定的文件流`stream`中读取一个字符。它会返回读取到的字符（以`int`类型返回，因为`EOF`也是一个特殊的返回值，`EOF`的值不能和任何有效的字符值混淆，所以使用`int`类型来接收返回值）。
    - **返回值**：
        - 如果读取成功，返回读取到的字符（其值范围是 0 - 255，表示 ASCII 码值）。
        - 如果到达文件末尾或者发生错误，返回`EOF`。
    - **示例**：

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    int ch;
    fp = fopen("test.txt", "r");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    ch = fgetc(fp);
    if (ch == EOF)
    {
       if (feof(fp))
       {
          printf("End of file reached.\n");
       }
       else
       {
          perror("cError reading file");
       }
    }
    else
    {
       printf("Character read: %c\n", (char)ch);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，首先尝试打开一个名为`test.txt`的文件用于读取。然后使用`fgetc`函数从文件中读取一个字符。如果读取到的是`EOF`，会进一步判断是因为到达文件末尾（使用`feof`函数判断）还是发生错误。如果读取成功，则输出读取到的字符。最后关闭文件。
- 
### fputs fgets

1. **`fputs`函数**
    - **函数原型**：`int fputs(const char *str, FILE *stream);`
    - **功能描述**：
        - 用于将一个字符串`str`写入到指定的文件流`stream`中。这里的字符串`str`以空字符`'\0'`作为结束标志，但`fputs`函数不会将空字符写入文件。它是顺序写入，从字符串的第一个字符开始，直到遇到`'\0'`结束。
    - **返回值**：
        - 如果写入成功，返回一个非负整数。
        - 如果发生错误，返回`EOF`。
    - **示例**：

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    char str[] = "Hello, World!";
    fp = fopen("test.txt", "w");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    int result = fputs(str, fp);
    if (result == EOF)
    {
       perror("Error writing to file");
    }
    elsec
    {
       printf("String written successfully.\n");
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个例子中，首先打开一个文件`test.txt`用于写入。然后使用`fputs`函数将字符串`"Hello, World!"`写入文件。如果写入过程没有错误，会输出成功信息；如果出现错误，则会输出错误信息。最后关闭文件。

  

2. **`fgets`函数**
    - **函数原型**：`char *fgets(char *str, int n, FILE *stream);`
    - **功能描述**：
        - 从指定的文件流`stream`中读取最多`n - 1`个字符，并将它们存储到字符数组`str`中。读取过程会在遇到换行符`'\n'`、文件末尾或者已经读取了`n - 1`个字符时停止。最后会在读取的字符数组末尾添加一个空字符`'\0'`，以形成一个有效的 C 字符串。
    - **返回值**：
        - 如果读取成功，返回指向字符数组`str`的指针。
        - 如果遇到文件末尾且没有读取到任何字符，返回`NULL`。
        - 如果发生错误，返回`NULL`。
    - **示例**：

  
c




```c
#include <stdio.h>
int main()
{
    FILE *fp;
    char str[100];
    fp = fopen("test.txt", "r");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    char *result = fgets(str, 100, fp);
    if (result == NULL)
    {
       if (feof(fp))
       {
          printf("End of file reached.\n");
       }
       else
       {
          perror("Error reading file");
       }
    }
    else
    {
       printf("String read: %s", str);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，首先打开一个文件`test.txt`用于读取。然后使用`fgets`函数从文件中读取最多 99 个字符（因为要预留一个位置给空字符`'\0'`）到字符数组`str`中。如果读取成功，会输出读取到的字符串；如果遇到文件末尾或者发生错误，会根据具体情况输出相应的信息。最后关闭文件。

### fprintf fscanf 

1. . **`fprintf`函数**
    - **函数原型**：`int fprintf(FILE *stream, const char *format,...);`
    - **功能描述**
        - 将格式化的数据输出到指定的文件流`stream`中。`format`参数是格式化字符串，与`printf`函数的格式化字符串类似，用于指定输出数据的格式。`...`表示可变参数列表，包含要输出的数据。例如，可以使用`%d`输出整数，`%f`输出浮点数，`%s`输出字符串等格式。
    - **返回值**
        - 成功写入的字符数（不包括结束符`'\0'`）。如果出现错误，返回一个负数。
    - **示例**

  

c



```c
#include <stdio.h>
int main()
{
    FILE *fp;
    int num = 10;
    float fnum = 3.14;
    char str[] = "Hello";
    fp = fopen("output.txt", "w");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    int result = fprintf(fp, "Number: %d, Float number: %.2f, String: %s\n", num, fnum, str);
    if (result < 0) {
        perror("Error writing to file");
    } else {
        printf("Data written successfully. %d characters written.\n", result);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，打开一个名为`output.txt`的文件用于写入。然后使用`fprintf`函数将变量`num`（整数）、`fnum`（浮点数）和`str`（字符串）按照指定的格式输出到文件中。根据`fprintf`的返回值判断写入是否成功。最后关闭文件。
2. **`fscanf`函数**
    - **函数原型**：`int fscanf(FILE *stream, const char *format,...);`
    - **功能描述**
        - 从指定的文件流`stream`中按照`format`指定的格式读取数据。`format`参数是一个格式化字符串，与`scanf`函数的格式化字符串类似，用于指定读取数据的类型和格式。例如，`%d`用于读取整数，`%f`用于读取浮点数，`%s`用于读取字符串等。`...`表示可变参数列表，用于接收从文件中读取的数据并存储到相应的变量中。
    - **返回值**
        - 成功读取的输入项的数目。如果在读取任何数据之前到达文件末尾，则返回`EOF`。如果读取过程中出现错误，返回值是不确定的，可能小于预期读取的项数。
    - **示例**

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    int num;
    float fnum;
    char str[20];
    fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    int result = fscanf(fp, "%d %f %s", &num, &fnum, str);
    if (result == EOF) {
        if (feof(fp)) {
            printf("End of file reached before any data was read.\n");
        } else {
            perror("Error reading file");
        }
    } else if (result == 3) {
        printf("Data read successfully: num = %d, fnum = %.2f, str = %s\n", num, fnum, str);
    } else {
        printf("Partial data read. Expected 3 items, but read %d.\n", result);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，假设`data.txt`文件中包含一行数据，格式为 “整数 浮点数 字符串”。通过`fscanf`函数从文件中读取数据到变量`num`（整数）、`fnum`（浮点数）和`str`（字符串）中。根据`fscanf`的返回值来判断读取是否成功以及读取的完整程度。最后关闭文件。

## 文件定位

### feof

1. **函数原型**
    - `int feof(FILE *stream);`
2. **功能描述**
    - `feof`函数用于检测文件流`stream`是否到达了文件末尾。它通过检查文件结束标志来判断。当文件读取操作已经尝试读取超过文件的最后一个字节时，文件结束标志会被设置，此时`feof`函数会返回一个非零值（通常为 1），表示已经到达文件末尾。
        
    - 例如，在循环读取文件内容时，当`fgetc`或者`fgets`等读取函数返回`EOF`（文件结束符，在`<stdio.h>`中定义，通常值为 - 1）时，不能简单地认为就是到达了文件末尾。因为`EOF`也可能是由于读取错误而返回的。这时就需要使用`feof`函数来进一步确认是否真的是到达了文件末尾。如果`feof`返回非零值，那就是到达文件末尾；如果`feof`返回 0，那可能是读取过程中出现了错误。
        
3. **示例**
    - 以下是一个简单的示例，用于读取一个文本文件的内容，直到到达文件末尾。

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    int ch;
    fp = fopen("test.txt", "r");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    // 循环读取文件内容
    while ((ch = fgetc(fp))!= EOF)
    {
       putchar(ch);
    }
    // 检查是否是因为到达文件末尾而结束读取
    if (feof(fp))
    {
       printf("\nEnd of file reached.\n");
    }
    else
    {
       perror("Error reading file");
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，首先打开文件`test.txt`用于读取。然后通过一个`while`循环使用`fgetc`函数逐个字符地读取文件内容，并将读取到的字符输出到控制台。当`fgetc`返回`EOF`时，循环结束。接着使用`feof`函数来检查是否是因为到达文件末尾而结束读取。如果是，就输出相应的提示信息；如果不是，就输出读取错误的提示信息。最后关闭文件。

  

4. **需要注意的地方**
    - 只有在尝试读取文件结束后的位置时，`feof`函数才会返回非零值。也就是说，在最后一次成功读取之后，文件结束标志还没有被设置。当读取函数返回`EOF`后，再调用`feof`函数才能正确判断是否到达文件末尾。
    - 不能仅仅依靠`feof`来控制文件读取的循环，因为如果文件一开始就是空文件，`feof`函数在还没有进行任何读取操作时是不会返回非零值的。所以通常是结合读取函数（如`fgetc`或`fgets`）的返回值和`feof`函数来准确地判断文件读取的状态。

### fseek

1. **函数原型**
    - `int fseek(FILE *stream, long int offset, int whence);`
2. **参数含义**
    - **`stream`**：这是一个指向`FILE`类型的指针，表示已经打开的文件流。例如，通过`fopen`函数打开文件后得到的文件指针。
    - **`offset`**：这是一个长整型的值，表示相对于`whence`位置的偏移量。它可以是正数、负数或者零。如果是正数，表示向文件末尾方向移动；如果是负数，表示向文件开头方向移动。
    - **`whence`**：这是一个整型常量，用于指定偏移量`offset`的起始位置。它有以下三个可能的值：
        - **`SEEK_SET`（0）**：文件开头。此时`offset`是从文件开头开始计算的字节数。例如，如果`offset`为 0，那么文件指针将定位到文件的第一个字节；如果`offset`为 5，文件指针将定位到文件的第 6 个字节（因为字节索引从 0 开始）。
        - **`SEEK_CUR`（1）**：文件当前位置。`offset`是相对于当前文件指针位置的字节数。例如，如果当前文件指针在第 10 个字节处，`offset`为 3，那么文件指针将移动到第 13 个字节处。
        - **`SEEK_END`（2）**：文件末尾。`offset`是相对于文件末尾的字节数。需要注意的是，当`offset`为 0 时，文件指针将定位到文件的最后一个字节；如果`offset`为 - 5，文件指针将定位到倒数第 5 个字节。
3. **功能描述**
    - `fseek`函数主要用于移动文件内部的读写指针。通过调整指针的位置，可以实现对文件中任意位置的数据进行读写操作。例如，在处理大型文件时，可能需要跳转到文件中间的某个位置读取特定的数据块，或者在文件末尾添加新的数据之前先将指针移动到文件末尾。
4. **返回值**
    - 如果成功移动文件指针，`fseek`函数返回 0。
    - 如果发生错误，例如试图移动到文件范围之外的位置或者文件不支持定位操作（如某些特殊的管道文件或设备文件），则返回非零值。
5. **示例**
    - 以下示例展示了如何使用`fseek`函数。假设存在一个文本文件`test.txt`，文件内容为 “Hello World”。

  





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    char ch;
    fp = fopen("test.txt", "r");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    // 将文件指针移动到文件的第6个字节（索引为5）
    int result = fseek(fp, 5, SEEK_SET);
    if (result!= 0)
    {
       perror("Error seeking in file");
       fclose(fp);
       return 1;
    }
    ch = fgetc(fp);
    if (ch == EOF)
    {
       if (feof(fp))
       {
          printf("End of file reached.\n");
       }
       else
       {
          perror("Error reading file");
       }
    }
    else
    {
       printf("Character read after seeking: %c\n", ch);
    }
    fclose(fp);
    return 0;
}
```

  

- 在这个示例中，首先打开文件`test.txt`用于读取。然后使用`fseek`函数将文件指针从文件开头（`SEEK_SET`）移动到第 6 个字节（偏移量为 5）。如果`fseek`操作成功，接着使用`fgetc`函数读取文件指针当前位置的字符，并输出该字符。最后关闭文件。

### rewind

1. **函数原型**
    - `void rewind(FILE *stream);`
2. **功能描述**
    - `rewind`函数用于将文件指针重新定位到文件的开头。当对一个文件进行了多次读写操作，且读写指针已经移动到文件中的其他位置后，使用`rewind`函数可以快速地将指针重置，以便重新从文件的开头进行读取或写入操作。
    - 这个函数实际上等价于`fseek(stream, 0L, SEEK_SET)`，也就是将文件指针相对于文件开头（`SEEK_SET`）移动 0 个字节，从而达到将文件指针定位到文件起始位置的目的。
3. **示例**
    - 假设我们有一个文件`data.txt`，里面包含一些文本内容。以下示例展示了如何先读取一部分内容，然后使用`rewind`函数重新回到文件开头再次读取。

  c





```c
#include <stdio.h>
int main()
{
    FILE *fp;
    char buffer[100];
    fp = fopen("data.txt", "r");
    if (fp == NULL)
    {
       perror("Error opening file");
       return 1;
    }
    // 第一次读取部分内容
    fgets(buffer, 100, fp);
    printf("First read: %s", buffer);
    // 将文件指针重置到文件开头
    rewind(fp);
    // 第二次读取部分内容
    fgets(buffer, 100, fp);
    printf("Second read after rewind: %s", buffer);
    fclose(fp);
    return 0;
}
```

  

- 在这个例子中，首先打开文件`data.txt`用于读取。通过`fgets`函数第一次读取文件中的一部分内容并打印出来。然后使用`rewind`函数将文件指针重新定位到文件开头。接着再次使用`fgets`函数读取文件内容并打印，此时读取的内容和第一次开始读取的内容是相同的（如果文件内容没有被修改），这展示了`rewind`函数将文件指针复位的功能。

  

# stdlib库中常见函数

 1. **内存分配与释放相关函数**
    - **malloc**：
        - 功能：用于动态分配指定字节数的内存空间。函数原型为`void* malloc(size_t size)`，它返回一个指向所分配内存空间起始地址的指针。例如，`int* ptr = (int*)malloc(10 * sizeof(int));`会分配可以存储 10 个`int`类型数据的内存空间，返回的指针需要进行类型转换后存储在`ptr`中。
        - 应用场景：当程序运行时不确定需要多少内存来存储数据，比如读取一个文件，文件大小事先未知，就可以使用`malloc`来动态分配足够的内存空间来存储文件内容。
    - **calloc**：
        - 功能：用于动态分配内存空间并将其初始化为 0。函数原型是`void* calloc(size_t num, size_t size)`，它会分配`num`个大小为`size`字节的内存块，并将这些内存块的内容初始化为 0。例如，`float* arr = (float*)calloc(5, sizeof(float));`会分配可以存储 5 个`float`类型数据的内存空间，并且这些空间初始化为 0。
        - 应用场景：在创建数组时，如果希望数组元素初始值为 0，使用`calloc`会很方便。比如在统计数据的程序中，初始化一个计数器数组。
    - **realloc**：
        - 功能：用于重新分配已经通过`malloc`或`calloc`等函数分配的内存空间的大小。函数原型为`void* realloc(void* ptr, size_t size)`，它会尝试调整`ptr`所指向的内存块的大小为`size`字节。如果调整成功，返回一个指向重新分配后的内存块起始地址的指针；如果无法调整（比如没有足够的连续内存），返回`NULL`，并且原来的内存块不会被释放。例如，`int* new_ptr = (int*)realloc(ptr, 20 * sizeof(int));`尝试将`ptr`指向的内存空间大小调整为可以存储 20 个`int`类型数据的空间。
        - 应用场景：当程序对数据的需求发生变化，比如需要存储更多的数据时，可以使用`realloc`来扩展已经分配的内存空间，而不是重新分配一块全新的内存，这样可以避免浪费之前已经存储的数据。
    - **free**：
        - 功能：用于释放通过`malloc`、`calloc`或`realloc`等函数分配的内存空间。函数原型为`void free(void* ptr)`。例如，`free(ptr);`会释放`ptr`所指向的内存空间，之后这块内存可以被操作系统重新分配给其他程序或进程使用。
        - 应用场景：在动态分配的内存不再需要时，必须使用`free`释放，以避免内存泄漏。比如一个函数中动态分配了内存来存储临时数据，当函数执行完毕，这些内存应该被释放。
2. **数值转换函数**
    - **atoi**：
        - 功能：将字符串转换为整数。函数原型为`int atoi(const char* str)`，它会扫描字符串`str`，跳过前面的空白字符（空格、制表符、换行符等），然后从第一个非空白字符开始解析整数。如果字符串无法正确解析为整数，返回 0。例如，`int num = atoi("123");`会将字符串`"123"`转换为整数 123。
        - 应用场景：在处理用户输入或读取配置文件中的数字字符串时很有用。比如用户在命令行输入一个数字作为参数，程序可以使用`atoi`将这个字符串参数转换为整数进行后续计算。
    - **atol**：
        - 功能：将字符串转换为长整数。函数原型为`long atol(const char* str)`，其工作原理和`atoi`类似，只是转换的结果是长整数类型。例如，`long num = atol("1234567890");`会将字符串`"1234567890"`转换为长整数 1234567890。
        - 应用场景：当需要处理可能超出`int`范围的整数字符串时可以使用`atol`，比如处理文件大小等可能是较大整数的情况。
    - **atof**：
        - 功能：将字符串转换为浮点数。函数原型为`float atof(const char* str)`，它会扫描字符串`str`，跳过空白字符，然后从第一个非空白字符开始解析浮点数。例如，`float num = atof("3.14");`会将字符串`"3.14"`转换为浮点数 3.14。
        - 应用场景：在读取包含浮点数信息的文本文件或者用户输入的浮点数字符串时，用于将字符串转换为浮点数进行数学运算。
3. **随机数生成相关函数（以 srand 和 rand 为例）**
    - **srand**：
        - 功能：用于初始化随机数生成器。函数原型为`void srand(unsigned int seed)`，它接受一个无符号整数`seed`作为种子，不同的种子会导致`rand`函数（下面介绍）生成不同序列的随机数。例如，`srand((unsigned int)time(NULL));`使用当前时间作为种子来初始化随机数生成器，这样每次程序运行时由于时间不同，生成的随机数序列也会不同。
        - 应用场景：在需要生成伪随机数的程序中，如游戏中的随机事件（怪物掉落物品的概率、随机地图生成等）、模拟实验中的随机样本等场景下，需要先使用`srand`初始化随机数生成器。
    - **rand**：
        - 功能：用于生成伪随机数。函数原型为`int rand(void)`，它会返回一个介于 0 和`RAND_MAX`（一个在`<stdlib.h>`中定义的常量，通常是一个较大的整数）之间的整数。例如，`int random_num = rand();`会生成一个随机整数。
        - 应用场景：结合`srand`使用，可以在很多需要随机元素的程序中生成随机数。比如在抽奖程序中，使用`rand`来确定中奖号码；在生成随机测试数据时，使用`rand`来生成各种数值。
4. **程序终止相关函数（以 exit 为例）**
    - **exit**：
        - 功能：用于立即终止程序的执行。函数原型为`void exit(int status)`，其中`status`是程序的退出状态码，0 表示正常退出，非 0 值表示异常退出。例如，`exit(0);`会正常结束程序，而`exit(1);`会以错误状态结束程序。
        - 应用场景：当程序遇到无法恢复的错误，如无法打开关键的配置文件、内存分配失败等情况时，可以使用`exit`来终止程序，以避免程序继续执行产生不可预测的结果。同时，在一些脚本或简单的命令行工具中，完成任务后可以使用`exit`正常退出。


# math库中常见函数

## **三角函数相关函数**

1.    - **`sin`函数**
        - **函数原型**：`double sin(double x);`
        - **功能描述**：计算弧度为`x`的正弦值。返回值的范围是`[-1,1]`。例如，`sin(0)`返回`0`，`sin(M_PI/2)`（假设已经定义了`M_PI`为圆周率`π`的值）返回`1`。
2.    - **`cos`函数**
        - **函数原型**：`double cos(double x);`
        - **功能描述**：计算弧度为`x`的余弦值。返回值范围也是`[-1,1]`。例如，`cos(0)`返回`1`，`cos(M_PI)`返回 `- 1`。
3.    - **`tan`函数**
        - **函数原型**：`double tan(double x);`
        - **功能描述**：计算弧度为`x`的正切值。当`x`是`π/2 + kπ`（`k`为整数）时，函数值趋近于无穷大，此时可能会产生溢出等错误。例如，`tan(M_PI/4)`返回`1`。
        - 
## **反三角函数相关函数**

 1.   - **`asin`函数**
        - **函数原型**：`double asin(double x);`
        - **功能描述**：计算`x`的反正弦值，返回值的范围是`[-π/2,π/2]`。`x`的取值范围是`[-1,1]`，如果`x`不在这个范围内，函数会产生定义域错误。例如，`asin(0.5)`返回约`0.5236`（弧度，即`π/6`）。
2.    - **`acos`函数**
        - **函数原型**：`double acos(double x);`
        - **功能描述**：计算`x`的反余弦值，返回值范围是`[0,π]`。`x`的取值范围是`[-1,1]`。例如，`acos(0.5)`返回约`1.0472`（弧度，即`π/3`）。
3.    - **`atan`函数**
        - **函数原型**：`double atan(double x);`
        - **功能描述**：计算`x`的反正切值，返回值范围是`(-π/2,π/2)`。例如，`atan(1)`返回约`0.7854`（弧度，即`π/4`）。
4.   - **`atan2`函数**
        - **函数原型**：`double atan2(double y, double x);`
        - **功能描述**：计算`y/x`的反正切值，但它会考虑`x`和`y`的符号来确定正确的象限。返回值范围是`(-π,π]`。这个函数在计算向量的角度等场景中非常有用，例如，`atan2(1,1)`返回约`0.7854`（弧度，即`π/4`）。
        - 
##  **指数和对数函数**

1.    - **`exp`函数**
        - **函数原型**：`double exp(double x);`
        - **功能描述**：计算自然常数`e`（约为`2.71828`）的`x`次幂。例如，`exp(1)`返回`e`的值，`exp(0)`返回`1`。
2.    - **`log`函数**
        - **函数原型**：`double log(double x);`
        - **功能描述**：计算以自然常数`e`为底`x`的对数。`x`必须大于`0`，否则会产生定义域错误。例如，`log(exp(1))`返回`1`。
3.    - **`log10`函数**
        - **函数原型**：`double log10(double x);`
        - **功能描述**：计算以`10`为底`x`的对数。`x`同样必须大于`0`。例如，`log10(100)`返回`2`。
## **幂函数和开方函数**
1.    - **`pow`函数**
        - **函数原型**：`double pow(double x, double y);`
        - **功能描述**：计算`x`的`y`次幂。例如，`pow(2,3)`计算`2`的`3`次方，返回`8`。需要注意的是，当`x`为负数且`y`不是整数时，结果可能是复数，在这种情况下可能会产生错误或者不符合预期的结果。
2.    - **`sqrt`函数**
        - **函数原型**：`double sqrt(double x);`
        - **功能描述**：计算`x`的平方根。`x`必须大于等于`0`，否则会产生定义域错误。例如，`sqrt(4)`返回`2`。
        - 
## **绝对值和取整函数等辅助函数**

1.    - **`fabs`函数**
        - **函数原型**：`double fabs(double x);`
        - **功能描述**：计算实数`x`的绝对值。例如，`fabs(-3.14)`返回`3.14`。
2.  - **`ceil`函数**
        - **函数原型**：`double ceil(double x);`
        - **功能描述**：向上取整函数，返回不小于`x`的最小整数。例如，`ceil(3.14)`返回`4`，`ceil(-3.14)`返回 `- 3`。
  3.  - **`floor`函数**
        - **函数原型**：`double floor(double x);`
        - **功能描述**：向下取整函数，返回不大于`x`的最大整数。例如，`floor(3.14)`返回`3`，`floor(-3.14)`返回 `- 4`。
4.    - **`round`函数**
        - **函数原型**：`double round(double x);`
        - **功能描述**：将`x`四舍五入到最接近的整数。例如，`round(3.4)`返回`3`，`round(3.6)`返回`4`。
5. **`fmod`函数**
    - **函数原型**：`double fmod(double x, double y);`
    - **功能描述**：
        - 该函数用于计算`x`除以`y`的浮点数余数。它与整数取余运算`%`在浮点数环境下的功能类似，但`%`通常用于整数运算，而`fmod`用于双精度浮点数运算。
        - 计算结果的符号与`x`的符号相同。例如，`fmod(7.5, 2.0)`的结果是`1.5`，因为`7.5`除以`2.0`商为`3`，余数为`1.5`；`fmod(-7.5, 2.0)`的结果是`-1.5`，这是因为计算过程是`-7.5 = -4*2.0+(-1.5)`。
    - **应用场景示例**：
        - 在周期性的计算中很有用。比如在计算角度的周期性变化时，假设有一个角度变量`theta`，它的取值范围应该是`[0, 2*PI)`（以弧度为单位），如果`theta`的值超过了这个范围，可以使用`fmod`函数来将其调整回这个范围内。

```c
#include <stdio.h>
#include <math.h>
#define PI 3.14159265358979323846
int main()
{
    double angle = 7.0 * PI;
    double adjusted_angle = fmod(angle, 2 * PI);
    printf("原始角度: %lf\n", angle);
    printf("调整后的角度: %lf\n", adjusted_angle);
    return 0;
}
```

- 在这个示例中，首先定义了一个角度`angle`，它的值大于`2*PI`。然后使用`fmod`函数将其调整到`[0, 2*PI)`范围内，这对于处理周期性的角度变化（如在三角函数相关的计算中）是非常有用的。

# 函数题练习


# 编程题练习

## 7-10 大笨钟

微博上有个自称“大笨钟V”的家伙，每天敲钟催促码农们爱惜身体早点睡觉。不过由于笨钟自己作息也不是很规律，所以敲钟并不定时。一般敲钟的点数是根据敲钟时间而定的，如果正好在某个整点敲，那么“当”数就等于那个整点数；如果过了整点，就敲下一个整点数。另外，虽然一天有24小时，钟却是只在后半天敲1~12下。例如在23:00敲钟，就是“当当当当当当当当当当当”，而到了23:01就会是“当当当当当当当当当当当当”。在午夜00:00到中午12:00期间（端点时间包括在内），笨钟是不敲的。

下面就请你写个程序，根据当前时间替大笨钟敲钟。

### 输入格式：

输入第一行按照`hh:mm`的格式给出当前时间。其中`hh`是小时，在00到23之间；`mm`是分钟，在00到59之间。

### 输出格式：

根据当前时间替大笨钟敲钟，即在一行中输出相应数量个`Dang`。如果不是敲钟期，则输出：

```
Only hh:mm.  Too early to Dang.
```

其中`hh:mm`是输入的时间。

### 输入样例1：

```in
19:05
```

### 输出样例1：

```out
DangDangDangDangDangDangDangDang
```

### 输入样例2：

```
07:05
```

### 输出样例2：

```
Only 07:05.  Too early to Dang.
```
code：
```c
#include <stdio.h>

int main()
{
	int h,m;
	scanf("%d:%d",&h,&m);
	if((h==12&&m!=0)||(h>12&&h<24))//12点临界值不包括
	{
		for(int i=0;i<h-12;i++)
		{
			printf("Dang");
		}
		if(m!=0)
		{
			printf("Dang");
		}
	}
	else
	{
		printf("Only %0.2d:%0.2d.  Too early to Dang.",h,m);//注意这里的格式化输出%0.2d:%0.2d
	}
}
```

## 7-19 求整数的位数及各位数字之和

对于给定的非负整数N，求它的位数及其各位数字之和。

### 输入格式:

输入在一行中给出一个非负整数N。

### 输出格式:

在一行中输出N的位数及其各位数字之和，中间用一个空格隔开。

### 输入样例:

在这里给出一组输入。例如：

```in
321
```

### 输出样例:

在这里给出相应的输出。例如：

```out
3 6
```

code:
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main()
{
	char num[21];
	scanf("%s",&num);
	
	int len=strlen(num);
	int a=0;
	for(int i=0;i<len;i++)
	{
		a+=num[i]-'0';		//减去0的ASCII码值完成转换
	}
	
	printf("%d %d",len,a);
}
                             
```
