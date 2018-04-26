import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import { Message } from '../model/message.model';

// Specify http header options here
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};
@Injectable()
export class ChatService {
  sendMessage(message: Message) {
    return this.http.put('http://localhost:8080/DTUSocial/chat/personal', JSON.stringify(message), httpOptions)
    .map(
        (response: Response) => {
          console.log(response);
        }
      )
        .catch(
          (error: Response) => {
            console.log(error);
            return Observable.throw('Message couldn\'t be sent!');
          }
        );
  }
    constructor(private http: HttpClient) { }
}
