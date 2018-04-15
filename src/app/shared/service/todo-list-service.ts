
import {EventEmitter} from '@angular/core';
import {TodoModel} from '../model/todo-list.model';
import {Subject} from 'rxjs/Subject';

export class TodoListService {
  startedEditing = new Subject<number>();
  todosChanged = new EventEmitter<TodoModel[]>();
  todos: TodoModel[] = [
    new TodoModel('Testbesked'),
    new TodoModel('Test')
  ];


  getTodos() {
    return this.todos.slice();
  }

  getTodo(index: number) {
    return this.todos[index];
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
    this.todos.splice(index,1);
    this.todosChanged.next(this.todos.slice());
  }
}
