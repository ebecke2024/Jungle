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
    public class PaymentMethodController : ControllerBase
    {
        private readonly JungleContext _context;

        public PaymentMethodController(JungleContext context)
        {
            _context = context;
        }

        // GET: api/PaymentMethod
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMethodTb>>> GetPaymentMethodTbs()
        {
            return await _context.PaymentMethodTbs.ToListAsync();
        }

        // GET: api/PaymentMethod/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentMethodTb>> GetPaymentMethodTb(int id)
        {
            var paymentMethodTb = await _context.PaymentMethodTbs.FindAsync(id);

            if (paymentMethodTb == null)
            {
                return NotFound();
            }

            return paymentMethodTb;
        }

        // PUT: api/PaymentMethod/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaymentMethodTb(int id, PaymentMethodTb paymentMethodTb)
        {
            if (id != paymentMethodTb.PmId)
            {
                return BadRequest();
            }

            _context.Entry(paymentMethodTb).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentMethodTbExists(id))
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

        // POST: api/PaymentMethod
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaymentMethodTb>> PostPaymentMethodTb(PaymentMethodTb paymentMethodTb)
        {
            _context.PaymentMethodTbs.Add(paymentMethodTb);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPaymentMethodTb", new { id = paymentMethodTb.PmId }, paymentMethodTb);
        }

        // DELETE: api/PaymentMethod/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethodTb(int id)
        {
            var paymentMethodTb = await _context.PaymentMethodTbs.FindAsync(id);
            if (paymentMethodTb == null)
            {
                return NotFound();
            }

            _context.PaymentMethodTbs.Remove(paymentMethodTb);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaymentMethodTbExists(int id)
        {
            return _context.PaymentMethodTbs.Any(e => e.PmId == id);
        }
    }
}
