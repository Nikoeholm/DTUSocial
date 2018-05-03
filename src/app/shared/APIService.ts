import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {HttpParams} from '@angular/common/http/src/params';


@Injectable()
export class DataService {

  private baseUrl = 'http://localhost:8080/DTUSocial';

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

}



