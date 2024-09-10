using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;

namespace WebApplication1.Repository
{
    public class SQLAccountsRepository<T> : IAccountsRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;
        public SQLAccountsRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }
        
        public void Add(Accounts entity)
        {
            // Hash the password before storing it
            entity.Password = HashPassword(entity.Password);

            _context.Set<Accounts>().Add(entity);
            _context.SaveChanges();
        }
        
        // Method to hash the password using a secure hashing algorithm
        private string HashPassword(string password)
        {

            // using bcrypt:
            return BCrypt.Net.BCrypt.HashPassword(password, BCrypt.Net.BCrypt.GenerateSalt());
        }

        public Accounts GetByUsername(string username)
        {
            return _context.accounts.FirstOrDefault(u => u.Username == username);
        }

        public bool CheckLoginAccess(string username, string password)
        {
            // Find the user by username
            var user = _context.accounts.FirstOrDefault(u => u.Username == username);

            // Check if the user exists and the provided password matches the stored hashed password
            if (user != null && VerifyPassword(password, user.Password))
            {
                return true; // Authentication successful
            }

            return false; // Authentication failed
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {

            // using bcrypt:
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        public T GetById(int Id)
        {
            return _context.Set<T>().Find(Id);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }

    }
}
