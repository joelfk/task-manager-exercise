using TaskManagerExercise.API.Interfaces.Authorization;

namespace TaskManagerExercise.API.Authorization
{
    public class UserValidator : IUserValidator
    {
        public bool IsValidUser(string username, string password)
        {
            return username == Constants.Authorization.Username && password == Constants.Authorization.Password;
        }
    }
}