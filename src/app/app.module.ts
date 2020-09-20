import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HomeModule } from "./home/home.module";

// import {
//   AngularFireStorageModule,
//   AngularFireStorageReference,
//   AngularFireUploadTask,

// } from "@angular/fire/storage";

import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoriesModule } from "./categories/categories.module";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { SidebarToggleDropDownDirective } from "./shared/directives/sidebar-toggle-drop-down.directive";
import { UtilsServiceService } from "./shared/services/utils-service.service";
// import { CategoriesModule } from "./categories/categories.module";

//   StorageBucket

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    SidebarToggleDropDownDirective,
  ],
  imports: [
    // AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    AngularFireStorageModule,
    AngularFireDatabaseModule,

    ReactiveFormsModule,

    BrowserModule,
    AppRoutingModule,

    HomeModule,
    CategoriesModule,
  ],
  providers: [UtilsServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
