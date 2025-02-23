using Microsoft.EntityFrameworkCore;
using PessoaAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Adicione esta linha para registrar os controladores (plural):
builder.Services.AddControllers(); // ❌ Erro comum: AddController (singular)

// Configure o banco de dados:
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseCors(policy => policy
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

app.UseAuthorization();
app.MapControllers();
app.Run();

// Configure o CORS (se necessário):
app.UseCors(policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

// Configure o roteamento e mapeamento dos controladores:
app.UseRouting();
app.MapControllers(); // ✅ Mapeia as rotas dos controladores

app.Run();