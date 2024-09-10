using WebApplication1.Entities;

namespace WebApplication1.Repository
{
    public interface IAccountsRepository<T>
    {
        void Add(Accounts entity);
        bool CheckLoginAccess(string username, string password);
        public Accounts GetByUsername(string username);
        IEnumerable<T> GetAll();

        T GetById(int Id);

        void Delete(T entity);

    }
}
