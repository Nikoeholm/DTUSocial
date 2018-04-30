import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Credentials} from '../../shared/model/credentials.model';
import { LoginService } from '../../shared/service/login.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
   loginForm: FormGroup;
   control: FormControl;

  private credentials: Credentials;
  private auth = true;

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

  onSubmit(form: NgForm) {
    this.credentials = new Credentials(this.loginForm.get('userName').value, this.loginForm.get('passWord').value);

    this.loginService.postCredentials(this.credentials).subscribe(
      (response) => console.log('Successfully logged in.'),
      (error) => {this.auth = false;
        console.error('error test');
      }

  );

    // todo change path only if response is 200
  }

  ngOnDestroy(): void {
   this.router.navigate(['/home']);
  }

}
