using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ScheduledMeetingRoom_backend.Models;

namespace ScheduledMeetingRoom_backend.Data
{
    public class SqliteDbContext : IdentityDbContext
    {
        public SqliteDbContext(DbContextOptions<SqliteDbContext> options) : base(options) { }

        #region Model
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUser>(x =>
            {
                x.HasNoKey();
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
