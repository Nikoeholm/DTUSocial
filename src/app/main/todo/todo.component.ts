import { Component, OnInit } from '@angular/core';
import {Todo} from './todo.model';
import {TodoListService} from './todo-list-service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoListService) {
  }

  ngOnInit() {
    this.todos = this.todoService.getTodo();
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
        this.todos = todos;
      }
    );
  }
}
