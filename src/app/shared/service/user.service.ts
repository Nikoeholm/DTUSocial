import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

// Specify http header options here
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
    user: User;
    constructor(private http: HttpClient) {
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }

    retrieveUser(username: string) {
        return this.http.get<User>('http://localhost:8080/DTUSocial/users/' + username, httpOptions).map(
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
