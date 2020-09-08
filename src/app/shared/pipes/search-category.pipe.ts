import { category } from "./../models/category.model";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchCategory",
})
export class SearchCategoryPipe implements PipeTransform {
  transform(categories: category[], x: any): unknown {
    debugger;

    console.log("x------", x);
    return categories.filter((el) => {
      return el.name.includes(x);
    });
  }
}
