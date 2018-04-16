import { Component, OnInit } from '@angular/core';
import {GroupsComponent} from '../groups/groups.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  groups = new GroupsComponent();

  persons: {id: number, name: string}[] = [
        {id: 1, name: 'Agam'},
        {id: 2, name: 'Khurram'},
        {id: 3, name: 'Morten'},
        {id: 4, name: 'Nikolaj'}];

  test = false;

  constructor() { }

  ngOnInit() {
  }

}
