
import {EventEmitter} from '@angular/core';
import {TodoModel} from '../model/todo-list.model';

export class TodoListService {
  todosChanged = new EventEmitter<TodoModel[]>();
  todos: TodoModel[] = [
    new TodoModel('Testbesked'),
    new TodoModel('Test')
  ];

  getTodo() {
    return this.todos.slice();
  }
  addTodo(todo: TodoModel) {
    this.todos.push(todo);
    this.todosChanged.emit(this.todos.slice());
  }
  addTodos(todos: TodoModel[]) {
    this.todos.push(...todos);
    this.todosChanged.emit(this.todos.slice());
  }
}
