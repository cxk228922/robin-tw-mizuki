---
title: How Not to Be Wrong - The Power of Mathematical Thinking
published: 2023-12-07
description: "家庭讀書會發表"
tags: ["meow"]
category: meow
draft: false
lang: zh_TW
---

# Intro
  
現在,中共正式跟我們引戰了 , 擬作為國防部空軍司令 , 你有一項令人困擾的事:

現在有多台戰機飛回台灣,身上有無數個彈孔 , 你有一種可以防子彈的鋼板 , 不過鋼板很重 ,

一台飛機能裝的鋼板有限.

請問:你該把鋼板裝在哪裡?

![](https://img.notionusercontent.com/s3/prod-files-secure%2F26b87687-5e88-4a38-961b-27c739aa2187%2Fbe268d34-0e67-488d-9726-f40cd3690724%2FUntitled.png/size/w=2000?exp=1746671790&sig=4qYh1othwfqhF7eRSZ6hJTsrcH2EkF0Yo_mVbd9JOM4&id=f6622f17-0ef9-416c-ae41-c3e91c34d7b4&table=block)


(這是飛回來的飛機身上的彈孔分布)

- Answer

答案是:藍色框框的部分

- Why?

注意 : 我說的是”飛回來的” , 並不是所以有飛機的統計數據

於是我們可以大膽推論 :

那些藍色框框的部分是飛機的要害

因為如果中彈點是藍色框框的部分,那台飛機可能就飛不回來了

這就是知名的「倖存者偏差」（Survivorship bias) :

指我們只專注於我們看的到的數據,忽略了看不到的,於是作出了錯誤的推論

- What we learn

生活中數學的問題,不一定要是枯燥乏味的計算,而是要用邏輯的方式思考、假設

# Expected value

## What is Expected Value?

在賭博的例子中 , 期望值意指:

**如果玩家多次投注同一個賠率 , 他預期(平均)可贏得或失去的金額**

## Formula

$$
    E(X)=\sum_{}^{}X(\omega)P(\omega)
$$

簡單來說就是 : 期望值=事件報酬$\times$事件發生機率

## Meaning

在賭博當中:

如果$E(X)>0$ , 代表當投注量達到一定值的時候,平均贏得$E(X)$

如果$E(X)=0$ , 代表平手

如果$E(X)<0$ , 代表當投注量達到一定值的時候,平均輸了 $|E(X)|$

## Examples

- 猜硬幣
    
    丟兩個均勻硬幣，若兩面皆正面得15元，一正一反得6元，皆為反面輸20元
    
    總共四種情況:
    
    | A   | B   |
    | --- | --- |
    | 正   | 正   |
    | 正   | 反   |
    | 反   | 正   |
    | 反   | 反   |
    
    |     | $X(\omega)$ | $P(\omega)$ |
    | --- | --- | --- |
    | 都正  | $15$ | $\frac{1}{4}$ |
    | 一正一反 | $6$ | $\frac{1}{2}$ |
    | 都反  | $-20$ | $\frac{1}{4}$ |
    
    得到$E(X) = 15\times\frac{1}{4} + 6\times\frac{1}{2}-20\times\frac{1}{4}=1.75$
    
- 丟球
    
    - 組合數學
    
    從$r$個元素取出$n$個，組合數量為:
    
    $\mathrm{C}_{n}^{r}=\frac{n!}{r!(n-r)!}$
    
    其中`!`是階乘 , $n!=n\times(n-1)\times(n-2)…1$
    
    - 問題
    
    五個球隨機丟入三個箱子，求**空箱數量**的期望值?
    
    |     | $P(\omega)$ | $X(\omega)$ |
    | --- | --- | --- |
    | 兩隔空箱 | $\frac{3}{343}$ | $2$ |
    | 一個空箱 | $\frac{\mathrm{C}_{2}^{3}(2^{5}-2)}{243}$ | $1$ |
    | 零個空箱 | 不用算:D | $0$ |
    
    得到$E(X)=\frac{3}{343}\times2+\frac{\mathrm{C}_{2}^{3}(2^{5}-2)}{243}\times1+0=\frac{32}{81}$
    

