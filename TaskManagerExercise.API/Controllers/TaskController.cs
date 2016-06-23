using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Description;
using TaskManagerExercise.API.Interfaces.Data;
using TaskManagerExercise.API.Interfaces.Mapping;
using TaskManagerExercise.API.Models;
using TaskManagerExercise.API.Models.Requests;
using TaskManagerExercise.API.Models.ViewModels;

namespace TaskManagerExercise.API.Controllers
{
    public class TaskController : ApiController
    {
        private readonly ITaskRepository _taskRepository;
        private readonly IMapper _mapper;

        public TaskController(
            ITaskRepository taskRepository,
            IMapper mapper)
        {
            _taskRepository = taskRepository;
            _mapper = mapper;
        }

        [ResponseType(typeof(IEnumerable<TaskViewModel>))]
        [Route("v1/tasks")]
        [HttpGet]
        [Authorize]
        public IHttpActionResult GetAllTasks()
        {
            var taskViewModels = _mapper.Map<IEnumerable<ITask>, IEnumerable<TaskViewModel>>(_taskRepository.GetAll());

            return Ok(taskViewModels);
        }

        [ResponseType(typeof(IEnumerable<TaskViewModel>))]
        [Route("v1/tasks/outstanding")]
        [HttpGet]
        public IHttpActionResult GetOutstandingTasks()
        {
            var taskViewModels = _mapper.Map<IEnumerable<ITask>, IEnumerable<TaskViewModel>>(_taskRepository.GetOutstanding());

            return Ok(taskViewModels);
        }

        [ResponseType(typeof(TaskViewModel))]
        [Route("v1/tasks/{taskId}")]
        [HttpGet]
        public IHttpActionResult GetTask(int taskId)
        {
            var taskViewModels = _mapper.Map<ITask, TaskViewModel>(_taskRepository.GetById(taskId));

            return Ok(taskViewModels);
        }

        [Route("v1/tasks")]
        [HttpPost]
        [ValidateModel]
        [Authorize]
        public IHttpActionResult CreateTask(CreateTaskRequest request)
        {
            _mapper.Map(request, _taskRepository.Create());

            _taskRepository.SaveChanges();

            return Ok();
        }

        [Route("v1/tasks/{taskId}")]
        [HttpPut]
        [ValidateModel]
        [Authorize]
        public IHttpActionResult UpdateTask(int taskId, UpdateTaskRequest request)
        {
            var task = _taskRepository.GetById(taskId);

            if (task == null)
            {
                return NotFound();
            }

            _mapper.Map(request, task);

            _taskRepository.SaveChanges();

            return Ok();
        }
    }
}