import { Component, OnInit } from '@angular/core';
import { LoginService } from './main/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private loginService: LoginService) {}
}
