
import {EventEmitter, Injectable} from '@angular/core';
import {TodoModel} from '../model/todo-list.model';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'content-type': 'application/json' })
};

@Injectable()
export class TodoListService {

  constructor(private http: HttpClient) {}

  // Subject which can be listen to in other componentes
  startedEditing = new Subject<number>();
  todosChanged = new EventEmitter<TodoModel[]>();

  todos: TodoModel[] = [
    new TodoModel('Testbesked'),
    new TodoModel('Test')
  ];


  public postTodo(todo: TodoModel) {
    // reach to endpoint
    return this.http.post('http://localhost:8080/DTUSocial/todos', JSON.stringify(todo), httpOptions).map(
      (res: Response) => res.json());
  }

  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
  }

  getTodoEndpoint() {
    return this.http.get('http://localhost:8080/DTUSocial/todos').map((res: Response) => res.json());
  }

  addTodo(todo: TodoModel) {
    // if (!todo.id) {
    //   todo.id = ++this.lastId;
    // }
    this.todos.push(todo);
    this.todosChanged.next(this.todos.slice());
  }

  updateTodo(index: number, newTodo: TodoModel) {
    this.todos[index] = newTodo;
    this.todosChanged.next(this.todos.slice());
  }

  deleteTodo(index: number) {
    this.todos.splice(index, 1);
    this.todosChanged.next(this.todos.slice());
  }
}
