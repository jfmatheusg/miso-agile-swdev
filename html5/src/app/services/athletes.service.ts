import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AthletesInterface } from "../interfaces/athletes.interface";

@Injectable({
  providedIn: "root"
})
export class AthletesService {
  constructor(private http: HttpClient) { }

  getAllAthletes() {
    return this.http.get<AthletesInterface>(`${environment.apiUrl}/athletes/`);
  }

  getAthlete(pk) {
    return this.http.get<any>(`${environment.apiUrl}/athletes/${pk}`);
  }

  getAthleteEvents(pk) {
    return this.http.get<any>(`${environment.apiUrl}/athletes/${pk}/events`);
  }

  getEvent(pk) {
    return this.http.get<any>(`${environment.apiUrl}/events/${pk}`);
  }
}
