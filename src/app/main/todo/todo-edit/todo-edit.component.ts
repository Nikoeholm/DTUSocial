import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import {TodoListService} from '../todo-list-service';
import {Todo} from '../todo.model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef: ElementRef;

  constructor(private todoService: TodoListService) { }

  messages = [];

  ngOnInit() {
  }

  onAddItem() {
    const todomessage = this.messageInputRef.nativeElement.value;
    const newTodo = new Todo(todomessage);
    this.todoService.addTodo(newTodo);

    // const todomessage = this.messageInputRef.nativeElement.value;
    // this.messages.push(todomessage);
    // this.messageInputRef.nativeElement.value = "";
  }

}
