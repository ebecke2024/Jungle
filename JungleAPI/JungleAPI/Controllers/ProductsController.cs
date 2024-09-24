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
    public class ProductsController : ControllerBase
    {
        private readonly JungleContext _context;

        public ProductsController(JungleContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // GET: api/products/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _context.Products
                                           .Select(p => p.ProductCategory)
                                           .Distinct()
                                           .ToListAsync();

            return Ok(categories);
        }

        // GET: api/Products/filter/iPhone
        [HttpGet("/category/{name}")]
        public async Task<ActionResult> GetCategoryProduct(string name)
        {
            // Create a query to filter products
            var query = _context.Products.AsQueryable();

            // Filter by name if provided
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.ProductCategory.Contains(name));
            }

            // Execute the query and return the filtered list of products
            var products = await query.ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found with the selected Category.");
            }

            return Ok(products);

        }


        // GET: api/Products/filter/iPhone
        [HttpGet("/filter/{name}")]
        public async Task<ActionResult> GetFilterProduct(string name)
        {
            // Create a query to filter products
            var query = _context.Products.AsQueryable();

            // Filter by name if provided
            if (!string.IsNullOrEmpty(name))
            {
                query = query.Where(p => p.ProductName.Contains(name));
            }

            // Execute the query and return the filtered list of products
            var products = await query.ToListAsync();

            if (products.Count == 0)
            {
                return NotFound("No products found with the specified criteria.");
            }

            return Ok(products);

        }

        // PUT: api/Products/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.ProductId)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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

        // POST: api/Products
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.ProductId == id);
        }
    }
}
