using System.Collections.Generic;
using System.Threading.Tasks;
using FoodFair.Contexts;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FoodFair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController: ControllerBase
    {
        private readonly IImageService _service;

        public ImagesController(IImageService service)
        {
            _service = service;
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<byte[]>> GetImageDetails(int id)
        {
            var image = await _service.GetImageAsync(id);

            if (image == null)
                return NotFound();

            return image.Data;
        }
        
        [HttpPost]
        public async Task<ActionResult<int>> PostImage([FromForm] IFormFile formFile)
        {
            var image = new Image(formFile);
            await _service.SaveImageAsync(image);

            return Ok(image.Id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult>  PutImage(int id, [FromForm] IFormFile formFile)
        {
            var image = new Image(formFile);
            if (await _service.ImageExistsAsync(id))
            {
                image.Id = id;
                await _service.PutImageAsync(image);
                return NoContent();
            }

            return NotFound();
        }
    }
}