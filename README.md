# XXX_XXX

## Git 指令

```PowerShell
# git adog
git config --global alias.adog "log --all --decorate --oneline --graph"
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
#
git config --global user.email "lightblueskyline@gamail.com"
git config --global user.name "M_0v0_M"
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
# IdentityUser
dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore
```

## 前端

```PowerShell
# npm 配置
npm help config
npm config list --json
# 獲取配置項值
npm config get proxy
npm config get https-proxy
npm config get registry
# 設置代理
npm config set proxy=http://127.0.0.1:7890
npm config set https-proxy=http://127.0.0.1:7890
npm config set registry=https://registry.npmjs.org/
# 取消代理
npm config delete proxy
npm config delete https-proxy
npm config delete registry

# 安裝 pnpm
npm install --global pnpm
# 創建項目
npm create vite@latest
# 進入項目目錄
npm install
# 執行
npm run dev

# 運行時自動打開瀏覽器
# "dev": "vite --open",

# eslint 配置 (https://zh-hans.eslint.org/)
npm init @eslint/config

# 插件，可在 <script setup lang="ts"> 中定義組件名稱 <script setup lang="ts" name="***">
# -D, --save-dev: Package will appear in your devDependencies.
npm install vite-plugin-vue-setup-extend -D

# 路由
npm install vue-router
# 路由組件(依靠路由規則渲染)通常位於 pages & views 文件夾，一般組件(需要書寫標簽名稱展示的組件)通常位於 components

# 狀態管理
npm install pinia

# Element Plus
npm install element-plus
# Element Plus Component: Icon
npm install @element-plus/icons-vue

# 環境變量的配置
# 項目根目錄下添加 .env.development

# 集成 Sass
npm install -D sass
# 清除默認樣式 reset.scss

# mock 接口
npm install -D mockjs
npm install -D vite-plugin-mock
npm install -D mockjs vite-plugin-mock
npm install vite-plugin-mock mockjs --save-dev

# axios
npm install axios

# process.cwd()
npm i --save-dev @types/node
```

## 代碼備份

```CSharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ScheduledMeetingRoom_backend.Data;
using ScheduledMeetingRoom_backend.Models;
using ScheduledMeetingRoom_backend.Tools;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ScheduledMeetingRoom_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthController : ControllerBase
    {
        private readonly SqliteDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(SqliteDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// 登入
        /// </summary>
        /// <param name="login"></param>
        /// <returns></returns>
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.UserName == login.UserName);
            if (existingUser == null)
            {
                return Unauthorized("Invalid username");
            }

            // Verify the password
            bool isPasswordValid = PasswordHelper.VerifyPassword((existingUser.Password ?? ""), (login.Password ?? ""));
            if (!isPasswordValid)
            {
                return Unauthorized("Invalid password");
            }

            // Create JWT token
            var tokenHandler = new JwtSecurityTokenHandler();
            // _configuration.GetSection("Jwt")?.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes((_configuration["Jwt:SecretKey"] ?? ""));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name,(login.UserName??""))
                }),
                Expires = DateTime.UtcNow.AddMonths(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }

        /// <summary>
        /// 用戶注冊
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        public async Task<IActionResult> Register(User user)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == user.UserName))
            {
                return BadRequest("UserName already exists.");
            }

            user.Password = PasswordHelper.HashPassword((user.Password ?? ""));
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
```
