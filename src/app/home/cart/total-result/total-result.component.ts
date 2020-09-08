import { cartModel } from "./../../../shared/models/cart.model";
import { MainHomeService } from "./../../main-home.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-total-result",
  templateUrl: "./total-result.component.html",
  styleUrls: ["./total-result.component.css"],
})
export class TotalResultComponent implements OnInit {
  cartChangedSubscription: Subscription;
  cart: cartModel;
  constructor(private MainHomeService: MainHomeService) {}

  cartChanged() {
    debugger;
    this.cartChangedSubscription = this.MainHomeService.cartChanged.subscribe(
      (res) => {
        this.cart = res;
      }
    );
  }
  ngOnInit(): void {
    this.cartChanged();
  }

  ngOnDestroy(): void {
    this.cartChangedSubscription.unsubscribe();
  }
}
