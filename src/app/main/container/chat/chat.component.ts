import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../../../shared/service/users.service';
import { User } from '../../../shared/model/user.model';
import { ChatService } from '../../../shared/service/chat.service';
import { Message } from '../../../shared/model/message.model';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef: ElementRef;
  onPersonalConversationSubs: Subscription;
  message: Message;
  chat: Message[];
  chatter: User;

  constructor(private usersService: UsersService,
              private chatService: ChatService,
              private userService: UserService) { }

  ngOnInit() {
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        console.log('Chatter: ' + this.chatter.brugernavn);
        // Load chat
        this.retreiveChat();
      }
    );
  }

  retreiveChat() {
    this.chatService.retrieveChat(this.chatter.brugernavn).subscribe(
      (messages) => {
        console.log('Messages retrieved from backed');
        console.log(messages.message);
        this.chat = messages;
      }
    );
  }

  onSendMessage() {
    const username = window.localStorage.getItem('username');
    const currentMessage = this.messageInputRef.nativeElement.value;
    this.message = new Message(currentMessage, username, this.chatter.brugernavn);
    this.chatService.sendMessage(this.message).subscribe(
      (response) => console.log('Message sent'),
      (error) => console.error('Message couldn\'t be sent!')
    );
    this.chat.push(currentMessage);
    this.messageInputRef.nativeElement.value = '';

}



}
