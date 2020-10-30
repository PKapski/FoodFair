using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace FoodFair.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ImageId { get; set; }

    }
}