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
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor(private todoService: TodoListService) { }

  ngOnInit() {
  }

  onAddItem() {
    const id = this.nameInputRef.nativeElement.value;
    const message = this.amountInputRef.nativeElement.value;
    const done = this.amountInputRef.nativeElement.value;
    const newTodo = new Todo(id, message, done);
    this.todoService.addTodo(newTodo);
  }

}
