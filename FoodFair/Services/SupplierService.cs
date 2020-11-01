using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly FoodFairDbContext _context;

        public SupplierService(FoodFairDbContext context)
        {
            _context = context;
        }
        
        public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> GetSupplierAsync(int id)
        {
            return await _context.Suppliers.Include(s => s.Products).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task SaveSupplierAsync(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
        }

        public async Task PutSupplierAsync(int id, Supplier supplier)
        {
            _context.Entry(supplier).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSupplierAsync(Supplier supplier)
        {
            _context.Suppliers.Remove(supplier);
            await _context.SaveChangesAsync();
        }
        
        public async Task<bool> SupplierExistsAsync(int id)
        {
            return await _context.Suppliers.AnyAsync(s=>s.Id == id);
        }
    }
}