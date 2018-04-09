import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from '../../shared/model/credentials.model';
import { LoginService } from '../../shared/service/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  isLoggedin = false;

  private credentials: Credentials;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl(null, [Validators.required]),
      'passWord': new FormControl(null, [Validators.required])
    });

    this.loginForm.statusChanges.subscribe(
      (status) => console.log(status)
    );
  }

  onSubmit() {
    console.log(this.loginForm.get('userName').value);
    console.log(this.loginForm.get('passWord').value);

    this.credentials = new Credentials(this.loginForm.get('userName').value, this.loginForm.get('passWord').value);

    this.loginService.postCredentials(this.credentials).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
    console.log(this.loginForm.get('userName').value);
    this.router.navigate(['/container']);
  }

}
