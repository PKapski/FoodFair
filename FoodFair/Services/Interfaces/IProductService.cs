using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Models.Entities;

namespace FoodFair.Services.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetAllProductsAsync(int? supplierId, bool showOnlyAvailable);
        Task<Product> GetProductAsync(int id);
        Task SaveProductAsync(Product product);
        Task PutProductAsync(Product product);
        Task DeleteProductAsync(Product product);
        Task<bool> ProductExistsAsync(int id);
    }
}