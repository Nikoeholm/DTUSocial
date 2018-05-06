import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

const params = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
};

@Injectable()
export class DataService {

  private baseUrl = 'http://130.225.170.246:8080/DTUSocial-1.0';
  // private baseUrl = 'http://localhost:8080/DTUSocial';

  constructor(private http: HttpClient) {
  }

  get<T>(url): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/' + url, params);
  }

  post(url, body): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + url, body, params);
  }

  put(url, body): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + url, body, params);
  }

  patch(url, body): Observable<any> {
    return this.http.patch<any>(this.baseUrl + '/' + url, body, params);
  }

  delete(url): Observable<any> {
    return this.http.delete<any>(this.baseUrl + '/' + url, params);
  }

}



