import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/service/login.service';
import { UsersService } from './shared/service/users.service';
import { TodoService } from './shared/service/todo.service';
import { User } from './shared/model/user.model';
import { UserService } from './shared/service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    try {
      const token = window.localStorage.getItem('access_token');
      this.loginService.setTokenFromLocalStorage(token);
      const user = window.localStorage.getItem('user');
      this.userService.retrieveUser(user).subscribe(
        (response) => console.log('User retrieved')
      );
    } catch (e) {
      throw new Error('Token couldn\'t be resolved');
    }
  }
  constructor(private loginService: LoginService,
              private userService: UserService) {
  }
}
