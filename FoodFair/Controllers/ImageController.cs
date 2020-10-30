using System.Collections.Generic;
using FoodFair.Contexts;
using FoodFair.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ImageController: ControllerBase
    {
        private readonly FairDbContext _context;

        public ImageController(FairDbContext context)
        {
            _context = context;
        }
        
        
        [HttpGet]
        public ActionResult<IEnumerable<Image>> GetImages()
        {
            return _context.Images;
        }

        [HttpGet("{id}")]
        public ActionResult<Image> GetImageDetails(int id)
        {
            var image = _context.Images.Find(id);

            if (image == null)
            {
                return NotFound();
            }

            return image;
        }
        
        [HttpPost]
        public ActionResult<Image> PostImage(Image image)
        {
            _context.Images.Add(image);
            _context.SaveChanges();

            return CreatedAtAction("GetImageDetails", new {id = image.Id}, image);
        }

        [HttpPut("{id}")]
        public ActionResult PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteImage(int id)
        {
            var image = _context.Images.Find(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            _context.SaveChanges();

            return NoContent();
        }
    }
}