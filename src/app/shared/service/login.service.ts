import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Credentials } from '../model/credentials.model';
import { UserService } from './user.service';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable()
export class LoginService {

  token: string;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService) {}

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

        this.userService.retrieveUser(credentials.username).subscribe();
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
    if (this.token != null) {
      return this.token;
    }
    return '';
  }

  isAuthenticated() {
    return this.token != null;
  }

}
