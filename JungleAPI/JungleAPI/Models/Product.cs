using System;
using System.Collections.Generic;

namespace JungleAPI.Models;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductName { get; set; } = null!;

    public string? ProductCategory { get; set; }

    public double? ProductPrice { get; set; }

    public int? Inventory { get; set; }

    public string? Images { get; set; }

    public virtual ICollection<CartTb> CartTbs { get; set; } = new List<CartTb>();

    public virtual ICollection<TransactionHistory> TransactionHistories { get; set; } = new List<TransactionHistory>();
}
