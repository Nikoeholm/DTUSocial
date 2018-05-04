import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {DataService} from '../APIService';

// Specify http header options here
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
    user: User;
    constructor(private http: HttpClient,
                private apiService: DataService) {
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    retrieveUser(username: string) {
        return this.apiService.getUser<User>('users/' + username, httpOptions).map(
      (user) => {
          console.log(user);
          console.log('User is set!');
          this.setUser(user);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong while retrieving User');
        }
      );
    }
}
