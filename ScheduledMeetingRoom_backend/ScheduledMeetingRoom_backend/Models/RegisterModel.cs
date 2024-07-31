﻿using System.ComponentModel.DataAnnotations;

namespace ScheduledMeetingRoom_backend.Models
{
    public class RegisterModel
    {
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string? Password { get; set; }
    }
}
