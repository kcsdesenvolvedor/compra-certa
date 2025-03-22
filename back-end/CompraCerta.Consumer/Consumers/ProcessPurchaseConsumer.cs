// CompraCerta.Consumer/Consumers/ProcessPurchaseConsumer.cs
using CompraCerta.API.Models;
using CompraCerta.API.WebSocket;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using System.Net.Http.Headers;
using System.Net.Http.Json;

namespace CompraCerta.Consumer.Consumers;

public class ProcessPurchaseConsumer : IConsumer<PurchaseMessage>
{
    private readonly AppDbContext _context;
    private readonly IHubContext<PurchaseHub> _hubContext;

    public ProcessPurchaseConsumer(AppDbContext context, IHubContext<PurchaseHub> hubContext)
    {
        _context = context;
        _hubContext = hubContext;
    }

    public async Task Consume(ConsumeContext<PurchaseMessage> context)
    {
        var purchase = await _context.Purchases.FindAsync(context.Message.PurchaseId);
        if (purchase == null) return;

        await Task.Delay(10000); // Simula 10 segundos de compra pendente

        // Simular processamento do pagamento
        purchase.Status = "Processando";
        await _context.SaveChangesAsync();
        await NotifyPurchaseStatusInAPI(purchase);

        await Task.Delay(15000); // Simula 15 segundos de processamento

        // Atualizar o status para "Aprovada"
        purchase.Status = "Aprovada";
        await _context.SaveChangesAsync();
        await NotifyPurchaseStatusInAPI(purchase);
    }

    private async Task NotifyPurchaseStatusInAPI(Purchase purchase)
    {
        HttpClient cliente = new()
        {
            BaseAddress = new Uri("http://localhost:5062/")
        };
        cliente.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        await cliente.PostAsJsonAsync("api/PurchaseHub/NotifyPurchaseStatus", purchase);
    }
}