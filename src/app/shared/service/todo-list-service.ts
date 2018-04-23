
import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from '../model/todo-list.model';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../model/user.model';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json' })
};

@Injectable()
export class TodoListService {

  constructor(private http: HttpClient) {}

  // Subject which can be listen to in other componentes
  startedEditing = new Subject<number>();
  todosChanged = new EventEmitter<Todo[]>();

  // todos: Todo[];

  todos: Todo[] = [
    new Todo(1, 's165151', 'Testbesked', false),
    new Todo(1, 's165151', 'Test', false)
  ];


  postTodo(todo: Todo) {
    return this.http.put('http://localhost:8080/DTUSocial/todos', JSON.stringify(todo), httpOptions).map(
      (response: Response) => {
        console.log(response);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong with todo-service');
        }
      );
  }

  getTodosBackEnd() {
      // Reach REST endpoint
      return this.http.get<Todo[]>('http://localhost:8080/DTUSocial/todos/', httpOptions).map(
        (todos) => {
          for (const todo of todos) {
            todos.push(todo);
            return console.log(todos);
          }
        }
      )
        .catch(
          (error: Response) => {
            console.log(error);
            return Observable.throw('Something went wrong in TodoService');
          }
        );

  }

  getTodos() {
    return this.todos.slice();
  }

  setTodos(todos: Todo[]) {
    // replace excisting todos with new todos and passes a copy with slice
    this.todos = todos;
    this.todosChanged.next(this.todos.slice());
    console.log('setTodo: Todo added');
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    console.log('addTodo: Todo added');
    this.todosChanged.next(this.todos.slice());
  }

  updateTodo(index: number, newTodo: Todo) {
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }
}
