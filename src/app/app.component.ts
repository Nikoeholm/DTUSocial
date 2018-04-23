import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/service/login.service';
import { UsersService } from './shared/service/users.service';
import {TodoListService} from './shared/service/todo-list-service';
import { User } from './shared/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: User[];
  ngOnInit() {

    this.todoService.getTodosBackEnd().subscribe((response) => console.log('Todos loaded')
    );

    this.usersService.getUsers().subscribe(
        (response) => console.log('users loaded')
    );
    // const user: UsersModel = this.usersService.getUser('s165162');
    // console.log(user);
    try {
      const token = window.localStorage.getItem('access_token');
      this.loginService.setTokenFromLocalStorage(token);
    } catch (e) {
      throw new Error('Token couldn\'t be resolved');
    }
  }
  constructor(private loginService: LoginService, private usersService: UsersService, private todoService: TodoListService) {
  }
}
