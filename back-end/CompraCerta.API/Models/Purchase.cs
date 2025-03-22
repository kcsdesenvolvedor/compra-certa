namespace CompraCerta.API.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public string Status { get; set; } // Pendente, Processando, Aprovada
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Data da compra

        // Propriedade de navegação para os produtos da compra
        public ICollection<PurchaseProduct> PurchaseProducts { get; set; } = new List<PurchaseProduct>();
    }
}
