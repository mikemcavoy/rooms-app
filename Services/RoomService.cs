using System;
using System.Collections.Generic;
using System.Linq;
using api.Dtos;

namespace api.Services
{
    public class RoomService : IRoomService
    {
        private Dictionary<string, UserDetailsDto> users = new Dictionary<string, UserDetailsDto>();

        public void AddUserToRoom(string connectionId, UserDetailsDto user)
        {
            var existingUser = users.Values.Where(u => u.UserId == user.UserId).FirstOrDefault();
            if (existingUser is null)
            {
                users.Add(connectionId, user);
            }
        }

        public IEnumerable<UserDetailsDto> GetAllUsersInRoom()
        {
            return users.Values.ToList();
        }

        public void RemoveUserFromRoom(string connectionId)
        {
            users.Remove(connectionId);
        }
    }
}
