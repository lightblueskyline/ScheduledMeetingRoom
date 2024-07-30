using Microsoft.EntityFrameworkCore;
using ScheduledMeetingRoom_backend.Models;

namespace ScheduledMeetingRoom_backend.Data
{
    public class SqliteDbContext : DbContext
    {
        public SqliteDbContext(DbContextOptions<SqliteDbContext> options) : base(options) { }

        #region Model
        public DbSet<User> Users { get; set; }
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<User>()
            //    .Property(x => x.EncryptedPassword)
            //    .HasColumnName("Password");
        }
    }
}
