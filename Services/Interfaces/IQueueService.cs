using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;

namespace api.Services
{
    public interface IQueueService
    {
        Task AddTrackToQueueAsync(QueueItemDto queueItem);
        Queue<QueueItemDto> GetQueue();
        CurrentlyPlayingDto GetCurrentlyPlaying();
    }
}
