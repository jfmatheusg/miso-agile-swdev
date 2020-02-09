import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserSignUpDataDTO } from './DTO/userSignUpDataDTO.interface';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

    signUp(userInfo: UserSignUpDataDTO) {
        return this.http.post<any>(`${environment.apiUrl}/users/register`, { ...userInfo })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                }

                return user;
            }));
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/users/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                }

                return user;
            }));
    }
    
    me() {
        return this.http.get<any>(`${environment.apiUrl}/users/me`, {
            headers: { Authorization: 'bearer ' + localStorage.getItem('token') }
        })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        // TODO: Call API to invalidate token??
    }
}
