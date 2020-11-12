using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Exceptions;
using FoodFair.Models.DTO.Auth;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly FoodFairDbContext _context;
        private readonly IAuthService _authService;

        public SupplierService(FoodFairDbContext context, IAuthService authService)
        {
            _context = context;
            _authService = authService;
        }
        
        public async Task<IEnumerable<Supplier>> GetSuppliersAsync()
        {
            return await _context.Suppliers.ToListAsync();
        }

        public async Task<Supplier> GetSupplierAsync(int id)
        {
            return await _context.Suppliers.Include(s => s.Products).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task CreateSupplierAsync(Supplier supplier, string password)
        {
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Suppliers.Any(s => s.Email == supplier.Email || s.Name == supplier.Name))
                throw new AppException("SupplierName or Email already taken!");

            _authService.CreatePasswordHash(password, out var passwordHash, out var passwordSalt);

            supplier.PasswordHash = passwordHash;
            supplier.PasswordSalt = passwordSalt;
            
            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();
        }
        
        public object LoginAndGetResponseWithToken(LoginCredentials loginCredentials)
        {
            var supplier = _context.Suppliers.SingleOrDefault(x => x.Email == loginCredentials.Email);

            if (supplier == null || 
                !_authService.Authenticate(loginCredentials.Email, loginCredentials.Password, supplier.PasswordHash, supplier.PasswordSalt))
            {
                return null;
            }
            
            return new
            {
                supplierId=supplier.Id,
                supplierName=supplier.Name,
                accessToken = _authService.GenerateJwtToken(supplier.Id)
            };
        }

        public async Task PutSupplierAsync(int id, Supplier supplier, string newPassword)
        {
            if (string.IsNullOrEmpty(newPassword))
            {
                var oldSupplier = await _context.Suppliers.FindAsync(id);
                supplier.PasswordHash = oldSupplier.PasswordHash;
                supplier.PasswordSalt = oldSupplier.PasswordSalt;
                _context.Entry(oldSupplier).State = EntityState.Detached;
            }
            else
            {
                _authService.CreatePasswordHash(newPassword,out var passwordHash, out var passwordSalt);
                supplier.PasswordHash = passwordHash;
                supplier.PasswordSalt = passwordSalt;
            }
            
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