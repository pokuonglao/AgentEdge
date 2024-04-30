using WebApplication1.Entities;

namespace WebApplication1.Repository
{
    public interface IClientsRepository<T>
    {
        void Add(T entity);
        
        void Update(T entity);
        void Delete(T entity);
        T GetById(int id);
        int GetTotalCount();

        //IEnumerable<T> GetAll();
        IEnumerable<T> GetAll(int pageNumber, int pageSize);
        IEnumerable<Clients> Search(string keyword);
        
        // Other methods as needed

    }

}
