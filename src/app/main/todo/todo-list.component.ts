import { Component, OnInit } from '@angular/core';
import {TodoListService} from '../../shared/service/todo-list-service';
import {Todo} from '../../shared/model/todo-list.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoListService) { }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
        this.todos = todos;
      }
    );
  }

  onEditTodo(index: number) {
    this.todoService.startedEditing.next(index);
  }

}
