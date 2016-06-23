using System;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using Microsoft.Owin;
using Microsoft.Owin.Security.OAuth;
using Owin;
using StructureMap;
using StructureMap.Graph;
using TaskManagerExercise.API.Ioc;
using TaskManagerExercise.API.App_Start;

[assembly: OwinStartup(typeof(TaskManagerExercise.API.Startup))]
namespace TaskManagerExercise.API
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration config = new HttpConfiguration();
            IContainer container = InitialiseIoC(config);
            
            WebApiConfig.Register(config, container);
            
            ConfigureOAuth(app, container);

            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);            
            app.UseWebApi(config);
        }

        private IContainer InitialiseIoC(HttpConfiguration config)
        {
            IContainer container = new Container(cfg =>
            {
                cfg.Scan(s =>
                {
                    s.AssembliesFromApplicationBaseDirectory();
                    s.LookForRegistries();
                });
            });

            config.DependencyResolver = new StructureMapDependencyResolver(container);
            config.Services.Replace(typeof(IHttpControllerActivator), new ServiceActivator(container));

            AutoMapperConfiguration.Initialize();

            return container;
        }

        private void ConfigureOAuth(IAppBuilder app, IContainer container)
        {
            var oAuthAuthorizationServerOptions = new OAuthAuthorizationServerOptions()
            {
                AllowInsecureHttp = false,
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = container.GetInstance<IOAuthAuthorizationServerProvider>()
            };

            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
            app.UseOAuthAuthorizationServer(oAuthAuthorizationServerOptions);
        }
    }
}