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
    public class CartsController : ControllerBase
    {

        public readonly ILoggerService _logger;

        private readonly BooksCRUDContext _booksCRUDContext;

        public CartsController(BooksCRUDContext booksCRUDContext, ILoggerService logger)
        {
            _booksCRUDContext = booksCRUDContext;
            _logger = logger;

        }

        // GET: api/<CartsController>
        [HttpGet]
        public IEnumerable<Cart> Get()
        {
            _logger.LogInfo("Get Cart Called");
            return _booksCRUDContext.Carts;
        }

        // GET api/<CartsController>/5
        [HttpGet("{id}")]
        public Cart Get(int id)
        {
            _logger.LogInfo("Get Cart by ID Called");
            return _booksCRUDContext.Carts.SingleOrDefault(x => x.CartBookID == id); ;
        }

        // POST api/<CartsController>
        [HttpPost]
        public void Post([FromBody] Cart cart)
        {
            _logger.LogInfo("Post Cart Called");
            _booksCRUDContext.Carts.Add(cart);
            _booksCRUDContext.SaveChanges();
        }

        // PUT api/<CartsController>/5
        [HttpPut("{id}")]
        public void Put(int id,[FromBody] Cart cart)
        {
            _logger.LogInfo("Post Cart by ID Called");
            cart.CartBookID = id;
            _booksCRUDContext.Carts.Update(cart);
            _booksCRUDContext.SaveChanges();
        }

        // DELETE api/<CartsController>/5
        [HttpDelete]
        public void Delete()
        {
            var item = _booksCRUDContext.Carts.FirstOrDefault(x => x.CartBookID > 0);
            while (item!=null)
            {
                _logger.LogInfo("Delete Cart Called");
                _booksCRUDContext.Carts.Remove(item);
                _booksCRUDContext.SaveChanges();
                item = _booksCRUDContext.Carts.FirstOrDefault(x => x.CartBookID > 0);
            }
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var item = _booksCRUDContext.Carts.FirstOrDefault(x => x.CartBookID == id);
            if (item != null)
            {
                _logger.LogInfo("Delete Cart by ID Called");
                _booksCRUDContext.Carts.Remove(item);
                _booksCRUDContext.SaveChanges();
            }
        }
    }
}
