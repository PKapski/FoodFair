using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FoodFair.Models.DTO.Products;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FoodFair.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IMapper _mapper;

        public ProductController(IProductService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDetailsDTO>>> GetProducts()
        {
            var products = await _service.GetAllProductsAsync();
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ProductDetailsDTO>> GetProductDetails(int id)
        {
            var product = await _service.GetProductAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return _mapper.Map<ProductDetailsDTO>(product);
        }
        
        [HttpPost]
        public async Task<ActionResult<ProductDetailsDTO>> PostProduct(ProductPostDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _service.SaveProductAsync(product);
            return CreatedAtAction("GetProductDetails", new {id = product.Id}, _mapper.Map<ProductDetailsDTO>(product));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, ProductDetailsDTO productDto)
        {
            if (id != productDto.Id)
            {
                return BadRequest();
            }

            if (!await _service.ProductExistsAsync(id))
            {
                return NotFound();
            }

            var product = _mapper.Map<Product>(productDto);
            await _service.PutProductAsync(id, product);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _service.GetProductAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            await _service.DeleteProductAsync(product);

            return NoContent();
        }
    }
}