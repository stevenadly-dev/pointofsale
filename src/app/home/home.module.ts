import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { CartComponent } from "./cart/cart.component";
import { SearchComponent } from "./search/search.component";
import { CategoriesProductsComponent } from "./categories-products/categories-products.component";
import { SingleCategoryProductComponent } from "./categories-products/single-category-product/single-category-product.component";
import { TotalResultComponent } from "./cart/total-result/total-result.component";
import { SingleProductCardComponent } from "./categories-products/single-category-product/single-product-card/single-product-card.component";
import { FormsModule } from "@angular/forms";
import { SearchProductsPipe } from "../shared/pipes/search-products.pipe";
import { SearchCategoryPipe } from '../shared/pipes/search-category.pipe';
let IMPORTS_EXPORTS = [
  HomeComponent,
  CartComponent,
  SearchComponent,
  CategoriesProductsComponent,
  SingleCategoryProductComponent,
  TotalResultComponent,
  SingleProductCardComponent,
];

@NgModule({
  declarations: [...IMPORTS_EXPORTS, SearchProductsPipe, SearchCategoryPipe],
  imports: [CommonModule, FormsModule],
  exports: [...IMPORTS_EXPORTS],
})
export class HomeModule {}
