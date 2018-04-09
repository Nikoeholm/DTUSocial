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

  constructor(private todoService: TodoListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const todomessage = this.messageInputRef.nativeElement.value;
    const newTodo = new TodoModel(todomessage);
    this.todoService.addTodo(newTodo);
  }

}
