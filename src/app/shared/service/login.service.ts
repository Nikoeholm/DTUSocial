import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Credentials } from '../model/credentials.model';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable()
export class LoginService {

  token: string;

  constructor(private http: HttpClient, router: Router) {}

  public postCredentials(credentials: Credentials) {
    // Reach to rest-endpoint
    return this.http.post('http://localhost:8080/DTUSocial/login', JSON.stringify(credentials), httpOptions)
    .map(
      (response: Response) => {
        this.token = response.toString();
        // console.log(response.headers.get('Authorisation'));
        // Save the token in Localstorage of browser
        // Run command in console, to check if token is saved: localStorage;
        window.localStorage.setItem('access_token', this.token);
        window.localStorage.setItem('user', credentials.username);
        return this.token;
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Login failed');
        }
      );
  }

  setTokenFromLocalStorage(token: string) {
    this.token = token;
  }

  logout() {
    // window.localStorage.clear();
    window.localStorage.removeItem('access_token');
    window.localStorage.removeItem('user');
    this.token = null;
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

}
