import {
  Component,
  OnInit,
  ElementRef,
  ViewChild, OnDestroy
} from '@angular/core';

import {TodoListService} from '../../../shared/service/todo-list-service';
import {TodoModel} from '../../../shared/model/todo-list.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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

  constructor(private todoService: TodoListService) { }

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
    const newTodo = new TodoModel(form.value.todomessage);
    if (this.editMode) {
      this.todoService.updateTodo(this.editedTodoIndex, newTodo);
    } else {
      this.todoService.addTodo(newTodo);
    }
    this.todoForm.reset();
    form.reset();
    console.log('Resetting form');
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
