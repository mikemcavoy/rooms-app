using System.Collections.Generic;
using api.Dtos;

namespace api.Services
{
    public interface IRoomService
    {
        void AddUserToRoom(string connectionId, UserDetailsDto user);
        void RemoveUserFromRoom(string connectionId);
        IEnumerable<UserDetailsDto> GetAllUsersInRoom();
    }
}
