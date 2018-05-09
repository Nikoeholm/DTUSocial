import {EventEmitter, Injectable} from '@angular/core';
import {Todo} from '../model/todo-list.model';
import {Subject} from 'rxjs/Subject';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserService} from './user.service';
import {DataService} from '../APIService';

@Injectable()
export class TodoService {

  constructor(private http: HttpClient,
              private userService: UserService,
              private apiService: DataService) {
  }

  // Subject which can be listen to in other componentes
  startedEditing = new Subject<number>();
  todosChanged = new EventEmitter<Todo[]>();

  todos: Todo[] = [];

  putTodo(todo: Todo) {
    return this.apiService.put('todos', JSON.stringify(todo)).map(
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

  getPersonalTodos() {
    // Reach REST endpoint
    return this.apiService.get<Todo[]>('users/' +
      this.userService.getUser().brugernavn + '/todos/').map(
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

  getSharedTodos(sharedId: string) {
    this.todos = [];
    // Reach REST endpoint
    return this.apiService.get<Todo[]>('todos/shared/' + sharedId).map(
      (todos) => {
        this.setTodos(todos);
        return console.log(todos);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('getSharedTodos(): Something went wrong in TodoService');
        }
      );

  }


  patchTodoBackend(todo: Todo) {
    return this.apiService.patch('todos/' + todo.todoId, JSON.stringify(todo)).map(
      (response: Response) => {
        return console.log(response);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong in TodoService: PATCH TODO');
        }
      );
  }


  deleteTodoBackend(todoId: number) {
    return this.apiService.delete('todos/' + todoId).map(
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

  updateTodo(index: number, updateTodo: Todo) {
    // TODO: Update from backend using id and studynr
    this.patchTodoBackend(updateTodo).subscribe(
      (response) => console.log('Todo updated on backend'),
      (error) => console.error('Something went wrong while updating todo!')
    );
    this.todos[index] = updateTodo;
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


  putPersonalTodo(id: string, todo: Todo) {
    // Reach REST endpoint
    return this.apiService.put('todos/shared/' + id, JSON.stringify(todo)).map(
      (response: Response) => {
        console.log(response);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('TodoService: Couldn\'t put shared todos');
        }
      );

  }
}
