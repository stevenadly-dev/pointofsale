import { MainHomeService } from "./../../main-home.service";
import { product } from "./../../../shared/models/product.model";
import { Component, OnInit, Input } from "@angular/core";
import { category } from "src/app/shared/models/category.model";

@Component({
  selector: "app-single-category-product",
  templateUrl: "./single-category-product.component.html",
  styleUrls: ["./single-category-product.component.css"],
})
export class SingleCategoryProductComponent implements OnInit {
  @Input() category: category;
  products: product[] = [];
  inputSearch: string = "";
  constructor(public MainHomeService: MainHomeService) {}

  getSearchInput() {
    this.MainHomeService.searchInputChanged.subscribe((res) => {
      this.inputSearch = res;
    });
  }
  ngOnInit(): void {
    this.products = this.category.products;
    this.getSearchInput();
  }
}
