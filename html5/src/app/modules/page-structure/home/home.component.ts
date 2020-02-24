import { Component, OnInit } from '@angular/core';
import { AthletesService } from 'src/app/services/athletes.service';
import { environment } from "../../../../environments/environment";
import { TitleService } from 'src/app/services/title.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SportsService } from 'src/app/services/sports.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {


  athletes: any = {};
  sports: any = {};
  modes: any = {};
  environment = environment;

  searchForm: FormGroup;

  hideRequiredControl = new FormControl(true);
  floatLabelControl = new FormControl('auto');
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private athletesService: AthletesService,
    private sportsService: SportsService,
    private titleService: TitleService
  ) {
    this.titleService.setTitle('Inicio');
  }




  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      sport: [''],
      mode: ['']
    });

    this.sportsService.getAllSports().subscribe(sports => {
      this.sports = sports;
    });

    this.search()
  }

  get f() { return this.searchForm.controls; }


  search() {
    this.athletesService.getAllAthletes({ sports: this.f.sport.value, modes: this.f.mode.value }).subscribe(athletes => {
      this.athletes = athletes;
    });
  }

  getModes() {
    this.f.mode.setValue('');
    if (!this.f.sport.value) {
      this.modes = {};
      return;
    }
    this.sportsService.getSportModes(this.f.sport.value).subscribe(modes => {
      this.modes = modes;
    });
  }

}
