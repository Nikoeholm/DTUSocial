import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../shared/service/todo.service';
import {Todo} from '../../shared/model/todo-list.model';
import {Subscription} from 'rxjs/Subscription';
import { UsersService } from '../../shared/service/users.service';
import { User } from '../../shared/model/user.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  onPersonalTodoSubs: Subscription;
  chatter: User;

  constructor(private todoService: TodoService,
              private usersService: UsersService) { }

  ngOnInit() {
    this.onPersonalTodoSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        console.log('Todo Chatter: ' + this.chatter.brugernavn);
      }
    );
      // Retrieve TODOS from backend
      this.todoService.getTodosBackEnd().subscribe(
        (response) => console.log('Todos loaded from backend')
       );

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
