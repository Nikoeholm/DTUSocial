import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../login.service';
import {Credentials} from './credentials.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  private credentials: Credentials;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

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

  }

}
