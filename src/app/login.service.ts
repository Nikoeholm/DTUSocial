import { Injectable } from '@angular/core';
import {Credentials} from './main/login/credentials.model';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  public postCredentials(credentials: Credentials) {
    // Reach to rest-endpoint
    return this.http.post('http://localhost:8080/DTUSocial/login', JSON.stringify(credentials), httpOptions);
  }

}
