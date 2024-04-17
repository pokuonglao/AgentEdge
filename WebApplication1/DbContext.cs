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

        public DbSet<Clients> clients { get; set; } // DbSet representing the Clients table
        public DbSet<Accounts> accounts { get; set; } 
    }
}
