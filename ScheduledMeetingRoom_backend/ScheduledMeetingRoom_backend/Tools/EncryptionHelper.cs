using System.Security.Cryptography;
using System.Text;

namespace ScheduledMeetingRoom_backend.Tools
{
    public static class EncryptionHelper
    {
        private static readonly string key = "your-encryption-key"; // Key should be stored securely

        public static string Encrypt(string plainText)
        {
            if (string.IsNullOrEmpty(plainText))
                return plainText;

            using (Aes aesAlg = Aes.Create())
            {
                var keyBytes = Encoding.UTF8.GetBytes(key);
                Array.Resize(ref keyBytes, 32); // Ensure key is 32 bytes for AES-256
                aesAlg.Key = keyBytes;

                aesAlg.GenerateIV();
                var iv = aesAlg.IV;

                aesAlg.Mode = CipherMode.CBC;
                aesAlg.Padding = PaddingMode.PKCS7;

                using (var encryptor = aesAlg.CreateEncryptor(aesAlg.Key, iv))
                {
                    using (var msEncrypt = new MemoryStream())
                    {
                        msEncrypt.Write(iv, 0, iv.Length); // Prepend IV to the ciphertext

                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        {
                            using (var swEncrypt = new StreamWriter(csEncrypt))
                            {
                                swEncrypt.Write(plainText);
                            }
                        }

                        return Convert.ToBase64String(msEncrypt.ToArray());
                    }
                }
            }
        }

        public static string Decrypt(string cipherText)
        {
            if (string.IsNullOrEmpty(cipherText))
                return cipherText;

            var fullCipher = Convert.FromBase64String(cipherText);

            using (Aes aesAlg = Aes.Create())
            {
                var iv = new byte[16];
                Array.Copy(fullCipher, 0, iv, 0, iv.Length);

                var keyBytes = Encoding.UTF8.GetBytes(key);
                Array.Resize(ref keyBytes, 32); // Ensure key is 32 bytes for AES-256
                aesAlg.Key = keyBytes;
                aesAlg.IV = iv;
                aesAlg.Mode = CipherMode.CBC;
                aesAlg.Padding = PaddingMode.PKCS7;

                using (var decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV))
                {
                    using (var msDecrypt = new MemoryStream(fullCipher, 16, fullCipher.Length - 16))
                    {
                        using (var csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (var srDecrypt = new StreamReader(csDecrypt))
                            {
                                return srDecrypt.ReadToEnd();
                            }
                        }
                    }
                }
            }
        }
    }
}
