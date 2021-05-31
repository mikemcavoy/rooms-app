using System.Threading.Tasks;
using api.Dtos;

namespace api.Services
{
    public interface ISpotifyService
    {
        string StartAuthorization();
        Task<SpotifyTokenResponse> GenerateTokensAsync(string code);
        Task<SpotifyTokenResponse> RefreshTokenAsync(string refreshToken);
        Task<SpotifyUserDetailsResponse> GetCurrentUserDetailsAsync(string accessToken);
    }
}
