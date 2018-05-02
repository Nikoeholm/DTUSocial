import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Todo} from '../../shared/model/todo-list.model';
import {GroupService} from '../../shared/service/group.service';
import {Group} from '../../shared/model/group.model';
import {UsersService} from '../../shared/service/users.service';
import {User} from '../../shared/model/user.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  newGr = false;

  groups: Group[];

   users: User[];


  constructor(private groupService: GroupService, private usersService: UsersService) { }

  ngOnInit() {

    try {
      this.usersService.retrieveUsers().subscribe(
        (users) => this.users = this.usersService.getUsers()
      );
    } catch (e) {
      throw new Error('Users couldn\'t be resolved');
    }
  }



  onGroupAdd() {

    this.groupService.getGroups();
    console.log('onGroupAdd: group added');
    // TODO: Get the correct userId and generete todoId
    const username = window.localStorage.getItem('user');
    const newGrp = new Group('1', 'CDIO', ['Agam', 'Khurram', 'Morten', 'Nikolaj']);
    this.groupService.putGroupBackend(newGrp).subscribe(
        (response) => {
          console.log(response);

          this.groupService.getGroupBackend().subscribe(
            (group) => console.log('Groups loaded from backend')
          );
        },
        // TODO: Show error on Template
        (error) => console.error('Error while adding Group')
      );
      this.groupService.addGroups(newGrp);
    }
}
