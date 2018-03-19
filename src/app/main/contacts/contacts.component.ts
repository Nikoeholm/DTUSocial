import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  groups = ['CDIO', 'DTU Social', 'Android', 'Galgeleg'];

  persons = ['Agam', 'Khurram', 'Morten', 'Nikolaj'];

  constructor() { }

  ngOnInit() {
  }

}
