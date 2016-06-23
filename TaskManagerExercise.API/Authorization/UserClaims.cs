using System.Collections.Generic;
using System.Security.Claims;
using TaskManagerExercise.API.Interfaces.Authorization;

namespace TaskManagerExercise.API.Authorization
{
    public class UserClaims : IUserClaims
    {
        public IEnumerable<Claim> GetUserClaims(string username, string password)
        {
            var claims = new List<Claim>();

            if (username == Constants.Authorization.Username && password == Constants.Authorization.Password)
            {
                claims.Add(new Claim("sub", "username"));
                claims.Add(new Claim("role", "manager"));
            }

            return claims;
        }
    }
}
