import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  groups: {id: number, name: string}[] = [
          {id: 1, name: 'CDIO'},
          {id: 2, name: 'DTU Social'},
          {id: 3, name: 'Android'},
          {id: 4, name: 'Galgeleg'}];

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
