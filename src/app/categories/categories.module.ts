import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CategoriesRoutingModule } from "./categories-routing.module";

import { AllCategoriesComponent } from "./all-categories/all-categories.component";
import { AddCategoryComponent } from "./add-category/add-category.component";
import { ReactiveFormsModule } from "@angular/forms";

let imports_exports = [AllCategoriesComponent, AddCategoryComponent];
@NgModule({
  declarations: [...imports_exports],
  imports: [CommonModule, CategoriesRoutingModule, ReactiveFormsModule],
  exports: [...imports_exports],
})
export class CategoriesModule {}
