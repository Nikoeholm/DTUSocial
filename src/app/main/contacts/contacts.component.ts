import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.model';
import {UsersService} from '../../shared/service/users.service';
import {GroupsComponent} from '../groups/groups.component';
import { UserService } from '../../shared/service/user.service';
import {Params} from '@angular/router';
import {Group} from '../../shared/model/group.model';
import {GroupService} from '../../shared/service/group.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  groups: Group[];

  users: User[];

  constructor(private userService: UserService,
              private usersService: UsersService,
              private groupService: GroupService) { }

  ngOnInit() {

    try {
      this.usersService.retrieveUsers().subscribe(
        (users) => this.users = this.usersService.getUsers()
      );
    } catch (e) {
      throw new Error('Users couldn\'t be resolved');
    }

    try {
      this.groupService.getGroupBackend().subscribe((groups) => this.groups = this.groupService.getGroups()
      );

    } catch (e) {
      throw new Error('Groups couldn\'t be resolved');

    }

  }

  onPersonalMessage(index: number) {
    this.usersService.startPersonalConversation.next(index);
  }

}
