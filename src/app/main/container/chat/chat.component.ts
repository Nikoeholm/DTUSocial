import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  @ViewChild('messageInput') messageInputRef: ElementRef;

  messages = [];


  constructor() { }

  ngOnInit() {
  }

  onSendMessage(){

    const ingMessage = this.messageInputRef.nativeElement.value;
    this.messages.push(ingMessage);
    this.messageInputRef.nativeElement.value = "";

}



}
