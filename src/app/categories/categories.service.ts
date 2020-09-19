import { element } from "protractor";
import { category } from "./../shared/models/category.model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  CategoriesRef: AngularFireList<any[]>;
  Categories;

  selectedCategory;
  constructor(private firebase: AngularFireDatabase) {}

  getAllCategories() {
    this.CategoriesRef = this.firebase.list("categories");
    return (this.Categories = this.CategoriesRef.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }));
      })
    ));

    // return this.Categories;
  }

  insertCategory(category) {
    this.CategoriesRef = this.firebase.list("/categories");
    this.CategoriesRef.push(category);
  }

  deleteCategory(category) {
    // debugger;
    // this.firebase.list("/categories", category.key).remove();

    // this.CategoriesRef.(category);
    this.CategoriesRef = this.firebase.list("categories");
    this.CategoriesRef.remove(category.key);
  }

  updateCategory(key, form) {
    const itemsRef = this.firebase.list("categories");
    debugger;
    itemsRef.update(key, form);
  }

  getSelectedCategory(id: string) {
    return this.firebase.object("categories/" + id);
  }

  getCategoriesByName(Cname) {
    this.firebase
      .list("/categories")
      .valueChanges()
      .pipe(
        map((categories) =>
          categories.filter((category) => category["categoryName"] === Cname)
        )
        // (res) => {
        //   let reuslt = res;
        //   reuslt.forEach((element) => {
        //     return element[""] == Cname;
        //   });
        // }, 0
        // filter()
      )
      .subscribe((res) => {
        console.log("resfrom service ", res);
      });
  }
  // deleteCategory(el) {

  // }
}
