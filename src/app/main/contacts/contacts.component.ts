import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/model/user.model';
import {UsersService} from '../../shared/service/users.service';
import {GroupsComponent} from '../groups/groups.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  groups = new GroupsComponent();

  persons: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // this.usersService.getUsers().subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // );
  }

}
