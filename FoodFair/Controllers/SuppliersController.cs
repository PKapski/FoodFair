﻿using System.Collections.Generic;
 using System.Security.Principal;
 using System.Threading.Tasks;
 using AutoMapper;
 using FoodFair.Models.DTO.Auth;
 using FoodFair.Models.DTO.Suppliers;
 using FoodFair.Models.Entities;
 using FoodFair.Services.Interfaces;
 using Microsoft.AspNetCore.Authorization;
 using Microsoft.AspNetCore.Mvc;

 namespace FoodFair.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _service;
        private readonly IMapper _mapper;
        

        public SuppliersController(ISupplierService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }
        
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<SupplierDetailsDTO>> Register(SupplierPostDTO supplierDto)
        {
            var supplier = _mapper.Map<Supplier>(supplierDto);
            await _service.CreateSupplierAsync(supplier, supplierDto.Password);
            return CreatedAtAction("GetSupplierDetails", new {id = supplier.Id}, _mapper.Map<SupplierDetailsDTO>(supplier));
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public ActionResult Login(LoginCredentials loginCredentials)
        {
            var responseWithToken = _service.LoginAndGetResponseWithToken(loginCredentials);
            if (responseWithToken == null)
                return BadRequest("Invalid email or password.");

            return Ok(responseWithToken);
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDetailsDTO>>> GetSuppliers()
        {
            var suppliers = await _service.GetSuppliersAsync();
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
        
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(int id, SupplierPutDTO supplierDto)
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

            await _service.PutSupplierAsync(id, supplier, supplierDto.Password);

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