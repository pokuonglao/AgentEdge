using WebApplication1.Entities;

namespace WebApplication1.Repository
{
    public interface IPropertiesRepository<T>
    {
        void Add(T entity);
        
        void Update(T entity);
        void Delete(T entity);
        T GetById(int id);
        // int GetTotalCount();

        //IEnumerable<T> GetAll();
        IEnumerable<T> GetAll();
        // IEnumerable<Properties> Search(string keyword);
        
        // Other methods as needed

    }

}
