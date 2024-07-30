namespace ScheduledMeetingRoom_backend.Tools
{
    public static class PasswordHelper
    {
        /// <summary>
        /// Hash a password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        /// <summary>
        /// Verify a password
        /// </summary>
        /// <param name="hashedPassword"></param>
        /// <param name="plainPassword"></param>
        /// <returns></returns>
        public static bool VerifyPassword(string hashedPassword, string plainPassword)
        {
            return BCrypt.Net.BCrypt.Verify(plainPassword, hashedPassword);
        }
    }
}
