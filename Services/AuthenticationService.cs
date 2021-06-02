using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace api.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IConfiguration _config;
        private readonly ISpotifyService _spotifyService;

        private const int REFRESH_TOKEN_EXPIRES_IN_DAYS = 5;

        public AuthenticationService(IConfiguration config,
                                     ISpotifyService spotifyService)
        {
            _config = config;
            _spotifyService = spotifyService;
        }

        public async Task<JwtTokenResponse> AuthenticateAsync(string code)
        {
            var tokenObj = await _spotifyService.GenerateTokensAsync(code);
            var userDetails = await _spotifyService.GetCurrentUserDetailsAsync(tokenObj.AccessToken);
            var jwtToken = GenerateJwtToken(userDetails.SpotifyId);

            return new JwtTokenResponse
            {
                RefreshToken = tokenObj.RefreshToken,
                SpotifyAccessToken = tokenObj.AccessToken,
                AccessToken = jwtToken,
            };
        }

        public async Task<JwtTokenResponse> RefreshTokensAsync(string refreshToken)
        {

            var spotifyTokenObj = await _spotifyService.RefreshTokenAsync(refreshToken);
            var currentUser = await _spotifyService.GetCurrentUserDetailsAsync(spotifyTokenObj.AccessToken);
            var jwt = GenerateJwtToken(currentUser.SpotifyId);

            return new JwtTokenResponse
            {
                AccessToken = jwt,
                SpotifyAccessToken = spotifyTokenObj.AccessToken
            };
        }

        public void SetRefreshTokenInCookie(HttpContext context, string refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(REFRESH_TOKEN_EXPIRES_IN_DAYS),
            };

            context.Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
        }

        public void RemoveRefreshTokenInCookie(HttpContext context)
        {
            context.Response.Cookies.Delete("rft");
        }

        private string GenerateJwtToken(string userId)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("JWT").GetSection("Key").Value));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddSeconds(Convert.ToDouble(_config.GetSection("JWT").GetSection("ExpirationInSeconds").Value));

            var token = new JwtSecurityToken(
                issuer: _config.GetSection("JWT").GetSection("Issuer").Value,
                claims: claims,
                expires: expires,
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
