import { CategoriesService } from "./../categories/categories.service";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  CategoriesRef;
  constructor(
    private CategoriesService: CategoriesService,
    private db: AngularFireDatabase
  ) {}
  getCategories() {
    this.CategoriesService.getAllCategories().subscribe((res) => {
      console.log("res--------", res);
    });
  }

  pushProduct() {
    this.CategoriesRef = this.db.list("/products");
    this.CategoriesRef.push({
      products: [
        {
          name: "product1",
        },
        {
          name: "product2",
        },
        {
          name: "product3",
        },
      ],
    });
  }
}
