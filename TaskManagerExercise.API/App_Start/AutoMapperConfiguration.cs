using TaskManagerExercise.API.Interfaces.Data;
using TaskManagerExercise.API.Models.Requests;
using TaskManagerExercise.API.Models.ViewModels;

namespace TaskManagerExercise.API.App_Start
{
    class AutoMapperConfiguration
    {
        public static void Initialize()
        {
            AutoMapper.Mapper.Initialize(Configure);
        }

        private static void Configure(AutoMapper.IMapperConfiguration config)
        {
            config.CreateMap<ITask, TaskViewModel>();
            config.CreateMap<CreateTaskRequest, ITask>();
            config.CreateMap<UpdateTaskRequest, ITask>();
        }
    }
}