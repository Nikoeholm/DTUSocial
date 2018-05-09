import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/service/login.service';
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
      if (user != null) {
      this.userService.retrieveUser(user).subscribe(
        (response) => console.log('User retrieved')
      );
    }
    } catch (e) {
      throw new Error('Token couldn\'t be resolved');
    }
  }
  constructor(private loginService: LoginService,
              private userService: UserService) {
  }
}
