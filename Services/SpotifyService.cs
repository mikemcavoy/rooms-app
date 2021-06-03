using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace api.Services
{
    public class SpotifyService : ISpotifyService
    {
        private string ClientId;
        private string ClientSecret;
        private string RedirectUrl;
        private const string AuthorizationUrl = "https://accounts.spotify.com/authorize";
        private const string TokenUrl = "https://accounts.spotify.com/api/token";
        private const string CurrentUserUrl = "https://api.spotify.com/v1/me";

        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IConfiguration _config;

        public SpotifyService(IConfiguration config, IHttpClientFactory httpClientFactory)
        {
            _config = config;
            _httpClientFactory = httpClientFactory;

            RedirectUrl = _config.GetSection("Application").GetSection("BaseUrl").Value + "/api/auth/login-callback";
            ClientId = _config.GetSection("Spotify").GetSection("ClientId").Value;
            ClientSecret = _config.GetSection("Spotify").GetSection("ClientSecret").Value;
        }

        public string StartAuthorization()
        {
            var queryParams = new Dictionary<string, string>()
            {
                {"client_id", ClientId},
                {"response_type", "code"},
                {"redirect_uri", RedirectUrl},
                {"scope", "streaming"},
            };
            return QueryHelpers.AddQueryString(AuthorizationUrl, queryParams);
        }

        public async Task<SpotifyTokenResponse> GenerateTokensAsync(string code)
        {
            var client = _httpClientFactory.CreateClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(ClientId + ":" + ClientSecret)));

            var content = new FormUrlEncodedContent(new Dictionary<string, string>()
            {
                {"grant_type", "authorization_code"},
                {"code", code},
                {"redirect_uri", RedirectUrl},
            });

            var response = await client.PostAsync(TokenUrl, content);
            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<SpotifyTokenResponse>(result);
        }

        public async Task<SpotifyUserDetailsResponse> GetCurrentUserDetailsAsync(string accessToken)
        {
            var client = _httpClientFactory.CreateClient();

            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await client.GetAsync(CurrentUserUrl);
            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<SpotifyUserDetailsResponse>(result);
        }

        public async Task<SpotifyTokenResponse> RefreshTokenAsync(string refreshToken)
        {
            var client = _httpClientFactory.CreateClient();
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(System.Text.ASCIIEncoding.ASCII.GetBytes(ClientId + ":" + ClientSecret)));

            var content = new FormUrlEncodedContent(new Dictionary<string, string>()
            {
                {"grant_type", "refresh_token"},
                {"refresh_token", refreshToken},
            });

            var response = await client.PostAsync(TokenUrl, content);
            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<SpotifyTokenResponse>(result);
        }
    }
}