# story 1

## Cash winfall

| 6碼對中6碼 | 930萬分之一 | 不固定 |
| --- | --- | --- |
| 6碼對中5碼 | 3.9萬分之一 | $4000 |
| 6碼對中4碼 | 800分之一 | $150 |
| 6碼對中3碼 | 47分之一 | $5  |
| 6碼對中2碼 | 6.8分之一 | 免費樂透彩券:D |

假設頭獎為100萬，一張2元彩券的期望值如下:

$E(X)=\frac{1000000}{9300000}+\frac{4000}{39000}+\frac{150}{800}+\frac{5}{47}+\frac{2}{6.8}\approx 0.798$

平均2元換到0.798元，根本不值

不過，遊戲還有另一項規則:roll down

如果頭獎累積超過200萬又沒人對中，個個獎項會開始roll down

以某一天舉例

頭獎接近300萬元，當然，沒有人中獎，獎金開始roll down:

對中5碼和3碼的獎金多增加60萬元，對中四碼增加140萬元

重新計算期望值:

$E(X)=5.53$

## 暴利的開始

麻省理工大四學生Jamse Harvey在做一項獨立研究:分析麻州各彩券的優劣

無意間就發現了這個讓人暴利的工具

他拉了一票人集資了$1000，最終賺得$3000

## 分一杯羹

另一個集團來自波士頓區東北大學的Ying Zhang博士組成

## 再分一杯羹

另一個集團由Grerald Selbee領導GS Investment Strategies LLC的小團隊

他們的故事最終被翻拍成電影***Jerry & Marge Go Large***

## 為何持續了這麼久?

cash winfall運營了約七年的時間，過程中也有人發現了這項漏洞

能運營下去的原因有幾點:

1. 並未普及

2. 政府照樣賺

[https://www.mass.gov/doc/letter-to-state-treasurer-steven-grossman-regarding-the-lottery-july-2012/download](https://www.mass.gov/doc/letter-to-state-treasurer-steven-grossman-regarding-the-lottery-july-2012/download)

# story 2

有一天，你收到了一封股票預測信件，他說:編號abdf的股票會漲

下一周，那支股票真的漲了

再下一周，同樣的人，說了同樣的話

同樣也漲了

就這樣，過了十週，每次都猜對

第11週，他問你要不要花大筆傭金交給他幫你投資?

## what do u think

如果他全靠猜的，狀況如下:

每支股票不是漲，就是跌

每一筆猜測成立的機率為50%

連續十週都猜對的機率為:

$(\frac{1}{2})^{10}=\frac{1}{1024}\approx 0.097\%$

機率幾乎為0

所以，他一定知道甚麼市場的內幕

## maybe…

如果說，他持有10240件這樣的信件，那情況會是甚麼樣的呢?

[https://drive.google.com/file/d/1U-QV11IUjAjvOSI3PisDnJfgFnj3BOgO/view?usp=sharing](https://drive.google.com/file/d/1U-QV11IUjAjvOSI3PisDnJfgFnj3BOgO/view?usp=sharing)

就會有10個幸運兒被騙了（；´д｀）ゞ

[https://www.youtube.com/watch?v=zv-3EfC17Rc&ab_channel=DerrenBrown](https://www.youtube.com/watch?v=zv-3EfC17Rc&ab_channel=DerrenBrown)

```python
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

content = MIMEMultipart()  
content["subject"] = "老鐵，跟我投資不?"
content["from"] = "ben042708@gmail.com"
content["to"] = "s1206105@taivs.tp.edu.tw" 
content.attach(MIMEText("股票A會漲"))
```

# Conclusion

以上例子希望大家對用數學解決問題感到有興趣