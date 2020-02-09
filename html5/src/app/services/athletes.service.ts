import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AthletesService {
  constructor(private http: HttpClient) {}

  getAllAthletes() {
    return this.http.get(`${environment.apiUrl}/v1/athletes/`);
  }
}
