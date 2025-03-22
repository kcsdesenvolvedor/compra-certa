namespace CompraCerta.API.Models
{
    public class PurchaseProduct
    {
        public int PurchaseId { get; set; } // Chave estrangeira para Purchase
        public Purchase Purchase { get; set; } // Propriedade de navegação para Purchase

        public int ProductId { get; set; } // Chave estrangeira para Product
        public Product Product { get; set; } // Propriedade de navegação para Product

        public int Quantity { get; set; } // Quantidade do produto na compra
    }
}
