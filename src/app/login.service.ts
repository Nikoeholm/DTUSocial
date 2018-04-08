import { Injectable } from '@angular/core';
import {Credentials} from './main/login/credentials.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class LoginService {

  token: any;

  constructor(private http: HttpClient, router: Router) {}

  public postCredentials(credentials: Credentials) {
    // Reach to rest-endpoint
    return this.http.post('http://localhost:8080/DTUSocial/login', JSON.stringify(credentials), httpOptions)
    .map(
      (response: Response) => {
        const data = response.json();
        this.token = data;
        console.log(this.token)
        return data;
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Login failed');
        }
      );
  }

}
