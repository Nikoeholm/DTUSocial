import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../../shared/service/todo-list-service';
import {TodoModel} from '../../shared/model/todo-list.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoModel[];

  constructor(private todoService: TodoListService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todoService.todosChanged.subscribe((todos: TodoModel[]) => {
        this.todos = todos;
      }
    );
  }

  onEditTodo(index: number) {
    this.todoService.startedEditing.next(index);
  }

}
