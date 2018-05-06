import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {DataService} from '../APIService';

@Injectable()
export class UsersService {
  users: User[];
  startPersonalConversation = new Subject<number>();

  getUsers() {
    return this.users.slice();
  }

  constructor(private http: HttpClient, router: Router, private apiService: DataService) {}

  retrieveUsers() {
    // Reach REST endpoint
    return this.apiService.getUser<User[]>('users/').map(
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

