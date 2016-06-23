using Microsoft.Owin.Security.OAuth;
using StructureMap;
using StructureMap.Graph;
using TaskManagerExercise.API.Authorization;

namespace TaskManagerExercise.API
{
    public class ConfigRegistry : Registry
    {
        public ConfigRegistry()
        {
            Scan(s =>
            {
                s.TheCallingAssembly();
                s.WithDefaultConventions();
            });
            
            For<IOAuthAuthorizationServerProvider>().Use<TaskManagerExerciseAuthorizationServerProvider>();
        }
    }
}