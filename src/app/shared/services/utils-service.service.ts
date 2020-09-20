import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UtilsServiceService {
  toggleLeftSide: Subject<boolean> = new Subject();
  // toggleLeftSide
  constructor() {}
}
