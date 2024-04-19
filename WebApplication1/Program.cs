using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApplication1;
using WebApplication1.Repository;

var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddScoped<SQLRepository>(); // AddScoped or appropriate lifetime
//// Add services to the container.
//builder.Services.AddScoped<SQLRepoCommunities>(); // AddScoped or appropriate lifetime

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
});

builder.Services.AddScoped(typeof(IClientsRepository<>), typeof(SQLClientsRepository<>));
builder.Services.AddScoped(typeof(IAccountsRepository<>), typeof(SQLAccountsRepository<>));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
    {
        builder.WithOrigins("https://master.dfib8zt44au7z.amplifyapp.com/") // Replace with your frontend URL
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors("AllowLocalhost"); // Apply CORS policy

app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    _=endpoints.MapControllers();
});

app.MapControllers();

app.Run();
