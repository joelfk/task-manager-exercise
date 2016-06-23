using FakeItEasy;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Results;
using TaskManagerExercise.API.Controllers;
using TaskManagerExercise.API.Interfaces.Data;
using TaskManagerExercise.API.Interfaces.Mapping;
using TaskManagerExercise.API.Models.Requests;
using TaskManagerExercise.API.Models.ViewModels;

namespace TaskManagerExercise.API.Tests.Controllers
{
    [TestFixture]
    public class TaskControllerTests
    {
        [Test]
        public void GetAllTasks_ReturnsAllTasks()
        {
            var tasks = Enumerable.Empty<ITask>();

            var taskViewModels = Enumerable.Empty<TaskViewModel>();

            var taskRepository = A.Fake<ITaskRepository>();
            A.CallTo(() => taskRepository.GetAll()).Returns(tasks);

            var mapper = A.Fake<IMapper>();
            A.CallTo(() => mapper.Map<IEnumerable<ITask>, IEnumerable<TaskViewModel>>(tasks)).Returns(taskViewModels);

            var controller = new TaskController(
                taskRepository,
                mapper);

            var result = controller.GetAllTasks() as OkNegotiatedContentResult<IEnumerable<TaskViewModel>>;

            Assert.IsNotNull(result);
            Assert.AreSame(taskViewModels, result.Content);
        }

        [Test]
        public void GetOutstandingTasks_ReturnsOutstandingTasks()
        {
            var tasks = Enumerable.Empty<ITask>();

            var taskViewModels = Enumerable.Empty<TaskViewModel>();

            var taskRepository = A.Fake<ITaskRepository>();
            A.CallTo(() => taskRepository.GetOutstanding()).Returns(tasks);

            var mapper = A.Fake<IMapper>();
            A.CallTo(() => mapper.Map<IEnumerable<ITask>, IEnumerable<TaskViewModel>>(tasks)).Returns(taskViewModels);

            var controller = new TaskController(
                taskRepository,
                mapper);

            var result = controller.GetOutstandingTasks() as OkNegotiatedContentResult<IEnumerable<TaskViewModel>>;

            Assert.IsNotNull(result);
            Assert.AreSame(taskViewModels, result.Content);
        }

        [Test]
        public void CreateTask_CreatesNewTaskAndReturnsOkResult()
        {
            var request = new CreateTaskRequest();

            var newTask = A.Fake<ITask>();

            var taskRepository = A.Fake<ITaskRepository>();
            A.CallTo(() => taskRepository.Create()).Returns(newTask);

            var mapper = A.Fake<IMapper>();

            var controller = new TaskController(
                taskRepository,
                mapper);

            var result = controller.CreateTask(request) as OkResult;

            Assert.IsNotNull(result);

            A.CallTo(() => mapper.Map(request, newTask)).MustHaveHappened();
            A.CallTo(() => taskRepository.SaveChanges()).MustHaveHappened();
        }

        [Test]
        public void UpdateTask_WhenSpecifiedTaskDoesntExist_ReturnsNotFoundResult()
        {
            const int taskId = 1;

            var taskRepository = A.Fake<ITaskRepository>();
            A.CallTo(() => taskRepository.GetById(taskId)).Returns(null);

            var controller = new TaskController(
                taskRepository,
                A.Dummy<IMapper>());

            var result = controller.UpdateTask(taskId, new UpdateTaskRequest()) as NotFoundResult;

            Assert.IsNotNull(result);
        }

        [Test]
        public void UpdateTask_WhenSpecifiedTaskDoesExist_UpdatesSpecifiedTaskAndReturnsOkResult()
        {
            const int taskId = 1;

            var request = new UpdateTaskRequest();

            var task = A.Fake<ITask>();

            var taskRepository = A.Fake<ITaskRepository>();
            A.CallTo(() => taskRepository.GetById(taskId)).Returns(task);

            var mapper = A.Fake<IMapper>();

            var controller = new TaskController(
                taskRepository,
                mapper);

            var result = controller.UpdateTask(taskId, request) as OkResult;

            Assert.IsNotNull(result);

            A.CallTo(() => mapper.Map(request, task)).MustHaveHappened();
            A.CallTo(() => taskRepository.SaveChanges()).MustHaveHappened();
        }
    }
}