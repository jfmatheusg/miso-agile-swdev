import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DemoMaterialModule } from "./material.module";

import { PageStructureModule } from "./modules/page-structure/page-structure.module";
import { AuthenticationService } from "./services";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { UsersModule } from './modules/users/users.module';
import { ErrorRestService } from './services/error-rest/error-rest.service';
import { ErrorRestComponent } from './services/error-rest/error-rest.component';
import { HttpConfigInterceptor } from './interceptor/httpconfig.interceptor';
import { UserSessionService } from './services/user-session.service';

@NgModule({
  declarations: [
    AppComponent,
    ErrorRestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DemoMaterialModule,
    PageStructureModule,
    UsersModule,
    NgbModule,
  ],
  providers: [
    AuthenticationService,
    ErrorRestService,
    UserSessionService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorRestComponent]
})
export class AppModule {

  constructor(
    public user: UserSessionService,
    private authenticationService: AuthenticationService
  ) {
    if (!localStorage.getItem('session')) {
      localStorage.setItem('session', this.authenticationService.guid());
    }
    if (localStorage.getItem('user')) {
      user.profile = JSON.parse(localStorage.getItem('user'));
      user.ok = true;
    }
  }
}