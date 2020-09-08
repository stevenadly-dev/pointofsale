import { product } from "./../models/product.model";
import { cartModel } from "./../models/cart.model";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchProducts",
})
export class SearchProductsPipe implements PipeTransform {
  transform(value: product[], x: any): unknown {
    console.log("categoriesProducts from pipes", x);
    debugger;
    return value.filter((el) => {
      return el.name.includes(x);
    });
  }
}
