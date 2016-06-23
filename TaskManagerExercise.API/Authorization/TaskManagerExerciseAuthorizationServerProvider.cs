using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security.OAuth;
using TaskManagerExercise.API.Interfaces.Authorization;

namespace TaskManagerExercise.API.Authorization
{
    class TaskManagerExerciseAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private readonly IUserValidator _userValidator;
        private readonly IUserClaims _userClaims;

        public TaskManagerExerciseAuthorizationServerProvider(
            IUserValidator userValidator,
            IUserClaims userClaims)
        {
            _userValidator = userValidator;
            _userClaims = userClaims;
        }

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            if (!_userValidator.IsValidUser(context.UserName, context.Password))
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            identity.AddClaims(_userClaims.GetUserClaims(context.UserName, context.Password));

            context.Validated(identity);
        }
    }
}