﻿using System;
using FoodFair.Models.Enums;

namespace FoodFair.Models.Entities
{
    public class Product
    {
        public int Id { get; set; }
        
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        
        public string Name { get; set; }
        public string Description { get; set; }
        public int? ImageId { get; set; }
        public DateTime CreationDate { get; }
        public double TotalQuantity { get; set; }
        public double MinQuantity { get; set; }
        public QuantityUnit QuantityUnit { get; set; }
        public double Price { get; set; }
        public Currency Currency { get; set; }
        public ProductCategory Category { get; set; }
    }
}