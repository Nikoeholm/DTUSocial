import {
  Component,
  OnInit,
  ViewChild, OnDestroy
} from '@angular/core';

import {TodoListService} from '../../../shared/service/todo-list-service';
import {TodoModel} from '../../../shared/model/todo-list.model';
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
  editedTodo: TodoModel;

  constructor(private todoService: TodoListService) {
  }

  ngOnInit() {
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
    const newTodo = new TodoModel(1, 's165151', form.value.todomessage, false);
    if (this.editMode) {
      this.todoService.updateTodo(this.editedTodoIndex, newTodo);
    } else {
      this.todoService.addTodo(newTodo);
    }
    this.todoForm.reset();
    form.reset();
    console.log('Resetting form');

    this.todoService.postTodo(newTodo)
      .subscribe(
        (response) =>
          console.log(response),
        (error) =>
          console.error('Error while adding todo')

      );
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
