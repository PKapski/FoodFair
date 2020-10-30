using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace FoodFair.Models
{
    public class Image
    {
        public int Id { get; set; }
        public byte[] Data { get; set; }

        [NotMapped]
        [Required]
        public IFormFile FormFile { get; set; }
    }
}