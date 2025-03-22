using CompraCerta.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompraCerta.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("GetProducts")]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var products = await _context.Products.ToListAsync();
                if (products == null)
                {
                    return NotFound();
                }
                return Ok(new { Products = products });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpGet("GetProducts/{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(new { Product = product });
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct(AddProductModel model)
        {
            var product = new Product
            {
                Name = model.Name,
                Description = model.Description,
                Image = model.Image,
                Price = model.Price
            };
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Produto cadastrado com sucesso!" });
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct(Product product)
        {
            var productDb = await _context.Products.FindAsync(product.Id);
            if (productDb == null)
            {
                return NotFound();
            }
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Produto atualizado com sucesso!" });
        }

        [HttpDelete("DeleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok(new { Message = "Produto deletado com sucesso!" });
        }
    }
}
