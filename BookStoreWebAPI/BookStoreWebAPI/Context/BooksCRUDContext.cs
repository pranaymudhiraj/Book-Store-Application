using BookStoreWebAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStoreWebAPI.Context
{
    public class BooksCRUDContext : DbContext
    {
        public BooksCRUDContext(DbContextOptions<BooksCRUDContext> options) : base(options)
        {

        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Cart> Carts { get; set; }
    }
}
