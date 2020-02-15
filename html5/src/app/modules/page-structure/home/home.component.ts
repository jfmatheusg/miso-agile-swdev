import { Component, OnInit } from '@angular/core';
import { AthletesService } from 'src/app/services/athletes.service';
import { environment } from "../../../../environments/environment";
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor(
    private athletesService: AthletesService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Inicio');
  }

  athletes: any = {};
  environment = environment;

  ngOnInit() {
    this.athletesService.getAllAthletes().subscribe(athletes => {
      this.athletes = athletes;
    });
  }

}
