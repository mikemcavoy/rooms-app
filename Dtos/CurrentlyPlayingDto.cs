using System;
using System.Collections.Generic;
using api.Entities;

namespace api.Dtos
{
    public class CurrentlyPlayingDto
    {
        public Track Track { get; set; }
        public UserDetailsDto User { get; set; }
        public long StartedAt { get; set; }
    }
}
