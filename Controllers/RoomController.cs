using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/room")]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _roomService;
        private readonly IQueueService _queueService;
        public RoomController(IRoomService roomService, IQueueService queueService)
        {
            _roomService = roomService;
            _queueService = queueService;
        }

        [Authorize]
        [HttpPost("queue")]
        public IActionResult AddTrackToQueue(QueueItemDto queueItem)
        {
            _queueService.AddTrackToQueueAsync(queueItem);
            return Ok();
        }

        [Authorize]
        [HttpGet("queue")]
        public IActionResult GetQueue()
        {
            var queueObject = _queueService.GetQueue();
            return Ok(queueObject);
        }

        [Authorize]
        [HttpGet("currently-playing")]
        public IActionResult GetCurrentlyPlaying()
        {
            var currentlyPlayingObject = _queueService.GetCurrentlyPlaying();
            return Ok(currentlyPlayingObject);
        }
    }
}
