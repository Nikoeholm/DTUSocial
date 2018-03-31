import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Credentials} from './main/login/credentials.model';

@Injectable()
export class LoginService {

  constructor(private http: Http) {}

  public postCredentials(credentials: Credentials) {
    // Reach to rest-endpoint

    return this.http.post('http://localhost:8080/DTUSocial/login', credentials);
  }

}
