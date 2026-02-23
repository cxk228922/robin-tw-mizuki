---
title: Penetration Test cheat sheet
published: 2025-03-23
description: "滲透測試常用工具and指令"
tags: ["Cybersec"]
category: CTF
draft: false
lang: zh_TW
---

哈哈其實我也沒很會滲透

我只是寫爽的

# Recon
## nmap
掃主機和服務
```
nmap -T4 -p- -A -O --script=vulnscan/vulnscan.nse --script-args vulscandb=cve.csv <target IP>
```
- `-T4` : 快速掃描(`T5`更快但有可能出錯)
- `-A` : 屌逼逼高級偵查，包括OS探測、版本偵測、traceroute、script scan...
- `-O` : 作業系統偵測
- `-p-` : 掃所有port
- `--script=vulnscan/vulnscan.nse --script-args vulnscandb=cve.csv` : 漏洞偵測(需要先下載[vulnscan](https://github.com/scipag/vulscan?spm=a2ty_o01.29997173.0.0.5582c921dkoQlB))
## gobuster
爆破工具

目錄爆破:
```
gobuster dir -u http://<target IP> -w <wordlist>
```

DNS子域名爆破:
```
gobuster dns -d <target domain> -w <wordlist>
```

# Brute Force
## hydra
ssh密碼爆破工具
```
hydra -l <username> -P <password list> ssh://<target IP> 
```

## John the ripper
密碼爆破工具
```
john --wordlist=<wordlist> <password file>
```

## Hashcat
hash爆破工具
```
hashcat -m 0 -a 0 <hash file> <wordlist>
```

- `-m` : 雜湊類型

| Hash         | value |
| ------------ | ----- |
| MD5(default) | 0     |
| SHA-256      | 1400  |
| Windows NTLM | 1000  |
| bcrypt       | 3200  |
| 7z(AES)      | 11600 |

- `-a` : 指定攻擊模式

| Value | Description        |
| ----- | ------------------ |
| 0     | Dictionary Attack  |
| 1     | Combination Attack |
| 3     | Mask Attack        |
| 6     | Hybrid Attack      |

# Exploitation
## Metasploit Framework
滲透測試框架
```
msfconsole
search <keyword>
use <module path>
set <option> <Value>
```
如果有錯誤或建議加入的內容，請立即連繫我!