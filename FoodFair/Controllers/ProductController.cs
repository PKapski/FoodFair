using System.Collections.Generic;
using System.Linq;
using FoodFair.Contexts;
using FoodFair.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly FairDbContext _context;

        public ProductController(FairDbContext context)
        {
            _context = context;
        }
        
        
        [HttpGet]
        public ActionResult<IEnumerable<Product>> GetProducts()
        {
            return Ok(_context.Products.Include(p => p.Supplier));
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProductDetails(int id)
        {
            var product = _context.Products.Include(p=>p.Supplier).FirstOrDefault(x => x.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }
        
        [HttpPost]
        public ActionResult<Product> PostProduct(Product product)
        {
            product.Supplier = null;
            if (!_context.Suppliers.Any(s => s.Id == product.SupplierId))
            {
                return BadRequest("Supplier with given Id doesn't exist");
            }
            _context.Products.Add(product);
            _context.SaveChanges();

            return CreatedAtAction("GetProductDetails", new {id = product.Id}, product);
        }

        [HttpPut("{id}")]
        public ActionResult PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteProduct(int id)
        {
            var product = _context.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            _context.SaveChanges();

            return NoContent();
        }
    }
}