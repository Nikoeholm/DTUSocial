import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Message } from '../model/message.model';
import {DataService} from '../APIService';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable()
export class ChatService {

  constructor(private http: HttpClient,
              private apiService: DataService) { }

  chat: Message[];
  time: Date[];

  getChat() {
    return this.chat.slice();
  }

  convertUnixTime(chat: Message[]) {
    if (chat.length === 0) {
      this.time = null;
      return;
    }
    for (const message of chat) {
      const unixTime = message.time;
      const time = new Date(unixTime * 1000);
      console.log(time);
      this.time.push(time);
    }
  }

  getTime() {
    return this.time.slice();
  }

  sendMessage(message: Message) {
    return this.apiService.putMessage('chat/personal', JSON.stringify(message), httpOptions)
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

  retrieveChat(chatterId: String) {
    // const chatter = JSON.parse('{ "senderId": "' + chatterId + '"}');
    return this.apiService.getMessage<Message[]>('chat/personal/' + chatterId, httpOptions)
      .map(
        (messages) => {
          console.log(messages);
          this.chat = messages;
          // Time conversition
          // this.convertUnixTime(messages);
        }
      )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Chat couldn\'t be retreived!');
        }
      );
  }

}
