import {
  Component,
  OnInit,
  ViewChild, OnDestroy
} from '@angular/core';

import {TodoService} from '../../../shared/service/todo.service';
import {Todo} from '../../../shared/model/todo-list.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') todoForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedTodoIndex: number;
  editedTodo: Todo;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {

    // Event listener
    this.subscription = this.todoService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedTodoIndex = index;
          this.editMode = true;
          this.editedTodo = this.todoService.getTodo(index);
          this.todoForm.setValue({
            todomessage: this.editedTodo.message
          });
        }
      );
  }

  onAddTodo(form: NgForm) {

    this.todoService.getTodos();
    console.log('onAddTodo: Todo added');
    // TODO: Get the correct userId and generete todoId
    const username = window.localStorage.getItem('user');
    const newTodo = new Todo(1, username, form.value.todomessage, false);
    if (this.editMode) {
      // Get updated message from template
      this.editedTodo.message = form.value.todomessage;
      // Update todo
      this.todoService.updateTodo(this.editedTodoIndex, this.editedTodo);
    } else {
      this.todoService.putTodo(newTodo).subscribe(
        (response) => {
          console.log(response);
          this.todoService.getTodosBackEnd().subscribe(
            (todos) => console.log('Todos loaded from backend')
          );
        },
        // TODO: Show error on Template
        (error) => console.error('Error while adding todo')
      );
      this.todoService.addTodo(newTodo);
    }
    this.todoForm.reset();
    form.reset();
    console.log('TodoEditComponent: Resetting form');

  }

  onClear() {
    this.todoForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.todoService.deleteTodo(this.editedTodoIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
