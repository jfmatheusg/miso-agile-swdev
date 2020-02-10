import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services';
import { Router } from '@angular/router';
import { AthletesService } from 'src/app/services/athletes.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private athletesService: AthletesService
  ) { }

  athletes: any = {};
  environment = environment;

  ngOnInit() {
    this.athletesService.getAllAthletes().subscribe(athletes => {
      this.athletes = athletes;
    });
  }

}
