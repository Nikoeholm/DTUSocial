import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.model';
import {UsersService} from '../../shared/service/users.service';
import {GroupsComponent} from '../groups/groups.component';
import { UserService } from '../../shared/service/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  groups = new GroupsComponent();

  users: User[];

  constructor(private userService: UserService,
              private usersService: UsersService) { }

  ngOnInit() {
    try {
      this.usersService.retrieveUsers().subscribe(
        (users) => this.users = this.usersService.getUsers()
      );
    } catch (e) {
      throw new Error('Users couldn\'t be resolved');
    }
  }

}
