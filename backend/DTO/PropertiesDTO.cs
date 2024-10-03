using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace WebApplication1.DTO
{
    public class PropertiesDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public decimal Price { get; set; }
        public int Beds {get;set;}
        public int Baths {get;set;}
        public int SquareFeet {get;set;}
        public int LotSize {get;set;}
        public IFormFile? ImageFile {get; set;}

    }

    public class PropertiesUpdateDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public decimal Price { get; set; }
        public int Beds {get;set;}
        public int Baths {get;set;}
        public int SquareFeet {get;set;}
        public int LotSize {get;set;}
        public IFormFile? ImageFile {get; set;}

        public string? PropertyImage {get; set;}

    }
}
