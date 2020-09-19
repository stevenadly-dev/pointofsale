import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ProductsRoutingModule } from "./products-routing.module";
import { AllProductsComponent } from "./all-products/all-products.component";
import { AddProductComponent } from "./add-product/add-product.component";

let imports_exports = [AllProductsComponent, AddProductComponent];
@NgModule({
  declarations: [...imports_exports],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
