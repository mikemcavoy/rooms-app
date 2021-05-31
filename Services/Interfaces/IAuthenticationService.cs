using System.Threading.Tasks;
using api.Dtos;
using Microsoft.AspNetCore.Http;

namespace api.Services
{
    public interface IAuthenticationService
    {
        Task<JwtTokenResponse> AuthenticateAsync(string code);
        Task<JwtTokenResponse> RefreshTokensAsync(string refreshToken);
        void SetRefreshTokenInCookie(HttpContext context, string refreshToken);
        void RemoveRefreshTokenInCookie(HttpContext context);
    }
}
