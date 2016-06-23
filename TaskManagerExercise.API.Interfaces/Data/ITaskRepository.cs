using System.Collections.Generic;

namespace TaskManagerExercise.API.Interfaces.Data
{
    public interface ITaskRepository
    {
        IEnumerable<ITask> GetAll();
        IEnumerable<ITask> GetOutstanding();
        ITask GetById(int id);
        ITask Create();
        void SaveChanges();
    }
}