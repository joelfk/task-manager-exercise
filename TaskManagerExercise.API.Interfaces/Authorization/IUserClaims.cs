using System.Collections.Generic;
using System.Security.Claims;

namespace TaskManagerExercise.API.Interfaces.Authorization
{
    public interface IUserClaims
    {
        IEnumerable<Claim> GetUserClaims(string username, string password);
    }
}