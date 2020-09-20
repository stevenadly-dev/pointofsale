import { UtilsServiceService } from "./../services/utils-service.service";
import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from "@angular/core";

@Directive({
  selector: "[appSidebarToggleDropDown]",
})
export class SidebarToggleDropDownDirective {
  constructor(
    private el: ElementRef,
    private UtilsServiceService: UtilsServiceService
  ) {}
  @HostBinding("class.m-menu__item--open") isActive = false;
  // m-brand__toggler--active
  @HostBinding("class.m-brand__toggler--active") sidebarisActive = false;
  @Input() dropdowntype;

  @HostListener("click") toggle() {
    if (this.dropdowntype == "sidebarlink") {
      this.isActive = !this.isActive;
    } else if (this.dropdowntype == "sidebar") {
      this.sidebarisActive = !this.sidebarisActive;
      debugger;
      this.UtilsServiceService.toggleLeftSide.next(this.sidebarisActive);
    }
  }
}
