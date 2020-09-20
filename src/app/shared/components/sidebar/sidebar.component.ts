import { UtilsServiceService } from "./../../services/utils-service.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit {
  sidebarResponsive: boolean = false;
  constructor(private UtilsServiceService: UtilsServiceService) {}

  ngOnInit(): void {
    this.checkToggleSidebar();
  }

  checkToggleSidebar() {
    this.UtilsServiceService.toggleLeftSide.subscribe((res) => {
      this.sidebarResponsive = res;
      debugger;
    });
  }
}
