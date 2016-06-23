using System;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using StructureMap;

namespace TaskManagerExercise.API.Ioc
{
    class ServiceActivator : IHttpControllerActivator
    {
        private readonly IContainer _container;
        
        internal ServiceActivator(IContainer container)
        {
            _container = container;
        }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            // TODO: Add logging on exception
            var scopedContainer = _container.GetNestedContainer();
            scopedContainer.Inject(request);
            request.RegisterForDispose(scopedContainer);

            return (IHttpController)scopedContainer.GetInstance(controllerType);
        }
    }
}