using System;
using Newtonsoft.Json;
using System.Text.Json.Serialization;

namespace api.Dtos
{
    public class SpotifyTokenResponse
    {
        public string AccessToken { get; private set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public string TokenType { get; private set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public string Scope { get; private set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public int ExpiresIn { get; private set; }

        [System.Text.Json.Serialization.JsonIgnore]
        public string RefreshToken { get; private set; }

        [Newtonsoft.Json.JsonConstructor]
        public SpotifyTokenResponse(
            string access_token,
            string token_type,
            string scope,
            int expires_in,
            string refresh_token)
        {
            AccessToken = access_token;
            TokenType = token_type;
            Scope = scope;
            ExpiresIn = expires_in;
            RefreshToken = refresh_token;
        }
    }
}
