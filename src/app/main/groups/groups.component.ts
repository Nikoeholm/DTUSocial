import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Todo} from '../../shared/model/todo-list.model';
import {GroupService} from '../../shared/service/group.service';
import {Group} from '../../shared/model/group.model';
import {UsersService} from '../../shared/service/users.service';
import {User} from '../../shared/model/user.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  newGr = false;

  groups: Group[];
  users: User[];

  // Implementeret med henblik på, at kunne ændre en gruppe senere
  @ViewChild('form') groupForm: NgForm;
  subscription: Subscription;
  editedGroup: Group;
  editMode = false;
  editedGroupIndex: number;


  constructor(private groupService: GroupService, private usersService: UsersService) { }


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

    // Event listener
    this.subscription = this.groupService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedGroupIndex = index;
          this.editMode = true;
          this.editedGroup = this.groupService.getGroup(index);
          this.groupForm.setValue({
            groupName: this.editedGroup.groupName
          });
        }
      );
  }



  onGroupAdd(form: NgForm) {
    this.groupService.getGroups();
    console.log('onGroupAdd: group added');

    // TODO: Get the correct userId and generete GroupId
    const username = window.localStorage.getItem('user');
    const newGrp = new Group('1', form.value.groupName, ['Agam', 'Khurram', 'Morten', 'Nikolaj']);

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

  onEditGroup(index: number) {
    this.groupService.startedEditing.next(index);
  }
}
