namespace CompraCerta.API.DTOs
{
    public class PurchaseDto
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<PurchaseProductDto> PurchaseProducts { get; set; } = new();
    }
}
