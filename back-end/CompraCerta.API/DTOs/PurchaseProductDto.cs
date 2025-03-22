namespace CompraCerta.API.DTOs
{
    public class PurchaseProductDto
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public ProductDto Product { get; set; }
    }
}
