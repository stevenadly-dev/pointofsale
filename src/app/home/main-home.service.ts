import { singleItemCartModel } from "./../shared/models/single-item-cart.model";
import { cartModel } from "./../shared/models/cart.model";
import { product } from "./../shared/models/product.model";
import { Injectable } from "@angular/core";
import { categoriesAndproduct } from "../shared/mocks/category-products.mock";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MainHomeService {
  cart: cartModel;
  // searchInputVal: string = "";
  searchInputChanged = new Subject<string>();

  cartChanged = new Subject<cartModel>();

  constructor() {
    this.cart = {};
    this.cart.items = [];
  }

  returnAllCategories() {
    return categoriesAndproduct;
  }

  addToCart(product: product) {
    // product on click check if it it was in in the cart or not
    // yes ==> increase value     no ==> push it in the array
    let elementWeWantToAddToCart = this.cart.items.find(
      (el) => "c" + product.id == el.id
    );

    if (elementWeWantToAddToCart) {
      elementWeWantToAddToCart.productQty++;
      this.caluculateTotalForSingleItemAtCart(elementWeWantToAddToCart);
    } else {
      this.cart.items.push({
        id: "c" + product.id,
        productName: product.name,
        productPrice: product.price,
        productQty: 1,
        productInStock: product.inStock,
        productPoromo: product.pormotion,
        totalForItem: product.price,
      });
    }
    debugger;
    this.calculateTotalCart();
    this.cartChanged.next(this.cart);
  }

  deleteItemFromCart(index: number) {
    this.cart.items.splice(index, 1);
    this.calculateTotalCart();
    this.cartChanged.next(this.cart);
  }

  caluculateTotalForSingleItemAtCart(cartItem: singleItemCartModel) {
    let ItemIndex = this.cart.items.indexOf(cartItem);
    let itemTotal = cartItem.productPrice;
    itemTotal = cartItem.productQty * cartItem.productPrice;
    this.cart.items[ItemIndex].totalForItem = itemTotal;

    this.calculateTotalCart();
    this.cartChanged.next(this.cart);
  }

  calculateTotalCart() {
    let total = 0;
    let taxper = 0.05;
    let delivery = 10;

    if (this.cart.items.length > 0) {
      this.cart.items.forEach((item) => {
        total = total + item.totalForItem;
        this.cart.total = total;
        this.cart.taxes = taxper * total;
        this.cart.delivery = delivery;
        this.cart.totalCart =
          this.cart.total + this.cart.taxes + this.cart.delivery;

        // console.log("this---cart---", this.cart);
        this.cartChanged.next(this.cart);
      });
    } else {
      this.cart.total = 0;
    }

    // console.log("totalFinal", totalFinal);
    // this.cart.total = totalFinal;
    // debugger;
  }

  returnCart() {
    return this.cart;
  }

  searchAtProducts(searchInputVal: string) {
    debugger;
    this.searchInputChanged.next(searchInputVal);
  }
}
