import { Component, OnInit } from '@angular/core';
import {UsersModel} from '../../shared/model/users.model';
import {UsersService} from '../../shared/service/users.service';
import {GroupsComponent} from '../groups/groups.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  persons: UsersModel[];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }

}
