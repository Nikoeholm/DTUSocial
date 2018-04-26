import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../shared/service/users.service';
import { User } from '../../../shared/model/user.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef: ElementRef;
  onPersonalConversationSubs: Subscription;
  chatter: User;
  messages = [];


  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        console.log('Bruger: ' + this.chatter.brugernavn);
      }
    );
  }

  onSendMessage() {

    const ingMessage = this.messageInputRef.nativeElement.value;
    this.messages.push(ingMessage);
    this.messageInputRef.nativeElement.value = '';

}



}
