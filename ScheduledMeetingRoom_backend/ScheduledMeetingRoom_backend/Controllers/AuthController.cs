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
            var key = Encoding.ASCII.GetBytes((_configuration["Jwt:SecretKey"] ?? ""));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name,(login.UserName??""))
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }
    }
}
