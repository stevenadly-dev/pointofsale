import { category } from "./../../shared/models/category.model";
import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../products.service";

@Component({
  selector: "app-all-products",
  templateUrl: "./all-products.component.html",
  styleUrls: ["./all-products.component.css"],
})
export class AllProductsComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
