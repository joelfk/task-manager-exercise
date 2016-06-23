using System.Web.Http.Dependencies;
using StructureMap;

namespace TaskManagerExercise.API.Ioc
{
    public class StructureMapDependencyResolver : StructureMapDependencyScope, IDependencyResolver
    {
        private readonly IContainer _container;

        public StructureMapDependencyResolver(IContainer container) : base(container)
        {
            _container = container;
        }
        
        public IDependencyScope BeginScope()
        {
            IContainer child = _container.GetNestedContainer();
            return new StructureMapDependencyScope(child);
        }
    }
}