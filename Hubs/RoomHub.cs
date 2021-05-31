using System;
using System.Threading.Tasks;
using api.Dtos;
using api.Services;
using Microsoft.AspNetCore.SignalR;

namespace api.Hubs
{
    public class RoomHub : Hub<IRoomClient>
    {
        private readonly IRoomService _roomService;

        public RoomHub(IRoomService roomService)
        {
            _roomService = roomService;
        }

        public async Task JoinRoom(UserDetailsDto user)
        {
            var connectionId = Context.ConnectionId;
            _roomService.AddUserToRoom(connectionId, user);
            var allUsers = _roomService.GetAllUsersInRoom();
            await Clients.All.UpdateUsers(allUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connectionId = Context.ConnectionId;
            _roomService.RemoveUserFromRoom(connectionId);
            var allUsers = _roomService.GetAllUsersInRoom();
            await Clients.All.UpdateUsers(allUsers);
            await base.OnDisconnectedAsync(exception);
        }
    }
}
