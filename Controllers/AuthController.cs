using System.Collections.Generic;
using System.Threading.Tasks;
using api.Exceptions;
using api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Configuration;

namespace api.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly ISpotifyService _spotifyService;
        private readonly IAuthenticationService _authenticationService;

        public AuthController(IConfiguration config,
                              ISpotifyService spotifyService,
                              IAuthenticationService authenticationService)
        {
            _config = config;
            _spotifyService = spotifyService;
            _authenticationService = authenticationService;
        }

        [HttpGet("login")]
        public RedirectResult Login()
        {
            string url = _spotifyService.StartAuthorization();
            return Redirect(url);
        }

        [HttpGet("login-callback")]
        public async Task<IActionResult> LoginCallback(string code)
        {
            var tokenObj = await _authenticationService.AuthenticateAsync(code);

            var queryParams = new Dictionary<string, string>()
            {
                {"at", tokenObj.AccessToken },
                {"sat", tokenObj.SpotifyAccessToken },
            };

            var baseUrl = "/login";
            var redirectUrl = QueryHelpers.AddQueryString(baseUrl, queryParams);

            _authenticationService.SetRefreshTokenInCookie(HttpContext, tokenObj.RefreshToken);

            return Redirect(redirectUrl);
        }

        [HttpGet("refresh-tokens")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["rft"];
            if (refreshToken is null)
            {
                throw new InvalidTokenException("Refresh token does not exist");
            }
            var tokenObj = await _authenticationService.RefreshTokensAsync(refreshToken);
            return Ok(tokenObj);
        }

        [HttpGet("logout")]
        public IActionResult Logout()
        {
            var refreshToken = Request.Cookies["rft"];
            _authenticationService.RemoveRefreshTokenInCookie(HttpContext);
            return Ok();
        }
    }
}
