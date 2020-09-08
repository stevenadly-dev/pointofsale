import { MainHomeService } from "./../main-home.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  constructor(private MainHomeService: MainHomeService) {}

  findSearchEl(val: string) {
    this.MainHomeService.searchAtProducts(val);
    console.log(val);
  }

  ngOnInit(): void {}
}
