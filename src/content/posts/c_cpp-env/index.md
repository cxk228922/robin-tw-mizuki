---
title: C/C++ coding environment
published: 2024-11-01
description: "給想寫C/C++的環境建置指南"
tags: ["C-Cpp"]
category: meow
draft: false
---

Author: Arden/Robin

感謝Arden學弟幫我完成macOS的建置教學(\*/ω\\*)

# Editor

- Dev-C++ (includes compiler)
- Code::Blocks (Windows & Linux only)
- CP Editor
- Visual Studio (Windows only & includes compiler)
- Visual Studio Code
- Xcode (macOS only)

# Setting up gcc/g++

## Windows 10/11

### Installation

1. Install & Launch [MSYS2](https://github.com/msys2/msys2-installer/releases/download/2024-01-13/msys2-x86_64-20240113.exe)
> Ensure the `Run MSYS2 now` box is checked.

![image](https://hackmd.io/_uploads/rJ7aYmweyx.png)

2. The MSYS2 terminal will open. Run the following command:
```bash!
pacman -S --needed base-devel mingw-w64-ucrt-x86_64-toolchain
```
![image](https://hackmd.io/_uploads/BkBZq7wx1e.png)

3. Press `Enter`

![image](https://hackmd.io/_uploads/rkNH9XPg1l.png)

4. Enter `Y` when asked to proceed with the installation.
> Ensure the network is accessible.

Installation Complete!

![image](https://hackmd.io/_uploads/B1rG3mDeyl.png)

### Add PATH

1. Search for `Edit the system environment variables` in the Windows searchbox, and press `Enter`

![image](https://hackmd.io/_uploads/Sky9pXPxye.png)

2. `Environment Variables...` -> `Path` -> `Edit...`

![Screenshot 2024-10-26 154310](https://hackmd.io/_uploads/SyqbRG5e1e.png)


3. Click `New` and enter the path: `C:\msys64\ucrt64\bin`

![Screenshot 2024-10-24 102445](https://hackmd.io/_uploads/HJ4jGEwgyx.png)

All Done!

### Check g++ installation
Open cmd and enter the following command:
```bash!
g++ --version
```
You should see:

![image](https://hackmd.io/_uploads/SJQMUVvg1e.png)

## Linux (Debian based systems)
Open the terminal and enter:
```bash!
sudo apt update
sudo apt upgrade
sudo apt install g++
```

![image](https://hackmd.io/_uploads/ryacMLDeJl.png)

## macOS
### Method 1: Installing the Xcode command line tools

The clang and clang++ compilers come with the Xcode command line tools.

Note that when you run `gcc` or `g++`, it'll actually run `clang` or `clang++`.

To install the command line tools, use the following command.
``` Bash!
xcode-select --install
```
This will prompt for confirmation.
![](https://mac.install.guide/assets/images/ruby/install-Xcode-CLT.png)
Click 'Install' to begin the download and installation process.
![](https://mac.install.guide/assets/images/ruby/install-Xcode-CLT-progress.png)
You'll see a confirmation message when installation is complete.
![](https://mac.install.guide/assets/images/ruby/install-Xcode-CLT-done.png)

### Method 2: Homebrew

Alternatively, you can install and use the Homebrew package manager to install the gcc compiler.
  
To install the Homebrew package manager, use the following command.

``` Bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

You also want to add Homebrew to your PATH.

``` Bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

Homebrew is now installed!

To use Homebrew, restart your current shell to reload the PATH.

``` Bash
exit
```

You can now use Homebrew to install packages.
  
To install the gcc compiler, do:

``` Bash
brew install gcc
```

gcc will now be installed.


# Installing a Editor

## Dev-C++ (Windows only)
Download Dev-C++ from [SourceForge](https://sourceforge.net/projects/embarcadero-devcpp/files/v6.3/)
Just click `next` for each option :D

To create a new source file, do:
`File` -> `New` -> `Source File`

![image](https://hackmd.io/_uploads/Byy1LLPe1g.png)

To run your program, click the `compile and run` button.

![image](https://hackmd.io/_uploads/SJMYB8Px1l.png)
![image](https://hackmd.io/_uploads/SyVFL8DxJg.png)

## Code::Blocks (Windows only)
Download from Code::Blocks from the [official website](https://www.codeblocks.org/downloads/binaries/)

To create a new project, do:
`File` -> `New` -> `Project`

![image](https://hackmd.io/_uploads/BySziiux1g.png)

`Files` -> `C/C++ source` -> `Go`

![image](https://hackmd.io/_uploads/SJYoiidl1x.png)

Click `next`, and select a directory.

![image](https://hackmd.io/_uploads/SJj4hiOe1x.png)

Click `Build and run` to run your program.

![image](https://hackmd.io/_uploads/SkcRnidgyl.png)

## CP Editor
The CP Editor is designed for Competitive Programming.

To download it, go to the [official website](https://cpeditor.org/download/) 

![image](https://hackmd.io/_uploads/r1h_w3dlJg.png)

Additionally, CP Editor can submit your code to Codeforces automatically. 

See the [documentation](https://cpeditor.org/docs/setup/).


## Visual Studio

> Visual Studio is a powerful IDE, but it may be overkill for small projects.

Download Visual Studio from [Microsoft](https://visualstudio.microsoft.com/downloads/)

### Installation
Open the Visual Studio Installer, and choose `Desktop development with C++`

![image](https://hackmd.io/_uploads/Hk4-ahugJe.png)

### Creating a CLI project
Open Visual Studio, and select `Create a new project`, `Console App`
![image](https://hackmd.io/_uploads/B1r_6hOxJg.png)

Name your project and choose a location

![image](https://hackmd.io/_uploads/rJBnp3_gJx.png)

Click `Local Windows Debugger` to run your code

![image](https://hackmd.io/_uploads/By-QR3dxyx.png)

## Visual Studio Code
Download Visual Studio Code from [Microsoft](https://code.visualstudio.com/)


![image](https://hackmd.io/_uploads/HJgzkX5ekl.png)

Open the `Extensions` tab, install these 2 extensions

![image](https://hackmd.io/_uploads/rJHHWmqgke.png)

Open a folder.
![image](https://hackmd.io/_uploads/Sk7NU_5eyl.png)

To create a new file, use: `New File...`.

![Screenshot 2024-10-26 155522](https://hackmd.io/_uploads/HJgplX9e1e.png)

Click `Run C/C++ file` to run your program.

![image](https://hackmd.io/_uploads/Bk8h-7ceyl.png)

## Xcode (macOS)
> Xcode is a powerful IDE, but it may be overkill for small projects.

Download Xcode from the [App Store](https://apps.apple.com/tw/app/xcode/id497799835?l=en-GB&mt=12).