using Microsoft.EntityFrameworkCore;
using PessoaAPI.Models;

namespace PessoaAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Pessoa> Pessoas { get; set; }
    }
}