import { CategoriesService } from "./../categories.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-all-categories",
  templateUrl: "./all-categories.component.html",
  styleUrls: ["./all-categories.component.css"],
})
export class AllCategoriesComponent implements OnInit {
  categories;
  constructor(private CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.CategoriesService.getAllCategories().subscribe((res) => {
      this.categories = res;
      // console.log(this.categories);
      debugger;
    });
  }

  delete(el) {
    this.CategoriesService.deleteCategory(el);
  }

  // /-MHGbHGKEvtjrRAOWonH

  getCategoriesByName(Cname) {}
}
