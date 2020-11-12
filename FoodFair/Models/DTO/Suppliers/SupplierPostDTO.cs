using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using FoodFair.Models.DTO.Products;

namespace FoodFair.Models.DTO.Suppliers
{
    public class SupplierPostDTO
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
            
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
        public int? ImageId { get; set; }
        public List<ProductPostDTO> Products { get; set; }
        
        [Required]
        public string Password { get; set; }
    }
}