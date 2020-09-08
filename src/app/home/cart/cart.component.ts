import { singleItemCartModel } from "./../../shared/models/single-item-cart.model";
import { MainHomeService } from "./../main-home.service";
import { product } from "./../../shared/models/product.model";
import { cartModel } from "./../../shared/models/cart.model";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart: cartModel;
  cartChangedSubscription: Subscription;
  constructor(private MainHomeService: MainHomeService) {}

  cartChanged() {
    this.cartChangedSubscription = this.MainHomeService.cartChanged.subscribe(
      (res) => {
        this.cart = res;
      }
    );
  }

  increaseValue(cartItem: singleItemCartModel) {
    if (this.checkValue(cartItem)) {
      if (cartItem.productQty !== cartItem.productInStock) {
        cartItem.productQty = cartItem.productQty + 1;
        this.caluculateTotalForSingleItemAtCart(cartItem);
        // this.MainHomeService.calculateTotalCart();
      }
    }
  }
  decreaseValue(cartItem: singleItemCartModel) {
    if (this.checkValue(cartItem)) {
      if (cartItem.productQty !== 1) {
        cartItem.productQty = cartItem.productQty - 1;
        this.caluculateTotalForSingleItemAtCart(cartItem);
      }
    }
  }

  checkValue(cartItem: singleItemCartModel) {
    console.log("this.productQty", cartItem.productQty);

    if (
      cartItem.productQty <= cartItem.productInStock &&
      cartItem.productQty >= 1
    ) {
      console.log("cart----->>> true", this.cart);

      return true;
    } else {
      console.log("cart----->>> false", this.cart);
      cartItem.productQty = 1;
      return false;
    }
  }

  deleteItemFromCart(index: number) {
    this.MainHomeService.deleteItemFromCart(index);
    // this.cart.items.splice(index, 1);
  }

  caluculateTotalForSingleItemAtCart(cartItem: singleItemCartModel) {
    this.MainHomeService.caluculateTotalForSingleItemAtCart(cartItem);
  }
  ngOnInit(): void {
    this.cartChanged();
  }
  ngOnDestroy(): void {
    this.cartChangedSubscription.unsubscribe();
  }
}
