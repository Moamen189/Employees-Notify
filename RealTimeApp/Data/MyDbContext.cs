using Microsoft.EntityFrameworkCore;
using RealTimeApp.Models;

namespace RealTimeApp.Data
{
   
        public class MyDbContext : DbContext
        {
            public MyDbContext(DbContextOptions<MyDbContext> options)
                : base(options)
            {
            }

            public DbSet<Employee> Employee { get; set; }
            public DbSet<Notification> Notification { get; set; }
        }
    
}
