using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http.Dependencies;
using StructureMap;

namespace TaskManagerExercise.API.Ioc
{
    public class StructureMapDependencyScope : IDependencyScope
    {
        private IContainer _container;
        
        public StructureMapDependencyScope(IContainer container)
        {
            _container = container;
        }

        public void Dispose()
        {
            IDisposable disposable = _container;

            if (disposable != null)
            {
                disposable.Dispose();
            }

            _container = null;
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return _container.GetAllInstances(serviceType).Cast<object>();
        }

        /// <summary>
        /// Retrieves a service from the scope.
        /// </summary>
        /// <param name="serviceType">The service to be retrieved.</param>
        /// <returns>The retrieved service.</returns>
        public object GetService(Type serviceType)
        {
            return (serviceType.IsAbstract || serviceType.IsInterface)
                ? _container.TryGetInstance(serviceType)
                : _container.GetInstance(serviceType);
        }
    }
}