import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class UsersService {
  users: User[];
  startPersonalConversation = new Subject<number>();

  getUsers() {
    return this.users.slice();
  }

  constructor(private http: HttpClient, router: Router) {}

  retrieveUsers() {
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
  getUserById(username: string) {
    return this.users.find( user => user.brugernavn === username);
  }

  getUser(index: number) {
    return this.users[index];
  }
}

