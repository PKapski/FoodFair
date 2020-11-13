using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using FoodFair.Models.DTO.Products;
using FoodFair.Models.Entities;
using FoodFair.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FoodFair.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        private readonly IMapper _mapper;

        public ProductsController(IProductService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductListDTO>>> GetProducts([FromQuery] ProductsSearchParams searchParams)
        {
            var products = await _service.GetAllProductsAsync(searchParams);
            return Ok(_mapper.Map<IEnumerable<Product>, IEnumerable<ProductListDTO>>(products));
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
        [Authorize]
        public async Task<ActionResult<ProductDetailsDTO>> PostProduct(ProductPostDTO productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _service.SaveProductAsync(product);
            return CreatedAtAction(nameof(GetProductDetails), new {id = product.Id}, _mapper.Map<ProductDetailsDTO>(product));
        }

        [HttpPut("{id}")]
        [Authorize]
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
            await _service.PutProductAsync(product);

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _service.GetProductAsync(id);
            if (product == null)
                return NotFound();
            
            await _service.DeleteProductAsync(product);

            return NoContent();
        }
    }
}