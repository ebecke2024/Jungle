using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using JungleAPI.Models;

namespace JungleAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly JungleContext _context;

        public CartController(JungleContext context)
        {
            _context = context;
        }

        // GET: api/Cart
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CartTb>>> GetCartTbs()
        {
            return await _context.CartTbs.ToListAsync();
        }

        // GET: api/Cart/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CartTb>> GetCartTb(int id)
        {
            var cartTb = await _context.CartTbs.FindAsync(id);

            if (cartTb == null)
            {
                return NotFound();
            }

            return cartTb;
        }

        // PUT: api/Cart/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCartTb(int id, CartTb cartTb)
        {
            if (id != cartTb.CartId)
            {
                return BadRequest();
            }

            _context.Entry(cartTb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartTbExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Cart
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<CartTb>> PostCartTb(CartTb cartTb)
        {
            _context.CartTbs.Add(cartTb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCartTb", new { id = cartTb.CartId }, cartTb);
        }

        // DELETE: api/Cart/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCartTb(int id)
        {
            var cartTb = await _context.CartTbs.FindAsync(id);
            if (cartTb == null)
            {
                return NotFound();
            }

            _context.CartTbs.Remove(cartTb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartTbExists(int id)
        {
            return _context.CartTbs.Any(e => e.CartId == id);
        }
    }
}
