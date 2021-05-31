using System.Text.Json.Serialization;

namespace api.Dtos
{
    public class JwtTokenResponse
    {
        public string AccessToken { get; set; }
        [JsonIgnore]
        public string RefreshToken { get; set; }
        public string SpotifyAccessToken { get; set; }
    }
}
