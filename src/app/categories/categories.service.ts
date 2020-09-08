import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  Categories: AngularFireList<any[]>;
  constructor(private firebase: AngularFireDatabase) {}

  insertCategory(category) {
    this.Categories = this.firebase.list("/categories");

    this.Categories.push(category);
  }

  getAllCategories() {
    this.Categories = this.firebase.list("categories");
    return this.Categories;
  }

  deleteCategory(el) {
    console.log("el", el.$key);
  }
}
