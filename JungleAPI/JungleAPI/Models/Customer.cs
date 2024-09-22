using System;
using System.Collections.Generic;

namespace JungleAPI.Models;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string CustName { get; set; } = null!;

    public string CustEmail { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string CustPassWord { get; set; } = null!;

    public virtual ICollection<CartTb> CartTbs { get; set; } = new List<CartTb>();

    public virtual ICollection<PaymentMethodTb> PaymentMethodTbs { get; set; } = new List<PaymentMethodTb>();

    public virtual ICollection<TransactionHistory> TransactionHistories { get; set; } = new List<TransactionHistory>();
}
