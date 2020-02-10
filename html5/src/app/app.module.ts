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
import { MenuComponent } from './page-structure/menu/menu.component';
import { UsersModule } from './modules/users/users.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule,
    PageStructureModule,
    UsersModule,
    NgbModule
  ],
  providers: [AuthenticationService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private authenticationService: AuthenticationService
  ) {
    if (!localStorage.getItem('session')) {
      localStorage.setItem('session', this.authenticationService.guid());

    }
  }
}