import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Message } from '../model/message.model';
import {DataService} from '../APIService';

// Specify http header options here

@Injectable()
export class ChatService {

  constructor(private http: HttpClient,
              private apiService: DataService) { }

  chat: Message[];
  time: Date[];

  getChat() {
    return this.chat.slice();
  }

  sendMessage(message: Message) {
    return this.apiService.put('chat/personal', JSON.stringify(message))
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
    return this.apiService.get<Message[]>('chat/personal/' + chatterId)
      .map(
        (messages) => {
          console.log(messages);
          for (const message of messages) {
            const unixTime = message.time;
            message.time = new Date(unixTime * 1000);
          }
          this.chat = messages;
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
