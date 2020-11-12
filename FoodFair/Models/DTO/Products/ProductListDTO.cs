using System;
using FoodFair.Models.Enums;

namespace FoodFair.Models.DTO.Products
{
    public class ProductListDTO
    {
        public int Id { get; set; }

        public string SupplierName { get; set; }

        public string Name { get; set; }
        public int? ImageId { get; set; }
        public double SingleStockQuantity { get; set; }
        public QuantityUnit QuantityUnit { get; set; }
        public double TotalQuantity { get; set; }
        public double Price { get; set; }
        public Currency Currency { get; set; }
        public ProductCategory Category { get; set; }
    }
}