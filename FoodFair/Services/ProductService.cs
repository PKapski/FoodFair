using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Services
{
    public class ProductService : IProductService
    {
        private readonly FoodFairDbContext _context;

        public ProductService(FoodFairDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync(int? supplierId, bool showOnlyAvailable)
        {
            IQueryable<Product> query = _context.Products
                .Include(p => p.Supplier);

            if (showOnlyAvailable)
                query = query.Where(p => p.TotalQuantity > 0);

            if (supplierId != null)
                query = query.Where(p => p.SupplierId == supplierId);

            return await query.ToListAsync();
            // return await _context.Products.Where(x=>x.Id==5).Include(p=> p.Supplier).ToListAsync();
        }

        public async Task<Product> GetProductAsync(int id)
        {
            return await _context.Products.Include(p => p.Supplier).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task SaveProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task PutProductAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(Product product)
        {
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ProductExistsAsync(int id)
        {
            return await _context.Products.AnyAsync(s => s.Id == id);
        }
    }
}