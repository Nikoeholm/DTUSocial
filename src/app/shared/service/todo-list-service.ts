
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

  todoId = 1;

  constructor(private http: HttpClient) {}

  // Subject which can be listen to in other componentes
  startedEditing = new Subject<number>();
  todosChanged = new EventEmitter<Todo[]>();

  // todos: Todo[];
  todos: Todo[];

  putTodo(todo: Todo) {
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
            this.setTodos(todos);
            return console.log(todos);
        }
      )
        .catch(
          (error: Response) => {
            console.log(error);
            return Observable.throw('Something went wrong in TodoService');
          }
        );

  }

  deleteTodoBackend(todoId: number) {
    return this.http.delete('http://localhost:8080/DTUSocial/todos/' + todoId, httpOptions).map(
        (response: Response) => {
            return console.log(response);
        }
      )
        .catch(
          (error: Response) => {
            console.log(error);
            return Observable.throw('Something went wrong in TodoService: DELETE TODO');
          }
        );
  }

  getTodos() {
    return this.todos;
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
    // TODO: Update from backend using id and studynr
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodo(index: number) {
    // TODO: Delete from backend using id and studynr
    this.deleteTodoBackend(this.todos[index].todoId).subscribe(
      (response) => console.log('Todo removed from backend'),
      (error) => console.error('Todo couldn\'t be removed')
    );

    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }
}
