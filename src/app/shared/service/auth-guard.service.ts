import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

  constructor(private loginService: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.loginService.isAuthenticated();
  }
}
