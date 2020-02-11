import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";
import { UserSignUpInterface } from "../interfaces/user-sign-up.interface";
import { UserSessionService } from './user-session.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    public user: UserSessionService,
  ) { }
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  }

  signUp(userInfo: UserSignUpInterface) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/register`, { ...userInfo })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/login`, { username, password })
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          if (data && data.access) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("token", data.access);
          }
          return data;
        })
      );
  }

  me() {
    return this.http
      .get<any>(`${environment.apiUrl}/users/me`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") }
      })
      .pipe(
        map(data => {
          // login successful if there's a jwt token in the response
          if (data) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("user", JSON.stringify(data));
            this.user.profile = data;
            this.user.ok = true;
          }

          return data;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.user.reset();
  }
}
