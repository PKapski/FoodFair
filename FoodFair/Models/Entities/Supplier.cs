﻿using System.Collections.Generic;

namespace FoodFair.Models.Entities
{
    public class Supplier
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public string Email { get; set; }
        
        public string PhoneNumber { get; set; }

        public int? ImageId { get; set; }
        public List<Product> Products { get; set; }
    }
}