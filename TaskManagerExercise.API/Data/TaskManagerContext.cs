using System.Data.Entity;

namespace TaskManagerExercise.API.Data
{
    class TaskManagerContext : DbContext
    {
        public TaskManagerContext() : base("name=TaskManager")
        {
            Database.SetInitializer<TaskManagerContext>(null);
        }

        public virtual DbSet<Task> Tasks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.AddFromAssembly(GetType().Assembly);
        }
    }
}