import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { LoginService } from './service/login.service';

@Injectable()
export class DTUSocialAuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', this.loginService.getToken())
    });
    return next.handle(authReq);
  }
}


