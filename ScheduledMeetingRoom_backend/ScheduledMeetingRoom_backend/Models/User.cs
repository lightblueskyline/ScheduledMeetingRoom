using ScheduledMeetingRoom_backend.Tools;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScheduledMeetingRoom_backend.Models
{
    public class User
    {
        public int Id { get; set; }

        /// <summary>
        /// 用戶名
        /// </summary>
        [Required]
        public string? UserName { get; set; }

        /// <summary>
        /// 密碼
        /// </summary>
        [Required]
        public string? Password { get; set; }
    }
}
