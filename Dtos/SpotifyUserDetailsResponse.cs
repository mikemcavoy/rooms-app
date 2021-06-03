using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace api.Dtos
{
    public class SpotifyUserDetailsResponse
    {
        public string SpotifyId { get; private set; }

        [JsonConstructor]
        public SpotifyUserDetailsResponse(string id)
        {
            SpotifyId = id;
        }

    }
}
