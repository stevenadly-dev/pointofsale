import { product } from "./product.model";
export interface category {
  id: string;
  name: string;
  products?: product[];
}
