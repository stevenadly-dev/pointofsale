import { singleItemCartModel } from "./single-item-cart.model";

export interface cartModel {
  items?: singleItemCartModel[];
  total?: number;
  taxes?: number;
  delivery?: number;
  totalCart?: number;
}
