using System;
using System.ComponentModel;

namespace FoodFair.Models.DTO.Products
{
    public class ProductsSearchParams
    {
        public int? SupplierId { get; set; }
        public bool ShowOnlyAvailable { get; set; }

        public int[] ProductIds { get; set; } = Array.Empty<int>();

    }
}