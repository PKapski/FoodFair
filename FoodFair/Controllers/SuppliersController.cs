﻿using System.Collections.Generic;
 using System.Threading.Tasks;
 using AutoMapper;
 using FoodFair.Models.DTO.Suppliers;
 using FoodFair.Models.Entities;
 using FoodFair.Services.Interfaces;
 using Microsoft.AspNetCore.Mvc;

 namespace FoodFair.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _service;
        private readonly IMapper _mapper;

        public SupplierController(ISupplierService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDetailsDTO>>> GetSuppliers()
        {
            var suppliers = await _service.GetAllSuppliersAsync();
            return Ok(_mapper.Map<IEnumerable<Supplier>, IEnumerable<SupplierDetailsDTO>>(suppliers));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierDetailsDTO>> GetSupplierDetails(int id)
        {
            var supplier = await _service.GetSupplierAsync(id);

            if (supplier == null)
            {
                return NotFound();
            }

            return _mapper.Map<SupplierDetailsDTO>(supplier);
        }
        
        [HttpPost]
        public async Task<ActionResult<SupplierDetailsDTO>> PostSupplier(SupplierPostDTO supplierDto)
        {
            var supplier = _mapper.Map<Supplier>(supplierDto);
            await _service.SaveSupplierAsync(supplier);
            return CreatedAtAction("GetSupplierDetails", new {id = supplier.Id}, _mapper.Map<SupplierDetailsDTO>(supplier));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, SupplierDetailsDTO supplierDto)
        {
            if (id != supplierDto.Id)
            {
                return BadRequest();
            }

            if (!await _service.SupplierExistsAsync(id))
            {
                return NotFound();
            }

            var supplier = _mapper.Map<Supplier>(supplierDto);
            await _service.PutSupplierAsync(id, supplier);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(int id)
        {
            var supplier = await _service.GetSupplierAsync(id);
            if (supplier == null)
            {
                return NotFound();
            }

            await _service.DeleteSupplierAsync(supplier);

            return NoContent();
        }
    }
}