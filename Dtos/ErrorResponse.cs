using System;

namespace api.Dtos
{
    public class ErrorResponse
    {
        public int statusCode { get; set; }
        public string message { get; set; }
    }
}
