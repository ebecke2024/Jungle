using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace JungleAPI.Models;

public partial class JungleContext : DbContext
{
    public JungleContext()
    {
    }

    public JungleContext(DbContextOptions<JungleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<CartTb> CartTbs { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<PaymentMethodTb> PaymentMethodTbs { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<TransactionHistory> TransactionHistories { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        //=> optionsBuilder.UseSqlServer("Server=tcp:cohort-p2-projects-server.database.windows.net,1433;Initial Catalog=Jungle;Persist Security Info=False;User Id=associate;Password=Project@1234;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CartTb>(entity =>
        {
            entity.HasKey(e => e.CartId).HasName("PK__CartTB__2EFCCEBF38A6A269");

            entity.ToTable("CartTB", tb =>
                {
                    tb.HasTrigger("trg_cart");
                    tb.HasTrigger("trg_sub_cart");
                });

            entity.Property(e => e.CartId).HasColumnName("cart_Id");
            entity.Property(e => e.CartCustomerId).HasColumnName("CartCustomerID");
            entity.Property(e => e.CartPaymentId).HasColumnName("CartPaymentID");
            entity.Property(e => e.CartProductId).HasColumnName("CartProductID");

            entity.HasOne(d => d.CartCustomer).WithMany(p => p.CartTbs)
                .HasForeignKey(d => d.CartCustomerId)
                .HasConstraintName("FK_CartCustomerID");

            entity.HasOne(d => d.CartPayment).WithMany(p => p.CartTbs)
                .HasForeignKey(d => d.CartPaymentId)
                .HasConstraintName("FK_payment_id");

            entity.HasOne(d => d.CartProduct).WithMany(p => p.CartTbs)
                .HasForeignKey(d => d.CartProductId)
                .HasConstraintName("FK_CartProductID");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.CustomerId).HasName("PK__Customer__B611CB7D33F8F673");

            entity.ToTable("Customer");

            entity.HasIndex(e => e.CustEmail, "unk_email").IsUnique();

            entity.HasIndex(e => e.CustPassWord, "unk_password").IsUnique();

            entity.HasIndex(e => e.UserName, "unk_userName").IsUnique();

            entity.Property(e => e.CustomerId).HasColumnName("customerId");
            entity.Property(e => e.CustEmail)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cust_email");
            entity.Property(e => e.CustName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cust_name");
            entity.Property(e => e.CustPassWord)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cust_PassWord");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PaymentMethodTb>(entity =>
        {
            entity.HasKey(e => e.PmId).HasName("PK__PaymentM__41237CD2A173AC6F");

            entity.ToTable("PaymentMethodTB");

            entity.Property(e => e.PmId).HasColumnName("pmID");
            entity.Property(e => e.PmCardNumber)
                .IsUnicode(false)
                .HasColumnName("pmCardNumber");
            entity.Property(e => e.PmCustomerId).HasColumnName("pmCustomerID");
            entity.Property(e => e.PmCvv).HasColumnName("pmCVV");
            entity.Property(e => e.PmExpDate).HasColumnName("pmExpDate");
            entity.Property(e => e.PmName)
                .IsUnicode(false)
                .HasColumnName("pmName");

            entity.HasOne(d => d.PmCustomer).WithMany(p => p.PaymentMethodTbs)
                .HasForeignKey(d => d.PmCustomerId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_pmCustomerID");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Products__2D10D16A89D37B74");

            entity.Property(e => e.ProductId).HasColumnName("productId");
            entity.Property(e => e.Images).IsUnicode(false);
            entity.Property(e => e.ProductCategory)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("product_category");
            entity.Property(e => e.ProductName)
                .IsUnicode(false)
                .HasColumnName("product_name");
            entity.Property(e => e.ProductPrice).HasColumnName("product_price");
        });

        modelBuilder.Entity<TransactionHistory>(entity =>
        {
            entity.HasKey(e => e.TransId).HasName("PK__transact__438CAC187C4FC128");

            entity.ToTable("transaction_history");

            entity.Property(e => e.TransId).HasColumnName("trans_id");
            entity.Property(e => e.Action)
                .IsUnicode(false)
                .HasColumnName("action");
            entity.Property(e => e.CartCustomerId).HasColumnName("CartCustomerID");
            entity.Property(e => e.CartPaymentId).HasColumnName("CartPaymentID");
            entity.Property(e => e.CartProductId).HasColumnName("CartProductID");
            entity.Property(e => e.TransactionDate)
                .HasColumnType("datetime")
                .HasColumnName("transactionDate");

            entity.HasOne(d => d.CartCustomer).WithMany(p => p.TransactionHistories)
                .HasForeignKey(d => d.CartCustomerId)
                .HasConstraintName("FK_TranCustomerID");

            entity.HasOne(d => d.CartProduct).WithMany(p => p.TransactionHistories)
                .HasForeignKey(d => d.CartProductId)
                .HasConstraintName("FK_TranProductID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
