import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/service/login.service';
import { UsersService } from './shared/service/users.service';
import { TodoService } from './shared/service/todo.service';
import { User } from './shared/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    try {
      this.usersService.getUsers().subscribe();
    } catch (e) {
      throw new Error('Users couldn\'t be resolved');
    }
    try {
      const token = window.localStorage.getItem('access_token');
      this.loginService.setTokenFromLocalStorage(token);
    } catch (e) {
      throw new Error('Token couldn\'t be resolved');
    }
  }
  constructor(private loginService: LoginService,
    private usersService: UsersService) {
  }
}
