using CompraCerta.API.Models;
using CompraCerta.API.WebSocket;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace CompraCerta.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PurchaseHubController : ControllerBase
    {
        private readonly IHubContext<PurchaseHub> _hubContext;

        public PurchaseHubController(IHubContext<PurchaseHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpPost("NotifyPurchaseStatus")]
        public async Task<IActionResult> NotifyPurchaseStatus(Purchase purchase)
        {
            await _hubContext.Clients.All.SendAsync("PurchaseStatusChanged", purchase.Id, purchase.Status);
            return Ok();
        }
    }
}
