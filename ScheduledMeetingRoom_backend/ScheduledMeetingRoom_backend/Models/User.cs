using System.ComponentModel.DataAnnotations.Schema;

namespace ScheduledMeetingRoom_backend.Models
{
    public class User
    {
        /// <summary>
        /// 密碼
        /// </summary>
        [NotMapped]
        public string? Password { get; set; }
    }
}
