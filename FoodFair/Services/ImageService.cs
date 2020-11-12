using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Services
{
    public class ImageService : IImageService
    {
        private readonly FoodFairDbContext _context;

        public ImageService(FoodFairDbContext context)
        {
            _context = context;
        }

        public async Task<Image> GetImageAsync(int id)
        {
            return await _context.Images.FindAsync(id);
        }

        public async Task SaveImageAsync(Image image)
        {
            _context.Images.Add(image);
            await _context.SaveChangesAsync();
        }

        public async Task PutImageAsync(Image image)
        {
            _context.Entry(image).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }
        
        public async Task<bool> ImageExistsAsync(int id)
        {
            return await _context.Images.AnyAsync(i=>i.Id == id);

        }
    }
}