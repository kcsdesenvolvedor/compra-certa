using CompraCerta.API.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Purchase> Purchases { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<PurchaseProduct> PurchaseProducts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuração da relação N:N entre Purchase e Product
        modelBuilder.Entity<PurchaseProduct>()
            .HasKey(pp => new { pp.PurchaseId, pp.ProductId }); // Chave composta

        modelBuilder.Entity<PurchaseProduct>()
            .HasOne(pp => pp.Purchase)
            .WithMany(p => p.PurchaseProducts)
            .HasForeignKey(pp => pp.PurchaseId);

        modelBuilder.Entity<PurchaseProduct>()
            .HasOne(pp => pp.Product)
            .WithMany(p => p.PurchaseProducts)
            .HasForeignKey(pp => pp.ProductId);

        // Configuração da propriedade Price
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasPrecision(18, 2); // Define a precisão e escala
    }
}