using System;

namespace api.Exceptions
{
    public class NotFoundException: Exception
    {
        public NotFoundException() {}

        public NotFoundException(string message): base(message) {}
    }
}
