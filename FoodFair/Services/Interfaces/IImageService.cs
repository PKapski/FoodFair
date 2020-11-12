using System.Threading.Tasks;
using FoodFair.Models.Entities;

namespace FoodFair.Services.Interfaces
{
    public interface IImageService
    {
        Task<Image> GetImageAsync(int id);
        Task SaveImageAsync(Image image);
        Task PutImageAsync(Image image);
        Task<bool> ImageExistsAsync(int id);
    }
}