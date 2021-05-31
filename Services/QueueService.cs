using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using api.Dtos;
using api.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace api.Services
{
    public class QueueService : IQueueService
    {
        private Queue<QueueItemDto> trackQueue = new Queue<QueueItemDto>();
        private CurrentlyPlayingDto currentlyPlaying = new CurrentlyPlayingDto();
        private IHubContext<RoomHub, IRoomClient> _roomHub;

        public QueueService(IHubContext<RoomHub, IRoomClient> roomHub)
        {
            _roomHub = roomHub;
        }

        public async Task AddTrackToQueueAsync(QueueItemDto queueItem)
        {
            trackQueue.Enqueue(queueItem);
            var queue = GetQueue();
            await _roomHub.Clients.All.UpdateQueue(queue);
            if (currentlyPlaying.Track == null)
            {
                await PlayAsync();
            }
        }

        public Queue<QueueItemDto> GetQueue()
        {
            return trackQueue;
        }

        public CurrentlyPlayingDto GetCurrentlyPlaying()
        {
            return currentlyPlaying;
        }

        private async Task PlayAsync()
        {
            if (trackQueue.Count > 0)
            {
                var nextInQueue = trackQueue.Dequeue();

                await _roomHub.Clients.All.UpdateQueue(trackQueue);

                currentlyPlaying.Track = nextInQueue.Track;
                currentlyPlaying.User = nextInQueue.User;
                currentlyPlaying.StartedAt = DateTimeOffset.Now.ToUnixTimeMilliseconds();

                await _roomHub.Clients.All.UpdateCurrentlyPlaying(currentlyPlaying);

                await Task.Delay(nextInQueue.Track.duration + 1000);

                await PlayAsync();
            }
            else
            {
                currentlyPlaying.Track = null;
                currentlyPlaying.User = null;
                currentlyPlaying.StartedAt = DateTimeOffset.Now.ToUnixTimeMilliseconds();
                await _roomHub.Clients.All.UpdateCurrentlyPlaying(currentlyPlaying);

            }
        }
    }
}
