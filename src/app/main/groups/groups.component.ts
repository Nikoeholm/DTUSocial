import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Todo} from '../../shared/model/todo-list.model';
import {GroupService} from '../../shared/service/group.service';
import {Group} from '../../shared/model/group.model';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  newGr = false;

  public groups: {id: number, name: string}[] = [
    {id: 1, name: 'CDIO'},
    {id: 2, name: 'DTU Social'},
    {id: 3, name: 'Android'},
    {id: 4, name: 'Galgeleg'}];

  public users: string[] = [
    'Agam',
    'Khurram',
    'Morten',
    'Nikolaj'];


  constructor(private groupService: GroupService) { }

  ngOnInit() {
  }



  onGroupAdd() {

    this.groupService.getGroups();
    console.log('onGroupAdd: Group added');
    // TODO: Get the correct userId and generete todoId
    const username = window.localStorage.getItem('user');
    const newGrp = new Group('1', 'CDIO', ['Agam', 'Khurram', 'Morten', 'Nikolaj']);
    this.groupService.putGroupBackend(newGrp).subscribe(
        (response) => {
          console.log(response);

          this.groupService.getGroupBackend().subscribe(
            (groups) => console.log('Groups loaded from backend')
          );
        },
        // TODO: Show error on Template
        (error) => console.error('Error while adding Group')
      );
      this.groupService.addGroups(newGrp);
    }
}
