namespace CompraCerta.API.Models
{
    public class PurchaseResquest
    {
        public List<PurchaseItem> Items { get; set; }
    }

    public class PurchaseItem
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
