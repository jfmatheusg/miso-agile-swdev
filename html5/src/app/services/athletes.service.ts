import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { AthletesWrapper } from "./DTO/athletesWrapper.interface";

@Injectable({
  providedIn: "root"
})
export class AthletesService {
  constructor(private http: HttpClient) {}

  getAllAthletes() {
    return this.http.get<AthletesWrapper>(`${environment.apiUrl}/athletes/`);
  }
}
