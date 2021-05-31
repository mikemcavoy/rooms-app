using System;
using System.Net;
using System.Threading.Tasks;
using api.Dtos;
using api.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace api.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                var response = context.Response;
                response.ContentType = "application/json";

                switch(ex)
                {
                    case InvalidTokenException e:
                        response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        break;
                    case NotFoundException e:
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var responseObj = JsonConvert.SerializeObject(new ErrorResponse{
                    statusCode = response.StatusCode,
                    message = ex.Message,
                });

                await response.WriteAsync(responseObj);
            }
        }
    }
}
