using System;

namespace TaskManagerExercise.API.Models.ViewModels
{
    public class TaskViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime? CompletedTime { get; set; }
    }
}