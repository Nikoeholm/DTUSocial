import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TodoListService} from './todo-list-service';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private todoService: TodoListService) {}

  storeTodos() {
    return this.http.post('http://localhost:8080/DTUSocial/todos', this.todoService.getTodos());

  }
}
