import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  public groups: {id: number, name: string}[] = [
    {id: 1, name: 'CDIO'},
    {id: 2, name: 'DTU Social'},
    {id: 3, name: 'Android'},
    {id: 4, name: 'Galgeleg'}];

  constructor() { }

  ngOnInit() {
  }

  getGroups() {
    return this.groups;
  }

}
