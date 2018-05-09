import {EventEmitter, Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Group} from '../model/group.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {DataService} from '../APIService';

@Injectable()
export class GroupService {

  constructor(private apiService: DataService) { }

  groups: Group[] = [];

  startedEditing = new Subject<number>();
  groupsChanged = new EventEmitter<Group[]>();

  getGroups() {
    return this.groups;
  }

  getGroup(index: number) {
    return this.groups[index];
  }

  addGroups(group: Group) {
    this.groups.push(group);
    this.groupsChanged.next(this.groups.slice());
    console.log('addGroup: Group added');

  }

  setGroups(group: Group[]) {
    this.groups = group;
    this.groupsChanged.next(this.groups.slice());
  }

  putGroupBackend(group: Group) {
    return this.apiService.put('groups', JSON.stringify(group)).map(
      (response: Response) => {
        console.log(response);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong with GroupService');
        }
      );
  }

  getGroupBackend() {
    // Reach REST endpoint
    return this.apiService.get<Group[]>('groups').map(
      (groups) => {
        console.log(groups);
        console.log('Groups are set!');
        this.setGroups(groups);
      }
    )
      .catch(
        (error: Response) => {
          console.log(error);
          return Observable.throw('Something went wrong in GroupService');
        }
      );

  }
}
