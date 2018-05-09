import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Credentials } from '../model/credentials.model';
import { UserService } from './user.service';
import {DataService} from '../APIService';

@Injectable()
export class LoginService {

  token: string;

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private apiService: DataService) {}

  public postCredentials(credentials: Credentials) {
    // Reach to rest-endpoint
    return this.apiService.post('login', JSON.stringify(credentials))
    .map(
      (response: Response) => {
        this.token = response.toString();
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
