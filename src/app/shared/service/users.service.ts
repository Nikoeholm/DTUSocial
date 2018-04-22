import { UsersModel } from '../model/users.model';
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

  users: UsersModel[];

  constructor(private http: HttpClient, router: Router) {}

  getUsers() {
    // Reach REST endpoint
    return this.http.get('http://localhost:8080/DTUSocial/users/', httpOptions).map(
      (data: Response) => {
        console.log(data);
        const user = data['0'];
        console.log(user);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong in UsersService');
        }
      );
  }

  getUser(studentId: string) {
    return this.users.find( user => user.brugernavn === studentId);

  }
}

