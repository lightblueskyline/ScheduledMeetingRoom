using Microsoft.AspNetCore.Identity;

namespace ScheduledMeetingRoom_backend.Data
{
    /// <summary>
    /// 在數據庫中設置，用戶初始資料
    /// </summary>
    public static class SeedData
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
            // Create a scope to get the services needed
            using (var scope = serviceProvider.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<IdentityUser>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                await SeedRoles(roleManager);
                await SeedUsers(userManager);
            }

            #region 注釋掉了
            //using (var dbContext = new SqliteDbContext(
            //    serviceProvider.GetRequiredService<DbContextOptions<SqliteDbContext>>()))
            //{
            //    if (dbContext.Users.Any())
            //    {
            //        return;
            //    }

            //    dbContext.Users.Add(new User
            //    {
            //        UserName = "Admin",
            //        Password = PasswordHelper.HashPassword("123456")
            //    });

            //    dbContext.SaveChanges();
            //}
            #endregion
        }

        private static async Task SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            string[] roleNames = { "Admin", "User" };
            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }

        private static async Task SeedUsers(UserManager<IdentityUser> userManager)
        {
            if (userManager.Users.Any())
            {
                return;
            }

            var adminUser = new IdentityUser
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = false,
            };

            var regularUser = new IdentityUser
            {
                UserName = "user@example.com",
                Email = "user@example.com",
                EmailConfirmed = false,
            };

            string adminPassword = "Admin@123456";
            string userPassword = "User@123456";

            var adminUserExists = await userManager.FindByEmailAsync(adminUser.Email);
            if (adminUserExists == null)
            {
                var createAdminUser = await userManager.CreateAsync(adminUser, adminPassword);
                if (createAdminUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Admin");
                }
            }

            var regularUserExists = await userManager.FindByEmailAsync(regularUser.Email);
            if (regularUserExists == null)
            {
                var createRegularUser = await userManager.CreateAsync(regularUser, userPassword);
                if (createRegularUser.Succeeded)
                {
                    await userManager.AddToRoleAsync(regularUser, "User");
                }
            }
        }
    }
}
