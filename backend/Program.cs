using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using WebApplication1;
using WebApplication1.Repository;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQLConnection"));
});

builder.Services.AddScoped(typeof(IClientsRepository<>), typeof(SQLClientsRepository<>));
builder.Services.AddScoped(typeof(IAccountsRepository<>), typeof(SQLAccountsRepository<>));
builder.Services.AddScoped(typeof(IPropertiesRepository<>), typeof(SQLPropertiesRepository<>));

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontendAndLocalhost", policy =>
    {
        policy.WithOrigins(
            "https://master.dfib8zt44au7z.amplifyapp.com",
            "http://localhost:5173",
            "http://localhost:5000",
            "https://www.pokuonglao.com",
            "https://d129impgfwqu0k.cloudfront.net"
        )
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials();
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
app.UseCors("AllowFrontendAndLocalhost"); // Apply CORS policy

app.UseAuthorization();


app.UseEndpoints(endpoints =>
{
    _=endpoints.MapControllers();
});

app.MapControllers();

app.Run();
