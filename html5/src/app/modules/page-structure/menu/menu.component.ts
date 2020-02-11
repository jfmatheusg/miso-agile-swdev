import { Component, OnInit } from '@angular/core';
import { UserSessionService } from 'src/app/services/user-session.service';
import { AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  constructor(
    public user: UserSessionService,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit() { }

  logout() {
    this.authenticationService.logout()
  }

}
