using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Models.DTO.Auth;
using FoodFair.Models.Entities;

namespace FoodFair.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<IEnumerable<Supplier>> GetSuppliersAsync();
        Task<Supplier> GetSupplierAsync(int id);
        Task CreateSupplierAsync(Supplier supplier, string password);
        Task PutSupplierAsync(int id, Supplier supplier, string newPassword);
        Task DeleteSupplierAsync(Supplier supplier);
        Task<bool> SupplierExistsAsync(int id);
        object LoginAndGetResponseWithToken(LoginCredentials loginCredentials);
    }
}