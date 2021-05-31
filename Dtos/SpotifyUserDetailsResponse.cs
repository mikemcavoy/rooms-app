using System.Collections.Generic;
using Newtonsoft.Json;

namespace api.Dtos
{
    public class SpotifyUserDetailsResponse
    {
        public string SpotifyId { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public string ProfileUrl { get; private set; }
        public string ProfileImage { get; private set; }

        [JsonConstructor]
        public SpotifyUserDetailsResponse(
            string id,
            string display_name,
            string email,
            ExternalUrls external_urls,
            IList<Images> images)
        {
            SpotifyId = id;
            Name = display_name;
            Email = email;
            ProfileUrl = external_urls.spotify;
            ProfileImage = images[0].url;
        }

    }

    public struct ExternalUrls
    {
        public string spotify;
    }

    public struct Images
    {
        public string url;
    }
}
