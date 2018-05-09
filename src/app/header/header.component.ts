import { Component, OnInit } from '@angular/core';
import { LoginService } from '../shared/service/login.service';
import {TodoService} from '../shared/service/todo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private todoService: TodoService) { }

  title: string;

  ngOnInit() {
  }

  logout() {
    console.log('Logged out!');
    this.loginService.logout();
  }

  reload() {
    this.todoService.getPersonalTodos().subscribe( (response) => {
      console.log('Personal TODOs loaded');
    }
  );
  }

}
