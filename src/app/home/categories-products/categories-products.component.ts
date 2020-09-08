import { Component, OnInit } from "@angular/core";
import { category } from "src/app/shared/models/category.model";
import { MainHomeService } from "../main-home.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-categories-products",
  templateUrl: "./categories-products.component.html",
  styleUrls: ["./categories-products.component.css"],
})
export class CategoriesProductsComponent implements OnInit {
  categoriesProducts: category[];
  inputSearch: string = "";
  inputSearchSubscription: Subscription;
  constructor(private MainHomeService: MainHomeService) {}

  getInputSearh() {
    this.inputSearchSubscription = this.MainHomeService.searchInputChanged.subscribe(
      (res) => {
        this.inputSearch = res;
        debugger;
      }
    );
  }
  ngOnInit(): void {
    this.categoriesProducts = this.MainHomeService.returnAllCategories();
    console.log(this.categoriesProducts);
    this.getInputSearh();
  }
  ngOnDestroy(): void {
    this.inputSearchSubscription.unsubscribe();
  }
}
