namespace FindJob.DB
{
    public interface IRepository<T> : IDisposable where T : class
    {
        IEnumerable<T> GetList();
        T Get(int id);
        int Count();
        T Create(T item);
        void Update(T item);
        void Delete(T item);
        void Save();
    }
}
