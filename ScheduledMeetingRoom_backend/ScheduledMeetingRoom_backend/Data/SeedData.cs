using Microsoft.EntityFrameworkCore;
using ScheduledMeetingRoom_backend.Models;
using ScheduledMeetingRoom_backend.Tools;

namespace ScheduledMeetingRoom_backend.Data
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var dbContext = new SqliteDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<SqliteDbContext>>()))
            {
                if (dbContext.Users.Any())
                {
                    return;
                }
                dbContext.Users.Add(new User
                {
                    UserName = "Admin",
                    Password = PasswordHelper.HashPassword("123456")
                });
                dbContext.SaveChanges();
            }
        }
    }
}
