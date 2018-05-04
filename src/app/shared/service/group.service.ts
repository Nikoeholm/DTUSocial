import { HttpHeaders, HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';

import 'rxjs/Rx';
import {Group} from '../model/group.model';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// Specify http header options here
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};



@Injectable()
export class GroupService {

  constructor(private http: HttpClient) { }

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
    return this.http.put('http://localhost:8080/DTUSocial/groups', JSON.stringify(group), httpOptions).map(
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
    return this.http.get<Group[]>('http://localhost:8080/DTUSocial/groups', httpOptions).map(
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
