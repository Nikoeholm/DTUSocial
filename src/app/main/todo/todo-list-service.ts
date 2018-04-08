import {Todo} from './todo.model';
import {EventEmitter} from '@angular/core';

export class TodoListService {
  todosChanged = new EventEmitter<Todo[]>();
  todos: Todo[] = [
    new Todo('Testbesked'),
    new Todo('Test')
  ];

  getTodo() {
    return this.todos.slice();
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
    this.todosChanged.emit(this.todos.slice());
  }
  addTodos(todos: Todo[]) {
    this.todos.push(...todos);
    this.todosChanged.emit(this.todos.slice());
  }
}
