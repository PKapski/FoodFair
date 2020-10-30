using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FoodFair.Models
{
    public class Supplier
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public string Email { get; set; }
        
        [Required]
        public string PhoneNumber { get; set; }
        public int? ImageId { get; set; }
        public List<Product> Products { get; set; }
    }
}