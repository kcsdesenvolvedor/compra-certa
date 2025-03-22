# Compra Certa

**O Compra Certa é um sistema de e-commerce, desenvolvido para gerenciar o processamento de pedidos de forma eficiente e escalável. O projeto é composto por três partes principais: um front-end desenvolvido com Next.js, uma API em .NET que gerencia as requisições e integrações, e um Consumer que processa as compras em segundo plano usando RabbitMQ. Além disso, o sistema utiliza WebSocket (SignalR) para atualizações em tempo real no front-end.

---

## Tecnologias Utilizadas

1. Front-End (Next.js)
 - Next.js: Framework React para construção de interfaces modernas e performáticas.

 - Tailwind CSS: Biblioteca de estilização utilitária para criar interfaces responsivas.

 - React Icons: Biblioteca de ícones para melhorar a experiência do usuário.

 - Axios: Cliente HTTP para consumir a API.

 - SignalR: Biblioteca para comunicação em tempo real via WebSocket.

2. Back-End (API .NET)
 - .NET 8.0: Framework para construção de APIs robustas e escaláveis.

 - Entity Framework Core: ORM para gerenciamento do banco de dados.

 - RabbitMQ: Sistema de mensageria para processamento assíncrono de pedidos.

 - SQL Server: Banco de dados relacional para armazenamento de produtos e compras.

 - SignalR: Biblioteca para comunicação em tempo real com o front-end.

3. Consumer (.NET)
 - .NET 8.0: Framework para processamento em segundo plano.

 - MassTransit: Biblioteca para integração com RabbitMQ.

 - Entity Framework Core: ORM para atualização do banco de dados.

 - SignalR: Biblioteca para notificar o front-end sobre atualizações de status.

---

## Funcionalidades
Front-End (Next.js)
 - Listagem de Produtos: Exibe uma lista de produtos disponíveis para compra.

 - Carrinho de Compras: Permite adicionar, remover e atualizar a quantidade de produtos no carrinho.

 - Processamento de Compras: Envia a compra para a API e exibe o status em tempo real.

 - Atualização em Tempo Real: Utiliza WebSocket (SignalR) para receber atualizações de status das compras sem necessidade de recarregar a página.

Back-End (API .NET)
 - Cadastro de Produtos: Disponibiliza uma lista de produtos para o front-end.

 - Processamento de Compras: Recebe as requisições de compra e as envia para uma fila no RabbitMQ.

 - Listagem de Compras: Disponibiliza a lista de compras realizadas para o front-end.

 - Integração com SignalR: Notifica o front-end sobre mudanças de status das compras.

Consumer (.NET)
 - Processamento de Compras: Consome as solicitações de compra da fila do RabbitMQ.

 - Atualização de Status: Simula o processamento do pagamento e atualiza o status da compra no banco de dados.

 - Notificação em Tempo Real: Utiliza SignalR para notificar o front-end sobre as mudanças de status.

---

## Fluxo do Sistema
1. Front-End:

 - O usuário seleciona produtos e realiza uma compra.

 - A compra é enviada para a API.

2. API:

 - Recebe a compra e a envia para uma fila no RabbitMQ.

 - Disponibiliza a lista de produtos e compras para o front-end.

3. Consumer:

 - Consome as compras da fila do RabbitMQ.

 - Processa a compra (simula o pagamento) e atualiza o status no banco de dados.

 - Notifica o front-end sobre a mudança de status via SignalR.

4. Front-End:

 - Recebe as atualizações de status em tempo real e exibe ao usuário.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor (SSR) e geração de páginas estáticas (SSG).
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva.
- **Axios**: Para fazer requisições HTTP à API do TMDB.
- **React Modal**: Para exibir os detalhes dos filmes em um modal.
- **TypeScript**: Para tipagem estática e melhor segurança do código.
- **React Icons**: Para ícones de redes sociais no rodapé.

---

Como Executar o Projeto
Pré-requisitos
 - .NET 8.0 SDK: Para executar a API e o Consumer.

 - Node.js: Para executar o front-end.

 - Docker: Para executar o RabbitMQ e o SQL Server em contêineres.

Passos para Execução
1. Banco de Dados e RabbitMQ:

 - Execute o SQL Server e o RabbitMQ usando Docker:
   ```bash
   docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456789" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2022-latest
   docker run -d --hostname rabbitmq --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management

2. API:
 - Navegue até a pasta da API:
   ```bash
   cd compra-certa/back-end/CompraCerta.API
 - Restaure as dependências e execute o projeto:
   ```bash
   dotnet restore
   dotnet run

3. Consumer:
 - Navegue até a pasta do Consumer:
   ```bash
   cd compra-certa/back-end/CompraCerta.Consumer
 - Restaure as dependências e execute o projeto:
   ```bash
   dotnet restore
   dotnet run

4, Front-End:
 - Navegue até a pasta do front-end:
   ```bash
   cd compra-certa/front-end
 - Instale as dependências e execute o projeto:
   ```bash
   npm install
   npm run dev

---

## Vídeo demostrativo

![2025-03-22 17-42-32 (online-video-cutter com)](https://github.com/user-attachments/assets/fa280d59-db05-45b7-8009-b0abc70fd529)

