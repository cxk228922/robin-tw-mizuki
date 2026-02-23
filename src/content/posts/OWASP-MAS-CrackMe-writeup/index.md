---
title: OWASP MAS CrackMe writeup
published: 2025-05-22
description: "希望可以持續更新Orz"
tags: ["Cybersec","writeup"]
category: CTF
draft: false
lang: zh_TW 
---
題目連結：[OWASP MAS crackmes](https://mas.owasp.org/crackmes/)

對我很爛只解幾題, 看到這篇文的兄弟直接敲我DC催我打題目

# Android 
## Level 1

先使用jadx定位到MainActivity
![CleanShot 2025-05-22 at 07.26.01@2x](https://hackmd.io/_uploads/BktM-J2Zeg.png)

MainActivity:
```java
public class MainActivity extends Activity {
    private void a(String str) {
        AlertDialog create = new AlertDialog.Builder(this).create();
        create.setTitle(str);
        create.setMessage("This is unacceptable. The app is now going to exit.");
        create.setButton(-3, "OK", new DialogInterface.OnClickListener() { // from class: sg.vantagepoint.uncrackable1.MainActivity.1
            @Override // android.content.DialogInterface.OnClickListener
            public void onClick(DialogInterface dialogInterface, int i) {
                System.exit(0);
            }
        });
        create.setCancelable(false);
        create.show();
    }

    @Override // android.app.Activity
    protected void onCreate(Bundle bundle) {
        if (c.a() || c.b() || c.c()) {
            a("Root detected!");
        }
        if (b.a(getApplicationContext())) {
            a("App is debuggable!");
        }
        super.onCreate(bundle);
        setContentView(R.layout.activity_main);
    }

    public void verify(View view) {
        String str;
        String obj = ((EditText) findViewById(R.id.edit_text)).getText().toString();
        AlertDialog create = new AlertDialog.Builder(this).create();
        if (a.a(obj)) {
            create.setTitle("Success!");
            str = "This is the correct secret.";
        } else {
            create.setTitle("Nope...");
            str = "That's not it. Try again.";
        }
        create.setMessage(str);
        create.setButton(-3, "OK", new DialogInterface.OnClickListener() { // from class: sg.vantagepoint.uncrackable1.MainActivity.2
            @Override // android.content.DialogInterface.OnClickListener
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });
        create.show();
    }
}
```

重點看到`verify()`裡面的
```java
if (a.a(obj)) {
    create.setTitle("Success!");
    str = "This is the correct secret.";
} else {
    create.setTitle("Nope...");
    str = "That's not it. Try again.";
}
```
顯然這邊在驗證我們輸入的是否為期望的flag

找到`a`
```java
public class a {
    public static boolean a(String str) {
        byte[] bArr;
        byte[] bArr2 = new byte[0];
        try {
            bArr = sg.vantagepoint.a.a.a(b("8d127684cbc37c17616d806cf50473cc"), Base64.decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=", 0));
        } catch (Exception e) {
            Log.d("CodeCheck", "AES error:" + e.getMessage());
            bArr = bArr2;
        }
        return str.equals(new String(bArr));
    }

    public static byte[] b(String str) {
        int length = str.length();
        byte[] bArr = new byte[length / 2];
        for (int i = 0; i < length; i += 2) {
            bArr[i / 2] = (byte) ((Character.digit(str.charAt(i), 16) << 4) + Character.digit(str.charAt(i + 1), 16));
        }
        return bArr;
    }
}
```

顯然這是在做AES decrypt

再找到`sg.vantagepoint.a.a`
```java
public class a {
    public static byte[] a(byte[] bArr, byte[] bArr2) {
        SecretKeySpec secretKeySpec = new SecretKeySpec(bArr, "AES/ECB/PKCS7Padding");
        Cipher cipher = Cipher.getInstance("AES");
        cipher.init(2, secretKeySpec);
        return cipher.doFinal(bArr2);
    }
}
```
可以確定為ECB + PKCS7模式

這樣就可以寫個解密程式啦
```python
from Crypto.Cipher import AES
import base64

key = bytes.fromhex("8d127684cbc37c17616d806cf50473cc")
ciphertext = base64.b64decode("5UJiFctbmgbDoLXmpL12mkno8HT4Lv8dlat8FxR2GOc=")

cipher = AES.new(key, AES.MODE_ECB)
plaintext = cipher.decrypt(ciphertext)
print(plaintext.decode("utf-8"))
```

執行結果:`I want to believe`

![CleanShot 2025-05-22 at 07.39.55@2x](https://hackmd.io/_uploads/S1oUEk2Wxl.png)

## Level 2

跟上題一樣丟到jadx，定位到MainActivity，裡面也有`verify()`
![CleanShot 2025-05-22 at 07.49.04@2x](https://hackmd.io/_uploads/Hk45LJ2bxe.png)

```java
public class MainActivity extends c {
    private CodeCheck m;

    static {
        System.loadLibrary("foo");
    }

    /* JADX INFO: Access modifiers changed from: private */
    public void a(String str) {
        AlertDialog create = new AlertDialog.Builder(this).create();
        create.setTitle(str);
        create.setMessage("This is unacceptable. The app is now going to exit.");
        create.setButton(-3, "OK", new DialogInterface.OnClickListener() { // from class: sg.vantagepoint.uncrackable2.MainActivity.1
            @Override // android.content.DialogInterface.OnClickListener
            public void onClick(DialogInterface dialogInterface, int i) {
                System.exit(0);
            }
        });
        create.setCancelable(false);
        create.show();
    }

    private native void init();

    /* JADX WARN: Type inference failed for: r0v4, types: [sg.vantagepoint.uncrackable2.MainActivity$2] */
    @Override // android.support.v7.app.c, android.support.v4.app.h, android.support.v4.app.z, android.app.Activity
    protected void onCreate(Bundle bundle) {
        init();
        if (b.a() || b.b() || b.c()) {
            a("Root detected!");
        }
        if (a.a(getApplicationContext())) {
            a("App is debuggable!");
        }
        new AsyncTask<Void, String, String>() { // from class: sg.vantagepoint.uncrackable2.MainActivity.2
            /* JADX INFO: Access modifiers changed from: protected */
            @Override // android.os.AsyncTask
            /* renamed from: a, reason: merged with bridge method [inline-methods] */
            public String doInBackground(Void... voidArr) {
                while (!Debug.isDebuggerConnected()) {
                    SystemClock.sleep(100L);
                }
                return null;
            }

            /* JADX INFO: Access modifiers changed from: protected */
            @Override // android.os.AsyncTask
            /* renamed from: a, reason: merged with bridge method [inline-methods] */
            public void onPostExecute(String str) {
                MainActivity.this.a("Debugger detected!");
            }
        }.execute(null, null, null);
        this.m = new CodeCheck();
        super.onCreate(bundle);
        setContentView(R.layout.activity_main);
    }

    public void verify(View view) {
        String str;
        String obj = ((EditText) findViewById(R.id.edit_text)).getText().toString();
        AlertDialog create = new AlertDialog.Builder(this).create();
        if (this.m.a(obj)) {
            create.setTitle("Success!");
            str = "This is the correct secret.";
        } else {
            create.setTitle("Nope...");
            str = "That's not it. Try again.";
        }
        create.setMessage(str);
        create.setButton(-3, "OK", new DialogInterface.OnClickListener() { // from class: sg.vantagepoint.uncrackable2.MainActivity.3
            @Override // android.content.DialogInterface.OnClickListener
            public void onClick(DialogInterface dialogInterface, int i) {
                dialogInterface.dismiss();
            }
        });
        create.show();
    }
}
```

最前面有一個`private CodeCheck m;`
所以找到`CodeCheck`
```java
public class CodeCheck {
    private native boolean bar(byte[] bArr);

    public boolean a(String str) {
        return bar(str.getBytes());
    }
}
```
裡面使用到`native`，代表是用其他語言寫的，他們用[Java Native Interface](https://developer.android.com/training/articles/perf-jni)跟java互動

可以在lib底下找到libfoo.so檔
![CleanShot 2025-05-22 at 07.59.47@2x](https://hackmd.io/_uploads/rk5MKyn-lx.png)

接著拖到Ghidra分析

根據JNI命名規則，定位到`Java_sg_vantagepoint_uncrackable2_CodeCheck_bar()`

```c
undefined8
Java_sg_vantagepoint_uncrackable2_CodeCheck_bar(long *param_1,undefined8 param_2,undefined8 param_3)

{
  int iVar1;
  char *__s1;
  undefined4 extraout_var;
  undefined8 uVar2;
  long in_FS_OFFSET;
  char local_38 [24];
  long local_20;
  
  local_20 = *(long *)(in_FS_OFFSET + 0x28);
  if (DAT_0010400c == '\x01') {
    builtin_strncpy(local_38,"Thanks for all the fish",0x18);
    __s1 = (char *)(**(code **)(*param_1 + 0x5c0))(param_1,param_3,0);
    iVar1 = (**(code **)(*param_1 + 0x558))(param_1,param_3);
    if (iVar1 == 0x17) {
      iVar1 = strncmp(__s1,local_38,0x17);
      if (iVar1 == 0) {
        uVar2 = CONCAT71((int7)(CONCAT44(extraout_var,iVar1) >> 8),1);
        goto LAB_0010119c;
      }
    }
  }
  uVar2 = 0;
LAB_0010119c:
  if (*(long *)(in_FS_OFFSET + 0x28) == local_20) {
    return uVar2;
  }
                    /* WARNING: Subroutine does not return */
  __stack_chk_fail();
}
```
稍微可以猜出邏輯，把`Thanks for all the fish`丟到`local_38`裡面，`iVar1`作string compare，相等的話就作其他事情

