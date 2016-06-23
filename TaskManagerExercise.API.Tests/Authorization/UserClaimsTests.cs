using System.Linq;
using NUnit.Framework;
using TaskManagerExercise.API.Authorization;

namespace TaskManagerExercise.API.Tests.Authorization
{
    [TestFixture]
    public class UserClaimsTests
    {
        [Test]
        public void GetUserClaims_WhenUserNameAndPasswordAreValid_ReturnsClaimsListWithManagerRole()
        {
            var userClaims = new UserClaims();

            var results = userClaims.GetUserClaims(Constants.Authorization.Username, Constants.Authorization.Password);

            Assert.AreEqual(2, results.Count());
            Assert.AreEqual(1, results.Count(claim =>
                claim.Type == "sub" &&
                claim.Value == "username"));
            Assert.AreEqual(1, results.Count(claim =>
                claim.Type == "role" &&
                claim.Value == "manager"));
        }

        [Test]
        [TestCase(null, null)]
        [TestCase("", "")]
        [TestCase("Invalid_UserName", "Invalid_Password")]
        public void GetUserClaims_WhenUserNameAndPasswordAreInvalid_ReturnsEmptyClaimsList(string username, string password)
        {
            var userClaims = new UserClaims();

            var results = userClaims.GetUserClaims(username, password);

            Assert.IsEmpty(results);
        }
    }
}