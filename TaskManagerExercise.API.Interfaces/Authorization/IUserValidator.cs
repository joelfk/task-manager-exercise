namespace TaskManagerExercise.API.Interfaces.Authorization
{
    public interface IUserValidator
    {
        bool IsValidUser(string username, string password);
    }
}