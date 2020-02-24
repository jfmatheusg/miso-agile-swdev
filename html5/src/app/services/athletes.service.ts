import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AthletesInterface } from "../interfaces/athletes.interface";

@Injectable({
  providedIn: "root"
})
export class AthletesService {
  constructor(private http: HttpClient) { }

  private encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      if (data[d]) {
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
      }
    return ret.join('&');
  }

  getAllAthletes(data: {} = {}) {
    return this.http.get<AthletesInterface>(`${environment.apiUrl}/athletes/?${this.encodeQueryData(data)}`);
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

  getComments(pk) {
    return this.http.get<any>(`${environment.apiUrl}/events/${pk}/comments`);
  }

  putComment(pk, body) {
    return this.http.post<any>(`${environment.apiUrl}/events/${pk}/comments/`, body);
  }
}
