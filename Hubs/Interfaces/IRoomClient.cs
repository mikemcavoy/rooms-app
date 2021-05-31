using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;

namespace api.Hubs
{
    public interface IRoomClient
    {
        Task UpdateUsers(IEnumerable<UserDetailsDto> users);
        Task UpdateQueue(Queue<QueueItemDto> queueItems);
        Task UpdateCurrentlyPlaying(CurrentlyPlayingDto currentlyPlaying);
    }
}
