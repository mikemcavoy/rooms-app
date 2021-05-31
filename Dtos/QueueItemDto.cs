using System.Collections.Generic;
using api.Entities;

namespace api.Dtos
{
    public class QueueItemDto
    {
        public Track Track { get; set; }
        public UserDetailsDto User { get; set; }
    }
}
