using System.Linq.Expressions;
using WebApplication1.Entities;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace WebApplication1.Repository
{
    public class SQLPropertiesRepository<T> : IPropertiesRepository<T> where T : class
    {
        private readonly ApplicationDbContext _context;

        public SQLPropertiesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
            _context.SaveChanges();
        }


        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
            _context.SaveChanges();
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
            _context.SaveChanges();
        }

        public T GetById(int id)
        {
            return _context.Set<T>().Find(id);
        }

        //public IEnumerable<T> GetAll()
        //{
        //    return _context.Set<T>().ToList();
        //}

        // public int GetTotalCount()
        // {
        //     return _context.Set<T>().Count();
        // }


        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        // // Search method to filter entities based on search criteria
        // public IEnumerable<Clients> Search(string keyword)
        // {
        //     return _context.Set<Clients>()
        //                    .Where(T => T.ID.ToString().Contains(keyword) ||
        //                        T.FirstName.Contains(keyword) ||
        //                        T.LastName.Contains(keyword) ||
        //                        T.Phone.Contains(keyword) ||
        //                        T.Email.Contains(keyword) ||
        //                        T.Address.Contains(keyword) ||
        //                        T.City.Contains(keyword) ||
        //                        T.State.Contains(keyword) ||
        //                        T.Zipcode.Contains(keyword))
        //                    .ToList();
        // }

        //accounts table
        //public bool CheckLoginAccess(string username, string password)
        //{
        //    var user = _context.Accounts.FirstOrDefault(u => u.Username == username);
        //    if (user != null && PasswordHasher.VerifyPassword(password, user.Password))
        //    {
        //        return true;
        //    }
        //    return false;
        //}

        //// Add your password verification method here
        //private bool VerifyPassword(string hashedPassword, string password)
        //{
        //    // Implement your password verification logic here
        //    // For example, you can compare hashedPassword with the hashed version of the input password
        //    return hashedPassword == Hash(password);
        //}

        //// Add your hashing method here
        //private string Hash(string password)
        //{
        //    // Implement your hashing logic here
        //    // For example, you can use a cryptographic hash function like SHA256
        //    // Ensure you use a salt and appropriate iteration count to securely hash the password
        //    // Do NOT store plain text passwords in your database
        //    return password; // Replace this with your actual hashing logic
        //}

        // Implement other methods as needed
    }

}
