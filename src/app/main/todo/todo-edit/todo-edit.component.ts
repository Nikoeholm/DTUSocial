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
import { UsersService } from '../../../shared/service/users.service';
import { User } from '../../../shared/model/user.model';
import { UserService } from '../../../shared/service/user.service';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit, OnDestroy {
  // Variable declarations
  editMode = false;
  editedTodoIndex: number;
  sharedId: string;
  // Object declarations
  @ViewChild('form') todoForm: NgForm;
  subscription: Subscription;
  onPersonalConversationSubs: Subscription;
  editedTodo: Todo;
  chatter: User;

  constructor(private todoService: TodoService,
    private usersService: UsersService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.chatter = this.usersService.getUser(index);
        // Get todos from backend
        this.sharedId = this.userService.getUser().brugernavn + '' + this.chatter.brugernavn;
      }
    );

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
    let newTodo;
    if (this.sharedId == null) {
      this.todoService.getTodos();
      // TODO: Get the correct userId and generete todoId
      newTodo = new Todo(1, this.userService.getUser().brugernavn, form.value.todomessage, false);
    } else {
      newTodo = new Todo(1, this.sharedId, form.value.todomessage, false);
    }
      if (this.editMode) {
        // Get updated message from template
        this.editedTodo.message = form.value.todomessage;
        // Update todo
        this.todoService.updateTodo(this.editedTodoIndex, this.editedTodo);
      } else {
        this.todoService.putTodo(newTodo).subscribe(
          (response) => {
            console.log(response);
            this.todoService.getPersonalTodos().subscribe(
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
