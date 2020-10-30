using FoodFair.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace FoodFair.Contexts
{
    public class FairDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public FairDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
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