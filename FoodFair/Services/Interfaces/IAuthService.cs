namespace FoodFair.Services.Interfaces
{
    public interface IAuthService
    {
        bool Authenticate(string email, string password, byte[] passwordHash, byte[] passwordSalt);
        void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt);
        string GenerateJwtToken(int id);
    }
}