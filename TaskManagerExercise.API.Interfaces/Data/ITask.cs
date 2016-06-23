using System;

namespace TaskManagerExercise.API.Interfaces.Data
{
    public interface ITask
    {
        int Id { get; set; }
        string Title { get; set; }
        string Details { get; set; }
        DateTime DueDate { get; set; }
        DateTime? CompletedTime { get; set; }
    }
}