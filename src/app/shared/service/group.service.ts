import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/Rx';
import {Group} from '../model/group.model';
import {Observable} from 'rxjs/Observable';
import {Todo} from '../model/todo-list.model';

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

  getGroups() {
    return this.groups;
  }

  getGroup(index: number) {
    return this.groups[index];
  }

  addGroups(group: Group) {
    this.groups.push(group);
    console.log('addGroup: Group added');

  }

  setGroups(group: Group[]) {
    this.groups = group;
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
        this.setGroups(groups);
        return console.log(groups);
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
