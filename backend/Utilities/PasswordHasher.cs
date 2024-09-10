using BCrypt.Net;
namespace WebApplication1.Utilities
{

    public class PasswordHasher
    {
        // Method to hash a password
        public static string HashPassword(string password)
        {
            // Generate a salt and hash the password using bcrypt
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt());
        }

        // Method to verify a password against a hashed password
        public static bool VerifyPassword(string password, string hashedPassword)
        {
            // Use bcrypt to verify the password
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }

}
