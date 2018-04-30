import {Component, ElementRef, OnInit, ViewChild, OnDestroy} from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageInput') messageInputRef: ElementRef;
  onPersonalConversationSubs: Subscription;
  message: Message;
  chat: Message[] = [];
  chatter: User;
  hasChat: boolean;
  time: Date[];
  username: string;

  constructor(private usersService: UsersService,
              private chatService: ChatService,
              private userService: UserService) { }

  ngOnDestroy(): void {
    this.onPersonalConversationSubs.unsubscribe();
  }

  ngOnInit() {
    this.username = window.localStorage.getItem('username');
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        console.log('Chatter: ' + this.chatter.brugernavn);
        // Load chat
        this.retreiveChat();
      }
    );
  }

  setChat(chat: Message[]) {
    if (chat.length === 0) {
      this.hasChat = false;
      return;
    } else {
      this.hasChat = true;
      this.chat = chat;
      return;
    }
  }

  retreiveChat() {
    this.chatService.retrieveChat(this.chatter.brugernavn).subscribe(
      (messages) => {
        console.log('Messages retrieved from backend');
        this.setChat(this.chatService.getChat());
      }
    );
  }

  onSendMessage() {
    const currentMessage = this.messageInputRef.nativeElement.value;
    this.message = new Message(currentMessage,
                                this.username,
                                this.chatter.brugernavn,
                                0);
    this.chatService.sendMessage(this.message).subscribe(
      (response) => console.log('Message sent'),
      (error) => console.error('Message couldn\'t be sent!')
    );
    this.chat.push(this.message);
    this.messageInputRef.nativeElement.value = '';

}



}
