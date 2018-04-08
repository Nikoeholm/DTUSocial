import { Component, OnInit } from '@angular/core';
import {Todo} from './todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [
    new Todo(1, 'Testbesked', false),
    new Todo(2, 'Test', false)
  ];

  constructor() { }

  ngOnInit() {
  }

}
