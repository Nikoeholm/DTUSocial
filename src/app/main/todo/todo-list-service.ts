import {Todo} from './todo.model';

export class TodoListService {
  todos: Todo[] = [
    new Todo(1, 'Testbesked', false),
    new Todo(2, 'Test', false)
  ];

  getTodo() {
    return this.todos.slice();
  }
  addTodo(todo: Todo) {
    this.todos.push(todo);
  }
  addTodos(todos: Todo[]) {
    this.todos.push(...todos);
  }
}
