import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {DataService} from '../APIService';

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
        return this.apiService.get<User>('users/' + username).map(
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
