using Microsoft.EntityFrameworkCore;
using WebApplication1.Entities;

namespace WebApplication1
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Clients> clients { get; set; } 
        public DbSet<Accounts> accounts { get; set; } 
        public DbSet<Properties> properties { get; set; } 
    }
}
