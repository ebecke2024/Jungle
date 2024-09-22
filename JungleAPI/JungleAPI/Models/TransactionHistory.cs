using System;
using System.Collections.Generic;

namespace JungleAPI.Models;

public partial class TransactionHistory
{
    public int TransId { get; set; }

    public string? Action { get; set; }

    public DateTime? TransactionDate { get; set; }

    public int? CartProductId { get; set; }

    public int? CartCustomerId { get; set; }

    public int? CartPaymentId { get; set; }

    public int? Qty { get; set; }

    public double? ProductTotal { get; set; }

    public virtual Customer? CartCustomer { get; set; }

    public virtual Product? CartProduct { get; set; }
}
