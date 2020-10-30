﻿using System.Collections.Generic;
 using System.Linq;
 using FoodFair.Contexts;
 using FoodFair.Models;
 using Microsoft.AspNetCore.Mvc;
 using Microsoft.EntityFrameworkCore;

 namespace FoodFair.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly FairDbContext _context;

        public SupplierController(FairDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Supplier>> GetSuppliers()
        {
            return Ok(_context.Suppliers.Include(x=>x.Products));
        }

        [HttpGet("{id}")]
        public ActionResult<Supplier> GetSupplierDetails(int id)
        {
            var supplier = _context.Suppliers.Include(s=>s.Products).FirstOrDefault(x => x.Id == id);

            if (supplier == null)
            {
                return NotFound();
            }

            return supplier;
        }
        
        [HttpPost]
        public ActionResult<Supplier> PostSupplier(Supplier supplier)
        {
            _context.Suppliers.Add(supplier);
            _context.SaveChanges();

            return CreatedAtAction("GetSupplierDetails", new {id = supplier.Id}, supplier);
        }

        [HttpPut("{id}")]
        public ActionResult PutSupplier(int id, Supplier supplier)
        {
            if (id != supplier.Id)
            {
                return BadRequest();
            }

            _context.Entry(supplier).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteSupplier(int id)
        {
            var supplier = _context.Suppliers.Find(id);
            if (supplier == null)
            {
                return NotFound();
            }

            _context.Suppliers.Remove(supplier);
            _context.SaveChanges();

            return NoContent();
        }
    }
}