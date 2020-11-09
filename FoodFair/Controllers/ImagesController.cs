using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController: ControllerBase
    {
        private readonly FoodFairDbContext _context;

        public ImagesController(FoodFairDbContext context)
        {
            _context = context;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Image>>> GetImages()
        {
            return await _context.Images.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<byte[]>> GetImageDetails(int id)
        {
            var image = await _context.Images.FindAsync(id);

            if (image == null)
            {
                return NotFound();
            }

            return image.Data;
        }
        
        [HttpPost]
        public async Task<ActionResult<int>> PostImage([FromForm] IFormFile formFile)
        {
            Image image = new Image(formFile);
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return Ok(image.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>  PutImage(int id, Image image)
        {
            if (id != image.Id)
            {
                return BadRequest();
            }

            _context.Entry(image).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}