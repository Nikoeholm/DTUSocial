import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';

import {TodoListService} from '../../../shared/service/todo-list-service';
import {TodoModel} from '../../../shared/model/todo-list.model';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  @ViewChild('messageInput') messageInputRef: ElementRef;
  todomessage: string;

  constructor(private todoService: TodoListService) { }

  ngOnInit() {
  }

  onAddItem() {
    this.todomessage = this.messageInputRef.nativeElement.value;
    const newTodo = new TodoModel(this.todomessage);
    this.todoService.addTodo(newTodo);
    this.messageInputRef.nativeElement.value = "";
  }

}
