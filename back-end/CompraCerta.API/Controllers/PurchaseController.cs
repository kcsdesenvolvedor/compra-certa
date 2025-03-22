// CompraCerta.API/Controllers/PurchaseController.cs
using CompraCerta.API.DTOs;
using CompraCerta.API.Models;
using MassTransit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CompraCerta.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PurchaseController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IBus _bus;

    public PurchaseController(AppDbContext context, IBus bus)
    {
        _context = context;
        _bus = bus;
    }

    [HttpGet("GetPurchases")]
    public async Task<IActionResult> GetPurchases()
    {
        try
        {
            var purchases = await _context.Purchases
            .Include(p => p.PurchaseProducts)
            .ThenInclude(pp => pp.Product)
            .Select(p => new PurchaseDto
            {
                Id = p.Id,
                Status = p.Status,
                CreatedAt = p.CreatedAt,
                PurchaseProducts = p.PurchaseProducts.Select(pp => new PurchaseProductDto
                {
                    ProductId = pp.ProductId,
                    Quantity = pp.Quantity,
                    Product = new ProductDto
                    {
                        Id = pp.Product.Id,
                        Name = pp.Product.Name,
                        Image = pp.Product.Image,
                        Description = pp.Product.Description,
                        Price = pp.Product.Price
                    }
                }).ToList()
            })
            .ToListAsync();

            return Ok(purchases);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpGet("GetPurchases/{id}")]
    public async Task<IActionResult> GetPurchase(int id)
    {
        try
        {
            var purchase = await _context.Purchases
            .Include(p => p.PurchaseProducts)
            .ThenInclude(pp => pp.Product)
            .Select(p => new PurchaseDto
            {
                Id = p.Id,
                Status = p.Status,
                CreatedAt = p.CreatedAt,
                PurchaseProducts = p.PurchaseProducts.Select(pp => new PurchaseProductDto
                {
                    ProductId = pp.ProductId,
                    Quantity = pp.Quantity,
                    Product = new ProductDto
                    {
                        Id = pp.Product.Id,
                        Name = pp.Product.Name,
                        Image = pp.Product.Image,
                        Description = pp.Product.Description,
                        Price = pp.Product.Price
                    }
                }).ToList()
            })
            .FirstOrDefaultAsync(p => p.Id == id);

            if (purchase == null)
                return NotFound();

            return Ok(purchase);
        }
        catch (Exception ex)
        {
            return BadRequest(new { Error = ex.Message });
        }
    }

    [HttpPost("AddPurchase")]
    public async Task<IActionResult> AddPurchase([FromBody] PurchaseResquest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        // Cria a compra
        var purchase = new Purchase
        {
            Status = "Pendente",
            CreatedAt = DateTime.UtcNow
        };

        // Adiciona os produtos à compra
        foreach (var item in request.Items)
        {
            var product = await _context.Products.FindAsync(item.ProductId);
            if (product == null)
                return NotFound($"Produto com ID {item.ProductId} não encontrado.");

            purchase.PurchaseProducts.Add(new PurchaseProduct
            {
                ProductId = item.ProductId,
                Quantity = item.Quantity
            });
        }

        // Salva a compra no banco de dados
        _context.Purchases.Add(purchase);
        await _context.SaveChangesAsync();

        // Publicar a mensagem no RabbitMQ
        await _bus.Publish(new PurchaseMessage { PurchaseId = purchase.Id });

        return Ok(new { Message = "Compra efetuada com sucesso!" });
    }
}