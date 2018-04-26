import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../shared/service/users.service';
import { User } from '../../../shared/model/user.model';
import { ChatService } from '../../../shared/service/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef: ElementRef;
  onPersonalConversationSubs: Subscription;
  chatter: User;
  messages = [];

  constructor(private usersService: UsersService,
              private chatService: ChatService) { }

  ngOnInit() {
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        console.log('Chatter: ' + this.chatter.brugernavn);
      }
    );
  }

  onSendMessage() {
    const message = this.messageInputRef.nativeElement.value;
    this.messages.push(message);
    this.messageInputRef.nativeElement.value = '';

}



}
