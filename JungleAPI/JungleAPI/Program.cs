using JungleAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policySetup =>
{
    policySetup.AddDefaultPolicy(rules =>
    {
        rules.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

//Register JungleContext with DI
var connectionString = builder.Configuration.GetConnectionString("JungleContext");
//This statment has registered JungleContext as our service for DI
// 1. AddDbContext registers JungleContext as a scoped service
// 2. This uses SQL Server as a database
// 3. The configuration is read from the connection string
// 4. Scoped service - services are created once per request
builder.Services.AddDbContext<JungleContext>(options =>
    options.UseSqlServer(connectionString));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}





app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
