using AutoMapper;
using FoodFair.Models.DTO.Products;
using FoodFair.Models.DTO.Suppliers;
using FoodFair.Models.Entities;

namespace FoodFair.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<SupplierPostDTO, Supplier>();
            CreateMap<ProductPostDTO, Product>();

            CreateMap<Supplier, SupplierDetailsDTO>();
            CreateMap<Product, ProductDetailsDTO>();

            CreateMap<Product, ProductListDTO>();
        }
    }
}