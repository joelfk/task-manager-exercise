using System;
using System.Data.Entity.ModelConfiguration;
using TaskManagerExercise.API.Interfaces.Data;

namespace TaskManagerExercise.API.Data
{
    class Task : ITask
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletedTime { get; set; }
    }

    class TaskConfig : EntityTypeConfiguration<Task>
    {
        protected TaskConfig()
        {
            ToTable(typeof(Task).Name);
        }
    }
}