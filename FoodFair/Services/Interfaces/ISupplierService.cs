using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Models.Entities;

namespace FoodFair.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<IEnumerable<Supplier>> GetAllSuppliersAsync();
        Task<Supplier> GetSupplierAsync(int id);
        Task SaveSupplierAsync(Supplier supplier);
        Task PutSupplierAsync(int id, Supplier supplier);
        Task DeleteSupplierAsync(Supplier supplier);
        Task<bool> SupplierExistsAsync(int id);
    }
}