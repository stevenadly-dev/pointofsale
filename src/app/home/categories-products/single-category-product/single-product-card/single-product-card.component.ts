import { product } from "./../../../../shared/models/product.model";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-single-product-card",
  templateUrl: "./single-product-card.component.html",
  styleUrls: ["./single-product-card.component.css"],
})
export class SingleProductCardComponent implements OnInit {
  @Input() product: product;
  constructor() {}

  ngOnInit(): void {
    // console.log("product========", this.product);
  }
}
