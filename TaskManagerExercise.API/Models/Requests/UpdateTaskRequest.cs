using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManagerExercise.API.Models.Requests
{
    public class UpdateTaskRequest
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        public DateTime? CompletedTime { get; set; }
    }
}