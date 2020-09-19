import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddProductComponent } from "./add-product/add-product.component";
import { AllProductsComponent } from "./all-products/all-products.component";

const routes: Routes = [
  {
    path: "",
    component: AllProductsComponent,
  },
  {
    path: "add-product",
    component: AddProductComponent,
  },
  {
    path: "edit-product/:id",
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
