import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http/src/params';


@Injectable()
export class DataService {

  private baseUrl = 'http://130.225.170.246:8080/DTUSocial-1.0';

  constructor(private http: HttpClient) {
  }

  getTodo<Todo>(url, params): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  putTodo(url, body, params): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + url, body, params);
  }

  patchTodo(url, body, params): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/' + url, body, params);
  }

  deleteTodo(url, params): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + url, params);
  }

  postLogin(url, body, params): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + url, body, params);
  }

  getMessage<Message>(url, params): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }
  putMessage(url, body, params): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + url, body, params);
  }

  getUser<User>(url, params): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  getGroups<Group>(url, params): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  putGroups(url, body, params): Observable<any> {
    return this.http.put(this.baseUrl + '/' + url, params);
  }

}



