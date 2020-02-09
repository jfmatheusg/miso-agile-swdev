import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material.module";

import { PageStructureModule } from "./page-structure/page-structure.module";
import { AuthenticationService } from "./services";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule,
    PageStructureModule,
    NgbModule
  ],
  providers: [AuthenticationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
