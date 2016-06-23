using NUnit.Framework;
using TaskManagerExercise.API.Authorization;

namespace TaskManagerExercise.API.Tests.Authorization
{
    [TestFixture]
    public class UserValidatorTests
    {
        [Test]
        public void IsValidUser_WhenUserNameAndPasswordAreValid_ReturnsTrue()
        {
            var userValidator = new UserValidator();

            Assert.IsTrue(userValidator.IsValidUser(Constants.Authorization.Username, Constants.Authorization.Password));
        }

        [Test]
        [TestCase(null, null)]
        [TestCase("", "")]
        [TestCase("Invalid_UserName", "Invalid_Password")]
        public void IsValidUser_WhenUserNameAndPasswordAreInvalid_ReturnsFalse(string username, string password)
        {
            var userValidator = new UserValidator();

            Assert.IsFalse(userValidator.IsValidUser(username, password));
        }
    }
}