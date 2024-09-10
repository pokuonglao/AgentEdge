using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class property : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           // Drop the old 'properties' table if it exists
            migrationBuilder.DropTable(
                name: "properties",
                schema: "public" // If applicable, specify schema    
            );
            
            migrationBuilder.CreateTable(
                name: "properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false),
                    Beds = table.Column<int>(type: "integer", nullable: false),
                    Baths = table.Column<int>(type: "integer", nullable: false),
                    SquareFeet = table.Column<int>(type: "integer", nullable: false),
                    LotSize = table.Column<int>(type: "integer", nullable: false),
                    ImageUrls = table.Column<List<string>>(type: "text[]", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_properties", x => x.Id);
                });

                    // Drop the old ImageUrls column (if it existed as a string)
                migrationBuilder.DropColumn(
                    name: "ImageUrls",
                    table: "properties");

                // Add the new ImageUrls column as a List<string>
                migrationBuilder.AddColumn<List<string>>(
                    name: "ImageUrls",
                    table: "properties",
                    type: "text[]",
                    nullable: false,
                    defaultValue: new List<string>());
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "accounts");

            migrationBuilder.DropTable(
                name: "clients");

            migrationBuilder.DropTable(
                name: "properties");
        }
    }
}
