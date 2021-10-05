using BookStoreWebAPI.Context;
using BookStoreWebAPI.Contracts;
using BookStoreWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookStoreWebAPI.Controllers
{
    [Route("api/[controller]")]  
    [ApiController]
    public class BooksController : ControllerBase
    {
        public readonly ILoggerService _logger;

        private readonly BooksCRUDContext _booksCRUDContext;

        public BooksController(BooksCRUDContext booksCRUDContext,ILoggerService logger)
        {
            _booksCRUDContext = booksCRUDContext;
            _logger = logger;
        }

        // GET: api/<BooksController>
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            _logger.LogInfo("Get Books Called");
            return _booksCRUDContext.Books;
        }

        // GET api/<BooksController>/5
        [HttpGet("{id}")]
        public Book Get(int id)
        {
            _logger.LogInfo("Get Books by ID Called");

            return _booksCRUDContext.Books.SingleOrDefault(x => x.BookID == id);
        }

        // POST api/<BooksController>
        [HttpPost]
        public void Post([FromBody] Book book)
        {
            _logger.LogInfo("Post Books Called");

            _booksCRUDContext.Books.Add(book);
            _booksCRUDContext.SaveChanges();
        }

        // PUT api/<BooksController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Book book)
        {
            _logger.LogInfo("Put Books Called");

            book.BookID = id;
            _booksCRUDContext.Books.Update(book);
            _booksCRUDContext.SaveChanges();
        }

        // DELETE api/<BooksController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var item = _booksCRUDContext.Books.FirstOrDefault(x => x.BookID == id);
            if(item!=null)
            {
                _booksCRUDContext.Books.Remove(item);
                _booksCRUDContext.SaveChanges();
            }
        }
    }
}
