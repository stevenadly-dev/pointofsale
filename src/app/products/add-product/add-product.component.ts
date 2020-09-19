import { ProductsService } from "./../products.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.css"],
})
export class AddProductComponent implements OnInit {
  categories;
  constructor(private ProductsService: ProductsService) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.ProductsService.pushProduct();
  }
  getAllCategories() {
    this.categories = this.ProductsService.getCategories();
    console.log(this.categories);
  }
}
