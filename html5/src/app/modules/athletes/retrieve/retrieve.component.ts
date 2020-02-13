import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ErrorRestInterface } from 'src/app/interfaces/error-rest.interface';
import { ErrorRestService } from 'src/app/services/error-rest/error-rest.service';
import { TitleService } from 'src/app/services/title.service';
import { AthletesService } from 'src/app/services/athletes.service';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html'
})
export class RetrieveComponent implements OnInit {
  errorRest: ErrorRestInterface;
  loginForm: FormGroup;
  loading = false;
  hide = true;
  submitted = false;
  returnUrl: string;
  athlete: {}
  events: {}
  environment = environment;

  displayedColumns: string[] = ['datetime', 'sport', 'mode', 'result', 'video'];

  resultsLength = 0;
  isLoadingResultsA = true;
  isLoadingResultsE = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;


  constructor(
    private athletesService: AthletesService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let pk = this.route.snapshot.params.pk;
    this.athletesService.getAthlete(pk).subscribe(athlete => {
      this.isLoadingResultsA = false;
      this.athlete = athlete;
      this.titleService.setTitle(`${athlete['first_name']} ${athlete['last_name']}`);
    });
    this.athletesService.getAthleteEvents(pk).subscribe(events => {
      this.isLoadingResultsE = false;
      this.resultsLength = events.count;
      this.events = events.results;
    });

  }

}
