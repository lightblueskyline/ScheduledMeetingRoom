# XXX_XXX

## 建立倉庫

```PowerShell
echo "# ScheduledMeetingRoom" >> README.md
git init
git add README.md
git commit -m "first commit"
#git branch -M main
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
