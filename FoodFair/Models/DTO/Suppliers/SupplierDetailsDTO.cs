using System.Collections.Generic;
using FoodFair.Models.DTO.Products;

namespace FoodFair.Models.DTO.Suppliers
{
    public class SupplierDetailsDTO
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }

        public int? ImageId { get; set; }
        
        public List<ProductDetailsDTO> Products { get; set; }
    }
}