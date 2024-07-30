# XXX_XXX

## Git 指令

```PowerShell
# 查看所有的配置以及所在文件
git config --list --show-origin
# 查看所有的配置
git config --list
# 查看所有的配置
git config --global --list
# 配置代理 socks5
git config --global http.proxy socks5 127.0.0.1:7890
git config --global https.proxy socks5 127.0.0.1:7890
# 配置 HTTP 代理
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
# 查看代理命令
git config --global --get http.proxy
git config --global --get https.proxy
# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## 建立倉庫

```PowerShell
echo "# ScheduledMeetingRoom" >> README.md
git init
git add README.md
git commit -m "first commit"
# git branch -M main
git remote add origin https://github.com/lightblueskyline/ScheduledMeetingRoom.git
git push -u origin master
```

## 後端

### [Sqlite](https://learn.microsoft.com/en-us/ef/core/get-started/overview/first-app?tabs=visual-studio)

```PowerShell
# 數據庫驅動器
Install-Package Microsoft.EntityFrameworkCore.Sqlite
Install-Package Microsoft.EntityFrameworkCore.Tools
Add-Migration InitialCreate
Update-Database
# Hash Password
dotnet add package BCrypt.Net-Next
```

## 前端
