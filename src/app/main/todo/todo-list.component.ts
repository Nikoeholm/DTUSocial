import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from '../../shared/service/todo.service';
import { Todo } from '../../shared/model/todo-list.model';
import { Subscription } from 'rxjs/Subscription';
import { UsersService } from '../../shared/service/users.service';
import { User } from '../../shared/model/user.model';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  onPersonalTodoSubs: Subscription;
  onPersonalConversationSubs: Subscription;
  chatter: User;
  sharedId: string;
  showSpinner: boolean = false;

  constructor(private todoService: TodoService,
    private usersService: UsersService,
    private userService: UserService) { }

  ngOnInit() {
    this.onPersonalConversationSubs = this.usersService.startPersonalConversation.subscribe(
      (index: number) => {
        this.showSpinner = true;
        this.chatter = this.usersService.getUser(index);
        console.log('Todoer: ' + this.chatter.brugernavn);
        // Get todos from backend
        this.sharedId = this.userService.getUser().brugernavn + '' + this.chatter.brugernavn;
        console.log('Shared Id: ' + this.sharedId);
        this.todoService.getSharedTodos(
          this.userService.getUser().brugernavn
          + '' + this.chatter.brugernavn).subscribe(
            (response) => {
              this.showSpinner = false;
              console.log('Shared todos loaded');
            },
            (error) => this.showSpinner = false);
      }
    );

    if (!this.sharedId == null) {
      // Retrieve TODOS from backend
      this.todoService.getPersonalTodos().subscribe(
        (response) => {
          this.showSpinner = false,
          console.log('Personal todos loaded');
      });
    }

    this.todos = this.todoService.getTodos();
    this.todoService.todosChanged.subscribe((todos: Todo[]) => {
      this.todos = todos;
    }
    );
  }

  onEditTodo(index: number) {
    this.todoService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.onPersonalConversationSubs.unsubscribe();
    this.showSpinner = false;
  }

}
