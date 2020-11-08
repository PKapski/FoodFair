using Microsoft.EntityFrameworkCore.Migrations;

namespace FoodFair.Migrations
{
    public partial class MinQuantityRename : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MinQuantity",
                table: "Products");

            migrationBuilder.AddColumn<double>(
                name: "SingleStockQuantity",
                table: "Products",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SingleStockQuantity",
                table: "Products");

            migrationBuilder.AddColumn<double>(
                name: "MinQuantity",
                table: "Products",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
