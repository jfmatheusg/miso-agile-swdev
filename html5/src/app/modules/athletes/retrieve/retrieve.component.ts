import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorRestInterface } from 'src/app/interfaces/error-rest.interface';
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
  submitted = false;
  returnUrl: string;
  athlete: {}
  events: {}
  environment = environment;

  displayedColumns: string[] = ['datetime', 'sport', 'mode', 'result', 'video'];

  resultsLength = 0;
  isLoadingResultsA = true;
  isLoadingResultsE = true;

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
    }, error => {
      this.errorRest = error.error;
    });
    this.athletesService.getAthleteEvents(pk).subscribe(events => {
      this.isLoadingResultsE = false;
      this.resultsLength = events.count;
      this.events = events.results;
    }, error => {
      this.errorRest = error.error;
    });
  }

  getVideoID(url_video) {
    try {
      console.log(url_video)
      let url_object = new URL(url_video);
      return `https://img.youtube.com/vi/${url_object.searchParams.get('v')}/0.jpg`;
    } catch (e) {
      return ''
    }

  }

}
