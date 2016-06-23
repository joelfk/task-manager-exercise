using System.Net;
using System.Net.Http;
using System.Web.Http.ExceptionHandling;

namespace TaskManagerExercise.API
{
    class GlobalExceptionHandler : ExceptionHandler
    {
        public override void Handle(ExceptionHandlerContext context)
        {
            var response = new HttpResponseMessage();

            response.StatusCode = HttpStatusCode.InternalServerError;
            response.ReasonPhrase = context.Exception.Message;

            context.Result = new ErrorMessageResult(response);
        }

        public override bool ShouldHandle(ExceptionHandlerContext context)
        {
            return true;
        }
    }
}