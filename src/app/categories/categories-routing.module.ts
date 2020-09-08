import { AllCategoriesComponent } from "./all-categories/all-categories.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddCategoryComponent } from "./add-category/add-category.component";

const routes: Routes = [
  { path: "", component: AllCategoriesComponent },
  {
    path: "add-category",
    component: AddCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
