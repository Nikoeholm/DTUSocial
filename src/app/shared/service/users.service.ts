import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class UsersService {

  users: User[];

  constructor(private http: HttpClient, router: Router) {}

  getUsers() {
    // Reach REST endpoint
    return this.http.get<User[]>('http://localhost:8080/DTUSocial/users/', httpOptions).map(
      (users) => {
        this.users = users;
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong in UsersService');
        }
      );
  }

  // This will return the whole user object
  getUser() {
    const username = window.localStorage.getItem('user');
    return this.users.find( user => user.brugernavn === username);
  }
}

