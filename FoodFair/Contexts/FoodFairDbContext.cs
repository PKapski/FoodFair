using FoodFair.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Contexts
{
    public class FoodFairDbContext : DbContext
    {
        public FoodFairDbContext(
            DbContextOptions options) : base(options)
        {
        }

        public DbSet<Supplier> Suppliers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Image> Images { get; set; }

        // protected override void OnModelCreating(ModelBuilder builder)
        // {
        //     // builder.Entity<Product>()
        //     //     .HasOne(p => p.Supplier)
        //     //     .WithMany(s => s.Products);
        // }
    }
}