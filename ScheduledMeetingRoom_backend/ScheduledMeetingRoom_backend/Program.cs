using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ScheduledMeetingRoom_backend.Data;
using ScheduledMeetingRoom_backend.Models;
using System.Text;

namespace ScheduledMeetingRoom_backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            #region Configure DbContext with SQLite
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            var DbPath = Path.Join(path, "SMR.db");
            builder.Services.AddDbContext<SqliteDbContext>(options => options.UseSqlite($"Data Source={DbPath}"));
            // builder.Services.AddDbContext<SqliteDbContext>(options => options.UseSqlite((builder.Configuration["SqliteConnectionStrings:DefaultConnection"] ?? "")));
            // builder.Services.AddDbContext<SqliteDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));
            #endregion

            #region Set up ASP.NET Core Identity as a Service
            builder.Services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<SqliteDbContext>()
                .AddDefaultTokenProviders();
            #endregion

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #region Configure JWT authentication
            var jwtSettings = builder.Configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes((builder.Configuration["JwtSettings:SecretKey"] ?? ""));
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });
            #endregion

            #region 從 appsettings.json 節點獲取内容注冊 OpenWeatherMapApi
            builder.Services.Configure<OpenWeatherMapApi>(builder.Configuration.GetSection("SampleAPIEndpoints"));
            #endregion

            var app = builder.Build();

            #region 加入用戶種子數據
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<SqliteDbContext>();
                    context.Database.Migrate();
                    SeedData.Initialize(services).Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occurred while seeding the database.");
                }
            }
            #endregion

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
