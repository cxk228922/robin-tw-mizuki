---
title: SecurityFocus June Homework
published: 2024-06-23
description: "FlyDragonㄉ課的作業"
tags: ["Cybersec","C-Cpp","Python","asm"]
category: CTF
draft: false
lang: zh_TW
---

## Q1 : Bit操作
```
C程式開發 & Bit 操作
a = 12, b = 9 請撰寫一個程式找出以下四值

a AND b
a OR b
a XOR b
NOT a
```

```c=
#include <stdio.h>

int main() {
    int a = 12;
    int b = 9;
    printf("%d\n", a & b);
    printf("%d\n", a | b);
    printf("%d\n", a ^ b);
    printf("%d\n", ! a);
    return 0;
}
```
## Q2 : 自己出題-Reverse
```
出題實作
請你出一道題目並解出自己的題目，需求如下

無法在正常流程下取得 Flag，需要分析或逆向
使用 C 語言進行開發
```
file : https://drive.google.com/drive/folders/1cWibFgH6kgvomZ7URLGztjcnxsGAodUb?usp=sharing


---

### 解題步驟
![image](https://hackmd.io/_uploads/Hym38soH0.png)

要給正確的密碼

![image](https://hackmd.io/_uploads/ByTRrjsHR.png)

沒什麼奇怪的upx之類的，直接丟進IDA

![image](https://hackmd.io/_uploads/By_wLjsSC.png)

可以發現，他是使用check_password這個涵式去做判斷

![image](https://hackmd.io/_uploads/B1e-vsoHA.png)

推斷:

將輸入的字串，每個字元的ASCII碼-1，並返回其是否等於```"Lx^@0R2^e?hKdc^P@P"```

寫一個簡單的程式
```python=
passWord = "Lx^@0R2^e?hKdc^P@P"
for c in passWord:
    print(chr(ord(c)+1),end = '')
```

![image](https://hackmd.io/_uploads/SktsYooBR.png)

![image](https://hackmd.io/_uploads/HJQAYior0.png)

> flag : FLAG{My_A1S3_f@iLed_QAQ}

## Q3 : 組合語言分析
```asm=
找出能夠成功跳到 paradise 的值，並簡單說明

section	.text
	global _start       

_start:  
    mov eax, 0x03
    mov ebx, ???
    mov ecx, 0x3eb3ac03
    mov edx, 0x3eb3ac03
    jmp _loop

_loop:
    test eax, eax
    jz check
    add ecx, edx
    dec eax
    jmp _loop
    
check:
    cmp ebx, ecx
    je paradise
    mov eax, 0
    jmp end

paradise:
    mov eax, 1
    jmp end

end:
    ret
```

讓我們寫上註釋:
```asm=
section	.text
	global _start       

_start:    
    mov eax, 0x03
    mov ebx, ???
    mov ecx, 0x3eb3ac03
    mov edx, 0x3eb3ac03
    jmp _loop

_loop:    
    test eax, eax    //if(eax==0) 
    jz check    //true -> check
    add ecx, edx    //ecx+=edx
    dec eax    //eax-=1
    jmp _loop    //loop()
    
check:
    cmp ebx, ecx    //eax == ecx?
    je paradise    //true
    mov eax, 0    //otherwise -> eax = 0
    jmp end    //return 0

paradise:
    mov eax, 1
    jmp end

end:
    ret
```
觀察後，發現
* loop的結束條件為`eax = 0`，而`eax`初始值為3，且回圈內每次`eax--`
* &emsp;-> `for(int eax = 3 ; eax >0 ; eax--)`
* 執行了三次`ecx+=edx`
* &emsp;->$ecx' = ecx + 3*edx$
* `paradise`的跳轉條件為`ebx = ecx`

那我們叫出python幫我們計算吧

![image](https://hackmd.io/_uploads/r12FwFRrR.png)

得到結果 : `ebx`為`0xfaceb00c`，可以跳轉到`paradise`

---

## Q4 : 自己出題-pwn
首先，連進去看看問題
![image](https://hackmd.io/_uploads/ry5FpSxUC.png)

分析問題:
* 問題為丟給你一個涵式，並執行100次提問，每次提問會給定x，須回答f(x)
* 經過多次測試，f(x)不變，100輪也固定
* 會限時間，大約20秒

觀察規律後，寫個pwn的小程式
```python=
from pwn import *

r = remote('localhost',12345)
r.recvlines(4)

for i in range(100):
    r.recvline()
    r.recvuntil("x = ")
    x = int(r.recvline().strip())
    res = 5*x*x + 3*x - 1
    r.sendline(str(res))
print(r.recvline())
r.interactive()
r.close()
```

![image](https://hackmd.io/_uploads/S1QSkLxL0.png)

> flag :　FLAG｛Ar3_y0u_@_nnath_ma1ter_0r_h@ck2r｝
