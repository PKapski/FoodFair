using System.IO;
using Microsoft.AspNetCore.Http;

namespace FoodFair.Models.Entities
{
    public class Image
    {
        public Image()
        {
        }

        public Image(IFormFile formFile)
        {
            using var memoryStream = new MemoryStream();
            formFile.CopyTo(memoryStream);
            Data = memoryStream.ToArray();
            FileName = formFile.FileName;
        }

        public int Id { get; set; }
        public byte[] Data { get; set; }
        public string FileName { get; set; }
    }
}