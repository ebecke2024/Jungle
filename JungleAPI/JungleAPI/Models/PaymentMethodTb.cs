using System;
using System.Collections.Generic;

namespace JungleAPI.Models;

public partial class PaymentMethodTb
{
    public int PmId { get; set; }

    public string PmCardNumber { get; set; } = null!;

    public string PmName { get; set; } = null!;

    public int PmCvv { get; set; }

    public DateOnly PmExpDate { get; set; }

    public int? PmCustomerId { get; set; }

    public virtual ICollection<CartTb> CartTbs { get; set; } = new List<CartTb>();

    public virtual Customer? PmCustomer { get; set; }
}
