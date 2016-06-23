using System.Collections.Generic;
using System.Linq;
using TaskManagerExercise.API.Interfaces.Data;

namespace TaskManagerExercise.API.Data
{
    public class TaskRepository : ITaskRepository
    {
        private readonly TaskManagerContext _context;

        public TaskRepository()
        {
            _context = new TaskManagerContext();
        }

        public IEnumerable<ITask> GetAll()
        {
            return _context.Tasks.OrderByDescending(task => task.DueDate);
        }

        public IEnumerable<ITask> GetOutstanding()
        {
            return _context.Tasks.Where(task => !task.CompletedTime.HasValue).OrderByDescending(task => task.DueDate);
        }

        public ITask GetById(int id)
        {
            return _context.Tasks.FirstOrDefault(task => task.Id == id);
        }

        public ITask Create()
        {
            var task = new Task();
            _context.Tasks.Add(task);

            return task;
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}