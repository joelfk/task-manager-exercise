using StructureMap;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace TaskManagerExercise.API
{
    static class WebApiConfig
    {
        public static void Register(HttpConfiguration config, IContainer container)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Services.Replace(typeof(IExceptionHandler), container.GetInstance<GlobalExceptionHandler>());
        }
    }
}