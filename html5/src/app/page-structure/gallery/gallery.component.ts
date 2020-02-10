import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
import { AthletesService } from "src/app/services/athletes.service";
import { Observable } from "rxjs";
import { AthletesWrapper } from 'src/app/services/DTO/athletesWrapper.interface';

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.scss"]
})
export class GalleryComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private athletesService: AthletesService
  ) {}

  athletes: any = {};

  ngOnInit() {
    this.athletesService.getAllAthletes().subscribe(athletes => {
      this.athletes = athletes;
    });
  }

  logOut() {
    this.authenticationService.logout();
    return this.router.navigate(["/"]);
  }
}
