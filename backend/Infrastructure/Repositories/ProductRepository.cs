using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;
        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Product> GetByIdAsync(int id) => await _context.Products.FindAsync(id);
        public async Task<List<Product>> GetAllAsync() => await _context.Products.ToListAsync();
        public async Task AddAsync(Product product) => await _context.Products.AddAsync(product);
        public async Task UpdateAsync(Product product) => _context.Products.Update(product);
        public async Task DeleteAsync(int id)
        {
            var product = await GetByIdAsync(id);
            if (product != null) _context.Products.Remove(product);            
        }
        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
    }

    public interface IProductRepository
    {
        Task<Product> GetByIdAsync(int id);
        Task<List<Product>> GetAllAsync();
        Task AddAsync(Product product);
        Task UpdateAsync(Product product);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
    }
}
