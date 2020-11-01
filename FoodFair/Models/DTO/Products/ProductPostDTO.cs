using System;
using System.ComponentModel.DataAnnotations;
using FoodFair.Models.Enums;

namespace FoodFair.Models.DTO.Products
{
    public class ProductPostDTO
    {
        public int SupplierId { get; set; }
        
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ImageId { get; set; }
        public double TotalQuantity  { get; set; }
        public double MinQuantity  { get; set; }
        
        [Required]
        public QuantityUnit? QuantityUnit { get; set; }
        
        [Range(0.10, 9999.99)]
        public decimal Price { get; set; }
        
        [Required]
        public Currency? Currency { get; set; }
        
        [Required]
        public ProductCategory? Category { get; set; }
    }
}