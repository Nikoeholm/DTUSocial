import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http/src/params';

const params = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable()
export class DataService {

  private baseUrl = 'http://130.225.170.246:8080/DTUSocial-1.0';

  constructor(private http: HttpClient) {
  }

  getTodo<Todo>(url): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  putTodo(url, body): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + url, body, params);
  }

  patchTodo(url, body): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/' + url, body, params);
  }

  deleteTodo(url): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + url, params);
  }

  postLogin(url, body): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + url, body, params);
  }

  getMessage<Message>(url): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }
  putMessage(url, body): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + url, body, params);
  }

  getUser<User>(url): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  getGroups<Group>(url): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  putGroups(url, body): Observable<any> {
    return this.http.put(this.baseUrl + '/' + url, body, params);
  }

}



