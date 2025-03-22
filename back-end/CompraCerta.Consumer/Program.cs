using CompraCerta.Consumer.Consumers;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = Host.CreateApplicationBuilder(args);

var connectionString = "Server=localhost,1433;Database=CompraCerta;User Id=sa;Password=123456789;TrustServerCertificate=True;";

// Configurar o banco de dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// Registrar o SignalR
builder.Services.AddSignalR();

// Configurar o MassTransit com RabbitMQ
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<ProcessPurchaseConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ReceiveEndpoint("purchase-queue", e =>
        {
            e.ConfigureConsumer<ProcessPurchaseConsumer>(context);
        });
    });
});

var host = builder.Build();
host.Run();