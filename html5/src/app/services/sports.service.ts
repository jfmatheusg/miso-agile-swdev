import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class SportsService {
  constructor(private http: HttpClient) { }

  getAllSports() {
    return this.http.get<any>(`${environment.apiUrl}/sports/`);
  }

  getSportModes(pk) {
    return this.http.get<any>(`${environment.apiUrl}/sports/${pk}/modes`);
  }
}
