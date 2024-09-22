using System;
using System.Collections.Generic;

namespace JungleAPI.Models;

public partial class CartTb
{
    public int CartId { get; set; }

    public int? CartProductId { get; set; }

    public int? CartCustomerId { get; set; }

    public int? CartPaymentId { get; set; }

    public int? Qty { get; set; }

    public double? ProductTotal { get; set; }

    public virtual Customer? CartCustomer { get; set; }

    public virtual PaymentMethodTb? CartPayment { get; set; }

    public virtual Product? CartProduct { get; set; }
}
